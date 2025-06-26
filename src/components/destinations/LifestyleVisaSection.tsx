
import React from 'react';
import { Heart, Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LifestyleVisaSectionProps {
  destination: {
    lifestyle_info?: string;
    visa_info?: string;
  };
}

const LifestyleVisaSection = ({ destination }: LifestyleVisaSectionProps) => {
  if (!destination.lifestyle_info && !destination.visa_info) {
    return null;
  }

  return (
    <section className="grid lg:grid-cols-2 gap-8">
      {destination.lifestyle_info && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Lifestyle & Culture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{destination.lifestyle_info}</p>
          </CardContent>
        </Card>
      )}

      {destination.visa_info && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-500" />
              Visa Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{destination.visa_info}</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default LifestyleVisaSection;
