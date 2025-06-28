
import React from 'react';
import { Play } from 'lucide-react';

interface PageViewHeroProps {
  title: string;
  subtitle?: string;
  featureImageUrl?: string;
}

const PageViewHero = ({ title, subtitle, featureImageUrl }: PageViewHeroProps) => {
  return (
    <section className="bg-primary py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Title, Description, and Breadcrumb */}
          <div className="text-white space-y-6">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-accent">{title.split(' ')[0]}</span>
              {title.split(' ').length > 1 && (
                <span className="text-white"> {title.split(' ').slice(1).join(' ')}</span>
              )}
            </h1>
            
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg">
                {subtitle}
              </p>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-white/80">
              <a href="/" className="hover:text-accent transition-colors">
                Home
              </a>
              <span className="text-accent">•</span>
              <span className="text-accent">{title}</span>
            </div>
          </div>

          {/* Right Column - Featured Image */}
          <div className="relative">
            {featureImageUrl ? (
              <img 
                src={featureImageUrl} 
                alt={title}
                className="w-full h-80 lg:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-80 lg:h-96 bg-white/10 border-2 border-white/20 flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </div>
                  <p>No featured image</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageViewHero;
