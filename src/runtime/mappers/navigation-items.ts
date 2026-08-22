import type { ContentNavigationItem } from '@nuxt/content'
import type { ContentSearchItem } from '@nuxt/ui'

export function toNavigationItems(items: ContentNavigationItem[] = []): ContentSearchItem[] {
  return items.flatMap(item => item.children?.length
    ? toNavigationItems(item.children)
    : item.path
      ? [
          {
            label: item.title,
            to: item.path,
          },
        ]
      : [])
}
