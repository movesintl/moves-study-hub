import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';

import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Blogs from '@/pages/Blogs';
import Courses from '@/pages/Courses';
import CourseDetails from '@/pages/CourseDetails';
import StudentDashboard from '@/pages/StudentDashboard';
import Services from '@/pages/Services';
import ServiceDetails from '@/pages/ServiceDetails';
import Consultation from '@/pages/services/Consultation';
import VisaMigration from '@/pages/services/VisaMigration';
import EnglishTestPrep from '@/pages/services/EnglishTestPrep';
import ApplicationAssistance from '@/pages/services/ApplicationAssistance';
import ScholarshipGuidance from '@/pages/services/ScholarshipGuidance';
import PreDepartureSupport from '@/pages/services/PreDepartureSupport';
import UniversityDetails from '@/pages/UniversityDetails';
import DestinationDetails from '@/pages/DestinationDetails';
import BlogDetails from '@/pages/BlogDetails';
import CourseComparison from '@/pages/CourseComparison';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';
import Contact from '@/pages/Contact';
import ContactSubmissions from '@/pages/admin/contact/ContactSubmissions';

// Student Dashboard Pages
import Dashboard from '@/pages/student/Dashboard';
import Applications from '@/pages/student/Applications';
import SavedCourses from '@/pages/student/SavedCourses';
import Profile from '@/pages/student/Profile';
import Settings from '@/pages/student/Settings';
import Counselling from '@/pages/student/Counselling';
import CounsellingBookings from '@/pages/admin/counselling/CounsellingBookings';

import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminProfile from '@/pages/admin/profile/Profile';
import AdminSettings from '@/pages/admin/settings/Settings';
import TeamManagement from '@/pages/admin/team/TeamManagement';
import CoursesList from '@/pages/admin/courses/CoursesList';
import CourseForm from '@/pages/admin/courses/CourseForm';
import UniversitiesList from '@/pages/admin/universities/UniversitiesList';
import UniversityForm from '@/pages/admin/universities/UniversityForm';
import DestinationsList from '@/pages/admin/destinations/DestinationsList';
import DestinationForm from '@/pages/admin/destinations/DestinationForm';
import ServicesList from '@/pages/admin/services/ServicesList';
import ServiceForm from '@/pages/admin/services/ServiceForm';
import BlogsList from '@/pages/admin/blogs/BlogsList';
import BlogForm from '@/pages/admin/blogs/BlogForm';
import MediaLibrary from '@/pages/admin/media/MediaLibrary';
import AdminAuth from '@/pages/admin/AdminAuth';
import StudyAreasManager from '@/pages/admin/courses/StudyAreasManager';
import StudyLevelsManager from '@/pages/admin/courses/StudyLevelsManager';
import BlogCategoriesManager from '@/pages/admin/blogs/BlogCategoriesManager';
import ApplicationsList from '@/pages/admin/applications/ApplicationsList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<CourseDetails />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:id" element={<ServiceDetails />} />
              <Route path="services/consultation" element={<Consultation />} />
              <Route path="services/visa-migration" element={<VisaMigration />} />
              <Route path="services/english-test-prep" element={<EnglishTestPrep />} />
              <Route path="services/application-assistance" element={<ApplicationAssistance />} />
              <Route path="services/scholarship-guidance" element={<ScholarshipGuidance />} />
              <Route path="services/pre-departure-support" element={<PreDepartureSupport />} />
              <Route path="universities/:id" element={<UniversityDetails />} />
              <Route path="destinations/:id" element={<DestinationDetails />} />
              <Route path="blogs/:id" element={<BlogDetails />} />
              <Route path="course-comparison" element={<CourseComparison />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="/student-dashboard" element={<StudentDashboard />}>
              <Route path="home" element={<Dashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route path="saved-courses" element={<SavedCourses />} />
              <Route path="counselling" element={<Counselling />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/new" element={<CourseForm />} />
              <Route path="courses/:id/edit" element={<CourseForm />} />
              <Route path="courses/study-areas" element={<StudyAreasManager />} />
              <Route path="courses/study-levels" element={<StudyLevelsManager />} />
              <Route path="universities" element={<UniversitiesList />} />
              <Route path="universities/new" element={<UniversityForm />} />
              <Route path="universities/:id/edit" element={<UniversityForm />} />
              <Route path="destinations" element={<DestinationsList />} />
              <Route path="destinations/new" element={<DestinationForm />} />
              <Route path="destinations/:id/edit" element={<DestinationForm />} />
              <Route path="applications" element={<ApplicationsList />} />
              <Route path="counselling" element={<CounsellingBookings />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/new" element={<ServiceForm />} />
              <Route path="services/:id/edit" element={<ServiceForm />} />
              <Route path="blogs" element={<BlogsList />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/:id/edit" element={<BlogForm />} />
              <Route path="blogs/categories" element={<BlogCategoriesManager />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="contact" element={<ContactSubmissions />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
