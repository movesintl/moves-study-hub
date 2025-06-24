
import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, DollarSign, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  level: string;
  duration_months: number;
  tuition_fee_min?: number;
  tuition_fee_max?: number;
  currency: string;
  thumbnail_url?: string;
  study_area: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkIfSaved();
    }
  }, [user, course.id]);

  const checkIfSaved = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_courses')
        .select('id')
        .eq('user_id', user?.id)
        .eq('course_id', course.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setIsSaved(!!data);
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveToggle = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save courses.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isSaved) {
        // Remove from saved courses
        const { error } = await supabase
          .from('saved_courses')
          .delete()
          .eq('user_id', user.id)
          .eq('course_id', course.id);

        if (error) throw error;

        setIsSaved(false);
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
              user_id: user.id,
              course_id: course.id,
            }
          ]);

        if (error) throw error;

        setIsSaved(true);
        toast({
          title: "Course Saved",
          description: "Course added to your saved list.",
        });
      }
    } catch (error) {
      console.error('Error toggling save status:', error);
      toast({
        title: "Error",
        description: "Failed to update saved status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatFeeRange = (min?: number, max?: number, currency: string = 'AUD') => {
    if (!min && !max) return 'Fee not available';
    if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `${currency} ${min.toLocaleString()}+`;
    return `Up to ${currency} ${max?.toLocaleString()}`;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        {course.thumbnail_url && (
          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              disabled={loading}
              className={`${isSaved ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-red-500'}`}
            >
              <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
        <CardDescription className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{course.university}, {course.country}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{course.duration_months} months</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex gap-2">
            <Badge variant="secondary">{course.level}</Badge>
            <Badge variant="outline">{course.study_area}</Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-medium">
              {formatFeeRange(course.tuition_fee_min, course.tuition_fee_max, course.currency)}
            </span>
          </div>

          <Button asChild className="w-full">
            <Link to={`/courses/${course.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
