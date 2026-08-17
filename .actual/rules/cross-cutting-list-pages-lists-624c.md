# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: List Pages Lists

These rules are ALWAYS ACTIVE for all files matching the configured scope: pages under `pages/travel/` directory with dynamic routing, list pages (`pages/lists.js`) displaying bucket list content, and React components sourcing content from `helpers/getTravelGuides` and `helpers/getBucketList`.

### Rules

- **R-NEXTJS-SGN-001** MUST: List pages (`pages/lists.js`) MUST use `getStaticProps` to fetch bucket list data at build time.
- **R-NEXTJS-SGN-002** MUST: All travel guide pages under `pages/travel/` with dynamic routing MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-NEXTJS-SGN-003** MUST: `getStaticPaths` MUST return all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-NEXTJS-SGN-004** MUST: Markdown content MUST be processed within `getStaticProps` using `markdown-it` to return pre-rendered HTML as props.
- **R-NEXTJS-SGN-005** MUST: Helper functions (`getTravelGuides`, `getBucketList`) MUST be imported at the top of page files and invoked within the `getStaticProps` async function.
- **R-NEXTJS-SGN-006** MUST: Page components MUST be wrapped with the `Layout` component imported from `components/layout` for consistent UI structure.
- **R-NEXTJS-SGN-007** SHOULD: Use `next/link` for navigation between statically generated pages to enable client-side transitions without full page reloads.
- **R-NEXTJS-SGN-008** SHOULD: Implement `fallback: 'blocking'` in `getStaticPaths` for graceful handling of new paths not pre-rendered at build time.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths exports in travel pages
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it imports in travel pages
grep -r "from.*markdown-it" pages/travel/
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions.
- List pages export `getStaticProps` and import from `helpers/getBucketList`.
- Travel guide pages import `markdown-it` for content processing within `getStaticProps`.
- All pages using static generation import React and `Layout` components.
- `getStaticPaths` returns complete city slugs with properly structured `params` objects.
- Build-time validation confirms all dynamic routes implement required Next.js data fetching functions.

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for pages matching the configured scope. Violations must be caught during code review and CI pipeline validation before merge.
</enforcement>