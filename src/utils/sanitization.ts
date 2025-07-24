/**
 * Basic input sanitization utilities
 */

// Remove potentially dangerous HTML tags and attributes
export const sanitizeHtml = (input: string): string => {
  if (!input) return '';
  
  // Remove script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove dangerous attributes
  sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, ''); // Remove event handlers like onclick
  sanitized = sanitized.replace(/javascript:/gi, ''); // Remove javascript: URLs
  sanitized = sanitized.replace(/data:/gi, ''); // Remove data: URLs
  
  return sanitized.trim();
};

// Sanitize text input by removing HTML tags completely
export const sanitizeText = (input: string): string => {
  if (!input) return '';
  
  // Remove all HTML tags
  return input.replace(/<[^>]*>/g, '').trim();
};

// Sanitize URL input
export const sanitizeUrl = (input: string): string => {
  if (!input) return '';
  
  // Only allow http, https, and relative URLs
  const urlPattern = /^(https?:\/\/|\/)/i;
  if (!urlPattern.test(input)) {
    return '';
  }
  
  // Remove dangerous protocols
  return input.replace(/javascript:|data:|vbscript:/gi, '');
};

// Validate and sanitize email
export const sanitizeEmail = (input: string): string => {
  if (!input) return '';
  
  // Basic email validation and sanitization
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const sanitized = input.trim().toLowerCase();
  
  return emailPattern.test(sanitized) ? sanitized : '';
};