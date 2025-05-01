import { createServerClient } from "@/lib/supabase/server"
import type { Appointment } from "@/types/database.types"

export async function getAppointments(date?: string, status?: string): Promise<Appointment[]> {
  try {
    const supabase = createServerClient()
    let query = supabase.from("appointments").select("*, patients(*), staff(*), departments(*)")

    if (date) {
      query = query.eq("appointment_date", date)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query.order("appointment_time")

    if (error) {
      console.error("Error fetching appointments:", error)
      throw new Error(error.message)
    }

    return data || []
  } catch (error) {
    console.error("Error in getAppointments:", error)
    throw error
  }
}

export async function getAppointmentById(id: string): Promise<Appointment> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from("appointments")
      .select("*, patients(*), staff(*), departments(*)")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching appointment:", error)
      throw new Error(error.message)
    }

    return data
  } catch (error) {
    console.error("Error in getAppointmentById:", error)
    throw error
  }
}

export async function createAppointment(appointmentData: Partial<Appointment>): Promise<Appointment> {
  try {
    const supabase = createServerClient()

    // Generate a unique appointment ID if not provided
    const appointmentId = appointmentData.appointment_id || `A-${Math.floor(1000 + Math.random() * 9000)}`

    const { data, error } = await supabase
      .from("appointments")
      .insert([{ ...appointmentData, appointment_id: appointmentId }])
      .select()

    if (error) {
      console.error("Error creating appointment:", error)
      throw new Error(error.message)
    }

    return data[0]
  } catch (error) {
    console.error("Error in createAppointment:", error)
    throw error
  }
}

export async function updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<Appointment> {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("appointments").update(appointmentData).eq("id", id).select()

    if (error) {
      console.error("Error updating appointment:", error)
      throw new Error(error.message)
    }

    return data[0]
  } catch (error) {
    console.error("Error in updateAppointment:", error)
    throw error
  }
}

export async function deleteAppointment(id: string): Promise<void> {
  try {
    const supabase = createServerClient()
    const { error } = await supabase.from("appointments").delete().eq("id", id)

    if (error) {
      console.error("Error deleting appointment:", error)
      throw new Error(error.message)
    }
  } catch (error) {
    console.error("Error in deleteAppointment:", error)
    throw error
  }
}
