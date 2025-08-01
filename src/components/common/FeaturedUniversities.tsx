import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, GraduationCap, ExternalLink, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const handleViewAllUniversities = () => {
    navigate('/universities');
  };
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
      <section className="py-10 ">
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
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-start mb-16">
          <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4 mr-2" />
            Our Partners
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-primary bg-clip-text  mb-4">
            World-Class Universities
          </h2>
          <div className="flex justify-between">

            <p className="text-lg text-slate-600 leading-relaxed items-start">
              Discover exceptional institutions that shape the future of education and innovation
            </p>
            <div className="text-end">
              <button
                onClick={handleViewAllUniversities}
                className="flex items-center -mt-5 gap-2 px-4 py-2 border border-orange-500 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200 transition"
              >
                Explore All Universities <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Universities Carousel */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {universities.map((university, index) => (
                <CarouselItem
                  key={university.id}
                  // Changed basis to wider values - adjust these as needed
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="group h-full" style={{ animationDelay: `${index * 100}ms` }}>
                    {/* Changed card to use flex-1 for better height control */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex-1 overflow-hidden">
                      {/* Card Content - removed fixed height */}
                      <div className="p-6 h-full flex flex-col items-center text-center">
                        {/* University Logo */}
                        <div className="mb-6 relative">
                          <div className="w-24 h-24 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm">
                            {university.logo_url ? (
                              <img
                                src={university.logo_url}
                                alt={`${university.name} logo`}
                                className="w-20 h-20 object-contain"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                <GraduationCap className="w-10 h-10 text-white" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* University Name */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight line-clamp-2 text-center">
                          {university.name}
                        </h3>

                        {/* Location */}
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2 text-center">
                          {university.location || `${university.country || 'International'}`}
                        </p>

                        {/* Spacer to push button to bottom */}
                        <div className="flex-grow"></div>

                        {/* View Details Button - added min-width and better padding */}
                        <Button
                          asChild
                          className="items-center gap-2 px-4 text-white py-2.5 bg-accent border border-gray-200 rounded-lg hover:bg-accent/90
                           hover:border-gray-300 hover:shadow-2xl hover:shadow-accent/25 transition-all duration-200 text-sm font-medium w-full 
                           justify-center min-w-[180px] hover:scale-105"
                        >
                          <Link to={`/universities/${university.slug || university.id}`}>
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

          </Carousel>
          {/* Dots Indicator */}
          {universities.length > 6 && (

            <div className="mt-4 bottom-6 left-0 right-0 flex justify-center items-center space-x-3 z-30">
              {universities.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === 0 ? 'bg-primary/90 w-5' : 'bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Go to university ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Discover {universities.length}+ partnered institutions worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;