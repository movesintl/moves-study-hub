
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Building2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
    <div className="container mx-auto py-8 space-y-8">
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {university.logo_url && (
              <div className="flex-shrink-0">
                <img 
                  src={university.logo_url} 
                  alt={university.name}
                  className="h-24 w-24 object-contain"
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="h-8 w-8 text-primary" />
                {university.name}
              </h1>
              
              {university.location && (
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{university.location}</span>
                </div>
              )}

              <div className="flex gap-4">
                {university.website_url && (
                  <Button asChild>
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{courses.length} courses available</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {courses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{course.study_area}</Badge>
                    {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                  </div>
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <span>{course.level}</span>
                    <span>{course.duration_months} months</span>
                  </div>
                  <div className="text-sm font-medium text-primary mb-4">
                    {course.currency} {course.tuition_fee_min?.toLocaleString()}
                    {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                      <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                    )}
                  </div>
                  <Button className="w-full" variant="outline" asChild>
                    <a href={`/courses/${course.id}`}>View Details</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversityDetails;
