import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, DollarSign, Clock, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../ui/button';
import { supabase } from '@/integrations/supabase/client';



const CountryCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch destinations from Supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('id, name, slug, description, flag_icon_url, average_fee, why_study_points')
          .order('name');
        
        if (error) {
          console.error('Error fetching destinations:', error);
        } else {
          setDestinations(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Country-specific configurations
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
    },
    'Germany': {
      flag: '🇩🇪',
      features: ['Low tuition fees', 'Strong economy', 'Research excellence'],
      averageFee: '$15,000 - $25,000',
      duration: '1-4 years',
      intakes: 'Oct, Apr',
      gradient: 'from-yellow-400 to-red-600'
    },
    'USA': {
      flag: '🇺🇸',
      features: ['World-class universities', 'Innovation hub', 'Diverse opportunities'],
      averageFee: '$40,000 - $60,000',
      duration: '1-4 years',
      intakes: 'Aug, Jan',
      gradient: 'from-blue-500 to-red-500'
    }
  };

  const getDefaultConfig = (countryName) => ({
    flag: '🌍',
    features: ['Quality education', 'International experience', 'Career opportunities'],
    averageFee: 'Contact for details',
    duration: '1-4 years',
    intakes: 'Multiple intakes',
    gradient: 'from-blue-400 to-indigo-600'
  });

  const nextSlide = () => {
    if (isTransitioning || destinations.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const prevSlide = () => {
    if (isTransitioning || destinations.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex || destinations.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  // Auto-play functionality
  useEffect(() => {
    if (destinations.length === 0) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [destinations.length, isTransitioning]);

  const getVisibleItems = () => {
    if (destinations.length === 0) return [];
    
    const items = [];
    const totalItems = destinations.length;
    
    // Show 3 items: previous, current, next
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + totalItems) % totalItems;
      items.push({
        ...destinations[index],
        position: i,
        isCenter: i === 0
      });
    }
    
    return items;
  };

  if (isLoading) {
    return (
      <div className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Study Destination
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Loading destinations...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Study Destination
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No destinations available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
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
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center gap-6 py-8 relative">
              {getVisibleItems().map((destination, index) => {
                const config = countryConfig[destination.name] || getDefaultConfig(destination.name);
                const isCenter = destination.isCenter;
                const position = destination.position;
                
                // Get features from database or fallback to config
                const features = destination.why_study_points && Array.isArray(destination.why_study_points) 
                  ? destination.why_study_points.slice(0, 3) 
                  : config.features;
                
                return (
                  <div
                    key={`${destination.id}-${index}`}
                    className={`transition-all duration-500 ease-out transform mx-auto ${
                      isCenter 
                        ? 'scale-100 opacity-100 z-20' 
                        : 'scale-85 opacity-60 z-10'
                    } ${position === -1 
                      ? '-translate-x-4' 
                      : position === 1 
                      ? 'translate-x-4'
                      : 'translate-x-0'
                    } hover:scale-105 cursor-pointer`}
                    style={{
                      flex: '0 0 360px',
                      filter: isCenter ? 'none' : 'brightness(0.9)',
                    }}
                    onClick={() => !isCenter && goToSlide(destinations.findIndex(d => d.id === destination.id))}
                  >
                    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden h-[400px] transition-all duration-500 ease-out mx-4 ${
                      isCenter 
                        ? 'shadow-2xl ring-2 ring-blue-100' 
                        : 'shadow-md hover:shadow-xl'
                    }`}>
                      {/* Header with gradient */}
                      <div className={`bg-gradient-to-r ${config.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl transform transition-transform duration-300 hover:scale-110">
                              {destination.flag_icon_url ? (
                                <img 
                                  src={destination.flag_icon_url} 
                                  alt={`${destination.name} flag`}
                                  className="w-12 h-8 object-cover rounded shadow-md"
                                />
                              ) : (
                                config.flag
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                              <p className="text-white/90 text-sm line-clamp-2 leading-relaxed">
                                {destination.description || `Discover amazing opportunities to study in ${destination.name}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Key Features */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-600" />
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {features.slice(0, 2).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start text-sm text-gray-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="line-clamp-1 leading-relaxed">
                                  {typeof feature === 'string' ? feature : feature.point || feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm text-gray-700">
                            <DollarSign className="w-4 h-4 mr-3 text-green-600 flex-shrink-0" />
                            <span className="font-medium min-w-0">
                              {destination.average_fee || config.averageFee}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-700">
                            <Clock className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                            <span className="font-medium">{config.duration}</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button className={`w-full py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                          isCenter 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}>
                          {isCenter ? 'Explore' : 'View'} {destination.name}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute -left-5 z-10 top-1/2 transform -translate-y-1/2 bg-white hover:bg-white text-gray-700 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute -right-5 z-10 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentIndex 
                  ? 'w-8 h-3 bg-blue-600 rounded-full' 
                  : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
              }`}
            />
          ))}
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
    </div>
  );
};

export default CountryCards;