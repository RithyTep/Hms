"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import useComponentRoute from "@/hooks/use-component-route"

export default function Home() {
  const router = useRouter()
  const { dashboard, login } = useComponentRoute()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (isLoggedIn) {
      router.push(dashboard)
    } else {
      router.push(login)
    }
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Redirecting...</span>
    </div>
  )
}
