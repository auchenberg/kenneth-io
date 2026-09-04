# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Helper Modules Use

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content via build-time data fetching patterns.

### Rules

- **R-HELPER-001** MUST: Separate data fetching logic into dedicated helper modules (e.g., `helpers/getProjects.js`, `helpers/getTravelGuides.js`) that export named functions returning plain JavaScript objects or arrays.
- **R-HELPER-002** MUST: Use Next.js static generation APIs (`getStaticProps`, `getStaticPaths`) for build-time data fetching in page components rather than server-side rendering or client-side fetching for static content.
- **R-HELPER-003** MUST: Use `gray-matter` to parse markdown files with frontmatter, extracting metadata into a data object and content into a separate field for markdown-it processing.
- **R-HELPER-004** MUST: Implement error handling in helper modules using try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes.
- **R-HELPER-005** SHOULD: Use Node.js filesystem operations (`fs`, `path`) in helper modules for reading and transforming static content files.
- **R-HELPER-006** MAY: Helper modules MAY use lodash for data manipulation utilities when processing content collections.
- **R-HELPER-007** SHOULD: For dynamic routes (e.g., `pages/travel/[city].js`), implement both `getStaticPaths` to generate route parameters and `getStaticProps` to fetch data for each route.

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
Claude Code MUST NOT skip or defer verification. Pull requests introducing page components without separated helper modules require architectural review. Build failures from missing or malformed helper module exports block deployment. Pages bypassing getStaticProps without documented rationale are flagged for refactoring.
</enforcement>