import { NextResponse } from "next/server"

import { mapWorkerPingToOverview } from "@/lib/dashboard-overview-mapper"

const MATRIX_WORKER_URL = "https://mnemosyne-worker.izeesub.workers.dev"

export async function GET() {
  try {
    const response = await fetch(`${MATRIX_WORKER_URL}/ping`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    const ping = await response.json()
    const overview = mapWorkerPingToOverview(ping)

    return NextResponse.json(overview, {
      status: response.status,
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json(
      {
        generated_at: new Date().toISOString(),
        worker: "unreachable",
        d1: "unknown",
        queue: "unknown",
        email_route: "unknown",
        artifacts: "unknown",
        recent_movement: [],
        pending_acknowledgements: 0,
        attention_count: 0,
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    )
  }
}