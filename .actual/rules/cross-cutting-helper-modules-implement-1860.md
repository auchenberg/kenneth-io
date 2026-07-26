# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Helper Modules Implement

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that process static content via build-time data fetching patterns.

### Rules

- **R-HELPER-001** SHOULD: Helper modules SHOULD implement error handling with console.error logging for file system operations.

### Verify

```bash
# Verify React imports in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path modules
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify getStaticProps/getStaticPaths usage in pages
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement getStaticProps or getStaticPaths for build-time data fetching

<enforcement>
Claude Code MUST NOT skip or defer verification. Helper modules MUST be reviewed for error handling patterns with console.error logging on file system operations. Build-time validation MUST confirm helper modules successfully export expected function contracts. Automated grep-based checks in CI pipeline MUST verify presence of required imports and function exports.
</enforcement>