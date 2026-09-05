# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Data Fetching Logic

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content via build-time data fetching patterns.

### Rules

- **R-DATA-001** MUST: Data fetching logic MUST be separated into dedicated helper modules under the `helpers/` directory that export named functions as public contracts.

### Verify

```bash
# Verify React usage in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and Node.js fs/path modules
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify getStaticProps/getStaticPaths usage for build-time data fetching
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. All new page components and helper modules must be validated against these rules before acceptance.
</enforcement>