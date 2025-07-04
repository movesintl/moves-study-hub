import React from 'react';
import { Heart, MapPin, Clock, Calendar, GraduationCap, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  duration_months: number;
  featured: boolean;
  slug: string;
}

interface DestinationCourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
}

const DestinationCourseCard: React.FC<DestinationCourseCardProps> = ({ 
  course, 
  onViewDetails 
}) => {
  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md hover:-translate-y-2 relative overflow-hidden bg-card">
      {/* Featured Badge */}
      {course.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-accent to-accent/90 text-white font-semibold shadow-lg">
            ✨ Featured
          </Badge>
        </div>
      )}

      {/* Course Visual Header */}
      <div className="h-40 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        <GraduationCap className="h-12 w-12 text-primary/70 relative z-10" />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-primary/20 to-transparent rounded-full transform -translate-x-10 translate-y-10"></div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {course.description && (
          <p className="text-muted-foreground line-clamp-2 leading-relaxed text-sm">
            {course.description}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20 text-xs">
            {course.level}
          </Badge>
          <Badge variant="outline" className="font-medium bg-accent/5 text-accent border-accent/20 text-xs">
            {course.study_area}
          </Badge>
        </div>

        <div className="flex items-center p-2 bg-muted/50 rounded-lg">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium text-sm">{formatDuration(course.duration_months)}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 h-9 font-semibold border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-xs"
            onClick={() => onViewDetails(course.slug)}
          >
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <Button 
            onClick={() => onViewDetails(course.slug)}
            className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold h-9 shadow-md hover:shadow-lg transition-all duration-300 text-xs"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCourseCard;