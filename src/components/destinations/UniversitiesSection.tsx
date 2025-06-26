
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface University {
  id: string;
  name: string;
  location: string;
  logo_url?: string;
  website_url?: string;
}

interface UniversitiesSectionProps {
  destinationName: string;
  universities: University[];
}

const UniversitiesSection = ({ destinationName, universities }: UniversitiesSectionProps) => {
  if (universities.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="text-center mb-12">
        <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Top Universities</h2>
        <p className="text-gray-600">Premier educational institutions in {destinationName}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {universities.map((university) => (
          <Card key={university.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              {university.logo_url && (
                <img 
                  src={university.logo_url} 
                  alt={university.name}
                  className="w-16 h-16 object-contain mx-auto mb-4"
                />
              )}
              <h3 className="font-semibold mb-2">{university.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{university.location}</p>
              {university.website_url && (
                <Button variant="outline" size="sm" asChild>
                  <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                    Visit Website
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default UniversitiesSection;
