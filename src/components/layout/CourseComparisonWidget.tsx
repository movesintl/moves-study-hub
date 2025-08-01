import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitCompare, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSavedCourses } from '@/hooks/useSavedCourses';

const CourseComparisonWidget = () => {
  const { savedCourseIds } = useSavedCourses();
  const savedCount = savedCourseIds.size;

  if (savedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-2">
      <Card className="shadow-lg border-primary">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {savedCount} course{savedCount > 1 ? 's' : ''} saved
              </span>
            </div>
            <Button asChild size="sm" className="ml-2">
              <Link to="/course-comparison">
                Compare
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseComparisonWidget;