import { createServerClient } from "@/lib/supabase/server"
import type { Patient } from "@/types/database.types"

export async function getPatients(status?: string, search?: string): Promise<Patient[]> {
  try {
    const supabase = createServerClient()
    let query = supabase.from("patients").select("*")

    if (status) {
      query = query.eq("status", status)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,patient_id.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching patients:", error)
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    console.error("Error in getPatients:", error)
    throw error
  }
}

export async function getPatientById(id: string): Promise<Patient> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("patients")
      .select("*, medical_records(*), appointments(*, staff(*), departments(*))")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching patient:", error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error("Error in getPatientById:", error)
    throw error
  }
}

export async function createPatient(patientData: Partial<Patient>): Promise<Patient> {
  try {
    const supabase = createServerClient()

    // Generate a unique patient ID if not provided
    const patientId = patientData.patient_id || `P-${Math.floor(1000 + Math.random() * 9000)}`

    const { data, error } = await supabase
      .from("patients")
      .insert([{ ...patientData, patient_id: patientId }])
      .select()

    if (error) {
      console.error("Error creating patient:", error)
      throw new Error(error.message)
    }

    return data[0]
  } catch (error) {
    console.error("Error in createPatient:", error)
    throw error
  }
}

export async function updatePatient(id: string, patientData: Partial<Patient>): Promise<Patient> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("patients").update(patientData).eq("id", id).select()

    if (error) {
      console.error("Error updating patient:", error)
      throw new Error(error.message)
    }

    return data[0]
  } catch (error) {
    console.error("Error in updatePatient:", error)
    throw error
  }
}

export async function deletePatient(id: string): Promise<void> {
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("patients").delete().eq("id", id)

    if (error) {
      console.error("Error deleting patient:", error)
      throw new Error(error.message)
    }
  } catch (error) {
    console.error("Error in deletePatient:", error)
    throw error
  }
}
