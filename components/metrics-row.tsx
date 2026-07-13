"use client"

import { AlertOctagon, Timer, ShieldCheck, CheckCircle2 } from "lucide-react"

function MetricCard({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function MetricsRow() {
  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      aria-label="Executive analytics metrics"
    >
      {/* Critical Vulnerabilities */}
      <MetricCard label="Critical Vulnerabilities" icon={<AlertOctagon className="h-4 w-4 text-critical" />}>
        <div className="text-4xl font-bold tabular-nums text-critical">04</div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-critical">+1 detected</span> 12m ago
        </p>
      </MetricCard>

      {/* Average Remediation Time */}
      <MetricCard label="Avg. Remediation Time" icon={<Timer className="h-4 w-4 text-primary" />}>
        <div className="flex items-end justify-between gap-3">
          <div className="text-4xl font-bold text-foreground">
            18<span className="ml-1 text-lg font-medium text-muted-foreground">Mins</span>
          </div>
          <svg viewBox="0 0 80 32" className="h-8 w-20 shrink-0" aria-hidden="true">
            <polyline
              points="0,26 12,20 24,24 36,14 48,17 60,8 72,10 80,4"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-1.5 text-xs text-success">↓ 32% faster this week</p>
      </MetricCard>

      {/* Total Assets Verified */}
      <MetricCard label="Total Assets Verified" icon={<ShieldCheck className="h-4 w-4 text-success" />}>
        <div className="text-4xl font-bold text-foreground">12</div>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-success" aria-hidden="true" />
          Production Domains — ownership validated
        </p>
      </MetricCard>

      {/* NDPA Compliance Score */}
      <MetricCard label="NDPA Compliance Score" icon={<CheckCircle2 className="h-4 w-4 text-success" />}>
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--secondary)" strokeWidth="4" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="var(--success)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="97.4"
                strokeDashoffset="7.8"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-success">
              92%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Meets national data protection thresholds.</p>
        </div>
      </MetricCard>
    </section>
  )
}
