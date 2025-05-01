import { getPatientById, updatePatient, deletePatient } from "@/lib/services/patients-service"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const patient = await getPatientById(params.id)
    return NextResponse.json(patient)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const patient = await updatePatient(params.id, body)
    return NextResponse.json(patient)
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deletePatient(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
