"use client"

import { AppointmentList } from "@/components/appointment-list"
import { useLanguage } from "@/lib/i18n/language-context"

export default function AppointmentsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("appointments")}</h1>
      <AppointmentList />
    </div>
  )
}
