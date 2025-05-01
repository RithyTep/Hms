"use client"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Apr 1", admissions: 24, discharges: 18 },
  { date: "Apr 5", admissions: 30, discharges: 26 },
  { date: "Apr 10", admissions: 42, discharges: 36 },
  { date: "Apr 15", admissions: 35, discharges: 40 },
  { date: "Apr 20", admissions: 28, discharges: 30 },
  { date: "Apr 25", admissions: 32, discharges: 28 },
  { date: "Apr 30", admissions: 38, discharges: 34 },
]

export function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="admissions" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="discharges" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
