import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash2, ExternalLink, Clock, MapPin, GitCompare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SavedCourse {
  id: string;
  course_id: string;
  created_at: string;
  courses: {
    id: string;
    title: string;
    university: string;
    country: string;
    level: string;
    duration_months: number;
    tuition_fee?: number;
    currency: string;
    thumbnail_url?: string;
    slug: string;
  };
}

const SavedCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedCourses();
    }
  }, [user]);

  const fetchSavedCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_courses')
        .select(`
          id,
          course_id,
          created_at,
          courses(
            id,
            title,
            university,
            country,
            level,
            duration_months,
            tuition_fee,
            currency,
            thumbnail_url,
            slug
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedCourses(data || []);
    } catch (error) {
      console.error('Error fetching saved courses:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your saved courses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (savedCourseId: string) => {
    try {
      const { error } = await supabase
        .from('saved_courses')
        .delete()
        .eq('id', savedCourseId);

      if (error) throw error;

      setSavedCourses(savedCourses.filter(course => course.id !== savedCourseId));
      toast({
        title: "Success",
        description: "Course removed from saved list.",
      });
    } catch (error) {
      console.error('Error removing saved course:', error);
      toast({
        title: "Error",
        description: "Failed to remove course from saved list.",
        variant: "destructive",
      });
    }
  };

  const formatFeeRange = (min?: number, max?: number, currency: string = 'AUD') => {
    if (!min && !max) return 'Fee not available';
    if (min && max) return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    if (min) return `${currency} ${min.toLocaleString()}+`;
    return `Up to ${currency} ${max?.toLocaleString()}`;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading your saved courses...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Courses</h1>
          <p className="text-gray-600">Your wishlist of courses to apply for</p>
        </div>
        {savedCourses.length > 1 && (
          <Button asChild variant="outline">
            <Link to="/course-comparison">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Courses
            </Link>
          </Button>
        )}
      </div>

      {savedCourses.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No saved courses yet</h3>
            <p className="text-gray-600 mb-4">
              Browse our course catalog and save courses you're interested in
            </p>
            <Button asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCourses.map((savedCourse) => (
            <Card key={savedCourse.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                {savedCourse.courses.thumbnail_url && (
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={savedCourse.courses.thumbnail_url}
                      alt={savedCourse.courses.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">
                    {savedCourse.courses.title}
                  </CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Remove from Saved</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this course from your saved list?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleRemoveCourse(savedCourse.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <CardDescription className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{savedCourse.courses.university}, {savedCourse.courses.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{savedCourse.courses.duration_months} months</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <Badge variant="secondary">{savedCourse.courses.level}</Badge>
                  
                  <div className="text-sm">
                    <span className="font-medium">Tuition Fee:</span>
                    <p className="text-gray-600">
                      {savedCourse.courses.currency} {savedCourse.courses.tuition_fee?.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-xs text-gray-500">
                    Saved on {new Date(savedCourse.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild size="sm" className="flex-1">
                      <Link to={`/courses/${savedCourse.courses.slug}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCourses;
