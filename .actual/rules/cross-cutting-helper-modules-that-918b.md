# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Helper Modules That

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, Next.js API routes in the `pages/api/` directory, and static content files processed by helper modules using build-time data fetching via `getStaticProps`/`getStaticPaths`.

### Rules

- **R-HELPER-001** MUST: Helper modules that read file-based content MUST use Node.js core modules (`fs`, `path`) and gray-matter for frontmatter parsing.
- **R-HELPER-002** MUST: Page components in `pages/` directory MUST import React and use it for rendering.
- **R-HELPER-003** MUST: Page components MUST implement `getStaticProps` or `getStaticPaths` for build-time data fetching.
- **R-HELPER-004** MUST: Helper modules MUST export named functions (e.g., `getAllTravelGuides`, `getTravelGuideBySlug`) that return plain JavaScript objects or arrays.
- **R-HELPER-005** MUST: Helper modules MUST use gray-matter to parse markdown files with frontmatter, extracting metadata into a data object and content into a separate field.
- **R-HELPER-006** SHOULD: Helper modules SHOULD implement error boundaries using try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes.
- **R-HELPER-007** SHOULD: Dynamic routes (e.g., `pages/travel/[city].js`) SHOULD implement both `getStaticPaths` to generate route parameters and `getStaticProps` to fetch data for each route.
- **R-HELPER-008** MAY: API routes with alternative patterns (streaming, webhooks) may bypass helper module requirements with architectural approval.

### Verify

```bash
# Verify React imports in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and Node.js fs/path modules
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify page components implement getStaticProps or getStaticPaths
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js `fs`/`path` modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. Pull requests that introduce page components without separated helper modules require architectural review and justification. Build failures from missing or malformed helper module exports block deployment until resolved. Pages that bypass `getStaticProps` without documented rationale are flagged in code review for refactoring.
</enforcement>