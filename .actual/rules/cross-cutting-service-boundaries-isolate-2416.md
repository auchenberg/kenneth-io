# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Service Boundaries Isolate

These rules are ALWAYS ACTIVE for Next.js API routes in the `pages/api/` directory that implement edge runtime serverless functions with public-facing HTTP GET endpoints using query parameter-based request interfaces.

### Rules

- **R-SB-001** MUST: Service boundaries MUST isolate external resource fetching using `fetch()` with `import.meta.url`-based URL construction.

### Verify

```bash
# Verify searchParams.get() usage in API routes
grep -r "searchParams\.get(" pages/api/ --include="*.js" --include="*.ts"

# Verify edge runtime configuration
grep -r "export.*runtime.*=.*['\"]edge['\"]" pages/api/ --include="*.js" --include="*.ts"

# Verify next/og library usage
grep -r "from ['\"]next/og['\"]" pages/api/ --include="*.js" --include="*.ts"
```

**Accept when:**
- All API routes in `pages/api/` directory use `searchParams.get()` for query parameter extraction
- Edge runtime configuration is explicitly declared in API routes requiring serverless execution
- External resource fetches use `import.meta.url`-based URL construction for path resolution

<enforcement>
Clause Code MUST NOT skip or defer verification of these rules during code review and pull request processing.
</enforcement>