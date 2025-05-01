"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardChart } from "@/components/dashboard-chart"
import { SupabaseConnectionTest } from "@/components/supabase-connection-test"
import { DatabaseSeeder } from "@/components/database-seeder"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentPatients } from "@/components/recent-patients"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { useAuth } from "@/lib/auth/auth-context"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard")}</h1>
        <div className="text-sm text-muted-foreground">
          {t("loggedInAs")} <span className="font-medium">{user?.username}</span> ({user?.role})
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SupabaseConnectionTest />
        <DatabaseSeeder />
      </div>

      <DashboardStats />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">{t("reports")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>{t("patientStatistics")}</CardTitle>
                <CardDescription>{t("patientStatistics")}</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <DashboardChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("recentPatients")}</CardTitle>
                <CardDescription>{t("recentPatients")}</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPatients />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>{t("upcomingAppointments")}</CardTitle>
                <CardDescription>{t("upcomingAppointments")}</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingAppointments />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Hospital Resources</CardTitle>
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
