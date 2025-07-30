import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Badge } from '@/components/ui/badge';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

// Sample reviews data - in a real app, this would come from a database
const sampleReviews = [
  {
    id: '1',
    content: 'Great experience with the team and Specially Disha didi. I am really thankful to the team for guiding me through the entire process of getting admission in my dream university.',
    rating: 5,
    reviewerName: 'Faizan Rafiq',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    content: 'Amazing support throughout my journey. The counselors were extremely helpful and professional. They made my study abroad dream come true!',
    rating: 5,
    reviewerName: 'Priya Sharma',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    content: 'The best consultancy for study abroad. They helped me get into my preferred university in Australia. Highly recommended for all students.',
    rating: 5,
    reviewerName: 'Rohit Kumar',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    content: 'Excellent guidance and support. The team helped me understand all the requirements and processes. Very professional and caring approach.',
    rating: 5,
    reviewerName: 'Sneha Patel',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    content: 'Outstanding service! They made the complex process of studying abroad so simple. Thank you for making my dreams come true.',
    rating: 5,
    reviewerName: 'Arjun Singh',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '6',
    content: 'Professional and dedicated team. They provided excellent guidance from application to visa process. Couldn\'t ask for better support.',
    rating: 5,
    reviewerName: 'Aisha Khan',
    reviewerRole: 'Student',
    reviewerImage: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=150&h=150&fit=crop&crop=face'
  }
];

const Reviews = () => {
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
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-slate-600">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</div>
              <div className="text-slate-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
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