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
      {/* Modern Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-12 w-44 h-44 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-96 right-16 w-32 h-32 bg-gradient-to-br from-accent/10 to-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-48 left-1/4 w-52 h-52 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Modern Breadcrumb */}
              <nav className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <div className="p-1 bg-gradient-to-br from-primary/10 to-primary/20 rounded">
                    <Home className="h-3 w-3 text-primary" />
                  </div>
                  <span>Home</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground font-medium">About Us</span>
              </nav>

              {/* Hero Content */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  Trusted Education Partners
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  <span className="block bg-gradient-to-r from-foreground via-foreground to-primary/80 bg-clip-text text-transparent">
                    Best Migration
                  </span>
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Agents & Consultants
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  {aboutPageData?.subtitle || "We are registered migration agents & education consultants in Australia with 5k+ satisfied clients building dreams globally."}
                </p>
              </div>

              {/* Modern Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <ArrowRight className="h-5 w-5" />
                    Get Started Today
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link to="/services" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Our Services
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Registered Professionals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">{companyStats?.students_placed || "5,000+"}+ Satisfied Clients</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-amber-500/10 to-amber-600/20 rounded-lg">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>
                  <span className="text-muted-foreground font-medium">Proven Results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Modern Team Showcase */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                
                <div className="relative p-8">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                    alt="Team member"
                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                  />
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-12 left-12 right-12 bg-background/90 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                    <h3 className="text-xl font-bold text-foreground mb-2">Expert Team</h3>
                    <p className="text-muted-foreground">Dedicated professionals guiding your journey</p>
                  </div>
                </div>
                
                {/* Decorative gradient bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"></div>
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