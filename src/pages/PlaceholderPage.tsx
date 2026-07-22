type PlaceholderPageProps = {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <article className="mx-auto max-w-[700px]">
      <h1 className="text-[24px] font-semibold tracking-tight text-text-primary">
        {title}
      </h1>
      <p className="mt-3 text-[15px] leading-[1.6] text-text-secondary">
        {description}
      </p>
    </article>
  )
}
