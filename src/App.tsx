import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
