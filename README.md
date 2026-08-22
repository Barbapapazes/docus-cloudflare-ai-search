# docus-cloudflare-ai-search

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![pkg.pr.new](https://pkg.pr.new/badge/Barbapapazes/docus-cloudflare-ai-search)](https://pkg.pr.new/~/Barbapapazes/docus-cloudflare-ai-search)

Replace the default [Docus](https://docus.dev) search with [Cloudflare AI Search](https://developers.cloudflare.com/ai-search/). Read [Bringing Cloudflare AI Search to Docus and VitePress](https://soubiran.dev/posts/bringing-cloudflare-ai-search-to-docus-and-vitepress) for the story behind the package family.

- Replaces only the Docus `AppSearch` component.
- Queries a public Cloudflare AI Search endpoint from the browser.
- Keeps the command palette, navigation browsing, keyboard shortcut, and result routing.
- Stores the five most recently selected results in local storage.

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

When enabled, the module registers a Docus `AppSearch` replacement. Disable it or omit `enabled` to retain Docus's default search. An `app/components/AppSearch.vue` in your application can still override the module component.

The endpoint is required when the client is enabled. Use the public Cloudflare AI Search endpoint root without `/search`; the module appends that path to browser requests.

## Options

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
      request: {
        timeoutMs: 8_000,
        retrievalOptions: {
          max_num_results: 10,
        },
      },
    },
  },
})
```

| Option | Description |
| --- | --- |
| `client.enabled` | Enables the Docus `AppSearch` override. Defaults to `false`. |
| `client.endpoint` | Required when enabled. Public Cloudflare AI Search endpoint root. |
| `client.debounceMs` | Delay before sending a search request. Defaults to `200`. |
| `client.query.minLength`, `client.query.maxLength` | Browser query-length limits. Overlong queries are truncated. |
| `client.request.timeoutMs` | Browser request timeout in milliseconds. |
| `client.request.retrievalOptions` | Public retrieval and reranking options sent as `ai_search_options`. Defaults to `{ max_num_results: 10 }`. |
| `ui.placeholder` | Command-palette input placeholder. |
| `ui.messages` | Labels for empty, failed, rate-limited, and recent search states. |

> [!WARNING]
> The endpoint and every client option are sent to the browser. Never include API tokens, `Authorization` values, Cloudflare Access service-token secrets, or other credentials.

## Cloudflare setup

Create an AI Search instance, enable its public `/search` endpoint, and add your development and production origins to its authorized hosts. Index only content that is safe to expose publicly.

Use [cloudflare-ai-search-sync](https://github.com/Barbapapazes/cloudflare-ai-search-sync) to index Nuxt Content during builds.

## Related packages

- [cloudflare-ai-search-sync](https://github.com/Barbapapazes/cloudflare-ai-search-sync) synchronizes Nuxt Content and Markdown with Cloudflare AI Search.
- [vitepress-plugin-cloudflare-ai-search](https://github.com/Barbapapazes/vitepress-plugin-cloudflare-ai-search) provides the equivalent search UI for VitePress 2.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/barbapapazes">
    <img src="https://cdn.jsdelivr.net/gh/barbapapazes/static/sponsors.svg" alt="Sponsors" />
  </a>
</p>

## License

[MIT](./LICENSE) License © 2026-PRESENT [Estéban Soubiran](https://github.com/Barbapapazes)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/docus-cloudflare-ai-search/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/docus-cloudflare-ai-search

[npm-downloads-src]: https://img.shields.io/npm/dm/docus-cloudflare-ai-search.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/docus-cloudflare-ai-search

[license-src]: https://img.shields.io/npm/l/docus-cloudflare-ai-search.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/docus-cloudflare-ai-search

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com
