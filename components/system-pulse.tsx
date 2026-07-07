"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  Database,
  Layers3,
  Mail,
  Server,
  Wifi,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type MatrixStatus = {
  status?: string
  worker?: string
  mandates?: string
  email_route?: string
  queue_state?: string
  artifacts?: string
  matrix?: string[]
}

export function SystemPulse() {
  const [data, setData] = useState<MatrixStatus | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadStatus() {
      try {
        const response = await fetch("/api/matrix/status", {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Matrix status request failed")
        }

        const status = await response.json()

        if (!cancelled) {
          setData(status)
          setError(false)
        }
      } catch {
        if (!cancelled) {
          setError(true)
        }
      }
    }

    loadStatus()

    const interval = window.setInterval(loadStatus, 30_000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  const alive = data?.status === "alive"

  return (
    <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity
            className={`h-4 w-4 ${
              alive ? "text-[#5dab82]" : "text-[#d9a441]"
            }`}
          />
          System Pulse
        </CardTitle>

        <p className="mt-1 text-sm text-[#9aa6b2]">
          Live read-only status from the Mnemosyne Worker.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <PulseRow
          icon={Server}
          label="Worker"
          value={
            error
              ? "Unreachable"
              : data
                ? alive
                  ? "Alive"
                  : data.status || "Unknown"
                : "Checking"
          }
          tone={error ? "red" : alive ? "green" : "amber"}
        />

        <PulseRow
          icon={Database}
          label="D1 database"
          value={data?.mandates || "Checking"}
          tone={data?.mandates === "d1-enabled" ? "green" : "amber"}
        />

        <PulseRow
          icon={Mail}
          label="Email route"
          value={data?.email_route || "Checking"}
          tone={data?.email_route === "active-event-driven" ? "green" : "amber"}
        />

        <PulseRow
          icon={Wifi}
          label="Queue"
          value={data?.queue_state || "Checking"}
          tone={data?.queue_state === "buffered-pipeline-active" ? "blue" : "amber"}
        />

        <PulseRow
          icon={Layers3}
          label="Artifacts"
          value={data?.artifacts || "Checking"}
          tone={data?.artifacts === "r2-enabled" ? "green" : "amber"}
        />
      </CardContent>
    </Card>
  )
}

function PulseRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Activity
  label: string
  value: string
  tone: "green" | "blue" | "amber" | "red"
}) {
  const colors = {
    green: "bg-[#5dab82]",
    blue: "bg-[#6f9bb8]",
    amber: "bg-[#d9a441]",
    red: "bg-[#d26363]",
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-sm text-[#9aa6b2]">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>

      <span className="flex items-center gap-2 text-right text-sm">
        <span className={`h-2 w-2 rounded-full ${colors[tone]}`} />
        {value}
      </span>
    </div>
  )
}
