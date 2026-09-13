# Adopt Next.js with React as Standard SSR/SSG Framework: Components Use Next

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and static site generation workflows using Next.js data fetching patterns.

### Rules

- **R-NEXT-001** MAY: Components MAY use next/og for dynamic Open Graph image generation.
- **R-NEXT-002** MUST: All page components in pages/ directory MUST import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers).
- **R-NEXT-003** MUST: React MUST be imported in all page components that render UI.
- **R-NEXT-004** SHOULD: Data fetching logic SHOULD be extracted into separate helper modules to maintain separation of concerns.
- **R-NEXT-005** SHOULD: Use getStaticProps for pages requiring build-time data fetching and getStaticPaths for dynamic routes that need static generation.
- **R-NEXT-006** SHOULD: Specify runtime='edge' in API route config when low-latency or global distribution is required.
- **R-NEXT-007** SHOULD: Use next/link for internal navigation to enable client-side transitions.
- **R-NEXT-008** MUST: Data fetching patterns MUST use Next.js conventions rather than client-side useEffect patterns.

### Verify

```bash
# Check for Next.js framework primitives in pages directory
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Check for React imports in pages directory
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
Claude Code MUST NOT skip or defer verification. All verify commands MUST pass before accepting new page components or API routes. Pull requests introducing non-Next.js page patterns MUST be flagged during code review. CI build MUST fail if verify commands detect missing Next.js conventions in pages/ directory.
</enforcement>