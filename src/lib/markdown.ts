import { readFileSync } from 'fs'
import { join } from 'path'

// Minimal frontmatter parser: our legal docs only ever need one
// or two flat string fields, so a full YAML parser would be overkill
export function readMarkdownWithFrontmatter(relativePath: string) {
  const raw = readFileSync(join(process.cwd(), 'content', relativePath), 'utf-8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {} as Record<string, string>, content: raw }

  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (!key) continue
    data[key.trim()] = rest.join(':').trim().replace(/^"(.*)"$/, '$1')
  }
  return { data, content: match[2].trim() }
}
