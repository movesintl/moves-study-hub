import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  FileCheck,
  Plane,
  BookOpen,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { supabase } from '@/integrations/supabase/client';
import FeaturedUniversities from '@/components/common/FeaturedUniversities';
import StickyProfileComponent from '@/components/common/StickyProfile';
import HighQuality from '@/components/common/HighQuality';
import Webstories from '@/components/common/Webstories';
import ServicesWorksLayout from '@/components/services/ServicesWorksLayout';
import LatestUpdates from '@/components/common/LatestUpdates';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, icon_url, slug')
          .limit(6);

        if (error) {
          console.error('Error fetching services:', error);
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Animation effect for the masonry grid
  useEffect(() => {
    if (services.length === 0) return;

    const interval = setInterval(() => {
      setCurrentLogoIndex(prev => (prev + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px]">
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8">
               {/* Breadcrumb Navigation */}
                      <nav className="mb-8 flex items-center text-sm text-gray-300">
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </div>
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
                        <span className="hover:text-white transition-colors cursor-pointer">Service</span>
                        
                      </nav>

              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  Our Services
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  Comprehensive education and migration services to support your
                  international study journey from start to finish.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 rounded-lg">
                  <Link to="/services/consultation" className="flex items-center">
                    Book Free Consultation
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white hover:bg-white/90 bg-white text-primary hover:text-primary text-lg px-8 py-6 rounded-lg transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Speak to Expert
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
                  <span>Quick process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Proven results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image Grid */}
            <div className="relative hidden lg:block">
              {services.length > 0 && (
                <div className="grid grid-cols-3 gap-4 w-full h-[400px]">
                  {[...Array(6)].map((_, index) => {
                    const serviceIndex = (currentLogoIndex + index) % services.length;
                    const service = services[serviceIndex];

                    return (
                      <div
                        key={index}
                        className="relative rounded-lg overflow-hidden transition-all duration-500 ease-in-out hover:scale-105"
                      >
                        {service.icon_url ? (
                          <img
                            src={service.icon_url}
                            alt={service.title}
                            className="w-full h-full object-cover bg-white"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                            <Award className="h-16 w-16 text-white" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

     

      <ServicesWorksLayout/>

      <div className="">
        <FeaturedUniversities />
      </div>
      <StickyProfileComponent />
      <HighQuality />
      <Webstories />
      <LatestUpdates/>

    </div>
  );
};

export default Services;