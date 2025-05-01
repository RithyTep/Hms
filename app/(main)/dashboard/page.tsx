"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardChart } from "@/components/dashboard-chart"
import { RecentPatients } from "@/components/recent-patients"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { useLanguage } from "@/lib/i18n/language-context"
import { CustomErrorBoundary } from "@/components/custom-error-boundary"

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("dashboard")}</h1>

      <CustomErrorBoundary>
        <DashboardStats />
      </CustomErrorBoundary>

      <div className="grid gap-6 md:grid-cols-2">
        <CustomErrorBoundary>
          <DashboardChart />
        </CustomErrorBoundary>

        <div className="space-y-6">
          <CustomErrorBoundary>
            <RecentPatients />
          </CustomErrorBoundary>

          <CustomErrorBoundary>
            <UpcomingAppointments />
          </CustomErrorBoundary>
        </div>
      </div>
    </div>
  )
}
