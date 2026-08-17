# Fetch External Font Assets at Runtime in API Routes: Dynamic Image Generation

These rules are ALWAYS ACTIVE for API routes that generate dynamic Open Graph images using next/og in edge runtime environments.

### Rules

- **R-DIG-001** SHOULD: Dynamic image generation endpoints SHOULD use the GET method with runtime='edge' for optimal performance.
- **R-DIG-002** MUST: Font assets MUST be loaded using fetch() with import.meta.url resolution, not direct filesystem access via fs module.
- **R-DIG-003** MUST: Font files MUST be stored in the /public/fonts/ directory and referenced using new URL('/public/fonts/[filename]', import.meta.url).
- **R-DIG-004** MUST: fetch() calls for font assets MUST be wrapped in try-catch blocks to handle network failures gracefully.
- **R-DIG-005** SHOULD: Font buffers SHOULD be cached at module level to avoid repeated fetches on every request.
- **R-DIG-006** SHOULD: Dynamic content generation SHOULD use searchParams.get() for query parameter handling in API routes.

### Verify

```bash
# Check for proper fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for new URL pattern with public/fonts directory
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists in public directory
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'

# Check for try-catch wrapping around fetch calls
grep -A 5 "fetch(" pages/api/og.js | grep -E "try|catch"

# Verify searchParams usage for dynamic content
grep -r "searchParams\.get" pages/api/
```

**Accept when:**
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation
- fetch() calls are wrapped in try-catch blocks for error handling
- Font buffers are cached at module level to minimize repeated network requests
- API routes specify runtime='edge' for optimal performance

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All six verification commands MUST pass before accepting changes to API routes that generate dynamic images.
</enforcement>