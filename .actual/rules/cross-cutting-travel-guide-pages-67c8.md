# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Travel Guide Pages

These rules are ALWAYS ACTIVE for all files in the `pages/travel/` directory with dynamic routing patterns, list pages at `pages/lists.js`, and any pages sourcing content from `helpers/getTravelGuides` or `helpers/getBucketList`.

### Rules

- **R-TG-001** MUST: Travel guide pages under `pages/travel/[city].js` MUST implement `getStaticProps` to fetch and process city-specific content at build time.
- **R-TG-002** MUST: Travel guide pages with dynamic routes MUST implement `getStaticPaths` to return all valid city slugs with paths array containing objects with `params.city` property.
- **R-TG-003** MUST: List pages displaying bucket list content MUST export `getStaticProps` and import from `helpers/getBucketList`.
- **R-TG-004** MUST: Markdown content processing MUST occur within `getStaticProps` using markdown-it to return pre-rendered HTML as props.
- **R-TG-005** MUST: Helper functions (`getTravelGuides`, `getBucketList`) MUST be imported at the top of page files and invoked within the `getStaticProps` async function.
- **R-TG-006** SHOULD: Page components SHOULD be wrapped with the `Layout` component imported from `components/layout` for consistent UI structure.
- **R-TG-007** SHOULD: Navigation between statically generated pages SHOULD use `next/link` to enable client-side transitions without full page reloads.

### Verify

```bash
# Verify getStaticProps exports in travel and list pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths exports in travel pages
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it imports in travel pages
grep -r "from.*markdown-it" pages/travel/
```

**Accept when:**
- All travel guide pages under `pages/travel/` export both `getStaticProps` and `getStaticPaths` functions
- List pages export `getStaticProps` and import from `helpers/getBucketList`
- Travel guide pages import markdown-it for content processing within `getStaticProps`
- All pages using static generation import React and Layout components
- `getStaticPaths` returns complete city slugs with properly structured params objects
- Markdown content is pre-rendered to HTML within `getStaticProps` before being passed as props

<enforcement>
Claude Code MUST NOT skip or defer verification. All travel guide and list pages MUST satisfy these rules before merge. CI pipeline MUST fail if pages directory contains files without required `getStaticProps` exports. Code review MUST block merge if new travel guide pages lack `getStaticPaths` implementation.
</enforcement>