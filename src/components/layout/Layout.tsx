
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import CourseComparisonWidget from './CourseComparisonWidget';
import CookieConsent from '@/components/common/CookieConsent';
import { Toaster } from '@/components/ui/sonner';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CourseComparisonWidget />
      <CookieConsent />
      <Toaster />
    </div>
  );
};

export default Layout;
