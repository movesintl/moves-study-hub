
import React from 'react';
import { TrendingUp } from 'lucide-react';

const PopularCoursesHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <TrendingUp className="w-4 h-4 mr-2" />
        Popular Courses
      </div>
      
      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Featured Programs
      </h2>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Discover our most sought-after courses that are shaping the future of education
      </p>
    </div>
  );
};

export default PopularCoursesHeader;
