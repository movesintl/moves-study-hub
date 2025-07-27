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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px]">
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8 pt-0">
              {/* Breadcrumb Navigation */}
              <nav className="mb-8 flex items-center text-sm text-gray-300">
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
                <span className="hover:text-white transition-colors cursor-pointer">Destinations</span>
              </nav>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Study Destinations
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  Explore top international education destinations and find the perfect country for your study abroad journey.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 rounded-lg">
                  <Link to="/contact" className="flex items-center">
                    Get Free Advice
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white hover:bg-white/90 bg-white text-primary hover:text-primary text-lg px-8 py-6 rounded-lg transition-all duration-300"
                >
                  <Link to="/services" className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2" />
                    Our Services
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-white/80 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Expert guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Visa assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-accent" />
                  <span>Global network</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative hidden lg:block">
              <div className="w-full h-[400px] bg-gradient-to-br from-primary/80 to-primary/60 rounded-xl overflow-hidden flex items-center justify-center">
                <Globe className="h-32 w-32 text-white opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center px-8">
                    <h3 className="text-2xl font-bold mb-2">Worldwide Coverage</h3>
                    <p className="text-lg">We support students in countries across all continents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
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
  );
};

export default Destinations;