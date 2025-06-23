
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
      <LeadEnquiryForm />
      <WhyChooseUs />
      <CountryCards />
      <ServicesOverview />
      <Testimonials />
    </div>
  );
};

export default Home;
