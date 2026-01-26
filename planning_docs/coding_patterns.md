# Coding Patterns

## Common Code Patterns and Conventions

### 1. Astro Component Pattern
**Convention**: Server-rendered components with frontmatter and template sections

**File**: Any `.astro` file

**Pattern**:
```astro
---
// Frontmatter: Server-side JavaScript/TypeScript
import Component from '@/components/Component.astro';
import { getCollection } from 'astro:content';

// Data fetching
const posts = await getCollection('blog');

// Props interface
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<!-- Template: HTML with component syntax -->
<div class="container">
  <h1>{title}</h1>
  {description && <p>{description}</p>}
  
  {posts.map(post => (
    <Component {...post} />
  ))}
</div>

<style>
  /* Component-scoped styles (optional) */
  .container {
    max-width: 1200px;
  }
</style>
```

**Key Points**:
- Frontmatter executes on server only
- Template is compiled to static HTML
- Props are type-safe with TypeScript
- Styles are scoped by default

**Example**: [src/components/Header.astro](../src/components/Header.astro)

---

### 2. SolidJS Reactive Component Pattern
**Convention**: Client-side interactive components with signals

**File**: `.tsx` files in [src/components/solidjs/](../src/components/solidjs/)

**Pattern**:
```typescript
import { createSignal, onMount } from 'solid-js';

interface Props {
  initialValue?: string;
}

export default function InteractiveComponent(props: Props) {
  // Reactive state
  const [count, setCount] = createSignal(0);
  const [isOpen, setIsOpen] = createSignal(false);
  
  // Lifecycle
  onMount(() => {
    console.log('Component mounted');
  });
  
  // Event handlers
  const handleClick = () => {
    setCount(c => c + 1);
  };
  
  return (
    <div>
      <button onClick={handleClick}>
        Count: {count()}
      </button>
    </div>
  );
}
```

**Key Points**:
- Use `createSignal` for reactive state
- Access signals with function call: `count()`
- Update signals with setter: `setCount(value)`
- No virtual DOM (direct DOM updates)

**Example**: [src/components/solidjs/ThemeSwitcher.tsx](../src/components/solidjs/ThemeSwitcher.tsx)

---

### 3. Content Collection Query Pattern
**Convention**: Type-safe content fetching with filtering

**Pattern**:
```typescript
import { getCollection, getEntry } from 'astro:content';
import { excludeDrafts, sortBlogPosts } from '@/functions';

// Get all posts
const allPosts = await getCollection('blog');

// Get filtered posts
const publishedPosts = await getCollection('blog', excludeDrafts);

// Get sorted posts
const posts = await getCollection('blog', excludeDrafts)
  .then(sortBlogPosts);

// Get single entry
const post = await getEntry('blog', 'my-post-slug');

// Get by tag (manual filter)
const laravelPosts = await getCollection('blog', ({ data }) => {
  return data.tags.some(tag => tag.slug === 'laravel');
});
```

**Location**: Page components, layout files

**Examples**: 
- [src/pages/index.astro](../src/pages/index.astro)
- [src/pages/blog/[...slug].astro](../src/pages/blog/[...slug].astro)

---

### 4. Dynamic Routing Pattern
**Convention**: File-based routing with `getStaticPaths()`

**File**: `[...slug].astro` or `[param].astro`

**Pattern**:
```astro
---
import { getCollection } from 'astro:content';

// Required for dynamic routes
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  
  return posts.map((post, index) => ({
    params: { slug: post.slug },
    props: { 
      post, 
      next: posts[index + 1],
      prev: posts[index - 1]
    },
  }));
}

// Access props
const { post, next, prev } = Astro.props;
---

<article>
  <h1>{post.data.title}</h1>
  <!-- Content rendering -->
</article>
```

**Key Points**:
- `getStaticPaths()` generates routes at build time
- `params` defines URL parameters
- `props` passes data to component
- All routes pre-rendered (no SSR)

**Example**: [src/pages/blog/[...slug].astro](../src/pages/blog/[...slug].astro)

---

### 5. Layout Composition Pattern
**Convention**: Nested layouts with slots

**Pattern**:
```astro
---
// RootLayout.astro (Base layout)
import Header from '@/components/Header.astro';
import Footer from '@/components/Footer.astro';
---

<html>
  <body>
    <Header />
    <main>
      <slot /> <!-- Child content here -->
    </main>
    <Footer />
  </body>
</html>
```

```astro
---
// PostLayout.astro (Specific layout)
import RootLayout from './RootLayout.astro';

const { post } = Astro.props;
---

<RootLayout title={post.data.title}>
  <article>
    <slot /> <!-- Post content here -->
  </article>
</RootLayout>
```

**Usage in pages**:
```astro
---
import PostLayout from '@/layouts/PostLayout.astro';
---

<PostLayout>
  <h1>My Post</h1>
  <p>Content</p>
</PostLayout>
```

**Example**: [src/layouts/RootLayout.astro](../src/layouts/RootLayout.astro)

---

### 6. Internationalization Pattern
**Convention**: Translation key-based text rendering

**File**: [src/i18n/ui.ts](../src/i18n/ui.ts), [src/i18n/utils.ts](../src/i18n/utils.ts)

**Pattern**:
```typescript
// Define translations
export const ui = {
  'en': {
    'nav.home': 'Home',
    'pages.home.welcome': 'Welcome to {siteName}',
  },
  'es': {
    'nav.home': 'Inicio',
    'pages.home.welcome': 'Bienvenido a {siteName}',
  }
};

// Use in components
import { useTranslations } from '@/i18n';

const t = useTranslations();

// Simple translation
<h1>{t('nav.home')}</h1>

// With interpolation
<h1>{t('pages.home.welcome', { siteName: 'My Blog' })}</h1>
```

**Key Points**:
- Centralized translation keys
- Support for variable interpolation
- Easy to add new languages

---

## Error Handling Approaches

### 1. Content Validation Errors
**Pattern**: Schema validation at build time

**Location**: [src/content/config.ts](../src/content/config.ts)

```typescript
import { z } from 'astro:content';

const blog = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string().min(1, 'Title is required'),
    date: z.coerce.date(),
    tags: z.array(reference('tags')).default(['default']),
    // Validation errors show at build time
  }),
});
```

**Error Display**:
```
❌ Error: Invalid content entry
   - title: Required
   - date: Invalid date format
```

**Resolution**: Fix frontmatter in MDX files

---

### 2. Missing Content Handling
**Pattern**: Null checks and fallbacks

```astro
---
const posts = await getCollection('blog');
---

{!posts.length && (
  <p>{t('pages.home.noPosts')}</p>
)}

{posts.map(post => {
  const { title, summary, cover } = post.data;
  
  return (
    <article>
      <h2>{title}</h2>
      {summary && <p>{summary}</p>}
      {cover ? <img src={cover} /> : <DefaultImage />}
    </article>
  );
})}
```

**Example**: [src/pages/index.astro](../src/pages/index.astro)

---

### 3. 404 Error Handling
**Pattern**: Custom 404 page

**File**: [src/pages/404.astro](../src/pages/404.astro)

```astro
---
import RootLayout from '@/layouts/RootLayout.astro';
import { useTranslations } from '@/i18n';

const t = useTranslations();
---

<RootLayout 
  title={t('pages.404.title')}
  description={t('pages.404.description')}
>
  <div>
    <h1>404 - {t('pages.404.title')}</h1>
    <p>{t('pages.404.description')}</p>
    <a href="/">{t('pages.404.backToHome')}</a>
  </div>
</RootLayout>
```

---

### 4. TypeScript Error Prevention
**Pattern**: Strict type checking

```typescript
// Enable in tsconfig.json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
  }
}

// Use optional chaining
const authorName = post.data.authors?.[0]?.data.name ?? 'Unknown';

// Type guards
if (post.data.cover) {
  // TypeScript knows cover exists here
  renderImage(post.data.cover);
}
```

---

## Logging and Monitoring Implementations

### 1. Console Logging Pattern
**Development Logging**:

```typescript
---
// In Astro frontmatter (server-side)
console.log('[Server] Building page:', Astro.url.pathname);
console.log('[Server] Posts count:', posts.length);
---

// In SolidJS components (client-side)
export default function Component() {
  onMount(() => {
    console.log('[Client] Component mounted');
  });
  
  const handleClick = () => {
    console.debug('[Debug] Button clicked', { timestamp: Date.now() });
  };
}
```

**Convention**:
- `[Server]` prefix for build-time logs
- `[Client]` prefix for runtime logs
- Use `console.debug` for verbose logging
- Use `console.error` for errors

---

### 2. Analytics Integration Pattern
**Location**: [src/components/Analytics.astro](../src/components/Analytics.astro)

**Pattern**:
```astro
---
import { SITE_METADATA } from '@/consts';
import GoogleAnalytics from './analytics/GoogleAnalytics.astro';
import Plausible from './analytics/Plausible.astro';
---

{SITE_METADATA.analytics.googleAnalyticsId && (
  <GoogleAnalytics id={SITE_METADATA.analytics.googleAnalyticsId} />
)}

{SITE_METADATA.analytics.plausible.domain && (
  <Plausible 
    domain={SITE_METADATA.analytics.plausible.domain}
    src={SITE_METADATA.analytics.plausible.src}
  />
)}
```

**Key Points**:
- Conditional rendering based on config
- Script tags injected in `<head>`
- No runtime overhead if disabled

---

### 3. Build-Time Monitoring
**Pattern**: Logging during static generation

```typescript
---
const startTime = Date.now();
const posts = await getCollection('blog');
const buildTime = Date.now() - startTime;

console.log(`✓ Loaded ${posts.length} posts in ${buildTime}ms`);
---
```

---

## Security Patterns and Authentication Flows

### 1. No Server-Side Authentication
**Current State**: Static site with no authentication

**Pattern**: Client-side only (if needed)

```typescript
// For protected content (future implementation)
import { createSignal, onMount } from 'solid-js';

export default function ProtectedContent() {
  const [isAuthorized, setIsAuthorized] = createSignal(false);
  
  onMount(() => {
    // Check localStorage or cookie
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Validate token (client-side only for static sites)
      setIsAuthorized(verifyToken(token));
    }
  });
  
  return (
    <Show when={isAuthorized()} fallback={<LoginPrompt />}>
      <SecretContent />
    </Show>
  );
}
```

---

### 2. Content Security Pattern
**Pattern**: Draft post filtering

**File**: [src/functions.ts](../src/functions.ts)

```typescript
export const excludeDrafts = ({ data }: CollectionEntry<'blog'>): boolean => {
  // In production: hide drafts
  // In development: show drafts
  return import.meta.env.PROD ? !data.draft : true;
}
```

**Usage**:
```typescript
const publishedPosts = await getCollection('blog', excludeDrafts);
```

---

### 3. XSS Prevention
**Pattern**: Astro auto-escapes output

```astro
---
const userInput = "<script>alert('xss')</script>";
---

<!-- Automatically escaped -->
<div>{userInput}</div>
<!-- Output: &lt;script&gt;alert('xss')&lt;/script&gt; -->

<!-- For trusted HTML (use sparingly) -->
<div set:html={trustedHTML} />
```

---

### 4. External Link Security
**Pattern**: Add `rel` attributes to external links

```astro
<Link 
  href={externalUrl}
  rel="noopener noreferrer"
  target="_blank"
>
  External Link
</Link>
```

**In components**: [src/components/Link.astro](../src/components/Link.astro)

---

## Performance Optimization Techniques

### 1. Image Optimization Pattern
**Astro Built-in**:

```astro
---
import { Image } from 'astro:assets';
import coverImage from '../assets/cover.png';
---

<!-- Optimized with automatic format conversion -->
<Image 
  src={coverImage} 
  alt="Cover" 
  width={800} 
  height={600}
  format="webp"
  quality={80}
/>
```

**For remote images**:
```astro
<Image 
  src="https://example.com/image.jpg"
  alt="Remote image"
  width={800}
  height={600}
  inferSize
/>
```

---

### 2. Lazy Loading Pattern
**SolidJS Components**:

```astro
---
import ThemeSwitcher from '@/components/solidjs/ThemeSwitcher.tsx';
import ScrollTop from '@/components/solidjs/ScrollTopAndComments.tsx';
---

<!-- Load immediately (critical) -->
<ThemeSwitcher client:load />

<!-- Load when visible (non-critical) -->
<ScrollTop client:visible />

<!-- Load when idle (lowest priority) -->
<Comments client:idle />
```

**Hydration Directives**:
- `client:load` - High priority
- `client:visible` - When scrolled into view
- `client:idle` - When browser is idle
- `client:media` - Media query based

---

### 3. CSS Optimization Pattern
**Tailwind Purging** (automatic):

```javascript
// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Unused classes automatically removed in production
};
```

**Critical CSS** (inline in `<head>`):

```astro
<style is:global>
  /* Critical above-the-fold styles */
  body {
    font-family: 'Onest', sans-serif;
  }
</style>
```

---

### 4. Code Splitting Pattern
**Automatic by Astro**:
- Each page gets its own JavaScript bundle
- Shared code extracted to common chunks
- Dynamic imports create separate bundles

**Manual code splitting**:
```typescript
// Dynamic import for heavy libraries
const heavyLib = await import('heavy-library');
```

---

### 5. Prefetching Pattern
**Configuration**: [astro.config.mjs](../astro.config.mjs)

```javascript
export default defineConfig({
  prefetch: true, // Prefetch links on hover/focus
});
```

**In components**:
```astro
<a href="/blog" data-astro-prefetch>
  Blog (will prefetch on hover)
</a>
```

---

## Code Organization Principles

### 1. Separation of Concerns
**Structure**:
```
src/
├── components/     # UI components (presentation)
├── layouts/        # Page templates (structure)
├── pages/          # Routes (routing logic)
├── content/        # Data (content)
├── functions.ts    # Business logic (utilities)
└── consts.ts       # Configuration (settings)
```

---

### 2. Component Composition
**Principle**: Build complex UIs from small components

**Example**:
```astro
<!-- High-level component -->
<BlogPost>
  <PostHeader />
  <PostCover />
  <PostContent />
  <PostFooter>
    <AuthorBio />
    <SocialShare />
    <RelatedPosts />
  </PostFooter>
</BlogPost>
```

---

### 3. DRY (Don't Repeat Yourself)
**Pattern**: Extract reusable logic

```typescript
// ❌ Bad: Repeated logic
const posts1 = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date - a.data.date);

const posts2 = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a, b) => b.data.date - a.data.date);

// ✅ Good: Reusable function
import { excludeDrafts, sortBlogPosts } from '@/functions';

const posts1 = await getCollection('blog', excludeDrafts).then(sortBlogPosts);
const posts2 = await getCollection('blog', excludeDrafts).then(sortBlogPosts);
```

---

### 4. Type Safety
**Pattern**: Leverage TypeScript

```typescript
// Define types from content collections
import type { CollectionEntry } from 'astro:content';

type BlogPost = CollectionEntry<'blog'>;
type Author = CollectionEntry<'authors'>;

// Use in components
interface Props {
  post: BlogPost;
  author: Author;
}

const { post, author }: Props = Astro.props;
```

---

### 5. Configuration Over Code
**Pattern**: Centralize settings

```typescript
// ❌ Bad: Hardcoded values
<a href="https://tasb.yon.fun/">Home</a>

// ✅ Good: Use constants
import { SITE_METADATA } from '@/consts';

<a href={SITE_METADATA.siteUrl}>Home</a>
```

**File**: [src/consts.ts](../src/consts.ts)

---

### 6. Import Aliasing
**Pattern**: Use path aliases for cleaner imports

```typescript
// ❌ Bad: Relative paths
import Header from '../../../components/Header.astro';

// ✅ Good: Absolute with alias
import Header from '@/components/Header.astro';
```

**Configuration**: [tsconfig.json](../tsconfig.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"],
      "@/solid/*": ["src/components/solidjs/*"]
    }
  }
}
```

---

### 7. File Naming Conventions
**Components**: PascalCase
- `Header.astro`
- `ThemeSwitcher.tsx`
- `PostLayout.astro`

**Pages**: lowercase or kebab-case
- `index.astro`
- `about.astro`
- `[...slug].astro`

**Content**: Flexible (kebab-case or Title Case)
- `quick-sort.md`
- `Builder Pattern.md`

**Utils**: camelCase
- `functions.ts`
- `consts.ts`

---

## Best Practices Summary

### Do ✅
- Use content collections for all structured content
- Leverage TypeScript for type safety
- Extract reusable logic to utility functions
- Use path aliases for imports
- Implement progressive enhancement (static first, hydrate if needed)
- Prefer server-side rendering over client-side
- Use Tailwind utility classes over custom CSS
- Validate content schemas strictly
- Keep components small and focused
- Use semantic HTML

### Don't ❌
- Don't hydrate components unnecessarily (`client:*` directives)
- Don't fetch data client-side if it can be done at build time
- Don't hardcode configuration values
- Don't duplicate logic across components
- Don't ignore TypeScript errors
- Don't skip accessibility attributes
- Don't use `any` type in TypeScript
- Don't commit `.env` files
- Don't skip content validation

---

## Code Review Checklist

- [ ] TypeScript types defined for all props
- [ ] Content schema matches frontmatter
- [ ] No hardcoded URLs or config values
- [ ] Proper error handling for edge cases
- [ ] Accessibility attributes (alt, aria-label, etc.)
- [ ] Responsive design tested
- [ ] Dark mode styles implemented
- [ ] Performance optimizations (lazy loading, code splitting)
- [ ] SEO meta tags included
- [ ] Translation keys used instead of hardcoded text
- [ ] Build completes without errors
- [ ] No console errors in development
