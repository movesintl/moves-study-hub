import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Webstories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories = [
    {
      id: 1,
      title: "The world is changing",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
      category: "Travel"
    },
    {
      id: 2,
      title: "Technology in Business",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=400&fit=crop",
      category: "Business"
    },
    {
      id: 3,
      title: "Future Stories",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop",
      category: "Technology"
    },
    {
      id: 4,
      title: "New Horizons",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=400&fit=crop",
      category: "Innovation"
    },
    {
      id: 5,
      title: "Creative Journey",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
      category: "Design"
    },
    {
      id: 6,
      title: "Digital World",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop",
      category: "Digital"
    },
    {
      id: 7,
      title: "Modern Life",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=400&fit=crop",
      category: "Lifestyle"
    },
    {
      id: 8,
      title: "Success Stories",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      category: "Success"
    }
  ];

  const itemsPerView = 4;
  const maxIndex = stories.length - itemsPerView;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return maxIndex;
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Web Stories</h2>
        <p className="text-gray-600 mt-2">Explore Visual Stories</p>
      </div>

      <div className="relative overflow-hidden">
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-1/4 px-2"
            >
              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-xs text-white/80 mb-1 font-medium">
                      {story.category}
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-tight">
                      {story.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxIndex + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Webstories;