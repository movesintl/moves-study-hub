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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/10 mb-6 border border-white/20">
            <div className="h-10 w-10 bg-gradient-to-br from-primary to-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
              Our Partners
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-4">
            World-Class Universities
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover exceptional institutions that shape the future of education and innovation
          </p>
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
            <CarouselContent className="-ml-3 md:-ml-4">
              {universities.map((university, index) => (
                <CarouselItem key={university.id} className="pl-3 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                  <div 
                    className="group h-full"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <Card className="h-full bg-white/60 backdrop-blur-sm border-0 shadow-lg duration-500 hover:scale-105 hover:-translate-y-2 group-hover:bg-white/80">
                      <CardContent className="p-6 h-full flex flex-col items-center text-center justify-between min-h-[200px]">
                        {/* University Logo */}
                        <div className="flex items-center justify-center mb-4 relative">
                          <div className="h-16 w-16 bg-white rounded-2xl shadow-lg shadow-slate-200/50 flex items-center justify-center p-2 duration-500">
                            {university.logo_url ? (
                              <img
                                src={university.logo_url}
                                alt={`${university.name} logo`}
                                className="max-h-12 max-w-12 object-contain filter group-hover:scale-110 transition-transform duration-500"
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                <GraduationCap className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                          
                          {/* Decorative ring */}
                          <div className="absolute inset-0 h-16 w-16 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 " />
                        </div>

                        {/* University Name */}
                        <div className="flex-grow flex flex-col justify-center">
                          <h3 className="text-base font-semibold text-slate-800 mb-2 duration-300 line-clamp-2 leading-tight">
                            {university.name}
                          </h3>

                          {/* Country */}
                          {university.country && (
                            <div className="flex items-center justify-center gap-1.5 text-slate-500 duration-300">
                              <div className="h-1 w-1 bg-primary rounded-full" />
                              <span className="text-sm font-medium tracking-wide">
                                {university.country}
                              </span>
                              <div className="h-1 w-1 bg-primary rounded-full" />
                            </div>
                          )}
                        </div>

                        {/* Hover overlay */}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="relative inset-auto translate-y-0 h-12 w-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg shadow-slate-200/50 hover:shadow-blue-500/20 hover:bg-white transition-all duration-300 hover:scale-110" />
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(universities.length / 5) }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-2 w-8 bg-slate-200 rounded-full hover:bg-blue-400 transition-colors duration-300 cursor-pointer"
                  />
                ))}
              </div>
              <CarouselNext className="relative inset-auto translate-y-0 h-12 w-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg shadow-slate-200/50 hover:shadow-blue-500/20 hover:bg-white transition-all duration-300 hover:scale-110" />
            </div>
          </Carousel>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-16">
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 border-0 text-base"
          >
            <Link to="/universities" className="flex items-center gap-2">
              Explore All Universities
              <div className="h-5 w-5 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">→</span>
              </div>
            </Link>
          </Button>
          
          <p className="text-slate-500 text-sm mt-4 font-medium">
            Discover {universities.length}+ partnered institutions worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;