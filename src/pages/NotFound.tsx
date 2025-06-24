
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number with Animation */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent animate-fade-in">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-gray-200 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-4 mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, even the best explorers sometimes take a wrong turn!
          </p>
          <p className="text-sm text-gray-500">
            Error path: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 animate-fade-in">
          <div className="w-64 h-64 mx-auto mb-6 relative">
            {/* SVG Illustration */}
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Circle */}
              <circle
                cx="200"
                cy="150"
                r="120"
                fill="url(#gradient1)"
                opacity="0.1"
                className="animate-pulse"
              />
              
              {/* Astronaut */}
              <ellipse cx="200" cy="200" rx="40" ry="25" fill="#e5e7eb" />
              <circle cx="200" cy="160" r="35" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
              <circle cx="200" cy="160" r="25" fill="#ffffff" />
              <circle cx="190" cy="155" r="3" fill="#374151" />
              <circle cx="210" cy="155" r="3" fill="#374151" />
              <path d="M190 170 Q200 175 210 170" stroke="#6b7280" strokeWidth="2" fill="none" />
              
              {/* Stars */}
              <circle cx="120" cy="80" r="2" fill="#fbbf24" className="animate-pulse" />
              <circle cx="300" cy="100" r="1.5" fill="#fbbf24" className="animate-pulse" />
              <circle cx="80" cy="180" r="1" fill="#fbbf24" className="animate-pulse" />
              <circle cx="320" cy="200" r="2" fill="#fbbf24" className="animate-pulse" />
              <circle cx="150" cy="50" r="1" fill="#fbbf24" className="animate-pulse" />
              
              {/* Planet */}
              <circle cx="320" cy="80" r="20" fill="#dc2626" opacity="0.8" />
              <ellipse cx="320" cy="80" rx="25" ry="4" fill="#dc2626" opacity="0.3" />
              
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="px-8">
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Need Help?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-600">
            <Link to="/contact" className="hover:text-primary transition-colors flex items-center">
              <Search className="w-4 h-4 mr-1" />
              Contact Support
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/services" className="hover:text-primary transition-colors">
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
