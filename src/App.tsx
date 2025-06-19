import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Services from "./pages/Services";
import Consultation from "./pages/services/Consultation";
import VisaMigration from "./pages/services/VisaMigration";
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
            <Route path="/services" element={<Services />} />
            <Route path="/services/consultation" element={<Consultation />} />
            <Route path="/services/visa-migration" element={<VisaMigration />} />
            {/* Other service routes - placeholders for now */}
            <Route path="/services/ielts" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">IELTS Preparation - Coming Soon</div></div>} />
            <Route path="/services/application" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Application Assistance - Coming Soon</div></div>} />
            <Route path="/services/scholarship" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Scholarship Guidance - Coming Soon</div></div>} />
            <Route path="/services/pre-departure" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Pre-Departure Support - Coming Soon</div></div>} />
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
