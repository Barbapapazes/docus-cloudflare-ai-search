# docus-cloudflare-ai-search

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/docus-cloudflare-ai-search)](https://pkg.pr.new/~/Barbapapazes/docus-cloudflare-ai-search)

Replace the default [Docus](https://docus.dev) search with [Cloudflare AI Search](https://developers.cloudflare.com/ai-search/).

- 🔎 **Native Docus integration:** replaces only the `AppSearch` surface without changing your theme.
- ☁️ **Cloudflare-powered search:** queries your public AI Search endpoint directly from the browser.
- ⌨️ **Docus-native experience:** retains the command palette, navigation browsing, keyboard shortcut, and result routing.
- 🕘 **Recent results:** keeps the five most recently selected results in browser-local storage.

## Installation

```bash
pnpm add docus-cloudflare-ai-search
```

## Usage

Add the module after Docus and provide the public AI Search endpoint root:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ['docus'],
  modules: ['docus-cloudflare-ai-search'],
  aiSearch: {
    client: {
      enabled: true,
      endpoint: 'https://search.example.com',
    },
  },
})
```

Set `endpoint` to the public Cloudflare AI Search endpoint root. The module appends `/search` when it makes browser requests.

When enabled, the module registers a Docus `AppSearch` replacement. Disable it or omit `enabled` to retain Docus's default search. An `app/components/AppSearch.vue` in your own application can still override the module component.

## Options

All settings are public browser configuration. The defaults are shown below.

```ts
export default defineNuxtConfig({
  aiSearch: {
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
      enabled: true,
      endpoint: 'https://search.example.com',
      debounceMs: 200,
      query: {
        minLength: 2,
        maxLength: 200,
      },
      results: {
        max: 10,
      },
      request: {
        timeoutMs: 8_000,
        retrievalOptions: {},
      },
    },
  },
})
```

| Option                                             | Description                                                                              |
|----------------------------------------------------|------------------------------------------------------------------------------------------|
| `client.enabled`                                   | Enables the Docus `AppSearch` override. Defaults to `false`.                             |
| `client.endpoint`                                  | Public Cloudflare AI Search endpoint root.                                               |
| `client.debounceMs`                                | Delay before sending a provider search request.                                          |
| `client.query.minLength`, `client.query.maxLength` | Browser query-length limits. Overlong queries are truncated.                             |
| `client.results.max`                               | Maximum number of provider-ranked results to render.                                     |
| `client.request.timeoutMs`                         | Browser request timeout in milliseconds.                                                 |
| `client.request.retrievalOptions`                  | Public Cloudflare AI Search retrieval and reranking options sent as `ai_search_options`. |
| `ui.placeholder`                                   | Command-palette input placeholder.                                                       |
| `ui.messages`                                      | Labels for empty, failed, rate-limited, and recent search states.                        |

## Sponsors

[Sponsor @Barbapapazes](https://github.com/sponsors/Barbapapazes)

## License

[MIT](./LICENSE) License © 2026-PRESENT [Estéban Soubiran](https://github.com/Barbapapazes)

[npm-version-src]: https://img.shields.io/npm/v/docus-cloudflare-ai-search/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/docus-cloudflare-ai-search

[npm-downloads-src]: https://img.shields.io/npm/dm/docus-cloudflare-ai-search.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/docus-cloudflare-ai-search

[license-src]: https://img.shields.io/npm/l/docus-cloudflare-ai-search.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/docus-cloudflare-ai-search

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
