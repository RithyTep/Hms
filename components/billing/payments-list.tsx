"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useLanguage } from "@/lib/i18n/language-context"

// Mock data for payments
const mockPayments = [
  {
    id: "PAY-1001",
    invoiceId: "INV-1001",
    patientName: "John Smith",
    date: "2023-04-16",
    amount: 1250.75,
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "PAY-1002",
    invoiceId: "INV-1004",
    patientName: "Sarah Williams",
    date: "2023-04-23",
    amount: 950.0,
    method: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "PAY-1003",
    invoiceId: "INV-1002",
    patientName: "Maria Garcia",
    date: "2023-04-25",
    amount: 400.0,
    method: "Cash",
    status: "Partial",
  },
]

export function PaymentsList() {
  const [payments] = useState(mockPayments)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const { t } = useLanguage()

  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(search.toLowerCase()) ||
      payment.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
      payment.patientName.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("payments")}...`}
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
                <TableHead>Payment ID</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No payments found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{payment.invoiceId}</TableCell>
                    <TableCell>{payment.patientName}</TableCell>
                    <TableCell>{format(new Date(payment.date), "MMM d, yyyy")}</TableCell>
                    <TableCell>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>{payment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
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
