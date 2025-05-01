"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      try {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
        const storedUser = localStorage.getItem("user")

        if (isLoggedIn && storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Failed to parse user data:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("isLoggedIn")
      } finally {
        setIsLoading(false)
      }
    } else {
      // We're on the server, so we can't check localStorage
      setIsLoading(false)
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    if (username && password) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData = { username, role: "admin" }
      setUser(userData)

      // Only set localStorage if we're in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("user", JSON.stringify(userData))
      }

      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)

    // Only clear localStorage if we're in the browser
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("user")
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
