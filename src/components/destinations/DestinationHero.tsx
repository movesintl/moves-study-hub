
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
    <section className="relative h-96 bg-gradient-to-r from-primary to-primary/80">
      {destination.featured_image_url && (
        <div className="absolute inset-0">
          <img 
            src={destination.featured_image_url} 
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6" />
            <span className="text-lg">Study Destination</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
          <p className="text-xl text-gray-200 leading-relaxed">
            {destination.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;
