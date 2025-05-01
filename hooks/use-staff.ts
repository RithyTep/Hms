"use client"

import type { Staff } from "@/types/database.types"
import { useState, useEffect } from "react"

export function useStaff(role?: string, departmentId?: string) {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStaff() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (role) params.append("role", role)
        if (departmentId) params.append("department_id", departmentId)

        const response = await fetch(`/api/staff?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch staff")
        }

        const data = await response.json()
        setStaff(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [role, departmentId])

  return { staff, loading, error }
}
