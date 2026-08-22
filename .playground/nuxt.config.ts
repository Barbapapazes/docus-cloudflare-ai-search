export default defineNuxtConfig({
  extends: ['docus'],
  modules: [
    'docus-cloudflare-ai-search',
    'cloudflare-ai-search-sync/nuxt',
  ],
  aiSearch: {
    client: {
      enabled: true,
      endpoint: 'https://search.docus-cloudflare-ai-search.barbapapazes.dev',
    },
  },
  cloudflareAISearchSync: {
    enabled: true,
  },
})
