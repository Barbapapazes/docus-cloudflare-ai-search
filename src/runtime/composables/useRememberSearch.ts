import type { SearchResult } from '../types/search-result'
import { useLocalStorage } from '@vueuse/core'
import { readonly } from '#imports'

export function useRememberSearch() {
  const storedSearches = useLocalStorage<SearchResult[]>('docus:cloudflare-ai-search:recent:v1', [], {
    initOnMounted: true,
  })

  function rememberSearch(result: SearchResult) {
    storedSearches.value = [
      result,
      ...storedSearches.value.filter(item => item.key !== result.key),
    ].slice(0, 5)
  }

  return {
    rememberedSearches: readonly(storedSearches),
    rememberSearch,
  }
}
