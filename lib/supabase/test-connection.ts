import { createServerClient } from "./server"

export async function testSupabaseConnection() {
  try {
    const supabase = createServerClient()

    // Try to fetch a single row from departments table
    const { data, error } = await supabase.from("departments").select("*").limit(1)

    if (error) {
      console.error("Supabase connection test failed:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
