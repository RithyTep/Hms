"use client"

import { useState, useEffect } from "react"

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

export function useMedicalRecords(patientId?: number, after?: string, critical?: boolean) {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecords() {
      try {
        setLoading(true)
        const params = new URLSearchParams()

        if (patientId) {
          params.append("patient_id", patientId.toString())
        }

        if (after) {
          params.append("after", after)
        }

        if (critical) {
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

    fetchRecords()
  }, [patientId, after, critical])

  return { records, loading, error }
}

export function useMedicalRecord(id: string) {
  const [record, setRecord] = useState<MedicalRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRecord() {
      try {
        setLoading(true)
        const response = await fetch(`/api/medical-records/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch medical record")
        }

        const data = await response.json()
        setRecord(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecord()
    }
  }, [id])

  return { record, loading, error }
}
