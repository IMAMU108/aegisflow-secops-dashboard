"use client"

import { FileText, Plus } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Security Operations Command
        </h1>
        <p className="text-pretty text-sm text-muted-foreground">
          Real-time dynamic vulnerability assessment and vulnerability indexing.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">
          <FileText className="h-4 w-4" aria-hidden="true" />
          Export PDF Audit Report
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_-4px_rgba(0,102,255,0.6)] transition-colors hover:bg-primary/90">
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Scan
        </button>
      </div>
    </header>
  )
}
