import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: {
    id: string;
    content: string;
    rating: number;
    reviewerName: string;
    reviewerRole: string;
    reviewerImage?: string;
  };
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating 
            ? 'fill-orange-400 text-orange-400' 
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 h-full">
      {/* Review Content */}
      <div className="mb-8">
        <p className="text-slate-700 text-lg leading-relaxed font-medium">
          {review.content}
        </p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-1 bg-orange-50 px-4 py-2 rounded-full">
          {renderStars(review.rating)}
        </div>
      </div>

      {/* Reviewer Info */}
      <div className="text-center">
        {review.reviewerImage && (
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
            <img 
              src={review.reviewerImage} 
              alt={review.reviewerName}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <h4 className="text-xl font-bold text-slate-900 mb-1">
          {review.reviewerName}
        </h4>
        <p className="text-slate-600 font-medium">
          {review.reviewerRole}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;