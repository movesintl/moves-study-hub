import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  onAddFAQ: () => void;
  onRemoveFAQ: (index: number) => void;
  onUpdateFAQ: (index: number, field: 'question' | 'answer', value: string) => void;
}

const FAQSection = ({ faqs, onAddFAQ, onRemoveFAQ, onUpdateFAQ }: FAQSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <p className="text-sm text-gray-500">
          Add common questions and answers about studying in this destination
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">FAQ #{index + 1}</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onRemoveFAQ(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div>
              <Label htmlFor={`question-${index}`}>Question</Label>
              <Input
                id={`question-${index}`}
                value={faq.question}
                onChange={(e) => onUpdateFAQ(index, 'question', e.target.value)}
                placeholder="Enter the question..."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor={`answer-${index}`}>Answer</Label>
              <Textarea
                id={`answer-${index}`}
                value={faq.answer}
                onChange={(e) => onUpdateFAQ(index, 'answer', e.target.value)}
                placeholder="Enter the answer..."
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={onAddFAQ}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add FAQ
        </Button>
      </CardContent>
    </Card>
  );
};

export default FAQSection;