
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Users, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-accent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <Button variant="ghost" asChild className="mb-6 text-white hover:bg-white/20">
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                {service.icon_url && (
                  <div className="flex-shrink-0 bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                    <img 
                      src={service.icon_url} 
                      alt={service.title}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                )}
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {service.title}
                </h1>
                {service.short_description && (
                  <p className="text-xl text-white/90 leading-relaxed">
                    {service.short_description}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    Get Started Today
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Speak to Expert
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Expert guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Quick process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>Proven results</span>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Image */}
            <div className="lg:text-center">
              {service.feature_image_url ? (
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-xl" />
                  <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                    <img 
                      src={service.feature_image_url} 
                      alt={service.feature_image_alt || service.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                    <Award className="h-24 w-24 text-white/60" />
                  </div>
                </div>
              )}
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
                  <div className="prose prose-lg max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {service.full_details}
                    </p>
                  </div>
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
    </div>
  );
};

export default ServiceDetails;
