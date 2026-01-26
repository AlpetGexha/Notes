# Development Workflow

## Build Commands

### Development Server
**Start local development server with hot reload**

```bash
npm run dev
```

**Alternate command**:
```bash
npm run start
```

**Details**:
- Launches Astro dev server
- Default URL: `http://localhost:4321`
- Hot Module Replacement (HMR) enabled
- Auto-reloads on file changes
- Source maps enabled for debugging

**Use when**: 
- Writing new content
- Developing components
- Testing layouts
- Debugging issues

---

### Production Build
**Generate optimized static site**

```bash
npm run build
```

**Details**:
- Compiles all `.astro`, `.tsx`, `.mdx` files
- Generates static HTML for all routes
- Minifies CSS and JavaScript
- Optimizes images
- Creates sitemap and RSS feed
- Output directory: `dist/`

**Build process**:
1. Type checking with TypeScript
2. Content collection validation
3. Route generation
4. Component compilation
5. Asset optimization
6. Static file generation

**Use when**:
- Preparing for deployment
- Testing production build locally
- Validating build errors

---

### Preview Production Build
**Test production build locally**

```bash
npm run preview
```

**Details**:
- Runs `npm run build` first
- Serves `dist/` directory
- Simulates production environment
- URL: `http://localhost:4321`
- No hot reload (static files only)

**Use when**:
- Verifying production build
- Testing before deployment
- Checking optimized assets

---

### Run Astro CLI
**Execute Astro commands directly**

```bash
npm run astro
```

**Common Astro commands**:
```bash
# Add an integration
npm run astro add tailwind

# Check for issues
npm run astro check

# Generate types for content collections
npm run astro sync

# Show help
npm run astro --help
```

---

## Test Commands

**Current State**: No test framework configured

**Recommended Setup** (for future):

```bash
# Install Vitest for unit testing
npm install -D vitest @vitest/ui

# Install Playwright for E2E testing
npm install -D @playwright/test

# Update package.json scripts
"test": "vitest",
"test:ui": "vitest --ui",
"test:e2e": "playwright test"
```

---

## Deploy Commands

### Docker Build
**Build Docker container**

```bash
docker build -t notes-blog .
```

**Run container**:
```bash
docker run -p 4321:4321 notes-blog
```

**Details**:
- Uses Node 18 Alpine image
- Installs dependencies in container
- Exposes port 4321
- Runs dev server (for production, modify Dockerfile to run build)

**Dockerfile location**: [../Dockerfile](../Dockerfile)

---

### Manual Deployment
**Build and deploy to static hosting**

```bash
# 1. Build production site
npm run build

# 2. Deploy dist/ folder to hosting provider
# Examples:

# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist

# GitHub Pages (with gh-pages package)
npm install -D gh-pages
npx gh-pages -d dist
```

---

### Continuous Deployment (Recommended)
**Platforms**: Vercel, Netlify, Cloudflare Pages

**Configuration** (most platforms auto-detect):
- Build command: `npm run build`
- Output directory: `dist/`
- Node version: 18.x

---

## Environment Variables

### Current Usage
**No environment variables currently required** for basic functionality.

### Future Environment Variables
Based on commented code in [src/consts.ts](../src/consts.ts):

#### Analytics Services
```bash
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Umami
UMAMI_SITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
UMAMI_DATA_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Plausible
PLAUSIBLE_DOMAIN=yourdomain.com

# Matomo
MATOMO_ID=1
MATOMO_URL=https://analytics.yourdomain.com

# Fathom
FATHOM_SITE_ID=ABCDEFGH

# Metrical
METRICAL_APP=your-app-name

# Minimal Analytics
MINIMAL_ANALYTICS_ID=your-id
```

#### Comment Systems (Giscus Example)
```bash
NEXT_PUBLIC_GISCUS_REPO=username/repo
NEXT_PUBLIC_GISCUS_REPOSITORY_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
```

#### Newsletter Services
```bash
# Buttondown
BUTTONDOWN_API_KEY=your-api-key

# Mailchimp
MAILCHIMP_API_KEY=your-api-key
MAILCHIMP_LIST_ID=your-list-id

# ConvertKit
CONVERTKIT_API_KEY=your-api-key
CONVERTKIT_FORM_ID=your-form-id
```

### Environment Variable Setup
**Create `.env` file** (not committed to git):

```bash
# .env (create in project root)
SITE_URL=https://yourdomain.com
GOOGLE_ANALYTICS_ID=your-id
```

**Add to `.gitignore`**:
```
.env
.env.local
.env.production
```

**Access in code**:
```typescript
// Use import.meta.env in Astro/Vite
const analyticsId = import.meta.env.GOOGLE_ANALYTICS_ID;
```

---

## Development Server Startup Procedures

### Standard Startup
```bash
# 1. Navigate to project directory
cd d:\xammp\htdocs\Notes

# 2. Install dependencies (first time or after pulling changes)
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:4321
```

### Fresh Install
```bash
# 1. Clone repository
git clone https://github.com/AlpetGexha/Notes.git
cd Notes

# 2. Install dependencies
npm install

# 3. Start development
npm run dev
```

### After Pulling Changes
```bash
# 1. Pull latest changes
git pull origin master

# 2. Update dependencies (if package.json changed)
npm install

# 3. Sync content collections (generates types)
npm run astro sync

# 4. Start dev server
npm run dev
```

---

## Debugging Setup

### VS Code Configuration

**Recommended Extensions**:
- Astro (astro-build.astro-vscode)
- ESLint (dbaeumer.vscode-eslint)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- MDX (unifiedjs.vscode-mdx)

**VS Code Settings** (.vscode/settings.json):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["class:\\s*?[\"'`]([^\"'`]*).*?[\"'`]", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.mdx": "mdx"
  }
}
```

**Launch Configuration** (.vscode/launch.json):
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Astro Dev Server",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

### Browser DevTools
**Access**: F12 or Right-click → Inspect

**Astro DevTools**:
- View component boundaries
- Inspect island hydration
- Check network requests

**Useful Breakpoints**:
- SolidJS components: Set breakpoints in `.tsx` files
- Theme switching: [src/components/solidjs/ThemeSwitcher.tsx](../src/components/solidjs/ThemeSwitcher.tsx)
- Content queries: Any page using `getCollection()`

### Common Debugging Scenarios

#### Issue: Content not showing
**Debug steps**:
1. Check MDX frontmatter matches schema in [src/content/config.ts](../src/content/config.ts)
2. Verify `draft: false` in frontmatter
3. Run `npm run astro sync` to regenerate types
4. Check dev server console for validation errors

#### Issue: Styles not applying
**Debug steps**:
1. Verify Tailwind class names are correct
2. Check if custom CSS is imported in layout
3. Inspect element in browser to see computed styles
4. Clear browser cache
5. Restart dev server

#### Issue: TypeScript errors
**Debug steps**:
1. Run `npm run astro sync` to regenerate content collection types
2. Check import paths match configured aliases in [tsconfig.json](../tsconfig.json)
3. Verify all imported modules have type definitions

#### Issue: 404 on dynamic routes
**Debug steps**:
1. Check file naming: `[slug].astro` or `[...slug].astro`
2. Verify `getStaticPaths()` function is implemented
3. Inspect route parameters in browser URL
4. Check build output for generated pages

---

## Code Generation and Scaffolding Commands

### Create New Blog Post
**Manual Process**:

```bash
# Navigate to blog content directory
cd src/content/blog

# Create new MDX file
# Example: Laravel/my-new-post.mdx
```

**Template**:
```mdx
---
title: "My New Post Title"
date: 2026-01-26
summary: "Brief description of the post"
tags: [laravel, php]
authors: [default]
postLayout: simple
draft: false
---

# Post Content

Your markdown content here...
```

### Create New Author
```bash
# Navigate to authors directory
cd src/content/authors

# Create author-name.mdx
```

**Template**:
```mdx
---
name: "Author Name"
avatar: "/path/to/avatar.jpg"
occupation: "Software Developer"
shortBio: "Brief bio"
email: "author@email.com"
github: "https://github.com/username"
twitter: "https://twitter.com/username"
linkedin: "https://linkedin.com/in/username"
---

Extended bio content...
```

### Create New Tag
```bash
# Navigate to tags directory
cd src/content/tags

# Create tag-name.mdx
```

**Template**:
```mdx
---
name: "Tag Name"
description: "Description of this tag"
---
```

### Add New Component
```bash
# For static component
cd src/components
# Create ComponentName.astro

# For interactive component
cd src/components/solidjs
# Create ComponentName.tsx
```

---

## Git Workflow

### Current Repository
- **Owner**: AlpetGexha
- **Repo**: Notes
- **Branch**: master (default)
- **Remote**: https://github.com/AlpetGexha/Notes

### Standard Git Workflow

#### Daily Development
```bash
# 1. Pull latest changes
git pull origin master

# 2. Create feature branch (optional)
git checkout -b feature/my-new-feature

# 3. Make changes and commit
git add .
git commit -m "Add new blog post about Laravel validation"

# 4. Push changes
git push origin feature/my-new-feature

# 5. Create pull request (or merge to master)
```

#### Quick Commit (Direct to Master)
```bash
# Add all changes
git add .

# Commit with message
git commit -m "Update deployment guide"

# Push to master
git push origin master
```

### Commit Message Conventions
**Recommended format**:
```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature or blog post
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code style/formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
git commit -m "feat: add Laravel Eloquent performance patterns post"
git commit -m "fix: correct code syntax in Quick Sort algorithm"
git commit -m "docs: update README with setup instructions"
git commit -m "style: improve mobile navigation styling"
```

### Branch Strategy
**Current**: Single branch (master)

**Recommended for team/production**:
```
master (production)
  ↓
develop (staging)
  ↓
feature/* (feature branches)
```

**Commands**:
```bash
# Create feature branch
git checkout -b feature/new-post

# Merge to develop
git checkout develop
git merge feature/new-post

# Merge to master
git checkout master
git merge develop
```

---

## Dependency Management

### Update Dependencies
```bash
# Check for outdated packages
npm outdated

# Update all packages (minor/patch versions)
npm update

# Update to latest major versions
npm install <package>@latest
```

### Audit Security
```bash
# Check for vulnerabilities
npm audit

# Auto-fix vulnerabilities
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

### Add New Dependency
```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name

# Specific version
npm install package-name@1.2.3
```

### Remove Dependency
```bash
npm uninstall package-name
```

---

## Performance Monitoring

### Build Performance
```bash
# Time the build
time npm run build

# Verbose build output
npm run build -- --verbose
```

### Bundle Analysis
**Not currently configured**

**To add**:
```bash
npm install -D rollup-plugin-visualizer

# Update astro.config.mjs
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  vite: {
    plugins: [visualizer()],
  },
});
```

### Lighthouse Audit
```bash
# Install globally
npm install -g @lhci/cli

# Build and audit
npm run build
lhci autorun --collect.staticDistDir=dist
```

---

## Troubleshooting Common Issues

### Port Already in Use
```bash
# Kill process on port 4321 (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 4321).OwningProcess | Stop-Process

# Or use different port
npm run dev -- --port 3000
```

### Node Modules Issues
```bash
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Build Errors
```bash
# Clear Astro cache
Remove-Item -Recurse -Force .astro

# Regenerate content types
npm run astro sync

# Full clean build
Remove-Item -Recurse -Force dist, .astro
npm run build
```

### TypeScript Errors
```bash
# Regenerate types
npm run astro sync

# Check TypeScript directly
npx tsc --noEmit
```
