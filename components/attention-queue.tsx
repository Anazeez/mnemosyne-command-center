"use client"

import { useEffect, useState } from "react"

type OverviewResponse = {
  attention_count?: number
}

export function AttentionQueue() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadAttention() {
      try {
        const response = await fetch("/api/matrix/overview", {
          cache: "no-store",
        })

        const overview: OverviewResponse = await response.json()

        if (!cancelled) {
          setCount(response.ok ? overview.attention_count ?? 0 : 0)
        }
      } catch {
        if (!cancelled) {
          setCount(0)
        }
      }
    }

    loadAttention()

    const interval = window.setInterval(loadAttention, 30_000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [])

  if (count === null) {
    return <p className="text-sm text-[#9aa6b2]">Checking attention queue…</p>
  }

  if (count === 0) {
    return (
      <p className="text-sm text-[#9aa6b2]">
        No verified attention items.
      </p>
    )
  }

  return (
    <p className="text-sm text-[#9aa6b2]">
      {count} verified attention item{count === 1 ? "" : "s"} waiting.
    </p>
  )
}