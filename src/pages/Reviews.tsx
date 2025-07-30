import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  content: string;
  rating: number;
  reviewer_name: string;
  reviewer_role: string;
  reviewer_image_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
  created_at?: string;
  updated_at?: string;
}
const Reviews = () => {
  // Fetch reviews from database
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async (): Promise<Review[]> => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '5.0';
  const featuredReviews = reviews.filter(review => review.is_featured);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
          <p className="text-slate-600">We couldn't load the reviews. Please try again later.</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Student Reviews & Testimonials | Moves International</title>
        <meta name="description" content="Read genuine reviews and testimonials from our students who successfully pursued their study abroad dreams with Moves International." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 bg-white/70 backdrop-blur-sm border-indigo-200/50">
            Student Testimonials
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
            What Our Students Say
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Discover genuine stories from students who achieved their study abroad dreams with our guidance and support.
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{totalReviews}+</div>
              <div className="text-slate-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{averageRating}/5</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard 
                key={review.id} 
                review={{
                  id: review.id,
                  content: review.content,
                  rating: review.rating,
                  reviewerName: review.reviewer_name,
                  reviewerRole: review.reviewer_role,
                  reviewerImage: review.reviewer_image_url
                }} 
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                Join thousands of successful students who trusted us with their study abroad dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/consultation" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Free Consultation
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </>
  );
};

export default Reviews;