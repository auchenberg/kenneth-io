# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Query Parameter Names

These rules are ALWAYS ACTIVE for Next.js API routes in the `pages/api/` directory using edge runtime and query parameter-based request interfaces.

### Rules

- **R-QUERY-001** SHOULD: Query parameter names SHOULD be explicitly referenced as string literals in extraction calls for contract clarity.

### Verify

```bash
# Check for searchParams.get() usage in API routes
grep -r "searchParams\.get(" pages/api/ --include="*.js" --include="*.ts"

# Verify edge runtime configuration in API routes
grep -r "export.*runtime.*=.*['\"]edge['\"]" pages/api/ --include="*.js" --include="*.ts"

# Check for next/og library usage
grep -r "from ['\"]next/og['\"]" pages/api/ --include="*.js" --include="*.ts"
```

**Accept when:**
- All API routes in `pages/api/` directory use `searchParams.get()` for query parameter extraction
- Edge runtime configuration is explicitly declared in API routes requiring serverless execution
- External resource fetches use `import.meta.url`-based URL construction for path resolution
- Query parameter names are defined as string literals (not variables or computed values) in extraction calls

<enforcement>
Claude Code MUST NOT skip or defer verification of query parameter extraction patterns in API routes. All new or modified API endpoints MUST comply with R-QUERY-001 before approval.
</enforcement>