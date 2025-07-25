import { Mail, Phone } from 'lucide-react'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

const CEOMsg = () => {
  // Fetch CEO information from database
  const { data: ceoData } = useQuery({
    queryKey: ['ceo-info'],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['ceo_name', 'ceo_position', 'ceo_phone', 'ceo_email', 'ceo_message', 'ceo_image_url']);
      
      return data?.reduce((acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {} as Record<string, any>) || {};
    }
  });

  return (
    <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Left Column - Image with Contact Badge */}
      <div className="relative w-[600px] h-[400px]">
        <img 
          src={ceoData?.ceo_image_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=700&fit=crop"} 
          alt="CEO of Moves International" 
          className="w-full h-full object-cover rounded-2xl shadow-xl"
        />
        
        {/* Contact Badge */}
        <div className="max-w-[292px]  flex flex-col gap-[18px] px-[30px] py-[15px] bg-white shadow-[0_20px_40px_-15px_rgba(2,48,71,0.06)] rounded-2xl absolute right-0 bottom-[28px]">
          <div className="space-y-2">
            <h4 className="text-xl font-bold text-primary">{ceoData?.ceo_name || 'Shakil Shikdar'}</h4>
            <p className="text-sm text-gray-600">{ceoData?.ceo_position || 'CEO at Moves International'}</p>
          </div>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600">{ceoData?.ceo_phone || '+61 434 051 189'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-gray-600">{ceoData?.ceo_email || 'shakil@mieducation.com.au'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - CEO Message */}
      <div className="space-y-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary">
          Message From Our CEO
        </h2>
        
        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
          {ceoData?.ceo_message ? (
            <div dangerouslySetInnerHTML={{ __html: ceoData.ceo_message }} />
          ) : (
            <>
              <p>
                I started this for all those who dream of studying or migrating to beautiful Australia. 
                Therefore, we have started building a strong bond with so many Australian universities 
                for a long time.
              </p>
              <p>
                The purpose is to ensure the right info with the interested candidates, 
                turn their dream into reality, and ultimately allow them to reach their 
                future goals in Australia.
              </p>
              <p>
                If your visa is expired, you will need to wait for the arrival of the new 
                visa before entering Australia. Call us for any further queries.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default CEOMsg
