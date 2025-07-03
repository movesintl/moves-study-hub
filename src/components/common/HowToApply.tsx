import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, User, MessageCircle, ArrowRight } from 'lucide-react';

const HowToApply = () => {
  const steps = [
    {
      number: 1,
      icon: <FileText className="h-8 w-8" />,
      title: "Compare & Shortlist Your Desired Course",
      description: "Browse through our extensive course catalog and compare different programs to find the perfect match for your academic goals."
    },
    {
      number: 2, 
      icon: <User className="h-8 w-8" />,
      title: "Create Profile, Upload Documents & Apply",
      description: "Set up your profile, upload required documents, and submit your application with our streamlined application process."
    },
    {
      number: 3,
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Track Your Applications Status Easily",
      description: "Monitor your application progress in real-time and stay updated with notifications throughout the process."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How To
            </span>{" "}
            Apply
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Applying to your dream university is easy. Follow the below steps and get in touch with one of our counsellors to assist you in processing your application.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2 hidden md:block"></div>
          <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-gradient-to-r from-primary to-accent rounded-full transform -translate-y-1/2 hidden md:block"></div>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector Arrow for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 -right-6 lg:-right-8 z-10">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border-2 border-gray-100 group-hover:border-accent transition-colors duration-300">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                </div>
              )}

              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105 overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Icon Container */}
                  <div className="mt-8 mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl group-hover:from-accent/20 group-hover:to-primary/20 transition-colors duration-300">
                      <div className="text-primary group-hover:text-accent transition-colors duration-300">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-base">
                    {step.description}
                  </p>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full border border-primary/10">
            <div className="w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Ready to start your journey?</span>
            <ArrowRight className="h-4 w-4 text-accent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;