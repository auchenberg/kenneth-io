# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Public Contracts Declare

These rules are ALWAYS ACTIVE for all Next.js API routes in the `pages/api/` directory that expose public-facing HTTP GET endpoints with query parameter-based input extraction in edge runtime environments.

### Rules

- **R-API-001** MUST: Public API contracts MUST declare supported HTTP methods (GET) and runtime environment (edge) explicitly.
- **R-API-002** MUST: Extract query parameters using `searchParams.get()` for all request data access in edge runtime API routes.
- **R-API-003** MUST: Implement null/undefined checks immediately after `searchParams.get()` calls to handle missing parameters gracefully.
- **R-API-004** MUST: Define expected query parameters as constants at the top of the handler for documentation and reuse.
- **R-API-005** SHOULD: Use `import.meta.url` for constructing URLs to public resources to ensure correct path resolution in edge runtime.
- **R-API-006** SHOULD: Add TypeScript types for expected query parameters to improve type safety at service boundaries.
- **R-API-007** SHOULD: Implement parameter validation immediately after extraction with clear error responses.
- **R-API-008** SHOULD: Add timeout and retry logic for external fetches with fallback responses.

### Verify

```bash
# Verify searchParams.get() usage in API routes
grep -r "searchParams\.get(" pages/api/ --include="*.js" --include="*.ts"

# Verify edge runtime configuration is explicitly declared
grep -r "export.*runtime.*=.*['\"]edge['\"]" pages/api/ --include="*.js" --include="*.ts"

# Verify next/og library usage for dynamic content generation
grep -r "from ['\"]next/og['\"]" pages/api/ --include="*.js" --include="*.ts"
```

**Accept when:**
- All API routes in `pages/api/` directory use `searchParams.get()` for query parameter extraction
- Edge runtime configuration is explicitly declared in API routes requiring serverless execution
- External resource fetches use `import.meta.url`-based URL construction for path resolution
- Query parameters are validated immediately after extraction with appropriate error handling
- Expected parameters are documented as constants at handler entry points

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new API route additions must pass the verify commands and accept criteria before approval.
</enforcement>