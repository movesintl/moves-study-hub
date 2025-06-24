
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Study Destinations
            </h1>
            <p className="text-xl text-gray-200">
              Explore top destinations for international education and discover your perfect study abroad experience.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {destinations?.map((destination) => (
            <Card key={destination.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-64">
                {destination.featured_image_url && (
                  <img 
                    src={destination.featured_image_url} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <MapPin className="h-4 w-4 text-white" />
                    <span className="text-white font-medium">{destination.name}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3">{destination.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {destination.description}
                </p>
                
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link to={`/destinations/${destination.id}`}>
                    Explore {destination.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
