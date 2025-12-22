export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          city: string | null
          state: string | null
          country: string | null
          interests: Json | null
          total_quests_completed: number
          total_points: number
          streak_count: number
          last_quest_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          interests?: Json | null
          total_quests_completed?: number
          total_points?: number
          streak_count?: number
          last_quest_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          city?: string | null
          state?: string | null
          country?: string | null
          interests?: Json | null
          total_quests_completed?: number
          total_points?: number
          streak_count?: number
          last_quest_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quests: {
        Row: {
          id: string
          user_id: string
          quest_key: string
          quest_data: Json
          preferences: Json
          location: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quest_key: string
          quest_data: Json
          preferences: Json
          location: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quest_key?: string
          quest_data?: Json
          preferences?: Json
          location?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}