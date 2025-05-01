"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, Edit, Trash, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

// Mock data for suppliers
const mockSuppliers = [
  {
    id: 1,
    name: "MediPharm Supplies",
    contactPerson: "John Smith",
    email: "john@medipharm.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Ave, Pharma City, PC 12345",
  },
  {
    id: 2,
    name: "Global Healthcare",
    contactPerson: "Sarah Johnson",
    email: "sarah@globalhealthcare.com",
    phone: "+1 (555) 234-5678",
    address: "456 Health St, Medicine Town, MT 23456",
  },
  {
    id: 3,
    name: "PharmaTech Solutions",
    contactPerson: "Michael Brown",
    email: "michael@pharmatech.com",
    phone: "+1 (555) 345-6789",
    address: "789 Tech Blvd, Pharma Valley, PV 34567",
  },
]

export function SuppliersList() {
  const [suppliers] = useState(mockSuppliers)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const { t } = useLanguage()

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("suppliers")}...`}
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
          {Array.from({ length: 3 }).map((_, i) => (
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
                <TableHead>Contact Person</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No suppliers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.name}</TableCell>
                    <TableCell>{supplier.contactPerson}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{supplier.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{supplier.address}</TableCell>
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
