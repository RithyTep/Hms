import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { MedicalRecordsList } from "@/components/records/medical-records-list"

export default function MedicalRecordsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
        <Button asChild>
          <Link href="/records/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Record
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="critical">Critical</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <MedicalRecordsList />
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <MedicalRecordsList filter="recent" />
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <MedicalRecordsList filter="critical" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
