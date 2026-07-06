import type { Metadata } from 'next'
import ToolsPreview from '@/components/ToolsPreview'

export const metadata: Metadata = {
  title: 'Free Retail Tools',
  description:
    'Free calculators for retail store owners — margin analysis, discount impact, and door-crasher promotion planning.',
}

export default function ToolsHubPage() {
  return (
    <main>
      <ToolsPreview variant="hub" />
    </main>
  )
}
