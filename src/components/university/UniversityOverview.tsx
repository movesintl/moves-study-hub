import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface UniversityOverviewProps {
  university: {
    name: string;
    overview_content?: string;
  };
}

export const UniversityOverview = ({ university }: UniversityOverviewProps) => {
  if (!university.overview_content) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left Column - Content (80% - 4/5 width) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    About {university.name}
                  </h2>
                  <div className="w-20 h-1 bg-primary"></div>
                </div>
                
                <div 
                  className="prose prose-lg max-w-none text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: university.overview_content }}
                />
              </div>
            </div>

            {/* Right Column - CTA (20% - 1/5 width) */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-card-foreground leading-tight">
                    Feeling stuck? Let our expert counsellor help you.
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Can't decide on the university and course? Our experienced counsellors are here to guide and support you through each stage of your study abroad journey.
                  </p>
                  
                  <p className="text-muted-foreground text-sm font-medium">
                    Reach out today!
                  </p>
                  
                  <Link to="/contact">
                    <Button className="w-full">
                      Meet a counsellor
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};