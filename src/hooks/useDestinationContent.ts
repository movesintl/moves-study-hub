
import { useMemo } from 'react';

// Type guard to check if a value is an array of strings
const isStringArray = (value: any): value is string[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
};

// Default fallback data for countries not yet updated in admin
const getDefaultWhyStudyPoints = (countryName: string) => [
  'World-class education system ranked among the top globally',
  'Post-study work visa opportunities',
  'Multicultural and welcoming environment',
  'High standard of living and safety',
  'Research excellence and innovation',
  'Part-time work opportunities during studies'
];

const getDefaultJobMarketPoints = (countryName: string) => [
  'Strong job market with diverse opportunities',
  'High demand for skilled professionals',
  'Competitive minimum wage rates',
  'Post-graduation work visa opportunities',
  'Growing startup ecosystem in major cities',
  'Excellent work-life balance culture'
];

interface UseDestinationContentProps {
  destination: {
    name: string;
    why_study_points?: any;
    job_market_points?: any;
  };
}

export const useDestinationContent = ({ destination }: UseDestinationContentProps) => {
  const whyStudyPoints = useMemo(() => {
    if (isStringArray(destination.why_study_points) && destination.why_study_points.length > 0) {
      return destination.why_study_points;
    }
    return getDefaultWhyStudyPoints(destination.name);
  }, [destination.why_study_points, destination.name]);

  const jobMarketPoints = useMemo(() => {
    if (isStringArray(destination.job_market_points) && destination.job_market_points.length > 0) {
      return destination.job_market_points;
    }
    return getDefaultJobMarketPoints(destination.name);
  }, [destination.job_market_points, destination.name]);

  return {
    whyStudyPoints,
    jobMarketPoints
  };
};
