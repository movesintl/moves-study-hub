
import React from 'react';
import Hero from '@/components/common/Hero';
import CountryCards from '@/components/common/CountryCards';
import WhyChooseUs from '@/components/common/WhyChooseUs';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import ServicesOverview from '@/components/common/ServicesOverview';
import Testimonials from '@/components/common/Testimonials';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CountryCards />
      <WhyChooseUs />
      <LeadEnquiryForm />
      <ServicesOverview />
      <div className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Take the first step towards your international education dreams. Our expert counsellors are here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Book Free Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;
