import {
  Bed, Utensils, Wind, Snowflake, Wifi, Leaf, Car, Shield, Key,
  Mountain, Check, Coffee, Waves, Sun,
} from 'lucide-react'

// Curated icon set exposed to the CMS. Keep this list small and
// deliberate: it is a guardrail, not a full lucide-react picker.
export const ICONS = {
  Bed, Utensils, Wind, Snowflake, Wifi, Leaf, Car, Shield, Key,
  Mountain, Check, Coffee, Waves, Sun,
} as const

export type IconName = keyof typeof ICONS

export function getIcon(name: string) {
  return ICONS[name as IconName] ?? Check
}
