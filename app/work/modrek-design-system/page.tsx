import type { Metadata } from 'next'
import ModrekCaseStudy from '../../../components/case-study/ModrekCaseStudy'

export const metadata: Metadata = {
  title: 'Modrek Design System — Case Study',
  description: 'One product, four experiences, one source of truth — systemizing the Modrek design language.',
}

export default function ModrekDesignSystemPage() {
  return <ModrekCaseStudy />
}
