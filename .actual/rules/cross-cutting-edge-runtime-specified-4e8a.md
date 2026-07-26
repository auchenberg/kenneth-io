# Adopt Next.js with React as Standard SSR/SSG Framework: Edge Runtime Specified

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and static site generation workflows using Next.js data fetching patterns.

### Rules

- **R-NEXTJS-001** SHOULD: Edge runtime SHOULD be specified for API routes requiring low-latency responses or dynamic content generation.
- **R-NEXTJS-002** MUST: All page components in the pages/ directory MUST follow Next.js file-based routing conventions.
- **R-NEXTJS-003** MUST: Data fetching logic MUST be extracted into separate helper modules to maintain separation of concerns.
- **R-NEXTJS-004** SHOULD: Use getStaticProps for pages requiring build-time data fetching and getStaticPaths for dynamic routes that need static generation.
- **R-NEXTJS-005** MUST: React MUST be imported in all page components that render UI.
- **R-NEXTJS-006** SHOULD: Use next/link for internal navigation to enable client-side transitions.

### Verify

```bash
# Check for Next.js framework primitives in pages directory
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Check for React imports in pages
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api directory
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Check for getStaticProps and getStaticPaths exports
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in pages/ directory import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in pages/api/ directory
- Data fetching patterns use Next.js conventions rather than client-side useEffect patterns

<enforcement>
Claude Code MUST NOT skip or defer verification. All verify commands MUST pass before accepting new page components or API routes.
</enforcement>