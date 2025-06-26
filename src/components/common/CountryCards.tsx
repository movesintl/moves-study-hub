
import React from 'react';
import { ArrowRight, MapPin, DollarSign, Clock, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CountryCards = () => {
  const { toast } = useToast();

  const { data: destinations, isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching destinations:', error);
        toast({
          title: "Error",
          description: "Failed to load destinations.",
          variant: "destructive",
        });
        throw error;
      }
      return data;
    },
  });

  // Country-specific configurations (can be moved to database later if needed)
  const countryConfig = {
    'Australia': {
      flag: '🇦🇺',
      features: ['2-4 year work visa', 'High-quality education', 'Multicultural society'],
      averageFee: '$30,000 - $45,000',
      duration: '1-4 years',
      intakes: 'Feb, Jul, Nov',
      gradient: 'from-green-400 to-blue-600'
    },
    'Canada': {
      flag: '🇨🇦',
      features: ['Work while studying', 'PR pathways', 'Safe environment'],
      averageFee: '$25,000 - $35,000',
      duration: '1-4 years',
      intakes: 'Jan, May, Sep',
      gradient: 'from-red-400 to-red-600'
    },
    'United Kingdom': {
      flag: '🇬🇧',
      features: ['1-year masters', 'Research opportunities', 'Rich culture'],
      averageFee: '$35,000 - $50,000',
      duration: '1-3 years',
      intakes: 'Sep, Jan',
      gradient: 'from-blue-400 to-purple-600'
    },
    'New Zealand': {
      flag: '🇳🇿',
      features: ['Work opportunities', 'Safe country', 'Beautiful nature'],
      averageFee: '$28,000 - $40,000',
      duration: '1-4 years',
      intakes: 'Feb, Jul',
      gradient: 'from-green-400 to-teal-600'
    }
  };

  // Default configuration for countries not in the config
  const getDefaultConfig = (countryName: string) => ({
    flag: '🌍',
    features: ['Quality education', 'International experience', 'Career opportunities'],
    averageFee: 'Contact for details',
    duration: '1-4 years',
    intakes: 'Multiple intakes',
    gradient: 'from-blue-400 to-indigo-600'
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Study Destination
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Loading destinations...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Study Destination
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No destinations available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Study Destination
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top study destinations with excellent education systems, 
            work opportunities, and pathways to permanent residency.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {destinations.map((destination) => {
                const config = countryConfig[destination.name as keyof typeof countryConfig] || getDefaultConfig(destination.name);
                
                return (
                  <CarouselItem key={destination.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                      {/* Header with gradient */}
                      <div className={`bg-gradient-to-r ${config.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 text-6xl opacity-20">
                          {config.flag}
                        </div>
                        <div className="relative z-10">
                          <div className="text-3xl mb-2">{config.flag}</div>
                          <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                          <p className="text-sm opacity-90">{destination.description || `Discover amazing opportunities to study in ${destination.name}`}</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Key Features */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                          <ul className="space-y-1">
                            {config.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Average Fee
                            </span>
                            <span className="font-medium">{config.averageFee}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              Duration
                            </span>
                            <span className="font-medium">{config.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center text-gray-600">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              Intakes
                            </span>
                            <span className="font-medium">{config.intakes}</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button 
                          className="w-full mt-4 bg-accent hover:bg-accent/90 text-white group-hover:shadow-lg transition-all"
                          asChild
                        >
                          <Link to={`/destinations/${destination.slug}`}>
                            Explore {destination.name}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg border-2 border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 h-12 w-12" />
            <CarouselNext className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg border-2 border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 h-12 w-12" />
          </Carousel>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Not sure which destination is right for you?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our expert counselors will help you choose the best study destination based on 
              your academic background, career goals, and budget.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Get Free Counseling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryCards;
