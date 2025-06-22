
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const ServiceDetails = () => {
  const { id } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link to="/services">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Services
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {service.icon_url && (
              <div className="flex-shrink-0">
                <img 
                  src={service.icon_url} 
                  alt={service.title}
                  className="h-16 w-16 object-contain"
                />
              </div>
            )}
            <div>
              <CardTitle className="text-3xl">{service.title}</CardTitle>
              {service.short_description && (
                <p className="text-gray-600 mt-2">{service.short_description}</p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {service.full_details && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {service.full_details}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild>
          <Link to="/contact">
            Get This Service
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetails;
