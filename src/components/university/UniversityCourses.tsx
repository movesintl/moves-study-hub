import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { CourseCard } from './CourseCard';

interface Course {
  id: string;
  title: string;
  description?: string;
  study_area: string;
  level: string;
  duration_months: number;
  tuition_fee_min?: number;
  tuition_fee_max?: number;
  currency?: string;
  featured?: boolean;
  slug?: string;
}

interface UniversityCoursesProps {
  university: {
    name: string;
  };
  courses: Course[];
}

export const UniversityCourses = ({ university, courses }: UniversityCoursesProps) => {
  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {courses.length > 0 ? (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Available Programs
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore the diverse range of programs offered by {university.name}
                </p>
                <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse All Programs
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-secondary rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No Programs Available</h3>
                <p className="text-muted-foreground mb-8">
                  This university doesn't have any programs listed yet. Check back later or contact us for more information.
                </p>
                <Link to="/contact">
                  <Button size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};