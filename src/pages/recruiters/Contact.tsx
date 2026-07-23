import { useEffect, useRef, useState } from 'react'

type Connection =
  | {
      id: string
      label: string
      detail: string
      action: 'copy'
      value: string
    }
  | {
      id: string
      label: string
      detail: string
      action: 'open'
      href: string
    }

const connections: Connection[] = [
  {
    id: 'email',
    label: 'Direct Email',
    detail: 'ngcollin13@gmail.com',
    action: 'copy',
    value: 'ngcollin13@gmail.com',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Profile',
    detail: 'collin-ng',
    action: 'open',
    href: 'https://www.linkedin.com/in/collin-ng-8ab733220/',
  },
  {
    id: 'github',
    label: 'GitHub Repository',
    detail: '@collin-ng',
    action: 'open',
    href: 'https://github.com/collin-ng',
  },
]

const actionPillClass =
  'shrink-0 rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-medium text-text-active transition-colors duration-150 hover:bg-accent-soft/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard may be unavailable; keep button label unchanged
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={actionPillClass}
      aria-label={copied ? 'Copied email' : 'Copy email'}
    >
      <span className="inline-block transition-opacity duration-150">
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  )
}

export function ContactPage() {
  return (
    <article className="mx-auto max-w-[560px]">
      <header className="pt-6 pb-8 md:pt-8 md:pb-10">
        <h1 className="text-[28px] font-semibold tracking-tight text-text-primary md:text-[32px]">
          Let's Connect...
        </h1>
      </header>

      <section
        aria-label="Network connections"
        className="overflow-hidden rounded-[12px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]"
      >
        <ul>
          {connections.map((item, index) => (
            <li
              key={item.id}
              className={[
                'flex items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-bg-hover',
                index > 0 ? 'border-t border-border-subtle' : '',
              ].join(' ')}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-semibold tracking-tight text-text-primary">
                  {item.label}
                </p>
                <p className="mt-0.5 truncate text-[13px] text-text-secondary">
                  {item.detail}
                </p>
              </div>
              {item.action === 'copy' ? (
                <CopyButton value={item.value} />
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={actionPillClass}
                >
                  Open
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
