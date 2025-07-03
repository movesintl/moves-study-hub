export interface MarketingConsent {
  id: string;
  student_email: string;
  student_name: string;
  student_phone: string | null;
  consent_date: string;
  is_active: boolean;
  source: string | null;
}