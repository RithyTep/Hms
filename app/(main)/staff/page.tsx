"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export default function StaffPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("staff")}</h1>
      {/* Staff list component would go here */}
    </div>
  )
}
