"use client"

import type { Department } from "@/types/database.types"
import { useState, useEffect } from "react"

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDepartments() {
      try {
        setLoading(true)
        const response = await fetch("/api/departments")

        if (!response.ok) {
          throw new Error("Failed to fetch departments")
        }

        const data = await response.json()
        setDepartments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  return { departments, loading, error }
}
