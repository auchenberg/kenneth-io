# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Components That Render

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content using markdown and file system operations.

### Rules

- **R-COMP-001** SHOULD: Components that render markdown content SHOULD use markdown-it for HTML transformation.

### Verify

```bash
# Verify React usage in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify static generation patterns
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement getStaticProps or getStaticPaths for build-time data fetching

<enforcement>
Clause Code MUST NOT skip or defer verification. Build-time validation that helper modules successfully export expected function contracts is mandatory. Automated grep-based checks in CI pipeline must verify presence of required imports and function exports.
</enforcement>