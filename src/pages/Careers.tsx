import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Calendar, Building2, ExternalLink, Filter } from 'lucide-react';
import { format } from 'date-fns';

const Careers = () => {
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const { data: careers, isLoading } = useQuery({
    queryKey: ['careers', jobTypeFilter, locationFilter],
    queryFn: async () => {
      let query = supabase
        .from('careers')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (jobTypeFilter !== 'all') {
        query = query.eq('job_type', jobTypeFilter as any);
      }

      if (locationFilter !== 'all') {
        query = query.eq('location', locationFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  // Get unique locations for filter
  const { data: locations } = useQuery({
    queryKey: ['career-locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('careers')
        .select('location')
        .eq('is_published', true);
      
      if (error) throw error;
      
      const uniqueLocations = [...new Set(data.map(item => item.location))];
      return uniqueLocations;
    }
  });

  const getJobTypeColor = (type: string) => {
    const colors = {
      'Full-Time': 'bg-green-100 text-green-800',
      'Part-Time': 'bg-blue-100 text-blue-800', 
      'Internship': 'bg-purple-100 text-purple-800',
      'Contract': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="grid gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers | Moves International - Join Our Team</title>
        <meta name="description" content="Explore exciting career opportunities at Moves International. Join our team and help students achieve their international education dreams." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of our mission to help students achieve their international education dreams. 
              Discover exciting career opportunities at Moves International.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations?.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Job Listings */}
          {careers?.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Positions Available</h3>
                <p className="text-gray-600 mb-6">
                  We don't have any open positions matching your criteria at the moment. 
                  Please check back later or adjust your filters.
                </p>
                <Button onClick={() => {
                  setJobTypeFilter('all');
                  setLocationFilter('all');
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {careers?.map((career) => (
                <Card key={career.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">{career.job_title}</h3>
                          <Badge className={getJobTypeColor(career.job_type)}>
                            {career.job_type}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            <span>{career.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{career.location}</span>
                          </div>
                          {career.application_deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                Apply by {format(new Date(career.application_deadline), 'PPP')}
                              </span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-700 line-clamp-2">{career.short_description}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link to={`/careers/${career.slug}`}>
                          <Button variant="outline">View Details</Button>
                        </Link>
                        <Button asChild>
                          <a 
                            href={career.apply_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            Apply Now
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't See a Role for You?</h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're always looking for talented individuals to join our team. 
                  Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Button asChild>
                  <a href="mailto:careers@movesinternational.com">
                    Send Your Resume
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Careers;