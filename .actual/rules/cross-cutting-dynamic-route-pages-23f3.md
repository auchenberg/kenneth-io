# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Dynamic Route Pages

These rules are ALWAYS ACTIVE for all content-driven pages under the `pages/` directory, including dynamic route handlers using bracket notation (e.g., `[city].js`) and list/index pages requiring build-time data fetching.

### Rules

- **R-NEXTJS-SGG-001** MUST: Dynamic route pages MUST export `getStaticPaths` to define the set of paths to be statically generated at build time.
- **R-NEXTJS-SGG-002** MUST: Content-driven pages under `pages/` directory MUST export `getStaticProps` as an async function returning a props object with data fetched from helper functions.
- **R-NEXTJS-SGG-003** MUST: Data fetching logic MUST be placed in `helpers/` directory modules (e.g., `getTravelGuides.js`, `getBucketList.js`) to maintain separation of concerns.
- **R-NEXTJS-SGG-004** MUST: Page components MUST import and utilize `next/link` for internal navigation to preserve client-side routing benefits while serving static HTML.
- **R-NEXTJS-SGG-005** SHOULD: Helper functions SHOULD implement robust error handling and fallback mechanisms to prevent build-time failures when data sources are unavailable.
- **R-NEXTJS-SGG-006** SHOULD: Pages proposing alternative rendering strategies (SSR, CSR) SHOULD document rationale in page-level comments and obtain tech lead approval.

### Verify

```bash
# Verify getStaticProps exports in content pages
grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"

# Verify getStaticPaths exports in dynamic route pages
grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"

# Verify next/link imports for navigation
grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"
```

**Accept when:**
- All content-driven pages under `pages/` directory export `getStaticProps` function
- Dynamic route pages export both `getStaticProps` and `getStaticPaths`
- Pages import and utilize `next/link` for navigation between static pages
- Data fetching logic is isolated in `helpers/` directory modules
- Helper functions include error handling and fallback mechanisms

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for pages matching the configured scope. Code review and automated linting MUST flag violations before merge.
</enforcement>