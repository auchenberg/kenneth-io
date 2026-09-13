# Adopt Next.js with React as Standard SSR/SSG Framework: Data Fetching Logic

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, static site generation workflows using `getStaticProps` and `getStaticPaths`, dynamic route handlers requiring build-time or runtime data fetching, and OG image generation endpoints.

### Rules

- **R-NEXTJS-001** SHOULD: Data fetching logic SHOULD be separated into helper modules rather than embedded directly in page components.

### Verify

```bash
# Verify Next.js framework primitives are imported in pages/
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Verify React is imported in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api/
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Verify data fetching patterns use Next.js conventions
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in `pages/` directory import and use Next.js framework primitives (`getStaticProps`, `getStaticPaths`, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in `pages/api/` directory
- Data fetching patterns use Next.js conventions rather than client-side `useEffect` patterns
- Data fetching logic is extracted into separate helper modules (e.g., `helpers/getTravelGuides.js`) rather than embedded in page components

<enforcement>
Claude Code MUST NOT skip or defer verification. All verify commands MUST pass before accepting changes to page components, API routes, or data fetching patterns.
</enforcement>