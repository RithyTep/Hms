"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePatients } from "@/hooks/use-patients"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, RefreshCw } from "lucide-react"
import Link from "next/link"

interface PatientListProps {
  initialStatus?: string
}

export function PatientList({ initialStatus }: PatientListProps) {
  const [status, setStatus] = useState<string | undefined>(initialStatus)
  const [search, setSearch] = useState<string>("")
  const { patients, loading, error } = usePatients(status, search)
  const [refreshKey, setRefreshKey] = useState(0)

  // Force refresh function
  const refreshData = () => {
    setRefreshKey((prev) => prev + 1)
  }

  // Effect to update status when initialStatus changes
  useEffect(() => {
    setStatus(initialStatus)
  }, [initialStatus])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-800 rounded-md">
        <p>Error loading patients: {error}</p>
        <Button variant="outline" size="sm" className="mt-2" onClick={refreshData}>
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
            placeholder="Search patients..."
            className="w-full pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" size="icon" onClick={refreshData} className="ml-2">
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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No patients found
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.patient_id}</TableCell>
                    <TableCell>
                      <Link href={`/patients/${patient.id}`} className="hover:underline">
                        {patient.name}
                      </Link>
                    </TableCell>
                    <TableCell>{patient.gender || "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          patient.status === "Critical"
                            ? "destructive"
                            : patient.status === "Active"
                              ? "default"
                              : "outline"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{patient.phone || "N/A"}</TableCell>
                    <TableCell>{patient.email || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/patients/${patient.id}`}>View</Link>
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
