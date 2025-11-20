import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useGoogleBusinessProfile } from '@/hooks/useGoogleBusinessProfile';
import { SubscriptionService, Subscription, SUBSCRIPTION_PLANS } from '@/lib/subscriptionService';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  status: 'trial' | 'active' | 'expired' | 'none';
  daysRemaining: number | null;
  plans: typeof SUBSCRIPTION_PLANS;
  checkSubscriptionStatus: () => Promise<void>;
  createTrialSubscription: () => Promise<void>;
  upgradeToPaid: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  isFeatureBlocked: boolean;
  canUsePlatform: boolean;
  requiresPayment: boolean;
  billingOnly: boolean;
  message: string | null;
  showTrialSetup: boolean;
  setShowTrialSetup: (show: boolean) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<'trial' | 'active' | 'expired' | 'none'>('none');
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
  const [isFeatureBlocked, setIsFeatureBlocked] = useState(false);
  const [canUsePlatform, setCanUsePlatform] = useState(true);
  const [requiresPayment, setRequiresPayment] = useState(false);
  const [billingOnly, setBillingOnly] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showTrialSetup, setShowTrialSetup] = useState(false);
  const [isCreatingTrial, setIsCreatingTrial] = useState(false); // Flag to prevent infinite loop
  const [isChecking, setIsChecking] = useState(false); // Flag to prevent simultaneous checks

  const { currentUser } = useAuth();
  const { accounts } = useGoogleBusinessProfile();
  const { toast } = useToast();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://pavan-client-backend-bxgdaqhvarfdeuhe.canadacentral-01.azurewebsites.net';

  // Get the first GBP account ID
  const gbpAccountId = accounts && accounts.length > 0
    ? accounts[0].name?.split('/')[1] || null
    : null;
  
  console.log('SubscriptionContext - GBP Account ID:', gbpAccountId);
  console.log('SubscriptionContext - Accounts:', accounts);

  const checkSubscriptionStatus = async () => {
    // Prevent simultaneous checks
    if (isChecking) {
      console.log('Subscription check already in progress, skipping...');
      return;
    }

    setIsChecking(true);
    console.log('Checking subscription status for GBP:', gbpAccountId, 'User:', currentUser?.uid);

    try {
      // First, try to find subscription by user ID even if GBP is not connected
      if (currentUser?.uid && !gbpAccountId) {
      console.log('No GBP connected, checking by user ID:', currentUser.uid);
      try {
        const response = await fetch(`${backendUrl}/api/payment/subscription/status?userId=${currentUser.uid}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Subscription found by user ID:', data);

          if (data.status !== 'none') {
            setStatus(data.status);
            setDaysRemaining(data.daysRemaining || null);
            setSubscription(data.subscription);
            setCanUsePlatform(data.canUsePlatform !== false);
            setRequiresPayment(data.requiresPayment === true);
            setBillingOnly(data.billingOnly === true);
            setMessage(data.message || 'Please reconnect your Google Business Profile to access all features.');
            setIsFeatureBlocked(data.status === 'expired' || data.billingOnly === true);
            setIsLoading(false);
            setIsChecking(false);
            return;
          }
        }
      } catch (error) {
        console.log('User ID lookup failed, will check GBP when available:', error);
      }
    }

    if (!gbpAccountId && !currentUser?.uid) {
      console.log('No GBP account ID or user ID, setting status to none');
      setStatus('none');
      setDaysRemaining(null);
      setIsFeatureBlocked(false);
      setIsLoading(false);
      setIsChecking(false);
      return;
    }

    try {
      setIsLoading(true);

      // Check subscription status from backend using both userId and gbpAccountId
      const params = new URLSearchParams();
      if (gbpAccountId) params.append('gbpAccountId', gbpAccountId);
      if (currentUser?.uid) params.append('userId', currentUser.uid);

      const response = await fetch(`${backendUrl}/api/payment/subscription/status?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Subscription status from backend:', data);

        // Auto-create trial for new users with GBP connected
        if (data.status === 'none' && gbpAccountId && currentUser?.uid && !isCreatingTrial) {
          console.log('🎉 No subscription found - auto-creating 15-day free trial...');
          // Keep locks active during trial creation to prevent loops
          setIsCreatingTrial(true);

          try {
            // Create trial directly here without calling createTrialSubscription
            const trialResponse = await fetch(`${backendUrl}/api/payment/subscription/trial`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: currentUser.uid,
                gbpAccountId,
                email: currentUser.email
              })
            });

            if (trialResponse.ok) {
              const trialData = await trialResponse.json();
              setSubscription(trialData.subscription);
              setStatus('trial');
              setDaysRemaining(15);
              setIsFeatureBlocked(false);
              setCanUsePlatform(true);
              setRequiresPayment(false);
              setBillingOnly(false);
              setMessage(null);

              toast({
                title: "Trial Started!",
                description: "Your 15-day free trial has begun. Enjoy all features!",
              });
            } else {
              // Trial creation failed - log error and don't retry
              const errorData = await trialResponse.json().catch(() => ({ error: 'Unknown error' }));
              console.error('❌ Trial creation failed:', errorData);

              // Show error toast
              toast({
                title: "Setup Error",
                description: errorData.hint || errorData.details || "Unable to create trial. Please contact support.",
                variant: "destructive"
              });

              // Set state to allow platform usage but show warning
              setStatus('none');
              setIsFeatureBlocked(false);
              setCanUsePlatform(true);
              setRequiresPayment(false);
              setBillingOnly(false);
              setMessage('Trial setup failed. Please contact support.');
            }
          } catch (error) {
            console.error('❌ Error creating trial:', error);

            // Show error toast
            toast({
              title: "Setup Error",
              description: "Unable to create trial. Please contact support.",
              variant: "destructive"
            });

            // Set state to allow platform usage but show warning
            setStatus('none');
            setIsFeatureBlocked(false);
            setCanUsePlatform(true);
            setRequiresPayment(false);
            setBillingOnly(false);
            setMessage('Trial setup failed. Please contact support.');
          } finally {
            setIsCreatingTrial(false);
            setIsLoading(false);
            setIsChecking(false);
          }
          return; // Exit early
        }

        setStatus(data.status);
        setDaysRemaining(data.daysRemaining || null);
        setSubscription(data.subscription);

        // Set platform access based on subscription status
        setCanUsePlatform(data.canUsePlatform !== false);
        setRequiresPayment(data.requiresPayment === true);
        setBillingOnly(data.billingOnly === true);
        setMessage(data.message || null);

        // Block features if expired or billing only
        setIsFeatureBlocked(data.status === 'expired' || data.billingOnly === true);
        
        // Show warning if trial is ending soon
        if (data.status === 'trial' && data.daysRemaining && data.daysRemaining <= 3) {
          toast({
            title: "Trial Ending Soon",
            description: `Your trial ends in ${data.daysRemaining} day(s). Upgrade now to continue using all features.`,
            variant: "default"
          });
        }
        
        // Show error if trial expired
        if (data.status === 'expired' && data.billingOnly) {
          toast({
            title: "Trial Expired",
            description: "Your 15-day trial has expired. Please upgrade to continue using all features.",
            variant: "destructive"
          });
        }
      } else {
        // If no subscription found in backend, check Firebase
        const result = await SubscriptionService.checkSubscriptionStatus(gbpAccountId);

        // Don't auto-create trial
        {
          setStatus(result.status);
          setDaysRemaining(result.daysRemaining || null);
          setSubscription(result.subscription || null);
          setIsFeatureBlocked(!result.isValid);
        }
      }
    } catch (error) {
      console.error('Error checking subscription status:', error);
      // Fallback to Firebase check
      try {
        const result = await SubscriptionService.checkSubscriptionStatus(gbpAccountId);

        // Don't auto-create trial
        {
          setStatus(result.status);
          setDaysRemaining(result.daysRemaining || null);
          setSubscription(result.subscription || null);
          setIsFeatureBlocked(!result.isValid);
        }
      } catch (fbError) {
        console.error('Firebase subscription check also failed:', fbError);
        setStatus('none');
        setIsFeatureBlocked(true);
      }
    } finally {
      setIsLoading(false);
      setIsChecking(false);
    }
    } catch (outerError) {
      console.error('Outer error in checkSubscriptionStatus:', outerError);
      setIsLoading(false);
      setIsChecking(false);
    }
  };

  const createTrialSubscription = async () => {
    console.log('Creating trial subscription - User:', currentUser?.uid, 'GBP:', gbpAccountId);

    if (!currentUser || !gbpAccountId) {
      console.error('Cannot create trial - missing user or GBP account');
      toast({
        title: "Error",
        description: "Please connect your Google Business Profile first",
        variant: "destructive"
      });
      return;
    }

    // Prevent duplicate trial creation
    if (isCreatingTrial) {
      console.log('Trial creation already in progress, skipping...');
      return;
    }

    try {
      setIsCreatingTrial(true);
      setIsLoading(true);

      // Create trial via backend
      const response = await fetch(`${backendUrl}/api/payment/subscription/trial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          gbpAccountId,
          email: currentUser.email
        })
      });

      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
        setStatus('trial');
        setDaysRemaining(15); // 15 days trial
        setIsFeatureBlocked(false);

        toast({
          title: "Trial Started!",
          description: "Your 15-day free trial has begun. Enjoy all features!",
        });
      } else {
        // Fallback to Firebase
        const newSubscription = await SubscriptionService.createTrialSubscription(
          currentUser.uid,
          gbpAccountId,
          currentUser.email!
        );

        setSubscription(newSubscription);
        setStatus('trial');
        setDaysRemaining(15); // 15 days trial
        setIsFeatureBlocked(false);

        toast({
          title: "Trial Started!",
          description: "Your 15-day free trial has begun. Enjoy all features!",
        });
      }

      // Refresh subscription status after trial creation
      await checkSubscriptionStatus();
    } catch (error) {
      console.error('Error creating trial subscription:', error);
      toast({
        title: "Error",
        description: "Failed to start trial. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setIsCreatingTrial(false);
    }
  };

  const upgradeToPaid = async (planId: string) => {
    // This will be handled by the PaymentModal component
    // which will interact with Razorpay
    console.log('Upgrading to plan:', planId);
  };

  const cancelSubscription = async () => {
    if (!subscription || !gbpAccountId) return;

    try {
      setIsLoading(true);
      
      const response = await fetch(`${backendUrl}/api/payment/subscription/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          gbpAccountId
        })
      });

      if (response.ok) {
        toast({
          title: "Subscription Cancelled",
          description: "Your subscription has been cancelled.",
        });
        
        await checkSubscriptionStatus();
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check subscription status when GBP account changes
  useEffect(() => {
    // Skip if already creating trial to prevent loop
    if (isCreatingTrial) {
      console.log('Skipping subscription check - trial creation in progress');
      return;
    }

    console.log('SubscriptionContext useEffect - gbpAccountId changed:', gbpAccountId);

    // Delay subscription check if we just completed payment
    const justReloaded = sessionStorage.getItem('post_payment_reload') === 'true';
    const delay = justReloaded ? 3000 : 0;

    const timeoutId = setTimeout(() => {
      if (gbpAccountId && currentUser) {
        checkSubscriptionStatus();
      } else if (!gbpAccountId && currentUser) {
        // If no GBP account but we have a user, check by user ID
        console.log('No GBP account yet, checking subscription by user ID');
        checkSubscriptionStatus();
      } else if (!gbpAccountId && !currentUser) {
        console.log('No GBP account or user, resetting subscription state');
        setStatus('none');
        setDaysRemaining(null);
        setSubscription(null);
        setIsFeatureBlocked(false);
        setIsLoading(false);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [gbpAccountId, currentUser?.uid, isCreatingTrial]);

  // Auto-check subscription status every 30 minutes (reduced frequency)
  useEffect(() => {
    if (!gbpAccountId) return;

    const interval = setInterval(() => {
      checkSubscriptionStatus();
    }, 30 * 60 * 1000); // 30 minutes (reduced from 5 minutes)

    return () => clearInterval(interval);
  }, [gbpAccountId]);

  const value: SubscriptionContextType = {
    subscription,
    isLoading,
    status,
    daysRemaining,
    plans: SUBSCRIPTION_PLANS,
    checkSubscriptionStatus,
    createTrialSubscription,
    upgradeToPaid,
    cancelSubscription,
    isFeatureBlocked,
    canUsePlatform,
    requiresPayment,
    billingOnly,
    message,
    showTrialSetup,
    setShowTrialSetup
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};