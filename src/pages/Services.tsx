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
import { supabase } from '@/integrations/supabase/client';

// Map icon names to actual Lucide icons
const iconComponents = {
  MessageCircle,
  FileCheck,
  Plane,
  BookOpen,
  Award,
  Users,
};

type Faq = {
  question: string;
  [key: string]: any;
};

type ServiceRow = {
  id: string;
  title: string;
  short_description: string;
  icon_url: keyof typeof iconComponents;
  color?: string;
  slug?: string;
  faqs?: Faq[] | string;
  created_at?: string;
  [key: string]: any;
};

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform the data to match your component's needs
        const transformedServices = (data as ServiceRow[]).map(service => ({
          id: service.id,
          title: service.title,
          description: service.short_description,
          icon: iconComponents[service.icon_url] || MessageCircle, // default to MessageCircle if icon not found
          color: 'bg-primary', // default color
          link: `/services/${service.slug || service.id}`,
          features: Array.isArray(service.faqs)
            ? (service.faqs as Faq[]).map(faq => (faq && typeof faq === 'object' ? faq.question : undefined)).filter(Boolean)
            : [] // using FAQs as features
        }));

        setServices(transformedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - unchanged */}
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
              <p className="col-span-full text-center">Loading services...</p>
            ) : services.length === 0 ? (
              <p className="col-span-full text-center">No services available at the moment.</p>
            ) : (
              services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
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
                    <CardContent className="flex flex-col flex-grow">
                      {service.features && service.features.length > 0 ? (
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
                      ) : (
                        <div className="mb-6 text-sm text-gray-500 flex-grow">No features listed</div>
                      )}
                      <div className="mt-auto">
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
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - unchanged */}
      <section className="py-12 pt-8 pb-16">
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
                className="border-white text-primary hover:bg-white/90 hover:text-primary"
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