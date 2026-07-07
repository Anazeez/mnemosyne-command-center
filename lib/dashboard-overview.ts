export type DashboardOverview = {
  generated_at: string
  worker: "alive" | "unreachable" | "unknown"
  d1: "enabled" | "disabled" | "unknown"
  queue: "active" | "inactive" | "unknown"
  email_route: "active" | "inactive" | "unknown"
  artifacts: "inline-only" | "r2-enabled" | "unknown"
  recent_movement: DashboardMovementItem[]
  pending_acknowledgements: number
  attention_count: number
}

export type DashboardMovementItem = {
  id: string
  kind: "exchange" | "mandate" | "receipt" | "system"
  title: string
  occurred_at: string
  status: "completed" | "pending" | "attention"
}