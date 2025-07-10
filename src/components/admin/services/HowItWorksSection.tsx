import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import MediaSelector from '@/components/admin/MediaSelector';

interface HowItWorksBlurb {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksSectionProps {
  title: string;
  description: string;
  featureImageUrl: string;
  blurbs: HowItWorksBlurb[];
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onFeatureImageChange: (value: string) => void;
  onAddBlurb: () => void;
  onRemoveBlurb: (index: number) => void;
  onUpdateBlurb: (index: number, field: keyof HowItWorksBlurb, value: string) => void;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  title,
  description,
  featureImageUrl,
  blurbs,
  onTitleChange,
  onDescriptionChange,
  onFeatureImageChange,
  onAddBlurb,
  onRemoveBlurb,
  onUpdateBlurb,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How It Works Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="how_it_works_title">Section Title</Label>
          <Input
            id="how_it_works_title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., How Our Service Works"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="how_it_works_description">Section Description</Label>
          <Textarea
            id="how_it_works_description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
            placeholder="Brief overview of how the service works..."
            className="mt-1"
          />
        </div>

        <MediaSelector
          value={featureImageUrl}
          onChange={onFeatureImageChange}
          label="Section Feature Image"
          placeholder="https://example.com/how-it-works-image.jpg"
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Process Steps</Label>
            <Button
              type="button"
              onClick={onAddBlurb}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
          </div>

          {blurbs.map((blurb, index) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    Step {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveBlurb(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <MediaSelector
                    value={blurb.icon}
                    onChange={(value) => onUpdateBlurb(index, 'icon', value)}
                    label="Step Icon"
                    placeholder="https://example.com/icon.svg"
                  />

                  <div>
                    <Label htmlFor={`blurb_title_${index}`}>Step Title</Label>
                    <Input
                      id={`blurb_title_${index}`}
                      value={blurb.title}
                      onChange={(e) => onUpdateBlurb(index, 'title', e.target.value)}
                      placeholder="Step title..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`blurb_description_${index}`}>Step Description</Label>
                    <Textarea
                      id={`blurb_description_${index}`}
                      value={blurb.description}
                      onChange={(e) => onUpdateBlurb(index, 'description', e.target.value)}
                      rows={2}
                      placeholder="Brief description of this step..."
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {blurbs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No steps added yet. Click "Add Step" to create your first process step.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksSection;