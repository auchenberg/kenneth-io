# Adopt Next.js with React as Standard SSR/SSG Framework: React Used Library

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, static site generation workflows, and dynamic route handlers within this Next.js application.

### Rules

- **R-NEXTJS-001** MUST: React MUST be used as the UI library for all component implementations in page components and API routes that render UI.
- **R-NEXTJS-002** MUST: All page components in the `pages/` directory MUST use Next.js framework primitives including `getStaticProps`, `getStaticPaths`, or API route handlers for data fetching.
- **R-NEXTJS-003** MUST: Data fetching logic MUST be extracted into separate helper modules to maintain separation of concerns between data fetching and presentation.
- **R-NEXTJS-004** SHOULD: Use `getStaticProps` for pages requiring build-time data fetching and `getStaticPaths` for dynamic routes that need static generation.
- **R-NEXTJS-005** SHOULD: Specify `runtime='edge'` in API route config when low-latency or global distribution is required.
- **R-NEXTJS-006** SHOULD: Use `next/link` for internal navigation to enable client-side transitions.
- **R-NEXTJS-007** SHOULD: Import Layout components consistently across pages to maintain UI consistency.

### Verify

```bash
# Verify Next.js framework primitives are used in pages directory
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Verify React is imported in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api directory
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Verify data fetching patterns use Next.js conventions
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in `pages/` directory import and use Next.js framework primitives (`getStaticProps`, `getStaticPaths`, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in `pages/api/` directory
- Data fetching patterns use Next.js conventions rather than client-side `useEffect` patterns

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new page components and API routes must comply with R-NEXTJS-001 through R-NEXTJS-007 before merge.
</enforcement>