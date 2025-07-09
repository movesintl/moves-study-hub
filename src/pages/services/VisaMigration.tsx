import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, Award, ArrowLeft, Plane, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const VisaMigration = () => {
  const services = [
    {
      title: 'Student Visa Applications',
      description: 'Complete assistance with student visa applications for various countries',
      icon: Plane,
      features: ['Document preparation', 'Application submission', 'Interview preparation', 'Status tracking']
    },
    {
      title: 'Permanent Residency',
      description: 'Guidance for permanent residency applications and skilled migration',
      icon: Shield,
      features: ['Skills assessment', 'Points calculation', 'EOI submission', 'PR application']
    },
    {
      title: 'Work Visas',
      description: 'Professional work visa applications for international opportunities',
      icon: FileText,
      features: ['Employer sponsorship', 'Work permit applications', 'Skills verification', 'Legal compliance']
    },
    {
      title: 'Family Visas',
      description: 'Family reunion and dependent visa applications',
      icon: Users,
      features: ['Spouse visas', 'Child dependent visas', 'Parent visas', 'Family reunification']
    },
    {
      title: 'Tourist & Business Visas',
      description: 'Short-term visa applications for tourism and business purposes',
      icon: Award,
      features: ['Tourist visa applications', 'Business visa guidance', 'Transit visas', 'Multiple entry permits']
    },
    {
      title: 'Visa Renewals & Extensions',
      description: 'Renewal and extension services for existing visas',
      icon: Clock,
      features: ['Renewal applications', 'Extension requests', 'Status changes', 'Compliance assistance']
    }
  ];

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
                  Visa & Migration Services
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Expert guidance for all your visa and migration needs with personalized support every step of the way
                </p>
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
                    Book Consultation
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>500+ Successful Visas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>95% Success Rate</span>
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

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Visa & Migration Services</h2>
          <p className="text-xl text-muted-foreground">Comprehensive solutions for all your immigration needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <IconComponent className="h-10 w-10 text-primary mb-4" />
                  <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground">Simple steps to achieve your migration goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Initial Consultation</h3>
              <p className="text-muted-foreground">Assessment of your case and requirements</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Documentation</h3>
              <p className="text-muted-foreground">Preparation and review of all required documents</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Application</h3>
              <p className="text-muted-foreground">Submission and tracking of your application</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Success</h3>
              <p className="text-muted-foreground">Approval and post-landing support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Successful Visas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default VisaMigration;