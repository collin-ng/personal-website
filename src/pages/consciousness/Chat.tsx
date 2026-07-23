export function ChatPage() {
  return (
    <article className="mx-auto flex max-w-[700px] flex-col gap-6">
      <div>
        <h1 className="text-[24px] font-semibold tracking-tight text-text-primary">
          Chat
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
          Talk to a lightweight model of my consciousness. Still a work in progress...
        </p>
      </div>

      <div className="flex min-h-48 flex-col justify-end rounded-[16px] border border-border-subtle bg-bg-sidebar p-4 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-text-secondary">No messages yet.</p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input
          type="text"
          disabled
          placeholder="Coming soon…"
          className="flex-1 rounded-[12px] border border-border-subtle bg-bg-content px-3 py-2.5 text-sm text-text-secondary placeholder:text-text-secondary/70"
          aria-label="Message"
        />
        <button
          type="submit"
          disabled
          className="rounded-full border border-border-subtle bg-accent-soft px-4 py-2.5 text-sm font-medium text-text-active opacity-60"
        >
          Send
        </button>
      </form>
    </article>
  )
}
