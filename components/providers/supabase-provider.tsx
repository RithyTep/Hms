"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"

type SupabaseContextType = {
  initialized: boolean
  error: Error | null
}

const SupabaseContext = createContext<SupabaseContextType>({
  initialized: false,
  error: null,
})

export const useSupabase = () => useContext(SupabaseContext)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [initialized, setInitialized] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      // Test the Supabase connection
      const testConnection = async () => {
        try {
          const supabaseClient = getSupabaseClient()
          const { data, error } = await supabaseClient.from("departments").select("count").limit(1)

          if (error) {
            throw error
          }

          setInitialized(true)
        } catch (err) {
          console.error("Supabase connection error:", err)
          setError(err instanceof Error ? err : new Error("Failed to connect to Supabase"))
        }
      }

      testConnection()
    } catch (err) {
      console.error("Supabase provider error:", err)
      setError(err instanceof Error ? err : new Error("Failed to initialize Supabase"))
    }
  }, [])

  return <SupabaseContext.Provider value={{ initialized, error }}>{children}</SupabaseContext.Provider>
}
