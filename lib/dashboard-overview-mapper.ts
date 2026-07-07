import type { DashboardOverview } from "@/lib/dashboard-overview"

type WorkerPing = {
  status?: string
  mandates?: string
  queue_state?: string
  email_route?: string
  artifacts?: string
}

export function mapWorkerPingToOverview(
  ping: WorkerPing,
): DashboardOverview {
  return {
    generated_at: new Date().toISOString(),
    worker: ping.status === "alive" ? "alive" : "unknown",
    d1: ping.mandates === "d1-enabled" ? "enabled" : "unknown",
    queue: ping.queue_state === "buffered-pipeline-active" ? "active" : "unknown",
    email_route:
      ping.email_route === "active-event-driven" ? "active" : "unknown",
    artifacts:
      ping.artifacts === "inline-only" || ping.artifacts === "r2-enabled"
        ? ping.artifacts
        : "unknown",
    recent_movement: [],
    pending_acknowledgements: 0,
    attention_count: 0,
  }
}