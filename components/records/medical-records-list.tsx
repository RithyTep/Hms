"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw, FileText } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { useLanguage } from "@/lib/i18n/language-context"

interface MedicalRecord {
  id: number
  record_id: string
  patient_id: number
  staff_id: number
  diagnosis: string | null
  treatment: string | null
  prescription: string | null
  notes: string | null
  created_at: string
  patient?: {
    name: string
    patient_id: string
  }
  staff?: {
    name: string
  }
}

interface MedicalRecordsListProps {
  filter?: "recent" | "critical"
}

export function MedicalRecordsList({ filter }: MedicalRecordsListProps) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const { t } = useLanguage()

  useEffect(() => {
    fetchRecords()
  }, [filter])

  const fetchRecords = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filter === "recent") {
        // Get records from the last 7 days
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
        params.append("after", sevenDaysAgo.toISOString())
      } else if (filter === "critical") {
        params.append("critical", "true")
      }

      const response = await fetch(`/api/medical-records?${params.toString()}`)

      if (!response.ok) {
        throw new Error("Failed to fetch medical records")
      }

      const data = await response.json()
      setRecords(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filteredRecords = records.filter((record) => {
    if (!search) return true

    const searchLower = search.toLowerCase()
    return (
      record.record_id.toLowerCase().includes(searchLower) ||
      (record.patient?.name && record.patient.name.toLowerCase().includes(searchLower)) ||
      (record.diagnosis && record.diagnosis.toLowerCase().includes(searchLower)) ||
      (record.treatment && record.treatment.toLowerCase().includes(searchLower))
    )
  })

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
        <p>Error loading medical records: {error}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={fetchRecords}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("search")} ${t("medicalRecords")}...`}
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" onClick={fetchRecords} className="ml-2">
          <RefreshCw className="h-4 w-4" />
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
                <TableHead>Record ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No medical records found
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.record_id}</TableCell>
                    <TableCell>
                      {record.patient ? (
                        <Link href={`/patients/${record.patient_id}`} className="hover:underline">
                          {record.patient.name}
                        </Link>
                      ) : (
                        `Patient #${record.patient_id}`
                      )}
                    </TableCell>
                    <TableCell>{record.staff?.name || `Staff #${record.staff_id}`}</TableCell>
                    <TableCell>{record.diagnosis || "N/A"}</TableCell>
                    <TableCell>{formatDistanceToNow(new Date(record.created_at), { addSuffix: true })}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/records/${record.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          View
                        </Link>
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
