import React from 'react';
import { DollarSign, Home, Utensils, Bus, Zap, Film } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CostItem {
  category: string;
  amount: string;
}

interface CostOfLivingSectionProps {
  destinationName: string;
  costOfLivingContent?: string; // JSON string like: [{ category: 'Accommodation', amount: 'AUD $150-400/week' }]
}

const iconMap: Record<string, JSX.Element> = {
  accommodation: <Home className="h-6 w-6 text-[#023047]" />,
  food: <Utensils className="h-6 w-6 text-[#023047]" />,
  transport: <Bus className="h-6 w-6 text-[#023047]" />,
  utilities: <Zap className="h-6 w-6 text-[#023047]" />,
  entertainment: <Film className="h-6 w-6 text-[#023047]" />,
};

const CostOfLivingSection = ({ destinationName, costOfLivingContent }: CostOfLivingSectionProps) => {
  let costItems: CostItem[] = [];

  try {
    const parsed = JSON.parse(costOfLivingContent || '[]');
    if (Array.isArray(parsed)) {
      costItems = parsed;
    }
  } catch {
    // fallback: no render
  }

  if (costItems.length === 0) return null;

  return (
    <section className="py-16 px-4">
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <DollarSign className="h-12 w-12 text-[#fa8500] mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-[#023047] mb-2">Cost of Living</h2>
        <p className="text-lg text-gray-600">
          Estimated living expenses for international students in{' '}
          <span className="font-semibold text-[#023047]">{destinationName}</span>
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-6xl mx-auto">
        {costItems.map((item, index) => {
          const icon = iconMap[item.category.toLowerCase()] || <DollarSign className="h-6 w-6 text-[#023047]" />;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center border border-gray-100"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#fa8500]/10">
                {icon}
              </div>
              <h3 className="text-md font-semibold text-[#023047] capitalize mb-1">{item.category}</h3>
              <p className="text-sm text-gray-600">{item.amount}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CostOfLivingSection;
