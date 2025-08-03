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

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/scholarships" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scholarships
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div>
              {scholarship.featured_image_url && (
                <div className="aspect-video overflow-hidden rounded-lg mb-6">
                  <img
                    src={scholarship.featured_image_url}
                    alt={scholarship.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getScholarshipTypeColor(scholarship.scholarship_type)}>
                  {scholarship.scholarship_type}
                </Badge>
                {scholarship.is_featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
                {scholarship.deadline && isDeadlineSoon(scholarship.deadline) && (
                  <Badge variant="destructive">Deadline Soon</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {scholarship.title}
              </h1>

              {scholarship.short_description && (
                <p className="text-lg text-gray-600 mb-6">
                  {scholarship.short_description}
                </p>
              )}
            </div>

            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Scholarship Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scholarship.scholarship_amount && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Amount</p>
                      <p className="text-gray-600">{scholarship.scholarship_amount} {scholarship.currency}</p>
                    </div>
                  </div>
                )}

                {scholarship.universities?.name && (
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">University</p>
                      <p className="text-gray-600">{scholarship.universities.name}</p>
                    </div>
                  </div>
                )}

                {scholarship.destination_country && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-gray-600">{scholarship.destination_country}</p>
                    </div>
                  </div>
                )}

                {scholarship.courses?.title && (
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Course</p>
                      <Link to={`/courses/${scholarship.courses.slug}`} className="text-primary hover:text-primary/80">
                        {scholarship.courses.title}
                      </Link>
                    </div>
                  </div>
                )}

                {scholarship.deadline && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Application Deadline</p>
                      <p className="text-gray-600">{format(new Date(scholarship.deadline), 'PPP')}</p>
                    </div>
                  </div>
                )}

                {scholarship.start_date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Start Date</p>
                      <p className="text-gray-600">{format(new Date(scholarship.start_date), 'PPP')}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {scholarship.full_description && (
              <Card>
                <CardHeader>
                  <CardTitle>About This Scholarship</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{scholarship.full_description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eligibility */}
            {scholarship.eligibility_criteria && (
              <Card>
                <CardHeader>
                  <CardTitle>Eligibility Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{scholarship.eligibility_criteria}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Process */}
            {scholarship.application_process && (
              <Card>
                <CardHeader>
                  <CardTitle>Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{scholarship.application_process}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Required Documents */}
            {scholarship.required_documents && (
              <Card>
                <CardHeader>
                  <CardTitle>Required Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-wrap">{scholarship.required_documents}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Now */}
            <Card>
              <CardHeader>
                <CardTitle>Apply for This Scholarship</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {scholarship.application_link && (
                  <Button asChild className="w-full">
                    <a href={scholarship.application_link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </a>
                  </Button>
                )}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/contact">
                    Get Help with Application
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            {(scholarship.contact_email || scholarship.contact_phone) && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scholarship.contact_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${scholarship.contact_email}`} className="text-primary hover:text-primary/80">
                        {scholarship.contact_email}
                      </a>
                    </div>
                  )}
                  {scholarship.contact_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-primary" />
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
              <Card>
                <CardHeader>
                  <CardTitle>University</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    {scholarship.universities.logo_url && (
                      <img
                        src={scholarship.universities.logo_url}
                        alt={scholarship.universities.name}
                        className="w-12 h-12 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{scholarship.universities.name}</h3>
                    </div>
                  </div>
                  {scholarship.universities.website_url && (
                    <Button variant="outline" size="sm" asChild>
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
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <LeadEnquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;