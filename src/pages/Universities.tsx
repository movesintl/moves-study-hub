import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, ExternalLink, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

const Universities = () => {
  const { data: universities = [], isLoading } = useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select(`
          *,
          courses:courses(count)
        `)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 bg-primary/10 rounded-2xl">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <span className="text-primary font-semibold text-lg">Universities</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Explore Top Universities
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Discover prestigious institutions offering world-class education and diverse academic programs
            </p>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {universities.length > 0 ? (
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
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-secondary rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">No Universities Found</h3>
                  <p className="text-muted-foreground mb-8">
                    There are no universities available at the moment. Check back later for updates.
                  </p>
                  <Link to="/contact">
                    <Button size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;