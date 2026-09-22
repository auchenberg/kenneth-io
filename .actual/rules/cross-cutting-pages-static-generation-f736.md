# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Pages Static Generation

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation and list/index pages requiring build-time data fetching.

### Rules

- **R-PAGES-SG-001** MUST: Pages using static generation MUST import React and utilize Next.js Link component for client-side navigation.
- **R-PAGES-SG-002** MUST: All content-driven pages under `pages/` directory MUST export `getStaticProps` as an async function returning a props object with data fetched from helper functions.
- **R-PAGES-SG-003** MUST: Dynamic route pages (using bracket notation) MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-PAGES-SG-004** MUST: Data fetching logic MUST be placed in `helpers/` directory modules to maintain separation of concerns.
- **R-PAGES-SG-005** MUST: Page content MUST be wrapped with Layout component imported from `components/layout` for consistent structure.
- **R-PAGES-SG-006** SHOULD: Monitor build times and implement incremental static regeneration or pagination strategies for large route sets to prevent build time explosion.

### Verify

```bash
# Verify getStaticProps exports in pages directory
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Verify getStaticPaths exports in dynamic route pages
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Verify next/link imports for client-side navigation
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching logic is isolated in `helpers/` directory modules
- Page components import and wrap content with Layout component

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All content-driven pages must be checked for proper static generation exports and Next.js Link usage before acceptance.
</enforcement>