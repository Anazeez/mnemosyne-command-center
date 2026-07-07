import { NextResponse } from "next/server"

const MATRIX_WORKER_URL = "https://mnemosyne-worker.izeesub.workers.dev"

export async function GET() {
  try {
    const response = await fetch(`${MATRIX_WORKER_URL}/ping`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    })

    const data = await response.json()

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return NextResponse.json(
      {
        status: "unreachable",
        error: "Mnemosyne Worker could not be reached.",
      },
      { status: 502 }
    )
  }
}
