import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import { Link } from 'react-router-dom';
import { UniversityHero } from '@/components/university/UniversityHero';
import { UniversityOverview } from '@/components/university/UniversityOverview';
import { UniversityCourses } from '@/components/university/UniversityCourses';

const UniversityDetails = () => {
  const { slug } = useParams();

  const { data: university, isLoading, error } = useQuery({
    queryKey: ['university', slug],
    queryFn: async () => {
      console.log('Fetching university with slug:', slug);
      
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('University fetch error:', error);
        throw error;
      }
      
      console.log('University data:', data);
      return data;
    }
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['university-courses', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];
      
      console.log('Fetching courses for university:', university.id);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('university_id', university.id);
      
      if (error) {
        console.error('Courses fetch error:', error);
        throw error;
      }
      
      console.log('Courses data:', data);
      return data;
    },
    enabled: !!university?.id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-8 py-16">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">University not found</h1>
          <p className="text-muted-foreground mb-6">The university you're looking for doesn't exist.</p>
          <Link to="/universities">
            <Button>Browse Universities</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <UniversityHero university={university} coursesCount={courses.length} />

      {/* University Overview Section */}
      <UniversityOverview university={university} />

      {/* Courses Section */}
      <UniversityCourses university={university} courses={courses} />

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default UniversityDetails;