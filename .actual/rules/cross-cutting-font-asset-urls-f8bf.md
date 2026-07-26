# Fetch External Font Assets at Runtime in API Routes: Font Asset Urls

These rules are ALWAYS ACTIVE for all API routes that generate dynamic Open Graph images and require font asset loading in edge runtime environments.

### Rules

- **R-FONT-001** MUST: Font asset URLs MUST be constructed using `new URL()` with `import.meta.url` as the base for proper resolution in edge runtime environments.
- **R-FONT-002** MUST: Font files MUST be stored in the `/public/fonts/` directory and referenced via URL-based fetching, not direct filesystem access.
- **R-FONT-003** MUST: API routes MUST wrap `fetch()` calls for font assets in try-catch blocks to handle network failures gracefully.
- **R-FONT-004** SHOULD: Implement module-level caching of fetched font buffers to avoid repeated fetches on every request.
- **R-FONT-005** SHOULD: Handle dynamic content generation through query parameters via `searchParams.get()` for flexible Open Graph image customization.

### Verify

```bash
# Check for proper fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for new URL construction with public/fonts path
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists in public directory
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'
```

**Accept when:**
- API routes use `fetch()` with `import.meta.url` for loading font assets from `/public/fonts/`
- Font files are present in the `public/fonts` directory and accessible via URL-based fetching
- API routes handle query parameters via `searchParams.get()` for dynamic content generation
- Font asset fetch calls are wrapped in try-catch blocks for error handling

<enforcement>
Claude Code MUST NOT skip or defer verification of font asset loading patterns in API routes. All three verify commands MUST pass before accepting changes to Open Graph image generation endpoints.
</enforcement>