import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, ArrowLeft, Sparkles, Globe, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Set target date (30 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-brand relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center items-center text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-8 w-8 text-accent mr-3 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">Coming Soon</h1>
            <Sparkles className="h-8 w-8 text-accent ml-3 animate-pulse" />
          </div>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            We're working on something amazing for you. Stay tuned for updates!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <Card key={unit} className="glass border-white/20 p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-white/70 text-sm uppercase tracking-wider">
                  {unit}
                </div>
              </Card>
            ))}
          </div>
          <div className="flex items-center justify-center text-white/70">
            <Clock className="h-5 w-5 mr-2" />
            <span>Launch countdown</span>
          </div>
        </div>

        {/* Email Subscription */}
        <div className="mb-12 w-full max-w-md">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="text-white mb-4">
                <h3 className="text-xl font-semibold mb-2">Get Notified</h3>
                <p className="text-white/80">Be the first to know when we launch!</p>
              </div>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/60 focus:border-accent"
                />
                <Button 
                  type="submit" 
                  className="bg-accent hover:bg-accent/90 text-white px-6"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-white">
              <div className="flex items-center justify-center mb-2">
                <Mail className="h-5 w-5 mr-2" />
                <span className="font-semibold">Thank you!</span>
              </div>
              <p className="text-sm text-white/90">We'll notify you when we launch.</p>
            </div>
          )}
        </div>

        {/* Feature Preview */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <Card className="glass border-white/20 p-6 text-center">
            <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Global Reach</h3>
            <p className="text-white/70 text-sm">Connect with opportunities worldwide</p>
          </Card>
          <Card className="glass border-white/20 p-6 text-center">
            <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Expert Guidance</h3>
            <p className="text-white/70 text-sm">Professional educational consulting</p>
          </Card>
          <Card className="glass border-white/20 p-6 text-center">
            <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Premium Experience</h3>
            <p className="text-white/70 text-sm">Cutting-edge platform features</p>
          </Card>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <Link to="/">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link to="/about" className="text-white/70 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/services" className="text-white/70 hover:text-white transition-colors">
              Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;