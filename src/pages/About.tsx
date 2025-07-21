import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import OurStaff from '@/components/common/OurStaff';
import { 
  Globe, 
  Users, 
  Award, 
  BookOpen, 
  Heart, 
  Target,
  CheckCircle,
  ArrowRight
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

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Student-Centric Approach",
      description: "We put our students first, providing personalized guidance tailored to individual goals and aspirations."
    },
    {
      icon: Target,
      title: "Excellence in Service",
      description: "We maintain the highest standards in all our services, from initial consultation to post-arrival support."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Our worldwide presence ensures comprehensive support wherever your educational journey takes you."
    }
  ];

  const achievements = [
    { number: "15+", label: "Years of Experience" },
    { number: "10,000+", label: "Students Placed" },
    { number: "500+", label: "Partner Universities" },
    { number: "25+", label: "Countries Served" }
  ];

  const whyChooseUs = [
    "Expert counselors with extensive international education experience",
    "Comprehensive support from application to arrival",
    "Strong partnerships with top universities worldwide",
    "Proven track record of successful student placements",
    "24/7 support throughout your educational journey",
    "Transparent and ethical practices"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    {/* About Us Hero Section - University Style Layout */}
<section className="relative py-16 bg-primary overflow-hidden min-h-[500px]">
  {/* Background overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-0"></div>
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
    {/* Main Hero Content */}
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] py-8">
      {/* Left Column - Text Content */}
      <div className="space-y-6 lg:space-y-8">
        {/* Breadcrumb-style navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <a href="/" className='text-orange-500 hover:text-orange-100'>Home</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>•</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className='text-white'>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Best Migration Agents & <span className="text-accent">Education</span> Consultants
          </h1>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
            We are registered migration agents & education consultants in Australia with 5k+ satisfied clients.
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
            className="border-2 border-white hover:bg-white/90 bg-white text-primary hover:text-primary text-lg px-8 py-6 rounded-lg transition-all duration-300"
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
            <Users className="h-5 w-5 text-accent" />
            <span>5,000+ Satisfied Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            <span>Proven Results</span>
          </div>
        </div>
      </div>

      {/* Right Column - Team Images */}
      <div className="relative lg:ml-8">
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {/* Top row - 2 images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-2 shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face" 
                alt="Team member" 
                className="w-full h-40 lg:h-48 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl p-2 shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616c64c8c86?w=300&h=300&fit=crop&crop=face" 
                alt="Team member" 
                className="w-full h-40 lg:h-48 object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Bottom row - offset */}
          <div className="space-y-4 mt-8">
            <div className="bg-white rounded-xl p-2 shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face" 
                alt="Team member" 
                className="w-full h-40 lg:h-48 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-xl p-2 shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face" 
                alt="Team member" 
                className="w-full h-40 lg:h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl z-0"></div>
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-lg z-0"></div>
      </div>
    </div>
  </div>
</section>

      {/* Our Story Section */}
      <StoryWithStatsSection/>

      {/* Achievements Section */}
    <ExpertiseAchievements/>
    <ExpertiseAchievements2/>
    <CEOMsg/>
      {/* Our Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do and define who we are as an organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-t-4 border-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" 
                alt="International students" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Moves International?
              </h2>
              <div className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{reason}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link to="/services">
                    Explore Our Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Staff Section */}
      <OurStaff />

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful students who have achieved their dreams with our guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Get Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;