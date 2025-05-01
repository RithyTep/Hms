"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/i18n/language-context"

export function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [browserNotifications, setBrowserNotifications] = useState(true)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [systemUpdates, setSystemUpdates] = useState(true)
  const [patientAdmissions, setPatientAdmissions] = useState(false)
  const [saving, setSaving] = useState(false)
  const { t } = useLanguage()

  const handleSave = () => {
    setSaving(true)
    // Simulate API call
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("notificationSettings")}</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Channels</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch id="emailNotifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
            </div>
            <Switch id="smsNotifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="browserNotifications">Browser Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
            </div>
            <Switch
              id="browserNotifications"
              checked={browserNotifications}
              onCheckedChange={setBrowserNotifications}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Types</h3>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="appointmentReminders">Appointment Reminders</Label>
              <p className="text-sm text-muted-foreground">Get notified about upcoming appointments</p>
            </div>
            <Switch
              id="appointmentReminders"
              checked={appointmentReminders}
              onCheckedChange={setAppointmentReminders}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="systemUpdates">System Updates</Label>
              <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
            </div>
            <Switch id="systemUpdates" checked={systemUpdates} onCheckedChange={setSystemUpdates} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="patientAdmissions">Patient Admissions</Label>
              <p className="text-sm text-muted-foreground">Get notified about new patient admissions</p>
            </div>
            <Switch id="patientAdmissions" checked={patientAdmissions} onCheckedChange={setPatientAdmissions} />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : t("save")}
        </Button>
      </CardFooter>
    </Card>
  )
}
