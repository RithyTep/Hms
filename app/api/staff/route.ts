import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")
    const departmentId = searchParams.get("department_id")

    const supabase = createServerClient()
    let query = supabase.from("staff").select("*, departments(*)")

    if (role) {
      query = query.eq("role", role)
    }

    if (departmentId) {
      query = query.eq("department_id", departmentId)
    }

    const { data, error } = await query.order("name")

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

    // Generate a unique staff ID
    const staffId = `S-${Math.floor(1000 + Math.random() * 9000)}`

    const { data, error } = await supabase
      .from("staff")
      .insert([{ ...body, staff_id: staffId }])
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
