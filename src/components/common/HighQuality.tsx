import React from 'react';
import { Star } from 'lucide-react';

const HighQuality = () => {
  const testimonials = [
    {
      name: "Fatjon Rella",
      role: "Student",
      text: "Great experience with the team and specially Disha that I am really thankful to the team for guida...",
      rating: 5
    },
    {
      name: "Simran Gandhi",
      role: "Student", 
      text: "I am so grateful that I went to study international for my TR. They were very active and helpful th...",
      rating: 5
    },
    {
      name: "Encekshi Husma",
      role: "Student",
      text: "I can't say enough good things about AEC Student Consultancy! As a high school senior navigating the...",
      rating: 5
    },
    {
      name: "Ali Ahmad Gandhi",
      role: "Student",
      text: "Had a very good counselling session with their agent which provided me with a detailed insight on th...",
      rating: 5
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Left rotated rectangle */}
      <div 
        className="absolute hidden lg:block w-[186px] h-[55px] left-[-22px] top-[88px]"
        style={{
          background: 'linear-gradient(90.02deg, #E57039 3.15%, #F8D7C7 105.66%)',
          transform: 'rotate(-18.78deg)'
        }}
      />
      
      {/* Right rotated rectangle */}
      <div 
        className="absolute hidden lg:block w-[186px] h-[55px] right-[100px] top-[114px]"
        style={{
          background: 'linear-gradient(90.02deg, #E57039 3.15%, #F8D7C7 105.66%)',
          transform: 'rotate(157.57deg)'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Title and description */}
          <div className="space-y-6">
            <div className="text-sm text-black ml-4 font-medium bg-gray-200 rounded-full px-4 py-1 inline-block mb-4">
              Rated 4.9 Stars
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              High Quality &<br />
              Prestigious Brands
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Acclaimed services combined with a large 
              experience and fast performance.
            </p>
            
            <button className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-4">
              View all reviews
            </button>
          </div>
          
          {/* Right side - Testimonials 2x2 layout */}
          <div className="space-y-6">
            {/* Top row - 2 testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <StarRating rating={testimonial.rating} />
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom row - 2 testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.slice(2, 4).map((testimonial, index) => (
                <div 
                  key={index + 2}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <StarRating rating={testimonial.rating} />
                  
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {testimonial.text}
                  </p>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* View All button */}
        <div className="flex justify-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighQuality;