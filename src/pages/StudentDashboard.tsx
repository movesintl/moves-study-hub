
import React from 'react';
import StudentApplicationForm from '@/components/applications/StudentApplicationForm';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Dashboard</h1>
          <p className="text-xl text-gray-600">Apply to your dream course and university</p>
        </div>
        
        <StudentApplicationForm />
      </div>
    </div>
  );
};

export default StudentDashboard;
