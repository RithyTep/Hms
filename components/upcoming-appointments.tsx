"use client"

import { useAppointments } from "@/hooks/use-appointments"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function UpcomingAppointments() {
  const { t } = useLanguage()
  const router = useRouter()
  const today = format(new Date(), "yyyy-MM-dd")
  const { appointments, loading, error } = useAppointments(today, "Scheduled")

  // Ensure appointments is an array
  const upcomingAppointments = appointments ? appointments.slice(0, 4) : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("upcomingAppointments")}</CardTitle>
          <CardDescription>{t("todaysSchedule")}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/appointments")}>
          {t("viewAll")}
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
            <p className="text-sm">Error loading appointments: {error}</p>
          </div>
        ) : upcomingAppointments.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p>No appointments scheduled for today</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => {
              const patient = appointment.patient
              if (!patient) return null

              const initials = patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()

              // Format time
              const time = format(new Date(`2000-01-01T${appointment.appointment_time}`), "h:mm a")

              // Determine appointment type badge variant
              const typeVariant =
                appointment.type === "Emergency"
                  ? "destructive"
                  : appointment.type === "Follow-up"
                    ? "secondary"
                    : "default"

              return (
                <div key={appointment.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${initials}`} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{patient.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{time}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs">{appointment.staff?.name || "Unassigned"}</span>
                    </div>
                  </div>
                  <Badge variant={typeVariant} className="ml-auto">
                    {appointment.type}
                  </Badge>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
