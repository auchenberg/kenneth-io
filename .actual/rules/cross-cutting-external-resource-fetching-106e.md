# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: External Resource Fetching

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory that require data at render time, dynamic route pages using bracket notation, API routes in `pages/api/`, and helper functions that encapsulate data fetching logic for use in getStaticProps.

### Rules

- **R-SGS-001** SHOULD: External resource fetching (fonts, assets) in API routes SHOULD use fetch() with absolute URLs constructed via import.meta.url for reliability.

### Verify

```bash
# Verify getStaticProps exports across page components
grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify getStaticPaths exports for dynamic routes
grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify successful static generation in build output
npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'
```

**Accept when:**
- All page components requiring build-time data export getStaticProps functions that successfully return props
- Dynamic route pages export getStaticPaths with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs
- External resource fetching in API routes uses fetch() with absolute URLs constructed via import.meta.url

<enforcement>
Claude Code MUST NOT skip or defer verification. Build failures block deployment if getStaticProps functions fail during static generation. Code review verification is required that new pages follow getStaticProps/getStaticPaths patterns. Architecture review is required for pages that deviate from static generation pattern.
</enforcement>