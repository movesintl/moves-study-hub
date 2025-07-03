
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  duration_months: number;
  featured: boolean;
  slug: string;
}

interface CoursesSectionProps {
  destinationName: string;
  courses: Course[];
}

const CoursesSection = ({ destinationName, courses }: CoursesSectionProps) => {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="text-center mb-12">
        <GraduationCap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
        <p className="text-gray-600">Featured programs available in {destinationName}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{course.study_area}</Badge>
                {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              </div>
              <h3 className="font-semibold mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{course.level}</span>
                <span>{course.duration_months} months</span>
              </div>
              <Button className="w-full" variant="outline" size="sm" asChild>
                <a href={`/courses/${course.slug}`}>View Details</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
