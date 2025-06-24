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
      {/* Hero section remains unchanged */}
      <Hero />
      
      {/* Updated layout with better spacing and visual hierarchy */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <LeadEnquiryForm />
      </div>
      
      <div className="bg-white">
        <CountryCards />
      </div>
      
      <div className="bg-gradient-to-br from-primary/5 via-gray-50 to-accent/5">
        <WhyChooseUs />
      </div>
      
      <div className="bg-white">
        <ServicesOverview />
      </div>
      
      <div className="bg-gradient-to-b from-gray-50 to-primary/5">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
