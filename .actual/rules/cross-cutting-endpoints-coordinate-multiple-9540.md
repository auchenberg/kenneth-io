# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Endpoints Coordinate Multiple

These rules are ALWAYS ACTIVE for all Next.js API routes in the `pages/api/` directory using edge runtime capabilities and query parameter-based request interfaces.

### Rules

- **R-API-001** MAY: API endpoints MAY coordinate multiple external resource fetches within the same service boundary.
- **R-API-002** MUST: API endpoints MUST use `searchParams.get()` for query parameter extraction in request handlers.
- **R-API-003** MUST: Edge runtime serverless functions MUST explicitly declare `export const runtime = 'edge'` configuration.
- **R-API-004** MUST: External resource fetches MUST use `import.meta.url`-based URL construction for path resolution in edge runtime.
- **R-API-005** SHOULD: API endpoints SHOULD implement null/undefined checks immediately after `searchParams.get()` calls to handle missing parameters gracefully.
- **R-API-006** SHOULD: Expected query parameters SHOULD be defined as constants at the top of the handler for documentation and reuse.
- **R-API-007** SHOULD: Parameter validation SHOULD be implemented immediately after extraction with clear error responses.

### Verify

```bash
# Verify searchParams.get() usage in API routes
grep -r "searchParams\.get(" pages/api/ --include="*.js" --include="*.ts"

# Verify edge runtime configuration
grep -r "export.*runtime.*=.*['\"]edge['\"]" pages/api/ --include="*.js" --include="*.ts"

# Verify next/og library usage for dynamic content generation
grep -r "from ['\"]next/og['\"]" pages/api/ --include="*.js" --include="*.ts"
```

**Accept when:**
- All API routes in `pages/api/` directory use `searchParams.get()` for query parameter extraction
- Edge runtime configuration is explicitly declared in API routes requiring serverless execution
- External resource fetches use `import.meta.url`-based URL construction for path resolution
- Parameter validation occurs immediately after extraction with error handling
- Expected query parameters are documented as constants at handler entry points

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new API route additions and modifications to existing endpoints must pass the verify commands and accept criteria before approval.
</enforcement>