
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface JobMarketSectionProps {
  destinationName: string;
  jobMarketPoints: string[];
}

const JobMarketSection = ({ destinationName, jobMarketPoints }: JobMarketSectionProps) => {
  return (
    <section>
      <div className="text-center mb-12">
        <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Job Market & Career Opportunities</h2>
        <p className="text-gray-600">Employment prospects and career growth in {destinationName}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobMarketPoints.map((point, index) => (
          <Card key={index} className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{point}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default JobMarketSection;
