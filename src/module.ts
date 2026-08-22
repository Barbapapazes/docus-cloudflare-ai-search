import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  client: ModuleClientOptions
  ui: ModuleUiOptions
}

interface ModuleMessages {
  empty: string
  error: string
  rateLimit: string
  recent: string
}

interface ModuleUiOptions {
  messages: ModuleMessages
  placeholder: string
}

interface ModuleClientOptionsQuery {
  maxLength: number
  minLength: number
}

interface ModuleClientOptionsRequest {
  retrievalOptions: Record<string, unknown>
  timeoutMs: number
}

interface ModuleClientOptions {
  debounceMs: number
  enabled: boolean
  endpoint: string
  query: ModuleClientOptionsQuery
  request: ModuleClientOptionsRequest
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'docus-cloudflare-ai-search',
    configKey: 'aiSearch',
  },
  defaults: {
    ui: {
      placeholder: 'Search documentation',
      messages: {
        empty: 'No results found.',
        error: 'Search is temporarily unavailable. Please try again.',
        rateLimit: 'Too many searches. Please try again shortly.',
        recent: 'Recent AI searches',
      },
    },
    client: {
      enabled: false,
      endpoint: '',
      debounceMs: 200,
      query: {
        minLength: 2,
        maxLength: 200,
      },
      request: {
        timeoutMs: 8_000,
        retrievalOptions: {
          max_num_results: 10,
        },
      },
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.aiSearch = options

    if (!options.client.enabled) {
      return
    }

    addComponent({
      priority: 100,
      name: 'AppSearch',
      filePath: resolver.resolve('./runtime/components/AppSearch.vue'),
    })
  },
})
