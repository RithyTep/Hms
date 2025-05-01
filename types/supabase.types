export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      departments: {
        Row: {
          id: number
          name: string
          description: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
        }
      }
      staff: {
        Row: {
          id: number
          staff_id: string
          name: string
          email: string
          phone: string | null
          department_id: number | null
          role: string
          specialty: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          staff_id: string
          name: string
          email: string
          phone?: string | null
          department_id?: number | null
          role: string
          specialty?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          staff_id?: string
          name?: string
          email?: string
          phone?: string | null
          department_id?: number | null
          role?: string
          specialty?: string | null
          status?: string
          created_at?: string
        }
      }
      patients: {
        Row: {
          id: number
          patient_id: string
          name: string
          email: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          address: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          patient_id: string
          name: string
          email?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          patient_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          status?: string
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: number
          appointment_id: string
          patient_id: number
          staff_id: number
          department_id: number | null
          appointment_date: string
          appointment_time: string
          status: string
          type: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: number
          appointment_id: string
          patient_id: number
          staff_id: number
          department_id?: number | null
          appointment_date: string
          appointment_time: string
          status?: string
          type?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          appointment_id?: string
          patient_id?: number
          staff_id?: number
          department_id?: number | null
          appointment_date?: string
          appointment_time?: string
          status?: string
          type?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      medical_records: {
        Row: {
          id: number
          record_id: string
          patient_id: number
          staff_id: number
          diagnosis: string | null
          treatment: string | null
          prescription: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: number
          record_id: string
          patient_id: number
          staff_id: number
          diagnosis?: string | null
          treatment?: string | null
          prescription?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          record_id?: string
          patient_id?: number
          staff_id?: number
          diagnosis?: string | null
          treatment?: string | null
          prescription?: string | null
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
