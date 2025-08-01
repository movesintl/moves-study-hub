
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useDestinationContent } from '@/hooks/useDestinationContent';
import DestinationHero from '@/components/destinations/DestinationHero';
import WhyStudySection from '@/components/destinations/WhyStudySection';
import LifestyleVisaSection from '@/components/destinations/LifestyleVisaSection';
import CostOfLivingSection from '@/components/destinations/CostOfLivingSection';
import UniversitiesSection from '@/components/destinations/UniversitiesSection';
import CoursesSection from '@/components/destinations/CoursesSection';
import JobMarketSection from '@/components/destinations/JobMarketSection';
import PageViewFAQ from '@/pages/components/PageViewFAQ';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import PopularCourses from '@/components/common/PopularCourses';
import FeaturedUniversities from '@/components/common/FeaturedUniversities';

const MoreInformationSection = ({ content }: { content: string }) => {
  if (!content) return null;
  
  return (
    <section>
      <div className="text-left mb-1">
        <h2 className="text-3xl font-bold mb-0">More Information</h2>
      </div>
      <div 
        className="prose prose-lg max-w-none mt-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  );
};

const DestinationDetails = () => {
  const { slug } = useParams();

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data;
    }
  });


  const { whyStudyPoints, jobMarketPoints } = useDestinationContent({
    destination: destination || { name: '', why_study_points: [], job_market_points: [] }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Destination not found</h1>
        <p className="text-gray-500 mt-2">The destination you're looking for doesn't exist or may have been removed.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <DestinationHero destination={destination} />

      <div className="container mx-auto py-12 px-4 space-y-16">
        {/* 2. Why Study in Destination Country? */}
        <WhyStudySection 
          destinationName={destination.name} 
          whyStudyPoints={whyStudyPoints} 
        />


            <MoreInformationSection content={destination.more_information || ''} />

            {/* Right Column: Lifestyle & Culture + Visa Information */}
            <LifestyleVisaSection destination={destination} />

        {/* 4. Cost of Living */}
        <CostOfLivingSection 
          destination={destination}
        />

        {/* 8. Job Market & Career Opportunities */}
        <JobMarketSection 
          destination={destination}
          jobMarketPoints={jobMarketPoints} 
        />

        {/* 6. Top Universities (slider) */}
        <FeaturedUniversities />

        {/* 7. Popular Courses (Slider) */}
        <PopularCourses
          country={destination.name}
        />



        {/* 9. FAQs */}
        <PageViewFAQ faqs={Array.isArray(destination.faqs) ? destination.faqs.filter((faq: any) => 
          typeof faq === 'object' && faq !== null && 
          typeof faq.question === 'string' && typeof faq.answer === 'string'
        ) as { question: string; answer: string; }[] : []} />
      </div>

      {/* 10. LeadEnquiryForm */}
      <LeadEnquiryForm />
    </div>
  );
};

export default DestinationDetails;
