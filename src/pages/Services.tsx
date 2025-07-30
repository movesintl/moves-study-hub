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
    <div className="min-h-screen">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-20 w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
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
                <span className="text-foreground font-medium">Services</span>
              </nav>

              {/* Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Comprehensive Education Solutions
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                    Expert
                  </span>
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Services
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Comprehensive education and migration services to support your
                  international study journey from dream to diploma.
                </p>
              </div>

              {/* Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link to="/services/consultation" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Book Free Consultation
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Speak to Expert
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
                  <span className="text-muted-foreground font-medium">Quick Process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500/10 to-amber-600/20 rounded-lg">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Proven Results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Modern Service Grid */}
            <div className="relative">
              {services.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {services.slice(0, 4).map((service, index) => (
                    <div
                      key={service.id}
                      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 ${
                        index === 0 ? 'col-span-2 h-32' : 'h-40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent group-hover:from-primary/10 transition-all duration-300"></div>
                      
                      <div className="relative p-6 h-full flex flex-col justify-center items-center text-center">
                        {service.icon_url ? (
                          <img
                            src={service.icon_url}
                            alt={service.title}
                            className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                        )}
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                      </div>
                      
                      {/* Hover gradient bar */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50">
        <ServicesWorksLayout/>

        <div className="">
          <FeaturedUniversities />
        </div>
        <StickyProfileComponent />
        <HighQuality />
        <Webstories />
        <LatestUpdates/>
      </div>

    </div>
  );
};

export default Services;