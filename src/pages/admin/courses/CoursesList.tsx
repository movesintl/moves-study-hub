
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CoursesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const { data: courses = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities:university_id(name),
          destinations:destination_id(name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const deleteCourse = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Course deleted successfully"
      });
      refetch();
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.university.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Courses Management</h1>
          <p className="text-gray-600">Manage all courses and programs</p>
        </div>
        <Link to="/admin/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{course.universities?.name || course.university}</span>
                    <span>•</span>
                    <span>{course.destinations?.name || course.country}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {course.featured && <Badge variant="secondary">Featured</Badge>}
                  <Badge variant="outline">{course.study_area}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{course.duration_months} months</span>
                  <span>•</span>
                  <span>{course.currency} {course.tuition_fee_min?.toLocaleString()}</span>
                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                    <span>- {course.tuition_fee_max?.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/courses/${course.slug}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/admin/courses/${course.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found.</p>
          <Link to="/admin/courses/new">
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add First Course
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
