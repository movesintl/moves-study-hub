
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Services from "./pages/Services";
import CourseComparison from "./pages/CourseComparison";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Service detail pages
import Consultation from "./pages/services/Consultation";
import VisaMigration from "./pages/services/VisaMigration";
import IeltsPreparation from "./pages/services/IeltsPreparation";
import ScholarshipGuidance from "./pages/services/ScholarshipGuidance";
import PreDepartureSupport from "./pages/services/PreDepartureSupport";

// Detail pages
import CourseDetails from "./pages/CourseDetails";
import DestinationDetails from "./pages/DestinationDetails";
import UniversityDetails from "./pages/UniversityDetails";
import ServiceDetails from "./pages/ServiceDetails";
import BlogDetails from "./pages/BlogDetails";

// Admin pages
import AdminAuth from "./pages/admin/AdminAuth";
import Dashboard from "./pages/admin/Dashboard";
import UniversitiesList from "./pages/admin/universities/UniversitiesList";
import UniversityForm from "./pages/admin/universities/UniversityForm";
import DestinationsList from "./pages/admin/destinations/DestinationsList";
import DestinationForm from "./pages/admin/destinations/DestinationForm";
import ServicesList from "./pages/admin/services/ServicesList";
import ServiceForm from "./pages/admin/services/ServiceForm";
import BlogsList from "./pages/admin/blogs/BlogsList";
import BlogForm from "./pages/admin/blogs/BlogForm";
import CoursesList from "./pages/admin/courses/CoursesList";
import CourseForm from "./pages/admin/courses/CourseForm";
import MediaLibrary from "./pages/admin/media/MediaLibrary";
import Settings from "./pages/admin/settings/Settings";
import Profile from "./pages/admin/profile/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with main layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetails />} />
              <Route path="/destinations/:id" element={<DestinationDetails />} />
              <Route path="/universities/:id" element={<UniversityDetails />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route path="/compare" element={<CourseComparison />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Service detail routes */}
              <Route path="/services/consultation" element={<Consultation />} />
              <Route path="/services/visa-migration" element={<VisaMigration />} />
              <Route path="/services/ielts-preparation" element={<IeltsPreparation />} />
              <Route path="/services/scholarship-guidance" element={<ScholarshipGuidance />} />
              <Route path="/services/pre-departure-support" element={<PreDepartureSupport />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="universities" element={<UniversitiesList />} />
              <Route path="universities/new" element={<UniversityForm />} />
              <Route path="universities/:id/edit" element={<UniversityForm />} />
              <Route path="destinations" element={<DestinationsList />} />
              <Route path="destinations/new" element={<DestinationForm />} />
              <Route path="destinations/:id/edit" element={<DestinationForm />} />
              <Route path="services" element={<ServicesList />} />
              <Route path="services/new" element={<ServiceForm />} />
              <Route path="services/:id/edit" element={<ServiceForm />} />
              <Route path="blogs" element={<BlogsList />} />
              <Route path="blogs/new" element={<BlogForm />} />
              <Route path="blogs/:id/edit" element={<BlogForm />} />
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/new" element={<CourseForm />} />
              <Route path="courses/:id/edit" element={<CourseForm />} />
              <Route path="courses/:id" element={<CourseDetails />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
