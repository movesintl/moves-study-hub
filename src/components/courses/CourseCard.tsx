
import React, { useState } from 'react';
import { Heart, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  study_area: string;
  level: string;
  duration_months: number;
  tuition_fee_min?: number;
  tuition_fee_max?: number;
  currency?: string;
  thumbnail_url?: string;
  featured?: boolean;
}

interface CourseCardProps {
  course: Course;
  onViewDetails: (courseId: string) => void;
  isSaved?: boolean;
  onSaveToggle?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onViewDetails, 
  isSaved = false, 
  onSaveToggle 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [currentlySaved, setCurrentlySaved] = useState(isSaved);

  const handleSaveToggle = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save courses.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      if (currentlySaved) {
        // Remove from saved courses
        const { error } = await supabase
          .from('saved_courses')
          .delete()
          .eq('course_id', course.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setCurrentlySaved(false);
        toast({
          title: "Course Removed",
          description: "Course removed from your saved list.",
        });
      } else {
        // Add to saved courses
        const { error } = await supabase
          .from('saved_courses')
          .insert([
            {
              course_id: course.id,
              user_id: user.id,
            }
          ]);

        if (error) throw error;

        setCurrentlySaved(true);
        toast({
          title: "Course Saved",
          description: "Course added to your saved list.",
        });
      }

      if (onSaveToggle) {
        onSaveToggle();
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
      toast({
        title: "Error",
        description: "Failed to update saved status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const formatFee = (min?: number, max?: number, currency: string = 'AUD') => {
    if (!min && !max) return 'Fee information not available';
    if (min && max && min !== max) {
      return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    const fee = min || max;
    return `${currency} ${fee?.toLocaleString()}`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2 flex-1">
            {course.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveToggle}
            disabled={saving}
            className="p-2 h-8 w-8 shrink-0"
          >
            <Heart 
              className={`h-4 w-4 ${
                currentlySaved ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`} 
            />
          </Button>
        </div>
        
        {course.featured && (
          <Badge variant="secondary" className="w-fit">
            Featured
          </Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-2" />
              {course.university}, {course.country}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              {course.duration_months} months • {course.level}
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              {formatFee(course.tuition_fee_min, course.tuition_fee_max, course.currency)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {course.study_area}
            </Badge>
          </div>
        </div>

        <Button 
          onClick={() => onViewDetails(course.id)}
          className="w-full mt-4"
          variant="outline"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
