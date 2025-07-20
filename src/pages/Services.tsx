import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  FileCheck,
  Plane,
  BookOpen,
  Award,
  Users,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client'; // Assuming supabase client is configured

// Mock data (commented out - for reference)
// const services = [
//   {
//     id: 'consultation',
//     icon: MessageCircle,
//     title: 'Free Consultation',
//     description: 'Get personalized guidance from certified education consultants',
//     features: ['Career counseling', 'Course selection', 'University matching', 'Study plan development'],
//     color: 'bg-blue-500',
//     link: '/services/consultation'
//   },
//   {
//     id: 'application-assistance',
//     icon: FileCheck,
//     title: 'Application Assistance',
//     description: 'Complete support for university and college applications',
//     features: ['Document preparation', 'Application review', 'Submission tracking', 'Follow-up support'],
//     color: 'bg-green-500',
//     link: '/services/application-assistance'
//   },
//   {
//     id: 'visa-migration',
//     icon: Plane,
//     title: 'Visa & Migration',
//     description: 'Expert visa guidance and migration services',
//     features: ['Visa application', 'Interview preparation', 'Post-study options', 'Legal compliance'],
//     color: 'bg-purple-500',
//     link: '/services/visa-migration'
//   },
//   {
//     id: 'english-test-prep',
//     icon: BookOpen,
//     title: 'English Test Preparation',
//     description: 'Comprehensive IELTS and PTE training and test booking',
//     features: ['IELTS & PTE classes', 'Practice tests', 'Score guarantee', 'Flexible scheduling'],
//     color: 'bg-orange-500',
//     link: '/services/english-test-prep'
//   },
//   {
//     id: 'scholarship-guidance',
//     icon: Award,
//     title: 'Scholarship Guidance',
//     description: 'Find and apply for scholarships and financial aid',
//     features: ['Scholarship search', 'Application help', 'Merit assessment', 'Funding strategies'],
//     color: 'bg-red-500',
//     link: '/services/scholarship-guidance'
//   },
//   {
//     id: 'pre-departure-support',
//     icon: Users,
//     title: 'Pre-Departure Support',
//     description: 'Complete preparation for your journey abroad',
//     features: ['Accommodation help', 'Travel guidance', 'Orientation sessions', 'Cultural preparation'],
//     color: 'bg-teal-500',
//     link: '/services/pre-departure-support'
//   }
// ];

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // For now, use mock data directly here (same shape as commented-out one)
  useEffect(() => {
    const mockData = [
      {
        id: 'consultation',
        icon: MessageCircle,
        title: 'Free Consultation',
        description:
          'Get personalized guidance from certified education consultants',
        features: [
          'Career counseling',
          'Course selection',
          'University matching',
          'Study plan development',
        ],
        color: 'bg-blue-500',
        link: '/services/consultation',
      },
      {
        id: 'application-assistance',
        icon: FileCheck,
        title: 'Application Assistance',
        description:
          'Complete support for university and college applications',
        features: [
          'Document preparation',
          'Application review',
          'Submission tracking',
          'Follow-up support',
        ],
        color: 'bg-green-500',
        link: '/services/application-assistance',
      },
      {
        id: 'visa-migration',
        icon: Plane,
        title: 'Visa & Migration',
        description: 'Expert visa guidance and migration services',
        features: [
          'Visa application',
          'Interview preparation',
          'Post-study options',
          'Legal compliance',
        ],
        color: 'bg-purple-500',
        link: '/services/visa-migration',
      },
      {
        id: 'english-test-prep',
        icon: BookOpen,
        title: 'English Test Preparation',
        description:
          'Comprehensive IELTS and PTE training and test booking',
        features: [
          'IELTS & PTE classes',
          'Practice tests',
          'Score guarantee',
          'Flexible scheduling',
        ],
        color: 'bg-orange-500',
        link: '/services/english-test-prep',
      },
      {
        id: 'scholarship-guidance',
        icon: Award,
        title: 'Scholarship Guidance',
        description:
          'Find and apply for scholarships and financial aid',
        features: [
          'Scholarship search',
          'Application help',
          'Merit assessment',
          'Funding strategies',
        ],
        color: 'bg-red-500',
        link: '/services/scholarship-guidance',
      },
      {
        id: 'pre-departure-support',
        icon: Users,
        title: 'Pre-Departure Support',
        description: 'Complete preparation for your journey abroad',
        features: [
          'Accommodation help',
          'Travel guidance',
          'Orientation sessions',
          'Cultural preparation',
        ],
        color: 'bg-teal-500',
        link: '/services/pre-departure-support',
      },
    ];

    // Later replace this with Supabase fetch logic
    // const fetchServices = async () => {
    //   const { data, error } = await supabase.from('services').select('*');
    //   if (!error) setServices(data);
    // };
    setServices(mockData);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
            Comprehensive education and migration services to support your
            international study journey from start to finish.
          </p>
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-white"
            asChild
          >
            <Link to="/services/consultation">Book Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Support Every Step of the Way
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to post-arrival support, we provide
              end-to-end services to make your international education journey
              smooth and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <p className="col-span-full text-center">Loading...</p>
            ) : (
              services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-colors"
                        asChild
                      >
                        <Link
                          to={service.link}
                          className="flex items-center justify-center"
                        >
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Book a free consultation with our experts and take the first step
              towards your international education goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white"
                asChild
              >
                <Link to="/services/consultation">Book Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
