
import React from 'react';
import { Button } from '@/components/ui/button';

interface PopularCoursesActionProps {
  onViewAllCourses: () => void;
}

const PopularCoursesAction: React.FC<PopularCoursesActionProps> = ({ onViewAllCourses }) => {
  return (
    <div className="text-center">
      <Button 
        onClick={onViewAllCourses}
        size="lg" 
        className="bg-gradient-to-r mt-10 from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Explore All Courses
      </Button>
    </div>
  );
};

export default PopularCoursesAction;
