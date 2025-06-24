
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Plane, Users, DollarSign, GraduationCap, Briefcase, Heart, CheckCircle, Star, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const DestinationDetails = () => {
  const { id } = useParams();

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const { data: universities = [] } = useQuery({
    queryKey: ['destination-universities', destination?.name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .ilike('location', `%${destination?.name}%`)
        .limit(12);
      
      if (error) throw error;
      return data;
    },
    enabled: !!destination?.name
  });

  const { data: courses = [] } = useQuery({
    queryKey: ['destination-courses', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('destination_id', id)
        .eq('featured', true)
        .limit(8);
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  // Country-specific data
  const getCountrySpecificData = (countryName: string) => {
    const countryData = {
      'Australia': {
        whyStudy: [
          'World-class education system ranked among the top globally',
          'Post-study work visa opportunities up to 4 years',
          'Multicultural and welcoming environment',
          'High standard of living and safety',
          'Research excellence and innovation',
          'Part-time work opportunities during studies'
        ],
        costOfLiving: {
          accommodation: 'AUD $150-400 per week',
          food: 'AUD $80-120 per week',
          transport: 'AUD $30-60 per week',
          utilities: 'AUD $20-50 per week',
          entertainment: 'AUD $50-100 per week'
        },
        jobMarket: [
          'Strong job market with diverse opportunities',
          'High demand for skilled professionals in IT, healthcare, and engineering',
          'Minimum wage: AUD $23.23 per hour',
          'Post-graduation work visa allows 2-4 years of work experience',
          'Growing startup ecosystem in major cities',
          'Excellent work-life balance culture'
        ]
      },
      'Canada': {
        whyStudy: [
          'Affordable tuition fees compared to other English-speaking countries',
          'Excellent post-graduation work permits and immigration pathways',
          'Bilingual environment (English and French)',
          'Safe and peaceful country with low crime rates',
          'Strong research universities and innovation hubs',
          'Healthcare benefits for international students'
        ],
        costOfLiving: {
          accommodation: 'CAD $400-800 per month',
          food: 'CAD $200-400 per month',
          transport: 'CAD $80-120 per month',
          utilities: 'CAD $100-150 per month',
          entertainment: 'CAD $100-200 per month'
        },
        jobMarket: [
          'Strong economy with growing job opportunities',
          'High demand in technology, healthcare, and skilled trades',
          'Federal minimum wage: CAD $17.30 per hour',
          'Express Entry system for permanent residence',
          'Provincial Nominee Programs for specific skills',
          'Excellent benefits and worker protection laws'
        ]
      },
      'United Kingdom': {
        whyStudy: [
          'Home to world-renowned universities like Oxford and Cambridge',
          'Rich academic heritage and research tradition',
          'Shorter degree programs (3-year bachelor\'s, 1-year master\'s)',
          'Gateway to Europe with excellent connectivity',
          'Strong alumni networks globally',
          'Cultural diversity and historical significance'
        ],
        costOfLiving: {
          accommodation: '£400-800 per month',
          food: '£150-250 per month',
          transport: '£50-150 per month',
          utilities: '£80-120 per month',
          entertainment: '£100-200 per month'
        },
        jobMarket: [
          'Strong service sector and financial industry',
          'Growing technology and creative industries',
          'National minimum wage: £11.44 per hour',
          'Graduate visa allows 2-3 years post-study work',
          'London as a global financial hub',
          'Flexible working arrangements increasingly common'
        ]
      },
      'New Zealand': {
        whyStudy: [
          'Innovative and practical education approach',
          'Safe and peaceful environment',
          'Stunning natural landscapes and outdoor lifestyle',
          'English-speaking country with friendly locals',
          'Strong focus on research and development',
          'Easy pathway to permanent residence'
        ],
        costOfLiving: {
          accommodation: 'NZD $150-350 per week',
          food: 'NZD $80-120 per week',
          transport: 'NZD $25-50 per week',
          utilities: 'NZD $30-60 per week',
          entertainment: 'NZD $50-100 per week'
        },
        jobMarket: [
          'Growing economy with skill shortages in many sectors',
          'High demand in agriculture, technology, and tourism',
          'Minimum wage: NZD $23.15 per hour',
          'Post-study work visa up to 3 years',
          'Strong work-life balance culture',
          'Green economy and sustainability focus'
        ]
      }
    };
    return countryData[countryName] || countryData['Australia'];
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Destination not found</h1>
      </div>
    );
  }

  const countryData = getCountrySpecificData(destination.name);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-primary to-primary/80">
        {destination.featured_image_url && (
          <div className="absolute inset-0">
            <img 
              src={destination.featured_image_url} 
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-6 w-6" />
              <span className="text-lg">Study Destination</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{destination.name}</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto py-12 px-4 space-y-16">
        {/* Why Study Here Section */}
        <section>
          <div className="text-center mb-12">
            <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Why Study in {destination.name}?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover the unique advantages and opportunities that make {destination.name} an ideal destination for international students.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryData.whyStudy.map((reason, index) => (
              <Card key={index} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Lifestyle & Culture + Visa Info */}
        <section className="grid lg:grid-cols-2 gap-8">
          {destination.lifestyle_info && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Lifestyle & Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{destination.lifestyle_info}</p>
              </CardContent>
            </Card>
          )}

          {destination.visa_info && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-500" />
                  Visa Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{destination.visa_info}</p>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Cost of Living Section */}
        <section>
          <div className="text-center mb-12">
            <DollarSign className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Cost of Living</h2>
            <p className="text-gray-600">Estimated weekly/monthly expenses for international students</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {Object.entries(countryData.costOfLiving).map(([category, cost]) => (
                  <div key={category} className="text-center">
                    <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold capitalize mb-2">{category}</h3>
                    <p className="text-sm text-gray-600">{cost}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Top Universities Section */}
        {universities.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Top Universities</h2>
              <p className="text-gray-600">Premier educational institutions in {destination.name}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {universities.map((university) => (
                <Card key={university.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    {university.logo_url && (
                      <img 
                        src={university.logo_url} 
                        alt={university.name}
                        className="w-16 h-16 object-contain mx-auto mb-4"
                      />
                    )}
                    <h3 className="font-semibold mb-2">{university.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{university.location}</p>
                    {university.website_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={university.website_url} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Top Courses Section */}
        {courses.length > 0 && (
          <section>
            <div className="text-center mb-12">
              <GraduationCap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Popular Courses</h2>
              <p className="text-gray-600">Featured programs available in {destination.name}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{course.study_area}</Badge>
                      {course.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    </div>
                    <h3 className="font-semibold mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{course.level}</span>
                      <span>{course.duration_months} months</span>
                    </div>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <a href={`/courses/${course.id}`}>View Details</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Job Market Section */}
        <section>
          <div className="text-center mb-12">
            <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Job Market & Career Opportunities</h2>
            <p className="text-gray-600">Employment prospects and career growth in {destination.name}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryData.jobMarket.map((point, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-white p-12 text-center">
          <Phone className="h-16 w-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey to {destination.name}?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert counsellors and take the first step towards your international education dream.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
            Book Free Consultation
          </Button>
        </section>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default DestinationDetails;
