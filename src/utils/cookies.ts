// Cookie utility functions
export interface CookieOptions {
  expires?: Date;
  maxAge?: number; // in seconds
  domain?: string;
  path?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
): void => {
  const {
    expires,
    maxAge,
    domain,
    path = '/',
    secure = window.location.protocol === 'https:',
    sameSite = 'lax',
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (maxAge !== undefined) {
    cookieString += `; max-age=${maxAge}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  cookieString += `; path=${path}`;

  if (secure) {
    cookieString += '; secure';
  }

  cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }

  return null;
};

export const deleteCookie = (
  name: string,
  options: Omit<CookieOptions, 'expires' | 'maxAge'> = {}
): void => {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
};

export const getAllCookies = (): Record<string, string> => {
  const cookies: Record<string, string> = {};
  
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  });

  return cookies;
};

// Cookie categories for consent management
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  FUNCTIONAL: 'functional',
} as const;

export type CookieCategory = typeof COOKIE_CATEGORIES[keyof typeof COOKIE_CATEGORIES];

// Helper to check if a specific cookie category is consented
export const isCookieCategoryConsented = (category: CookieCategory): boolean => {
  try {
    const preferences = localStorage.getItem('cookie-preferences');
    if (!preferences) return category === COOKIE_CATEGORIES.NECESSARY;
    
    const parsed = JSON.parse(preferences);
    return parsed[category] === true;
  } catch {
    return category === COOKIE_CATEGORIES.NECESSARY;
  }
};

// Helper to set cookies only if consent is given
export const setConsentedCookie = (
  name: string,
  value: string,
  category: CookieCategory,
  options: CookieOptions = {}
): boolean => {
  if (isCookieCategoryConsented(category)) {
    setCookie(name, value, options);
    return true;
  }
  return false;
};