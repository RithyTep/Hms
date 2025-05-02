"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { MedicationsList } from "@/components/pharmacy/medications-list"
import { SuppliersList } from "@/components/pharmacy/suppliers-list"
import { OrdersList } from "@/components/pharmacy/orders-list"
import useComponentRoute from "@/hooks/use-component-route"

export default function PharmacyPage() {
  const { pharmacy } = useComponentRoute()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pharmacy</h1>
        <Button asChild>
          <Link href={pharmacy.medications.new}>
            <Plus className="mr-2 h-4 w-4" />
            Add Medication
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="medications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="medications" className="space-y-4">
          <MedicationsList />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track medication stock levels and expiry dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <p className="text-muted-foreground">Inventory management module coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <SuppliersList />
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <OrdersList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
