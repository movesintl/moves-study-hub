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

interface UniversityListProps {
  universities: University[];
}

export const UniversityList = ({ universities }: UniversityListProps) => {
  return (
    <div className="space-y-6">
      {universities.map((university) => (
        <Card key={university.id} className="group hover:shadow-lg transition-all duration-300 border border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                {university.logo_url ? (
                  <div className="w-16 h-16 bg-card rounded-lg p-2 shadow-sm">
                    <img 
                      src={university.logo_url} 
                      alt={university.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-card rounded-lg flex items-center justify-center shadow-sm">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {university.name}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-3 text-muted-foreground">
                      {university.location && (
                        <div className="flex items-center gap-1">
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
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {university.courses?.[0]?.count || 0} Programs Available
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {university.website_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}
                    <Link to={`/universities/${university.slug || university.id}`}>
                      <Button>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};