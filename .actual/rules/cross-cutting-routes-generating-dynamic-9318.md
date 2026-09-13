# Fetch External Font Assets at Runtime in API Routes: Routes Generating Dynamic

These rules are ALWAYS ACTIVE for API routes generating dynamic images that require font asset loading in edge runtime environments.

### Rules

- **R-FONT-001** MUST: API routes generating dynamic images MUST use fetch() to load font assets from the public directory

### Verify

```bash
# Check for fetch() usage with import.meta.url in API routes
grep -r "fetch(.*import\.meta\.url" pages/api/

# Check for new URL pattern with public/fonts
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'
```

**Accept when:**
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation

<enforcement>
Clause Code MUST NOT skip or defer verification. All three verify commands must pass before accepting changes to API routes that load font assets.
</enforcement>