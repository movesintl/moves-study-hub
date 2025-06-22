
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import AdminAuth from "./pages/admin/AdminAuth";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseComparison from "./pages/CourseComparison";
import Services from "./pages/Services";
import Consultation from "./pages/services/Consultation";
import VisaMigration from "./pages/services/VisaMigration";
import IeltsPreparation from "./pages/services/IeltsPreparation";
import ScholarshipGuidance from "./pages/services/ScholarshipGuidance";
import PreDepartureSupport from "./pages/services/PreDepartureSupport";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin imports
import Dashboard from "./pages/admin/Dashboard";
import CoursesList from "./pages/admin/courses/CoursesList";
import CourseForm from "./pages/admin/courses/CourseForm";
import MediaLibrary from "./pages/admin/media/MediaLibrary";
import UniversitiesList from "./pages/admin/universities/UniversitiesList";
import UniversityForm from "./pages/admin/universities/UniversityForm";
import DestinationsList from "./pages/admin/destinations/DestinationsList";
import DestinationForm from "./pages/admin/destinations/DestinationForm";
import ServicesList from "./pages/admin/services/ServicesList";
import ServiceForm from "./pages/admin/services/ServiceForm";
import BlogsList from "./pages/admin/blogs/BlogsList";
import BlogForm from "./pages/admin/blogs/BlogForm";
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
            {/* Auth routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/auth" element={<AdminAuth />} />

            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course-comparison" element={<CourseComparison />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/consultation" element={<Consultation />} />
              <Route path="/services/visa-migration" element={<VisaMigration />} />
              <Route path="/services/ielts" element={<IeltsPreparation />} />
              <Route path="/services/application" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Application Assistance - Coming Soon</div></div>} />
              <Route path="/services/scholarship" element={<ScholarshipGuidance />} />
              <Route path="/services/pre-departure" element={<PreDepartureSupport />} />
              {/* Other placeholder routes */}
              <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Dashboard Page - Coming Soon</div></div>} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/visa-migration" element={<VisaMigration />} />
              <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">About Page - Coming Soon</div></div>} />
              <Route path="/resources" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Resources Page - Coming Soon</div></div>} />
              <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Contact Page - Coming Soon</div></div>} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<CoursesList />} />
              <Route path="courses/new" element={<CourseForm />} />
              <Route path="courses/:id/edit" element={<CourseForm />} />
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
              <Route path="media" element={<MediaLibrary />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
