# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Dynamic Route Pages

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation (e.g., `[city].js`) and list/index pages requiring build-time data fetching.

### Rules

- **R-NEXTJS-SGG-001** MUST: Dynamic route pages MUST export `getStaticPaths` to define the set of paths to be statically generated.
- **R-NEXTJS-SGG-002** MUST: Content-driven pages under `pages/` directory MUST export `getStaticProps` as an async function returning a props object with data fetched from helper functions.
- **R-NEXTJS-SGG-003** MUST: Data fetching logic MUST be placed in `helpers/` directory modules to maintain separation of concerns.
- **R-NEXTJS-SGG-004** SHOULD: Pages SHOULD import and utilize `next/link` for navigation between static pages to preserve client-side routing benefits.
- **R-NEXTJS-SGG-005** SHOULD: Layout component from `components/layout` SHOULD wrap page content for consistent structure.

### Verify

```bash
# Verify getStaticProps exports in content pages
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Verify getStaticPaths exports in dynamic route pages
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Verify next/link imports for navigation
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching helper functions are located in `helpers/` directory
- Pages wrap content with Layout component from `components/layout`

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All content-driven pages must be checked for proper static generation exports before approval.
</enforcement>