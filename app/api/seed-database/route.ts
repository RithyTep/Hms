import { createServerClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = createServerClient()

    // Seed departments
    const { data: departments, error: deptError } = await supabase
      .from("departments")
      .insert([
        { name: "Cardiology", description: "Heart and cardiovascular system specialists" },
        { name: "Neurology", description: "Brain, spinal cord, and nervous system specialists" },
        { name: "Orthopedics", description: "Bone, joint, ligament, tendon, and muscle specialists" },
        { name: "Pediatrics", description: "Medical care of infants, children, and adolescents" },
        { name: "Oncology", description: "Cancer diagnosis and treatment specialists" },
      ])
      .select()

    if (deptError) {
      console.error("Error seeding departments:", deptError)
      return NextResponse.json({ success: false, error: deptError.message }, { status: 500 })
    }

    // Seed staff
    const { data: staff, error: staffError } = await supabase
      .from("staff")
      .insert([
        {
          staff_id: "S-1001",
          name: "Dr. Sarah Wilson",
          email: "sarah.wilson@hospital.com",
          phone: "(555) 123-4567",
          department_id: departments?.[0]?.id,
          role: "Doctor",
          specialty: "Cardiologist",
          status: "Active",
        },
        {
          staff_id: "S-1002",
          name: "Dr. Michael Chen",
          email: "michael.chen@hospital.com",
          phone: "(555) 234-5678",
          department_id: departments?.[1]?.id,
          role: "Doctor",
          specialty: "Neurologist",
          status: "Active",
        },
        {
          staff_id: "S-1003",
          name: "Nurse Emma Johnson",
          email: "emma.johnson@hospital.com",
          phone: "(555) 345-6789",
          department_id: departments?.[0]?.id,
          role: "Nurse",
          specialty: "Cardiac Care",
          status: "Active",
        },
      ])
      .select()

    if (staffError) {
      console.error("Error seeding staff:", staffError)
      return NextResponse.json({ success: false, error: staffError.message }, { status: 500 })
    }

    // Seed patients
    const { data: patients, error: patientError } = await supabase
      .from("patients")
      .insert([
        {
          patient_id: "P-1001",
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "(555) 901-2345",
          date_of_birth: "1978-05-15",
          gender: "Male",
          address: "123 Main St, Anytown, USA",
          status: "Active",
        },
        {
          patient_id: "P-1002",
          name: "Maria Garcia",
          email: "maria.garcia@email.com",
          phone: "(555) 456-7890",
          date_of_birth: "1985-09-23",
          gender: "Female",
          address: "456 Oak Ave, Somewhere, USA",
          status: "Active",
        },
        {
          patient_id: "P-1003",
          name: "Robert Johnson",
          email: "robert.johnson@email.com",
          phone: "(555) 567-8901",
          date_of_birth: "1962-11-30",
          gender: "Male",
          address: "789 Pine St, Nowhere, USA",
          status: "Critical",
        },
      ])
      .select()

    if (patientError) {
      console.error("Error seeding patients:", patientError)
      return NextResponse.json({ success: false, error: patientError.message }, { status: 500 })
    }

    // Seed appointments
    const today = new Date().toISOString().split("T")[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0]

    const { data: appointments, error: appointmentError } = await supabase
      .from("appointments")
      .insert([
        {
          appointment_id: "A-1001",
          patient_id: patients?.[0]?.id,
          staff_id: staff?.[0]?.id,
          department_id: departments?.[0]?.id,
          appointment_date: today,
          appointment_time: "10:00:00",
          status: "Scheduled",
          type: "Regular",
          notes: "Regular checkup",
        },
        {
          appointment_id: "A-1002",
          patient_id: patients?.[1]?.id,
          staff_id: staff?.[1]?.id,
          department_id: departments?.[1]?.id,
          appointment_date: today,
          appointment_time: "14:30:00",
          status: "Scheduled",
          type: "Follow-up",
          notes: "Follow-up after treatment",
        },
        {
          appointment_id: "A-1003",
          patient_id: patients?.[2]?.id,
          staff_id: staff?.[0]?.id,
          department_id: departments?.[0]?.id,
          appointment_date: tomorrow,
          appointment_time: "09:15:00",
          status: "Scheduled",
          type: "Emergency",
          notes: "Urgent consultation",
        },
      ])
      .select()

    if (appointmentError) {
      console.error("Error seeding appointments:", appointmentError)
      return NextResponse.json({ success: false, error: appointmentError.message }, { status: 500 })
    }

    // Seed medical records
    const { data: records, error: recordError } = await supabase
      .from("medical_records")
      .insert([
        {
          record_id: "MR-1001",
          patient_id: patients?.[0]?.id,
          staff_id: staff?.[0]?.id,
          diagnosis: "Hypertension",
          treatment: "Lifestyle changes and medication",
          prescription: "Lisinopril 10mg daily",
          notes: "Blood pressure to be monitored weekly",
        },
        {
          record_id: "MR-1002",
          patient_id: patients?.[1]?.id,
          staff_id: staff?.[1]?.id,
          diagnosis: "Migraine",
          treatment: "Pain management and trigger avoidance",
          prescription: "Sumatriptan 50mg as needed",
          notes: "Patient to keep headache diary",
        },
        {
          record_id: "MR-1003",
          patient_id: patients?.[2]?.id,
          staff_id: staff?.[0]?.id,
          diagnosis: "Acute Myocardial Infarction",
          treatment: "Emergency angioplasty performed",
          prescription: "Aspirin 81mg daily, Clopidogrel 75mg daily",
          notes: "Cardiac rehabilitation recommended",
        },
      ])
      .select()

    if (recordError) {
      console.error("Error seeding medical records:", recordError)
      return NextResponse.json({ success: false, error: recordError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      data: {
        departments: departments?.length || 0,
        staff: staff?.length || 0,
        patients: patients?.length || 0,
        appointments: appointments?.length || 0,
        records: records?.length || 0,
      },
    })
  } catch (error) {
    console.error("Error in seed-database route:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
