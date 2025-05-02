"use client"

import type React from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth/auth-context"
import { Loader2 } from "lucide-react"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Only run on client side and after initial loading
    if (mounted && !isLoading) {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      if (!isLoggedIn && !user) {
        router.push("/login")
      }
    }
  }, [mounted, isLoading, user, router])

  // Don't render anything until we've checked authentication
  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not authenticated, don't render the dashboard layout
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Redirecting to login...</span>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col md:overflow-y-auto">
        <Header />
        <main className="flex-grow p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
