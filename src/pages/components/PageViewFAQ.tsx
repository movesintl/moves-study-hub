
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

interface FAQ {
  question: string;
  answer: string;
}

interface PageViewFAQProps {
  faqs: FAQ[];
}

const PageViewFAQ = ({ faqs }: PageViewFAQProps) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left px-6 py-4 hover:no-underline">
                <span className="font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <div 
                  dangerouslySetInnerHTML={{ __html: faq.answer.replace(/\n/g, '<br>') }}
                  className="text-gray-600 leading-relaxed"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default PageViewFAQ;
