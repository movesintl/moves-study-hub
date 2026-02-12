import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Search, BookOpen, MapPin, Clock, DollarSign, GraduationCap } from 'lucide-react';

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
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(195,100%,20%)] flex items-center justify-center shadow-lg">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Browse Courses</h1>
          <p className="text-xs text-muted-foreground">Find the perfect course for your students</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses or universities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 rounded-xl bg-card" />
        </div>
        <Select value={countryFilter} onValueChange={setCountryFilter}>
          <SelectTrigger className="w-full sm:w-44 rounded-xl bg-card"><SelectValue placeholder="Country" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((c: any) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-sm text-muted-foreground">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course: any) => (
            <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-elegant transition-all duration-300 group">
              {/* Color bar */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <GraduationCap className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">{course.level}</span>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-3 leading-snug line-clamp-2">{course.title}</h3>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 flex-shrink-0 text-accent" />
                    <span className="truncate">{course.universities?.name || course.university} · {course.country}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-3 w-3 flex-shrink-0 text-accent" />
                    {course.duration_months} months · {course.study_area}
                  </p>
                  {course.tuition_fee && (
                    <p className="flex items-center gap-2">
                      <DollarSign className="h-3 w-3 flex-shrink-0 text-accent" />
                      <span className="font-semibold text-foreground">{course.currency || 'AUD'} {course.tuition_fee?.toLocaleString()}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">No courses found</p>
              <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentCourses;
