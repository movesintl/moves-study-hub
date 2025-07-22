import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PopularCoursesActionProps {
  onViewAllCourses: () => void;
}

const PopularCoursesAction: React.FC<PopularCoursesActionProps> = ({ onViewAllCourses }) => {
  return (
    <div className="text-end">
      <button
        onClick={onViewAllCourses}
        className="flex items-center gap-2 px-4 py-2 border border-orange-500 bg-orange-100 text-orange-600 rounded-md font-medium hover:bg-orange-200 transition"
      >
        Learn All Courses <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default PopularCoursesAction;
