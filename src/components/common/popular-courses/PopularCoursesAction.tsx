
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PopularCoursesActionProps {
  onViewAllCourses: () => void;
}

const PopularCoursesAction: React.FC<PopularCoursesActionProps> = ({ onViewAllCourses }) => {
  return (
    <div className="text-end">
      <p
        onClick={onViewAllCourses}
        className="flex items-center justify-center cursor-pointer text-orange-500 underline"      >
        <span className='transition-all duration-200 flex items-center'>
          Learn All Courses <ArrowRight className=" h-4 w-4" />
        </span>
      </p>
    </div>
  );
};

export default PopularCoursesAction;
