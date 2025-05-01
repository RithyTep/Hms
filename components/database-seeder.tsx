"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Database } from "lucide-react"

export function DatabaseSeeder() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")
  const [details, setDetails] = useState<Record<string, number> | null>(null)

  const seedDatabase = async () => {
    try {
      setStatus("loading")
      setMessage("Seeding database with sample data...")

      const response = await fetch("/api/seed-database", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to seed database")
      }

      setStatus("success")
      setMessage("Database successfully seeded with sample data!")
      setDetails(data.data)
    } catch (error) {
      setStatus("error")
      setMessage(`Error seeding database: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Seeder</CardTitle>
        <CardDescription>Populate your database with sample data for testing</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "idle" ? (
          <p className="text-sm text-muted-foreground">
            Click the button below to seed your database with sample departments, staff, patients, appointments, and
            medical records.
          </p>
        ) : status === "loading" ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>{message}</p>
          </div>
        ) : status === "success" ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              {message}
              {details && (
                <ul className="mt-2 text-sm">
                  <li>Departments: {details.departments}</li>
                  <li>Staff: {details.staff}</li>
                  <li>Patients: {details.patients}</li>
                  <li>Appointments: {details.appointments}</li>
                  <li>Medical Records: {details.records}</li>
                </ul>
              )}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-50 border-red-200">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={seedDatabase} disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Seed Database
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
