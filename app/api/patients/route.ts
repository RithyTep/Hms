import { createPatient, getPatients } from "@/lib/services/patients-service"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const patients = await getPatients(status || undefined, search || undefined)
    return NextResponse.json(patients)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const patient = await createPatient(body)
    return NextResponse.json(patient)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
