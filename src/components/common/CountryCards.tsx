import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, DollarSign, Clock, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const CountryCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Mock destinations data (replace with your actual data)
  const destinations = [
    {
      id: 1,
      name: 'Australia',
      slug: 'australia',
      description: 'Experience world-class education in the land down under',
      flag_icon_url: null,
      average_fee: '$30,000 - $45,000'
    },
    {
      id: 2,
      name: 'Canada',
      slug: 'canada',
      description: 'Study in one of the world\'s most welcoming countries',
      flag_icon_url: null,
      average_fee: '$25,000 - $35,000'
    },
    {
      id: 3,
      name: 'United Kingdom',
      slug: 'uk',
      description: 'Discover centuries of academic excellence',
      flag_icon_url: null,
      average_fee: '$35,000 - $50,000'
    },
    {
      id: 4,
      name: 'New Zealand',
      slug: 'new-zealand',
      description: 'Study in breathtaking natural beauty',
      flag_icon_url: null,
      average_fee: '$28,000 - $40,000'
    },
    {
      id: 5,
      name: 'Germany',
      slug: 'germany',
      description: 'Excellence in engineering and innovation',
      flag_icon_url: null,
      average_fee: '$15,000 - $25,000'
    }
  ];

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
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 200);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 200);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 200);
  };

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleItems = () => {
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

  return (
    <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <div className="flex items-center justify-center gap-4 py-8 relative">
              {getVisibleItems().map((destination, index) => {
                const config = countryConfig[destination.name] || getDefaultConfig(destination.name);
                const isCenter = destination.isCenter;
                const position = destination.position; // -1 (left), 0 (center), 1 (right)
                
                return (
                  <div
                    key={`${destination.id}-${index}`}
                    className={`transition-all duration-600 ease-out transform ${
                      isCenter 
                        ? 'scale-100 opacity-100 z-10 translate-x-0' 
                        : 'scale-75 opacity-40 z-0'
                    } ${
                      isTransitioning 
                        ? position === -1 
                          ? 'translate-x-[-100px] opacity-20' 
                          : position === 1 
                          ? 'translate-x-[100px] opacity-20'
                          : 'translate-x-0 opacity-60'
                        : position === -1 
                        ? 'translate-x-0' 
                        : position === 1 
                        ? 'translate-x-0'
                        : 'translate-x-0'
                    }`}
                    style={{
                      flex: isCenter ? '0 0 400px' : '0 0 300px',
                      cursor: isCenter ? 'default' : 'pointer'
                    }}
                    onClick={() => !isCenter && goToSlide(destinations.findIndex(d => d.id === destination.id))}
                  >
                    <div className={`bg-white rounded-xl shadow-lg overflow-hidden h-96 transition-all duration-600 ${
                      isCenter ? 'shadow-2xl transform hover:shadow-3xl' : 'shadow-md hover:shadow-lg transform hover:scale-80'
                    } ${isTransitioning ? 'shadow-xl' : ''}`}>
                      {/* Header with gradient */}
                      <div className={`bg-gradient-to-r ${config.gradient} p-6 text-white relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-4xl">
                              {destination.flag_icon_url ? (
                                <img 
                                  src={destination.flag_icon_url} 
                                  alt={`${destination.name} flag`}
                                  className="w-12 h-8 object-cover rounded"
                                />
                              ) : (
                                config.flag
                              )}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{destination.name}</h3>
                              <p className="text-white/90 text-sm">{destination.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Key Features */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Key Benefits</h4>
                          <ul className="space-y-1">
                            {config.features.slice(0, 2).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                            <span className="font-medium">Average Fee:</span>
                            <span className="ml-1">{destination.average_fee || config.averageFee}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-blue-600" />
                            <span className="font-medium">Duration:</span>
                            <span className="ml-1">{config.duration}</span>
                          </div>
                        </div>

                        {/* CTA Button */}
                        {isCenter && (
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
                            Explore {destination.name}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
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