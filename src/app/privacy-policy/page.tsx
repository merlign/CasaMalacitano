import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import MarkdownBody from '@/components/MarkdownBody'
import { readMarkdownWithFrontmatter } from '@/lib/markdown'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Casa Malacitano: how we collect, use and protect your personal data.',
  alternates: {
    canonical: 'https://casamalacitano.com/privacy-policy',
  },
}

export default function PrivacyPolicyPage() {
  const { data, content } = readMarkdownWithFrontmatter('legal/privacy-policy.md')

  return (
    <div className="min-h-screen bg-casa-stone font-sans text-casa-text">
      <SiteHeader />

      <main className="pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-20">

          <p className="text-casa-teal font-bold tracking-widest uppercase text-xs mb-3">Legal</p>
          <h1 className="text-4xl md:text-5xl font-serif text-casa-text mb-4 leading-tight">Privacy Policy</h1>
          <p className="text-casa-text-light mb-12">Last updated: {data.lastUpdated}</p>

          <MarkdownBody content={content} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
