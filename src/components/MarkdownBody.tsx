'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownBody({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-casa-text prose-p:text-casa-text-light prose-li:text-casa-text-light prose-a:text-casa-teal prose-strong:text-casa-text prose-table:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
