import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Heart, MapPin, Clock, Calendar, GraduationCap, University, ChevronUp, DollarSign, ChevronDown, Sparkles, Star } from 'lucide-react';
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

interface CountryProps {
  country?: string
}

const PopularCourses = ({ country }: CountryProps) => {
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
      let query =  supabase
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
      if (country) {
        query = query.eq('country', country);
      }
      const { data, error } = await query;
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
      <section className="pt-20 pb-6 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#023047]/10 to-[#fa8500]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#fa8500]/10 to-[#023047]/10 rounded-full blur-xl"></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  <CarouselContent className="-ml-6 py-4">
                    {courses.map((course) => (
                      <CarouselItem key={course.id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3">
                        <div className="h-full">
                          <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 rounded-xl h-full">
                            {/* Gradient overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-black/5 pointer-events-none"></div>

                            {/* Featured badge */}
                            {course.featured && (
                              <div className="absolute top-2 left-2 z-20">
                                <div className="flex items-center gap-1 bg-gradient-to-r from-[#fa8500] to-[#023047] text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
                                  <Sparkles className="h-2.5 w-2.5" />
                                  Featured
                                </div>
                              </div>
                            )}


                            {/* Image Section with reduced height */}
                            <div className="relative h-28 bg-gradient-to-br from-slate-100 via-[#023047]/5 to-[#fa8500]/10 overflow-hidden">
                              <img
                                src="https://coadhiipbnnqlmslpzeu.supabase.co/storage/v1/object/public/media/all/placeholder_image.jpg"
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              {/* Gradient overlay on image */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                              {/* University logo with bigger size */}
                              <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                                {course.university_logo_url ? (
                                  <img
                                    src={course.university_logo_url}
                                    alt={`${course.university} logo`}
                                    className='w-28 h-auto object-cover '
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#023047] to-[#fa8500] flex items-center justify-center">
                                    <GraduationCap className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </div>

                              {/* Save Button with compact design */}
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`absolute top-2 right-2 z-20 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg rounded-full h-8 w-8 p-0 border-0 transition-all duration-300 hover:scale-110 ${savedCourseIds.has(course.id) ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                                onClick={() => handleSaveToggle(course.id)}
                              >
                                <Heart className={`h-3.5 w-3.5 transition-all duration-300 ${savedCourseIds.has(course.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>

                            {/* Content Section with reduced spacing */}
                            <div className="p-4 space-y-3 relative z-10">
                              {/* Title and Location */}
                              <div className="space-y-2">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300 cursor-pointer">
                                  {course.title}
                                </h3>
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                  <span className="text-sm font-medium">{course.country}</span>
                                </div>
                              </div>

                              {/* Description - only show if not expanded */}
                              {course.description && !expandedFees.has(course.id) && (
                                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                                  {course.description}
                                </p>
                              )}

                              {/* Compact Badges */}
                              <div className="flex flex-wrap gap-1.5">
                                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white border-0 px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
                                  {course.level}
                                </Badge>
                                <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white border-0 px-2 py-1 text-xs font-semibold rounded-full shadow-sm">
                                  {course.study_area}
                                </Badge>
                              </div>

                              {/* Separator with gradient */}
                              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                              {/* Course Details with compact styling */}
                              <div className="space-y-2">
                                <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
                                      <Clock className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">Duration</span>
                                  </div>
                                  <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm">
                                    {course.duration_months === 12 ? '1 year' : course.duration_months % 12 === 0 ? `${course.duration_months / 12} years` : `${course.duration_months} months`}
                                  </span>
                                </div>

                                {course.intake_dates && course.intake_dates.length > 0 && (
                                  <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-md flex items-center justify-center">
                                        <Calendar className="h-3 w-3 text-white" />
                                      </div>
                                      <span className="text-sm font-medium text-gray-700">Intakes</span>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 bg-white px-2 py-0.5 rounded-md shadow-sm truncate ml-2">
                                      {course.intake_dates.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Compact View More button */}
                              {!expandedFees.has(course.id) && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-auto p-1.5 font-semibold text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
                                  onClick={() => toggleFeeExpansion(course.id)}
                                >
                                  View Pricing <ChevronDown className="h-3.5 w-3.5 ml-1" />
                                </Button>
                              )}

                              {/* Compact Tuition Fee section */}
                              {expandedFees.has(course.id) && (
                                <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-3 rounded-xl border border-indigo-100 shadow-sm">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-1.5 mb-1">
                                        <Star className="h-3.5 w-3.5 text-indigo-500" />
                                        <span className="text-sm text-indigo-600 font-semibold">Tuition Fee</span>
                                      </div>
                                      <div className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        {course.tuition_fee && course.currency
                                          ? `${course.currency} ${course.tuition_fee.toLocaleString()}`
                                          : 'Contact for pricing'}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0.5 mt-1 text-xs text-indigo-600 hover:bg-transparent hover:text-indigo-700"
                                        onClick={() => toggleFeeExpansion(course.id)}
                                      >
                                        Show Less <ChevronUp className="h-3 w-3 ml-1" />
                                      </Button>
                                    </div>
                                    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-xl shadow-lg">
                                      <DollarSign className="h-5 w-5 text-white" />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Compact Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                <Button
                                  variant="outline"
                                  className="flex-1 h-10 font-semibold border-2 border-orange-200 text-orange-600 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
                                  onClick={() => handleViewDetails(course.slug || '')}
                                >
                                  View Details
                                </Button>
                                <Button
                                  className="flex-1 h-10 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
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

                  {/* Enhanced navigation buttons */}
                  <CarouselPrevious className="hidden md:flex -left-6 w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all text-primary hover:text-primary duration-300 hover:scale-110" />
                  <CarouselNext className="hidden md:flex -right-6 w-12 h-12 bg-white/90 backdrop-blur-sm border-2 border-white rounded-2xl shadow-xl hover:bg-white hover:shadow-2xl transition-all 
                  text-primary hover:text-primary duration-300 hover:scale-110" />
                </Carousel>

                {/* Enhanced pagination dots */}
                <div className="mt-8 flex justify-center items-center space-x-2">
                  {Array.from({ length: totalSlides }, (_, idx) => (
                    <button
                      key={idx}
                      className={`transition-all duration-300 rounded-full ${currentIndex === idx
                          ? 'w-8 h-3 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg'
                          : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 shadow-sm hover:shadow-md'
                        }`}
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