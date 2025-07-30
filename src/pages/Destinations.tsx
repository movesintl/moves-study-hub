import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  Home,
  ChevronRight,
  Globe,
  GraduationCap,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import FeaturedUniversities from '@/components/common/FeaturedUniversities';
import StickyProfileComponent from '@/components/common/StickyProfile';
import HighQuality from '@/components/common/HighQuality';
import Webstories from '@/components/common/Webstories';
import LatestUpdates from '@/components/common/LatestUpdates';
import DestinationGrid from '@/components/destinations/DestinationGrid';

const Destinations = () => {
  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-16 w-36 h-36 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-80 right-24 w-28 h-28 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <div className="p-1 bg-gradient-to-br from-primary/10 to-primary/20 rounded">
                    <Home className="h-3 w-3 text-primary" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">Destinations</span>
              </nav>

              {/* Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Global Education Opportunities
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                    Study
                  </span>
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Destinations
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Explore top international education destinations and find the perfect 
                  country for your transformative study abroad journey.
                </p>
              </div>

              {/* Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Get Free Advice
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link to="/services" className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Our Services
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Expert Guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-lg">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Visa Assistance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-lg">
                    <Globe className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Global Network</span>
                </div>
              </div>
            </div>

            {/* Right Column - Modern Visual */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                
                <div className="relative p-12 h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-4">Worldwide Coverage</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We support students in countries across all continents with comprehensive guidance
                  </p>
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/40 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-secondary/20 to-secondary/40 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                
                {/* Decorative gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <div className="bg-gray-50">
        <DestinationGrid/>

        {/* Additional Sections */}
        <div className="">
          <FeaturedUniversities />
        </div>
        <StickyProfileComponent />
        <HighQuality />
        <Webstories />
        <LatestUpdates />
      </div>
    </div>
  );
};

export default Destinations;