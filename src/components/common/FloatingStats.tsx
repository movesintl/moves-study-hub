import { MapPin } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const FloatingStats = () => {
  // Fetch address information from database
  const { data: addressData } = useQuery({
    queryKey: ['company-address'],
    queryFn: async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('key, value')
        .eq('key', 'company_address')
        .single();
      
      return (data?.value as string) || 'Sydney and Brisbane, Australia';
    }
  });

  return (
    <div className="relative z-10 -mt-16 mb-0">
      {/* Background section that goes behind the floating card */}
      <div className="bg-[#fcfcfc] absolute inset-0 top-16 bottom-0"></div>
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-[#FA8500] rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex justify-center items-center">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <MapPin className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <div className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                Address
              </div>
              <div className="text-sm md:text-base text-white/90 font-medium">
                {addressData}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingStats;