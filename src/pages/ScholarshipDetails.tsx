import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Award, MapPin, DollarSign, Calendar, ExternalLink, Building, BookOpen, Mail, Phone, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const ScholarshipDetails = () => {
  const { slug } = useParams();

  const { data: scholarship, isLoading, error } = useQuery({
    queryKey: ['scholarship-details', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scholarships')
        .select(`
          *,
          universities(name, logo_url, website_url),
          courses(title, slug)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const getScholarshipTypeColor = (type: string) => {
    const colors = {
      'merit': 'bg-blue-100 text-blue-800',
      'need-based': 'bg-green-100 text-green-800',
      'sports': 'bg-purple-100 text-purple-800',
      'academic': 'bg-orange-100 text-orange-800',
      'research': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isDeadlineSoon = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Scholarship Not Found</h1>
          <p className="text-gray-600 mb-6">The scholarship you're looking for doesn't exist or has been removed.</p>
          <Link to="/scholarships">
            <Button>Browse All Scholarships</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{scholarship.meta_title || scholarship.title} | Moves International</title>
        <meta name="description" content={scholarship.meta_description || scholarship.short_description} />
      </Helmet>

      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-primary via-primary/95 to-accent text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/scholarships" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scholarships
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  {scholarship.scholarship_type}
                </Badge>
                {scholarship.is_featured && (
                  <Badge className="bg-accent/80 text-white border-accent hover:bg-accent">
                    Featured
                  </Badge>
                )}
                {scholarship.deadline && isDeadlineSoon(scholarship.deadline) && (
                  <Badge className="bg-red-500/80 text-white border-red-400 hover:bg-red-500">
                    Deadline Soon
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {scholarship.title}
              </h1>

              {/* Short Description */}
              {scholarship.short_description && (
                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl">
                  {scholarship.short_description}
                </p>
              )}

              {/* Key Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {scholarship.scholarship_amount && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-6 w-6 text-accent" />
                      <div>
                        <p className="text-white/80 text-sm">Amount</p>
                        <p className="text-white font-semibold">{scholarship.scholarship_amount} {scholarship.currency}</p>
                      </div>
                    </div>
                  </div>
                )}

                {scholarship.deadline && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-accent" />
                      <div>
                        <p className="text-white/80 text-sm">Deadline</p>
                        <p className="text-white font-semibold">{format(new Date(scholarship.deadline), 'MMM dd, yyyy')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {scholarship.destination_country && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6 text-accent" />
                      <div>
                        <p className="text-white/80 text-sm">Location</p>
                        <p className="text-white font-semibold">{scholarship.destination_country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {scholarship.featured_image_url && (
              <div className="lg:col-span-4">
                <div className="aspect-square lg:aspect-auto lg:h-80 overflow-hidden rounded-xl shadow-2xl">
                  <img
                    src={scholarship.featured_image_url}
                    alt={scholarship.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Quick Overview Card */}
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="h-6 w-6" />
                  Quick Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarship.universities?.name && (
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">University</p>
                        <p className="text-gray-600">{scholarship.universities.name}</p>
                      </div>
                    </div>
                  )}

                  {scholarship.courses?.title && (
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Course</p>
                        <Link to={`/courses/${scholarship.courses.slug}`} className="text-primary hover:text-primary/80 transition-colors">
                          {scholarship.courses.title}
                        </Link>
                      </div>
                    </div>
                  )}

                  {scholarship.start_date && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">Start Date</p>
                        <p className="text-gray-600">{format(new Date(scholarship.start_date), 'PPP')}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {scholarship.full_description && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">About This Scholarship</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.full_description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eligibility */}
            {scholarship.eligibility_criteria && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.eligibility_criteria}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Process */}
            {scholarship.application_process && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-accent">How to Apply</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.application_process}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Required Documents */}
            {scholarship.required_documents && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl">Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                    <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                      {scholarship.required_documents}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Sticky Container */}
            <div className="xl:sticky xl:top-8 space-y-6">
              {/* Apply Now - Highlighted */}
              <Card className="shadow-lg border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-primary">Ready to Apply?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scholarship.application_link && (
                    <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg" asChild>
                      <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Apply Now
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" size="lg" className="w-full border-2 hover:bg-primary/5" asChild>
                    <Link to="/contact">
                      Get Help with Application
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              {(scholarship.contact_email || scholarship.contact_phone) && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {scholarship.contact_email && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${scholarship.contact_email}`} className="text-primary hover:text-primary/80 break-all">
                          {scholarship.contact_email}
                        </a>
                      </div>
                    )}
                    {scholarship.contact_phone && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`tel:${scholarship.contact_phone}`} className="text-primary hover:text-primary/80">
                          {scholarship.contact_phone}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* University Information */}
              {scholarship.universities && (
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">University</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      {scholarship.universities.logo_url && (
                        <img
                          src={scholarship.universities.logo_url}
                          alt={scholarship.universities.name}
                          className="w-12 h-12 object-contain flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{scholarship.universities.name}</h3>
                      </div>
                    </div>
                    {scholarship.universities.website_url && (
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href={scholarship.universities.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Get Help */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Need Assistance?</CardTitle>
                </CardHeader>
                <CardContent>
                  <LeadEnquiryForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;