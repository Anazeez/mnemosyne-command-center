"use client"

import { useEffect, useState } from "react"
import { Inbox, Layers3, Users, Workflow } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

type OverviewResponse = {
  pending_acknowledgements?: number
  recent_movement?: unknown[]
}

export function DashboardMetrics() {
  const [overview, setOverview] = useState<OverviewResponse | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadOverview() {
      try {
        const response = await fetch("/api/matrix/overview", {
          cache: "no-store",
        })

        const data: OverviewResponse = await response.json()

        if (!cancelled) {
          setOverview(response.ok ? data : null)
        }
      } catch {
        if (!cancelled) {
          setOverview(null)
        }
      }
    }

    loadOverview()

    const interval = window.setInterval(loadOverview, 30_000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  const pending = overview?.pending_acknowledgements
  const movement = overview?.recent_movement?.length

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={Users}
        label="Active specialists"
        value="Not connected"
        detail="Awaiting safe specialist-status feed"
        color="text-[#65717d]"
      />
      <MetricCard
        icon={Inbox}
        label="Awaiting acknowledgement"
        value={pending === undefined ? "Checking" : String(pending)}
        detail="Verified overview count"
        color={pending === 0 ? "text-[#5dab82]" : "text-[#d9a441]"}
      />
      <MetricCard
        icon={Workflow}
        label="Active movement"
        value={movement === undefined ? "Checking" : String(movement)}
        detail="Verified movement metadata"
        color="text-[#8f7cff]"
      />
      <MetricCard
        icon={Layers3}
        label="Indexed library chunks"
        value="Not connected"
        detail="Awaiting safe library-status feed"
        color="text-[#65717d]"
      />
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  color,
}: {
  icon: typeof Users
  label: string
  value: string
  detail: string
  color: string
}) {
  return (
    <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm text-[#9aa6b2]">{label}</span>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>

        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <p className="mt-2 text-xs leading-5 text-[#65717d]">{detail}</p>
      </CardContent>
    </Card>
  )
}