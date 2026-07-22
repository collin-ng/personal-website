import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MobileNavToggle } from '../components/MobileNavToggle'
import { PathBar } from '../components/PathBar'
import { Sidebar } from '../components/Sidebar'

const SIDEBAR_WIDTH = 268

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className="min-h-full bg-bg-app p-0 text-text-primary lg:p-4">
      <div
        className="flex h-dvh min-h-0 flex-col overflow-hidden border-0 bg-transparent lg:h-[calc(100dvh-2rem)] lg:rounded-[22px] lg:border lg:border-border-subtle lg:bg-bg-content lg:shadow-[var(--shadow-soft)]"
      >
        {/* Desktop chrome */}
        <div className="hidden h-11 shrink-0 items-center gap-3 border-b border-border-subtle px-4 lg:flex">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-[#FF5F57]" />
            <span className="size-3 rounded-full bg-[#FEBC2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-[13px] font-medium text-text-secondary">
            Portfolio
          </span>
        </div>

        <div className="relative flex min-h-0 flex-1">
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
              className="fixed inset-0 z-40 bg-[#1C2430]/20 lg:hidden"
              aria-label="Dismiss sidebar"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Mobile / tablet drawer */}
          <aside
            className={[
              'fixed inset-y-0 left-0 z-50 rounded-r-[20px] border-r border-border-subtle bg-bg-sidebar shadow-[var(--shadow-soft)] transition-transform duration-200 ease-out lg:hidden',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ].join(' ')}
            style={{ width: SIDEBAR_WIDTH }}
          >
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </aside>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-bg-content">
            <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border-subtle px-4 lg:hidden">
              <MobileNavToggle
                open={sidebarOpen}
                onToggle={() => setSidebarOpen((v) => !v)}
              />
              <span className="text-sm font-medium text-text-primary">
                Portfolio
              </span>
            </header>

            <PathBar />

            <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
