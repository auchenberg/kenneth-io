# Fetch External Font Assets at Runtime in API Routes: Routes Cache Font

These rules are ALWAYS ACTIVE for API routes that generate dynamic Open Graph images and load font assets at runtime in edge runtime environments.

### Rules

- **R-FONT-001** MAY: API routes MAY cache font assets in memory after initial fetch to reduce repeated network calls.

### Verify

```bash
# Verify fetch() usage with import.meta.url for font loading
grep -r "fetch(.*import\.meta\.url" pages/api/

# Verify URL construction for public fonts directory
grep -r "new URL.*public/fonts" pages/api/

# Verify font file exists in public directory
test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'
```

**Accept when:**
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verify commands MUST pass before accepting changes to API routes that load font assets.
</enforcement>