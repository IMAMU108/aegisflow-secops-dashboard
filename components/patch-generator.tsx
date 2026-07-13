"use client"

import { useState } from "react"
import { Wand2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Vulnerability } from "@/lib/vulnerabilities"

type Tab = "node" | "laravel"

const tabs: { key: Tab; label: string }[] = [
  { key: "node", label: "Node.js (Express)" },
  { key: "laravel", label: "Laravel (PHP)" },
]

// Lightweight token highlighter for display purposes.
function highlight(line: string) {
  const keyword =
    /\b(import|from|export|const|let|return|async|await|function|new|if|else|public|use|Route|response|res|req|null|true|false)\b/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  // strings first
  const stringRegex = /(["'`])(?:\\.|(?!\1).)*\1/g
  const segments: { start: number; end: number; type: "string" }[] = []
  while ((match = stringRegex.exec(line))) {
    segments.push({ start: match.index, end: match.index + match[0].length, type: "string" })
  }

  const renderPlain = (text: string) => {
    const out: React.ReactNode[] = []
    let idx = 0
    let m: RegExpExecArray | null
    const kw = new RegExp(keyword)
    while ((m = kw.exec(text))) {
      if (m.index > idx) out.push(text.slice(idx, m.index))
      out.push(
        <span key={`k${key++}`} className="text-primary">
          {m[0]}
        </span>,
      )
      idx = m.index + m[0].length
    }
    if (idx < text.length) out.push(text.slice(idx))
    return out
  }

  if (segments.length === 0) return renderPlain(line)

  segments.forEach((seg) => {
    if (seg.start > lastIndex) parts.push(...renderPlain(line.slice(lastIndex, seg.start)))
    parts.push(
      <span key={`s${key++}`} className="text-success">
        {line.slice(seg.start, seg.end)}
      </span>,
    )
    lastIndex = seg.end
  })
  if (lastIndex < line.length) parts.push(...renderPlain(line.slice(lastIndex)))
  return parts
}

export function PatchGenerator({ vulnerability }: { vulnerability: Vulnerability }) {
  const [tab, setTab] = useState<Tab>("node")
  const [copied, setCopied] = useState(false)

  const code = vulnerability.patches[tab]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section className="flex h-full flex-col rounded-xl border border-border bg-card" aria-label="Patch recipe generator">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <Wand2 className="h-4 w-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-foreground">Instant Patch Recipe Generator</h2>
      </div>

      {/* Selected vulnerability context */}
      <div className="border-b border-border px-5 py-3">
        <p className="text-xs font-medium text-muted-foreground">Patching</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{vulnerability.name}</p>
        <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">{vulnerability.summary}</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border px-3 pt-3" role="tablist" aria-label="Language">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "-mb-px rounded-t-md border-b-2 px-3.5 py-2 text-xs font-medium transition-colors",
              tab === t.key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="relative flex-1 overflow-hidden">
        <button
          onClick={copy}
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="h-full max-h-[420px] overflow-auto bg-background/60 p-4 font-mono text-xs leading-relaxed">
          <code className="block">
            {code.split("\n").map((line, i) => (
              <span key={i} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="select-none text-right text-muted-foreground/50">{i + 1}</span>
                <span className="whitespace-pre text-foreground/90">{highlight(line) as React.ReactNode}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </section>
  )
}
