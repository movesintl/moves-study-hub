import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface HowItWorksBlurb {
  icon: string;
  title: string;
  description: string;
}

interface HowItWorksDisplayProps {
  title?: string;
  description?: string;
  featureImageUrl?: string;
  blurbs?: HowItWorksBlurb[];
}

const HowItWorksDisplay: React.FC<HowItWorksDisplayProps> = ({
  title,
  description,
  featureImageUrl,
  blurbs = [],
}) => {
  if (!title && !description && !featureImageUrl && blurbs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            {featureImageUrl && (
              <div className="mt-8">
                <img 
                  src={featureImageUrl} 
                  alt={title || "How it works"}
                  className="w-full max-w-2xl mx-auto h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Process Steps */}
          {blurbs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blurbs.map((blurb, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      {blurb.icon ? (
                        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <img 
                            src={blurb.icon} 
                            alt={blurb.title}
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <span className="text-2xl font-bold text-primary">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {blurb.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {blurb.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksDisplay;