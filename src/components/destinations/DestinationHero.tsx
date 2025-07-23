import React from 'react';
import { MapPin } from 'lucide-react';

interface DestinationHeroProps {
  destination: {
    name: string;
    description: string;
    featured_image_url?: string;
  };
}

const DestinationHero = ({ destination }: DestinationHeroProps) => {
  return (
    <section className="bg-[#023047] py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6">
            <div className="flex items-center gap-3">
              
              <MapPin className="h-7 w-7 text-[#fa8500]" />
              <span className="text-xl font-semibold tracking-wide">Study Destination</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold relative pb-2">
                {destination.name}
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#fa8500]"></span>
              </h1>
            </div>
            <p className="text-base md:text-base text-white-200 leading-relaxed max-w-prose">
              {destination.description}
            </p>
          </div>
          {destination.featured_image_url && (
            <div className="relative h-64 md:h-96 group">
              <img 
                src={destination.featured_image_url} 
                alt={destination.name}
                className="w-full h-full object-cover rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#fa8500] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;