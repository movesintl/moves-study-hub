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
  const { id } = useParams();

  const { data: university, isLoading } = useQuery({
    queryKey: ['university', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['university-courses', university?.id],
    queryFn: async () => {
      if (!university?.id) return [];
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('university_id', university.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!university?.id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse space-y-8 py-16">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">University not found</h1>
          <p className="text-gray-500 mb-6">The university you're looking for doesn't exist.</p>
          <Link to="/universities">
            <Button>Browse Universities</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimalist Design */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Content - 8 columns */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span>University</span>
                    {university.country && (
                      <>
                        <span>•</span>
                        <span>{university.country}</span>
                      </>
                    )}
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {university.name}
                  </h1>
                  
                  {university.location && (
                    <div className="flex items-center gap-2 text-lg text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span>{university.location}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 py-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">{courses.length}</span>
                    <span className="text-gray-600">Programs</span>
                  </div>
                  {university.website_url && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <ExternalLink className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-600">Official Website</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link to="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Counselling
                    </Button>
                  </Link>
                  
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-3"></div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-lg">
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
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  About {university.name}
                </h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
                <div 
                  className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: university.overview_content }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Courses Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {courses.length > 0 ? (
              <div>
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Available Programs
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Explore the diverse range of programs offered by {university.name}
                  </p>
                  <div className="w-20 h-1 bg-blue-600 mx-auto mt-6"></div>
                </div>
                
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md bg-white">
                      <CardContent className="p-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge variant="outline" className="text-xs font-medium border-blue-200 text-blue-700 bg-blue-50">
                              {course.study_area}
                            </Badge>
                            {course.featured && (
                              <Badge className="bg-amber-100 text-amber-700 text-xs border-amber-200">
                                Featured
                              </Badge>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                          
                          <p className="text-gray-600 line-clamp-3 leading-relaxed">
                            {course.description}
                          </p>
                          
                          <div className="space-y-3 py-4 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Level</span>
                              <span className="font-semibold text-gray-900">{course.level}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">Duration</span>
                              <span className="font-semibold text-gray-900">{course.duration_months} months</span>
                            </div>
                            {(course.tuition_fee_min || course.tuition_fee_max) && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Tuition</span>
                                <span className="font-bold text-blue-600">
                                  {course.currency} {course.tuition_fee_min?.toLocaleString()}
                                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                                    <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                                  )}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                            <Link to={`/courses/${course.slug}`}>View Program Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center mt-16">
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                      Browse All Programs
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Programs Available</h3>
                  <p className="text-gray-600 mb-8">
                    This university doesn't have any programs listed yet. Check back later or contact us for more information.
                  </p>
                  <Link to="/contact">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
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