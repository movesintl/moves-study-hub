
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Clock, DollarSign, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const CourseDetails = () => {
  const { id } = useParams();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities:university_id(name, location, logo_url, website_url),
          destinations:destination_id(name, featured_image_url)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
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

  if (!course) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              <Badge variant="outline">{course.study_area}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            
            <div className="flex items-center space-x-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{course.universities?.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration_months} months</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4" />
                <span>{course.currency} {course.tuition_fee_min?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {course.thumbnail_url && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={course.thumbnail_url} 
                alt={course.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {course.description || 'No description available.'}
              </p>
            </CardContent>
          </Card>

          {course.eligibility && (
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{course.eligibility}</p>
              </CardContent>
            </Card>
          )}

          {course.requirements && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{course.requirements}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Study Level</h4>
                <p className="text-gray-600">{course.level}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-1">Duration</h4>
                <p className="text-gray-600">{course.duration_months} months</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Tuition Fee</h4>
                <p className="text-gray-600">
                  {course.currency} {course.tuition_fee_min?.toLocaleString()}
                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                    <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                  )}
                </p>
              </div>

              {course.intake_dates && course.intake_dates.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Intake Dates</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.intake_dates.map((date, index) => (
                      <Badge key={index} variant="secondary">
                        <Calendar className="h-3 w-3 mr-1" />
                        {date}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {course.universities && (
            <Card>
              <CardHeader>
                <CardTitle>University</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.universities.logo_url && (
                    <img 
                      src={course.universities.logo_url} 
                      alt={course.universities.name}
                      className="h-12 object-contain"
                    />
                  )}
                  <h4 className="font-semibold">{course.universities.name}</h4>
                  {course.universities.location && (
                    <p className="text-gray-600">{course.universities.location}</p>
                  )}
                  {course.universities.website_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={course.universities.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {course.application_link && (
            <Button className="w-full" asChild>
              <a href={course.application_link} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
