"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export default function RecordsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("medicalRecords")}</h1>
      {/* Medical records list component would go here */}
    </div>
  )
}
