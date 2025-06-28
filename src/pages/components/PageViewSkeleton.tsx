
import React from 'react';

const PageViewSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto"></div>
        <p className="text-gray-600 font-medium">Loading page...</p>
      </div>
    </div>
  );
};

export default PageViewSkeleton;
