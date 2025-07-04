import React from 'react';
import { Heart, MapPin, Clock, Calendar, GraduationCap, Eye, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSavedCourses } from '@/hooks/useSavedCourses';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description: string;
  study_area: string;
  level: string;
  duration_months: number;
  featured: boolean;
  slug: string;
  university: string;
  country: string;
  intake_dates: string[] | null;
  tuition_fee: number | null;
  currency: string | null;
}

interface DestinationCourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
}

const DestinationCourseCard: React.FC<DestinationCourseCardProps> = ({ 
  course, 
  onViewDetails 
}) => {
  const navigate = useNavigate();
  const { savedCourseIds, toggleSaveCourse } = useSavedCourses();
  const isSaved = savedCourseIds.has(course.id);
  
  const formatDuration = (months: number) => {
    if (months === 12) return '1 year';
    if (months % 12 === 0) return `${months / 12} years`;
    return `${months} months`;
  };

  const formatTuitionFee = (fee: number | null, currency: string | null) => {
    if (!fee) return 'Contact for fees';
    const formattedFee = fee.toLocaleString();
    return `${currency || 'AUD'} ${formattedFee}`;
  };

  const formatIntakes = (intakes: string[] | null) => {
    if (!intakes || intakes.length === 0) return 'Contact for intakes';
    if (intakes.length === 1) return intakes[0];
    if (intakes.length === 2) return intakes.join(' & ');
    return `${intakes[0]} & ${intakes.length - 1} more`;
  };

  const handleApplyNow = () => {
    navigate('/student-dashboard/applications');
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md hover:-translate-y-2 relative overflow-hidden bg-card">
      {/* Save Course Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-10 h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm hover:bg-card shadow-md"
        onClick={() => toggleSaveCourse(course.id)}
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${
            isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:text-red-500'
          }`} 
        />
      </Button>

      {/* Featured Badge */}
      {course.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold shadow-lg rounded-full px-3 py-1">
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
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem] mb-2">
            {course.title}
          </h3>
          
          {/* University and Country */}
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{course.university} • {course.country}</span>
          </div>

          {/* Description */}
          {course.description && (
            <p className="text-muted-foreground line-clamp-2 leading-relaxed text-sm mb-4">
              {course.description}
            </p>
          )}
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20 text-xs">
            {course.level}
          </Badge>
          <Badge className="font-medium bg-orange-100 text-orange-600 hover:bg-orange-200 text-xs">
            {course.study_area}
          </Badge>
        </div>

        {/* Duration and Intakes */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center p-2 bg-muted/50 rounded-lg">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium text-sm">{formatDuration(course.duration_months)}</span>
          </div>
          <div className="flex items-center p-2 bg-muted/50 rounded-lg">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium text-sm text-muted-foreground">Intakes: {formatIntakes(course.intake_dates)}</span>
          </div>
        </div>

        {/* Tuition Fee */}
        <div className="p-4 bg-muted/30 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tuition Fee</p>
              <p className="text-xl font-bold text-foreground">{formatTuitionFee(course.tuition_fee, course.currency)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            className="flex-1 h-11 font-semibold border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
            onClick={() => onViewDetails(course.slug)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            onClick={handleApplyNow}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold h-11 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCourseCard;