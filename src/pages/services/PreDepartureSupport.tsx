import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Plane, Home, CreditCard, FileText, Users, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const PreDepartureSupport = () => {
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
                  <Plane className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Pre-Departure Support
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Complete guidance to prepare you for your journey abroad with confidence and comprehensive support
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
                    <FileText className="h-5 w-5 mr-2" />
                    Download Checklist
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Complete guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Expert support</span>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <Plane className="h-24 w-24 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Comprehensive Pre-Departure Services</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know before you go</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Plane className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Travel Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Flight booking assistance, travel insurance, and airport transfer arrangements.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Home className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Accommodation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Help with finding and securing student housing, homestays, or temporary accommodation.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CreditCard className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Banking & Finance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Guidance on opening bank accounts, forex services, and financial planning abroad.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Document verification, attestation services, and ensuring all paperwork is complete.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Cultural Orientation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cultural adaptation sessions to help you integrate smoothly into your new environment.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">Local Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Local area information, transportation, and essential services in your destination city.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Checklist */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Pre-Departure Checklist</h2>
            <p className="text-xl text-muted-foreground">Everything covered in our comprehensive program</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Essential Documentation</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Passport and visa verification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Academic documents attestation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Medical insurance and health records</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Financial documents and bank statements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Emergency contact information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">International driving permit</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Practical Arrangements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Flight booking and seat selection</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Airport pickup arrangements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Temporary accommodation booking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Local SIM card and phone plans</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Currency exchange and forex cards</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1" />
                  <span className="text-muted-foreground">Packing guidelines and customs information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Orientation Sessions */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Orientation Sessions</h2>
          <p className="text-xl text-muted-foreground">Comprehensive preparation for your new life abroad</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Cultural Adaptation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Understanding local customs and etiquette</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Communication styles and social norms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Dining etiquette and food culture</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Academic culture and expectations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Practical Living</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Public transportation systems</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Shopping and grocery essentials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Healthcare system and services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Emergency contacts and procedures</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Legal & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Visa conditions and compliance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Work rights and restrictions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Tax obligations and TFN/SIN applications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Registration requirements</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Support Network</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Student community connections</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Local support services</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">Mentorship programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mr-2 mt-1" />
                  <span className="text-muted-foreground">24/7 emergency support</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default PreDepartureSupport;