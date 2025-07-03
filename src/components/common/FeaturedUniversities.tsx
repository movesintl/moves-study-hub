import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ExternalLink, MapPin, GraduationCap } from 'lucide-react';
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

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

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
                <CarouselItem key={university.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                    <CardContent className="p-6 h-full flex flex-col">
                      {/* University Logo */}
                      <div className="flex items-center justify-center mb-6 h-20">
                        {university.logo_url ? (
                          <img
                            src={university.logo_url}
                            alt={`${university.name} logo`}
                            className="max-h-16 max-w-full object-contain"
                          />
                        ) : (
                          <div className="h-16 w-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* University Name */}
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center group-hover:text-primary transition-colors">
                        {university.name}
                      </h3>

                      {/* Location */}
                      {(university.location || university.country) && (
                        <div className="flex items-center justify-center gap-1 mb-4 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">
                            {[university.location, university.country].filter(Boolean).join(', ')}
                          </span>
                        </div>
                      )}

                      {/* Overview */}
                      {university.overview_content && (
                        <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-4">
                          {stripHtml(university.overview_content).substring(0, 150)}
                          {stripHtml(university.overview_content).length > 150 && '...'}
                        </p>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-auto">
                        {university.slug && (
                          <Button 
                            asChild 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                          >
                            <Link to={`/universities/${university.slug}`}>
                              Learn More
                            </Link>
                          </Button>
                        )}
                        
                        {university.website_url && (
                          <Button 
                            asChild 
                            size="sm" 
                            className="flex-1"
                          >
                            <a 
                              href={university.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              Visit Site
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {universities.length > 3 && (
              <>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </>
            )}
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