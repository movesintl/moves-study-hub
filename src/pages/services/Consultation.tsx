
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Consultation = () => {
  const benefits = [
    'Personalized study plan development',
    'Career pathway guidance',
    'University and course recommendations',
    'Admission requirements analysis',
    'Scholarship opportunities identification',
    'Timeline and milestone planning'
  ];

  const process = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'We evaluate your academic background, career goals, and preferences'
    },
    {
      step: 2,
      title: 'Options Analysis',
      description: 'Our experts research and present suitable study options tailored to you'
    },
    {
      step: 3,
      title: 'Action Plan',
      description: 'We create a detailed roadmap with timelines and next steps'
    },
    {
      step: 4,
      title: 'Ongoing Support',
      description: 'Continuous guidance throughout your application journey'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <MessageCircle className="h-12 w-12 text-blue-200 mr-4" />
                <span className="text-blue-200 font-semibold">Free Service</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Free Consultation
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get expert guidance from our certified education consultants. We'll help you 
                navigate your international education journey with personalized advice and support.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Book Your Free Consultation
              </Button>
            </div>
            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">What You'll Get</h3>
                <ul className="space-y-3 text-left">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-300 mr-3 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Consultation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach to understanding your goals and creating the perfect study plan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <Card key={item.step} className="text-center relative">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
                {item.step < 4 && (
                  <ArrowRight className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-gray-300 h-8 w-8" />
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book consultations at your convenience with our flexible scheduling system. 
                  Available 7 days a week.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Expert Consultants</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our certified education consultants have years of experience helping 
                  students achieve their international study goals.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>Personalized Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every consultation is tailored to your unique background, goals, 
                  and circumstances for the best outcomes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Book your free consultation today and start your journey towards international education success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Book Free Consultation Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
