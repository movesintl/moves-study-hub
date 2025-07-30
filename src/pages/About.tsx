import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Webstories from "@/components/common/Webstories";
import HighQuality from "@/components/common/HighQuality";
import StickyProfileComponent from "@/components/common/StickyProfile";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

import {
  BookOpen,
  CheckCircle,
  ArrowRight,
  Award,
  Home,
  ChevronRight
} from 'lucide-react';
import StoryWithStatsSection from '@/components/common/StoryStats';
import {
  Breadcrumb, BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ExpertiseAchievements, { ExpertiseAchievements2 } from '@/components/common/ExpertiseAchievements';
import CEOMsg from '@/components/common/CEOMsg';
import LeadershipTeam from '@/components/common/MovesTeam';
import LatestUpdates from '@/components/common/LatestUpdates';

const About = () => {
  // Fetch about page content from database
  const { data: aboutPageData, isLoading } = useQuery({
    queryKey: ['about-page'],
    queryFn: async () => {
      const { data } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', 'about')
        .single();
      return data;
    }
  });

  // Fetch company statistics from settings
  const { data: companyStats } = useQuery({
    queryKey: ['company-stats'],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['students_placed', 'partner_universities', 'years_experience', 'countries_served']);
      
      return data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>) || {};
    }
  });

  return (
    <div className="min-h-screen">
      {/* About Us Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden min-h-[500px]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] py-8">
            {/* Left Column - Text Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Breadcrumb Navigation */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-500" />
                <span className="text-white font-medium">About Us</span>
              </nav>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                  {aboutPageData?.title || "Best Migration Agents & Education Consultants"}
                </h1>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  {aboutPageData?.subtitle || "We are registered migration agents & education consultants in Australia with 5k+ satisfied clients."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-orange-500 text-white text-lg px-8 py-6 rounded-lg">
                  <Link to="/contact" className="flex items-center">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white hover:bg-white/90 bg-white text-gray-900 hover:text-gray-900 text-lg px-8 py-6 rounded-lg transition-all duration-300"
                >
                  <Link to="/services" className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Our Services
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-white/80 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Registered Professionals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>{companyStats?.students_placed || "5,000+"}+ Satisfied Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Proven Results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Featured Team Image */}
            <div className="relative lg:ml-8">
              <div className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                  alt="Team member"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl z-0"></div>
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <StoryWithStatsSection />

      {/* Achievements Section */}
      <ExpertiseAchievements />
      <ExpertiseAchievements2 />
      <CEOMsg />

      <div className="text-center mb-6">
        <h2 className="text-5xl font-bold text-primary mb-3">
          {aboutPageData?.content?.includes('team_title') ? 
            JSON.parse(aboutPageData.content).team_title : 
            "Moves International's Team"}
        </h2>
         <p className="text-base text-gray-600 text-center">
          {aboutPageData?.content?.includes('team_subtitle') ? 
            JSON.parse(aboutPageData.content).team_subtitle : 
            "Experts, Visionaries and ACHIEVERS"}
        </p>
      </div>
      <LeadershipTeam />
      <StickyProfileComponent />
      <HighQuality />

      {/* Web stories */}
      <div className="bg-white">
        <Webstories />
      </div>

      {/* Latest Updates */}
      <LatestUpdates />
    </div>
  );
};

export default About;