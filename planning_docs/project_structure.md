# Project Structure

## Directory Tree with Purpose Annotations

```
d:\xammp\htdocs\Notes\
│
├── planning_docs/              # 📋 Project documentation (this folder)
│   ├── project_overview.md
│   ├── technical_architecture.md
│   ├── project_structure.md
│   ├── development_workflow.md
│   └── coding_patterns.md
│
├── src/                        # 🎯 Source code root
│   ├── consts.ts              # ⚙️ Global constants, site metadata, config
│   ├── env.d.ts               # 🔧 TypeScript environment declarations
│   ├── functions.ts           # 🛠️ Utility functions (sorting, filtering)
│   │
│   ├── assets/                # 📦 Static assets (images, fonts, etc.)
│   │
│   ├── components/            # 🧩 Reusable UI components
│   │   ├── Analytics.astro         # Analytics integration wrapper
│   │   ├── BaseHead.astro          # 🎯 CRITICAL: Meta tags, SEO, fonts
│   │   ├── Card.astro              # Post card component
│   │   ├── DetailsSummary.astro    # Collapsible content
│   │   ├── Figure.astro            # Image with caption
│   │   ├── Footer.astro            # Site footer
│   │   ├── FormattedDate.astro     # Date formatting utility
│   │   ├── Header.astro            # 🎯 CRITICAL: Main navigation
│   │   ├── HeaderLink.astro        # Nav link component
│   │   ├── Link.astro              # Enhanced link component
│   │   ├── ListPostCover.astro     # Post thumbnail in lists
│   │   ├── Logo.astro              # Site logo
│   │   ├── PageTitle.astro         # Page heading component
│   │   ├── Pagination.astro        # Page navigation
│   │   ├── PostCover.astro         # Featured image for posts
│   │   ├── SectionContainer.astro  # Layout wrapper
│   │   ├── Tag.astro               # Tag badge component
│   │   │
│   │   ├── analytics/         # 📊 Analytics provider components
│   │   │   ├── Amplitude.astro
│   │   │   ├── Fathom.astro
│   │   │   ├── GoogleAnalytics.astro
│   │   │   ├── Matomo.astro
│   │   │   ├── Metrical.astro
│   │   │   ├── MinimalAnalytics.astro
│   │   │   ├── Plausible.astro
│   │   │   ├── SimpleAnalytics.astro
│   │   │   └── Umami.astro
│   │   │
│   │   ├── social-icons/      # 🔗 Social media components
│   │   │   ├── index.astro                    # Social links display
│   │   │   ├── SocialShareButtons.astro       # Share button group
│   │   │   ├── icons/                         # SVG icon components
│   │   │   │   ├── Facebook.astro
│   │   │   │   ├── Github.astro
│   │   │   │   ├── Linkedin.astro
│   │   │   │   ├── Mail.astro
│   │   │   │   ├── Mastodon.astro
│   │   │   │   ├── Reddit.astro
│   │   │   │   ├── Twitter.astro
│   │   │   │   └── Youtube.astro
│   │   │   └── social-buttons/                # Platform share buttons
│   │   │       ├── FacebookShareButton.astro
│   │   │       ├── LinkedInShareButton.astro
│   │   │       ├── RedditShareButton.astro
│   │   │       └── TwitterShareButton.astro
│   │   │
│   │   └── solidjs/           # ⚡ Interactive client-side components
│   │       ├── Link.tsx                    # SolidJS router link
│   │       ├── MobileNav.tsx               # 🎯 FREQUENT: Mobile menu
│   │       ├── ScrollTopAndComments.tsx    # Scroll-to-top button
│   │       └── ThemeSwitcher.tsx           # 🎯 FREQUENT: Dark mode toggle
│   │
│   ├── content/               # 📝 Content collections (MDX files)
│   │   ├── config.ts          # 🎯 CRITICAL: Content schema definitions
│   │   │
│   │   ├── authors/           # 👤 Author profiles
│   │   │   └── default.mdx    # Default author profile
│   │   │
│   │   ├── blog/              # 📰 Blog posts (MOST FREQUENTLY MODIFIED)
│   │   │   ├── exploring-gpt.mdx
│   │   │   ├── sample-post.mdx
│   │   │   ├── simple-layout-with-cover.mdx
│   │   │   ├── simple-layout.mdx
│   │   │   ├── Simular Post.md
│   │   │   ├── two-columns-with-cover.mdx
│   │   │   ├── Algorithm/          # Algorithm topic posts
│   │   │   │   └── Quick Sort.md
│   │   │   ├── Docker/             # Docker topic posts
│   │   │   │   └── Docker.md
│   │   │   ├── Laravel/            # Laravel topic posts (ACTIVE)
│   │   │   │   ├── Builder Pattern.md
│   │   │   │   ├── Deploying a Laravel App on Digital Ocean.md
│   │   │   │   ├── Eloquent Performance Patterns.md
│   │   │   │   └── ...
│   │   │   └── Pattern/            # Design patterns posts
│   │   │       └── ...
│   │   │
│   │   └── tags/              # 🏷️ Tag definitions
│   │       ├── api.mdx
│   │       ├── caching.mdx
│   │       ├── database.mdx
│   │       ├── default.mdx
│   │       ├── DesignPatterns.mdx
│   │       ├── Eloquent.mdx
│   │       ├── laravel.mdx
│   │       ├── Performance.mdx
│   │       ├── php.mdx
│   │       └── redis.mdx
│   │
│   ├── i18n/                  # 🌍 Internationalization
│   │   ├── index.ts           # i18n exports
│   │   ├── ui.ts              # 🎯 FREQUENT: Translation strings
│   │   └── utils.ts           # Translation helper functions
│   │
│   ├── layouts/               # 📐 Page layout templates
│   │   ├── AuthorLayout.astro       # Author profile page layout
│   │   ├── ListLayout.astro         # Post listing layout
│   │   ├── ListWithTagsLayout.astro # Post list with tag filter
│   │   ├── PostLayout.astro         # 🎯 CRITICAL: Two-column post layout
│   │   ├── RootLayout.astro         # 🎯 CRITICAL: Base HTML layout
│   │   └── SimplePostLayout.astro   # Single-column post layout
│   │
│   ├── pages/                 # 🚪 Routes and page endpoints
│   │   ├── 404.astro          # Not found page
│   │   ├── about.astro        # About page
│   │   ├── index.astro        # 🎯 CRITICAL: Homepage
│   │   ├── projects.astro     # Projects showcase page
│   │   ├── rss.xml.js         # RSS feed generator
│   │   │
│   │   ├── blog/              # Blog section routes
│   │   │   ├── [...page].astro   # Paginated blog list (/blog/1, /blog/2)
│   │   │   └── [...slug].astro   # 🎯 CRITICAL: Individual post renderer
│   │   │
│   │   └── tags/              # Tag section routes
│   │       ├── index.astro       # All tags page
│   │       └── [slug]/           # Posts by tag
│   │
│   └── styles/                # 🎨 Global styles
│       └── global.css         # 🎯 FREQUENT: Custom CSS, Tailwind directives
│
├── astro.config.mjs           # 🎯 CRITICAL: Astro configuration
├── Dockerfile                 # 🐳 Container configuration
├── LICENSE                    # License file
├── package.json               # 🎯 CRITICAL: Dependencies and scripts
├── README.md                  # Project readme (currently empty)
├── tailwind.config.cjs        # 🎯 CRITICAL: Tailwind configuration
└── tsconfig.json              # 🎯 CRITICAL: TypeScript configuration
```

## Critical Files (High Modification Priority)

### Configuration Files

#### [package.json](../package.json)

**Purpose**: Dependency management and npm scripts
**Modification Frequency**: ⭐⭐⭐ Medium (when adding packages or scripts)
**Key Sections**:

- `dependencies`: Runtime dependencies
- `devDependencies`: Development tools
- `scripts`: Build, dev, preview commands

#### [astro.config.mjs](../astro.config.mjs)

**Purpose**: Astro framework configuration
**Modification Frequency**: ⭐⭐ Low (stable after initial setup)
**Key Parameters**:

- `site`: Base URL for sitemap and canonical URLs
- `integrations`: Astro plugins (MDX, Sitemap, Tailwind, SolidJS, etc.)
- `prefetch`: Link prefetching (currently `true`)

#### [tsconfig.json](../tsconfig.json)

**Purpose**: TypeScript compiler configuration
**Modification Frequency**: ⭐ Very Low
**Key Parameters**:

- `extends`: Base config from Astro (`astro/tsconfigs/strict`)
- `strictNullChecks`: Type safety (enabled)
- `paths`: Import aliases (`@/*`, `@/solid/*`)
- `jsxImportSource`: SolidJS JSX runtime

#### [tailwind.config.cjs](../tailwind.config.cjs)

**Purpose**: Tailwind CSS customization
**Modification Frequency**: ⭐⭐⭐ Medium (when adding design tokens)
**Key Parameters**:

- `content`: Files to scan for classes
- `darkMode`: Dark mode strategy (`'class'`)
- `theme.extend.colors`: Color palette (primary: pink)
- `theme.extend.fontFamily`: Custom fonts (Onest)
- `typography`: Prose styling for blog content

#### [src/consts.ts](../src/consts.ts)

**Purpose**: Global constants and site configuration
**Modification Frequency**: ⭐⭐⭐⭐ High (site settings, navigation changes)
**Key Exports**:

- `SITE_METADATA`: Site URL, repo, theme, analytics, social links
- `ITEMS_PER_PAGE`: Pagination size (default: 5)
- `POST_METADATA`: Default post layout and settings
- Navigation items

### Content Files

#### [src/content/config.ts](../src/content/config.ts)

**Purpose**: Content collection schema definitions
**Modification Frequency**: ⭐⭐⭐ Medium (when adding new content fields)
**Collections Defined**:

- `blog`: Post schema with title, date, tags, authors, cover image
- `authors`: Author profile schema
- `tags`: Tag metadata schema

**Critical for**: Type safety and content validation

#### [src/content/blog/](../src/content/blog/)

**Purpose**: Blog post content
**Modification Frequency**: ⭐⭐⭐⭐⭐ Very High (new posts added regularly)
**File Format**: `.md` or `.mdx` with frontmatter

**Example Frontmatter**:

```yaml
---
title: "Post Title"
date: 2024-01-26
summary: "Post excerpt"
tags: [laravel, php]
authors: [default]
postLayout: simple
draft: false
---
```

#### [src/i18n/ui.ts](../src/i18n/ui.ts)

**Purpose**: UI translation strings
**Modification Frequency**: ⭐⭐⭐ Medium (when adding new UI text)
**Key Sections**:

- Site metadata labels
- Page titles and descriptions
- Navigation items
- Component labels

### Layout & Page Files

#### [src/layouts/RootLayout.astro](../src/layouts/RootLayout.astro)

**Purpose**: Base HTML structure for all pages
**Modification Frequency**: ⭐⭐ Low
**Contains**: `<html>`, `<head>`, Header, Footer, main layout structure

#### [src/pages/index.astro](../src/pages/index.astro)

**Purpose**: Homepage content
**Modification Frequency**: ⭐⭐⭐ Medium
**Features**: Latest posts list, pagination, tag display

#### [src/pages/blog/[...slug].astro](../src/pages/blog/[...slug].astro)

**Purpose**: Dynamic blog post renderer
**Modification Frequency**: ⭐⭐ Low
**Logic**: Layout selection based on `postLayout` field

### Styling Files

#### [src/styles/global.css](../src/styles/global.css)

**Purpose**: Global CSS and Tailwind directives
**Modification Frequency**: ⭐⭐⭐ Medium
**Contains**:

- Tailwind `@layer` directives
- Custom CSS classes
- Global style overrides

### Interactive Components

#### [src/components/solidjs/ThemeSwitcher.tsx](../src/components/solidjs/ThemeSwitcher.tsx)

**Purpose**: Dark/light mode toggle
**Modification Frequency**: ⭐⭐ Low
**State Management**: localStorage persistence

#### [src/components/solidjs/MobileNav.tsx](../src/components/solidjs/MobileNav.tsx)

**Purpose**: Mobile navigation menu
**Modification Frequency**: ⭐⭐ Low
**Features**: Responsive drawer, close on route change

## Test File Organization

**Current State**: No test files present

**Recommended Structure** (for future):

```
tests/
├── unit/
│   ├── functions.test.ts      # Test sortBlogPosts, excludeDrafts
│   └── i18n.test.ts           # Test translation functions
├── integration/
│   ├── content.test.ts        # Test content collection queries
│   └── routing.test.ts        # Test dynamic routes
└── e2e/
    ├── navigation.test.ts     # Test navigation flows
    └── theme.test.ts          # Test theme switching
```

**Test Coverage Areas** (when implemented):

- Content collection schema validation
- Sorting and filtering utilities
- Internationalization functions
- Dynamic route generation
- Component rendering (visual regression)

## Build Artifacts and Output Locations

### Development Mode

```bash
npm run dev
```

**Output**: In-memory, no build artifacts
**Port**: `http://localhost:4321`
**Hot Module Reload**: Enabled

### Production Build

```bash
npm run build
```

**Output Directory**: `dist/`

**Generated Files**:

```
dist/
├── index.html                      # Static HTML pages
├── about/index.html
├── projects/index.html
├── blog/
│   ├── 1/index.html               # Paginated lists
│   ├── 2/index.html
│   ├── exploring-gpt/index.html   # Individual posts
│   ├── docker/index.html
│   └── laravel/
│       ├── builder-pattern/index.html
│       └── ...
├── tags/
│   ├── index.html                 # Tag index
│   ├── laravel/index.html         # Posts by tag
│   └── ...
├── rss.xml                        # RSS feed
├── robots.txt                     # Search engine directives
├── sitemap-0.xml                  # Auto-generated sitemap
└── _astro/                        # Hashed assets
    ├── *.css                      # Compiled CSS bundles
    ├── *.js                       # JavaScript bundles
    └── *.{png,jpg,webp}          # Optimized images
```

**Build Optimizations**:

- HTML minification
- CSS purging and minification
- JavaScript bundling and minification
- Image optimization (format conversion, resizing)
- Asset hashing for cache busting

### Preview Mode

```bash
npm run preview
```

**Purpose**: Test production build locally
**Output**: Serves `dist/` directory
**Port**: `http://localhost:4321`

## File Naming Conventions

### Content Files

- **Blog Posts**: Kebab-case or Title Case (e.g., `docker.md`, `Builder Pattern.md`)
- **Authors**: `default.mdx` (lowercase)
- **Tags**: Kebab-case or camelCase (e.g., `laravel.mdx`, `DesignPatterns.mdx`)

### Component Files

- **Astro Components**: PascalCase (e.g., `BaseHead.astro`, `Footer.astro`)
- **SolidJS Components**: PascalCase with `.tsx` (e.g., `ThemeSwitcher.tsx`)
- **Grouped Components**: Lowercase folder names (e.g., `analytics/`, `social-icons/`)

### Page Files

- **Static Routes**: Lowercase (e.g., `about.astro`, `projects.astro`)
- **Dynamic Routes**: Bracket notation (e.g., `[slug].astro`, `[...page].astro`)

### Configuration Files

- **JavaScript Config**: `.mjs` or `.cjs` extension based on module type
- **TypeScript Config**: `.json` or `.ts` extension

## Directory Purpose Summary

| Directory | Purpose | Modification Frequency |
|-----------|---------|------------------------|
| `src/content/blog/` | Blog post content | ⭐⭐⭐⭐⭐ Very High |
| `src/components/` | Reusable UI components | ⭐⭐⭐ Medium |
| `src/components/solidjs/` | Interactive components | ⭐⭐ Low |
| `src/pages/` | Route definitions | ⭐⭐ Low |
| `src/layouts/` | Page templates | ⭐⭐ Low |
| `src/i18n/` | Translations | ⭐⭐⭐ Medium |
| `src/styles/` | Global styles | ⭐⭐⭐ Medium |
| `src/assets/` | Static resources | ⭐⭐⭐ Medium |
| Root config files | Build/framework config | ⭐⭐ Low |
| `dist/` (generated) | Build output | N/A (auto-generated) |
