import face from './my-face.jpeg'
import { TrafficLights } from '../../components/TrafficLights'

export function AboutPage() {
  return (
    <article className="mx-auto max-w-[560px] text-center">
      <section
        aria-label="me"
        className="mx-auto flex w-full max-w-[280px] flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]"
      >
        <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
          <TrafficLights />
          <p className="min-w-0 truncate text-[13px] font-medium text-text-secondary">
            Me
          </p>
        </div>
        <div className="flex items-center justify-center p-5">
          <img
            src={face}
            alt="Portrait of Collin Ng"
            className="size-48 rounded-full border-2 border-black object-cover"
          />
        </div>
      </section>

      <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-text-primary md:text-[32px]">
        Collin Ng
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-primary">
        I'm a computer science graduate who's always looking to learn new things.
      </p>
      <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
        Some hobbies of mine include playing basketball in a mens league,
        lifting weights, or hitting some tennis. I like tinkering with side
        projects and messing around with AI and LLMs. Music festivals and
        social events are also an important part of my life. I also trade and
        invest in financial markets when curiosity pulls me that way.
      </p>
    </article>
  )
}
