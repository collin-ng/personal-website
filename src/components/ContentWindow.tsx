import type { ReactNode } from 'react'
import { TrafficLights } from './TrafficLights'

type ContentWindowProps = {
  title: string
  children: ReactNode
}

/** Nested Finder-style window that houses page content inside the outer shell. */
export function ContentWindow({ title, children }: ContentWindowProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]">
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
        <TrafficLights />
        <p className="min-w-0 truncate text-[13px] font-medium text-text-secondary">
          {title}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
        {children}
      </div>
    </div>
  )
}
