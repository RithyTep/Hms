"use client"

import { PatientList } from "@/components/patients/patient-list"
import { useLanguage } from "@/lib/i18n/language-context"

export default function PatientsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t("patients")}</h1>
      <PatientList />
    </div>
  )
}
