
import React, { useState, useEffect } from 'react';
import { Search, Filter, X, MapPin, Clock, DollarSign, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  country: string;
  university: string;
  tuition_fee_min: number;
  tuition_fee_max: number;
  currency: string;
  duration_months: number;
  intake_dates: string[];
  eligibility: string;
  requirements: string;
  image_url: string;
  featured: boolean;
}

interface Filters {
  search: string;
  study_area: string;
  level: string;
  country: string;
}

const Courses = () => {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    study_area: '',
    level: '',
    country: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      let query = supabase
        .from('courses')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,university.ilike.%${filters.search}%`);
      }
      if (filters.study_area) {
        query = query.eq('study_area', filters.study_area);
      }
      if (filters.level) {
        query = query.eq('level', filters.level);
      }
      if (filters.country) {
        query = query.eq('country', filters.country);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Course[];
    }
  });

  const resetFilters = () => {
    setFilters({
      search: '',
      study_area: '',
      level: '',
      country: ''
    });
  };

  const formatTuitionFee = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
    if (min === max) {
      return `${currency} ${formatNumber(min)}`;
    }
    return `${currency} ${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Courses</h2>
          <p className="text-gray-600">Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Course</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover thousands of courses from top universities worldwide. Filter by study area, level, and country to find the perfect match for your career goals.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search courses, universities, or keywords..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-10 h-12"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters && <X className="h-4 w-4 ml-2" />}
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={filters.study_area} onValueChange={(value) => setFilters({ ...filters, study_area: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Study Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Study Areas</SelectItem>
                    <SelectItem value="IT">IT & Computer Science</SelectItem>
                    <SelectItem value="Business">Business & Management</SelectItem>
                    <SelectItem value="Health">Health & Medicine</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Trade">Trade & Vocational</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Study Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master">Master's Degree</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Countries</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Active Filters and Reset */}
            {(filters.search || filters.study_area || filters.level || filters.country) && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filters.search && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    Search: "{filters.search}"
                  </span>
                )}
                {filters.study_area && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {filters.study_area}
                  </span>
                )}
                {filters.level && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {filters.level}
                  </span>
                )}
                {filters.country && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {filters.country}
                  </span>
                )}
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
                {(filters.search || filters.study_area || filters.level || filters.country) && ' matching your criteria'}
              </p>
            </div>

            {/* Course Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow relative">
                  {course.featured && (
                    <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {course.university}, {course.country}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm line-clamp-3">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{formatDuration(course.duration_months)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="font-semibold text-primary">
                          {formatTuitionFee(course.tuition_fee_min, course.tuition_fee_max, course.currency)}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">
                          Intakes: {course.intake_dates?.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h4 className="font-medium text-sm">Eligibility:</h4>
                        <p className="text-xs text-gray-600">{course.eligibility}</p>
                      </div>
                    </div>

                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {courses.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more courses.
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
