import { useId, useState, type ReactNode } from 'react'
import { TrafficLights } from '../../components/TrafficLights'
import { travelCountries } from '../../data/travel'

function ImageCarousel({
  images,
  label,
}: {
  images: string[]
  label: string
}) {
  const [index, setIndex] = useState(0)
  const count = images.length

  if (count === 0) return null

  const goPrev = () => setIndex((i) => (i - 1 + count) % count)
  const goNext = () => setIndex((i) => (i + 1) % count)

  return (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden bg-bg-sidebar">
        <img
          src={images[index]}
          alt={`${label} photo ${index + 1} of ${count}`}
          className="size-full object-cover"
        />
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label={`Previous ${label} photo`}
            className="absolute top-1/2 left-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated/90 text-text-primary shadow-[var(--shadow-soft)] transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          >
            <span aria-hidden="true" className="text-[15px] leading-none">
              ‹
            </span>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={`Next ${label} photo`}
            className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-border-subtle bg-bg-elevated/90 text-text-primary shadow-[var(--shadow-soft)] transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
          >
            <span aria-hidden="true" className="text-[15px] leading-none">
              ›
            </span>
          </button>

          <div
            className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1.5"
            role="tablist"
            aria-label={`${label} photo position`}
          >
            {images.map((_, i) => (
              <button
                key={images[i]}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${label} photo ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`size-1.5 rounded-full transition-colors ${
                  i === index
                    ? 'bg-white'
                    : 'bg-white/45 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}

function CountryWindow({
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
      <div className="min-h-0">{children}</div>
    </section>
  )
}

export function TravelPage() {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-start justify-items-center gap-4 sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-3">
      {travelCountries.map((country) => (
        <CountryWindow key={country.id} title={country.title}>
          <ImageCarousel images={country.images} label={country.title} />
        </CountryWindow>
      ))}
    </div>
  )
}
