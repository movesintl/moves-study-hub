import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, BookOpen, MapPin, Clock, DollarSign } from 'lucide-react';

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
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Browse Courses</h1>
        <p className="text-sm text-muted-foreground">Find courses for your students</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-card" />
        </div>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-full sm:w-44 bg-card"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c: any) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-12 text-sm text-muted-foreground">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course: any) => (
            <div key={course.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-soft transition-all duration-200 group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{course.level}</span>
              </div>
              <h3 className="font-semibold text-sm text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">{course.title}</h3>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {course.universities?.name || course.university} · {course.country}
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  {course.duration_months} months · {course.study_area}
                </p>
                {course.tuition_fee && (
                  <p className="flex items-center gap-1.5">
                    <DollarSign className="h-3 w-3 flex-shrink-0" />
                    {course.currency || 'AUD'} {course.tuition_fee?.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-sm text-muted-foreground">No courses found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentCourses;
