import type { Metadata } from 'next'
import GoSocialCaseStudy from '../../../components/case-study/GoSocialCaseStudy'

export const metadata: Metadata = {
  title: 'Go Social — Case Study',
  description: 'Designing the social layer for cafés, gyms and neighbourhoods.',
}

export default function GoSocialPage() {
  return <GoSocialCaseStudy />
}
