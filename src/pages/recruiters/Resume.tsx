import resumeIcon from './resume-image.png'

const documents = [
  {
    label: 'Tech Role Resume',
    href: '/docs/Resume%20-%20Collin%20Ng%20(Tech).pdf',
  },
  {
    label: 'General Role Resume',
    href: '/docs/Resume%20-%20Collin%20Ng%20(General).pdf',
  },
  {
    label: 'General Cover Letter',
    href: '/docs/CV%20-%20Collin%20Ng%20(General).pdf',
  },
] as const

export function ResumePage() {
  return (
    <article className="mx-auto max-w-[700px]">
      <div className="flex flex-col items-center pt-10 pb-16 md:pt-14 md:pb-20">
        <img
          src={resumeIcon}
          alt=""
          width={140}
          height={140}
          className="size-[120px] rounded-[22px] shadow-[var(--shadow-soft)] md:size-[140px]"
        />
        <h1 className="mt-5 text-[32px] font-semibold tracking-tight text-text-primary md:text-[36px]">
          My Resumes
        </h1>
      </div>

      <section>
        <h2 className="text-[17px] font-semibold tracking-tight text-text-primary">
          Documents
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {documents.map((doc) => (
            <li key={doc.href}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-medium text-text-active transition-colors hover:underline"
              >
                {doc.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
