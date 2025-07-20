import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Users, Clock, Award, SlashIcon } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section - University Style Layout */}
      <section className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 overflow-hidden min-h-[500px]">
        {/* Background overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">


          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] py-8">
            {/* Left Column - Text Content */}
           
              {/* Breadcrumb-style navigation */}
               <div className="space-y-6 lg:space-y-8">
              <Breadcrumb className='text-orange-400'>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <a href="/" className='text-orange-400 hover:text-orange-500'>Home</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <a href="/services" className='text-orange-400 hover:text-orange-500'>Services</a>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <SlashIcon />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className='text-orange-500'>{service.title}</BreadcrumbPage>
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
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-lg">
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
                  <CheckCircle className="h-5 w-5 text-orange-400" />
                  <span>Expert guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-400" />
                  <span>Quick process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-400" />
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
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Service Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {service.full_details && (
                  <div
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: service.full_details }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Why Choose This Service?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Expert Guidance</h4>
                      <p className="text-muted-foreground text-sm">
                        Professional support from experienced consultants
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Quick Process</h4>
                      <p className="text-muted-foreground text-sm">
                        Streamlined approach to save your time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Proven Results</h4>
                      <p className="text-muted-foreground text-sm">
                        Track record of successful outcomes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Personalized Support</h4>
                      <p className="text-muted-foreground text-sm">
                        Tailored solutions for your specific needs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Card */}
              <Card className="shadow-lg border-primary/20">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-foreground">
                      Ready to Get Started?
                    </h3>
                    <p className="text-muted-foreground">
                      Contact our experts today for personalized assistance with this service.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full" size="lg" asChild>
                        <Link to="/contact">
                          Get This Service
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/contact">
                          Schedule Consultation
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Need Help?</h4>
                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      Have questions about this service? Our team is here to help.
                    </p>
                    <div className="pt-2">
                      <Button variant="ghost" className="w-full justify-start p-0 h-auto" asChild>
                        <Link to="/contact">
                          Contact Support →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <HowItWorksDisplay
        title={service.how_it_works_title}
        description={service.how_it_works_description}
        featureImageUrl={service.how_it_works_feature_image_url}
        blurbs={service.how_it_works_blurbs as Array<{ icon: string; title: string; description: string }>}
      />

      {/* FAQ Section */}
      {service.faqs && Array.isArray(service.faqs) && service.faqs.length > 0 && (
        <PageViewFAQ faqs={service.faqs as Array<{ question: string; answer: string }>} />
      )}

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default ServiceDetails;