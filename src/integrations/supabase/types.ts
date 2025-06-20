export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
      blogs: {
        Row: {
          author: string | null
          category_id: string | null
          content: string | null
          created_at: string
          featured_image_url: string | null
          id: string
          published: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string
          featured_image_url?: string | null
          id?: string
          published?: boolean | null
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
          study_area: string
          thumbnail_url: string | null
          title: string
          tuition_fee_max: number | null
          tuition_fee_min: number | null
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
          study_area: string
          thumbnail_url?: string | null
          title: string
          tuition_fee_max?: number | null
          tuition_fee_min?: number | null
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
          study_area?: string
          thumbnail_url?: string | null
          title?: string
          tuition_fee_max?: number | null
          tuition_fee_min?: number | null
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
          created_at: string
          description: string | null
          featured_image_url: string | null
          id: string
          lifestyle_info: string | null
          name: string
          updated_at: string
          visa_info: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured_image_url?: string | null
          id?: string
          lifestyle_info?: string | null
          name: string
          updated_at?: string
          visa_info?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          featured_image_url?: string | null
          id?: string
          lifestyle_info?: string | null
          name?: string
          updated_at?: string
          visa_info?: string | null
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
          full_details: string | null
          icon_url: string | null
          id: string
          short_description: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_details?: string | null
          icon_url?: string | null
          id?: string
          short_description?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_details?: string | null
          icon_url?: string | null
          id?: string
          short_description?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      universities: {
        Row: {
          created_at: string
          id: string
          location: string | null
          logo_url: string | null
          name: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          logo_url?: string | null
          name: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          logo_url?: string | null
          name?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "admin" | "editor" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "editor", "user"],
    },
  },
} as const
