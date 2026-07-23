import { useEffect, useId, useRef, useState } from 'react'
import {
  workExperience,
  type WorkExperience,
} from '../../data/experience'

const COL_TEMPLATE =
  'minmax(0, 2.2fr) minmax(132px, 1fr) minmax(120px, 1fr)'

function formatDates(job: WorkExperience) {
  return `${job.start} – ${job.end}`
}

function CompanyMonogram({
  job,
  size = 'sm',
  selected = false,
}: {
  job: WorkExperience
  size?: 'sm' | 'lg'
  selected?: boolean
}) {
  const dim = size === 'lg' ? 'h-[72px] w-[72px] text-[22px]' : 'h-7 w-7 text-[10px]'
  return (
    <span
      className={[
        'inline-flex shrink-0 items-center justify-center rounded-[7px] font-semibold tracking-tight text-white shadow-sm',
        dim,
        selected ? 'ring-2 ring-offset-1 ring-offset-bg-elevated' : '',
      ].join(' ')}
      style={{
        backgroundColor: job.accent,
        ...(selected ? { boxShadow: `0 0 0 2px ${job.accent}55` } : {}),
      }}
      aria-hidden="true"
    >
      {job.initials}
    </span>
  )
}

function SortChevron() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      className="ml-1 inline-block shrink-0 text-text-secondary opacity-70"
      aria-hidden="true"
    >
      <path
        d="M2.5 3.5L5 6.5L7.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ColumnDivider() {
  return (
    <span
      className="absolute top-1.5 bottom-1.5 right-0 w-px cursor-col-resize bg-border-subtle"
      aria-hidden="true"
    />
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 py-1.5 text-[13px]">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="min-w-0 text-text-primary">{value}</dd>
    </div>
  )
}

function ExperiencePreview({
  job,
  onClose,
  mobile,
}: {
  job: WorkExperience
  onClose: () => void
  mobile?: boolean
}) {
  return (
    <div className="flex h-full min-h-0 flex-col bg-bg-elevated">
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-border-subtle px-3">
        {mobile ? (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 rounded-[8px] px-1.5 py-1 text-[13px] font-medium text-text-active transition-colors hover:bg-bg-hover"
          >
            <BackChevron />
            Back
          </button>
        ) : (
          <span className="text-[12px] font-medium text-text-secondary">
            Preview
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
          aria-label="Close preview"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-6">
        <div className="flex flex-col items-center text-center">
          <CompanyMonogram job={job} size="lg" selected />
          <h2 className="mt-4 text-[17px] font-semibold tracking-tight text-text-primary">
            {job.role}
          </h2>
          <p className="mt-1 text-[13px] text-text-secondary">
            {job.company} · {job.employmentType}
          </p>
        </div>

        <dl className="mt-6 rounded-[12px] border border-border-subtle bg-bg-content/60 px-4 py-2">
          <MetaRow label="Dates" value={formatDates(job)} />
          <MetaRow label="Duration" value={job.duration} />
          <MetaRow label="Location" value={job.location} />
          {job.workMode ? (
            <MetaRow label="Work mode" value={job.workMode} />
          ) : null}
        </dl>

        <div className="mt-5 border-t border-border-subtle pt-5">
          <p className="text-[12px] font-medium tracking-wide text-text-secondary uppercase">
            About
          </p>
          <p className="mt-2 text-[14px] leading-[1.65] text-text-primary">
            {job.summary}
          </p>
        </div>
      </div>
    </div>
  )
}

function BackChevron() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 10 10"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M6.5 1.5L3 5L6.5 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 3l6 6M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ExperienceFinder() {
  const listId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const selected =
    selectedId != null
      ? (workExperience.find((j) => j.id === selectedId) ?? null)
      : null

  function selectJob(id: string) {
    if (selectedId === id && previewOpen) {
      setPreviewOpen(false)
      return
    }
    setSelectedId(id)
    setPreviewOpen(true)
  }

  function closePreview() {
    setPreviewOpen(false)
  }

  useEffect(() => {
    const node = listRef.current
    if (!node) return

    function moveSelection(delta: number) {
      const currentIndex = selectedId
        ? workExperience.findIndex((j) => j.id === selectedId)
        : -1
      const nextIndex =
        currentIndex < 0
          ? delta > 0
            ? 0
            : workExperience.length - 1
          : Math.min(
              workExperience.length - 1,
              Math.max(0, currentIndex + delta),
            )
      const next = workExperience[nextIndex]
      if (!next) return
      setSelectedId(next.id)
      setPreviewOpen(true)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveSelection(1)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveSelection(-1)
      } else if (event.key === 'Enter' && selectedId) {
        event.preventDefault()
        setPreviewOpen(true)
      } else if (event.key === 'Escape' && previewOpen) {
        event.preventDefault()
        setPreviewOpen(false)
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => node.removeEventListener('keydown', onKeyDown)
  }, [selectedId, previewOpen])

  const showPreview = previewOpen && selected != null

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      {/* List pane */}
      <div
        ref={listRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden outline-none"
        tabIndex={0}
        role="listbox"
        aria-label="Work experience"
        aria-activedescendant={
          selectedId ? `${listId}-${selectedId}` : undefined
        }
      >
        {/* Column headers */}
        <div
          className="grid shrink-0 items-center border-b border-border-subtle bg-bg-header px-2"
          style={{ gridTemplateColumns: COL_TEMPLATE }}
        >
          <div className="relative flex h-8 items-center px-2 text-[12px] font-medium text-text-secondary">
            Name
            <ColumnDivider />
          </div>
          <div className="relative flex h-8 items-center px-2 text-[12px] font-medium text-text-secondary">
            <span className="truncate">Start/End Month</span>
            <SortChevron />
            <ColumnDivider />
          </div>
          <div className="flex h-8 items-center px-2 text-[12px] font-medium text-text-secondary">
            Location
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1.5">
          {workExperience.map((job, index) => {
            const isSelected = selectedId === job.id
            const zebra = index % 2 === 1
            return (
              <button
                key={job.id}
                id={`${listId}-${job.id}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectJob(job.id)}
                className={[
                  'grid w-full items-center rounded-[11px] px-2 py-1.5 text-left transition-colors duration-150 ease-out',
                  isSelected
                    ? 'bg-bg-selected text-text-active'
                    : zebra
                      ? 'bg-bg-stripe text-text-primary hover:bg-bg-hover'
                      : 'text-text-primary hover:bg-bg-hover',
                ].join(' ')}
                style={{ gridTemplateColumns: COL_TEMPLATE }}
              >
                <span className="flex min-w-0 items-center gap-2.5 pr-2">
                  <CompanyMonogram job={job} selected={isSelected} />
                  <span
                    className={[
                      'truncate text-[13px]',
                      isSelected ? 'font-semibold' : 'font-medium',
                    ].join(' ')}
                  >
                    {job.role}
                  </span>
                </span>
                <span
                  className={[
                    'truncate px-2 text-[12px]',
                    isSelected ? 'text-text-active' : 'text-text-secondary',
                  ].join(' ')}
                >
                  {formatDates(job)}
                </span>
                <span
                  className={[
                    'truncate px-2 text-[12px]',
                    isSelected ? 'text-text-active' : 'text-text-secondary',
                  ].join(' ')}
                >
                  {job.location}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Desktop preview pane */}
      <div
        className={[
          'hidden min-h-0 shrink-0 overflow-hidden border-l border-border-subtle md:block',
          'transition-[width,opacity] duration-200 ease-out motion-reduce:transition-none',
          showPreview ? 'w-[40%] opacity-100' : 'w-0 opacity-0',
        ].join(' ')}
        aria-hidden={!showPreview}
      >
        {selected ? (
          <div className="h-full min-w-[280px]">
            <ExperiencePreview job={selected} onClose={closePreview} />
          </div>
        ) : null}
      </div>

      {/* Mobile preview overlay */}
      {showPreview && selected ? (
        <div className="absolute inset-0 z-10 md:hidden">
          <ExperiencePreview job={selected} onClose={closePreview} mobile />
        </div>
      ) : null}
    </div>
  )
}
