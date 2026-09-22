# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Routes Pages Export

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that follow the static content delivery and build-time data fetching pattern.

### Rules

- **R-ROUTES-PAGES-001** MUST: API routes in `pages/api/` MUST export handler functions or named HTTP method functions (GET, POST) as public contracts.
- **R-ROUTES-PAGES-002** MUST: Page components in `pages/` MUST import React and use it for rendering public-facing content.
- **R-ROUTES-PAGES-003** MUST: Helper modules in `helpers/` MUST export named functions (e.g., `getAllTravelGuides`, `getTravelGuideBySlug`) that return plain JavaScript objects or arrays.
- **R-ROUTES-PAGES-004** MUST: Helper modules MUST use `gray-matter` for parsing markdown files with frontmatter and `markdown-it` for content transformation.
- **R-ROUTES-PAGES-005** MUST: Page components with dynamic or static content MUST implement `getStaticProps` or `getStaticPaths` for build-time data fetching.
- **R-ROUTES-PAGES-006** MUST: Helper modules MUST implement error handling using try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes.
- **R-ROUTES-PAGES-007** SHOULD: Helper modules SHOULD use `fs.promises` for async file operations to avoid blocking the build process for large content collections.
- **R-ROUTES-PAGES-008** SHOULD: Helper modules SHOULD maintain clear separation from Next.js-specific code to remain framework-agnostic and testable independently.

### Verify

```bash
# Verify React imports in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify getStaticProps/getStaticPaths usage
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l

# Verify API route exports
grep -r "export.*default\|export.*GET\|export.*POST" pages/api/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use `gray-matter` and Node.js `fs`/`path` modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching
- API routes in `pages/api/` export handler functions or named HTTP method functions as public contracts

<enforcement>
Claude Code MUST NOT skip or defer verification. All new page components, helper modules, and API routes MUST be reviewed against these rules before merge. Build-time validation MUST confirm helper module exports match expected function contracts. Violations require architectural review and justification.
</enforcement>