import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface University {
  id: string;
  name: string;
  location: string | null;
  country: string | null;
  website_url: string | null;
  logo_url: string | null;
  overview_content: string | null;
  slug: string | null;
  featured: boolean;
}

const FeaturedUniversities = () => {
  const { data: universities = [], isLoading } = useQuery({
    queryKey: ['featured-universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('featured', true)
        .order('name');
      
      if (error) throw error;
      return data as University[];
    },
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-gray-50 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Universities
            </h2>
            <div className="animate-pulse flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 w-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (universities.length === 0) {
    return null; // Don't show section if no featured universities
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-gray-50 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Universities
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover world-class institutions that have partnered with us to offer exceptional educational opportunities
          </p>
        </div>

        {/* Universities Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {universities.map((university) => (
                <CarouselItem key={university.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group border-2 hover:border-primary/20">
                    <CardContent className="p-6 h-full flex flex-col items-center text-center">
                      {/* University Logo */}
                      <div className="flex items-center justify-center mb-4 h-16 w-16">
                        {university.logo_url ? (
                          <img
                            src={university.logo_url}
                            alt={`${university.name} logo`}
                            className="max-h-16 max-w-16 object-contain rounded-lg"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* University Name */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                        {university.name}
                      </h3>

                      {/* Country */}
                      {university.country && (
                        <div className="flex items-center justify-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {university.country}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="hover:scale-105 transition-transform">
            <Link to="/universities">
              View All Universities
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;