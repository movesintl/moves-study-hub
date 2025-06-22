
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DestinationDetails = () => {
  const { id } = useParams();

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['destination-courses', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('destination_id', id)
        .limit(6);
      
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

  if (!destination) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Destination not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="relative">
        {destination.featured_image_url && (
          <div className="h-96 rounded-lg overflow-hidden mb-6">
            <img 
              src={destination.featured_image_url} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 -mt-20 relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">{destination.name}</h1>
          </div>
          
          {destination.description && (
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {destination.description}
            </p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {destination.visa_info && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Visa Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{destination.visa_info}</p>
            </CardContent>
          </Card>
        )}

        {destination.lifestyle_info && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Lifestyle & Culture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{destination.lifestyle_info}</p>
            </CardContent>
          </Card>
        )}
      </div>

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
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{course.level}</span>
                    <span>{course.duration_months} months</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline" asChild>
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

export default DestinationDetails;
