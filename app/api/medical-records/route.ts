import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const patientId = searchParams.get("patient_id")

    const supabase = createServerClient()
    let query = supabase.from("medical_records").select("*, patients(*), staff(*)")

    if (patientId) {
      query = query.eq("patient_id", patientId)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createServerClient()

    // Generate a unique record ID
    const recordId = `MR-${Math.floor(1000 + Math.random() * 9000)}`

    const { data, error } = await supabase
      .from("medical_records")
      .insert([{ ...body, record_id: recordId }])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
