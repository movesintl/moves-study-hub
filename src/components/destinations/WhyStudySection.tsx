
import React from 'react';
import { GraduationCap, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WhyStudySectionProps {
  destinationName: string;
  whyStudyPoints: string[];
}

const WhyStudySection = ({ destinationName, whyStudyPoints }: WhyStudySectionProps) => {
  return (
    <section>
      <div className="text-center mb-12">
        <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Why Study in {destinationName}?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover the unique advantages and opportunities that make {destinationName} an ideal destination for international students.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyStudyPoints.map((reason, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700">{reason}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyStudySection;
