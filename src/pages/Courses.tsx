import React, { useState, useEffect } from 'react';
import { Search, Filter, X, MapPin, Clock, DollarSign, Calendar, GraduationCap, Heart, BarChart3, Grid, List, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Link, useSearchParams } from 'react-router-dom';

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
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    study_area: searchParams.get('study_area') || 'all',
    level: searchParams.get('level') || 'all',
    country: searchParams.get('country') || 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());

  // Update URL when filters change (with debounce to prevent excessive updates)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      if (filters.search) params.set('search', filters.search);
      if (filters.study_area !== 'all') params.set('study_area', filters.study_area);
      if (filters.level !== 'all') params.set('level', filters.level);
      if (filters.country !== 'all') params.set('country', filters.country);
      
      setSearchParams(params, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, setSearchParams]);

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
      if (filters.study_area && filters.study_area !== 'all') {
        query = query.eq('study_area', filters.study_area);
      }
      if (filters.level && filters.level !== 'all') {
        query = query.eq('level', filters.level);
      }
      if (filters.country && filters.country !== 'all') {
        query = query.eq('country', filters.country);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Course[];
    }
  });

  // Fetch saved courses
  const { data: savedCourses, refetch: refetchSaved } = useQuery({
    queryKey: ['saved-courses-ids'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_courses')
        .select('course_id');
      
      if (error) throw error;
      return data.map(item => item.course_id);
    }
  });

  useEffect(() => {
    if (savedCourses) {
      setSavedCourseIds(new Set(savedCourses));
    }
  }, [savedCourses]);

  const toggleSaveCourse = async (courseId: string) => {
    const isSaved = savedCourseIds.has(courseId);
    
    if (isSaved) {
      const { error } = await supabase
        .from('saved_courses')
        .delete()
        .eq('course_id', courseId);
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove course from saved list",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
        toast({
          title: "Success",
          description: "Course removed from saved list"
        });
        refetchSaved();
      }
    } else {
      const { error } = await supabase
        .from('saved_courses')
        .insert({ course_id: courseId, user_id: null });
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to save course",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => new Set(prev).add(courseId));
        toast({
          title: "Success",
          description: "Course saved for comparison"
        });
        refetchSaved();
      }
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      study_area: 'all',
      level: 'all',
      country: 'all'
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

  const hasActiveFilters = filters.search || filters.study_area !== 'all' || filters.level !== 'all' || filters.country !== 'all';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Modern Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Courses</h1>
              <p className="text-gray-600 mt-1">
                {courses.length} course{courses.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search courses, universities, or keywords..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="pl-12 h-12 text-lg border-gray-300 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              {/* Compare Button */}
              {savedCourseIds.size > 0 && (
                <Link to="/course-comparison">
                  <Button className="h-12 px-4 bg-accent hover:bg-accent/90">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Compare ({savedCourseIds.size})
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-xl border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select value={filters.study_area} onValueChange={(value) => setFilters({ ...filters, study_area: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Study Area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Study Areas</SelectItem>
                    <SelectItem value="IT">IT & Computer Science</SelectItem>
                    <SelectItem value="Business">Business & Management</SelectItem>
                    <SelectItem value="Health">Health & Medicine</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Trade">Trade & Vocational</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Study Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="Master">Master's Degree</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="New Zealand">New Zealand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Active filters:</span>
                  {filters.search && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                  {filters.study_area !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {filters.study_area}
                    </Badge>
                  )}
                  {filters.level !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {filters.level}
                    </Badge>
                  )}
                  {filters.country !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {filters.country}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-xs">
                    <X className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Course Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* Course Cards */}
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {courses.map((course) => (
                <Card key={course.id} className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden bg-white/80 backdrop-blur-sm ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
                  {/* Featured Badge */}
                  {course.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg">
                        ✨ Featured
                      </Badge>
                    </div>
                  )}
                  
                  {/* Save Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full h-10 w-10 p-0 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                    onClick={() => toggleSaveCourse(course.id)}
                  >
                    <Heart className={`h-5 w-5 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
                  </Button>

                  {/* Course Image */}
                  <div className={`${viewMode === 'list' ? 'md:w-64 md:flex-shrink-0' : ''}`}>
                    <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                      <GraduationCap className="h-16 w-16 text-primary/60 relative z-10" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </CardTitle>
                      <div className="flex items-center text-gray-600 mt-2">
                        <MapPin className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                        <span className="font-medium truncate">{course.university}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500">{course.country}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-5">
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">{course.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20">
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="font-medium bg-accent/5 text-accent border-accent/20">
                          {course.study_area}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">{formatDuration(course.duration_months)}</span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="truncate">Intakes: {course.intake_dates?.join(', ')}</span>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 rounded-xl border border-primary/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600 font-medium">Tuition Fee</div>
                            <div className="font-bold text-lg text-primary">
                              {formatTuitionFee(course.tuition_fee_min, course.tuition_fee_max, course.currency)}
                            </div>
                          </div>
                          <DollarSign className="h-8 w-8 text-primary/40" />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Link to={`/courses/${course.id}`} className="flex-1">
                          <Button variant="outline" className="w-full h-11 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-300">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {courses.length === 0 && !isLoading && (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No courses found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any courses matching your criteria. Try adjusting your search or filters.
                </p>
                <Button onClick={resetFilters} variant="outline" size="lg">
                  <X className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Results Summary */}
            {courses.length > 0 && (
              <div className="mt-12 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-sm border">
                  <span className="text-gray-600">
                    Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
                    {hasActiveFilters && ' matching your criteria'}
                  </span>
                  {savedCourseIds.size > 0 && (
                    <>
                      <span className="mx-3 text-gray-300">•</span>
                      <Link to="/course-comparison">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Compare {savedCourseIds.size} saved
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
