import styles from './OutcomeStory.module.css'

export default function OutcomeStory() {
  return (
    <section className={styles.section}>
      <span className={styles.eyebrow}>Client Story</span>
      <h2 className={styles.headline}>
        How a Gift Shop Owner Found $47,000 in Annual Profit She Didn&apos;t Know
        She Had
      </h2>
      <p className={styles.story}>
        When Jamie ran her numbers through this tool, her gross margin came back
        at 38% — well below the 55% benchmark. Kari identified two product
        categories where she was pricing below cost once wholesale, shipping, and
        returns were factored in. By repricing 14 SKUs, she added $47K to her
        annual bottom line without adding a single new customer.
      </p>
      <p className={styles.attribution}>
        Composite of common client outcomes. Individual results vary.
      </p>

      <blockquote className={styles.testimonial}>
        <p className={styles.quote}>
          &ldquo;I thought I had a sales problem. Turns out I had a pricing
          problem. Kari found it in 20 minutes.&rdquo;
        </p>
        <footer className={styles.testimonialFooter}>
          <cite className={styles.name}>— Sarah M., Boutique Owner, Red Deer AB</cite>
          <span className={styles.stars} aria-label="5 out of 5 stars">
            ★★★★★
          </span>
        </footer>
      </blockquote>
    </section>
  )
}
