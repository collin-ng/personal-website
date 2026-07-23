import { useId, type ReactNode } from 'react'
import { TrafficLights } from '../../components/TrafficLights'
import { skillGroups, type SkillGroup } from '../../data/skills'

function SkillGroupWindow({
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
      className="flex w-full max-w-[340px] flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)] sm:max-w-none"
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
      <div className="px-4 py-3.5">{children}</div>
    </section>
  )
}

function SkillList({ group }: { group: SkillGroup }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {group.skills.map((skill) => (
        <li key={skill} className="text-[14px] leading-[1.4] text-text-primary">
          {skill}
        </li>
      ))}
    </ul>
  )
}

export function SkillsPage() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
      {skillGroups.map((group) => (
        <SkillGroupWindow key={group.id} title={group.title}>
          <SkillList group={group} />
        </SkillGroupWindow>
      ))}
    </div>
  )
}
