type MobileNavToggleProps = {
  open: boolean
  onToggle: () => void
}

export function MobileNavToggle({ open, onToggle }: MobileNavToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-bg-content text-text-primary transition-colors duration-150 hover:bg-bg-hover lg:hidden"
      aria-label={open ? 'Close sidebar' : 'Browse'}
      aria-expanded={open}
    >
      {open ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  )
}
