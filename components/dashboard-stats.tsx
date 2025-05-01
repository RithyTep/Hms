"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePatients } from "@/hooks/use-patients"
import { useAppointments } from "@/hooks/use-appointments"
import { BedDouble, Calendar, Clock, Users } from "lucide-react"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export function DashboardStats() {
  const today = format(new Date(), "yyyy-MM-dd")
  const { patients, loading: patientsLoading } = usePatients()
  const { appointments, loading: appointmentsLoading } = useAppointments(today)
  const router = useRouter()

  // Calculate bed occupancy (this would typically come from a separate API)
  const bedOccupancy = 78

  // Calculate average wait time (this would typically come from a separate API)
  const averageWaitTime = 24

  // Ensure patients and appointments are arrays
  const patientsCount = patients ? patients.length : 0
  const appointmentsCount = appointments ? appointments.length : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
        onClick={() => router.push("/patients")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {patientsLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">{patientsCount}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
        onClick={() => router.push("/appointments")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {appointmentsLoading ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <>
              <div className="text-2xl font-bold">{appointmentsCount}</div>
              <p className="text-xs text-muted-foreground">+5% from yesterday</p>
            </>
          )}
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
        onClick={() => router.push("/records")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
          <BedDouble className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{bedOccupancy}%</div>
          <p className="text-xs text-muted-foreground">+2% from last week</p>
        </CardContent>
      </Card>
      <Card
        className="cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
        onClick={() => router.push("/appointments")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageWaitTime} min</div>
          <p className="text-xs text-muted-foreground">-12% from last week</p>
        </CardContent>
      </Card>
    </div>
  )
}
