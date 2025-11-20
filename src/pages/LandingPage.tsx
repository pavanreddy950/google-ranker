import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Star, TrendingUp, MessageSquare, Sparkles, Check, 
  Menu, X, ChevronRight, Users, Award, BarChart3, Zap,
  MapPin, Calendar, Brain, Target, Shield, ArrowRight,
  Building2, Wrench, Scissors, Hammer, Dumbbell, Bug,
  Home, Coffee, Scale, Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const industries = [
    { name: 'Real Estate Agents', icon: Building2 },
    { name: 'Automotive Repair', icon: Wrench },
    { name: 'Beauty Salons', icon: Scissors },
    { name: 'Construction Contractors', icon: Hammer },
    { name: 'Fitness Centers', icon: Dumbbell },
    { name: 'Pest Control', icon: Bug },
    { name: 'Home Services', icon: Home },
    { name: 'Restaurants & Cafes', icon: Coffee },
    { name: 'Law Firms', icon: Scale },
    { name: 'Medical Practices', icon: Stethoscope },
  ];

  const features = [
    {
      icon: Search,
      title: 'AI SEO Audit',
      description: 'Complete audits of your Google Business Profile to find problems, correct them, and find hidden ranking opportunities.'
    },
    {
      icon: Target,
      title: 'Keyword Finder',
      description: 'Discover the keywords your clients are searching for to bring you the most business at the right moment.'
    },
    {
      icon: Calendar,
      title: 'Auto Posting',
      description: 'Keep your profile current with keyword-rich content uploaded automatically to boost local exposure.'
    },
    {
      icon: MessageSquare,
      title: 'AI Review Generator',
      description: 'Get meaningful responses to every customer review instantly, improving trust and customer relationships.'
    },
    {
      icon: Sparkles,
      title: 'AI Review Writer',
      description: 'Professional and engaging reviews written by AI, saving you time while maintaining consistent brand voice.'
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Clear reports and measurable results showing your Google Business Profile climbing higher through local SEO.'
    }
  ];

  const benefits = [
    {
      number: '01',
      title: 'Exclusive Partnership',
      description: 'We only onboard three clients per specialty in each location, ensuring you enjoy full benefits without competing for attention.'
    },
    {
      number: '02',
      title: 'Data-Driven System',
      description: 'Our AI-driven SEO uses the right keywords, reviews, and ranking signals to boost your search position. Every move is data-backed.'
    },
    {
      number: '03',
      title: 'Rankings You Can See',
      description: 'Clear reports and measurable results ensuring your Google Business Profile climbs higher through AI-driven optimization.'
    },
    {
      number: '04',
      title: 'Strategy That Fits You',
      description: 'Hire a growth strategist who knows your market and can design the playbook just for you. No one-size-fits-all approach.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: "Google Ranker's AI made SEO effortless for us. It analyzed, optimized, and boosted our rankings faster than any agency ever did."
    },
    {
      name: 'Michael Chen',
      role: 'Restaurant Owner',
      content: 'This AI tool simplified everything — from keyword research to site audits. Our organic growth skyrocketed within weeks.'
    },
    {
      name: 'Jennifer Martinez',
      role: 'Salon Owner',
      content: 'Google Ranker saves hours of manual SEO work. Smart, accurate, and genuinely powerful for scaling online visibility.'
    }
  ];

  const faqs = [
    {
      question: 'How does AI make Google Business Profile work better?',
      answer: 'AI improves your profile by finding significant local trends, automatically optimizing keywords, and keeping your information up to date. This makes you show up higher when people search for businesses around them.'
    },
    {
      question: 'Why is AI important for small businesses to be seen?',
      answer: "AI makes things fairer by ensuring consistency, predicting what customers want, and giving smaller firms tools that are just as good as enterprise-level SEO tools for a lot less money."
    },
    {
      question: 'In what ways does AI make it easier to manage reviews?',
      answer: 'AI tools quickly write personalized comments to reviews, figure out the tone, and highlight useful information that can help you improve your online reputation and customer trust while saving hours every week.'
    },
    {
      question: 'What is special about targeting keywords with AI?',
      answer: "AI doesn't just choose common words. It looks at what people want, what your competitors are doing, and how people search in your area to find long-tail phrases that work better and help you show up more in local searches."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-primary blur-xl opacity-50"></div>
                <TrendingUp className="h-8 w-8 text-primary relative" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-hover to-primary-glow bg-clip-text text-transparent">
                Google Ranker
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <Button 
                variant="ghost" 
                onClick={() => navigate('/login')}
                className="text-foreground hover:text-primary"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/signup')}
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300"
              >
                Get 15 Days Free Trial
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-card transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-card/95 backdrop-blur-lg border-t border-border">
            <div className="container mx-auto px-4 py-6 space-y-4">
              <a href="#home" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">Home</a>
              <a href="#features" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#faq" className="block py-2 text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="w-full bg-gradient-primary"
                onClick={() => navigate('/signup')}
              >
                Get 15 Days Free Trial
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Local SEO</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Dominate Local Search with{' '}
              <span className="bg-gradient-to-r from-primary via-primary-hover to-primary-glow bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 animate-slide-up animation-delay-200">
              Enhance your Google Business Profile with Google Ranker's AI tools. 
              Grow easily with postings, managing reviews, and ranking higher.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-primary transition-all duration-300 text-lg px-8 py-6"
                onClick={() => navigate('/signup')}
              >
                Get Your 15 Days Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-card"
                onClick={() => navigate('/login')}
              >
                Already Registered
              </Button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Join <span className="text-primary font-semibold">536+</span> businesses already growing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The Blueprint for{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Local Market Domination
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              It's not enough to merely be online. Google Ranker helps your business become the go-to choice in your city. 
              Through our exclusive model, we partner with only 3 firms per niche per location.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-primary/30 group-hover:text-primary transition-colors">
                      {benefit.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Built for Every Industry
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by professionals across diverse sectors
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...industries, ...industries].map((industry, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-4 flex items-center space-x-3 bg-card/50 backdrop-blur-sm border border-border rounded-full px-6 py-3 hover:border-primary/50 transition-colors"
                >
                  <industry.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              All-in-One GMB Center
            </h2>
            <p className="text-lg text-muted-foreground">
              Control multiple business profiles and locations from one simple dashboard. 
              See everything about your Google Business presence at a glance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 group hover:shadow-primary/20 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all"></div>
                    <feature.icon className="h-12 w-12 text-primary relative" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Your First 15 Days are{' '}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                FREE
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* 1 Month Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">1 Month Plan</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹1099</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Auto-Post Scheduling',
                    'Review Management & Auto-Reply',
                    'Performance Analytics',
                    'Advanced Analytics',
                    'API Access',
                    'Priority Support',
                    'Unlimited Google Business Profiles'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* 6 Months Plan */}
            <Card className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">6 Months Plan</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹5999</span>
                  </div>
                  <p className="text-sm text-primary mt-2">Save ₹600 compared to monthly</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Auto-Post Scheduling',
                    'Review Management & Auto-Reply',
                    'Performance Analytics',
                    'Advanced Analytics',
                    'API Access',
                    'Priority Support',
                    'Unlimited Google Business Profiles'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-gradient-primary hover:shadow-primary transition-all duration-300"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* 1 Year Plan - Best Value */}
            <Card className="bg-gradient-primary border-0 relative overflow-hidden group">
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
                Best Value
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-primary-glow/50 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <CardContent className="p-8 relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">1 Year Plan</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">₹9999</span>
                  </div>
                  <p className="text-sm mt-2 opacity-90">Best Value - Save ₹3189 per year</p>
                </div>

                <div className="space-y-3 mb-8">
                  {[
                    'Auto-Post Scheduling',
                    'Review Management & Auto-Reply',
                    'Performance Analytics',
                    'Advanced Analytics',
                    'API Access',
                    'Priority Support',
                    'Unlimited Google Business Profiles'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-white text-primary hover:bg-white/90 transition-all duration-300"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                The Google Ranker Story
              </h2>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardContent className="p-8 lg:p-12">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Google Ranker was built on one realization: small businesses are the backbone of local communities, 
                  yet many struggle to gain online visibility. Even with excellent services, many local businesses 
                  stay invisible on Google.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Our goal was clear: give these companies solid, easy-to-use tools. We are experts in Local SEO, 
                  and we utilize AI to help businesses expand, keep their good names, and turn internet searches 
                  into real customers.
                </p>
                <p className="text-lg text-foreground font-medium">
                  With our intelligent local SEO and AI reputation tools, clients don't just stay visible — 
                  they grow, rank higher, and convert better in their local markets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join Our Growing Community
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear what business owners say about Google Ranker
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Start Dominating Local Search Today
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let our AI automate your posts and manage reviews, turning your GMB profile 
              into your #1 source for new customers.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-primary hover:shadow-primary transition-all duration-300 text-lg px-12 py-6"
              onClick={() => navigate('/signup')}
            >
              Get Your 15 Days Free Trial
              <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Google Ranker</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Built By AI experts in INDIA, Made for U.S.A Local Businesses
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
                <a href="#features" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
                <a href="#pricing" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a>
                <a href="#faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2">
                <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
                <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/refund" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Google Ranker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
