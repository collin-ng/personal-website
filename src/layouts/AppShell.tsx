import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ContentWindow } from '../components/ContentWindow'
import { MobileNavToggle } from '../components/MobileNavToggle'
import { Sidebar } from '../components/Sidebar'
import { ThemeToggle } from '../components/ThemeToggle'
import { TrafficLights } from '../components/TrafficLights'
import { getBreadcrumbLabels } from '../data/nav'

const SIDEBAR_WIDTH = 268

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()
  const breadcrumb = getBreadcrumbLabels(pathname)
  const contentTitle =
    breadcrumb.length > 0 ? breadcrumb.join(' / ') : 'Portfolio'
  const flushBody = pathname === '/recruiters/experience'

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-full bg-bg-app p-2 text-text-primary sm:p-3 lg:p-4">
      <div className="flex h-[calc(100dvh-1rem)] min-h-0 flex-col overflow-hidden rounded-[22px] border border-border-subtle bg-bg-content shadow-[var(--shadow-soft)] sm:h-[calc(100dvh-1.5rem)] lg:h-[calc(100dvh-2rem)]">
        {/* Outer window chrome */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-border-subtle px-4">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <MobileNavToggle
              open={sidebarOpen}
              onToggle={() => setSidebarOpen((v) => !v)}
            />
            <span className="text-[13px] font-medium text-text-secondary">
              Collin Ng's Portfolio
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          {/* Desktop sidebar */}
          <aside
            className="hidden shrink-0 border-r border-border-subtle bg-bg-sidebar lg:block"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <Sidebar />
          </aside>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <button
              type="button"
              className="absolute inset-0 z-40 bg-[#1C2430]/20 lg:hidden"
              aria-label="Dismiss sidebar"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile / tablet drawer */}
          <aside
            className={[
              'absolute inset-y-0 left-0 z-50 rounded-r-[20px] border-r border-border-subtle bg-bg-sidebar shadow-[var(--shadow-soft)] transition-transform duration-200 ease-out lg:hidden',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}
            style={{ width: SIDEBAR_WIDTH }}
          >
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>

          {/* Content desk + inner window */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-bg-sidebar p-3 md:p-4">
            <ContentWindow
              title={contentTitle}
              bodyClassName={
                flushBody
                  ? 'flex min-h-0 flex-1 flex-col overflow-hidden p-0'
                  : undefined
              }
            >
              <Outlet />
            </ContentWindow>
          </div>
        </div>
      </div>
    </div>
  )
}
