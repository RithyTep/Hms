import { createAppointment, getAppointments } from "@/lib/services/appointments-service"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get("date")
    const status = searchParams.get("status")

    const appointments = await getAppointments(date || undefined, status || undefined)
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const appointment = await createAppointment(body)
    return NextResponse.json(appointment)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
