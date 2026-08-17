# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Page Components Requiring

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content.

### Rules

- **R-PAGE-001** SHOULD: Page components requiring static data SHOULD use Next.js `getStaticProps` or `getStaticPaths` functions to fetch data at build time.
- **R-PAGE-002** SHOULD: Data fetching logic SHOULD be separated into dedicated helper modules in the `helpers/` directory that export named functions (e.g., `getAllTravelGuides`, `getTravelGuideBySlug`) returning plain JavaScript objects or arrays.
- **R-PAGE-003** SHOULD: Helper modules SHOULD use `gray-matter` to parse markdown files with frontmatter, extracting metadata and content separately.
- **R-PAGE-004** SHOULD: Helper modules SHOULD implement error handling via try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes.
- **R-PAGE-005** SHOULD: Dynamic routes (e.g., `pages/travel/[city].js`) SHOULD implement both `getStaticPaths` to generate route parameters and `getStaticProps` to fetch data for each route.

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
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use `gray-matter` and Node.js `fs`/`path` modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. Code review verification that new page components follow the React + helper module + getStaticProps pattern is mandatory. Build-time validation that helper modules successfully export expected function contracts is mandatory. Automated grep-based checks in CI pipeline to verify presence of required imports and function exports are mandatory.
</enforcement>