import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, ExternalLink, GraduationCap } from 'lucide-react';
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
}

interface UniversityGridProps {
  universities: University[];
}

export const UniversityGrid = ({ universities }: UniversityGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {universities.map((university) => (
        <Card key={university.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-md overflow-hidden border border-border">
          <CardContent className="p-0">
            {/* Header with Logo */}
            <div className="bg-secondary/50 p-8 text-center">
              {university.logo_url ? (
                <div className="w-20 h-20 mx-auto mb-4 bg-card rounded-full p-3 shadow-sm">
                  <img 
                    src={university.logo_url} 
                    alt={university.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 mx-auto mb-4 bg-card rounded-full flex items-center justify-center shadow-sm">
                  <Building2 className="h-10 w-10 text-primary" />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                {university.name}
              </h3>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 bg-card">
              {/* Location & Country */}
              <div className="space-y-3">
                {university.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{university.location}</span>
                  </div>
                )}
                {university.country && (
                  <Badge variant="outline" className="text-xs">
                    {university.country}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="py-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Programs</span>
                  </div>
                  <span className="font-semibold text-card-foreground">
                    {university.courses?.[0]?.count || 0}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Link to={`/universities/${university.slug || university.id}`}>
                  <Button className="w-full">
                    View University
                  </Button>
                </Link>
                
                {university.website_url && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Official Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};