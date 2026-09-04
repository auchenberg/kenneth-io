# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Pages That Render

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers and list/index pages that require build-time data fetching.

### Rules

- **R-PAGES-001** MUST: Pages that render content-driven routes MUST export `getStaticProps` to enable static generation at build time.
- **R-PAGES-002** MUST: Dynamic route pages (using bracket notation, e.g., `[city].js`) MUST export both `getStaticProps` and `getStaticPaths`.
- **R-PAGES-003** MUST: Data fetching logic MUST be placed in helper modules within the `helpers/` directory to maintain separation of concerns.
- **R-PAGES-004** SHOULD: Pages SHOULD import and utilize `next/link` for navigation between static pages to preserve client-side routing benefits.
- **R-PAGES-005** SHOULD: Pages SHOULD import and wrap content with the Layout component from `components/layout` for consistent structure.

### Verify

```bash
# Check for getStaticProps exports in content-driven pages
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Check for getStaticPaths exports in dynamic route pages
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Check for next/link imports in pages
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching helper functions are located in the `helpers/` directory
- Pages wrap content with Layout component from `components/layout`

<enforcement>
Claude Code MUST NOT skip or defer verification. All content-driven pages must be checked for proper static generation exports before approval.
</enforcement>