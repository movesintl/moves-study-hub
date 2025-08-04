import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, MapPin, DollarSign, Calendar, ExternalLink, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const { data: scholarships, isLoading, error } = useQuery({
    queryKey: ['scholarships', filter, searchTerm, typeFilter, countryFilter],
    queryFn: async () => {
      console.log('Fetching scholarships with filter:', filter);
      
      // First, try a simple query without joins
      let query = supabase
        .from('scholarships')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,short_description.ilike.%${searchTerm}%`);
      }

      if (typeFilter !== 'all') {
        query = query.eq('scholarship_type', typeFilter);
      }

      if (countryFilter !== 'all') {
        query = query.eq('destination_country', countryFilter);
      }

      switch (filter) {
        case 'featured':
          query = query.eq('is_featured', true);
          break;
        case 'active':
          const now = new Date().toISOString();
          query = query.gte('deadline', now);
          break;
        case 'ending-soon':
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          query = query.lte('deadline', nextMonth.toISOString()).gte('deadline', new Date().toISOString());
          break;
      }

      const { data: scholarshipData, error: scholarshipError } = await query;
      console.log('Scholarships query result:', { data: scholarshipData, error: scholarshipError });
      
      if (scholarshipError) {
        console.error('Scholarships query error:', scholarshipError);
        throw scholarshipError;
      }

      // If we have scholarships, fetch related data separately
      if (scholarshipData && scholarshipData.length > 0) {
        // Get university data
        const universityIds = scholarshipData
          .map(s => s.university_id)
          .filter(Boolean);

        // Get course data  
        const courseIds = scholarshipData
          .map(s => s.course_id)
          .filter(Boolean);

        let universities = [];
        let courses = [];

        if (universityIds.length > 0) {
          const { data: universityData } = await supabase
            .from('universities')
            .select('id, name')
            .in('id', universityIds);
          universities = universityData || [];
        }

        if (courseIds.length > 0) {
          const { data: courseData } = await supabase
            .from('courses')
            .select('id, title')
            .in('id', courseIds);
          courses = courseData || [];
        }

        // Combine the data
        const combinedData = scholarshipData.map(scholarship => ({
          ...scholarship,
          universities: universities.find(u => u.id === scholarship.university_id) || null,
          courses: courses.find(c => c.id === scholarship.course_id) || null
        }));

        console.log('Combined scholarship data:', combinedData);
        return combinedData;
      }

      return scholarshipData || [];
    }
  });

  console.log('Scholarships component render:', { scholarships, isLoading, error });

  if (error) {
    console.error('Scholarship query error:', error);
  }

  const { data: countries } = useQuery({
    queryKey: ['scholarship-countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select('destination_country')
        .not('destination_country', 'is', null)
        .eq('is_published', true);
      
      if (error) throw error;
      
      const uniqueCountries = [...new Set(data.map(item => item.destination_country))].filter(Boolean);
      return uniqueCountries;
    }
  });

  const getScholarshipTypeColor = (type: string) => {
    const colors = {
      'merit': 'bg-blue-100 text-blue-800',
      'need-based': 'bg-green-100 text-green-800', 
      'sports': 'bg-purple-100 text-purple-800',
      'academic': 'bg-orange-100 text-orange-800',
      'research': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isDeadlineSoon = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-80">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Scholarships & Financial Aid
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover scholarship opportunities to fund your international education journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search scholarships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="merit">Merit-based</SelectItem>
                  <SelectItem value="need-based">Need-based</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-40">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries?.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Scholarships</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value={filter}>
          {scholarships?.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No scholarships found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarships?.map((scholarship) => (
                <Card key={scholarship.id} className="group hover:shadow-lg transition-shadow">
                  {scholarship.featured_image_url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={scholarship.featured_image_url}
                        alt={scholarship.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getScholarshipTypeColor(scholarship.scholarship_type)}>
                          {scholarship.scholarship_type}
                        </Badge>
                        {scholarship.is_featured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                        {scholarship.deadline && isDeadlineSoon(scholarship.deadline) && (
                          <Badge variant="destructive">Deadline Soon</Badge>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {scholarship.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {scholarship.short_description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      {scholarship.scholarship_amount && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>{scholarship.scholarship_amount} {scholarship.currency}</span>
                        </div>
                      )}
                      
                      {(scholarship as any).universities?.name && (
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="truncate">{(scholarship as any).universities.name}</span>
                        </div>
                      )}
                      
                      {scholarship.destination_country && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{scholarship.destination_country}</span>
                        </div>
                      )}
                      
                      {scholarship.deadline && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>Deadline: {format(new Date(scholarship.deadline), 'MMM dd, yyyy')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link to={`/scholarships/${scholarship.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                      {scholarship.application_link && (
                        <Button size="sm" variant="default" asChild>
                          <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </div>
    </div>
  );
};

export default Scholarships;