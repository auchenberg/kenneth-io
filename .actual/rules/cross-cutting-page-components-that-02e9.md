# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: Page Components That

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory that require data fetching at build time, including dynamic route pages using bracket notation and API routes that handle runtime requests.

### Rules

- **R-SGS-001** MUST: Page components that require data fetching at build time MUST export a `getStaticProps` function that returns props for the page component.
- **R-SGS-002** MUST: Dynamic route pages using bracket notation (e.g., `[city].js`) MUST export a `getStaticPaths` function with valid path arrays and appropriate fallback configuration.
- **R-SGS-003** SHOULD: Create helper functions in a dedicated `helpers/` directory to encapsulate data fetching logic and promote reuse across `getStaticProps` implementations.
- **R-SGS-004** SHOULD: Use TypeScript interfaces or PropTypes to document the shape of props returned from `getStaticProps` for type safety and developer experience.
- **R-SGS-005** MAY: Implement incremental static regeneration (ISR) with appropriate `revalidate` intervals when data freshness requirements exceed build frequency.

### Verify

```bash
# Verify all page components export getStaticProps
grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify dynamic routes export getStaticPaths
grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'

# Verify build process completes successfully with static generation
npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'
```

**Accept when:**
- All page components requiring build-time data export `getStaticProps` functions that successfully return props
- Dynamic route pages export `getStaticPaths` with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs
- Helper functions encapsulating data fetching logic are located in a dedicated directory

<enforcement>
Claude Code MUST NOT skip or defer verification. All page components in scope MUST be checked for compliance with R-SGS-001 and R-SGS-002 before approval. Build failures due to missing or invalid `getStaticProps`/`getStaticPaths` exports block deployment.
</enforcement>