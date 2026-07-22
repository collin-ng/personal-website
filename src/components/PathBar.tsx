import { useLocation } from 'react-router-dom'
import { getBreadcrumbLabels } from '../data/nav'

export function PathBar() {
  const { pathname } = useLocation()
  const labels = getBreadcrumbLabels(pathname)

  if (labels.length === 0) return null

  return (
    <div className="flex h-10 shrink-0 items-center border-b border-border-subtle px-6 md:px-8">
      <p className="truncate text-[13px] font-medium text-text-secondary">
        {labels.join(' / ')}
      </p>
    </div>
  )
}
