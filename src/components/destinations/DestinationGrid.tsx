import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Globe } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  description: string;
  slug: string;
  featured_image_url: string | null;
}

const DestinationGrid = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('id, name, description, slug, featured_image_url')
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

  const getDestinationTag = (slug: string) => {
    const tags: Record<string, string> = {
      'australia': 'Australia',
      'canada': 'Canada',
      'uk': 'United Kingdom',
      'usa': 'United States',
      'new-zealand': 'New Zealand',
      'europe': 'Europe'
    };
    return tags[slug] || slug.toUpperCase();
  };

  if (isLoading) {
    return (
      <section className="py-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 relative">
          {/* Left Column - Loading */}
          <div className="absolute left-0 top-0 w-full h-full flex flex-col p-5 max-w-[340px]">
            <div className="p-4 lg:p-[30px] border border-dashed rounded-md self-start lg:sticky top-[140px] space-y-6 bg-white">
              <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-5/6 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-2/3 rounded"></div>
            </div>
          </div>

          {/* Right Column - Loading Cards */}
          <div className="ml-[360px] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column - Title and Description (35%) */}
        <div className="w-full lg:w-[35%] flex flex-col sticky top-20 self-start">
          <div className="p-6 border border-dashed rounded-md bg-white">
            <h2 className="text-2xl lg:text-4xl font-bold text-primary mb-6">
              Explore Study Destinations
            </h2>
            <p className="text-lg">
              Discover the perfect country for your international education journey.
              Each destination offers unique opportunities and experiences.
              Click on any country to explore universities, visa requirements, and more.
            </p>
          </div>
        </div>

        {/* Right Column - Destination Cards (65%) */}
        <div className="w-full lg:w-[65%] grid grid-cols-1 md:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => window.location.href = `/destinations/${destination.slug}`}
              className="group relative h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              {destination.featured_image_url ? (
                <img
                  src={destination.featured_image_url}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <Globe className="h-16 w-16 text-white" />
                </div>
              )}

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Destination tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/90 backdrop-blur-sm text-black/60 px-3 py-1 rounded-full text-xs font-medium">
                  {getDestinationTag(destination.slug)}
                </span>
              </div>

              {/* Title and button */}
              <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5">
                <h3 className="text-white text-xl font-bold mb-2 leading-tight">
                  {destination.name}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/destinations/${destination.slug}`;
                  }}
                  className="flex items-center text-white text-sm font-medium group-hover:text-orange-100 transition-colors duration-200"
                >
                  Explore
                  <svg
                    className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;