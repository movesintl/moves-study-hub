import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  Clock,
  CheckCircle,
  Bookmark,
  Download,
  Filter,
  Search,
  ChevronRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const UniversityDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [programFilter, setProgramFilter] = useState('all');
  const [programSearch, setProgramSearch] = useState('');

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

  // Filter courses based on search and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(programSearch.toLowerCase()) ||
                         course.study_area.toLowerCase().includes(programSearch.toLowerCase());
    const matchesLevel = programFilter === 'all' || course.level === programFilter;
    return matchesSearch && matchesLevel;
  });

  // Get unique course levels for filter
  const courseLevels = [...new Set(courses.map(course => course.level))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="animate-pulse">
          {/* Hero Skeleton */}
          <div className="relative h-[500px] bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="container mx-auto px-4 h-full flex items-end pb-16">
              <div className="space-y-4 w-full max-w-2xl">
                <div className="h-8 bg-muted rounded w-1/4"></div>
                <div className="h-12 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="flex gap-4">
                  <div className="h-12 bg-muted rounded w-32"></div>
                  <div className="h-12 bg-muted rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 space-y-6">
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="bg-muted/20 rounded-full p-12 w-32 h-32 mx-auto flex items-center justify-center">
            <Building2 className="h-16 w-16 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">University Not Found</h1>
            <p className="text-muted-foreground text-lg">The university you're looking for doesn't exist or has been moved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/universities')} size="lg">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Universities
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')}>
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: GraduationCap, label: 'Programs Offered', value: courses.length, color: 'text-blue-600' },
    { icon: Users, label: 'Application Portal', value: university?.application_portal_status || 'Open', color: 'text-green-600' },
    { icon: Globe, label: 'Global Ranking', value: university?.global_ranking || 'Top 500', color: 'text-purple-600' },
    { icon: Award, label: 'Accreditation', value: university?.accreditation_status || 'Verified', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="relative">
          {/* Navigation Bar */}
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/universities')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Universities
                </Button>
                <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/universities" className="hover:text-primary transition-colors">Universities</Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground">{university.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 pb-16">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* University Information */}
              <div className="lg:col-span-8 space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Public University
                  </Badge>
                  {university.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
                      <Star className="h-4 w-4 mr-1" />
                      Featured Institution
                    </Badge>
                  )}
                  <Badge variant="outline" className="px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    Verified
                  </Badge>
                </div>
                
                {/* University Name & Details */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {university.name}
                  </h1>
                  
                  {university.location && (
                    <div className="flex flex-wrap items-center gap-6 text-lg text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{university.location}</span>
                        {university.country && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">{university.country}</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Consultation
                  </Button>
                  
                  <Button size="lg" variant="outline" className="px-8 border-2 hover:bg-muted">
                    <Download className="h-5 w-5 mr-2" />
                    Download Brochure
                  </Button>
                  
                  {university.website_url && (
                    <Button size="lg" variant="ghost" asChild className="px-6">
                      <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-5 w-5 mr-2" />
                        Official Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* University Logo & Quick Stats moved here */}
              <div className="lg:col-span-4 space-y-6">
                {university.logo_url && (
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                      <Card className="relative bg-card/80 backdrop-blur border-0 shadow-2xl">
                        <CardContent className="p-8">
                          <img 
                            src={university.logo_url} 
                            alt={university.name}
                            className="h-24 w-24 lg:h-32 lg:w-32 object-contain mx-auto"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:shadow-md transition-all">
                      <CardContent className="p-4 text-center">
                        <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-lg font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-7xl mx-auto">
            {/* Enhanced Tab Navigation */}
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-4 w-full max-w-2xl h-14 bg-muted/30 backdrop-blur p-1">
                <TabsTrigger value="overview" className="h-12 font-medium">
                  <Info className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="programs" className="h-12 font-medium">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Programs ({courses.length})
                </TabsTrigger>
                <TabsTrigger value="admissions" className="h-12 font-medium">
                  <Users className="h-4 w-4 mr-2" />
                  Admissions
                </TabsTrigger>
                <TabsTrigger value="contact" className="h-12 font-medium">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                      <CardTitle className="text-2xl">About {university.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8">
                      {university.overview_content ? (
                        <div 
                          className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground"
                          dangerouslySetInnerHTML={{ __html: university.overview_content }}
                        />
                      ) : (
                        <div className="text-center py-12">
                          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-foreground mb-2">Comprehensive Information Coming Soon</h3>
                          <p className="text-muted-foreground">Detailed information about this prestigious institution will be available shortly.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Key Highlights */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Key Highlights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium">AACSB Accredited</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium">Research Intensive</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-purple-600" />
                          <span className="text-sm font-medium">Industry Partnerships</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-orange-600" />
                          <span className="text-sm font-medium">Career Support</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Sidebar */}
                <div className="space-y-6">
                  {/* Application Support */}
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Need Guidance?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">Get expert help with your application process</p>
                      <Button className="w-full" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Free Consultation
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Request Callback
                      </Button>
                    </CardContent>
                  </Card>

                  {/* University Facts */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">University Facts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location</span>
                        <span className="font-medium">{university.location || 'N/A'}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Programs</span>
                        <span className="font-medium">{courses.length} available</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span className="font-medium">Public Research University</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Established</span>
                        <span className="font-medium">1887</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rankings */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        Rankings & Recognition
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-yellow-50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-yellow-600">#247</div>
                        <div className="text-xs text-yellow-600">QS World Ranking</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-blue-50 rounded text-center">
                          <div className="font-bold text-blue-600">5★</div>
                          <div className="text-xs text-blue-600">QS Rating</div>
                        </div>
                        <div className="p-2 bg-green-50 rounded text-center">
                          <div className="font-bold text-green-600">A+</div>
                          <div className="text-xs text-green-600">Research</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              {/* Program Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search programs..." 
                          value={programSearch}
                          onChange={(e) => setProgramSearch(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={programFilter} onValueChange={setProgramFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        {courseLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Showing {filteredCourses.length} of {courses.length} programs
                  </div>
                </CardContent>
              </Card>

              {/* Programs Grid */}
              {filteredCourses.length > 0 ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6 space-y-4">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <Button variant="ghost" size="sm" className="p-1 flex-shrink-0">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{course.level}</Badge>
                            <Badge variant="outline">{course.study_area}</Badge>
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{Math.floor(course.duration_months / 12)} year{Math.floor(course.duration_months / 12) !== 1 ? 's' : ''}</span>
                              </div>
                              {course.tuition_fee && (
                                <div className="font-semibold text-primary">
                                  {course.currency} {course.tuition_fee?.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border-t bg-muted/20 p-4">
                          <div className="flex gap-2">
                            <Link to={`/courses/${course.slug}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </Link>
                            <Button size="sm" className="flex-1">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-16">
                    <div className="bg-muted/50 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <GraduationCap className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">No Programs Found</h3>
                    <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
                    <Button onClick={() => {setProgramSearch(''); setProgramFilter('all')}}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="admissions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Admission Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {university?.admission_requirements && Array.isArray(university.admission_requirements) && university.admission_requirements.length > 0 ? (
                        (university.admission_requirements as any[]).map((req: any, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">{req.title}</div>
                              <div className="text-sm text-muted-foreground">{req.description}</div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">Academic Qualifications</div>
                              <div className="text-sm text-muted-foreground">Minimum 65% in relevant field</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">English Proficiency</div>
                              <div className="text-sm text-muted-foreground">IELTS 6.5 or TOEFL 80</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium">Documents Required</div>
                              <div className="text-sm text-muted-foreground">Transcripts, CV, SOP, LOR</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {university?.application_deadlines && Array.isArray(university.application_deadlines) && university.application_deadlines.length > 0 ? (
                        (university.application_deadlines as any[]).map((deadline: any, index: number) => (
                          <div key={index} className={`p-3 border rounded-lg ${deadline.color || 'border-blue-200 bg-blue-50'}`}>
                            <div className={`font-medium ${deadline.textColor || 'text-blue-800'}`}>{deadline.intake}</div>
                            <div className={`text-sm ${deadline.dateColor || 'text-blue-600'}`}>Deadline: {deadline.deadline}</div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="p-3 border border-orange-200 bg-orange-50 rounded-lg">
                            <div className="font-medium text-orange-800">Fall Intake 2024</div>
                            <div className="text-sm text-orange-600">Deadline: March 15, 2024</div>
                          </div>
                          <div className="p-3 border border-blue-200 bg-blue-50 rounded-lg">
                            <div className="font-medium text-blue-800">Spring Intake 2025</div>
                            <div className="text-sm text-blue-600">Deadline: September 15, 2024</div>
                          </div>
                          <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                            <div className="font-medium text-green-800">Summer Intake 2025</div>
                            <div className="text-sm text-green-600">Deadline: January 15, 2025</div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-muted-foreground mb-6">Let our experts guide you through the application process</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button size="lg">Start Your Application</Button>
                    <Button size="lg" variant="outline">Get Application Help</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Admissions Office</div>
                          <div className="text-muted-foreground">+61 3 9925 2000</div>
                          <div className="text-sm text-muted-foreground">Mon-Fri, 9 AM - 5 PM</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Email</div>
                          <div className="text-muted-foreground">admissions@university.edu</div>
                          <div className="text-sm text-muted-foreground">Response within 24 hours</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Campus Address</div>
                          <div className="text-muted-foreground">{university.location || 'Address not available'}</div>
                          <div className="text-sm text-muted-foreground">Main Campus</div>
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
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                  <CardHeader>
                    <CardTitle>International Student Support</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                      Our dedicated team provides comprehensive support for international students throughout their journey.
                    </p>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Free Consultation
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="h-4 w-4 mr-2" />
                        Schedule Campus Tour
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Download Prospectus
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground mb-3">Available Support:</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Visa Guidance</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Accommodation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Career Services</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Language Support</span>
                        </div>
                      </div>
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