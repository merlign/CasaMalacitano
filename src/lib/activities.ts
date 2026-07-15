import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

export type Activity = {
  slug: string
  tag: string
  title: string
  shortDescription: string
  description: string[]
  tips: string[]
  practical: { label: string; value: string }[]
  image: string
}

const ACTIVITIES_DIR = join(process.cwd(), 'content', 'activities')

// Each activity is a separate file so Decap CMS can expose it as a
// folder collection (one entry = one file = one "add new" button)
export function getActivities(): Activity[] {
  return readdirSync(ACTIVITIES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(ACTIVITIES_DIR, f), 'utf-8')) as Activity)
    .sort((a, b) => a.title.localeCompare(b.title))
}

export function getActivity(slug: string): Activity | undefined {
  return getActivities().find((a) => a.slug === slug)
}
