import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, BookOpen } from 'lucide-react';

const AgentCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['agent-browse-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*, universities:university_id(name, logo_url), destinations:destination_id(name)')
        .order('title');
      if (error) throw error;
      return data;
    },
  });

  const countries = [...new Set(courses.map((c: any) => c.country))].filter(Boolean).sort();

  const filtered = courses.filter((c: any) => {
    const matchSearch = c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.university?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCountry = countryFilter === 'all' || c.country === countryFilter;
    return matchSearch && matchCountry;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
        <p className="text-gray-600">Find courses for your students</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Country" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((c: any) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-8">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course: any) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                <CardTitle className="text-lg mt-2">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">University:</span> {course.universities?.name || course.university}</p>
                  <p><span className="font-medium">Country:</span> {course.country}</p>
                  <p><span className="font-medium">Duration:</span> {course.duration_months} months</p>
                  {course.tuition_fee && (
                    <p><span className="font-medium">Fee:</span> {course.currency || 'AUD'} {course.tuition_fee?.toLocaleString()}</p>
                  )}
                  <p><span className="font-medium">Study Area:</span> {course.study_area}</p>
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">No courses found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentCourses;
