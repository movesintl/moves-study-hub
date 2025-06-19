
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      country: 'Australia',
      university: 'University of Melbourne',
      course: 'Master of Data Science',
      image: '/placeholder.svg',
      rating: 5,
      text: "Moves International made my dream of studying in Australia a reality. Their team guided me through every step of the application process and helped me secure a scholarship. I couldn't have done it without their expertise and support."
    },
    {
      id: 2,
      name: 'Raj Patel',
      country: 'Canada',
      university: 'University of Toronto',
      course: 'MBA',
      image: '/placeholder.svg',
      rating: 5,
      text: "The visa process seemed overwhelming at first, but the consultants at Moves International simplified everything. They prepared me thoroughly for the visa interview and I got approved on my first attempt."
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      country: 'United Kingdom',
      university: 'Imperial College London',
      course: 'MS in Engineering',
      image: '/placeholder.svg',
      rating: 5,
      text: "Professional, knowledgeable, and genuinely caring - that's how I'd describe the team. They helped me choose the right course and university, and even assisted with accommodation. Highly recommended!"
    },
    {
      id: 4,
      name: 'David Kim',
      country: 'New Zealand',
      university: 'University of Auckland',
      course: 'Bachelor of Computer Science',
      image: '/placeholder.svg',
      rating: 5,
      text: "From course selection to visa approval, everything was handled professionally. The team's expertise in New Zealand's education system was evident. I'm now enjoying my studies in beautiful Auckland."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who have successfully started their international education journey with our guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="h-8 w-8 text-accent/20" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Student Info */}
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.course}</p>
                  <p className="text-sm text-accent font-medium">
                    {testimonial.university}, {testimonial.country}
                  </p>
                </div>
              </div>

              {/* Flag indicator */}
              <div className="absolute bottom-6 right-6">
                <div className="text-2xl opacity-30">
                  {testimonial.country === 'Australia' && '🇦🇺'}
                  {testimonial.country === 'Canada' && '🇨🇦'}
                  {testimonial.country === 'United Kingdom' && '🇬🇧'}
                  {testimonial.country === 'New Zealand' && '🇳🇿'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-accent/10 rounded-full px-6 py-3">
            <span className="text-accent font-medium mr-2">Join 10,000+ successful students</span>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-accent/20 border-2 border-white"></div>
              ))}
              <div className="w-8 h-8 rounded-full bg-accent text-white text-xs flex items-center justify-center border-2 border-white font-medium">
                +10k
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
