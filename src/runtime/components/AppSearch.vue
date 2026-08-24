<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { useRoute, useRuntimeConfig } from '#app'
import { computed, onBeforeUnmount, watch, useContentSearch } from '#imports'
import { LazyUContentSearch } from '#components'
import { useSearch } from '../composables/useSearch'
import { useRememberSearch } from '../composables/useRememberSearch'
import { toSearchItem } from '../mappers/search-item'
import { toNavigationItems } from '../mappers/navigation-items'
import type { CommandPaletteGroup, ContentSearchItem } from '@nuxt/ui'

const props = defineProps<{
  navigation?: ContentNavigationItem[]
}>()

const { open } = useContentSearch()
const route = useRoute()
const config = useRuntimeConfig().public.aiSearch

const { query, results, status, error, search, clear } = useSearch()
const { rememberedSearches, rememberSearch } = useRememberSearch()

const statusMessage = computed(() => {
  if (error.value?.status === 429) {
    return config.ui.messages.rateLimit
  }
  if (status.value === 'error') {
    return config.ui.messages.error
  }
  if (status.value === 'success' && !results.value.length) {
    return config.ui.messages.empty
  }
  return undefined
})

const statusIcon = computed(() => {
  if (status.value === 'error') {
    return 'i-lucide-circle-alert'
  }
  return 'i-lucide-search-x'
})

const statusGroups = computed(() => {
  if (!statusMessage.value) {
    return []
  }

  return [{
    id: 'cloudflare-ai-search-status',
    ignoreFilter: true as const,
    items: [{
      label: statusMessage.value,
      icon: statusIcon.value,
      disabled: true,
    }],
  }]
})

const groups = computed<CommandPaletteGroup<ContentSearchItem>[]>(() => [
  ...(!query.value && props.navigation?.length
    ? [
        {
          id: 'navigation',
          ignoreFilter: true as const,
          items: toNavigationItems(props.navigation),
        },
      ]
    : []),
  ...(results.value.length
    ? [
        {
          id: 'cloudflare-ai-search',
          ignoreFilter: true as const,
          items: results.value.map((result) => {
            return {
              ...toSearchItem(result),
              onSelect: () => rememberSearch(result),
            }
          }) }]
    : []),
  ...(rememberedSearches.value.length
    ? [
        {
          id: 'recent-cloudflare-ai-search',
          label: config.ui.messages.recent,
          ignoreFilter: true as const,
          items: rememberedSearches.value.map((remembered) => {
            return {
              ...toSearchItem(remembered),
              onSelect: () => rememberSearch(remembered),
            }
          },
          ),
        },
      ]
    : []),
  ...statusGroups.value,
])

watch(open, (isOpen) => {
  if (!isOpen) {
    query.value = ''
    clear()
  }
})

watch(() => route.fullPath, () => {
  open.value = false
})

onBeforeUnmount(clear)
</script>

<template>
  <LazyUContentSearch
    v-model:search-term="query"
    :groups="groups"
    :search="search"
    :search-delay="config.client.debounceMs"
    :preserve-group-order="true"
    :loading="status === 'pending'"
    :placeholder="config.ui.placeholder"
  />
</template>
