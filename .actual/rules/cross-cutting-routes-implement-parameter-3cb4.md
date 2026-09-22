# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Routes Implement Parameter

These rules are ALWAYS ACTIVE for all Next.js API routes in the `pages/api/` directory that implement edge runtime serverless functions with public-facing HTTP GET endpoints using query parameter-based request interfaces.

### Rules

- **R-API-001** SHOULD: API routes SHOULD implement parameter extraction at service boundary entry points before business logic execution.

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

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules during code review and pull request analysis.
</enforcement>