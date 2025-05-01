"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { usePatients } from "@/hooks/use-patients"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function RecentPatients() {
  const { t } = useLanguage()
  const router = useRouter()
  const { patients, loading, error } = usePatients()

  // Get the 4 most recent patients, ensuring patients is an array
  const recentPatients = patients ? patients.slice(0, 4) : []

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("recentPatients")}</CardTitle>
          <CardDescription>{t("newlyAdmittedPatients")}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={() => router.push("/patients")}>
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
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
            <p className="text-sm">Error loading patients: {error}</p>
          </div>
        ) : recentPatients.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <p>No patients found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentPatients.map((patient) => {
              const initials = patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()

              // Determine status badge variant
              const statusVariant =
                patient.status === "Critical" ? "destructive" : patient.status === "Stable" ? "default" : "outline"

              return (
                <Link
                  href={`/patients/${patient.id}`}
                  key={patient.id}
                  className="flex items-center gap-4 hover:bg-muted/50 p-2 rounded-md"
                >
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${initials}`} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{patient.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(patient.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{patient.patient_id}</span>
                      <Badge variant={statusVariant} className="text-xs">
                        {patient.status}
                      </Badge>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
