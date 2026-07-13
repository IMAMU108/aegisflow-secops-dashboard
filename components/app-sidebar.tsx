"use client"

import { LayoutDashboard, ShieldCheck, History, ClipboardCheck, Settings, Radar } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Target Verification", icon: ShieldCheck, active: false },
  { label: "Scan History", icon: History, active: false },
  { label: "Compliance Audits", icon: ClipboardCheck, active: false },
  { label: "Settings", icon: Settings, active: false },
]

export function AppSidebar() {
  return (
    <aside className="flex h-full w-full flex-col border-r border-sidebar-border bg-sidebar lg:w-64">
      {/* Brand header */}
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40">
          <Radar className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <span className="text-[15px] font-bold tracking-tight text-foreground">AegisFlow SecOps</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary/15 text-primary ring-1 ring-inset ring-primary/40"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Scanner status badge */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2.5 rounded-lg bg-sidebar-accent px-3 py-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Scanner Status: <span className="text-success">Operational</span>
          </span>
        </div>
      </div>
    </aside>
  )
}
