
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Category {
  id: string;
  name: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories?.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => onCategoryChange(category.id, !!checked)}
              />
              <Label htmlFor={category.id} className="text-sm font-normal">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
