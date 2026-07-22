import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAncestorIds, navTree } from '../data/nav'
import { SidebarItem } from './SidebarItem'

type SidebarProps = {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const { pathname } = useLocation()
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(getAncestorIds(pathname)),
  )

  useEffect(() => {
    const ancestors = getAncestorIds(pathname)
    if (ancestors.length === 0) return
    setExpandedIds((prev) => {
      const next = new Set(prev)
      let changed = false
      for (const id of ancestors) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [pathname])

  function handleToggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <nav className="flex h-full flex-col bg-bg-sidebar" aria-label="Site">
      <div className="px-3 pt-4 pb-2">
        <p className="px-2 text-[11px] font-medium tracking-wide text-text-secondary uppercase">
          Favourites
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {navTree.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            expandedIds={expandedIds}
            onToggle={handleToggle}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  )
}
