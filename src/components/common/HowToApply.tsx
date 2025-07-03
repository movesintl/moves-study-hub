import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, User, MessageCircle } from 'lucide-react';

const HowToApply = () => {
  const steps = [
    {
      number: "01",
      icon: <FileText className="h-12 w-12 text-primary" />,
      title: "Compare & Shortlist Your Desired Course",
      description: "Browse through our extensive course catalog and compare different programs to find the perfect match for your academic goals."
    },
    {
      number: "02", 
      icon: <User className="h-12 w-12 text-primary" />,
      title: "Create Profile, Upload Documents & Apply",
      description: "Set up your profile, upload required documents, and submit your application with our streamlined application process."
    },
    {
      number: "03",
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      title: "Track Your Applications Status Easily",
      description: "Monitor your application progress in real-time and stay updated with notifications throughout the process."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-primary">How To</span> Apply
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Applying to your dream university is easy. Follow the below steps and get in touch with one of our counsellor to assist you in processing your application.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  {/* Large Number Background */}
                  <div className="relative mb-6">
                    <div className="text-8xl font-bold text-gray-100 absolute inset-0 flex items-center justify-center -top-4">
                      {step.number}
                    </div>
                    <div className="relative z-10 flex justify-center">
                      <div className="bg-orange-50 p-4 rounded-xl">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
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
    </section>
  );
};

export default HowToApply;