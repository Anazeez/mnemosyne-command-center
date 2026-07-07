"use client"

import { useEffect, useState } from "react"

type OverviewStatus = {
  worker?: "alive" | "unreachable" | "unknown"
}

export function SystemStatusBadge() {
  const [worker, setWorker] = useState<OverviewStatus["worker"]>("unknown")

  useEffect(() => {
    let cancelled = false

    async function loadOverview() {
      try {
        const response = await fetch("/api/matrix/overview", {
          cache: "no-store",
        })

        const overview = await response.json()

        if (!cancelled) {
          setWorker(response.ok ? overview.worker : "unreachable")
        }
      } catch {
        if (!cancelled) {
          setWorker("unreachable")
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

  const alive = worker === "alive"
  const label = alive ? "System alive" : worker === "unreachable" ? "System unreachable" : "Checking system"

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
        alive
          ? "border-[#5dab82]/30 bg-[#5dab82]/10 text-[#8cd5a9]"
          : "border-[#d9a441]/30 bg-[#d9a441]/10 text-[#f0c978]"
      }`}
    >
      <span
        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
          alive ? "bg-[#5dab82]" : "bg-[#d9a441]"
        }`}
      />
      {label}
    </span>
  )
}