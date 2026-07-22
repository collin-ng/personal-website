import { useTheme } from '../theme/ThemeProvider'

type ThemeToggleProps = {
  className?: string
}

/**
 * iOS-style switch with a quiet system-style label.
 * Label is static "Dark Mode" (macOS/iOS convention); the switch state
 * communicates on/off — no need to flip the label text.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark Mode"
      onClick={toggleTheme}
      className={[
        'inline-flex items-center gap-2 rounded-full py-0.5 pl-1 pr-0.5',
        'transition-opacity duration-150 hover:opacity-90',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        className,
      ].join(' ')}
    >
      <span className="select-none text-[12px] font-medium tracking-[-0.01em] text-text-secondary">
        Dark Mode
      </span>
      <span
        aria-hidden="true"
        className={[
          'relative inline-flex h-[22px] w-[40px] shrink-0 items-center rounded-full transition-colors duration-200 ease-out',
          isDark ? 'bg-[#34C759]' : 'bg-[#D1D5DB] dark:bg-[#3A3A3C]',
        ].join(' ')}
      >
        <span
          className={[
            'pointer-events-none absolute top-[2px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.28)]',
            'transition-transform duration-200 ease-out',
            isDark ? 'translate-x-[20px]' : 'translate-x-[2px]',
          ].join(' ')}
        />
      </span>
    </button>
  )
}
