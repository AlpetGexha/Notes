# AI Prompts Section - User Guide

## Overview

Your blog now has a dedicated **Prompts** section for storing and organizing AI prompts with full version tracking. The prompts are displayed at `/prompts` and can be categorized, tagged, and versioned.

## Features

✅ **Organized by Categories** - Group prompts by type (development, writing, analysis, etc.)
✅ **Tag System** - Use existing tags to cross-reference with blog posts
✅ **Version History** - Track changes to prompts over time
✅ **Draft Support** - Hide prompts until ready to publish
✅ **Rich Markdown** - Full MDX support for formatting
✅ **SEO Optimized** - Automatic meta tags and descriptions

## File Structure

```
src/content/prompts/
├── code-review-assistant.md          # Example: Development prompt
├── technical-documentation-writer.md # Example: Writing prompt
└── your-prompt-name.md               # Your new prompts
```

## Creating a New Prompt

### 1. Create a New File

Create a new `.md` or `.mdx` file in `src/content/prompts/`:

```bash
# Example filename
src/content/prompts/bug-debugger-assistant.md
```

### 2. Add Frontmatter

Every prompt needs frontmatter with these fields:

```yaml
---
title: "Bug Debugger Assistant"              # Required: Display name
description: "Expert debugging prompt"       # Optional: Short description
tags: [development, debugging]               # Required: Must reference existing tags
date: 2026-01-26                            # Required: Creation date
category: "development"                      # Optional: For grouping (development, writing, analysis, etc.)
draft: false                                 # Required: Hide if true
versions:                                    # Optional: Track changes
  - version: "1.0"
    date: 2026-01-26
    changes: "Initial version"
---
```

### 3. Write the Prompt Content

After the frontmatter, write your prompt in Markdown:

```markdown
You are an expert debugging assistant...

## Instructions

1. Analyze the error message
2. Check common causes
3. Suggest fixes

## Output Format

- **Problem**: Brief description
- **Cause**: Root cause analysis
- **Solution**: Step-by-step fix
```

## Updating a Prompt (Version Tracking)

When you update an existing prompt, add a new version entry:

```yaml
---
title: "Bug Debugger Assistant"
# ... other fields ...
versions:
  - version: "1.0"
    date: 2026-01-26
    changes: "Initial version"
  - version: "1.1"                          # NEW VERSION
    date: 2026-01-27
    changes: "Added stack trace analysis"   # What changed
  - version: "2.0"                          # MAJOR UPDATE
    date: 2026-01-28
    changes: "Complete rewrite with better error categorization"
---
```

**Version Numbering Suggestions:**
- `1.0, 1.1, 1.2` - Minor improvements
- `2.0, 3.0` - Major rewrites
- `1.0-beta` - Experimental versions

## Categories

Organize prompts by category for better browsing:

**Common Categories:**
- `development` - Code-related prompts
- `writing` - Content creation prompts
- `analysis` - Data/text analysis prompts
- `design` - UI/UX and design prompts
- `productivity` - Task management prompts
- `research` - Research and investigation prompts

Categories automatically group prompts on the index page.

## Tags

Use existing tags from `src/content/tags/` or create new ones:

**Existing Tags:**
- `laravel`, `php`, `database`, `api`
- `caching`, `redis`, `performance`
- `DesignPatterns`, `Eloquent`

**To Create New Tags:**

Create file in `src/content/tags/ai-prompts.mdx`:

```yaml
---
name: "AI Prompts"
description: "Prompts for AI assistants"
---
```

## Complete Example

Here's a full example of a prompt file:

**File:** `src/content/prompts/laravel-optimizer.md`

```markdown
---
title: "Laravel Performance Optimizer"
description: "Analyze and optimize Laravel application performance"
tags: [laravel, performance, database]
date: 2026-01-26
lastmod: 2026-01-27
category: "development"
draft: false
versions:
  - version: "1.0"
    date: 2026-01-26
    changes: "Initial version with database query optimization"
  - version: "1.1"
    date: 2026-01-27
    changes: "Added caching strategies and N+1 query detection"
---

You are a Laravel performance optimization expert with deep knowledge of Eloquent ORM, caching strategies, and database optimization.

## Your Task

Analyze the provided Laravel code and identify performance bottlenecks:

### 1. Database Queries
- Detect N+1 query problems
- Suggest eager loading strategies
- Recommend query optimization
- Identify missing indexes

### 2. Caching Opportunities
- Route caching suggestions
- Config caching recommendations
- View caching strategies
- Query result caching

### 3. Code-Level Optimization
- Unnecessary database calls
- Inefficient loops
- Memory-intensive operations
- Better collection methods

## Output Format

**Performance Issues Found:**
1. [Issue] - Brief description
   - **Impact**: High/Medium/Low
   - **Fix**: Specific code suggestion
   - **Expected Improvement**: X% faster

**Optimization Recommendations:**
- Immediate fixes (high impact)
- Long-term improvements
- Monitoring suggestions

Provide code examples for all suggestions.
```

## Usage in Your Workflow

### Adding a New Prompt

```bash
# 1. Create the file
New-Item src/content/prompts/my-new-prompt.md

# 2. Add content with frontmatter
# (edit in VS Code)

# 3. Sync content collections
npm run astro sync

# 4. View in browser
npm run dev
# Visit: http://localhost:4321/prompts
```

### Updating an Existing Prompt

```bash
# 1. Edit the file
# 2. Add new version entry in frontmatter
# 3. Update the prompt content
# 4. Update lastmod date

# The version history will automatically display
```

## URLs and Routes

- **All Prompts**: `/prompts`
- **Single Prompt**: `/prompts/your-prompt-slug`
- **Tag Filter**: `/tags/development` (shows all content with that tag)

## Tips & Best Practices

1. **Use Descriptive Titles**: Make it clear what the prompt does
2. **Add Descriptions**: Help users quickly understand the prompt's purpose
3. **Version Incrementally**: Don't skip versions, track all changes
4. **Categorize Properly**: Use consistent category names
5. **Tag Appropriately**: Use 2-5 relevant tags
6. **Test Prompts**: Verify they work before publishing
7. **Document Changes**: Be specific in version change notes
8. **Use MDX Features**: Add components, code blocks, callouts

## Advanced Features

### Using MDX Components

You can use Astro components in prompts:

```mdx
---
title: "My Prompt"
# ... frontmatter ...
---

import Figure from '@/components/Figure.astro';

Here's an example diagram:

<Figure src="/prompt-diagram.png" caption="Prompt Flow" />
```

### Code Syntax Highlighting

Use fenced code blocks with language specification:

```markdown
\`\`\`python
def optimize_query():
    # Your code here
    pass
\`\`\`
```

## Viewing and Navigation

1. **Homepage**: Prompts appear in navigation menu
2. **Index Page**: All prompts grouped by category
3. **Individual Page**: Full prompt with version history
4. **Version Badge**: Shows current version (e.g., "v2.0")
5. **Breadcrumbs**: Navigate back to prompts list

## Schema Reference

All available fields for prompt frontmatter:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ Yes | Prompt name |
| `description` | string | ❌ No | Short description |
| `tags` | array | ✅ Yes | Tag references |
| `date` | date | ✅ Yes | Creation date |
| `lastmod` | date | ❌ No | Last modified date |
| `category` | string | ❌ No | Category for grouping |
| `draft` | boolean | ❌ No | Hide if true (default: false) |
| `versions` | array | ❌ No | Version history entries |

### Version Entry Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ Yes | Version number (e.g., "1.0") |
| `date` | date | ✅ Yes | Version release date |
| `changes` | string | ✅ Yes | What changed in this version |

## Troubleshooting

### Prompt Not Showing

- Check `draft: false` in frontmatter
- Verify tags exist in `src/content/tags/`
- Run `npm run astro sync`
- Check for validation errors in terminal

### Version History Not Displaying

- Ensure `versions` is an array
- Verify all required fields (version, date, changes)
- Check date format (YYYY-MM-DD)

### Build Errors

```bash
# Regenerate types
npm run astro sync

# Check for schema validation errors
npm run build
```

## Example Workflow: Creating Your First Prompt

```bash
# 1. Create file
New-Item src/content/prompts/code-explainer.md

# 2. Add this content:
```

```yaml
---
title: "Code Explainer"
description: "Explains complex code in simple terms"
tags: [development]
date: 2026-01-26
category: "development"
draft: false
versions:
  - version: "1.0"
    date: 2026-01-26
    changes: "Initial version"
---

You are a code explanation expert who breaks down complex code into simple, understandable explanations.

## Instructions

1. Read the provided code carefully
2. Explain what it does in plain English
3. Break down complex parts step-by-step
4. Highlight important concepts
5. Suggest improvements if any

## Output Format

**Overview**: High-level explanation
**Step-by-Step**: Detailed breakdown
**Key Concepts**: Important patterns/techniques used
**Improvements**: Optional suggestions
```

```bash
# 3. Sync and test
npm run astro sync
npm run dev

# 4. Visit http://localhost:4321/prompts
```

---

**Need Help?** Check the planning docs:
- [Project Overview](../planning_docs/project_overview.md)
- [Technical Architecture](../planning_docs/technical_architecture.md)
- [Development Workflow](../planning_docs/development_workflow.md)
