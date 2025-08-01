import React from 'react';
import { Play, Home, ChevronRight, CheckCircle, Clock, Globe, GraduationCap, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageViewHeroProps {
  title: string;
  subtitle?: string;
  featureImageUrl?: string;
}

const PageViewHero = ({ title, subtitle, featureImageUrl }: PageViewHeroProps) => {
  return (
    <section className="relative bg-[#023047] text-white py-12 lg:py-20 overflow-hidden">
      {/* Enhanced background elements with smoother animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-36 h-36 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-28 h-28 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-44 h-44 bg-white/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
        {/* Additional subtle decorative elements */}
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-20"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full animate-ping delay-2000 opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px]">
          {/* Left Column - Text Content */}
          <div className="space-y-8 pt-0 animate-fade-in">
            {/* Enhanced Modern Breadcrumb */}
            <nav className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 cursor-pointer group">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300">
                  <Home className="h-3 w-3 text-white" />
                </div>
                <span>Home</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/50" />
              <span className="text-white font-medium">{title}</span>
            </nav>

            {/* Enhanced Hero Content */}
            <div className="space-y-6">
              {subtitle && (
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/20 hover:border-white/30 transition-all duration-300 animate-scale-in">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  {subtitle}
                </div>
              )}
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-fade-in">
                <span className="block text-white drop-shadow-lg">
                  {title.split(' ')[0]}
                </span>
                {title.split(' ').length > 1 && (
                  <span className="block bg-gradient-to-r from-accent via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
                    {title.split(' ').slice(1).join(' ')}
                  </span>
                )}
              </h1>
              
              {subtitle && (
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-200">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Enhanced Modern Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Button
                size="lg" 
                className="bg-accent hover:bg-accent/90 shadow-xl hover:shadow-2xl hover:shadow-accent/25 
                transition-all duration-300 text-lg px-8 py-6 text-white transform hover:scale-105"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Get Free Advice
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 bg-primary hover:scale-105 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white hover:text-white text-lg px-8 py-6 transition-all duration-300"
              >
                <Link to="/services" className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Our Services
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                </div>
                <span className="text-white/90 font-medium">Expert Guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <Clock className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white/90 font-medium">Visa Assistance</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 backdrop-blur-sm rounded-lg border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
                  <Globe className="h-4 w-4 text-amber-400" />
                </div>
                <span className="text-white/90 font-medium">Global Network</span>
              </div>
            </div>
          </div>

          {/* Enhanced Right Column - Modern Featured Visual */}
          <div className="relative hidden lg:block animate-fade-in delay-700">
            <div className="relative w-full h-[400px] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
              
              {featureImageUrl ? (
                <img
                  src={featureImageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent to-orange-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Globe className="h-12 w-12 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                  {subtitle && (
                    <p className="text-lg text-white/80 leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                  
                  {/* Floating elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-accent/30">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageViewHero;