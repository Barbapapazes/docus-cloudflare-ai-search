import type { SearchResult } from '../types/search-result'

export function toSearchItem(result: SearchResult) {
    return {
    label: result.title,
    description: result.description,
    to: result.url,
    icon: result.icon === 'section' ? 'i-lucide-hash' : 'i-lucide-file',
    level: result.icon === 'section' ? 2 : 1,
  }
}
