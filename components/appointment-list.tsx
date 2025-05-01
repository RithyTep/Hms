"use client"

import type { Appointment } from "@/types/database.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { format, parseISO } from "date-fns"
import Link from "next/link"

interface AppointmentListProps {
  appointments: Appointment[]
  loading: boolean
  date: Date
}

export function AppointmentList({ appointments, loading, date }: AppointmentListProps) {
  // Generate time slots from 8 AM to 5 PM
  const timeSlots = Array.from({ length: 10 }, (_, i) => {
    const hour = i + 8
    return format(new Date().setHours(hour, 0, 0, 0), "h:00 a")
  })

  // Group appointments by time slot
  const appointmentsByTime = timeSlots.map((time) => {
    const slotAppointments = appointments.filter((appointment) => {
      const appointmentTime = format(parseISO(`2000-01-01T${appointment.appointment_time}`), "h:00 a")
      return appointmentTime === time
    })

    return {
      time,
      appointments: slotAppointments,
    }
  })

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-6 w-20" />
            <div className="flex-1">
              <Skeleton className="h-[72px] w-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {appointmentsByTime.map((slot) => (
        <div key={slot.time} className="flex gap-4">
          <div className="w-20 pt-2 text-sm font-medium">{slot.time}</div>
          <div className="flex-1">
            {slot.appointments.length > 0 ? (
              slot.appointments.map((appointment) => {
                const patient = appointment.patient
                const staff = appointment.staff

                if (!patient || !staff) return null

                const initials = patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()

                return (
                  <div key={appointment.id} className="flex items-center gap-4 rounded-lg border p-3 mb-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${initials}`} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{patient.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span>{staff.name}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{appointment.department?.name || "General"}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appointment.type === "Emergency"
                          ? "destructive"
                          : appointment.type === "Follow-up"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {appointment.type}
                    </Badge>
                  </div>
                )
              })
            ) : (
              <div className="flex h-[72px] items-center justify-center rounded-lg border border-dashed">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/appointments/new?date=${format(date, "yyyy-MM-dd")}&time=${slot.time}`}>
                    + Add Appointment
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
