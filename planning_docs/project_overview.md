# Project Overview

## Product Description

**Alpet Gexha Blog** is a modern, statically-generated technical blog and notes repository built with Astro. It serves as a personal knowledge base and blog platform, optimized for developer content including technical tutorials, code samples, and documentation. The project emphasizes performance, SEO optimization, and a clean reading experience with dark mode support.

### Key Features

- **Static Site Generation**: Pre-rendered pages for optimal performance
- **MDX Content Support**: Rich markdown with embedded components
- **Multi-layout Blog Posts**: Two post layouts (simple and column-based)
- **Tag-based Organization**: Content categorization and filtering
- **Author Support**: Multi-author content with detailed profiles
- **Internationalization**: i18n support (currently configured for English)
- **Dark Mode**: Theme switching with system preference detection
- **SEO Optimized**: Sitemap, robots.txt, and meta tags integration
- **RSS Feed**: Automated RSS generation
- **Social Sharing**: Built-in social share buttons
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Technical Context

- **Framework**: Astro 4.3.5 (Static Site Generator)
- **UI Framework**: SolidJS for interactive components
- **Styling**: Tailwind CSS with custom typography plugin
- **Content**: MDX with Astro content collections
- **Type Safety**: TypeScript with strict null checks
- **Deployment**: Docker support included

## Core Functionality Mapped to Code Modules

### 1. Content Management System

**Location**: [src/content/](../src/content/)

- **Blog Posts**: [src/content/blog/](../src/content/blog/)
  - Organized by topic (Laravel, Docker, Algorithm, Pattern)
  - MDX files with frontmatter metadata
  - Schema validation: [src/content/config.ts](../src/content/config.ts)

- **Authors**: [src/content/authors/](../src/content/authors/)
  - Author profiles with bio, social links, occupation

- **Tags**: [src/content/tags/](../src/content/tags/)
  - Tag definitions with descriptions

### 2. Page Rendering & Routing

**Location**: [src/pages/](../src/pages/)

- **Homepage**: [src/pages/index.astro](../src/pages/index.astro)
  - Displays latest posts (configurable via `ITEMS_PER_PAGE`)
  - Post summaries with cover images and tags

- **Blog List Pages**: [src/pages/blog/[...page].astro](../src/pages/blog/[...page].astro)
  - Paginated blog archive

- **Individual Posts**: [src/pages/blog/[...slug].astro](../src/pages/blog/[...slug].astro)
  - Dynamic routing for all blog posts
  - Layout selection based on post metadata

- **Tag Pages**: [src/pages/tags/](../src/pages/tags/)
  - Tag listing and filtered post views

### 3. Layout System

**Location**: [src/layouts/](../src/layouts/)

- **RootLayout**: [src/layouts/RootLayout.astro](../src/layouts/RootLayout.astro)
  - Base layout with header, footer, and meta tags
  - Theme management integration

- **PostLayout**: [src/layouts/PostLayout.astro](../src/layouts/PostLayout.astro)
  - Column-based layout for blog posts

- **SimplePostLayout**: [src/layouts/SimplePostLayout.astro](../src/layouts/SimplePostLayout.astro)
  - Single-column layout for focused reading

- **ListLayout**: [src/layouts/ListLayout.astro](../src/layouts/ListLayout.astro)
  - Post listing with pagination

### 4. Interactive Components (SolidJS)

**Location**: [src/components/solidjs/](../src/components/solidjs/)

- **ThemeSwitcher**: [src/components/solidjs/ThemeSwitcher.tsx](../src/components/solidjs/ThemeSwitcher.tsx)
  - Dark/light mode toggle with persistence

- **MobileNav**: [src/components/solidjs/MobileNav.tsx](../src/components/solidjs/MobileNav.tsx)
  - Responsive mobile navigation menu

- **ScrollTopAndComments**: [src/components/solidjs/ScrollTopAndComments.tsx](../src/components/solidjs/ScrollTopAndComments.tsx)
  - Scroll-to-top button functionality

### 5. Static Components

**Location**: [src/components/](../src/components/)

- **Navigation**: Header, HeaderLink, Footer
- **Content Display**: Card, ListPostCover, PostCover, Tag
- **Meta/SEO**: BaseHead, Analytics
- **Social**: SocialShareButtons and platform-specific buttons

### 6. Utility Functions

**Location**: [src/functions.ts](../src/functions.ts)

- `sortBlogPosts()`: Sort posts by publication date (descending)
- `excludeDrafts()`: Filter draft posts in production

### 7. Internationalization

**Location**: [src/i18n/](../src/i18n/)

- **Translations**: [src/i18n/ui.ts](../src/i18n/ui.ts)
  - Site metadata, navigation, component labels
  - Default language: English (`en`)

- **Utils**: [src/i18n/utils.ts](../src/i18n/utils.ts)
  - Translation helper functions

### 8. Configuration & Constants

**Location**: [src/consts.ts](../src/consts.ts)

- `SITE_METADATA`: Site-wide settings (URL, theme, analytics)
- `ITEMS_PER_PAGE`: Pagination configuration (default: 5)
- `POST_METADATA`: Post layout defaults
- Navigation items and external links

## Key Business Logic Locations

### Content Filtering & Sorting

- **File**: [src/functions.ts](../src/functions.ts)
- **Logic**:
  - Draft exclusion based on environment
  - Date-based sorting for chronological display

### Content Schema Validation

- **File**: [src/content/config.ts](../src/content/config.ts)
- **Logic**:
  - Zod schemas for blog, authors, tags
  - Image handling and validation
  - Reference relationships between collections

### Post Layout Selection

- **File**: [src/pages/blog/[...slug].astro](../src/pages/blog/[...slug].astro)
- **Logic**:
  - Conditional rendering based on `postLayout` field
  - Supports 'simple' or 'column' layouts

### Pagination Logic

- **Implementation**: Throughout list pages
- **Constants**: `ITEMS_PER_PAGE` from [src/consts.ts](../src/consts.ts)

## Entry Points and Main Execution Flows

### 1. Application Bootstrap

**Entry**: [astro.config.mjs](../astro.config.mjs)

```javascript
// Configures integrations, site URL, and build settings
integrations: [mdx(), sitemap(), tailwind(), solidJs(), metaTags(), robotsTxt()]
```

### 2. Development Server

```bash
npm run dev
# Starts Astro dev server on http://localhost:4321
```

### 3. Build Process

```bash
npm run build
# Static site generation to dist/ folder
```

### 4. Page Request Flow

1. **Route matching** → Astro's file-based routing
2. **Content collection query** → `getCollection()` API
3. **Data filtering** → `excludeDrafts()` + `sortBlogPosts()`
4. **Layout selection** → Based on route and post metadata
5. **Component rendering** → Astro components + SolidJS islands
6. **HTML generation** → Static HTML with hydrated interactive components

### 5. Content Addition Flow

1. Create MDX file in [src/content/blog/](../src/content/blog/)
2. Add frontmatter with required fields (title, date, summary, tags, authors)
3. Content automatically validated against schema
4. Post appears in listings and is routable at `/blog/{slug}`

### 6. Theme Switching Flow

1. User clicks theme toggle in [ThemeSwitcher.tsx](../src/components/solidjs/ThemeSwitcher.tsx)
2. Preference stored in localStorage
3. `<html>` class updated (`dark` or removed)
4. CSS applies theme-specific styles via Tailwind's dark mode

## Content Topics

The blog currently covers:

- **Laravel**: Backend development patterns, deployment, Eloquent ORM
- **Docker**: Containerization guides
- **Algorithms**: Data structures and sorting algorithms
- **Design Patterns**: Software engineering patterns (Builder, etc.)
- **General Web Development**: Various technical topics

## Future Extensibility Points

Based on commented code in [src/consts.ts](../src/consts.ts):

- Newsletter integration (Mailchimp, Buttondown, etc.)
- Comment systems (Giscus, Utterances, Disqus)
- Search functionality (Kbar, Algolia)
- Multiple analytics providers (already scaffolded)
