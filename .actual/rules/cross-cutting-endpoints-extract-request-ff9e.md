# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Endpoints Extract Request

These rules are ALWAYS ACTIVE for all Next.js API routes in the `pages/api/` directory using edge runtime capabilities and public-facing HTTP GET endpoints with query parameter-based input extraction.

### Rules

- **R-API-001** MUST: API endpoints MUST extract request parameters using `searchParams.get()` method for query parameter access.

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

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new or modified API endpoints must comply with R-API-001 before acceptance.
</enforcement>