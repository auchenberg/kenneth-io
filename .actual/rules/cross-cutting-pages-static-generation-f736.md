# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Pages Static Generation

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation and list/index pages requiring build-time data fetching.

### Rules

- **R-PAGES-SG-001** MUST: Pages using static generation MUST import React and utilize Next.js Link component for client-side navigation.
- **R-PAGES-SG-002** MUST: All content-driven pages under `pages/` directory MUST export `getStaticProps` function.
- **R-PAGES-SG-003** MUST: Dynamic route pages MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-PAGES-SG-004** MUST: Data fetching logic MUST be placed in `helpers/` directory modules to maintain separation of concerns.
- **R-PAGES-SG-005** MUST: Pages MUST import Layout component from `components/layout` and wrap page content for consistent structure.

### Verify

```bash
# Verify getStaticProps exports in pages directory
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Verify getStaticPaths exports in dynamic routes
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Verify next/link imports for navigation
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching helper functions are located in `helpers/` directory
- Pages import and use Layout component from `components/layout`

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules during code review and build-time checks.
</enforcement>