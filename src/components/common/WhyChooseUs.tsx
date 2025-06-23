
import React from 'react';
import { Award, Users, Globe, BookOpen, Shield, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Counsellors',
      description: 'Certified education consultants with 10+ years of experience in international admissions.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Partnerships with 500+ universities across 15+ countries worldwide.',
    },
    {
      icon: Users,
      title: '10,000+ Success Stories',
      description: 'Over 10,000 students successfully placed in top universities globally.',
    },
    {
      icon: BookOpen,
      title: 'Complete Support',
      description: 'End-to-end assistance from application to visa approval and pre-departure support.',
    },
    {
      icon: Shield,
      title: '99% Visa Success Rate',
      description: 'Industry-leading visa approval rate with expert documentation support.',
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Fast-track your applications with our streamlined processes and university partnerships.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Moves International?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just consultants, we're your partners in achieving your dream of studying abroad. 
            Here's what sets us apart from the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-primary rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students who have achieved their dreams with our expert guidance.
            </p>
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
