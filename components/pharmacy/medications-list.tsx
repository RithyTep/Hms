"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, Edit, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/i18n/language-context"

// Mock data for medications
const mockMedications = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Analgesic",
    stock: 250,
    unit: "Tablets",
    expiryDate: "2025-06-15",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Amoxicillin",
    category: "Antibiotic",
    stock: 120,
    unit: "Capsules",
    expiryDate: "2024-12-10",
    status: "In Stock",
  },
  {
    id: 3,
    name: "Ibuprofen",
    category: "NSAID",
    stock: 180,
    unit: "Tablets",
    expiryDate: "2025-03-22",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Loratadine",
    category: "Antihistamine",
    stock: 45,
    unit: "Tablets",
    expiryDate: "2024-09-30",
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Insulin",
    category: "Hormone",
    stock: 30,
    unit: "Vials",
    expiryDate: "2024-08-15",
    status: "Low Stock",
  },
]

export function MedicationsList() {
  const [medications] = useState(mockMedications)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const { t } = useLanguage()

  const filteredMedications = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(search.toLowerCase()) ||
      med.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("medications")}...`}
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={() => setLoading(true)} className="ml-2">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No medications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredMedications.map((medication) => (
                  <TableRow key={medication.id}>
                    <TableCell className="font-medium">{medication.name}</TableCell>
                    <TableCell>{medication.category}</TableCell>
                    <TableCell>{medication.stock}</TableCell>
                    <TableCell>{medication.unit}</TableCell>
                    <TableCell>{medication.expiryDate}</TableCell>
                    <TableCell>
                      <Badge variant={medication.status === "Low Stock" ? "destructive" : "default"}>
                        {medication.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
