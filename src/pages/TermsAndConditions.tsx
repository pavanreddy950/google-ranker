import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const TermsAndConditions = () => {
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Terms and Conditions</h1>
          <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

          <Card className="bg-card/50 backdrop-blur-sm border-border mb-8">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Google Ranker's services, you accept and agree to be bound by the terms and provision of this agreement. 
                  If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Google Ranker provides AI-powered local SEO and Google Business Profile management services. Our services include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Automated posting to Google Business Profile</li>
                  <li>AI-powered review management and response generation</li>
                  <li>SEO audit and keyword research tools</li>
                  <li>Performance analytics and reporting</li>
                  <li>Multi-profile management dashboard</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Free Trial</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We offer a 15-day free trial period for new users. During this period, you have full access to all features. 
                  After the trial period expires, you must subscribe to continue using our services. If you do not wish to continue, 
                  you can cancel at any time before the trial ends.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Subscription and Billing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our services are billed annually at $99 per Google Business Profile. By subscribing to our service, you agree to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide accurate billing information</li>
                  <li>Pay all applicable fees and taxes</li>
                  <li>Automatic renewal of your subscription unless cancelled</li>
                  <li>Price changes with 30 days notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. User Responsibilities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You agree to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Not share your account with others</li>
                  <li>Use the service in compliance with all applicable laws</li>
                  <li>Not abuse or misuse our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content, features, and functionality of Google Ranker are owned by us and are protected by international 
                  copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse 
                  engineer any part of our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Google Ranker shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
                  resulting from your use or inability to use the service. We do not guarantee specific ranking improvements 
                  or business outcomes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time for violating these terms. 
                  You may cancel your subscription at any time through your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. We will notify users of significant changes 
                  via email or through the platform. Continued use of the service after changes constitutes acceptance 
                  of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms and Conditions, please contact us through our website's contact form.
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

export default TermsAndConditions;
