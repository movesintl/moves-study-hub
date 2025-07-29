import React from 'react';
import { MapPin, Home, ChevronRight, ExternalLink, BookOpen, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DestinationHeroProps {
  destination: {
    name: string;
    description: string;
    featured_image_url?: string;
  };
}

const DestinationHero = ({ destination }: DestinationHeroProps) => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#023047] py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#fa8500]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto max-w-7xl px-4 relative">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8 flex items-center text-sm text-gray-300">
          <div onClick={() => navigate('/home')} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </div>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
          <span onClick={() => navigate('/destinations')} className="hover:text-white transition-colors cursor-pointer">Destinations</span>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-500" />
          <span className="text-[#fa8500] font-medium">{destination.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#fa8500]/20 rounded-full">
                <MapPin className="h-6 w-6 text-[#fa8500]" />
              </div>
              <span className="text-xl font-semibold tracking-wide">Study Destination</span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {destination.name}
              </h1>
            </div>

            {/* Description */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#fa8500] to-transparent rounded-full"></div>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-prose">
                {destination.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#fa8500] hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#fa8500]/25">
                <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span>Explore Programs</span>
                <ExternalLink className="h-4 w-4 opacity-70" />
              </button>
              
              <button className="flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-500 hover:border-white text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <Users className="h-5 w-5" />
                <span>Connect with Students</span>
              </button>
            </div>
          </div>

          {/* Image Section */}
          {destination.featured_image_url && (
            <div className="relative group">
              {/* Main image container */}
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={destination.featured_image_url} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#023047]/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[#fa8500] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#fa8500]/20 rounded-full group-hover:scale-125 transition-transform duration-300"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-400/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestinationHero;