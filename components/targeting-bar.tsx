"use client"

import { Search, Crosshair } from "lucide-react"

export function TargetingBar() {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6" aria-label="Active target scanning">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Crosshair className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        Active Targeting
      </div>

      {/* URL input */}
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="url"
            defaultValue="https://target-app-sandbox.net"
            aria-label="Target URL"
            className="w-full rounded-lg border border-input bg-background py-3 pl-11 pr-4 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          Scan Target
        </button>
      </div>

      {/* Scanning simulation */}
      <div className="mt-5 flex items-center gap-4">
        {/* Pulsing ring */}
        <div className="relative h-11 w-11 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 rounded-full border-2 border-primary/30" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary [animation-duration:0.9s]" />
          <span className="absolute inset-0 animate-ping rounded-full border border-primary/40 [animation-duration:1.6s]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">64% Analysing Target Vectors...</span>
            <span className="font-mono text-muted-foreground">64%</span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuenow={64}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="relative h-full rounded-full bg-primary transition-all"
              style={{ width: "64%" }}
            >
              <span className="absolute inset-0 animate-pulse rounded-full bg-primary/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Log line */}
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-background px-3.5 py-2.5 font-mono text-xs">
        <span className="mt-px shrink-0 rounded bg-primary/15 px-1.5 py-0.5 font-semibold text-primary">
          RUNNING
        </span>
        <span className="text-muted-foreground">
          Active Fuzzing: Testing SQL Injection reflection vectors on{" "}
          <span className="text-warning">/api/v1/auth/login</span>
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-primary" aria-hidden="true" />
        </span>
      </div>
    </section>
  )
}
