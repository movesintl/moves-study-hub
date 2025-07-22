import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Heart, MapPin, Clock, Calendar, GraduationCap, University, ChevronUp, DollarSign, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PopularCoursesLoading from './popular-courses/PopularCoursesLoading';
import PopularCoursesHeader from './popular-courses/PopularCoursesHeader';
import PopularCoursesEmpty from './popular-courses/PopularCoursesEmpty';
import PopularCoursesAction from './popular-courses/PopularCoursesAction';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
  study_area: string;
  level: string;
  duration_months: number;
  tuition_fee?: number;
  currency?: string;
  thumbnail_url?: string;
  featured?: boolean;
  description?: string;
  intake_dates?: string[];
  eligibility?: string;
  requirements?: string;
  image_url?: string;
  slug?: string;
  university_logo_url?: string;
}

const PopularCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedCourseIds, setSavedCourseIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [expandedFees, setExpandedFees] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Add carousel API state to track current slide
  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    fetchPopularCourses();
  }, []);

  // Fetch saved courses - only if user is logged in
  const { data: savedCourses, refetch: refetchSaved } = useQuery({
    queryKey: ['saved-courses-ids', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('saved_courses')
        .select('course_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.map(item => item.course_id);
    },
    enabled: !!user?.id
  });

  useEffect(() => {
    if (savedCourses) {
      setSavedCourseIds(new Set(savedCourses));
    }
  }, [savedCourses]);

  // Effect to track carousel API changes and update currentIndex
  useEffect(() => {
  if (!carouselApi) return;

  const onSelect = () => {
    setCurrentIndex(carouselApi.selectedScrollSnap());
  };

  // Listen to select and scroll end
  carouselApi.on("select", onSelect);
  carouselApi.on("settle", onSelect); // settle = when animation finishes

  onSelect(); // Initial update

  return () => {
    carouselApi.off("select", onSelect);
    carouselApi.off("settle", onSelect);
  };
}, [carouselApi]);


  const fetchPopularCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities:university_id (
            logo_url
          )
        `)
        .eq('featured', true)
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to include university logo
      const coursesWithLogos = data?.map(course => ({
        ...course,
        university_logo_url: course.universities?.logo_url
      })) || [];

      setCourses(coursesWithLogos);
    } catch (error) {
      console.error('Error fetching popular courses:', error);
      toast({
        title: "Error",
        description: "Failed to load popular courses.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (courseSlug: string) => {
    navigate(`/courses/${courseSlug}`);
  };

  const handleApplyNow = () => {
    navigate('/student-dashboard/applications');
  };



  const handleSaveToggle = async (courseId: string) => {
    if (!user?.id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save courses.",
        variant: "destructive"
      });
      return;
    }

    const isSaved = savedCourseIds.has(courseId);

    if (isSaved) {
      const { error } = await supabase
        .from('saved_courses')
        .delete()
        .eq('course_id', courseId)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove course from saved list",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(courseId);
          return newSet;
        });
        toast({
          title: "Success",
          description: "Course removed from saved list"
        });
        refetchSaved();
      }
    } else {
      const { error } = await supabase
        .from('saved_courses')
        .insert({
          course_id: courseId,
          user_id: user.id
        });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to save course",
          variant: "destructive"
        });
      } else {
        setSavedCourseIds(prev => new Set(prev).add(courseId));
        toast({
          title: "Success",
          description: "Course saved successfully"
        });
        refetchSaved();
      }
    }
  };

  if (loading) {
    return <PopularCoursesLoading />;
  }

  const toggleFeeExpansion = (courseId: string) => {
    setExpandedFees(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return newSet;
    });
  };

  // Function to go to specific slide (same as CountryCards)
  const goToSlide = (index: number) => {
    if (carouselApi && index !== currentIndex) {
      carouselApi.scrollTo(index);
    }
  };

  // Calculate total number of slides based on items per view
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(courses.length / itemsPerView);

  return (
    <>
    <section className="pt-20 pb-6 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PopularCoursesHeader />

        {courses.length > 0 ? (
          <>
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              setApi={setCarouselApi}
            >
              <CarouselContent className="-ml-4 py-4">
                {courses.map((course) => (
                  <CarouselItem key={course.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                    <div className="h-full rounded-3xl">
                      <Card className="group relative overflow-hidden bg-white border-0 shadow-md transition-all duration-500 hover:-translate-y-1 rounded-2xl h-full">
                        {/* Image Section */}
                        <div className="relative h-12 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                          <img
                            src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/all/placeholder_image.jpg"
                            alt={course.title}
                            className="w-full h-16 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 space-y-4">
                          {/* Badge */}
                          <div className="absolute flex items-center gap-4 drop-shadow-sm top-3 mt-5 left-0 bg-white rounded-tr-lg rounded-br-lg rounded-tl-none rounded-bl-none p-6 py-2 shadow-sm">
                            {course.university_logo_url ? (
                              <img
                                src={course.university_logo_url}
                                alt={`${course.university} logo`}
                                className='w-full h-8 object-cover'
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <GraduationCap className="h-4 w-4 text-gray-500" />
                              </div>
                            )}
                          </div>

                          {/* Save Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`absolute top-3 mt-5 right-8 z-20 bg-white/90 backdrop-blur-sm hover:bg-white shadow-md rounded-full h-12 w-12 p-0 border-0 transition-all duration-300 hover:scale-110 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                            onClick={() => handleSaveToggle(course.id)}
                          >
                            <Heart className={`transition-all duration-300 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
                          </Button>

                          {/* Title and University */}
                          <div className="space-y-2">
                            <h3 className="text-lg mt-8 font-bold text-gray-900 underline cursor-pointer line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
                              {course.title}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <University className="h-3.5 mb-1 w-3.5 mr-1.5 text-gray-400" />
                              <span className="text-sm font-medium truncate">{course.university}</span>
                              <span className='text-gray-500 mx-2'>|</span>
                              <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                              <span className="text-gray-700 text-sm font-medium">{course.country}</span>
                            </div>
                          </div>

                          {/* Description */}
                          {course.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                              {course.description}
                            </p>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs font-medium bg-green-50 text-green-500 border-green-200 px-2.5 py-0.5">
                              {course.level}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-medium bg-pink-50 text-pink-500 border-pink-200 px-2.5 py-0.5">
                              {course.study_area}
                            </Badge>
                          </div>

                          <div className="mb-2 border-b-2 bg-black"></div>

                          {/* Course Details */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Duration</span>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{course.duration_months === 12 ? '1 year' : course.duration_months % 12 === 0 ? `${course.duration_months / 12} years` : `${course.duration_months} months`}</span>
                            </div>

                            {course.intake_dates && course.intake_dates.length > 0 && (
                              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                  <span className="text-sm font-medium text-gray-700">Intakes</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 truncate ml-2">
                                  {course.intake_dates.join(', ')}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Tuition Fee View More button - shown when collapsed */}
                          {!expandedFees.has(course.id) && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 font-medium text-sm text-orange-600 hover:text-orange-600 hover:bg-transparent"
                              onClick={() => toggleFeeExpansion(course.id)}
                            >
                              View More <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          )}

                          {/* Tuition Fee section - shown only when expanded */}
                          {expandedFees.has(course.id) && (
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="text-xs text-gray-600 font-medium mb-1">Tuition Fee</div>
                                  <div className="font-bold text-lg text-primary">
                                    {course.tuition_fee && course.currency
                                      ? `${course.currency} ${course.tuition_fee.toLocaleString()}`
                                      : 'Contact for fee'}
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-xs text-primary hover:bg-transparent hover:cursor-pointer hover:text-primary"
                                    onClick={() => toggleFeeExpansion(course.id)}
                                    >
                                    Show Less <ChevronUp className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                                <div className="bg-indigo-100 p-2.5 rounded-full">
                                  <DollarSign className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              variant="outline"
                              className="flex-1 h-11 font-semibold border-2 hover:bg-orange-500 hover:border-2 border-orange-500 text-orange-500 hover:text-white transition-all duration-100"
                              onClick={() => handleViewDetails(course.slug || '')}
                            >
                              View Details
                            </Button>
                            <Button
                              className="flex-1 from-primary hover:bg-orange-500 text-white font-semibold h-11 shadow-lg hover:shadow-xl transition-all duration-300"
                              onClick={handleApplyNow}
                            >
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className=" hidden md:flex -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full  items-center justify-center text-gray-500 hover:bg-white hover:text-gray-500 z-30 shadow-md transition-all duration-300 hover:scale-110" />
              <CarouselNext className="hidden md:flex w-10 h-10 -translate-y-1/2 bg-white/80 rounded-full  items-center justify-center text-gray-500 hover:bg-white z-30  hover:text-gray-500 shadow-md transition-all duration-300 hover:scale-110" />
              
            </Carousel>
              <div className="mt-4 mb-0 flex justify-center items-center space-x-3 z-30">
                {Array.from({ length: totalSlides }, (_, idx) => (
                  <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-primary/90 w-5' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
              </div>
          </div>
              
                  </>
        ) : (
          <PopularCoursesEmpty />
        )}

      </div>
    </section>
    </>
  );
};

export default PopularCourses;