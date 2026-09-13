# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Helper Functions Gettravelguides

These rules are ALWAYS ACTIVE for all files in the `pages/travel/` directory, `pages/lists.js`, and helper modules under `helpers/` that provide data fetching for travel guides and bucket list content.

### Rules

- **R-NEXTJS-001** SHOULD: Helper functions (getTravelGuides, getBucketList) SHOULD be organized in a dedicated helpers directory and imported by getStaticProps functions.
- **R-NEXTJS-002** MUST: All travel guide pages under pages/travel/ with dynamic routing MUST export both getStaticProps and getStaticPaths functions.
- **R-NEXTJS-003** MUST: getStaticPaths MUST return all valid city slugs with a paths array containing objects with params.city property.
- **R-NEXTJS-004** MUST: Markdown content MUST be processed within getStaticProps using markdown-it to return pre-rendered HTML as props.
- **R-NEXTJS-005** MUST: List pages (pages/lists.js) displaying bucket list content MUST export getStaticProps and import from helpers/getBucketList.
- **R-NEXTJS-006** SHOULD: Page components SHOULD be wrapped with Layout component imported from components/layout for consistent UI structure.
- **R-NEXTJS-007** SHOULD: Navigation between statically generated pages SHOULD use next/link to enable client-side transitions without full page reloads.
- **R-NEXTJS-008** MUST: Helper functions MUST be imported at the top of page files and invoked within the getStaticProps async function.

### Verify

```bash
# Verify getStaticProps and getStaticPaths exports in travel pages
grep -r "export.*getStaticProps" pages/travel/ pages/lists.js

# Verify getStaticPaths exports in travel pages
grep -r "export.*getStaticPaths" pages/travel/

# Verify helper function imports
grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/

# Verify markdown-it imports for content processing
grep -r "from.*markdown-it" pages/travel/
```

**Accept when:**
- All travel guide pages under pages/travel/ export both getStaticProps and getStaticPaths functions
- List pages export getStaticProps and import from helpers/getBucketList
- Travel guide pages import markdown-it for content processing within getStaticProps
- All pages using static generation import React and Layout components
- Helper functions are located in a dedicated helpers directory and imported by page files
- getStaticPaths returns complete city slugs with proper params.city structure
- Markdown content is pre-rendered within getStaticProps before being passed as props

<enforcement>
Claude Code MUST NOT skip or defer verification. All travel guide and list pages MUST comply with static generation requirements before merge. Build-time validation MUST ensure all dynamic routes implement required Next.js data fetching functions.
</enforcement>