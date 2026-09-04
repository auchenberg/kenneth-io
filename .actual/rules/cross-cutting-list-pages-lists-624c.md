# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: List Pages Lists

These rules are ALWAYS ACTIVE for all files in the `pages/` directory, specifically travel guide pages under `pages/travel/` and list pages at `pages/lists.js` that render content sourced from helper modules and require static generation for optimal SEO and performance.

### Rules

- **R-NEXTJS-001** MUST: List pages (`pages/lists.js`) MUST use `getStaticProps` to fetch bucket list data at build time.
- **R-NEXTJS-002** MUST: All travel guide pages under `pages/travel/` with dynamic routing MUST export both `getStaticProps` and `getStaticPaths` functions.
- **R-NEXTJS-003** MUST: `getStaticPaths` MUST return all valid city slugs with a `paths` array containing objects with `params.city` property.
- **R-NEXTJS-004** MUST: Markdown content processing MUST occur within `getStaticProps` using markdown-it to return pre-rendered HTML as props.
- **R-NEXTJS-005** MUST: Helper functions (`getTravelGuides`, `getBucketList`) MUST be imported at the top of page files and invoked within the `getStaticProps` async function.
- **R-NEXTJS-006** SHOULD: Page components SHOULD be wrapped with the `Layout` component imported from `components/layout` for consistent UI structure.
- **R-NEXTJS-007** SHOULD: Navigation between statically generated pages SHOULD use `next/link` to enable client-side transitions without full page reloads.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it usage
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
Claude Code MUST NOT skip or defer verification. All travel and list pages MUST comply with static generation requirements before merge. Build-time validation MUST ensure all dynamic routes implement required Next.js data fetching functions. CI pipeline MUST fail if pages directory contains files without required `getStaticProps` exports.
</enforcement>