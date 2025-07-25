import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  GraduationCap, 
  Users, 
  Calendar,
  Star,
  Globe,
  Award,
  BookOpen,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  Heart,
  Eye,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const UniversityDetails = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: university, isLoading, error } = useQuery({
    queryKey: ['university', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="animate-pulse">
          {/* Hero Skeleton */}
          <div className="h-80 bg-gradient-to-r from-muted via-muted/50 to-muted"></div>
          
          {/* Content Skeleton */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-muted rounded w-1/3"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-64 bg-muted rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="bg-muted/50 rounded-full p-8 w-24 h-24 mx-auto flex items-center justify-center">
            <Building2 className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-3">University Not Found</h1>
            <p className="text-muted-foreground text-lg">The university you're looking for doesn't exist or has been moved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/universities">
              <Button size="lg">Browse Universities</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: GraduationCap, label: 'Programs', value: courses.length || 'N/A' },
    { icon: Users, label: 'Students', value: '15,000+' },
    { icon: Award, label: 'Ranking', value: 'Top 100' },
    { icon: Globe, label: 'Countries', value: '80+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/universities" className="hover:text-primary transition-colors">
              Universities
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{university.name}</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* University Badge */}
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                  <Building2 className="h-4 w-4 mr-2" />
                  University
                </Badge>
                {university.featured && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <Star className="h-4 w-4 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              
              {/* University Name & Location */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  {university.name}
                </h1>
                
                {university.location && (
                  <div className="flex items-center gap-3 text-xl text-muted-foreground">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span>{university.location}</span>
                    {university.country && (
                      <>
                        <span>•</span>
                        <span className="font-medium">{university.country}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Counselling
                  </Button>
                </Link>
                
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="px-8 border-2">
                    <Users className="h-5 w-5 mr-2" />
                    Apply Now
                  </Button>
                </Link>
                
                {university.website_url && (
                  <Button size="lg" variant="ghost" asChild>
                    <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      Visit Website
                    </a>
                  </Button>
                )}
                
                <Button size="lg" variant="ghost">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* University Logo */}
            {university.logo_url && (
              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-6 group-hover:rotate-3 transition-transform duration-300"></div>
                  <div className="relative bg-card/80 backdrop-blur p-8 rounded-3xl shadow-2xl border border-border/50">
                    <img 
                      src={university.logo_url} 
                      alt={university.name}
                      className="h-32 w-32 lg:h-40 lg:w-40 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-3 w-full max-w-md h-12 bg-muted/50 backdrop-blur">
                <TabsTrigger value="overview" className="h-10">Overview</TabsTrigger>
                <TabsTrigger value="programs" className="h-10">Programs</TabsTrigger>
                <TabsTrigger value="contact" className="h-10">Contact</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-12">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-8">
                      <h2 className="text-3xl font-bold text-foreground mb-6">
                        About {university.name}
                      </h2>
                      <Separator className="mb-6" />
                      
                      {university.overview_content ? (
                        <div 
                          className="prose prose-lg max-w-none text-foreground [&_p]:text-foreground [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_li]:text-foreground"
                          dangerouslySetInnerHTML={{ __html: university.overview_content }}
                        />
                      ) : (
                        <div className="text-center py-12">
                          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">No Overview Available</h3>
                          <p className="text-muted-foreground">Detailed information about this university will be available soon.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-4">Get Started</h3>
                      <div className="space-y-3">
                        <Link to="/contact" className="block">
                          <Button className="w-full justify-start bg-primary/10 text-primary hover:bg-primary hover:text-white">
                            <Calendar className="h-4 w-4 mr-2" />
                            Book Counselling
                          </Button>
                        </Link>
                        <Link to="/contact" className="block">
                          <Button variant="outline" className="w-full justify-start">
                            <Phone className="h-4 w-4 mr-2" />
                            Request Callback
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Information */}
                  <Card className="bg-card/50 backdrop-blur border-border/50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Facts</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="font-medium text-foreground">{university.location || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Programs:</span>
                          <span className="font-medium text-foreground">{courses.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="font-medium text-foreground">Public University</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Founded:</span>
                          <span className="font-medium text-foreground">1950</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              {courses.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur border-border/50 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <Button variant="ghost" size="sm" className="p-1">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex gap-2">
                            <Badge variant="outline">{course.level}</Badge>
                            <Badge variant="outline">{course.study_area}</Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{Math.floor(course.duration_months / 12)} year{Math.floor(course.duration_months / 12) !== 1 ? 's' : ''}</span>
                            </div>
                            {course.tuition_fee && (
                              <div className="font-semibold text-primary">
                                {course.currency} {course.tuition_fee?.toLocaleString()}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Link to={`/courses/${course.slug}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button size="sm" className="flex-1">Apply</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-muted/50 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">No Programs Available</h3>
                  <p className="text-muted-foreground mb-6">This university doesn't have any programs listed yet.</p>
                  <Link to="/contact">
                    <Button>Contact for More Information</Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contact" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                <Card className="bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Phone</div>
                            <div className="text-muted-foreground">+61 3 9925 2000</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <Mail className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Email</div>
                            <div className="text-muted-foreground">admissions@university.edu</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-3 rounded-full">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground">Address</div>
                            <div className="text-muted-foreground">{university.location || 'Address not available'}</div>
                          </div>
                        </div>
                      </div>
                      
                      {university.website_url && (
                        <Button asChild className="w-full">
                          <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Official Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Need Guidance?</h3>
                    <p className="text-muted-foreground mb-6">
                      Our experienced counsellors can help you understand admission requirements, 
                      application processes, and career opportunities.
                    </p>
                    <div className="space-y-3">
                      <Link to="/contact" className="block">
                        <Button className="w-full">Book Free Counselling</Button>
                      </Link>
                      <Link to="/contact" className="block">
                        <Button variant="outline" className="w-full">Request Information</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default UniversityDetails;