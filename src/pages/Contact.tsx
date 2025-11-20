import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                      <Mail className="h-6 w-6 text-primary relative" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground">
                        Our support team typically responds within 24 hours during business days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                      <MessageSquare className="h-6 w-6 text-primary relative" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">
                        Available Monday-Friday, 9 AM - 6 PM EST for urgent inquiries.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/30">
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-sm text-muted-foreground mb-1">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-sm text-muted-foreground">Saturday - Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="mt-2 bg-input border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="mt-2 bg-input border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="mt-2 bg-input border-border"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className="mt-2 bg-input border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* FAQ Quick Links */}
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Before You Reach Out</h2>
              <p className="text-muted-foreground text-center mb-6">
                Check out these common questions that might help you faster:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to="/#faq" className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold mb-1">How does the free trial work?</h3>
                  <p className="text-sm text-muted-foreground">Learn about our 15-day trial period</p>
                </Link>
                <Link to="/#pricing" className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold mb-1">What's included in the plan?</h3>
                  <p className="text-sm text-muted-foreground">View all features and pricing</p>
                </Link>
                <Link to="/refund" className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold mb-1">Refund & Cancellation</h3>
                  <p className="text-sm text-muted-foreground">Our refund policy explained</p>
                </Link>
                <Link to="/#features" className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <h3 className="font-semibold mb-1">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">Getting started with features</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
