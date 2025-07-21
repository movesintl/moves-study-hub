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
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Best Migration Agents & <span className="text-orange-400">EDUCATION</span> Consultants
              </h1>
              <div className="space-y-2 text-lg text-gray-300">
                <p>We are registered migration agents & education consultants in Australia.</p>
                <p>We have 5k+ Satisfied Clients.</p>
              </div>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link to="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Right Side - Team Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top row - 2 images */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                      alt="Team member 1" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616c64c8c86?w=200&h=200&fit=crop&crop=face" 
                      alt="Team member 2" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" 
                      alt="Team member 3" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                      alt="Team member 4" 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
              
              {/* Larger bottom image */}
              <div className="mt-4 bg-white rounded-lg p-2 shadow-lg max-w-xs mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=200&fit=crop&crop=face" 
                  alt="Team member 5" 
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <StoryWithStatsSection/>

      {/* Achievements Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to student success and educational excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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