# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Helper Functions Data

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, dynamic route handlers using bracket notation (e.g., `[city].js`), list and index pages requiring build-time data fetching, and travel guide pages and similar content presentation routes.

### Rules

- **R-NEXTJS-SGP-001** SHOULD: Helper functions for data fetching (getTravelGuides, getBucketList) SHOULD be isolated in separate modules under `helpers/` directory.
- **R-NEXTJS-SGP-002** MUST: All content-driven pages under `pages/` directory MUST export `getStaticProps` as an async function returning a props object with data fetched from helper functions.
- **R-NEXTJS-SGP-003** MUST: Dynamic route pages MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-NEXTJS-SGP-004** SHOULD: Pages SHOULD import and utilize `next/link` for navigation between static pages to preserve client-side routing benefits.
- **R-NEXTJS-SGP-005** SHOULD: Pages SHOULD import Layout component from `components/layout` and wrap page content for consistent structure.

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
- Helper functions for data fetching are located in `helpers/` directory modules
- Layout component is imported from `components/layout` and wraps page content

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for content-driven pages and must be verified before accepting pull requests or merging code.
</enforcement>