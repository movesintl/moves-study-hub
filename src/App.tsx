
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseComparison from "./pages/CourseComparison";
import Services from "./pages/Services";
import Consultation from "./pages/services/Consultation";
import VisaMigration from "./pages/services/VisaMigration";
import IeltsPreparation from "./pages/services/IeltsPreparation";
import ScholarshipGuidance from "./pages/services/ScholarshipGuidance";
import PreDepartureSupport from "./pages/services/PreDepartureSupport";
import NotFound from "./pages/NotFound";

// Admin imports
import Dashboard from "./pages/admin/Dashboard";
import CoursesList from "./pages/admin/courses/CoursesList";
import CourseForm from "./pages/admin/courses/CourseForm";
import MediaLibrary from "./pages/admin/media/MediaLibrary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
            <Route path="media" element={<MediaLibrary />} />
            <Route path="universities" element={<div className="text-center py-12 text-gray-500">Universities management - Coming Soon</div>} />
            <Route path="destinations" element={<div className="text-center py-12 text-gray-500">Destinations management - Coming Soon</div>} />
            <Route path="services" element={<div className="text-center py-12 text-gray-500">Services management - Coming Soon</div>} />
            <Route path="blogs" element={<div className="text-center py-12 text-gray-500">Blog management - Coming Soon</div>} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
