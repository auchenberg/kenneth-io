# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: Routes That Require

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory that require data at render time, dynamic route pages using bracket notation, API routes in `pages/api/`, and helper functions that encapsulate data fetching logic.

### Rules

- **R-SGS-001** MUST: API routes that require runtime execution MUST define their HTTP method handlers (GET, POST, etc.) as exported functions or within the route handler.

### Verify

```bash
# Verify getStaticProps usage across page components
grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify getStaticPaths usage for dynamic routes
grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify successful static generation in build output
npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'
```

**Accept when:**
- All page components requiring build-time data export `getStaticProps` functions that successfully return props
- Dynamic route pages export `getStaticPaths` with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs

<enforcement>
Claude Code MUST NOT skip or defer verification. Build failures block deployment if `getStaticProps` functions fail during static generation. Code review feedback requests pattern compliance before merge approval. Architecture review is required for pages that deviate from static generation pattern.
</enforcement>