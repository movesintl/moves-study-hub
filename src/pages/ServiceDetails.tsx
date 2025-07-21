import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Users, Clock, Award, SlashIcon, DotIcon, Dot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import PageViewFAQ from '@/pages/components/PageViewFAQ';
import HowItWorksDisplay from '@/components/services/HowItWorksDisplay';
import {
  Breadcrumb, BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import KeepReading from '@/components/services/KeepReading';
import ReadyToBeginSection from '@/components/services/ReadyToBegin';
import OtherServicesSection from '@/components/services/OtherServices';

const ServiceDetails = () => {
  const { id: slug } = useParams();

  const { data: service, isLoading } = useQuery({
    queryKey: ['service', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Service not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - University Style Layout */}
      <section className="relative py-10 bg-primary overflow-hidden min-h-[500px]">
        {/* Background overlay for better text contrast */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] py-8">
            {/* Left Column - Text Content */}

            {/* Breadcrumb-style navigation */}
            <div className="space-y-6 lg:space-y-8">
              <Breadcrumb className=''>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <a href="/" className='text-orange-500 hover:text-orange-100'>Home</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    •
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <a href="/services" className='text-orange-500 hover:text-orange-100'>Services</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    •
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className='text-white'>{service.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl flex lg:text-6xl font-bold text-white leading-tight">
                  {service.title}
                </h1>
                {service.short_description && (
                  <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                    {service.short_description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-accent hover:bg-orange-500 text-white text-lg px-8 py-6 rounded-lg">
                  <Link to="/contact" className="flex items-center">
                    Get Started Today
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white hover:bg-white/90 bg-white text-primary hover:text-primary text-lg px-8 py-6 rounded-lg transition-all duration-300"
                >
                  <Link to="/contact" className="flex items-center ">
                    <Users className="h-5 w-5 mr-2" />
                    Speak to Expert
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-white/80 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span>Expert guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent" />
                  <span>Quick process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Proven results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="relative lg:ml-8">
              {service.feature_image_url ? (
                <div className="relative">
                  <img
                    src={service.icon_url}
                    alt={service.feature_image_alt || service.title}
                    className="w-full h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl"
                  />
                  {/* Optional overlay for better image integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-2xl"></div>
                </div>
              ) : (
                <div className="w-full h-[300px] lg:h-[400px] bg-gradient-to-br from-orange-500/20 to-slate-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                  {service.icon_url ? (
                    <img
                      src={service.feature_image_url}
                      alt={service.title}
                      className="h-24 w-24 object-contain opacity-80"
                    />
                  ) : (
                    <Award className="h-24 w-24 text-white/60" />
                  )}
                </div>
              )}

              {/* Floating icon badge */}
              {/* {service.icon_url && (
                <div className="absolute -top-4 -left-4 bg-orange-500 p-4 rounded-2xl shadow-lg">
                  <img 
                    src={service.icon_url} 
                    alt={service.title}
                    className="h-8 w-8 object-contain"
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <div className="container mx-auto my-12 px-4 py-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center ml-4 w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-base font-medium">
              {service.title}
            </div>

            <div>
              {service.full_details && (
                <div
                  className="prose prose-lg max-w-none text-gray-600 "
                  dangerouslySetInnerHTML={{ __html: service.full_details }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keep Reading */}
      {service.title === "Application Assistant" && (
        <div className="my-4">
          <KeepReading />
        </div>
      )}
      {/* How It Works Section */}
      <HowItWorksDisplay
        title={service.how_it_works_title}
        description={service.how_it_works_description}
        featureImageUrl={service.how_it_works_feature_image_url}
        blurbs={service.how_it_works_blurbs as Array<{ icon: string; title: string; description: string }>}
      />

      <ReadyToBeginSection />
      {/* FAQ Section */}
      {service.faqs && Array.isArray(service.faqs) && service.faqs.length > 0 && (
        <PageViewFAQ faqs={service.faqs as Array<{ question: string; answer: string }>} />
      )}

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />

      <OtherServicesSection/>
    </div>
  );
};

export default ServiceDetails;