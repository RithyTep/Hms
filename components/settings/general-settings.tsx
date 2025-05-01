"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/lib/i18n/language-context"
import { useTheme } from "next-themes"

export function GeneralSettings() {
  const [hospitalName, setHospitalName] = useState("City General Hospital")
  const [address, setAddress] = useState("123 Medical Center Blvd, Healthcare City, HC 12345")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [email, setEmail] = useState("info@citygeneralhospital.com")
  const [saving, setSaving] = useState(false)

  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()

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
        <CardTitle>{t("generalSettings")}</CardTitle>
        <CardDescription>Manage your hospital information and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="hospitalName">Hospital Name</Label>
          <Input id="hospitalName" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">{t("language")}</Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "km")}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t("english")}</SelectItem>
                <SelectItem value="km">{t("khmer")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("lightMode")}</SelectItem>
                <SelectItem value="dark">{t("darkMode")}</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
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
