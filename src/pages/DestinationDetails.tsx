
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
import CounsellingSection from '@/components/destinations/CounsellingSection';

const MoreInformationSection = ({ content }: { content: string }) => {
  if (!content) return null;
  
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">More Information</h2>
        <p className="text-gray-600">Additional details about studying in this destination</p>
      </div>
      <div 
        className="prose prose-lg max-w-none"
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

  const { data: universities = [] } = useQuery({
    queryKey: ['destination-universities', destination?.name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .ilike('location', `%${destination?.name}%`)
        .limit(12);
      
      if (error) throw error;
      return data;
    },
    enabled: !!destination?.name
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['destination-courses', destination?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('destination_id', destination?.id)
        .eq('featured', true)
        .limit(8);
      
      if (error) throw error;
      return data;
    },
    enabled: !!destination?.id
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
    <div className="min-h-screen bg-gray-50">
      <DestinationHero destination={destination} />

      <div className="container mx-auto py-12 px-4 space-y-16">
        <WhyStudySection 
          destinationName={destination.name} 
          whyStudyPoints={whyStudyPoints} 
        />

        <LifestyleVisaSection destination={destination} />

        <MoreInformationSection content={destination.more_information || ''} />

        <CostOfLivingSection 
          destinationName={destination.name} 
          costOfLivingContent={destination.cost_of_living_info}
        />

        <UniversitiesSection 
          destinationName={destination.name} 
          universities={universities} 
        />

        <CoursesSection 
          destinationName={destination.name} 
          courses={courses} 
        />

        <JobMarketSection 
          destinationName={destination.name} 
          jobMarketPoints={jobMarketPoints} 
        />

        <CounsellingSection destinationName={destination.name} />
      </div>
    </div>
  );
};

export default DestinationDetails;
