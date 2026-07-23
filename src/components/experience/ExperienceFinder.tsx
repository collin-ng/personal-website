import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { TrafficLights } from '../TrafficLights'
import {
  workExperience,
  type WorkExperience,
} from '../../data/experience'
import { education, type EducationEntry } from '../../data/education'

const COL_TEMPLATE =
  'minmax(0, 2.2fr) minmax(132px, 1fr) minmax(120px, 1fr)'

function formatDates(start: string, end: string) {
  return `${start} – ${end}`
}

function NestedWindow({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className={[
        'flex min-h-[360px] flex-col overflow-hidden',
        'h-[min(420px,70vh)]',
        'rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]',
      ].join(' ')}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
        <TrafficLights />
        <p
          id={titleId}
          className="min-w-0 truncate text-[13px] font-medium text-text-secondary"
        >
          {title}
        </p>
      </div>
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {children}
      </div>
    </section>
  )
}

function Monogram({
  initials,
  accent,
  size = 'sm',
  selected = false,
}: {
  initials: string
  accent: string
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
        backgroundColor: accent,
        ...(selected ? { boxShadow: `0 0 0 2px ${accent}55` } : {}),
      }}
      aria-hidden="true"
    >
      {initials}
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

function ColumnHeaders({
  nameLabel = 'Name',
}: {
  nameLabel?: string
}) {
  return (
    <div
      className="grid shrink-0 items-center border-b border-border-subtle bg-bg-header px-2"
      style={{ gridTemplateColumns: COL_TEMPLATE }}
    >
      <div className="relative flex h-8 items-center px-2 text-[12px] font-medium text-text-secondary">
        {nameLabel}
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
          <Monogram
            initials={job.initials}
            accent={job.accent}
            size="lg"
            selected
          />
          <h2 className="mt-4 text-[17px] font-semibold tracking-tight text-text-primary">
            {job.role}
          </h2>
          <p className="mt-1 text-[13px] text-text-secondary">
            {job.company} · {job.employmentType}
          </p>
        </div>

        <dl className="mt-6 rounded-[12px] border border-border-subtle bg-bg-content/60 px-4 py-2">
          <MetaRow label="Dates" value={formatDates(job.start, job.end)} />
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

function EducationPreview({
  entry,
  onClose,
  mobile,
}: {
  entry: EducationEntry
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
          <Monogram
            initials={entry.initials}
            accent={entry.accent}
            size="lg"
            selected
          />
          <h2 className="mt-4 text-[17px] font-semibold tracking-tight text-text-primary">
            {entry.credential}
          </h2>
          <p className="mt-1 text-[13px] text-text-secondary">
            {entry.institution}
          </p>
          {entry.note ? (
            <p className="mt-2 max-w-[280px] text-[12px] leading-snug text-text-secondary">
              {entry.note}
            </p>
          ) : null}
        </div>

        <dl className="mt-6 rounded-[12px] border border-border-subtle bg-bg-content/60 px-4 py-2">
          <MetaRow
            label="Dates"
            value={formatDates(entry.start, entry.end)}
          />
          <MetaRow label="Location" value={entry.location} />
        </dl>
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

function WorkExperiencePane() {
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
    <>
      <div
        ref={listRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden outline-none"
        tabIndex={0}
        role="listbox"
        aria-label="Work Experience"
        aria-activedescendant={
          selectedId ? `${listId}-${selectedId}` : undefined
        }
      >
        <ColumnHeaders />
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
                  <Monogram
                    initials={job.initials}
                    accent={job.accent}
                    selected={isSelected}
                  />
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
                  {formatDates(job.start, job.end)}
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

      {showPreview && selected ? (
        <div className="absolute inset-0 z-10 md:hidden">
          <ExperiencePreview job={selected} onClose={closePreview} mobile />
        </div>
      ) : null}
    </>
  )
}

function FormalEducationPane() {
  const listId = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const selected =
    selectedId != null
      ? (education.find((e) => e.id === selectedId) ?? null)
      : null

  function selectEntry(id: string) {
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
        ? education.findIndex((e) => e.id === selectedId)
        : -1
      const nextIndex =
        currentIndex < 0
          ? delta > 0
            ? 0
            : education.length - 1
          : Math.min(
              education.length - 1,
              Math.max(0, currentIndex + delta),
            )
      const next = education[nextIndex]
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
    <>
      <div
        ref={listRef}
        className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden outline-none"
        tabIndex={0}
        role="listbox"
        aria-label="Formal Education"
        aria-activedescendant={
          selectedId ? `${listId}-${selectedId}` : undefined
        }
      >
        <ColumnHeaders nameLabel="Credential" />
        <div className="min-h-0 flex-1 overflow-y-auto px-1.5 py-1.5">
          {education.map((entry, index) => {
            const isSelected = selectedId === entry.id
            const zebra = index % 2 === 1
            return (
              <button
                key={entry.id}
                id={`${listId}-${entry.id}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => selectEntry(entry.id)}
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
                  <Monogram
                    initials={entry.initials}
                    accent={entry.accent}
                    selected={isSelected}
                  />
                  <span className="min-w-0">
                    <span
                      className={[
                        'block truncate text-[13px]',
                        isSelected ? 'font-semibold' : 'font-medium',
                      ].join(' ')}
                    >
                      {entry.credential}
                    </span>
                    <span
                      className={[
                        'block truncate text-[11px]',
                        isSelected
                          ? 'text-text-active/80'
                          : 'text-text-secondary',
                      ].join(' ')}
                    >
                      {entry.institution}
                    </span>
                  </span>
                </span>
                <span
                  className={[
                    'truncate px-2 text-[12px]',
                    isSelected ? 'text-text-active' : 'text-text-secondary',
                  ].join(' ')}
                >
                  {formatDates(entry.start, entry.end)}
                </span>
                <span
                  className={[
                    'truncate px-2 text-[12px]',
                    isSelected ? 'text-text-active' : 'text-text-secondary',
                  ].join(' ')}
                >
                  {entry.location}
                </span>
              </button>
            )
          })}
        </div>
      </div>

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
            <EducationPreview entry={selected} onClose={closePreview} />
          </div>
        ) : null}
      </div>

      {showPreview && selected ? (
        <div className="absolute inset-0 z-10 md:hidden">
          <EducationPreview entry={selected} onClose={closePreview} mobile />
        </div>
      ) : null}
    </>
  )
}

export function ExperienceFinder() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-bg-content px-4 py-5 md:px-6 md:py-6">
      <div className="mx-auto flex w-full max-w-[960px] flex-col gap-5">
        <NestedWindow title="Work Experience">
          <WorkExperiencePane />
        </NestedWindow>
        <NestedWindow title="Formal Education">
          <FormalEducationPane />
        </NestedWindow>
      </div>
    </div>
  )
}
