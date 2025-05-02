"use client"
import { PatientList } from "@/components/patients/patient-list"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"
import useComponentRoute from "@/hooks/use-component-route"

export default function PatientsPage() {
  const { patients } = useComponentRoute()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
        <Button asChild>
          <Link href={patients.new}>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Patients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="discharged">Discharged</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <PatientList />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <PatientList initialStatus="Active" />
        </TabsContent>

        <TabsContent value="discharged" className="space-y-4">
          <PatientList initialStatus="Discharged" />
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <PatientList initialStatus="Critical" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
