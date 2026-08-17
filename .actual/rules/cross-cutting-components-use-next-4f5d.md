# Adopt Next.js with React as Standard SSR/SSG Framework: Components Use Next

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and static site generation workflows using Next.js data fetching patterns.

### Rules

- **R-NEXT-001** MAY: Components MAY use next/link for client-side navigation between pages.

### Verify

```bash
# Check for Next.js framework imports in pages directory
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Check for React imports in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api directory
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Verify data fetching patterns use Next.js conventions
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in `pages/` directory import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in `pages/api/` directory
- Data fetching patterns use Next.js conventions rather than client-side useEffect patterns

<enforcement>
Clause Code MUST NOT skip or defer verification. All page components must follow Next.js conventions for routing, data fetching, and navigation. Violations flagged during code review or CI pipeline checks must be resolved before merge.
</enforcement>