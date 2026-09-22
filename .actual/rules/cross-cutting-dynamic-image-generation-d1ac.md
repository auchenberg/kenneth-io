# Fetch External Font Assets at Runtime in API Routes: Dynamic Image Generation

These rules are ALWAYS ACTIVE for API routes that generate dynamic Open Graph images using next/og in edge runtime environments.

### Rules

- **R-DIG-001** SHOULD: Dynamic image generation endpoints SHOULD use the GET method with runtime='edge' for optimal performance.
- **R-DIG-002** MUST: API routes MUST use fetch() with import.meta.url to load font assets from the /public/fonts/ directory instead of direct filesystem access.
- **R-DIG-003** MUST: Font files MUST be placed in the /public/fonts/ directory and referenced using new URL('/public/fonts/[filename]', import.meta.url).
- **R-DIG-004** MUST: fetch() calls MUST be wrapped in try-catch blocks to handle network failures gracefully and provide fallback behavior.
- **R-DIG-005** SHOULD: API routes SHOULD implement module-level caching of font buffers to avoid repeated fetches on every request.
- **R-DIG-006** SHOULD: Dynamic content generation SHOULD use searchParams.get() for query parameter handling to enable runtime flexibility.

### Verify

```bash
# Check for proper fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for correct URL construction with public/fonts path
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists in public directory
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'

# Check for try-catch wrapping around fetch calls
grep -A 5 "fetch(" pages/api/og.js | grep -E "(try|catch)"

# Verify runtime='edge' configuration in API routes
grep -r "runtime.*=.*['\"]edge['\"]" pages/api/
```

**Accept when:**
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation
- fetch() calls are wrapped in try-catch blocks for error handling
- API routes are configured with runtime='edge' for optimal performance
- Font buffer caching is implemented at module level to reduce repeated fetches

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules must be checked before approving API route implementations for dynamic image generation.
</enforcement>