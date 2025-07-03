import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description?: string;
    study_area: string;
    level: string;
    duration_months: number;
    tuition_fee_min?: number;
    tuition_fee_max?: number;
    currency?: string;
    featured?: boolean;
    slug?: string;
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 shadow-md">
      <CardContent className="p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="text-xs font-medium">
              {course.study_area}
            </Badge>
            {course.featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {course.description}
          </p>
          
          <div className="space-y-3 py-4 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Level</span>
              <span className="font-semibold text-card-foreground">{course.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Duration</span>
              <span className="font-semibold text-card-foreground">{course.duration_months} months</span>
            </div>
            {(course.tuition_fee_min || course.tuition_fee_max) && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tuition</span>
                <span className="font-bold text-primary">
                  {course.currency} {course.tuition_fee_min?.toLocaleString()}
                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                    <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                  )}
                </span>
              </div>
            )}
          </div>
          
          <Button className="w-full" asChild>
            <Link to={`/courses/${course.slug}`}>View Program Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};