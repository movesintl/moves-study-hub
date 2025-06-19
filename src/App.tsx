
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
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
            {/* Placeholder routes - will be implemented */}
            <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Dashboard Page - Coming Soon</div></div>} />
            <Route path="/consultation" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Consultation Page - Coming Soon</div></div>} />
            <Route path="/visa-migration" element={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl">Visa & Migration Page - Coming Soon</div></div>} />
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
