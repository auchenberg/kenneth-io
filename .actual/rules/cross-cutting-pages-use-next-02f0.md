# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Pages Use Next

These rules are ALWAYS ACTIVE for all files in the `pages/travel/` directory with dynamic routing, list pages (`pages/lists.js`), and any pages sourcing content from `helpers/getTravelGuides` or `helpers/getBucketList`.

### Rules

- **R-NEXT-SGN-001** MUST: All travel guide pages under `pages/travel/` with dynamic routes export both `getStaticProps` and `getStaticPaths` functions.
- **R-NEXT-SGN-002** MUST: List pages export `getStaticProps` and import from `helpers/getBucketList`.
- **R-NEXT-SGN-003** MUST: Travel guide pages import and use `markdown-it` for content processing within `getStaticProps`.
- **R-NEXT-SGN-004** MUST: All pages using static generation import React and Layout components from `components/layout`.
- **R-NEXT-SGN-005** MUST: `getStaticPaths` returns all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-NEXT-SGN-006** SHOULD: Use `next/link` for client-side navigation between statically generated pages to enable transitions without full page reloads.
- **R-NEXT-SGN-007** MAY: Pages MAY use `next/link` for client-side navigation between statically generated pages.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths in travel pages
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it usage in travel pages
grep -r "from.*markdown-it" pages/travel/
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions
- List pages export `getStaticProps` and import from `helpers/getBucketList`
- Travel guide pages import `markdown-it` for content processing within `getStaticProps`
- All pages using static generation import React and Layout components
- `getStaticPaths` returns complete city slugs with properly structured `params.city` objects
- Helper functions are invoked at the top level of page files within `getStaticProps`

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for pages matching the configured scope. CI pipeline MUST fail if pages directory contains files without required `getStaticProps` exports. Code review MUST block merge if new travel guide pages lack `getStaticPaths` implementation.
</enforcement>