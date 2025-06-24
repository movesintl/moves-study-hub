
import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StudentLayout from '@/components/student/StudentLayout';

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Redirect to dashboard home if on the base route
  useEffect(() => {
    if (user && location.pathname === '/student-dashboard') {
      navigate('/student-dashboard/home');
    }
  }, [user, location.pathname, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  );
};

export default StudentDashboard;
