"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const testConnection = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/test-connection")
      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage("Successfully connected to Supabase!")
      } else {
        setStatus("error")
        setMessage(`Failed to connect: ${data.error}`)
      }
    } catch (error) {
      setStatus("error")
      setMessage(`Error testing connection: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supabase Connection Status</CardTitle>
        <CardDescription>Testing connection to your Supabase database</CardDescription>
      </CardHeader>
      <CardContent>
        {status === "loading" ? (
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <p>Testing connection...</p>
          </div>
        ) : status === "success" ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Connected</AlertTitle>
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
        ) : (
          <Alert className="bg-red-50 border-red-200">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Connection Error</AlertTitle>
            <AlertDescription className="text-red-700">{message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={testConnection} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Connection
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
