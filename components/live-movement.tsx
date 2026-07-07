"use client"

import { useEffect, useState } from "react"

import type { DashboardMovementItem } from "@/lib/dashboard-overview"

type OverviewResponse = {
  recent_movement?: DashboardMovementItem[]
}

export function LiveMovement() {
  const [movement, setMovement] = useState<DashboardMovementItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadMovement() {
      try {
        const response = await fetch("/api/matrix/overview", {
          cache: "no-store",
        })

        const overview: OverviewResponse = await response.json()

        if (!cancelled) {
          setMovement(response.ok ? overview.recent_movement || [] : [])
          setLoaded(true)
        }
      } catch {
        if (!cancelled) {
          setMovement([])
          setLoaded(true)
        }
      }
    }

    loadMovement()

    const interval = window.setInterval(loadMovement, 30_000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  if (!loaded) {
    return <p className="text-sm text-[#9aa6b2]">Checking live movement…</p>
  }

  if (movement.length === 0) {
    return (
      <p className="text-sm text-[#9aa6b2]">
        No verified movement yet.
      </p>
    )
  }

  return (
    <div className="space-y-5">
      {movement.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={`mt-1.5 h-2.5 w-2.5 rounded-full ${
                event.status === "completed"
                  ? "bg-[#5dab82]"
                  : event.status === "attention"
                    ? "bg-[#d9a441]"
                    : "bg-[#6f9bb8]"
              }`}
            />

            {index < movement.length - 1 && (
              <span className="mt-2 h-10 w-px bg-[#28313c]" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#65717d]">
                {new Date(event.occurred_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <p className="text-sm font-medium">{event.title}</p>
            </div>

            <p className="mt-1 text-sm text-[#9aa6b2]">
              {event.kind}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}