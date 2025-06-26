
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  onAddFAQ: () => void;
  onRemoveFAQ: (index: number) => void;
  onUpdateFAQ: (index: number, field: 'question' | 'answer', value: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  onAddFAQ,
  onRemoveFAQ,
  onUpdateFAQ,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          FAQ Section
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddFAQ}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add FAQ
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Add FAQ items to provide additional information on the blog page.
          </p>
        ) : (
          faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">FAQ {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFAQ(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <Label>Question</Label>
                <Input
                  value={faq.question}
                  onChange={(e) => onUpdateFAQ(index, 'question', e.target.value)}
                  placeholder="Enter the question"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Answer</Label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => onUpdateFAQ(index, 'answer', e.target.value)}
                  placeholder="Enter the answer"
                  rows={3}
                  className="mt-1 w-full px-3 py-2 border border-input rounded-md"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
