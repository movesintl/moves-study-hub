import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title: string;
  icon_url: string;
  slug: string;
}

const ServicesWorksLayout = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('id, title, icon_url, slug')
          .limit(6);
        
        if (error) {
          console.error('Error fetching services:', error);
        } else {
          setServices(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  const getServiceTag = (slug: string) => {
    const tags: Record<string, string> = {
      'rpl': 'RPL',
      'pyp': 'PYP',
      'student-visa-extension': 'Student Visa Extension',
      'university-admission': 'University Admission',
      'migration': 'Migration',
      'oshc-ovhc': 'OSHC & OVHC'
    };
    return tags[slug] || slug.toUpperCase();
  };

  if (isLoading) {
    return (
      <section className="py-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 relative">
          {/* Left Column - Loading */}
          <div className="absolute left-0 top-0 w-full h-full flex flex-col p-5 max-w-[340px]">
            <div className="p-4 lg:p-[30px] border border-dashed rounded-md self-start lg:sticky top-[140px] space-y-6 bg-white">
              <div className="bg-gray-200 animate-pulse h-8 w-3/4 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-5/6 rounded"></div>
              <div className="bg-gray-200 animate-pulse h-4 w-2/3 rounded"></div>
            </div>
          </div>

          {/* Right Column - Loading Cards */}
          <div className="ml-[360px] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 relative">
        {/* Left Column - Title and Description */}
        <div className="absolute left-0 top-0 w-full h-full flex flex-col p-5 max-w-[340px]">
          <div className="p-4 lg:p-[30px] border border-dashed rounded-md self-start lg:sticky top-[140px] bg-white">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-4xl font-bold text-primary  mb-[22px]">
                Our Comprehensive Services
              </h2>
              <p className='text-lg mb-0'>

                We offer a wide range of services to help you achieve your educational and migration goals in Australia.
            
                Each service is designed to provide expert guidance throughout your journey.
           
                Explore our services to find your perfect solution.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Service Cards */}
        <div className="ml-[360px] grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {services.map((service) => (
            <div
              onClick={() => window.location.href = `/services/${service.slug}`}
              key={service.id}
              className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-80">
                <img
                  src={service.icon_url}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Normal gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
                
                {/* Orange gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Service tag */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-black/55 px-3 py-1 rounded-full text-xs font-medium">
                    {getServiceTag(service.slug)}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold mb-2 leading-tight">
                    {service.title}
                  </h3>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/services/${service.slug}`;
                    }} 
                    className="flex items-center text-white text-sm font-medium group-hover:text-orange-100 transition-colors duration-200"
                  >
                    Read More
                    <svg 
                      className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesWorksLayout;