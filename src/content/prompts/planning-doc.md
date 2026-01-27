---
title: "Planning Documentation Generator"
description: "Generate comprehensive planning documentation for a codebase to assist coding AI agents"
tags: [development, analysis]
date: 2026-01-27
category: "development"
draft: false
versions:
  - version: "1.0"
    date: 2026-01-27
    changes: "Initial version of the Planning Documentation Generator"
---

# Planning Documentation Generation

Analyze this codebase and generate a comprehensive research overview optimized for coding assistant consumption. Create the following markdown files in the **planning_docs** folder: ## Constraints: - The model MUST create a “planning_docs” folder if it doesn’t exist - The model MUST create exactly 5 markdown files with structured, actionable content - The model MUST confirm successful creation of each file

## Files to create

**1. planning_docs/project_overview.md**
    - Product description with technical context
    - Core functionality mapped to code modules
    - Key business logic locations
    - Entry points and main execution flows

**2. planning_docs/technical_architecture.md**
    - Tech stack with specific versions and import patterns
    - Core dependencies with usage examples
    - Architecture patterns with file locations
    - API endpoints and data flow - Database schemas and connection details
    - External service integrations with authentication methods

**3. planning_docs/project_structure.md**
    - Directory tree with purpose annotations
    - Critical files with modification frequency
    - Configuration files with parameter explanations
    - Test file organization and coverage areas
    - Build artifacts and output locations

**4. planning_docs/development_workflow.md**
    - Exact build/test/deploy commands with flags
    - Environment variables and their purposes
    - Development server startup procedures
    - Debugging setup and common breakpoints
    - Code generation and scaffolding commands
    - Git workflow and branch strategies

**5. planning_docs/coding_patterns.md**
    - Common code patterns and conventions used
    - Error handling approaches with examples
    - Logging and monitoring implementations
    - Security patterns and authentication flows
    - Performance optimization techniques used
    - Code organization principles followed

## Format Requirements

    - Executable commands in code blocks 
    - File paths as clickable references 
    - Structured lists for easy parsing 
    - Cross-references between related concepts This documentation will be consumed by coding assistants to provide contextual help during development.
