import type { Metadata } from 'next'
import {
  OutcomeStoryBlock,
  TestimonialCard,
} from '@/components/OutcomeStory'
import pageStyles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Client Results',
  description:
    'What proactive bookkeeping and margin analysis looks like for retail store owners.',
}

export default function ResultsPage() {
  return (
    <main className={pageStyles.page}>
      <div className={pageStyles.inner}>
        <h1 className={pageStyles.headline}>What This Looks Like in Practice</h1>

        <OutcomeStoryBlock
          headline="How a Gift Shop Owner Found $47,000 in Annual Profit She Didn't Know She Had"
          story="When Jamie ran her numbers through this tool, her gross margin came back at 38% — well below the 55% benchmark. Kari identified two product categories where she was pricing below cost once wholesale, shipping, and returns were factored in. By repricing 14 SKUs, she added $47K to her annual bottom line without adding a single new customer."
          attribution="Composite of common client outcomes. Individual results vary."
        />

        <OutcomeStoryBlock
          headline="A Boutique Owner Repriced 14 SKUs and Stopped the Quiet Leak"
          story="A boutique owner ran her numbers through the Profit Margin tool expecting good news. Two of her best-selling lines came back priced below cost once shipping and returns were counted. Repricing 14 SKUs added real profit back to her bottom line — without a single new customer."
          attribution="Composite of common client outcomes. Individual results vary."
        />

        <TestimonialCard
          quote="I thought I had a sales problem. Turns out I had a pricing problem. Kari found it in 20 minutes."
          name="Sarah M., Boutique Owner"
        />
      </div>
    </main>
  )
}
