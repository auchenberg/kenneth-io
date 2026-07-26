# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Layout Components Extracted

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, dynamic route handlers using bracket notation, list and index pages, and travel guide pages requiring build-time data fetching.

### Rules

- **R-NEXTJS-SGG-001** MUST: Export `getStaticProps` as an async function from all content-driven page components, returning a props object with data fetched from helper functions.
- **R-NEXTJS-SGG-002** MUST: Export `getStaticPaths` from dynamic route pages (e.g., `[city].js`), returning a paths array with all route parameters to be pre-rendered.
- **R-NEXTJS-SGG-003** SHOULD: Extract layout components to the `components/` directory and reuse them across statically generated pages.
- **R-NEXTJS-SGG-004** SHOULD: Place data fetching logic in `helpers/` directory modules (e.g., `getTravelGuides.js`, `getBucketList.js`) to maintain separation of concerns.
- **R-NEXTJS-SGG-005** SHOULD: Use `next/link` for internal navigation to preserve client-side routing benefits while serving static HTML.
- **R-NEXTJS-SGG-006** MUST NOT: Apply static generation to API routes under `pages/api/`, pages requiring real-time data or user-specific content, authentication-gated pages with session-dependent rendering, or admin/dashboard pages with frequently changing data.

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
- Layout components are extracted to `components/` directory and reused across pages
- Data fetching logic is isolated in `helpers/` directory modules

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules must be checked during code review and build-time validation. Violations must be flagged and require explicit exception approval from tech lead.
</enforcement>