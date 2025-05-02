"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Activity,
  Calendar,
  FileText,
  LayoutDashboard,
  Pill,
  Settings,
  Users,
  CreditCard,
  BarChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const router = useRouter()

  const routes = [
    {
      label: t("dashboard"),
      icon: LayoutDashboard,
      href: "/",
      active: pathname === "/dashboard",
    },
    {
      label: t("patients"),
      icon: Users,
      href: "/dashboard/patients",
      active: pathname === "/dashboard/patients" || pathname.startsWith("/dashboard/patients/"),
    },
    {
      label: t("appointments"),
      icon: Calendar,
      href: "/dashboard/appointments",
      active: pathname === "/dashboard/appointments" || pathname.startsWith("/dashboard/appointments/"),
    },
    {
      label: t("staff"),
      icon: Users,
      href: "/dashboard/staff",
      active: pathname === "/dashboard/staff" || pathname.startsWith("/dashboard/staff/"),
    },
    {
      label: t("medicalRecords"),
      icon: FileText,
      href: "/dashboard/records",
      active: pathname === "/dashboard/records" || pathname.startsWith("/dashboard/records/"),
    },
    {
      label: t("pharmacy"),
      icon: Pill,
      href: "/dashboard/pharmacy",
      active: pathname === "/dashboard/pharmacy" || pathname.startsWith("/dashboard/pharmacy/"),
    },
    {
      label: t("billing"),
      icon: CreditCard,
      href: "/dashboard/billing",
      active: pathname === "/dashboard/billing" || pathname.startsWith("/dashboard/billing/"),
    },
    {
      label: t("reports"),
      icon: BarChart,
      href: "/dashboard/reports",
      active: pathname === "/dashboard/reports" || pathname.startsWith("/dashboard/reports/"),
    },
    {
      label: t("settings"),
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings" || pathname.startsWith("/dashboard/settings/"),
    },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="flex h-14 items-center border-b px-4">
        <div onClick={() => router.push("/dashboard")} className="flex items-center gap-2 font-semibold cursor-pointer">
          <Activity className="h-6 w-6 text-primary" />
          <span>{t("appName")}</span>
        </div>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "secondary" : "ghost"}
              size="sm"
              className={cn("justify-start gap-2 px-3", route.active && "font-semibold")}
              onClick={() => handleNavigation(route.href)}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
