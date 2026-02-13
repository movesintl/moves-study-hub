export interface StudentProfile {
  id: string;
  user_id: string;
  agent_id: string | null;
  status: string;
  submitted_at: string | null;
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  date_of_birth: string | null;
  country_of_birth: string | null;
  nationality: string | null;
  marital_status: string | null;
  has_dependents: boolean | null;
  number_of_dependents: number | null;
  email: string | null;
  phone: string | null;
  alternate_phone: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  postcode: string | null;
  country: string | null;
  passport_number: string | null;
  passport_expiry: string | null;
  passport_issue_country: string | null;
  passport_bio_url: string | null;
  national_id_url: string | null;
  birth_certificate_url: string | null;
  education_history: EducationEntry[];
  english_test_taken: string | null;
  english_test_date: string | null;
  english_overall_score: string | null;
  english_listening: string | null;
  english_reading: string | null;
  english_writing: string | null;
  english_speaking: string | null;
  english_trf_number: string | null;
  english_result_url: string | null;
  applied_australian_visa: boolean | null;
  refused_visa: boolean | null;
  deported: boolean | null;
  current_australian_visa: boolean | null;
  visa_details: string | null;
  preferred_country: string | null;
  preferred_city: string | null;
  preferred_study_level: string | null;
  preferred_course: string | null;
  preferred_intake: string | null;
  has_relatives_australia: boolean | null;
  accommodation_preference: string | null;
  financial_sponsor: string | null;
  sponsor_name: string | null;
  sponsor_relationship: string | null;
  sponsor_occupation: string | null;
  sponsor_income: string | null;
  sponsor_country: string | null;
  emergency_name: string | null;
  emergency_relationship: string | null;
  emergency_phone: string | null;
  emergency_email: string | null;
  emergency_country: string | null;
  documents: DocumentEntry[];
  created_at: string;
  updated_at: string;
}

export interface EducationEntry {
  id: string;
  qualification_level: string;
  course_name: string;
  institution_name: string;
  country: string;
  start_date: string;
  end_date: string;
  completed: boolean;
  certificate_url: string;
}

export interface DocumentEntry {
  id: string;
  category: string;
  label: string;
  url: string;
  name: string;
}

export interface SectionProps {
  data: StudentProfile;
  onSave: (fields: Partial<StudentProfile>) => Promise<void>;
  isLocked: boolean;
  isSaving: boolean;
}

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Bangladesh", "Belgium", "Bhutan", "Bolivia", "Brazil", "Brunei", "Bulgaria",
  "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji", "Finland",
  "France", "Germany", "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait",
  "Laos", "Latvia", "Lebanon", "Libya", "Lithuania", "Luxembourg", "Macau",
  "Malaysia", "Maldives", "Malta", "Mauritius", "Mexico", "Mongolia", "Morocco",
  "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Korea",
  "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore",
  "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tanzania",
  "Thailand", "Trinidad and Tobago", "Tunisia", "Turkey", "UAE", "Uganda",
  "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
].map(c => ({ value: c.toLowerCase(), label: c }));

export const NATIONALITIES = [
  "Afghan", "Albanian", "Algerian", "Argentine", "Australian", "Austrian",
  "Bangladeshi", "Belgian", "Bhutanese", "Bolivian", "Brazilian", "Bruneian", "Bulgarian",
  "Cambodian", "Cameroonian", "Canadian", "Chilean", "Chinese", "Colombian", "Costa Rican",
  "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Dominican",
  "Ecuadorian", "Egyptian", "Salvadoran", "Estonian", "Ethiopian", "Fijian", "Finnish",
  "French", "German", "Ghanaian", "Greek", "Guatemalan", "Honduran", "Hong Konger",
  "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli",
  "Italian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kuwaiti",
  "Laotian", "Latvian", "Lebanese", "Libyan", "Lithuanian", "Luxembourgish",
  "Malaysian", "Maldivian", "Maltese", "Mauritian", "Mexican", "Mongolian", "Moroccan",
  "Myanmar", "Nepalese", "Dutch", "New Zealander", "Nigerian", "North Korean",
  "Norwegian", "Omani", "Pakistani", "Palestinian", "Panamanian", "Papua New Guinean",
  "Paraguayan", "Peruvian", "Filipino", "Polish", "Portuguese", "Qatari", "Romanian",
  "Russian", "Rwandan", "Saudi", "Senegalese", "Serbian", "Singaporean",
  "Slovak", "Slovenian", "Somali", "South African", "South Korean", "Spanish",
  "Sri Lankan", "Sudanese", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tanzanian",
  "Thai", "Trinidadian", "Tunisian", "Turkish", "Emirati", "Ugandan",
  "Ukrainian", "British", "American", "Uruguayan", "Uzbek",
  "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
].map(n => ({ value: n.toLowerCase(), label: n }));

export const REQUIRED_FIELDS: (keyof StudentProfile)[] = [
  'first_name', 'last_name', 'gender', 'date_of_birth', 'country_of_birth', 'nationality', 'marital_status',
  'phone', 'street', 'city', 'country',
  'passport_number', 'passport_expiry', 'passport_issue_country', 'passport_bio_url',
  'english_test_taken',
  'preferred_country', 'preferred_study_level', 'preferred_course',
  'financial_sponsor',
  'emergency_name', 'emergency_relationship', 'emergency_phone', 'emergency_email', 'emergency_country',
];

export function calculateProgress(data: StudentProfile): number {
  const filled = REQUIRED_FIELDS.filter(f => {
    const val = data[f];
    if (val === null || val === undefined || val === '') return false;
    return true;
  }).length;
  return Math.round((filled / REQUIRED_FIELDS.length) * 100);
}

export function getStatusFromProgress(data: StudentProfile): string {
  if (data.status === 'application_submitted') return 'application_submitted';
  const progress = calculateProgress(data);
  if (progress === 0) return 'invited';
  if (progress === 100) return 'profile_completed';
  return 'profile_incomplete';
}
