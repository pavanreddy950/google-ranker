import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy = () => {
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
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12 text-center">Last updated: {new Date().toLocaleDateString()}</p>

          <Card className="bg-card/50 backdrop-blur-sm border-border mb-8">
            <CardContent className="p-8 space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Account information (name, email, password)</li>
                  <li>Google Business Profile access tokens</li>
                  <li>Business information and profile data</li>
                  <li>Payment and billing information</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Google OAuth and Data Access</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you connect your Google Business Profile, we access only the data necessary to provide our services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Your Google Business Profile information</li>
                  <li>Posts, reviews, and photos from your profile</li>
                  <li>Insights and analytics data</li>
                  <li>Location information</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We use this data solely to provide automated posting, review management, and analytics features. 
                  You can revoke our access at any time through your Google account settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information. 
                  This includes encryption of data in transit and at rest, secure token storage, and regular security audits. 
                  However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your information for as long as your account is active or as needed to provide you services. 
                  If you wish to delete your account, please contact us, and we will delete your information within 30 days, 
                  except where we are required to retain it for legal purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>With your consent</li>
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our service integrates with third-party services including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Google Business Profile API</li>
                  <li>Firebase Authentication</li>
                  <li>Razorpay for payment processing</li>
                  <li>Azure OpenAI for AI features</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  These services have their own privacy policies and terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our service and hold certain information. 
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Export your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our service is not intended for children under 18 years of age. We do not knowingly collect personal 
                  information from children. If you are a parent or guardian and believe your child has provided us with 
                  personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                  new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">12. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us through our website's contact form.
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

export default PrivacyPolicy;
