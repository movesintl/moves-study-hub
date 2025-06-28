
import React from 'react';
import { Button } from '@/components/ui/button';

const PageViewError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-6">
        <div className="text-6xl font-bold text-gray-300">404</div>
        <h1 className="text-2xl font-bold text-gray-800">Page not found</h1>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <a href="/">Return Home</a>
        </Button>
      </div>
    </div>
  );
};

export default PageViewError;
