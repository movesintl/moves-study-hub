import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, ExternalLink, GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface University {
  id: string;
  name: string;
  location?: string;
  country?: string;
  logo_url?: string;
  website_url?: string;
  slug?: string;
  courses?: Array<{ count: number }>;
  featured?: boolean;
}

interface UniversityListProps {
  universities: University[];
}

export const UniversityList = ({ universities }: UniversityListProps) => {
  return (
    <div className="space-y-4">
      {universities.map((university) => (
        <Card key={university.id} className="group relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl">
          <div className="flex flex-col md:flex-row">
            {/* University Logo - Left Side */}
            <div className="md:w-1/5 p-6 flex items-center justify-center bg-gray-50">
              {university.logo_url ? (
                <img
                  src={university.logo_url}
                  alt={university.name}
                  className="w-full max-w-[120px] h-auto max-h-[80px] object-contain"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>

            {/* Content - Right Side */}
            <div className="md:w-4/5 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 underline cursor-pointer leading-tight group-hover:text-primary transition-colors duration-300">
                    {university.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span className="text-sm font-medium">
                      {university.location ? `${university.location}, ` : ''}{university.country}
                    </span>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full h-10 w-10 p-0 border-0 transition-all duration-300 hover:scale-110 text-gray-400 hover:text-red-500"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              {/* Stats and Badges */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-1.5 text-primary" />
                  <span>{university.courses?.[0]?.count || 0} Programs Available</span>
                </div>

                {university.featured && (
                  <Badge variant="outline" className="text-xs font-medium bg-orange-50 text-orange-500 border-orange-200 px-2.5 py-0.5">
                    Featured University
                  </Badge>
                )}
              </div>

              <div className="border-b border-gray-200 my-3"></div>

              {/* Actions */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center">
                  <ExternalLink className="h-4 w-4 mr-1.5 text-gray-400" />
                  {university.website_url ? (
                    <a 
                      href={university.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-primary transition-colors"
                    >
                      Visit Official Website
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">No website available</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="h-9 font-semibold border-2 hover:bg-orange-500 hover:border-orange-500 border-primary text-primary hover:text-white transition-all duration-300"
                    asChild
                  >
                    <Link to={`/universities/${university.slug || university.id}`}>
                      View Details
                    </Link>
                  </Button>
                  <Button
                                  className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    asChild
                  >
                    <Link to={`/universities/${university.slug || university.id}/apply`}>
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};