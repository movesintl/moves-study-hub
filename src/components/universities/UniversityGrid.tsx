import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, ExternalLink, GraduationCap, Sparkles, Heart } from 'lucide-react';
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

interface UniversityGridProps {
  universities: University[];
}

export const UniversityGrid = ({ universities }: UniversityGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {universities.map((university) => (
        <div key={university.id} className="h-full">
          <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 rounded-xl h-full">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/5 pointer-events-none"></div>

            {/* {university.featured && (
              <div className="absolute top-2 left-2 z-20">
                <div className="flex items-center gap-1 bg-gradient-to-r from-[#fa8500] to-[#023047] text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                  <Sparkles className="h-2.5 w-2.5" />
                  Featured
                </div>
              </div>
            )} */}

            {/* University logo section */}
            <div className="relative h-28 bg-gradient-to-br from-slate-100 via-[#023047]/5 to-[#fa8500]/10 flex items-center justify-center p-6">
              {university.logo_url ? (
                <img
                  src={university.logo_url}
                  alt={university.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center justify-center">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3 relative z-10">
              {/* Title and Location */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300">
                  {university.name}
                </h3>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                  <span className="text-sm font-medium">
                    {university.location}, {university.country}
                  </span>
                </div>
              </div>

              {/* Programs count */}
              <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                    <GraduationCap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Programs</span>
                </div>
                <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
                  {university.courses?.[0]?.count || 0}
                </span>
              </div>

              {/* Separator with gradient */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 h-10 font-semibold border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                  asChild
                >
                  <Link to={`/universities/${university.slug || university.id}`}>
                    View Details
                  </Link>
                </Button>
                {university.website_url && (
                  <Button
                    className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    asChild
                  >
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};