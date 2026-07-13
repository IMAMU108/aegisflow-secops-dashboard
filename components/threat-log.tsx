"use client"

import { Activity, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Severity, Vulnerability } from "@/lib/vulnerabilities"

const severityStyles: Record<Severity, string> = {
  Critical: "bg-critical/15 text-critical ring-critical/40",
  High: "bg-warning/15 text-warning ring-warning/40",
  Medium: "bg-warning/15 text-warning ring-warning/40",
  Low: "bg-muted text-muted-foreground ring-border",
}

export function ThreatLog({
  vulnerabilities,
  selectedId,
  onSelect,
}: {
  vulnerabilities: Vulnerability[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <section className="rounded-xl border border-border bg-card" aria-label="Live threat assessment log">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <Activity className="h-4 w-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-foreground">Live Threat Assessment Log</h2>
        <span className="ml-auto rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {vulnerabilities.length} findings
        </span>
      </div>

      {/* Column headers (md+) */}
      <div className="hidden grid-cols-[1fr_auto_1.1fr_auto] gap-4 border-b border-border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
        <span>Vulnerability</span>
        <span>Status</span>
        <span>Path</span>
        <span className="text-right">Target</span>
      </div>

      <ul className="divide-y divide-border">
        {vulnerabilities.map((v) => {
          const active = v.id === selectedId
          return (
            <li key={v.id}>
              <button
                onClick={() => onSelect(v.id)}
                aria-pressed={active}
                className={cn(
                  "grid w-full grid-cols-1 items-center gap-x-4 gap-y-2 px-5 py-4 text-left transition-colors md:grid-cols-[1fr_auto_1.1fr_auto]",
                  active ? "bg-primary/10" : "hover:bg-secondary/60",
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.cwe}</p>
                  </div>
                </div>

                <span
                  className={cn(
                    "inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
                    severityStyles[v.severity],
                  )}
                >
                  {v.severity}
                </span>

                <code className="truncate font-mono text-xs text-muted-foreground">{v.path}</code>

                <span className="text-xs text-muted-foreground md:text-right">{v.target}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
