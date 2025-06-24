
import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StudentLayout from '@/components/student/StudentLayout';
import StudentAuthGuard from '@/components/student/StudentAuthGuard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to dashboard home if on the base route
  useEffect(() => {
    if (user && location.pathname === '/student-dashboard') {
      navigate('/student-dashboard/home');
    }
  }, [user, location.pathname, navigate]);

  return (
    <StudentAuthGuard>
      <StudentLayout>
        <Outlet />
      </StudentLayout>
    </StudentAuthGuard>
  );
};

export default StudentDashboard;
