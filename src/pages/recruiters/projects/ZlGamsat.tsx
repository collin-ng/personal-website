import { useId } from 'react'
import { TrafficLights } from '../../../components/TrafficLights'
import photo1 from './zlgamsat-media/Photo-1.png'
import photo2 from './zlgamsat-media/Photo-2.png'
import photo3 from './zlgamsat-media/Photo-3.png'
import photo4 from './zlgamsat-media/Photo-4.png'

const ZLGAMSAT_URL = 'https://www.zlgamsat.com/'
const GAMSAT_MARKER_URL = 'https://section-2-gamsat-bot.vercel.app'

const screenshots = [
  {
    src: photo1,
    title: 'Essay and Theme Input',
    alt: 'GAMSAT Section 2 essay feedback tool showing prompt and essay input',
  },
  {
    src: photo2,
    title: 'Overview and Expression Feedback',
    alt: 'Overall essay summary with expression feedback on a highlighted excerpt',
  },
  {
    src: photo3,
    title: 'Empathy Feedback',
    alt: 'Empathy feedback tied to an exact essay excerpt',
  },
  {
    src: photo4,
    title: 'Fallibilism Feedback',
    alt: 'Fallibilism feedback tied to an exact essay excerpt',
  },
] as const

function ScreenshotWindow({
  src,
  title,
  alt,
}: {
  src: string
  title: string
  alt: string
}) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="flex w-full flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]"
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
      <div className="bg-bg-sidebar">
        <img src={src} alt={alt} className="block w-full" />
      </div>
    </section>
  )
}

export function ZlGamsatPage() {
  return (
    <article className="mx-auto max-w-[560px]">
      <h1 className="text-[28px] font-semibold tracking-tight text-text-primary md:text-[32px]">
        ZL Gamsat
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-primary">
        This was a paid client project for a GAMSAT tutoring company. Building
        it taught me as much about the business side of software
        entrepreneurship as it did about shipping product.
      </p>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
        Check out the live site at{' '}
        <a
          href={ZLGAMSAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-text-active underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
        >
          www.zlgamsat.com
        </a>
        . I built the whole thing with React and Vite, styled it with Tailwind,
        and used React Router to wire up the home, pricing, about, and inquiry
        pages. Framer Motion handled the scroll animations and page
        transitions so it felt more polished than a static brochure site, and
        Resend powered the contact form emails. The biggest learning curve was
        turning a rough brand vibe into a design system that stayed consistent
        across mobile and desktop, while keeping the pricing and inquiry flow
        clear without overcomplicating the UX. Working directly with a client
        also meant a lot of back and forth on copy and layout, which taught me
        more about communication and scope than any uni assignment ever did.
        Overall it was a solid first real-world build where I owned the project
        from setup through deployment.
      </p>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
        I also started work on a GAMSAT Section 2 essay feedback tool, which
        has to stay private too. I built it as a Next.js and React app in
        TypeScript, with Zod validating both the API input and the model
        response, plus a provider-agnostic AI layer so the marking logic was
        not glued to one vendor. Students paste an essay, the app hits a{' '}
        <code className="text-[13px] text-text-primary">/api/mark</code> route,
        and they get tutor-style comments tied to exact excerpts across things
        like empathy, critical thinking, and structure, with no scores or
        grades anywhere in the product (as requested by the client). The hard parts were turning the
        client's marking framework into prompts the model would actually
        follow, forcing reliable structured JSON out of an LLM, and keeping
        feedback useful without slipping into ranking language.
      </p>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
      The front end is here{' '}
        <a
          href={GAMSAT_MARKER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-text-active underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
        >
          section-2-gamsat-bot.vercel.app
        </a>
        . However it won't run without the AI API key.
      </p>

      <div className="my-8 flex flex-col gap-6">
        {screenshots.map((shot) => (
          <ScreenshotWindow key={shot.title} {...shot} />
        ))}
      </div>
    </article>
  )
}
