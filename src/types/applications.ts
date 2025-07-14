export interface Document {
  id?: string;
  name: string;
  size: number;
  type: string;
  category: 'passport' | 'academic' | 'english' | 'other';
  label?: string;
  file?: File;
}

export interface Application {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  date_of_birth?: string;
  nationality?: string;
  address?: string;
  course_id?: string;
  university_id?: string;
  destination_id?: string;
  status: string;
  created_at: string;
  courses?: { title: string; university: string };
  universities?: { name: string };
  destinations?: { name: string };
  documents?: Document[];
}