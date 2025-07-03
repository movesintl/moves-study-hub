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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-accent">To</span> Apply
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Applying to your dream university is easy. Follow the below steps and get in touch with one of our counsellors to assist you in processing your application.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gray-200">
            <div className="h-full w-2/3 bg-gradient-to-r from-accent to-amber-600"></div>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number Circle */}
                <div className="flex justify-center mb-8">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full text-white font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>

                {/* Step Card */}
                <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
                        <div className="text-gray-600">
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* Arrow indicator between cards */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <ArrowRight className="h-6 w-6 text-accent" />
                      </div>
                    )}
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;