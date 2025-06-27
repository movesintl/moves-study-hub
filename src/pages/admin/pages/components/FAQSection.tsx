
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  onAddFaq: () => void;
  onRemoveFaq: (index: number) => void;
  onUpdateFaq: (index: number, field: 'question' | 'answer', value: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  onAddFaq,
  onRemoveFaq,
  onUpdateFaq,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          FAQ Section (Optional)
          <Button type="button" onClick={onAddFaq} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add FAQ
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label>FAQ {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFaq(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <Label>Question</Label>
              <Input
                value={faq.question}
                onChange={(e) => onUpdateFaq(index, 'question', e.target.value)}
                placeholder="Enter question..."
                className="mt-1"
              />
            </div>
            <div>
              <Label>Answer</Label>
              <Textarea
                value={faq.answer}
                onChange={(e) => onUpdateFaq(index, 'answer', e.target.value)}
                placeholder="Enter answer..."
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
        ))}
        {faqs.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No FAQs added yet. Click "Add FAQ" to create one.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FAQSection;
