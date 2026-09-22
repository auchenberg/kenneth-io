# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Components That Render

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content using build-time data fetching patterns.

### Rules

- **R-REACT-001** SHOULD: Components that render markdown content SHOULD use markdown-it for HTML transformation.

### Verify

```bash
# Verify React usage in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path for content processing
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify page components implement getStaticProps or getStaticPaths
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement getStaticProps or getStaticPaths for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. All new page components and helper modules must be reviewed against these rules during code review. Build-time validation must confirm helper modules successfully export expected function contracts. Automated grep-based checks in CI pipeline must verify presence of required imports and function exports.
</enforcement>