import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_PREFERENCES_KEY = 'cookie-preferences';

export const useCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        try {
          setPreferences(JSON.parse(savedPreferences));
        } catch (error) {
          console.error('Error parsing cookie preferences:', error);
        }
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    setPreferences(allAccepted);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(allAccepted));
    setShowBanner(false);
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      initializeAnalytics();
    }
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    setPreferences(necessaryOnly);
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(necessaryOnly));
    setShowBanner(false);
  };

  const updatePreferences = (newPreferences: CookiePreferences) => {
    const updatedPreferences = { ...newPreferences, necessary: true };
    setPreferences(updatedPreferences);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
    
    // Handle analytics initialization/cleanup
    if (updatedPreferences.analytics && !preferences.analytics) {
      initializeAnalytics();
    } else if (!updatedPreferences.analytics && preferences.analytics) {
      cleanupAnalytics();
    }
  };

  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_PREFERENCES_KEY);
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
    setShowBanner(true);
    cleanupAnalytics();
  };

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other analytics tools here
    console.log('Analytics initialized');
  };

  const cleanupAnalytics = () => {
    // Cleanup analytics cookies and disable tracking
    console.log('Analytics cleaned up');
  };

  return {
    showBanner,
    preferences,
    acceptAll,
    acceptNecessary,
    updatePreferences,
    resetConsent,
    setShowBanner,
  };
};