"use client"

import type { ReactNode } from "react"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface CustomErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function CustomErrorBoundary({ children, fallback }: CustomErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-4 space-y-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
              <div>
                <p className="text-sm font-medium">Something went wrong</p>
                <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
              </div>
              <Button variant="outline" size="sm" onClick={resetErrorBoundary}>
                Try again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    >
      {children}
    </ReactErrorBoundary>
  )
}
