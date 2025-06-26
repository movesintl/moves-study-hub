
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobMarketPointsSectionProps {
  points: string[];
  onAddPoint: () => void;
  onRemovePoint: (index: number) => void;
  onUpdatePoint: (index: number, value: string) => void;
}

const JobMarketPointsSection = ({ 
  points, 
  onAddPoint, 
  onRemovePoint, 
  onUpdatePoint 
}: JobMarketPointsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Market & Career Opportunities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {points.map((point, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={point}
              onChange={(e) => onUpdatePoint(index, e.target.value)}
              placeholder="Enter job market information..."
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onRemovePoint(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={onAddPoint}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Job Market Point
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobMarketPointsSection;
