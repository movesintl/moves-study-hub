
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Shield, FileText, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const VisaMigration = () => {
  const services = [
    {
      title: 'Student Visa Applications',
      description: 'Complete assistance with student visa applications for all major study destinations',
      features: ['Document preparation', 'Application submission', 'Interview coaching', 'Status tracking']
    },
    {
      title: 'Post-Study Work Visas',
      description: 'Guidance on extending your stay after graduation with work visas',
      features: ['Eligibility assessment', 'Application support', 'Timeline planning', 'Requirements guidance']
    },
    {
      title: 'Permanent Residency',
      description: 'Pathways to permanent residency through study and skilled migration',
      features: ['PR pathways analysis', 'Points calculation', 'Skills assessment', 'Application lodgement']
    },
    {
      title: 'Family Visas',
      description: 'Bringing family members to join you during your studies',
      features: ['Dependent visas', 'Partner visas', 'Documentation help', 'Application tracking']
    }
  ];

  const countries = [
    { name: 'Australia', visaTypes: ['Student Visa (500)', 'Graduate Work Visa (485)', 'Skilled Migration'] },
    { name: 'Canada', visaTypes: ['Study Permit', 'PGWP', 'Express Entry'] },
    { name: 'UK', visaTypes: ['Student Visa', 'Graduate Route', 'Skilled Worker'] },
    { name: 'New Zealand', visaTypes: ['Student Visa', 'Post-Study Work Visa', 'Skilled Migrant'] }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Plane className="h-12 w-12 text-purple-200 mr-4" />
                <span className="text-purple-200 font-semibold">Expert Guidance</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Visa & Migration Services
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Navigate complex visa processes with confidence. Our migration experts provide 
                comprehensive support for all types of visas and migration pathways.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Get Visa Consultation
              </Button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Our Visa Services?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-green-300 mr-3" />
                  <span>Licensed Migration Agents</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-300 mr-3" />
                  <span>98% Success Rate</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-green-300 mr-3" />
                  <span>Complete Documentation Support</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-green-300 mr-3" />
                  <span>Ongoing Application Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Visa Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive visa and migration support for all your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supported Countries & Visa Types
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((country, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {country.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {country.visaTypes.map((visa, visaIndex) => (
                      <li key={visaIndex} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {visa}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Important Notice</h3>
              <p className="text-amber-700 leading-relaxed">
                Visa and migration laws are complex and change frequently. It's crucial to work with 
                licensed professionals to ensure compliance and maximize your chances of success. 
                Our team stays updated with the latest regulations to provide you with accurate guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Visa Application Today
          </h3>
          <p className="text-xl text-purple-100 mb-8">
            Don't let visa complexities hold you back. Get expert help and increase your chances of success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Book Visa Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaMigration;
