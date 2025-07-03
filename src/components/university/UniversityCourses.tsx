import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap } from 'lucide-react';

interface Course {
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
}

interface UniversityCoursesProps {
  university: {
    name: string;
  };
  courses: Course[];
}

export const UniversityCourses = ({ university, courses }: UniversityCoursesProps) => {
  return (
    <section className="py-16 lg:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {courses.length > 0 ? (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Available Programs
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Explore the diverse range of programs offered by {university.name}
                </p>
                <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses.map((course) => (
                  <Card key={course.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 relative overflow-hidden bg-white/80 backdrop-blur-sm">
                    {/* Featured Badge */}
                    {course.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg">
                          ✨ Featured
                        </Badge>
                      </div>
                    )}
                    
                    {/* Course Image */}
                    <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100"></div>
                      <GraduationCap className="h-16 w-16 text-primary/60 relative z-10" />
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="p-6 pb-4">
                        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 text-card-foreground">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="px-6 space-y-5">
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed">{course.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="font-medium bg-primary/5 text-primary border-primary/20">
                            {course.level}
                          </Badge>
                          <Badge variant="outline" className="font-medium bg-accent/5 text-accent border-accent/20">
                            {course.study_area}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="flex items-center p-2 bg-muted rounded-lg">
                            <span className="font-medium text-card-foreground">{course.duration_months} months</span>
                          </div>
                        </div>

                        {(course.tuition_fee_min || course.tuition_fee_max) && (
                          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-4 rounded-xl border border-primary/10">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm text-muted-foreground font-medium">Tuition Fee</div>
                                <div className="font-bold text-lg text-primary">
                                  {course.currency} {course.tuition_fee_min?.toLocaleString()}
                                  {course.tuition_fee_max && course.tuition_fee_max !== course.tuition_fee_min && (
                                    <span> - {course.tuition_fee_max?.toLocaleString()}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3 pt-2 pb-6">
                          <Link to={`/courses/${course.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full h-11 font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-16">
                <Link to="/courses">
                  <Button size="lg" variant="outline" className="px-8">
                    Browse All Programs
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="bg-secondary rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">No Programs Available</h3>
                <p className="text-muted-foreground mb-8">
                  This university doesn't have any programs listed yet. Check back later or contact us for more information.
                </p>
                <Link to="/contact">
                  <Button size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};