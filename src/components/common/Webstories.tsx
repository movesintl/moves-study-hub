import React, { useState, useEffect } from 'react';
import { BookImage, } from 'lucide-react';

const Webstories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

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
      title: "Entrepreneurial Spirit",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=300&h=400&fit=crop",
      category: "Startups"
    },
    {
      id: 9,
      title: "Financial Freedom",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop",
      category: "Finance"
    },
    {
      id: 10,
      title: "Artistic Expressions",
      image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=300&h=400&fit=crop",
      category: "Art"
    },
  ];

  // Calculate max index based on current itemsPerView
  const maxIndex = Math.max(stories.length - itemsPerView, 0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(2);
      } else if (width < 768) {
        setItemsPerView(2);
      } else if (width < 1024) {
        setItemsPerView(3);
      } else if (width < 1280) {
        setItemsPerView(4);
      } else if (width < 1536) {
        setItemsPerView(6);
      } else {
        setItemsPerView(8);
      }
      
      setCurrentIndex(prev => Math.min(prev, Math.max(stories.length - itemsPerView, 0)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView, stories.length]);

  // Auto-rotate stories
  useEffect(() => {
    if (maxIndex <= 0) return;
    
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

  const cardWidth = `${100 / itemsPerView}%`;

  return (
    <div className="w-full mx-auto px-4 py-8 max-w-12xl">
      <div className="text-center mb-6">
        <div className="inline-flex items-center w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
        <BookImage className="w-4 h-4 mr-2" />
        Our Stories
      </div>
        <h2 className="text-4xl font-bold text-primary">Web Stories</h2>
        <p className="text-gray-600 mt-2">Explore Visual Stories</p>
      </div>

      <div className="relative overflow-hidden">
        
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="flex-shrink-0 px-2"
              style={{ width: cardWidth }}
            >
              <div className="relative group cursor-pointer h-full">
                <div className="relative overflow-hidden rounded-lg shadow-lg h-full">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-64 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-xs text-white/90 mb-1 font-medium uppercase tracking-wider">
                        {story.category}
                      </div>
                      <h3 className="text-white font-semibold text-lg leading-snug">
                        {story.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration 300 ${
                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Webstories;