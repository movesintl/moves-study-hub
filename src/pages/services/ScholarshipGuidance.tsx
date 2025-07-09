import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, Search, FileText, Award, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const ScholarshipGuidance = () => {
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
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Scholarship Guidance
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Unlock funding opportunities and make your education dreams affordable with expert scholarship guidance
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    Find Scholarships
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Free Assessment
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span>$2.5M+ Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>85% Success Rate</span>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <Award className="h-24 w-24 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Scholarship Services</h2>
          <p className="text-xl text-muted-foreground">Comprehensive support to secure funding for your education</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Search className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Scholarship Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access our database of 1000+ scholarships from universities and organizations worldwide.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Application Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Expert assistance with scholarship applications, essays, and required documentation.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Merit Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Evaluate your profile and identify scholarships where you have the highest chances.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Country-Specific Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Specialized knowledge of scholarships available in Australia, Canada, UK, and USA.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <DollarSign className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Financial Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Help you plan your finances and combine multiple funding sources effectively.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Success Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor application progress and provide updates throughout the process.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Scholarship Types */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Types of Scholarships</h2>
            <p className="text-xl text-muted-foreground">Various funding opportunities available</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Merit-Based Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Academic excellence scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Leadership awards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Sports scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Talent-based awards</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Need-Based Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Financial aid programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Government scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">University bursaries</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Community grants</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Subject-Specific Scholarships</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">STEM scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Business and MBA funding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Arts and humanities awards</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Research grants</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Country-Specific Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Australia Awards Scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">Canadian government funding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">UK Chevening Scholarships</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                    <span className="text-muted-foreground">US Fulbright Program</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Stats */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Success Record</h2>
          <p className="text-xl text-muted-foreground">Helping students secure millions in scholarships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">$2.5M+</div>
            <div className="text-muted-foreground text-lg">Scholarships Secured</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground text-lg">Students Helped</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-muted-foreground text-lg">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
            <div className="text-muted-foreground text-lg">Scholarships Database</div>
          </div>
        </div>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default ScholarshipGuidance;