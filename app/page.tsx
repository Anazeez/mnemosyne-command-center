import type { ElementType } from "react"
import {
  Activity,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  Inbox,
  Layers3,
  Menu,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SystemPulse } from "@/components/system-pulse"

const navItems = [
  { label: "Overview", icon: Activity, active: true },
  { label: "Well", icon: Database },
  { label: "Library", icon: BookOpen },
  { label: "Specialists", icon: Users },
  { label: "Exchanges", icon: Send },
  { label: "Tasks", icon: CheckCircle2 },
  { label: "History", icon: Clock3 },
]

const movement = [
  {
    time: "19:01",
    title: "Haava acknowledged visualization skill handoff",
    detail: "Receipt created for Savae dispatch",
    tone: "green",
  },
  {
    time: "18:58",
    title: "Savae dispatched a source-bound packet",
    detail: "Recipient: Haava · Payload: inline",
    tone: "blue",
  },
  {
    time: "18:42",
    title: "Library ingestion completed",
    detail: "8 movement and interaction chunks indexed",
    tone: "green",
  },
  {
    time: "18:30",
    title: "Well source chunks selected",
    detail: "Targeted visualization guidance prepared",
    tone: "gray",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d10] text-[#edeef0]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-[#28313c] bg-[#0f1318] px-5 py-6 lg:flex lg:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#75868a]/40 bg-[#181e26] text-sm font-semibold text-white">
              M
            </div>

            <div>
              <p className="text-sm font-semibold tracking-wide">Mnemosyne</p>
              <p className="text-xs text-[#9aa6b2]">Command Center</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  active
                    ? "bg-[#181e26] text-white ring-1 ring-[#75868a]/25"
                    : "text-[#9aa6b2] hover:bg-[#181e26] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <Separator className="mb-5 bg-[#28313c]" />

            <div className="rounded-2xl border border-[#28313c] bg-[#12161c] p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#5dab82]" />
                <span className="text-sm font-medium">System healthy</span>
              </div>

              <p className="text-xs leading-5 text-[#9aa6b2]">
                Worker online. D1 connected. Queue pipeline active.
              </p>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#28313c] px-5 py-4 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden items-center gap-2 rounded-xl border border-[#28313c] bg-[#12161c] px-3 py-2 text-sm text-[#65717d] md:flex">
                <Search className="h-4 w-4" />
                Search Matrix
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="border border-[#5dab82]/30 bg-[#5dab82]/10 text-[#8cd5a9] hover:bg-[#5dab82]/10">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#5dab82]" />
                System alive
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl border border-[#28313c] bg-[#12161c]"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </Button>

              <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-[#75868a] text-xs font-semibold text-[#0b0d10] sm:flex">
                AZ
              </div>
            </div>
          </header>

          <div className="flex-1 px-5 py-7 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-sm text-[#9aa6b2]">
                    <Sparkles className="h-4 w-4 text-[#8f7cff]" />
                    Project Mnemosyne
                  </p>

                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Good evening, Architectus.
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#9aa6b2]">
                    Your Matrix is healthy. One item is waiting on your decision,
                    and recent specialist activity is fully acknowledged.
                  </p>
                </div>

                <Button className="rounded-xl bg-[#edeef0] px-5 text-[#0b0d10] hover:bg-white">
                  Open attention queue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard
                  icon={Users}
                  label="Active specialists"
                  value="3 / 4"
                  detail="Haava, Savae, Hearken"
                  color="text-[#6f9bb8]"
                />
                <MetricCard
                  icon={Inbox}
                  label="Awaiting acknowledgement"
                  value="0"
                  detail="All current exchanges receipted"
                  color="text-[#5dab82]"
                />
                <MetricCard
                  icon={Workflow}
                  label="Active movement"
                  value="2"
                  detail="Library and task flow running"
                  color="text-[#8f7cff]"
                />
                <MetricCard
                  icon={Layers3}
                  label="Indexed library chunks"
                  value="17"
                  detail="Haava visualization foundation"
                  color="text-[#d9a441]"
                />
              </div>

              <div className="mt-7 grid gap-7 xl:grid-cols-[1.3fr_0.7fr]">
                <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-lg">Attention Queue</CardTitle>
                      <p className="mt-1 text-sm text-[#9aa6b2]">
                        Only items that need your decision or intervention.
                      </p>
                    </div>

                    <Badge className="border border-[#d9a441]/30 bg-[#d9a441]/10 text-[#e8bd65] hover:bg-[#d9a441]/10">
                      1 waiting
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <AttentionItem
                      icon={Clock3}
                      title="Upload Haava’s second book"
                      detail="The specialized source PDF is still needed in /input."
                      action="Open Well"
                      tone="amber"
                    />
                    <AttentionItem
                      icon={CheckCircle2}
                      title="Haava library proof completed"
                      detail="Source-bound retrieval and evidence-backed reasoning are working."
                      action="View proof"
                      tone="green"
                    />
                    <AttentionItem
                      icon={FileText}
                      title="Command Center frontend initialized"
                      detail="Next.js, Tailwind, and shadcn/ui are ready for build."
                      action="Continue build"
                      tone="blue"
                    />
                  </CardContent>
                </Card>
                <SystemPulse />
              </div>

              <div className="mt-7 grid gap-7 xl:grid-cols-[1.3fr_0.7fr]">
                <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Live Movement</CardTitle>
                    <p className="mt-1 text-sm text-[#9aa6b2]">
                      Governed activity across the Matrix.
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-5">
                      {movement.map((event, index) => (
                        <div key={event.title} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span
                              className={`mt-1.5 h-2.5 w-2.5 rounded-full ${
                                event.tone === "green"
                                  ? "bg-[#5dab82]"
                                  : event.tone === "blue"
                                    ? "bg-[#6f9bb8]"
                                    : "bg-[#66717d]"
                              }`}
                            />

                            {index < movement.length - 1 && (
                              <span className="mt-2 h-10 w-px bg-[#28313c]" />
                            )}
                          </div>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs text-[#65717d]">
                                {event.time}
                              </span>
                              <p className="text-sm font-medium">{event.title}</p>
                            </div>

                            <p className="mt-1 text-sm text-[#9aa6b2]">
                              {event.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Latest Proof</CardTitle>
                    <p className="mt-1 text-sm text-[#9aa6b2]">
                      Receipts and source-bound outcomes.
                    </p>
                  </CardHeader>

                  <CardContent>
                    <div className="rounded-2xl border border-[#5dab82]/25 bg-[#5dab82]/5 p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#5dab82]" />
                        <span className="text-sm font-medium text-[#c8efd6]">
                          Exchange acknowledged
                        </span>
                      </div>

                      <p className="text-sm leading-6 text-[#9aa6b2]">
                        Haava received and acknowledged a source-bound skill
                        handoff from Savae.
                      </p>

                      <Separator className="my-4 bg-[#28313c]" />

                      <div className="space-y-2 font-mono text-[11px] text-[#9aa6b2]">
                        <p>EXCHANGE · 6757a675-21b3-43eb-879a-950264aa4ada</p>
                        <p>RECEIPT · e37fca17-17f9-449d-9c72-f8d28800811d</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-7">
                <Card className="border-[#28313c] bg-[#12161c] text-[#edeef0] shadow-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Specialist Field</CardTitle>
                    <p className="mt-1 text-sm text-[#9aa6b2]">
                      Current specialist availability and recent outcomes.
                    </p>
                  </CardHeader>

                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <SpecialistCard
                      name="Haava"
                      role="Visualization specialist"
                      status="Available"
                      detail="17 library chunks · evidence-grounded reasoning active"
                      tone="green"
                    />
                    <SpecialistCard
                      name="Savae"
                      role="Orchestrator"
                      status="Operational"
                      detail="Dispatch, inbox, history, and routing authority"
                      tone="blue"
                    />
                    <SpecialistCard
                      name="Hearken"
                      role="Systems architect"
                      status="Building"
                      detail="Command Center frontend architecture in progress"
                      tone="violet"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  color,
}: {
  icon: ElementType
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

function AttentionItem({
  icon: Icon,
  title,
  detail,
  action,
  tone,
}: {
  icon: ElementType
  title: string
  detail: string
  action: string
  tone: "amber" | "green" | "blue"
}) {
  const styles = {
    amber: "border-[#d9a441]/30 bg-[#d9a441]/10 text-[#e8bd65]",
    green: "border-[#5dab82]/30 bg-[#5dab82]/10 text-[#8cd5a9]",
    blue: "border-[#6f9bb8]/30 bg-[#6f9bb8]/10 text-[#a6cce5]",
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#28313c] bg-[#0f1318] p-4 sm:flex-row sm:items-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles[tone]}`}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-sm text-[#9aa6b2]">{detail}</p>
      </div>

      <Button
        variant="ghost"
        className="justify-start text-sm text-[#edeef0] hover:bg-[#181e26] sm:justify-center"
      >
        {action}
        <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  )
}

function PulseRow({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: "green" | "blue" | "amber"
}) {
  const colors = {
    green: "bg-[#5dab82]",
    blue: "bg-[#6f9bb8]",
    amber: "bg-[#d9a441]",
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#9aa6b2]">{label}</span>

      <span className="flex items-center gap-2 text-sm">
        <span className={`h-2 w-2 rounded-full ${colors[tone]}`} />
        {value}
      </span>
    </div>
  )
}

function SpecialistCard({
  name,
  role,
  status,
  detail,
  tone,
}: {
  name: string
  role: string
  status: string
  detail: string
  tone: "green" | "blue" | "violet"
}) {
  const colors = {
    green: "bg-[#5dab82]",
    blue: "bg-[#6f9bb8]",
    violet: "bg-[#8f7cff]",
  }

  return (
    <div className="rounded-2xl border border-[#28313c] bg-[#0f1318] p-5">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-base font-semibold">{name}</p>
          <p className="mt-1 text-xs text-[#9aa6b2]">{role}</p>
        </div>

        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${colors[tone]}`} />
      </div>

      <Badge className="border border-[#28313c] bg-[#181e26] text-[#c9d1d9] hover:bg-[#181e26]">
        {status}
      </Badge>

      <p className="mt-4 text-sm leading-6 text-[#9aa6b2]">{detail}</p>
    </div>
  )
}