# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: Data Fetching Logic

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory that require data at render time, dynamic route pages using bracket notation, API routes in `pages/api/`, and helper functions that encapsulate data fetching logic for use in getStaticProps.

### Rules

- **R-SGS-001** SHOULD: Data fetching logic SHOULD be encapsulated in helper functions (e.g., getTravelGuides, getBucketList) rather than inline within getStaticProps.

### Verify

```bash
# Verify getStaticProps exports exist
grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify getStaticPaths exports exist for dynamic routes
grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify build completes with static generation
npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'
```

**Accept when:**
- All page components requiring build-time data export getStaticProps functions that successfully return props
- Dynamic route pages export getStaticPaths with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs
- Data fetching logic is extracted into helper functions rather than inlined in getStaticProps

<enforcement>
Claude Code MUST NOT skip or defer verification. Build failures block deployment if getStaticProps functions fail during static generation. Code review feedback requests pattern compliance before merge approval.
</enforcement>