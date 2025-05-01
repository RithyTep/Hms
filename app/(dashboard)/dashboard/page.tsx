"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardChart } from "@/components/dashboard-chart"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentPatients } from "@/components/recent-patients"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { useAuth } from "@/lib/auth/auth-context"
import { useLanguage } from "@/lib/i18n/language-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, FileText, Users } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const quickAccessItems = [
    {
      title: t("patients"),
      description: t("managePatients"),
      icon: Users,
      href: "/patients",
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-500 dark:text-blue-400",
    },
    {
      title: t("appointments"),
      description: t("scheduleAppointments"),
      icon: Calendar,
      href: "/appointments",
      color: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-500 dark:text-green-400",
    },
    {
      title: t("medicalRecords"),
      description: t("viewMedicalRecords"),
      icon: FileText,
      href: "/records",
      color: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-500 dark:text-purple-400",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
          <p className="text-muted-foreground mt-1">
            {t("welcomeMessage")}, <span className="font-medium">{user?.username}</span>
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString(t("language") === "en" ? "en-US" : "km-KH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {quickAccessItems.map((item) => (
          <Card
            key={item.title}
            className={`${item.color} border-none hover:shadow-md transition-all cursor-pointer`}
            onClick={() => router.push(item.href)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-50" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardStats />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/60 p-1">
          <TabsTrigger value="overview" className="rounded-md">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-md">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-md">
            {t("reports")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t("patientStatistics")}</CardTitle>
                <CardDescription>{t("admissionsAndDischarges")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t("recentPatients")}</CardTitle>
                <CardDescription>{t("newlyRegisteredPatients")}</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPatients />
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.push("/patients")}>
                  {t("viewAllPatients")}
                </Button>
              </div>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{t("upcomingAppointments")}</CardTitle>
                <CardDescription>{t("todaysSchedule")}</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingAppointments />
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" onClick={() => router.push("/appointments")}>
                  {t("viewAllAppointments")}
                </Button>
              </div>
            </Card>
            <Card className="col-span-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hospital Resources</CardTitle>
                <CardDescription>Current resource allocation and availability</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
                <p className="text-muted-foreground">Resource allocation data will appear here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed hospital performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground">Advanced analytics content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("generateReport")}</CardTitle>
              <CardDescription>Access and download hospital reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <p className="text-muted-foreground">Reports content will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
