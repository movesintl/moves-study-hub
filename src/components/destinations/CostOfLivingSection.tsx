
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CostOfLivingSectionProps {
  destinationName: string;
  costOfLivingContent?: string;
}

const CostOfLivingSection = ({ destinationName, costOfLivingContent }: CostOfLivingSectionProps) => {
  const getCountrySpecificData = (countryName: string) => {
    const countryData: {
      [key: string]: {
        costOfLiving: {
          [key: string]: string;
        };
      };
    } = {
      'Australia': {
        costOfLiving: {
          accommodation: 'AUD $150-400 per week',
          food: 'AUD $80-120 per week',
          transport: 'AUD $30-60 per week',
          utilities: 'AUD $20-50 per week',
          entertainment: 'AUD $50-100 per week'
        }
      },
      'Canada': {
        costOfLiving: {
          accommodation: 'CAD $400-800 per month',
          food: 'CAD $200-400 per month',
          transport: 'CAD $80-120 per month',
          utilities: 'CAD $100-150 per month',
          entertainment: 'CAD $100-200 per month'
        }
      },
      'United Kingdom': {
        costOfLiving: {
          accommodation: '£400-800 per month',
          food: '£150-250 per month',
          transport: '£50-150 per month',
          utilities: '£80-120 per month',
          entertainment: '£100-200 per month'
        }
      },
      'New Zealand': {
        costOfLiving: {
          accommodation: 'NZD $150-350 per week',
          food: 'NZD $80-120 per week',
          transport: 'NZD $25-50 per week',
          utilities: 'NZD $30-60 per week',
          entertainment: 'NZD $50-100 per week'
        }
      }
    };
    return countryData[countryName] || countryData['Australia'];
  };

  const countryData = getCountrySpecificData(destinationName);

  // If custom content is provided, use it; otherwise, use the template
  if (costOfLivingContent) {
    return (
      <section>
        <div className="text-center mb-12">
          <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Cost of Living</h2>
          <p className="text-gray-600">Living expenses information for {destinationName}</p>
        </div>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: costOfLivingContent }}
        />
      </section>
    );
  }

  return (
    <section>
      <div className="text-center mb-12">
        <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Cost of Living</h2>
        <p className="text-gray-600">Estimated weekly/monthly expenses for international students</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {Object.entries(countryData.costOfLiving).map(([category, cost]) => (
              <div key={category} className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold capitalize mb-2">{category}</h3>
                <p className="text-sm text-gray-600">{cost}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CostOfLivingSection;
