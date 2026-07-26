# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Dynamic Route Pages

These rules are ALWAYS ACTIVE for all files in the `pages/travel/` directory with dynamic routing, list pages (`pages/lists.js`), and any pages sourcing content from `helpers/getTravelGuides` or `helpers/getBucketList`.

### Rules

- **R-NEXTJS-SGP-001** MUST: Dynamic route pages with `[city]` parameter MUST implement `getStaticPaths` to define all valid city paths for static generation.
- **R-NEXTJS-SGP-002** MUST: All travel guide pages under `pages/travel/` MUST export `getStaticProps` function that processes markdown content using markdown-it and returns pre-rendered HTML as props.
- **R-NEXTJS-SGP-003** MUST: List pages (`pages/lists.js`) MUST export `getStaticProps` and import from `helpers/getBucketList` for data fetching at build time.
- **R-NEXTJS-SGP-004** MUST: `getStaticPaths` MUST return all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-NEXTJS-SGP-005** SHOULD: Page components SHOULD be wrapped with the `Layout` component imported from `components/layout` for consistent UI structure.
- **R-NEXTJS-SGP-006** SHOULD: Navigation between statically generated pages SHOULD use `next/link` to enable client-side transitions without full page reloads.
- **R-NEXTJS-SGP-007** MAY: Consider implementing Incremental Static Regeneration (ISR) with `revalidate` option if content update frequency increases while maintaining static generation benefits.

### Verify

```bash
# Verify getStaticProps exports in travel and list pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths exports in dynamic route pages
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it usage in static generation
grep -r "from.*markdown-it" pages/travel/
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions
- List pages export `getStaticProps` and import from `helpers/getBucketList`
- Travel guide pages import markdown-it for content processing within `getStaticProps`
- All pages using static generation import React and Layout components
- `getStaticPaths` returns complete city slugs with properly structured `params.city` objects
- Markdown content is pre-rendered to HTML within `getStaticProps` before being passed as props

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All travel and list pages MUST implement the required static generation exports. Build-time validation MUST ensure all dynamic routes implement required Next.js data fetching functions. CI pipeline MUST fail if pages directory contains files without required `getStaticProps` exports.
</enforcement>