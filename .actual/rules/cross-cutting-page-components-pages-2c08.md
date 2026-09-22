# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Page Components Pages

These rules are ALWAYS ACTIVE for all React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that follow the static content delivery pattern.

### Rules

- **R-PAGE-001** MUST: Page components in the pages/ directory MUST use React as the rendering library for public-facing content.
- **R-PAGE-002** MUST: Data fetching logic MUST be separated into dedicated helper modules in the helpers/ directory, exporting named functions that return plain JavaScript objects or arrays.
- **R-PAGE-003** MUST: Page components MUST implement getStaticProps or getStaticPaths for build-time data fetching rather than client-side or server-side rendering patterns.
- **R-PAGE-004** MUST: Helper modules processing markdown content MUST use gray-matter for frontmatter parsing and markdown-it for content transformation.
- **R-PAGE-005** MUST: Helper modules MUST use Node.js fs and path modules for filesystem operations to read and transform static content files.
- **R-PAGE-006** SHOULD: Error handling in helper modules SHOULD use try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes.
- **R-PAGE-007** SHOULD: Helper modules SHOULD export standardized function contracts (e.g., getAllItems, getItemBySlug) for predictable interfaces consumed by page components.
- **R-PAGE-008** MAY: Dynamic routes (e.g., pages/travel/[city].js) MAY implement both getStaticPaths to generate route parameters and getStaticProps to fetch data for each route.

### Verify

```bash
# Verify React imports in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify getStaticProps/getStaticPaths usage
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in pages/ directory import React and use it for rendering
- At least 3 helper modules in helpers/ directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement getStaticProps or getStaticPaths for build-time data fetching

<enforcement>
Clause Code MUST NOT skip or defer verification. Pull requests introducing page components without separated helper modules require architectural review. Build failures from missing or malformed helper module exports block deployment. Pages bypassing getStaticProps without documented rationale are flagged for refactoring.
</enforcement>