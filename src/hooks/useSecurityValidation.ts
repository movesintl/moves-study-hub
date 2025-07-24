import { useState, useCallback } from 'react';
import { sanitizeText, sanitizeEmail, sanitizeUrl } from '@/utils/sanitization';
import { useRateLimit } from './useRateLimit';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  type?: 'email' | 'phone' | 'url' | 'text';
  allowedValues?: string[];
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue?: string;
}

export const useSecurityValidation = () => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { checkRateLimit } = useRateLimit();

  const validateField = useCallback((
    fieldName: string,
    value: string,
    rules: ValidationRules
  ): ValidationResult => {
    // Sanitize input based on type
    let sanitizedValue = value;
    switch (rules.type) {
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'url':
        sanitizedValue = sanitizeUrl(value);
        break;
      case 'text':
      default:
        sanitizedValue = sanitizeText(value);
        break;
    }

    // Required field validation
    if (rules.required && !sanitizedValue.trim()) {
      return {
        isValid: false,
        error: `${fieldName} is required`,
        sanitizedValue
      };
    }

    // Length validations
    if (rules.minLength && sanitizedValue.length < rules.minLength) {
      return {
        isValid: false,
        error: `${fieldName} must be at least ${rules.minLength} characters`,
        sanitizedValue
      };
    }

    if (rules.maxLength && sanitizedValue.length > rules.maxLength) {
      return {
        isValid: false,
        error: `${fieldName} must not exceed ${rules.maxLength} characters`,
        sanitizedValue
      };
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(sanitizedValue)) {
      return {
        isValid: false,
        error: `${fieldName} format is invalid`,
        sanitizedValue
      };
    }

    // Email specific validation
    if (rules.type === 'email' && sanitizedValue && !sanitizedValue.includes('@')) {
      return {
        isValid: false,
        error: 'Please enter a valid email address',
        sanitizedValue
      };
    }

    // Phone validation
    if (rules.type === 'phone' && sanitizedValue) {
      const phonePattern = /^\+?[\d\s\-\(\)]{10,}$/;
      if (!phonePattern.test(sanitizedValue)) {
        return {
          isValid: false,
          error: 'Please enter a valid phone number',
          sanitizedValue
        };
      }
    }

    // Allowed values validation
    if (rules.allowedValues && !rules.allowedValues.includes(sanitizedValue)) {
      return {
        isValid: false,
        error: `${fieldName} contains invalid value`,
        sanitizedValue
      };
    }

    return {
      isValid: true,
      sanitizedValue
    };
  }, []);

  const validateForm = useCallback((
    formData: Record<string, string>,
    validationRules: Record<string, ValidationRules>
  ): { isValid: boolean; errors: Record<string, string>; sanitizedData: Record<string, string> } => {
    const errors: Record<string, string> = {};
    const sanitizedData: Record<string, string> = {};

    Object.entries(formData).forEach(([fieldName, value]) => {
      const rules = validationRules[fieldName];
      if (rules) {
        const result = validateField(fieldName, value, rules);
        if (!result.isValid && result.error) {
          errors[fieldName] = result.error;
        }
        sanitizedData[fieldName] = result.sanitizedValue || '';
      } else {
        // Default sanitization for fields without specific rules
        sanitizedData[fieldName] = sanitizeText(value);
      }
    });

    setValidationErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      sanitizedData
    };
  }, [validateField]);

  const checkFormRateLimit = useCallback(async (formType: string): Promise<boolean> => {
    return await checkRateLimit({
      action: `form_submit_${formType}`,
      maxRequests: 5,
      windowMinutes: 15
    });
  }, [checkRateLimit]);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  return {
    validateField,
    validateForm,
    checkFormRateLimit,
    validationErrors,
    clearValidationErrors
  };
};