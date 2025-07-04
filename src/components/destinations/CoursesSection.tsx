
import React from 'react';
import { GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationCourseCard from './DestinationCourseCard';
import { useRef } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  duration_months: number;
  featured: boolean;
  slug: string;
  university: string;
  country: string;
  intake_dates: string[] | null;
  tuition_fee: number | null;
  currency: string | null;
}

interface CoursesSectionProps {
  destinationName: string;
  courses: Course[];
}

const CoursesSection = ({ destinationName, courses }: CoursesSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewDetails = (slug: string) => {
    window.open(`/courses/${slug}`, '_blank');
  };

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Popular Courses
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the most sought-after programs available in {destinationName}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {courses.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-lg"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Courses Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course) => (
              <div key={course.id} className="flex-none w-80">
                <DestinationCourseCard 
                  course={course} 
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="/courses">
              View All Courses
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
