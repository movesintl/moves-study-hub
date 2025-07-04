
import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationUniversityCard from './DestinationUniversityCard';

interface University {
  id: string;
  name: string;
  location: string;
  logo_url?: string;
  website_url?: string;
}

interface UniversitiesSectionProps {
  destinationName: string;
  universities: University[];
}

const UniversitiesSection = ({ destinationName, universities }: UniversitiesSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (universities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full mb-4">
            <Star className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Top Universities
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premier educational institutions in {destinationName}
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          {universities.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border-accent/20 hover:bg-accent hover:text-accent-foreground shadow-lg"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border-accent/20 hover:bg-accent hover:text-accent-foreground shadow-lg"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Universities Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {universities.map((university) => (
              <div key={university.id} className="flex-none w-80">
                <DestinationUniversityCard university={university} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button 
            className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a href="/universities">
              View All Universities
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UniversitiesSection;
