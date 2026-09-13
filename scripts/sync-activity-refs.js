// Keeps everything that references individual activity pages in sync with
// content/activities/*.json, which is the single source of truth Jans and
// Minouche edit through the CMS. Runs before every dev/build so deleting
// (or adding) an activity there automatically:
//  - drops it from (or adds it to) the homepage "Surroundings" carousel
//  - stops the old-WordPress _redirects file from pointing at a dead page
//  - stops llms.txt from listing a page that no longer exists
// so nobody has to remember to touch code or static files by hand.
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ACTIVITIES_DIR = join(ROOT, 'content', 'activities')
const GENERATED_INDEX = join(ROOT, 'content', 'activities-index.generated.json')
const REDIRECTS_FILE = join(ROOT, 'public', '_redirects')
const LLMS_FILE = join(ROOT, 'public', 'llms.txt')

const activities = readdirSync(ACTIVITIES_DIR)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(ACTIVITIES_DIR, f), 'utf-8')))
  .sort((a, b) => a.title.localeCompare(b.title))

const slugs = new Set(activities.map((a) => a.slug))

// 1. Plain data file the homepage carousel reads instead of hardcoding
// its own copy of title/tag/image/description for each activity.
writeFileSync(
  GENERATED_INDEX,
  JSON.stringify(
    activities.map(({ slug, tag, title, image, shortDescription, featured }) => ({
      slug, tag, title, image, shortDescription, featured: !!featured,
    })),
    null,
    2
  ) + '\n'
)

// 2. Redirect any old WordPress URL that used to point at a now-deleted
// activity to the activities index instead of letting it 404.
const redirectsLines = readFileSync(REDIRECTS_FILE, 'utf-8').split('\n')
const redirectsFixed = redirectsLines.map((line) => {
  const match = line.match(/^(\S+)(\s+)\/activities\/([a-z0-9-]+)(\s+301)(.*)$/)
  if (!match) return line
  const [, source, gap1, slug, gap2, rest] = match
  if (slugs.has(slug)) return line
  const newGap = ' '.repeat(gap2.length + slug.length + 1)
  return `${source}${gap1}/activities${newGap}301${rest}`
})
writeFileSync(REDIRECTS_FILE, redirectsFixed.join('\n'))

// 3. Regenerate the per-activity link lines in llms.txt so a deleted
// activity disappears and a new one appears, without touching the rest
// of the (hand-written) file.
const activityLinkPattern = /^- \[.*\]\(https:\/\/casamalacitano\.com\/activities\/[a-z0-9-]+\)$/
const llmsLines = readFileSync(LLMS_FILE, 'utf-8').split('\n')
const firstActivityLine = llmsLines.findIndex((l) => activityLinkPattern.test(l))
const withoutActivityLinks = llmsLines.filter((l) => !activityLinkPattern.test(l))
const insertAt = firstActivityLine === -1
  ? withoutActivityLinks.findIndex((l) => l.includes('](https://casamalacitano.com/activities)')) + 1
  : llmsLines.slice(0, firstActivityLine).filter((l) => !activityLinkPattern.test(l)).length
const newActivityLines = activities.map(
  (a) => `- [${a.seo?.title ?? a.title}](https://casamalacitano.com/activities/${a.slug})`
)
withoutActivityLinks.splice(insertAt, 0, ...newActivityLines)
writeFileSync(LLMS_FILE, withoutActivityLinks.join('\n'))

console.log(`sync-activity-refs: ${activities.length} activities (${[...slugs].join(', ')})`)
