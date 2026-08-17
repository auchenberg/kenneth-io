# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Pages Use Markdown

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation and list/index pages requiring build-time data fetching.

### Rules

- **R-NEXTJS-001** MUST: Export `getStaticProps` as an async function from content-driven page components, returning a props object with data fetched from helper functions.
- **R-NEXTJS-002** MUST: Export `getStaticPaths` from dynamic route pages (e.g., `[city].js`), returning a paths array with all route parameters to be pre-rendered.
- **R-NEXTJS-003** MAY: Use markdown-it or similar libraries for content transformation within `getStaticProps`.
- **R-NEXTJS-004** SHOULD: Place data fetching logic in `helpers/` directory modules (e.g., `getTravelGuides.js`, `getBucketList.js`) to maintain separation of concerns.
- **R-NEXTJS-005** SHOULD: Import and utilize `next/link` for navigation between static pages to preserve client-side routing benefits.
- **R-NEXTJS-006** SHOULD: Import Layout component from `components/layout` and wrap page content for consistent structure.

### Verify

```bash
# Verify getStaticProps exports in content pages
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Verify getStaticPaths exports in dynamic routes
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Verify next/link usage for navigation
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching logic is separated into `helpers/` directory modules
- No pages in scope use `getServerSideProps` or client-side data fetching for content-driven routes

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for pages matching the configured scope. Violations must be flagged during code review and architecture decisions requiring alternative rendering strategies must be documented and approved by tech lead.
</enforcement>