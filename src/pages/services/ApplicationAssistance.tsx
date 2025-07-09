import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, FileText, Upload, Clock, UserCheck, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const ApplicationAssistance = () => {
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
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Application Assistance
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Complete support for university and college applications with expert guidance every step of the way
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    Get Started
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    Free Consultation
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>92% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>Global Universities</span>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <FileText className="h-24 w-24 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Application Services</h2>
          <p className="text-xl text-muted-foreground">End-to-end support for your university applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Document Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Expert help with preparing and reviewing all required documents for your application.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Upload className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Application Submission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete application submission support including portal management and deadline tracking.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <UserCheck className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Profile Enhancement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Strengthen your application profile with strategic recommendations and improvements.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Clock className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Timeline Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Stay on track with personalized application timelines and deadline reminders.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Globe className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Multi-Country Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Apply to multiple countries simultaneously with country-specific guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Thorough review and quality checks before final submission to ensure success.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Application Process</h2>
            <p className="text-xl text-muted-foreground">Step-by-step guidance through your application journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Initial Consultation</h3>
              <p className="text-muted-foreground">Assess your profile and discuss application strategy</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Document Collection</h3>
              <p className="text-muted-foreground">Gather and prepare all required documents</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Application Preparation</h3>
              <p className="text-muted-foreground">Complete applications with expert guidance</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Submission & Follow-up</h3>
              <p className="text-muted-foreground">Submit applications and track progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">What's Included</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Personal statement and essay writing assistance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Letter of recommendation guidance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">CV/Resume optimization</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Academic transcript evaluation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Application form completion</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Document translation and attestation</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Application fee payment assistance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                <span className="text-muted-foreground">Progress tracking and updates</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Success Statistics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Application Success Rate</span>
                  <span className="font-semibold text-foreground">92%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Scholarship Success Rate</span>
                  <span className="font-semibold text-foreground">68%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Client Satisfaction</span>
                  <span className="font-semibold text-foreground">98%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default ApplicationAssistance;