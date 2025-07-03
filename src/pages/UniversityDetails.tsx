
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Building2, GraduationCap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const UniversityDetails = () => {
  const { id } = useParams();

  const { data: university, isLoading } = useQuery({
    queryKey: ['university', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['university-courses', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('university_id', id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">University not found</h1>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-lg">University</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{university.name}</h1>
              {university.location && (
                <div className="flex items-center gap-2 mb-6 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{university.location}</span>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                {university.website_url && (
                  <Button asChild variant="secondary" size="lg">
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                <div className="flex items-center gap-2 text-white/90 px-4 py-2 bg-white/10 rounded-lg">
                  <GraduationCap className="h-4 w-4" />
                  <span>{courses.length} courses available</span>
                </div>
              </div>
            </div>
            
            {university.logo_url && (
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <img 
                    src={university.logo_url} 
                    alt={university.name}
                    className="h-32 w-32 lg:h-40 lg:w-40 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* University Overview Section */}
      {university.overview_content && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">About {university.name}</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: university.overview_content }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Courses Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">

          {courses.length > 0 ? (
            <div>
              <div className="text-center mb-12">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Available Courses</h2>
                <p className="text-gray-600 text-lg">Explore programs offered by {university.name}</p>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">{course.study_area}</Badge>
                        {course.featured && <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>}
                      </div>
                      <h3 className="font-semibold text-lg mb-3 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Level:</span>
                          <span className="font-medium">{course.level}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium">{course.duration_months} months</span>
                        </div>
                        {(course.tuition_fee_min || course.tuition_fee_max) && (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Tuition:</span>
                            <span className="font-medium text-primary">
                              {course.currency} {course.tuition_fee_min?.toLocaleString()}
                              {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                                <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full" variant="outline" asChild>
                        <a href={`/courses/${course.slug}`}>View Course Details</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button asChild size="lg">
                  <a href="/courses">Browse All Courses</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Courses Available</h3>
              <p className="text-gray-500">This university doesn't have any courses listed yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default UniversityDetails;
