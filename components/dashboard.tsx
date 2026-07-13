"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { TargetingBar } from "@/components/targeting-bar"
import { MetricsRow } from "@/components/metrics-row"
import { ThreatLog } from "@/components/threat-log"
import { PatchGenerator } from "@/components/patch-generator"
import { vulnerabilities } from "@/lib/vulnerabilities"

export function Dashboard() {
  const [selectedId, setSelectedId] = useState(vulnerabilities[0].id)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const selected = vulnerabilities.find((v) => v.id === selectedId) ?? vulnerabilities[0]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <AppSidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <AppSidebar />
            <button
              onClick={() => setMobileNavOpen(false)}
              className="absolute right-3 top-4 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Mobile nav trigger */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>

          <DashboardHeader />
          <TargetingBar />
          <MetricsRow />

          {/* Threat log + patch generator split */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <ThreatLog vulnerabilities={vulnerabilities} selectedId={selectedId} onSelect={setSelectedId} />
            <PatchGenerator vulnerability={selected} />
          </div>
        </div>
      </main>
    </div>
  )
}
