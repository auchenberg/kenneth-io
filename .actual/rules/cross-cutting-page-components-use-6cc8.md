# Adopt Next.js with React as Standard SSR/SSG Framework: Page Components Use

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and any files participating in Next.js rendering lifecycle including static site generation workflows and dynamic route handlers.

### Rules

- **R-NEXTJS-001** MUST: All page components MUST use Next.js as the primary framework for rendering and routing.
- **R-NEXTJS-002** MUST: All page components in the `pages/` directory MUST follow Next.js file-based routing conventions.
- **R-NEXTJS-003** MUST: All API routes in the `pages/api/` directory MUST use Next.js API route handlers.
- **R-NEXTJS-004** MUST: Pages requiring build-time data fetching MUST use `getStaticProps` and `getStaticPaths` for dynamic routes.
- **R-NEXTJS-005** MUST: Data fetching logic MUST be extracted into separate helper modules to maintain separation of concerns.
- **R-NEXTJS-006** SHOULD: API routes requiring low-latency or global distribution SHOULD specify `runtime='edge'` in route config.
- **R-NEXTJS-007** SHOULD: Internal navigation SHOULD use `next/link` to enable client-side transitions.
- **R-NEXTJS-008** SHOULD: Layout components SHOULD be imported consistently across pages to maintain UI consistency.

### Verify

```bash
# Check for Next.js framework imports in page components
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Check for React imports in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api directory
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Check for Next.js data fetching patterns
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in `pages/` directory import and use Next.js framework primitives (`getStaticProps`, `getStaticPaths`, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in `pages/api/` directory
- Data fetching patterns use Next.js conventions rather than client-side `useEffect` patterns

<enforcement>
Claude Code MUST NOT skip or defer verification. All page components and API routes MUST comply with Next.js framework requirements before code review approval.
</enforcement>