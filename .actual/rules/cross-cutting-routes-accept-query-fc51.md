# Fetch External Font Assets at Runtime in API Routes: Routes Accept Query

These rules are ALWAYS ACTIVE for API routes that generate dynamic Open Graph images using next/og in edge runtime environments, requiring font assets to be loaded at runtime via fetch-based patterns.

### Rules

- **R-FONT-001** SHOULD: API routes SHOULD accept query parameters (e.g., 'title') via searchParams.get() to customize generated content.
- **R-FONT-002** MUST: API routes MUST use fetch() with import.meta.url to load font assets from the /public/fonts/ directory in edge runtime environments.
- **R-FONT-003** MUST: Font files MUST be placed in the /public/fonts/ directory and referenced using new URL('/public/fonts/[filename]', import.meta.url).
- **R-FONT-004** MUST: fetch() calls MUST be wrapped in try-catch blocks to handle network failures gracefully and provide fallback behavior.
- **R-FONT-005** SHOULD: API routes SHOULD implement module-level caching of font buffers to avoid repeated fetches on every request.

### Verify

```bash
# Check for proper fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for new URL pattern with public/fonts directory
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'
```

**Accept when:**
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation
- fetch() calls are wrapped in try-catch blocks for error handling

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for API routes generating dynamic Open Graph images in edge runtime environments.
</enforcement>