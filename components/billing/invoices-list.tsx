"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, Eye, FileText, Printer } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useLanguage } from "@/lib/i18n/language-context"

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-1001",
    patientName: "John Smith",
    patientId: "P-1001",
    date: "2023-04-15",
    dueDate: "2023-05-15",
    amount: 1250.75,
    status: "Paid",
  },
  {
    id: "INV-1002",
    patientName: "Maria Garcia",
    patientId: "P-1002",
    date: "2023-04-18",
    dueDate: "2023-05-18",
    amount: 875.5,
    status: "Pending",
  },
  {
    id: "INV-1003",
    patientName: "Robert Johnson",
    patientId: "P-1003",
    date: "2023-04-20",
    dueDate: "2023-05-20",
    amount: 2200.25,
    status: "Overdue",
  },
  {
    id: "INV-1004",
    patientName: "Sarah Williams",
    patientId: "P-1004",
    date: "2023-04-22",
    dueDate: "2023-05-22",
    amount: 950.0,
    status: "Paid",
  },
]

export function InvoicesList() {
  const [invoices] = useState(mockInvoices)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const { t } = useLanguage()

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(search.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(search.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("invoices")}...`}
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
          {Array.from({ length: 4 }).map((_, i) => (
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
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No invoices found
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{invoice.patientName}</div>
                        <div className="text-xs text-muted-foreground">{invoice.patientId}</div>
                      </div>
                    </TableCell>
                    <TableCell>{format(new Date(invoice.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>{format(new Date(invoice.dueDate), "MMM d, yyyy")}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
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
