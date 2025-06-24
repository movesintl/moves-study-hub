
import React, { useState } from 'react';
import { Search, ArrowRight, Globe, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const backgroundPattern = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F5F5F5' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/courses');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePopularTagClick = (tag: string) => {
    navigate(`/courses?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url("${backgroundPattern}")` }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Start Your
                <span className="text-accent block">Study Abroad</span>
                Journey Today
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Discover thousands of courses from top universities in Australia, Canada, UK, and more. 
                Get expert guidance from our certified education consultants.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    placeholder="Search courses, universities, or destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 bg-white text-gray-900 border-0 h-12"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-accent hover:bg-accent/90 text-white h-12 px-8"
                >
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-300">Popular:</span>
                {['MBA', 'Engineering', 'IT', 'Healthcare', 'Business'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => handlePopularTagClick(tag)}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/courses')}
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Browse Courses
              </Button>
              {!user && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate('/auth')}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  Login / Sign Up
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-gray-300">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <GraduationCap className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Partner Universities</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-gray-300">Countries</div>
              </div>
            </div>
          </div>

          {/* Right Content - Beautiful Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Students studying abroad"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating Achievement Cards */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Visa Approved</div>
                    <div className="text-sm text-gray-600">Australia Student Visa</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Application Success</div>
                    <div className="text-sm text-gray-600">University of Melbourne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
