import React from 'react';
import { MapPin, Home, ChevronRight, ExternalLink, BookOpen, Users, MessageCircle, CheckCircle, Clock, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

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
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                <MapPin className="h-4 w-4 text-accent " />
                Study Destination
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
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
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
              >
                <Link to="/services/consultation" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  <span>
                    Explore Programs
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 bg-primary hover:scale-105 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300"
              >
                <Link to="/contact"
                  className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Connect with Students
                </Link>
              </Button>
            </div>
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4 animate-fade-in delay-500">
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-white/90 font-medium">Expert Guidance</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 group-hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  <Clock className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white/90 font-medium">Visa Assistance</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30 group-hover:border-amber-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/20">
                  <Award className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-white/90 font-medium">Global Network</span>
              </div>
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