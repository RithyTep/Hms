"use client"

import type { Appointment } from "@/types/database.types"
import { useState, useEffect } from "react"

export function useAppointments(date?: string, status?: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAppointments() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (date) params.append("date", date)
        if (status) params.append("status", status)

        const response = await fetch(`/api/appointments?${params.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch appointments")
        }

        const data = await response.json()
        setAppointments(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setAppointments([]) // Set empty array on error
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [date, status])

  return { appointments, loading, error }
}

export function useAppointment(id: string) {
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAppointment() {
      try {
        setLoading(true)
        const response = await fetch(`/api/appointments/${id}`)

        if (!response.ok) {
          throw new Error("Failed to fetch appointment")
        }

        const data = await response.json()
        setAppointment(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchAppointment()
    }
  }, [id])

  return { appointment, loading, error }
}
