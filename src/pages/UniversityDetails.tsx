import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Building2, GraduationCap, Calendar, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import { Link } from 'react-router-dom';

const UniversityDetails = () => {
  const { slug } = useParams();

  const { data: university, isLoading, error } = useQuery({
    queryKey: ['university', slug],
    queryFn: async () => {
      console.log('Fetching university with slug:', slug);
      
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) {
        console.error('University fetch error:', error);
        throw error;
      }
      
      console.log('University data:', data);
      return data;
    }
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['university-courses', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];
      
      console.log('Fetching courses for university:', university.id);
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('university_id', university.id);
      
      if (error) {
        console.error('Courses fetch error:', error);
        throw error;
      }
      
      console.log('Courses data:', data);
      return data;
    },
    enabled: !!university?.id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse space-y-8 py-16">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-muted rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">University not found</h1>
          <p className="text-muted-foreground mb-6">The university you're looking for doesn't exist.</p>
          <Link to="/universities">
            <Button>Browse Universities</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Minimalist Design */}
      <section className="relative bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Content - 8 columns */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>University</span>
                    {university.country && (
                      <>
                        <span>•</span>
                        <span>{university.country}</span>
                      </>
                    )}
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                    {university.name}
                  </h1>
                  
                  {university.location && (
                    <div className="flex items-center gap-2 text-lg text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{university.location}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 py-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-medium">{courses.length}</span>
                    <span className="text-muted-foreground">Programs</span>
                  </div>
                  {university.website_url && (
                    <div className="flex items-center gap-2 text-foreground">
                      <ExternalLink className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Official Website</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="px-8">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Counselling
                    </Button>
                  </Link>
                  
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="px-8">
                      <Users className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </Link>
                  
                  {university.website_url && (
                    <Button size="lg" variant="ghost" asChild>
                      <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Logo - 4 columns */}
              {university.logo_url && (
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-card p-8 rounded-3xl shadow-lg">
                      <img 
                        src={university.logo_url} 
                        alt={university.name}
                        className="h-32 w-32 lg:h-40 lg:w-40 object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* University Overview Section */}
      {university.overview_content && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  About {university.name}
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto"></div>
              </div>
              
              <div className="bg-muted rounded-2xl p-8 lg:p-12">
                <div 
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: university.overview_content }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Courses Section */}
      <section className="py-16 lg:py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {courses.length > 0 ? (
              <div>
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    Available Programs
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Explore the diverse range of programs offered by {university.name}
                  </p>
                  <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
                </div>
                
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-md">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline" className="text-xs font-medium">
                              {course.study_area}
                            </Badge>
                            {course.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          
                          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                            {course.description}
                          </p>
                          
                          <div className="space-y-3 py-4 border-t border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Level</span>
                              <span className="font-semibold text-card-foreground">{course.level}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">Duration</span>
                              <span className="font-semibold text-card-foreground">{course.duration_months} months</span>
                            </div>
                            {(course.tuition_fee_min || course.tuition_fee_max) && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Tuition</span>
                                <span className="font-bold text-primary">
                                  {course.currency} {course.tuition_fee_min?.toLocaleString()}
                                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                                    <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <Button className="w-full" asChild>
                            <Link to={`/courses/${course.slug}`}>View Program Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-16">
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="px-8">
                      Browse All Programs
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-secondary rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">No Programs Available</h3>
                  <p className="text-muted-foreground mb-8">
                    This university doesn't have any programs listed yet. Check back later or contact us for more information.
                  </p>
                  <Link to="/contact">
                    <Button size="lg">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default UniversityDetails;