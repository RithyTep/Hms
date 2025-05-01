"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Eye, EyeOff, Lock, User } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/i18n/language-context"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    if (isLoggedIn) {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check for hardcoded admin credentials
    if (username === "AdminRithy" && password === "1234qwer") {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store login state in localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("user", JSON.stringify({ username, role: "admin" }))

      toast({
        title: t("loginSuccessful"),
        description: t("welcomeBack") + ", AdminRithy!",
      })

      router.push("/")
    } else {
      setIsLoading(false)
      toast({
        title: t("loginFailed"),
        description: t("invalidCredentials"),
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return null // Don't render anything until we check authentication
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-200 opacity-20"></div>
        <div className="animate-float-delay absolute top-1/4 right-10 h-64 w-64 rounded-full bg-indigo-200 opacity-20"></div>
        <div className="animate-float-slow absolute bottom-10 left-1/4 h-52 w-52 rounded-full bg-purple-200 opacity-20"></div>
        <div className="animate-pulse absolute top-1/3 left-1/3 h-20 w-20 rounded-full bg-pink-200 opacity-20"></div>
        <div className="animate-float-slow absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-200 opacity-20"></div>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Activity className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">{t("hospitalManagementSystem")}</CardTitle>
          <CardDescription className="text-base">{t("loginDescription")}</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder={t("enterUsername")}
                  className="pl-9"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("enterPassword")}
                  className="pl-9 pr-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{t("togglePasswordVisibility")}</span>
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("loggingIn") : t("login")}
            </Button>
            <p className="text-center text-sm text-muted-foreground">{t("adminCredentials")}: AdminRithy / 1234qwer</p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
