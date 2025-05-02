"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ReportsPatients } from "@/components/reports/reports-patients"
import { ReportsFinancial } from "@/components/reports/reports-financial"
import { ReportsStaff } from "@/components/reports/reports-staff"
import { ReportsInventory } from "@/components/reports/reports-inventory"
import useComponentRoute from "@/hooks/use-component-route"

export default function ReportsPage() {
  const { reports } = useComponentRoute()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <Tabs defaultValue="patients" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patients">Patient Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="staff">Staff Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-4">
          <ReportsPatients />
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <ReportsFinancial />
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <ReportsStaff />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <ReportsInventory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
