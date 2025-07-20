import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

export default function OtherServicesSection() {
  const [services, setServices] = useState([]);
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

  const getServiceTag = (slug) => {
    const tags = {
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Other Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">Other Services</h2>
      
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
          onClick={() => window.location.href = `/services/${service.slug}`}
            key={service.id}
            className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative h-80">
              <img
                src={service.icon_url}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              
              {/* Normal gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
              
              {/* Orange gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Service tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-black/55  px-3 py-1 rounded-full text-sm font-medium">
                  {getServiceTag(service.slug)}
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-3 leading-tight">
                  {service.title}
                </h3>
                
                <button onClick={() => window.location.href = `/services/${service.slug}`} className="flex items-center text-white font-medium group-hover:text-orange-100 transition-colors duration-200">
                  Read More
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
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
  );
}