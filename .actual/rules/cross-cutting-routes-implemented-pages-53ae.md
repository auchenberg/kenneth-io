# Adopt Next.js with React as Standard SSR/SSG Framework: Routes Implemented Pages

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and static site generation workflows using Next.js data fetching patterns.

### Rules

- **R-NEXTJS-001** MUST: API routes MUST be implemented in the pages/api directory following Next.js conventions
- **R-NEXTJS-002** MUST: All page components in pages/ directory MUST import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers)
- **R-NEXTJS-003** MUST: React MUST be imported in all page components that render UI
- **R-NEXTJS-004** SHOULD: Extract data fetching logic into separate helper modules to maintain separation of concerns
- **R-NEXTJS-005** SHOULD: Use getStaticProps for pages requiring build-time data fetching and getStaticPaths for dynamic routes that need static generation
- **R-NEXTJS-006** SHOULD: Specify runtime='edge' in API route config when low-latency or global distribution is required
- **R-NEXTJS-007** SHOULD: Use next/link for internal navigation to enable client-side transitions
- **R-NEXTJS-008** MAY: Implement incremental static regeneration for frequently updated content

### Verify

```bash
# Check for Next.js framework imports in pages directory
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
Claude Code MUST NOT skip or defer verification. All new page components and API routes must comply with these rules before merge. CI pipeline verification commands MUST pass. Pull requests introducing non-Next.js page patterns are flagged during code review and must be remediated or approved via exception process.
</enforcement>