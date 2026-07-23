import styles from './OutcomeStory.module.css'

interface OutcomeStoryProps {
  variant?: 'home' | 'page'
}

export default function OutcomeStory({ variant = 'home' }: OutcomeStoryProps) {
  if (variant === 'home') {
    return (
      <section className={styles.section}>
        <span className={styles.eyebrow}>WHAT THIS LOOKS LIKE</span>
        <h2 className={styles.headline}>
          A Retailer Priced Below Cost and Didn&apos;t Know It
        </h2>
        <p className={styles.story}>
          A boutique owner ran her numbers through this tool expecting good news.
          Instead, two of her best-selling product lines came back priced below
          what they actually cost her once shipping and returns were factored in.
          A quick repricing on 14 SKUs turned a quiet leak into real profit —
          without adding a single new customer.
        </p>
        <p className={styles.attribution}>
          <em>Composite example based on common findings. Individual results vary.</em>
        </p>
      </section>
    )
  }

  return null
}

export function OutcomeStoryBlock({
  headline,
  story,
  attribution,
}: {
  headline: string
  story: string
  attribution?: string
}) {
  return (
    <article className={styles.block}>
      <h2 className={styles.blockHeadline}>{headline}</h2>
      <p className={styles.story}>{story}</p>
      {attribution ? <p className={styles.attribution}>{attribution}</p> : null}
    </article>
  )
}

export function TestimonialCard({
  quote,
  name,
}: {
  quote: string
  name: string
}) {
  return (
    <blockquote className={styles.testimonial}>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <footer className={styles.testimonialFooter}>
        <cite className={styles.name}>— {name}</cite>
        <span className={styles.stars} aria-label="5 out of 5 stars">
          ★★★★★
        </span>
      </footer>
    </blockquote>
  )
}
