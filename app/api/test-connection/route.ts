import { testSupabaseConnection } from "@/lib/supabase/test-connection"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await testSupabaseConnection()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in test-connection route:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
