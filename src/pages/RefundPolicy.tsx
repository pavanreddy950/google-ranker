import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="bg-card/50 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-hover to-primary-glow bg-clip-text text-transparent">
                Google Ranker
              </span>
            </Link>
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <RefreshCcw className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Cancellation & Refund Policy</h1>
          <p className="text-muted-foreground mb-12 text-center">Last updated: {new Date().toLocaleDateString()}</p>

          <Card className="bg-card/50 backdrop-blur-sm border-border mb-8">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Free Trial Period</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Google Ranker offers a 15-day free trial for new users. During this period:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>You have full access to all features without any charges</li>
                  <li>You can cancel at any time before the trial ends</li>
                  <li>No payment is required during the trial period</li>
                  <li>You will be notified before your trial expires</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you do not wish to continue after the trial, simply cancel your account before the 15-day period ends 
                  to avoid any charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Subscription Cancellation</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can cancel your subscription at any time by:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Going to your account settings</li>
                  <li>Selecting "Billing" from the menu</li>
                  <li>Clicking "Cancel Subscription"</li>
                  <li>Following the confirmation prompts</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Upon cancellation, you will continue to have access to the service until the end of your current billing period. 
                  Your subscription will not renew automatically.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Refund Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We offer a 30-day money-back guarantee for annual subscriptions. To be eligible for a refund:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>You must request a refund within 30 days of your initial payment</li>
                  <li>The refund request must be submitted through our contact form or support email</li>
                  <li>You must provide a valid reason for the refund request</li>
                  <li>The service must not have been abused or misused</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Refunds are typically processed within 5-10 business days and will be credited to the original payment method.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Non-Refundable Circumstances</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Refunds will not be provided in the following cases:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>After 30 days from the initial payment date</li>
                  <li>For partial subscription periods</li>
                  <li>If your account was terminated for violating our Terms of Service</li>
                  <li>For additional profiles added to your subscription</li>
                  <li>If you've already received a refund in the past</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Payment Failures and Retries</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If your payment fails at renewal time, we will attempt to charge your payment method up to 3 times over 
                  a 7-day period. If all attempts fail, your subscription will be automatically cancelled, and you will 
                  lose access to the service. You will receive email notifications for failed payment attempts.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Partial Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not offer partial refunds for unused portions of the subscription period. If you cancel your subscription, 
                  you will retain access until the end of your current billing cycle, but no prorated refund will be issued.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Service Disruptions</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In case of extended service disruptions (more than 48 hours), we may offer prorated refunds or extend 
                  your subscription period at our discretion. This does not apply to planned maintenance or issues with 
                  third-party services (like Google APIs).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Chargebacks</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you file a chargeback or payment dispute with your credit card company or payment provider, your 
                  account will be immediately suspended. We encourage you to contact us first to resolve any billing issues 
                  before initiating a chargeback.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify this Refund and Cancellation Policy at any time. Changes will be effective 
                  immediately upon posting to our website. Your continued use of the service after changes constitutes 
                  acceptance of the new policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact for Refunds</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To request a refund or for any questions about this policy, please contact us through our website's 
                  contact form or email. Include your account email, subscription details, and reason for the refund request.
                </p>
              </section>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-primary">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
