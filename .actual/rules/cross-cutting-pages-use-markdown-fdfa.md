# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Pages Use Markdown

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation and list/index pages requiring build-time data fetching.

### Rules

- **R-NEXTJS-001** MUST: Export `getStaticProps` as an async function from content-driven page components, returning a props object with data fetched from helper functions.
- **R-NEXTJS-002** MUST: Export `getStaticPaths` from dynamic route pages (e.g., `[city].js`), returning a paths array with all route parameters to be pre-rendered.
- **R-NEXTJS-003** SHOULD: Place data fetching logic in the `helpers/` directory modules (e.g., `getTravelGuides.js`, `getBucketList.js`) to maintain separation of concerns.
- **R-NEXTJS-004** SHOULD: Import and use the Layout component from `components/layout` and wrap page content for consistent structure.
- **R-NEXTJS-005** SHOULD: Use `next/link` for internal navigation to preserve client-side routing benefits while serving static HTML.
- **R-NEXTJS-006** MAY: Use markdown-it or similar libraries for content transformation within `getStaticProps`.

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
- Data fetching helper functions are located in the `helpers/` directory
- Pages wrap content with the Layout component from `components/layout`

<enforcement>
Claude Code MUST NOT skip or defer verification. All content-driven pages MUST export required Next.js data fetching functions. Pull requests missing `getStaticProps` for content pages MUST be flagged in code review. Build warnings MUST be generated for `pages/` files without appropriate data fetching exports.
</enforcement>