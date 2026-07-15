// Runs after `next build`. Next.js content-hashes the compiled Tailwind
// CSS filename, so it can't be referenced by a fixed path from the CMS
// preview. This copies it to a stable name the admin preview can load,
// so the CMS preview renders with the exact CSS the live site uses.
import { readdirSync, copyFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const chunksDir = join(distDir, '_next', 'static', 'chunks')
const target = join(distDir, 'admin', 'site.css')

const cssFile = readdirSync(chunksDir).find((f) => f.endsWith('.css'))

if (!cssFile) {
  throw new Error('copy-preview-css: no compiled CSS file found in ' + chunksDir)
}

copyFileSync(join(chunksDir, cssFile), target)
console.log(`copy-preview-css: ${cssFile} -> admin/site.css`)
