import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  slug: string;
  icon_url?: string;
  description?: string;
}

const ServiceMegaMenu: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, slug, icon_url')
          .order('title')
          .limit(8);

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceIcon = (iconUrl?: string) => {
    if (iconUrl) {
      return (
        <img 
          src={iconUrl} 
          alt="Service icon"
          className="w-8 h-8 rounded object-cover"
        />
      );
    }
    return <Settings className="w-8 h-8 text-primary" />;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="p-4 border border-border rounded-lg animate-pulse">
            <div className="w-8 h-8 bg-muted rounded mb-3"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b border-border pb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">Our Services</h3>
        <p className="text-sm text-muted-foreground">Comprehensive support for your educational journey</p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <Link
            key={service.id}
            to={`/services/${service.slug}`}
            className="group p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 hover:shadow-soft"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                {getServiceIcon(service.icon_url)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                  {service.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Professional guidance for your educational journey
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Learn More</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-border">
        <Link
          to="/services"
          className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Settings className="w-4 h-4" />
          <span>View All Services</span>
        </Link>
      </div>
    </div>
  );
};

export default ServiceMegaMenu;