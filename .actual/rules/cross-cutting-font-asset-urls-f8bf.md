# Fetch External Font Assets at Runtime in API Routes: Font Asset Urls

These rules are ALWAYS ACTIVE for all API routes that generate dynamic Open Graph images and require font asset loading in edge runtime environments.

### Rules

- **R-FONT-001** MUST: Font asset URLs MUST be constructed using `new URL()` with `import.meta.url` as the base for proper resolution in edge runtime environments.

### Verify

```bash
# Check for proper fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for new URL pattern with public/fonts path
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
Claude Code MUST NOT skip or defer verification of font asset URL construction patterns. All API routes generating dynamic images MUST comply with R-FONT-001 before acceptance.
</enforcement>