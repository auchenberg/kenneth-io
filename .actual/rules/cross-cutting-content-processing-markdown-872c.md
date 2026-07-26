# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Content Processing Markdown

These rules are ALWAYS ACTIVE for all files in the `pages/travel/` directory, `pages/lists.js`, and any other pages using static generation with markdown content processing.

### Rules

- **R-NEXTJS-001** MUST: All travel guide pages under `pages/travel/` with dynamic routing MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-NEXTJS-002** MUST: List pages displaying bucket list content MUST export `getStaticProps` and import from `helpers/getBucketList`.
- **R-NEXTJS-003** SHOULD: Content processing with markdown-it SHOULD occur within `getStaticProps` to minimize client-side computation.
- **R-NEXTJS-004** MUST: `getStaticPaths` MUST return all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-NEXTJS-005** MUST: Markdown content MUST be processed using markdown-it within `getStaticProps` and returned as pre-rendered HTML in props.
- **R-NEXTJS-006** MUST: Helper functions (`getTravelGuides`, `getBucketList`) MUST be imported at the top of page files and invoked within the `getStaticProps` async function.
- **R-NEXTJS-007** MUST: All pages using static generation MUST import React and the Layout component from `components/layout`.
- **R-NEXTJS-008** SHOULD: Navigation between statically generated pages SHOULD use `next/link` to enable client-side transitions without full page reloads.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths in travel pages
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
- `getStaticPaths` returns complete city slugs with properly structured `params` objects
- Markdown content is processed and returned as pre-rendered HTML within `getStaticProps`

<enforcement>
Claude Code MUST NOT skip or defer verification. All verify commands MUST pass before accepting changes to pages using static generation. Code review MUST check for presence of required exports and imports. CI pipeline MUST fail if pages directory contains files without required `getStaticProps` exports. Build process MUST validate all dynamic routes implement required Next.js data fetching functions.
</enforcement>