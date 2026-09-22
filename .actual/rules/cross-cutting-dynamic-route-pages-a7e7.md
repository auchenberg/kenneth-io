# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Dynamic Route Pages

These rules are ALWAYS ACTIVE for all pages under `pages/travel/` with dynamic routing, list pages (`pages/lists.js`), and any content sourced from helpers (`getTravelGuides`, `getBucketList`) that require static generation for optimal SEO and performance.

### Rules

- **R-NEXTJS-001** MUST: Dynamic route pages with `[city]` parameter MUST implement `getStaticPaths` to define all valid city paths for static generation.
- **R-NEXTJS-002** MUST: All travel guide pages under `pages/travel/` MUST export `getStaticProps` function that processes markdown content and returns pre-rendered HTML as props.
- **R-NEXTJS-003** MUST: List pages (`pages/lists.js`) MUST export `getStaticProps` and import from `helpers/getBucketList` for data fetching at build time.
- **R-NEXTJS-004** MUST: Travel guide pages MUST import and use `markdown-it` for content processing within `getStaticProps` async function.
- **R-NEXTJS-005** MUST: All pages using static generation MUST import React and Layout components from `components/layout` for consistent UI structure.
- **R-NEXTJS-006** SHOULD: Use `next/link` for navigation between statically generated pages to enable client-side transitions without full page reloads.
- **R-NEXTJS-007** SHOULD: Implement `fallback: 'blocking'` in `getStaticPaths` for graceful handling of new paths not pre-generated at build time.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it usage
grep -r "from.*markdown-it" pages/travel/

# Verify Layout and React imports
grep -r "from.*components/layout" pages/travel/ pages/lists.js
grep -r "import React" pages/travel/ pages/lists.js
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions
- List pages export `getStaticProps` and import from `helpers/getBucketList`
- Travel guide pages import `markdown-it` for content processing within `getStaticProps`
- All pages using static generation import React and Layout components
- `getStaticPaths` returns all valid city slugs with paths array containing objects with `params.city` property
- Helper functions are invoked within `getStaticProps` async function at the top of page files

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for pages matching the configured scope. Code review and CI pipeline validation are required before merge.
</enforcement>