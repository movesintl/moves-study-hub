export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          address: string | null
          course_id: string | null
          created_at: string
          date_of_birth: string | null
          destination_id: string | null
          documents: Json | null
          id: string
          nationality: string | null
          notes: string | null
          status: string | null
          student_email: string
          student_name: string
          student_phone: string
          university_id: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          course_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          destination_id?: string | null
          documents?: Json | null
          id?: string
          nationality?: string | null
          notes?: string | null
          status?: string | null
          student_email: string
          student_name: string
          student_phone: string
          university_id?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          course_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          destination_id?: string | null
          documents?: Json | null
          id?: string
          nationality?: string | null
          notes?: string | null
          status?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string
          university_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      blog_category_assignments: {
        Row: {
          blog_id: string | null
          category_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          blog_id?: string | null
          category_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          blog_id?: string | null
          category_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_category_assignments_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blogs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_category_assignments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blogs: {
        Row: {
          author: string | null
          category_id: string | null
          content: string | null
          created_at: string
          faqs: Json | null
          featured_image_alt: string | null
          featured_image_url: string | null
          focus_keywords: string[] | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          slug: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          faqs?: Json | null
          featured_image_alt?: string | null
          featured_image_url?: string | null
          focus_keywords?: string[] | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          slug?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          faqs?: Json | null
          featured_image_alt?: string | null
          featured_image_url?: string | null
          focus_keywords?: string[] | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          slug?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blogs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      careers: {
        Row: {
          application_deadline: string | null
          apply_link: string
          benefits: string | null
          created_at: string
          department: string
          full_description: string
          id: string
          is_published: boolean
          job_title: string
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          meta_description: string | null
          meta_title: string | null
          requirements: string
          short_description: string
          slug: string
          updated_at: string
        }
        Insert: {
          application_deadline?: string | null
          apply_link: string
          benefits?: string | null
          created_at?: string
          department: string
          full_description: string
          id?: string
          is_published?: boolean
          job_title: string
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          meta_description?: string | null
          meta_title?: string | null
          requirements: string
          short_description: string
          slug: string
          updated_at?: string
        }
        Update: {
          application_deadline?: string | null
          apply_link?: string
          benefits?: string | null
          created_at?: string
          department?: string
          full_description?: string
          id?: string
          is_published?: boolean
          job_title?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string
          meta_description?: string | null
          meta_title?: string | null
          requirements?: string
          short_description?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      counselling_bookings: {
        Row: {
          admin_notes: string | null
          agrees_to_contact: boolean | null
          agrees_to_marketing: boolean | null
          agrees_to_terms: boolean | null
          course_interest: string | null
          created_at: string
          current_education_level: string | null
          english_test_score: string | null
          id: string
          message: string | null
          preferred_date: string | null
          preferred_destination: string | null
          preferred_time: string | null
          status: string | null
          student_email: string
          student_name: string
          student_phone: string
          study_level: string | null
          updated_at: string
          work_experience: string | null
        }
        Insert: {
          admin_notes?: string | null
          agrees_to_contact?: boolean | null
          agrees_to_marketing?: boolean | null
          agrees_to_terms?: boolean | null
          course_interest?: string | null
          created_at?: string
          current_education_level?: string | null
          english_test_score?: string | null
          id?: string
          message?: string | null
          preferred_date?: string | null
          preferred_destination?: string | null
          preferred_time?: string | null
          status?: string | null
          student_email: string
          student_name: string
          student_phone: string
          study_level?: string | null
          updated_at?: string
          work_experience?: string | null
        }
        Update: {
          admin_notes?: string | null
          agrees_to_contact?: boolean | null
          agrees_to_marketing?: boolean | null
          agrees_to_terms?: boolean | null
          course_interest?: string | null
          created_at?: string
          current_education_level?: string | null
          english_test_score?: string | null
          id?: string
          message?: string | null
          preferred_date?: string | null
          preferred_destination?: string | null
          preferred_time?: string | null
          status?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string
          study_level?: string | null
          updated_at?: string
          work_experience?: string | null
        }
        Relationships: []
      }
      course_study_areas: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      course_study_levels: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          application_link: string | null
          country: string
          created_at: string
          currency: string | null
          description: string | null
          destination_id: string | null
          duration_months: number
          eligibility: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          intake_dates: string[] | null
          level: string
          requirements: string | null
          slug: string | null
          study_area: string
          study_area_id: string | null
          study_level_id: string | null
          thumbnail_url: string | null
          title: string
          tuition_fee: number | null
          university: string
          university_id: string | null
          updated_at: string
        }
        Insert: {
          application_link?: string | null
          country: string
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id?: string | null
          duration_months: number
          eligibility?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          intake_dates?: string[] | null
          level: string
          requirements?: string | null
          slug?: string | null
          study_area: string
          study_area_id?: string | null
          study_level_id?: string | null
          thumbnail_url?: string | null
          title: string
          tuition_fee?: number | null
          university: string
          university_id?: string | null
          updated_at?: string
        }
        Update: {
          application_link?: string | null
          country?: string
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id?: string | null
          duration_months?: number
          eligibility?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          intake_dates?: string[] | null
          level?: string
          requirements?: string | null
          slug?: string | null
          study_area?: string
          study_area_id?: string | null
          study_level_id?: string | null
          thumbnail_url?: string | null
          title?: string
          tuition_fee?: number | null
          university?: string
          university_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "courses_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_study_area_id_fkey"
            columns: ["study_area_id"]
            isOneToOne: false
            referencedRelation: "course_study_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_study_level_id_fkey"
            columns: ["study_level_id"]
            isOneToOne: false
            referencedRelation: "course_study_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          average_fee: string | null
          cost_of_living_info: string | null
          created_at: string
          description: string | null
          faqs: Json | null
          featured_image_url: string | null
          flag_icon_url: string | null
          id: string
          job_market_points: Json | null
          lifestyle_info: string | null
          more_information: string | null
          name: string
          slug: string
          updated_at: string
          visa_info: string | null
          why_study_points: Json | null
        }
        Insert: {
          average_fee?: string | null
          cost_of_living_info?: string | null
          created_at?: string
          description?: string | null
          faqs?: Json | null
          featured_image_url?: string | null
          flag_icon_url?: string | null
          id?: string
          job_market_points?: Json | null
          lifestyle_info?: string | null
          more_information?: string | null
          name: string
          slug: string
          updated_at?: string
          visa_info?: string | null
          why_study_points?: Json | null
        }
        Update: {
          average_fee?: string | null
          cost_of_living_info?: string | null
          created_at?: string
          description?: string | null
          faqs?: Json | null
          featured_image_url?: string | null
          flag_icon_url?: string | null
          id?: string
          job_market_points?: Json | null
          lifestyle_info?: string | null
          more_information?: string | null
          name?: string
          slug?: string
          updated_at?: string
          visa_info?: string | null
          why_study_points?: Json | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          company: string | null
          created_at: string
          designation: string | null
          email: string
          event_id: string
          id: string
          message: string | null
          name: string
          phone: string | null
          registration_date: string
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          designation?: string | null
          email: string
          event_id: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          designation?: string | null
          email?: string
          event_id?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          registration_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          city: string | null
          contact_email: string
          contact_phone: string | null
          created_at: string
          description: string | null
          end_time: string
          event_link: string | null
          event_type: string
          host_name: string | null
          id: string
          image_url: string | null
          is_featured: boolean
          is_free: boolean
          is_published: boolean
          location: string | null
          meta_description: string | null
          meta_title: string | null
          mode: string
          registration_deadline: string | null
          registration_form_url: string | null
          registration_required: boolean
          slug: string
          start_time: string
          ticket_price: number | null
          title: string
          updated_at: string
        }
        Insert: {
          city?: string | null
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          end_time: string
          event_link?: string | null
          event_type: string
          host_name?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_free?: boolean
          is_published?: boolean
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          mode: string
          registration_deadline?: string | null
          registration_form_url?: string | null
          registration_required?: boolean
          slug: string
          start_time: string
          ticket_price?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          city?: string | null
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          end_time?: string
          event_link?: string | null
          event_type?: string
          host_name?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean
          is_free?: boolean
          is_published?: boolean
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          mode?: string
          registration_deadline?: string | null
          registration_form_url?: string | null
          registration_required?: boolean
          slug?: string
          start_time?: string
          ticket_price?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          career_id: string
          cover_letter_file_url: string | null
          created_at: string
          cv_file_url: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          career_id: string
          cover_letter_file_url?: string | null
          created_at?: string
          cv_file_url?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          career_id?: string
          cover_letter_file_url?: string | null
          created_at?: string
          cv_file_url?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_job_applications_career"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_consents: {
        Row: {
          consent_date: string
          created_at: string
          id: string
          is_active: boolean
          source: string | null
          student_email: string
          student_name: string
          student_phone: string | null
          updated_at: string
        }
        Insert: {
          consent_date?: string
          created_at?: string
          id?: string
          is_active?: boolean
          source?: string | null
          student_email: string
          student_name: string
          student_phone?: string | null
          updated_at?: string
        }
        Update: {
          consent_date?: string
          created_at?: string
          id?: string
          is_active?: boolean
          source?: string | null
          student_email?: string
          student_name?: string
          student_phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_files: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string
          file_url: string
          filename: string
          folder: string | null
          id: string
          tags: string[] | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type: string
          file_url: string
          filename: string
          folder?: string | null
          id?: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          filename?: string
          folder?: string | null
          id?: string
          tags?: string[] | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string
          created_at: string
          id: string
          is_read: boolean
          message: string
          reference_id: string | null
          reference_table: string | null
          title: string
          type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          reference_id?: string | null
          reference_table?: string | null
          title: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          reference_id?: string | null
          reference_table?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          body_content: string | null
          content: string | null
          content_image_url: string | null
          content_video_url: string | null
          created_at: string
          cta_button_link: string | null
          cta_button_text: string | null
          cta_text: string | null
          faqs: Json | null
          feature_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          page_description: string | null
          published: boolean
          related_blog_category_id: string | null
          show_counselling_form: boolean | null
          slug: string
          subtitle: string | null
          title: string
          updated_at: string
          visual_builder_data: Json | null
          visual_builder_enabled: boolean | null
          visual_builder_version: string | null
        }
        Insert: {
          body_content?: string | null
          content?: string | null
          content_image_url?: string | null
          content_video_url?: string | null
          created_at?: string
          cta_button_link?: string | null
          cta_button_text?: string | null
          cta_text?: string | null
          faqs?: Json | null
          feature_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_description?: string | null
          published?: boolean
          related_blog_category_id?: string | null
          show_counselling_form?: boolean | null
          slug: string
          subtitle?: string | null
          title: string
          updated_at?: string
          visual_builder_data?: Json | null
          visual_builder_enabled?: boolean | null
          visual_builder_version?: string | null
        }
        Update: {
          body_content?: string | null
          content?: string | null
          content_image_url?: string | null
          content_video_url?: string | null
          created_at?: string
          cta_button_link?: string | null
          cta_button_text?: string | null
          cta_text?: string | null
          faqs?: Json | null
          feature_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          page_description?: string | null
          published?: boolean
          related_blog_category_id?: string | null
          show_counselling_form?: boolean | null
          slug?: string
          subtitle?: string | null
          title?: string
          updated_at?: string
          visual_builder_data?: Json | null
          visual_builder_enabled?: boolean | null
          visual_builder_version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_pages_blog_category"
            columns: ["related_blog_category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          action: string
          count: number
          created_at: string
          failure_count: number | null
          id: string
          identifier: string
          lockout_until: string | null
          window_start: string
        }
        Insert: {
          action: string
          count?: number
          created_at?: string
          failure_count?: number | null
          id?: string
          identifier: string
          lockout_until?: string | null
          window_start?: string
        }
        Update: {
          action?: string
          count?: number
          created_at?: string
          failure_count?: number | null
          id?: string
          identifier?: string
          lockout_until?: string | null
          window_start?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          display_order: number | null
          id: string
          is_featured: boolean
          is_published: boolean
          rating: number
          reviewer_image_url: string | null
          reviewer_name: string
          reviewer_role: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          rating: number
          reviewer_image_url?: string | null
          reviewer_name: string
          reviewer_role?: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          display_order?: number | null
          id?: string
          is_featured?: boolean
          is_published?: boolean
          rating?: number
          reviewer_image_url?: string | null
          reviewer_name?: string
          reviewer_role?: string
          updated_at?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      saved_courses: {
        Row: {
          course_id: string
          created_at: string
          id: string
          user_id: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          faqs: Json | null
          feature_image_alt: string | null
          feature_image_url: string | null
          full_details: string | null
          how_it_works_blurbs: Json | null
          how_it_works_description: string | null
          how_it_works_feature_image_url: string | null
          how_it_works_title: string | null
          icon_url: string | null
          id: string
          short_description: string | null
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          faqs?: Json | null
          feature_image_alt?: string | null
          feature_image_url?: string | null
          full_details?: string | null
          how_it_works_blurbs?: Json | null
          how_it_works_description?: string | null
          how_it_works_feature_image_url?: string | null
          how_it_works_title?: string | null
          icon_url?: string | null
          id?: string
          short_description?: string | null
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          faqs?: Json | null
          feature_image_alt?: string | null
          feature_image_url?: string | null
          full_details?: string | null
          how_it_works_blurbs?: Json | null
          how_it_works_description?: string | null
          how_it_works_feature_image_url?: string | null
          how_it_works_title?: string | null
          icon_url?: string | null
          id?: string
          short_description?: string | null
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      staff_members: {
        Row: {
          created_at: string
          description: string | null
          designation: string
          display_order: number | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          profile_image_url: string | null
          social_media_links: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          designation: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          profile_image_url?: string | null
          social_media_links?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          designation?: string
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          profile_image_url?: string | null
          social_media_links?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          accreditation_status: string | null
          admission_requirements: Json | null
          application_deadlines: Json | null
          application_portal_status: string | null
          country: string | null
          created_at: string
          established_year: string | null
          featured: boolean
          global_ranking: string | null
          id: string
          institution_type: string | null
          key_highlights: Json | null
          location: string | null
          logo_url: string | null
          name: string
          overview_content: string | null
          qs_rating: string | null
          qs_world_ranking: string | null
          research_rating: string | null
          slug: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          accreditation_status?: string | null
          admission_requirements?: Json | null
          application_deadlines?: Json | null
          application_portal_status?: string | null
          country?: string | null
          created_at?: string
          established_year?: string | null
          featured?: boolean
          global_ranking?: string | null
          id?: string
          institution_type?: string | null
          key_highlights?: Json | null
          location?: string | null
          logo_url?: string | null
          name: string
          overview_content?: string | null
          qs_rating?: string | null
          qs_world_ranking?: string | null
          research_rating?: string | null
          slug?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          accreditation_status?: string | null
          admission_requirements?: Json | null
          application_deadlines?: Json | null
          application_portal_status?: string | null
          country?: string | null
          created_at?: string
          established_year?: string | null
          featured?: boolean
          global_ranking?: string | null
          id?: string
          institution_type?: string | null
          key_highlights?: Json | null
          location?: string | null
          logo_url?: string | null
          name?: string
          overview_content?: string | null
          qs_rating?: string | null
          qs_world_ranking?: string | null
          research_rating?: string | null
          slug?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_action: string
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      check_rate_limit_with_lockout: {
        Args: {
          p_identifier: string
          p_action: string
          p_max_requests?: number
          p_window_minutes?: number
          p_max_failures?: number
          p_lockout_minutes?: number
        }
        Returns: Json
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_title: string
          p_message: string
          p_type?: string
          p_category?: string
          p_reference_id?: string
          p_reference_table?: string
        }
        Returns: string
      }
      detect_suspicious_activity: {
        Args: {
          p_user_id?: string
          p_ip_address?: unknown
          p_time_window_hours?: number
        }
        Returns: Json
      }
      generate_career_slug: {
        Args: { career_title: string; career_id?: string }
        Returns: string
      }
      generate_event_slug: {
        Args: { event_title: string; event_id?: string }
        Returns: string
      }
      generate_service_slug: {
        Args: { service_title: string; service_id?: string }
        Returns: string
      }
      generate_unique_slug: {
        Args: { course_title: string; course_id?: string }
        Returns: string
      }
      generate_university_slug: {
        Args: { university_name: string; university_id?: string }
        Returns: string
      }
      get_auth_users: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_admin_or_editor: {
        Args: { user_id: string }
        Returns: boolean
      }
      log_audit_event: {
        Args: {
          p_action: string
          p_table_name?: string
          p_record_id?: string
          p_old_values?: Json
          p_new_values?: Json
        }
        Returns: undefined
      }
      log_auth_event: {
        Args: {
          p_event_type: string
          p_user_id?: string
          p_ip_address?: unknown
          p_user_agent?: string
          p_success?: boolean
          p_details?: Json
        }
        Returns: undefined
      }
      log_security_event: {
        Args: { event_type: string; user_id: string; details?: Json }
        Returns: undefined
      }
      notify_admins: {
        Args: {
          p_title: string
          p_message: string
          p_type?: string
          p_category?: string
          p_reference_id?: string
          p_reference_table?: string
        }
        Returns: undefined
      }
      slugify: {
        Args: { "": string }
        Returns: string
      }
    }
    Enums: {
      job_type: "Full-Time" | "Part-Time" | "Internship" | "Contract"
      user_role: "admin" | "editor" | "counselor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      job_type: ["Full-Time", "Part-Time", "Internship", "Contract"],
      user_role: ["admin", "editor", "counselor", "student"],
    },
  },
} as const
