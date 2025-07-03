import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, GraduationCap, ExternalLink, Calendar, Users } from 'lucide-react';

interface UniversityHeroProps {
  university: {
    name: string;
    country?: string;
    location?: string;
    logo_url?: string;
    website_url?: string;
  };
  coursesCount: number;
}

export const UniversityHero = ({ university, coursesCount }: UniversityHeroProps) => {
  return (
    <section className="relative bg-muted border-b border-border">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Content - 8 columns */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4" />
                  <span>University</span>
                  {university.country && (
                    <>
                      <span>•</span>
                      <span>{university.country}</span>
                    </>
                  )}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {university.name}
                </h1>
                
                {university.location && (
                  <div className="flex items-center gap-2 text-lg text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span>{university.location}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="flex items-center gap-2 text-foreground">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="font-medium">{coursesCount}</span>
                  <span className="text-muted-foreground">Programs</span>
                </div>
                {university.website_url && (
                  <div className="flex items-center gap-2 text-foreground">
                    <ExternalLink className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">Official Website</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact">
                  <Button size="lg" className="px-8">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Counselling
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="px-8">
                    <Users className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                </Link>
                
                {university.website_url && (
                  <Button size="lg" variant="ghost" asChild>
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Logo - 4 columns */}
            {university.logo_url && (
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3"></div>
                  <div className="relative bg-card p-8 rounded-3xl shadow-lg">
                    <img 
                      src={university.logo_url} 
                      alt={university.name}
                      className="h-32 w-32 lg:h-40 lg:w-40 object-contain"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};