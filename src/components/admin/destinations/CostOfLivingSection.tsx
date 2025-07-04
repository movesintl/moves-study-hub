import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface CostOfLivingItem {
  category: string;
  amount: string;
}

interface CostOfLivingSectionProps {
  costOfLivingData: CostOfLivingItem[];
  onCostOfLivingChange: (data: CostOfLivingItem[]) => void;
}

const CostOfLivingSection = ({ costOfLivingData, onCostOfLivingChange }: CostOfLivingSectionProps) => {
  const addCostItem = () => {
    onCostOfLivingChange([...costOfLivingData, { category: '', amount: '' }]);
  };

  const removeCostItem = (index: number) => {
    onCostOfLivingChange(costOfLivingData.filter((_, i) => i !== index));
  };

  const updateCostItem = (index: number, field: 'category' | 'amount', value: string) => {
    const updated = costOfLivingData.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onCostOfLivingChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost of Living</CardTitle>
        <p className="text-sm text-gray-500">
          Add cost categories with their estimated amounts (e.g., "Accommodation: AUD $150-400 per week")
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {costOfLivingData.map((item, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor={`category-${index}`}>Category</Label>
              <Input
                id={`category-${index}`}
                value={item.category}
                onChange={(e) => updateCostItem(index, 'category', e.target.value)}
                placeholder="e.g., Accommodation"
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor={`amount-${index}`}>Amount</Label>
              <Input
                id={`amount-${index}`}
                value={item.amount}
                onChange={(e) => updateCostItem(index, 'amount', e.target.value)}
                placeholder="e.g., AUD $150-400 per week"
                className="mt-1"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeCostItem(index)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={addCostItem}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Cost Category
        </Button>
      </CardContent>
    </Card>
  );
};

export default CostOfLivingSection;