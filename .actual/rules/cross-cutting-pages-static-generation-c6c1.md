# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Pages Static Generation

These rules are ALWAYS ACTIVE for all pages under `pages/travel/` with dynamic routing, list pages (`pages/lists.js`), and any pages sourcing content from `helpers/getTravelGuides` or `helpers/getBucketList`.

### Rules

- **R-STATIC-001** MUST: Pages using static generation MUST import React and utilize Layout components from the components directory.
- **R-STATIC-002** MUST: All travel guide pages under `pages/travel/` with dynamic routes MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-STATIC-003** MUST: List pages MUST export `getStaticProps` and import from `helpers/getBucketList`.
- **R-STATIC-004** MUST: Travel guide pages MUST import and use `markdown-it` for content processing within `getStaticProps`.
- **R-STATIC-005** MUST: `getStaticPaths` MUST return all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-STATIC-006** MUST: Helper functions (getTravelGuides, getBucketList) MUST be imported at the top of page files and invoked within the `getStaticProps` async function.
- **R-STATIC-007** SHOULD: Use `next/link` for navigation between statically generated pages to enable client-side transitions without full page reloads.
- **R-STATIC-008** SHOULD: Implement comprehensive testing for `getTravelGuides` to ensure all cities are returned and build-time validation to detect missing paths.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it usage
grep -r "from.*markdown-it" pages/travel/

# Verify React and Layout imports
grep -r "import React" pages/travel/ pages/lists.js
grep -r "from.*components/layout" pages/travel/ pages/lists.js
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions.
- List pages export `getStaticProps` and import from `helpers/getBucketList`.
- Travel guide pages import `markdown-it` for content processing within `getStaticProps`.
- All pages using static generation import React and Layout components from `components/layout`.
- `getStaticPaths` returns complete city slugs with properly structured `paths` array.
- Helper functions are invoked within `getStaticProps` async context.

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All travel and list pages MUST comply with static generation requirements before merge. Build-time validation MUST pass with no missing exports or imports.
</enforcement>