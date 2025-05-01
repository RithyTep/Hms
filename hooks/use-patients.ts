"use client"

import type { Patient } from "@/types/database.types"
import { useState, useEffect } from "react"

export function usePatients(status?: string, search?: string) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPatients() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (status) params.append("status", status)
        if (search) params.append("search", search)

        const response = await fetch(`/api/patients?${params.toString()}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed to fetch patients: ${response.status}`)
        }

        const data = await response.json()
        setPatients(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching patients:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
        setPatients([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [status, search])

  return { patients, loading, error }
}

export function usePatient(id: string) {
  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPatient() {
      try {
        setLoading(true)
        const response = await fetch(`/api/patients/${id}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `Failed to fetch patient: ${response.status}`)
        }

        const data = await response.json()
        setPatient(data)
      } catch (err) {
        console.error("Error fetching patient:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPatient()
    }
  }, [id])

  return { patient, loading, error }
}
