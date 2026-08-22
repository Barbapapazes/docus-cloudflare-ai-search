import type { SearchResult } from '../types/search-result'
import { ref } from 'vue'
import { computed, useFetch, useRuntimeConfig, watch } from '#imports'

interface CloudflareSearchResponse {
  result: {
    chunks: Array<{
      item: {
        key: string
        metadata: {
          icon: 'page' | 'section'
          url: string
          title: string
          description: string
        }
      }
    }>
  }
}

export function useSearch() {
  const config = useRuntimeConfig().public.aiSearch

  const query = ref('')
  const searchQuery = computed(() => normalizeSearchTerm(query.value))

  const { data, error, execute, status, clear } = useFetch<CloudflareSearchResponse>(`${config.client.endpoint}/search`, {
    method: 'POST',
    body: computed(() => ({
      messages: [
        {
          role: 'user',
          content: searchQuery.value,
        },
      ],
      ai_search_options: config.client.request.retrievalOptions,
    })),
    timeout: config.client.request.timeoutMs,
    retry: 0,
    immediate: false,
    watch: false,
    server: false,
    dedupe: 'cancel',
  })

  const results = computed(() => {
    if (!data.value) {
      return []
    }

    return data.value.result.chunks.map(chunk => ({
      key: chunk.item.key,
      url: chunk.item.metadata.url,
      icon: chunk.item.metadata.icon,
      title: chunk.item.metadata.title,
      description: chunk.item.metadata.description,
    } satisfies SearchResult))
  })

  async function search(input: string) {
    const normalizedSearchTerm = normalizeSearchTerm(input)
    if (normalizedSearchTerm.length < config.client.query.minLength || !config.client.endpoint) {
      clear()
      return []
    }

    await execute({ dedupe: 'cancel' })
    return []
  }

  function normalizeSearchTerm(input: string) {
    return input.trim().slice(0, config.client.query.maxLength)
  }

  watch(query, clear)

  return {
    query: query,
    results: results,
    status,
    error,
    search,
    clear,
  }
}
