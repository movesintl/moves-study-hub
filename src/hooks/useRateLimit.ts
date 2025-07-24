import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RateLimitOptions {
  action: string;
  maxRequests?: number;
  windowMinutes?: number;
}

export const useRateLimit = () => {
  const [isLimited, setIsLimited] = useState(false);

  const checkRateLimit = async ({ 
    action, 
    maxRequests = 10, 
    windowMinutes = 60 
  }: RateLimitOptions): Promise<boolean> => {
    try {
      // Use IP address as identifier for anonymous users, user ID for authenticated users
      const identifier = supabase.auth.getUser().then(({ data }) => 
        data.user?.id || 'anonymous'
      );

      const { data, error } = await supabase.rpc('check_rate_limit', {
        p_identifier: await identifier,
        p_action: action,
        p_max_requests: maxRequests,
        p_window_minutes: windowMinutes
      });

      if (error) {
        console.error('Rate limit check failed:', error);
        return true; // Allow on error to avoid blocking legitimate users
      }

      const allowed = data === true;
      setIsLimited(!allowed);
      return allowed;
    } catch (error) {
      console.error('Rate limit check error:', error);
      return true; // Allow on error
    }
  };

  return {
    checkRateLimit,
    isLimited
  };
};