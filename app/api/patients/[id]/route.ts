import { getPatientById, updatePatient, deletePatient } from "@/lib/services/patients-service";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  try {
    const patient = await getPatientById(id);
    return NextResponse.json(patient);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const patient = await updatePatient(id, body);
    return NextResponse.json(patient);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  try {
    await deletePatient(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
