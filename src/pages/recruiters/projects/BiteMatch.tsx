import { useId } from 'react'
import { TrafficLights } from '../../../components/TrafficLights'
import demoVideo from './bitematch-media/demo.mp4'

const GITHUB_URL = 'https://github.com/collin-ng/BiteMatch'

function DemoWindow() {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="mx-auto flex w-full max-w-[280px] flex-col overflow-hidden rounded-[18px] border border-border-subtle bg-bg-elevated shadow-[var(--shadow-soft)]"
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
        <TrafficLights />
        <p
          id={titleId}
          className="min-w-0 truncate text-[13px] font-medium text-text-secondary"
        >
          Demo
        </p>
      </div>
      <div className="bg-bg-sidebar">
        <video
          src={demoVideo}
          controls
          playsInline
          preload="metadata"
          className="block w-full"
          aria-label="BiteMatch demo showing the restaurant swipe flow"
        />
      </div>
    </section>
  )
}

export function BiteMatchPage() {
  return (
    <article className="mx-auto max-w-[560px]">
      <h1 className="text-[28px] font-semibold tracking-tight text-text-primary md:text-[32px]">
        BiteMatch
      </h1>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-primary">
        BiteMatch is an unfinished personal project I started because I wanted
        to incorporate the Tinder like swipes but for restaurant discovery.
      </p>
      <p className="mt-4 text-[15px] leading-[1.6] text-text-secondary">
        The idea is simple: you pick a location, get a stack of nearby
        restaurants, and swipe right or left like a dating app until you land on
        something. I built it with TypeScript, React
        Native, and Expo, using Expo Router for navigation, Reanimated and
        Gesture Handler for the card swipes, and AsyncStorage to keep likes
        around between sessions. I also wired up Google Places so the feed could
        pull real spots near you, plus some location stuff with expo location
        and maps. There's a demo video on this page if you want to see the
        swipe flow without cloning the repo, and the code is on{' '}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-text-active underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
        >
          GitHub
        </a>
        .
      </p>

      <div className="my-8">
        <DemoWindow />
      </div>

      <p className="text-[15px] leading-[1.6] text-text-secondary">
        A lot of the hard parts were the little things. Getting the swipe
        gestures to feel right took way longer than I expected, especially
        springing the card back when you don't commit far enough. I also
        spent time structuring the app with repositories and contexts so
        location, likes, and restaurant fetching weren't all dumped into
        one screen. Live Places data worked for a bit, then I burned through my
        Google API credits, so right now the app falls back to mock restaurant
        data. Shared sessions where multiple people swipe and get a match was
        something I started sketching out too, but that side is still
        incomplete. Overall it's a solid learning project for mobile UI,
        third party APIs, and how fast free quotas disappear when you're
        iterating.
      </p>
    </article>
  )
}
