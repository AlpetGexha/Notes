# Technical Architecture

## Tech Stack Overview

### Core Framework

- **Astro**: `4.3.5`
  - Static Site Generator with islands architecture
  - Import pattern: `import { ... } from 'astro:content'`
  - File extension: `.astro`

### UI & Interactivity

- **SolidJS**: `1.8.14`
  - Used for interactive components (theme switcher, mobile nav, scroll controls)
  - Import pattern: `import { createSignal } from 'solid-js'`
  - JSX Import Source: `solid-js` (configured in tsconfig.json)
  - File extension: `.tsx`

### Styling

- **Tailwind CSS**: `3.3.5`
  - Utility-first CSS framework
  - Config: [tailwind.config.cjs](../tailwind.config.cjs)
  - Dark mode: `class` strategy
  - Custom colors: Pink primary, Gray scale
  - Font: Onest (via @fontsource)

### Typography & Forms

- **@tailwindcss/typography**: `0.5.10`
  - Prose styling for blog content
  - Custom link colors and heading styles

- **@tailwindcss/forms**: `0.5.7`
  - Form element styling (future newsletter forms)

### Type Safety

- **TypeScript**: `5.3.3`
  - Strict null checks enabled
  - Base config extends: `astro/tsconfigs/strict`
  - Path aliases: `@/*` → `src/*`, `@/solid/*` → `src/components/solidjs/*`

## Core Dependencies with Usage Examples

### 1. Astro Content Collections

**Package**: Built into Astro
**Usage**: Type-safe content management

```typescript
// Define collections with Zod schemas
import { defineCollection, reference, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    cover: image().optional(),
    tags: z.array(reference('tags')),
    authors: z.array(reference('authors')),
    // ... more fields
  }),
});
```

**Query Pattern**:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const filteredPosts = await getCollection('blog', ({ data }) => !data.draft);
---
```

### 2. Astro MDX Integration

**Package**: `@astrojs/mdx` `2.1.1`
**Usage**: Markdown with JSX components

```astro
---
// In blog posts (*.mdx files)
import Figure from '@/components/Figure.astro';
---

# Post Title

<Figure src="/image.png" caption="Example" />
```

### 3. Astro RSS

**Package**: `@astrojs/rss` `4.0.5`
**File**: [src/pages/rss.xml.js](../src/pages/rss.xml.js)

Expected usage pattern:

```javascript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'Blog Title',
    items: posts.map(post => ({ ...post.data, link: `/blog/${post.slug}` })),
  });
}
```

### 4. Astro Sitemap

**Package**: `@astrojs/sitemap` `3.0.5`
**Config**: [astro.config.mjs](../astro.config.mjs)

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tasb.yon.fun/',
  integrations: [sitemap()],
});
```

### 5. SEO & Meta Tags

**Packages**:

- `astro-meta-tags` `0.2.1`
- `astro-seo` `0.8.0`

**Usage**: [src/components/BaseHead.astro](../src/components/BaseHead.astro)

### 6. Robots.txt Generation

**Package**: `astro-robots-txt` `1.0.0`

Automatically generates robots.txt based on SITE_METADATA.robots setting.

### 7. Fonts

**Package**: `@fontsource/onest` `5.0.2`

**Usage**:

```javascript
// Import in layout or component
import '@fontsource/onest';
```

**Tailwind Config**:

```javascript
fontFamily: {
  sans: ['Onest', ...fontFamily.sans],
}
```

## Architecture Patterns

### 1. Islands Architecture

**Pattern**: Partial hydration for performance
**Location**: Interactive SolidJS components

```astro
<!-- Static Astro component -->
<Header />

<!-- Interactive island (client-side JS loaded) -->
<ThemeSwitcher client:load />

<!-- Lazy-loaded on visibility -->
<ScrollTopAndComments client:visible />
```

**Hydration Strategies**:

- `client:load` - Hydrate immediately on page load
- `client:visible` - Hydrate when scrolled into view
- `client:idle` - Hydrate when browser is idle

### 2. File-Based Routing

**Pattern**: Pages automatically routed based on file structure

```
src/pages/
├── index.astro           → /
├── about.astro          → /about
├── blog/
│   ├── [...page].astro  → /blog/1, /blog/2 (pagination)
│   └── [...slug].astro  → /blog/{any-post-slug}
└── tags/
    └── [slug]/          → /tags/{tag-name}
```

### 3. Content Collections Pattern

**File**: [src/content/config.ts](../src/content/config.ts)

**Benefits**:

- Type-safe frontmatter
- Schema validation
- Reference integrity (tags, authors)
- Auto-generated TypeScript types

### 4. Layout Composition

**Pattern**: Nested layouts with slot-based composition

```
RootLayout (base HTML, header, footer)
  ├── PostLayout (two-column with sidebar)
  └── SimplePostLayout (single column)
```

**Implementation**:

```astro
---
// RootLayout.astro
---
<html>
  <Header />
  <main>
    <slot /> <!-- Child layout renders here -->
  </main>
  <Footer />
</html>
```

### 5. Component Organization

**Pattern**: Separation of static (Astro) and interactive (SolidJS) components

```
src/components/
├── *.astro              # Static, server-rendered
├── solidjs/
│   └── *.tsx           # Interactive, client-hydrated
├── analytics/          # Grouped by feature
└── social-icons/       # Grouped by feature
```

### 6. Internationalization Pattern

**Files**: [src/i18n/](../src/i18n/)

```typescript
// Define translations
export const ui = {
  'en': {
    'nav.home': 'Home',
    'pages.home.latestPosts': 'Latest posts',
  }
};

// Use in components
const t = useTranslations();
<h1>{t('pages.home.latestPosts')}</h1>
```

**Extensibility**: Ready for multi-language support by adding keys like `'es'`, `'fr'`, etc.

## API Endpoints and Data Flow

### Static Data Flow

```
Content Files (.mdx)
  ↓
Content Collections API
  ↓
getCollection() / getEntry()
  ↓
Filter & Transform (functions.ts)
  ↓
Astro Component Props
  ↓
Static HTML Generation
```

### RSS Feed Endpoint

**Route**: `/rss.xml`
**File**: [src/pages/rss.xml.js](../src/pages/rss.xml.js)
**HTTP Method**: GET
**Output**: XML feed of blog posts

### No Traditional REST API

This is a statically generated site with no backend API. All data comes from:

- MDX files in content collections
- Configuration in `consts.ts`
- Translation files in `i18n/`

## Database Schemas (Content Collections)

### Blog Schema

**Location**: [src/content/config.ts](../src/content/config.ts)

```typescript
{
  title: string,              // Required
  cover: ImageMetadata?,      // Optional image
  date: Date,                 // Required, coerced from string
  tags: Reference<'tags'>[],  // References to tag collection
  lastmod: Date?,             // Optional modification date
  draft: boolean,             // Default: false
  summary: string,            // Required excerpt
  images: string?,            // Optional
  authors: Reference<'authors'>[], // References to authors
  postLayout: 'simple' | 'column',  // Default: from POST_METADATA
  canonicalUrl: string?,      // Optional SEO field
  related: Reference<'blog'>[] // Related posts
}
```

### Authors Schema

```typescript
{
  name: string,          // Required
  avatar: string?,       // Optional image path
  occupation: string?,   // Job title
  shortBio: string,      // Required bio
  company: string?,      // Company name
  email: string,         // Valid email required
  twitter: string?,      // URL
  linkedin: string?,     // URL
  github: string?,       // URL
  layout: string?        // URL (likely unused)
}
```

### Tags Schema

```typescript
{
  name: string,          // Display name
  description: string    // Tag description
}
```

## External Service Integrations

### Analytics (Prepared but Not Active)

**Configuration**: [src/consts.ts](../src/consts.ts) `SITE_METADATA.analytics`

**Supported Providers**:

1. **Fathom Analytics**
   - Component: [src/components/analytics/Fathom.astro](../src/components/analytics/Fathom.astro)
   - Config: `fantom.site`, `fantom.src`

2. **Google Analytics**
   - Component: [src/components/analytics/GoogleAnalytics.astro](../src/components/analytics/GoogleAnalytics.astro)
   - Config: `googleAnalyticsId`

3. **Plausible**
   - Component: [src/components/analytics/Plausible.astro](../src/components/analytics/Plausible.astro)
   - Config: `plausible.domain`, `plausible.src`

4. **Umami**
   - Component: [src/components/analytics/Umami.astro](../src/components/analytics/Umami.astro)
   - Config: `umami.site`, `umami.dataId`, `umami.host`

5. **Matomo**
   - Component: [src/components/analytics/Matomo.astro](../src/components/analytics/Matomo.astro)
   - Config: `matomo.id`, `matomo.url`

6. **Simple Analytics**
   - Component: [src/components/analytics/SimpleAnalytics.astro](../src/components/analytics/SimpleAnalytics.astro)
   - Config: `simpleAnalytics` (boolean)

7. **Minimal Analytics**
   - Component: [src/components/analytics/MinimalAnalytics.astro](../src/components/analytics/MinimalAnalytics.astro)
   - Config: `minimalAnalyticsId`

8. **Metrical**
   - Component: [src/components/analytics/Metrical.astro](../src/components/analytics/Metrical.astro)
   - Config: `metricalApp`

**Activation Method**: Set values in [src/consts.ts](../src/consts.ts), component conditionally renders based on config.

### Social Media Integrations

**Location**: [src/components/social-icons/](../src/components/social-icons/)

**Share Buttons**:

- Facebook: [FacebookShareButton.astro](../src/components/social-icons/social-buttons/FacebookShareButton.astro)
- Twitter: [TwitterShareButton.astro](../src/components/social-icons/social-buttons/TwitterShareButton.astro)
- LinkedIn: [LinkedInShareButton.astro](../src/components/social-icons/social-buttons/LinkedInShareButton.astro)
- Reddit: [RedditShareButton.astro](../src/components/social-icons/social-buttons/RedditShareButton.astro)

**Authentication**: None required (client-side share URLs)

### Future Integrations (Commented in Code)

**Newsletter Providers** (from consts.ts comments):

- Mailchimp
- Buttondown
- ConvertKit
- Klaviyo
- Revue
- EmailOctopus

**Comment Systems**:

- Giscus (GitHub Discussions)
- Utterances (GitHub Issues)
- Disqus

## Build Output Structure

```
dist/
├── index.html              # Homepage
├── about/index.html        # Static pages
├── blog/
│   ├── 1/index.html       # Paginated lists
│   ├── {slug}/index.html  # Individual posts
├── tags/
│   └── {tag}/index.html   # Tag pages
├── rss.xml                # RSS feed
├── robots.txt             # Generated robots file
├── sitemap-*.xml          # Generated sitemap
└── _astro/                # Compiled assets (CSS, JS, images)
```

## Performance Optimizations

1. **Static Generation**: Zero server-side processing at runtime
2. **Islands Architecture**: Minimal JavaScript shipped to browser
3. **Image Optimization**: Astro's built-in image processing
4. **CSS Purging**: Tailwind removes unused styles in production
5. **Code Splitting**: Automatic per-route JavaScript bundles
6. **Prefetching**: Enabled in [astro.config.mjs](../astro.config.mjs) (`prefetch: true`)

## Environment Configuration

No `.env` file currently in use, but prepared for:

- Analytics API keys
- Newsletter service credentials
- Comment system tokens
- Social OAuth tokens (for Giscus/Utterances)

**Expected .env pattern** (based on comments):

```env
NEXT_PUBLIC_GISCUS_REPO=
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

## Docker Configuration

**File**: [Dockerfile](../Dockerfile)

```dockerfile
FROM node:18-alpine
WORKDIR /project
COPY . .
RUN npm install
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

**Port**: 4321 (Astro default)
**Network Binding**: `0.0.0.0` for container access
