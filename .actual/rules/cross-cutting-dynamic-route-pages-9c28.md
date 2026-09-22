# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: Dynamic Route Pages

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory that require data at render time, particularly dynamic route pages using bracket notation (e.g., `[city].js`) and API routes in `pages/api/`.

### Rules

- **R-SGS-001** MUST: Dynamic route pages that require static generation MUST export a `getStaticPaths` function to specify which paths should be pre-rendered at build time.

### Verify

```bash
# Check for getStaticProps exports in pages directory
grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Check for getStaticPaths exports in pages directory
grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify build process completes with static generation
npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'
```

**Accept when:**
- All page components requiring build-time data export `getStaticProps` functions that successfully return props
- Dynamic route pages export `getStaticPaths` with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs

<enforcement>
Claude Code MUST NOT skip or defer verification. Build failures block deployment if `getStaticProps` functions fail during static generation. Code review must verify that new pages follow `getStaticProps`/`getStaticPaths` patterns. Deviations require documented exceptions approved by tech lead with architectural justification.
</enforcement>