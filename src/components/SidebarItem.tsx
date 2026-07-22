import { NavLink } from 'react-router-dom'
import type { NavItem } from '../data/nav'

type SidebarItemProps = {
  item: NavItem
  depth?: number
  expandedIds: Set<string>
  onToggle: (id: string) => void
  onNavigate?: () => void
}

export function SidebarItem({
  item,
  depth = 0,
  expandedIds,
  onToggle,
  onNavigate,
}: SidebarItemProps) {
  const isFolder = Boolean(item.children?.length)
  const isExpanded = expandedIds.has(item.id)
  const paddingLeft = 8 + depth * 16

  if (isFolder) {
    return (
      <div>
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className="flex h-9 w-full items-center gap-2 rounded-[11px] pr-3 text-left text-[13px] font-medium text-text-primary transition-colors duration-150 ease-out hover:bg-bg-hover"
          style={{ paddingLeft }}
          aria-expanded={isExpanded}
        >
          <Chevron open={isExpanded} />
          <FolderIcon open={isExpanded} />
          <span className="truncate">{item.label}</span>
        </button>
        {isExpanded && item.children && (
          <div role="group">
            {item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                depth={depth + 1}
                expandedIds={expandedIds}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!item.path) return null

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          'flex h-9 items-center gap-2 rounded-[11px] pr-3 text-[13px] transition-colors duration-150 ease-out',
          isActive
            ? 'bg-bg-selected font-medium text-text-active'
            : 'text-text-primary hover:bg-bg-hover',
        ].join(' ')
      }
      style={{ paddingLeft: paddingLeft + 18 }}
    >
      {({ isActive }) => (
        <>
          <FileIcon active={isActive} />
          <span className="truncate">{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      className={`shrink-0 text-icon transition-transform duration-200 ease-out ${open ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M3.5 1.5L7 5L3.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className="shrink-0 text-icon"
      fill="none"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M2 4.5h3.2l1.2 1.3H14v6.2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4.5z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M2 5a1 1 0 0 1 1-1h3.1l1.1 1.2H13a1 1 0 0 1 1 1v5.8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function FileIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={`shrink-0 ${active ? 'text-icon-active' : 'text-icon'}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 2h4.2L12 5.4V13a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 2v3.4H12"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}
