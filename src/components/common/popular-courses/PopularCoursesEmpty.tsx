
import React from 'react';
import { BookOpen } from 'lucide-react';

const PopularCoursesEmpty = () => {
  return (
    <div className="text-center py-12">
      <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">No Popular Courses Yet</h3>
      <p className="text-gray-600">Check back soon for featured courses.</p>
    </div>
  );
};

export default PopularCoursesEmpty;
