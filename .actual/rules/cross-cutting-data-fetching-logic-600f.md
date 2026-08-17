# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Data Fetching Logic

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content via build-time data fetching patterns.

### Rules

- **R-DATA-001** MUST: Data fetching logic MUST be separated into dedicated helper modules under the `helpers/` directory that export named functions as public contracts.
- **R-DATA-002** MUST: Helper modules MUST export named functions (e.g., `getAllTravelGuides`, `getTravelGuideBySlug`, `getBucketList`, `getProjects`) that return plain JavaScript objects or arrays.
- **R-DATA-003** MUST: Page components in `pages/` MUST use `getStaticProps` or `getStaticPaths` for build-time data fetching from helper modules.
- **R-DATA-004** MUST: Helper modules MUST use gray-matter for parsing markdown files with frontmatter and markdown-it for content transformation.
- **R-DATA-005** MUST: Helper modules MUST implement error handling via try-catch blocks, returning empty arrays or null values on failure to prevent build crashes.
- **R-DATA-006** SHOULD: Helper modules SHOULD use Node.js `fs` and `path` modules for file-based content management rather than external CMS dependencies.
- **R-DATA-007** SHOULD: Error handling in helper modules SHOULD use console.error logging for observability during the build process.
- **R-DATA-008** MAY: Dynamic routes (e.g., `pages/travel/[city].js`) MAY implement both `getStaticPaths` to generate route parameters and `getStaticProps` to fetch data for each route.

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
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. New page components MUST follow the React + helper module + getStaticProps pattern. Build-time validation MUST confirm helper modules successfully export expected function contracts. Automated grep-based checks in CI pipeline MUST verify presence of required imports and function exports. Pull requests introducing page components without separated helper modules MUST require architectural review. Build failures from missing or malformed helper module exports MUST block deployment.
</enforcement>