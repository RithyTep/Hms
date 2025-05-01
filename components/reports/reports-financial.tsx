"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, FileDown, FileIcon as FilePdf, FileSpreadsheet } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/language-context"

export function ReportsFinancial() {
  const [date, setDate] = useState<Date>()
  const [reportType, setReportType] = useState("revenue")
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Reports</CardTitle>
        <CardDescription>Generate reports about hospital finances and revenue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Revenue Report</SelectItem>
                <SelectItem value="expenses">Expenses Report</SelectItem>
                <SelectItem value="billing">Billing Summary</SelectItem>
                <SelectItem value="insurance">Insurance Claims</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Export Format</label>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <FilePdf className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button variant="outline" className="flex-1">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Select report parameters to generate a preview</p>
            <Button>
              <FileDown className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
