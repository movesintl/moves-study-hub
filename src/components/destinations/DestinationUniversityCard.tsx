import React from 'react';
import { Star, ExternalLink, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface University {
  id: string;
  name: string;
  location: string;
  logo_url?: string;
  website_url?: string;
}

interface DestinationUniversityCardProps {
  university: University;
}

const DestinationUniversityCard: React.FC<DestinationUniversityCardProps> = ({ university }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md hover:-translate-y-2 relative overflow-hidden bg-card">
      <CardContent className="p-6 text-center">
        <div className="relative mb-4">
          {university.logo_url ? (
            <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src={university.logo_url} 
                alt={university.name}
                className="w-12 h-12 object-contain"
              />
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-full shadow-md flex items-center justify-center">
              <Star className="h-8 w-8 text-primary/70" />
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {university.name}
        </h3>
        
        <div className="flex items-center justify-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{university.location}</span>
        </div>
        
        {university.website_url && (
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <a href={university.website_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3 mr-2" />
              Visit Website
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DestinationUniversityCard;