# Adopt Next.js with React as Standard SSR/SSG Framework: Static Page Generation

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, and static site generation workflows using Next.js data fetching patterns.

### Rules

- **R-NEXTJS-001** MUST: Static page generation MUST use getStaticProps and getStaticPaths functions where dynamic routes require build-time data fetching.

### Verify

```bash
# Check for Next.js framework primitives in pages directory
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Verify React imports in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api directory
find pages/api -name '*.js' -o -name '*.ts' | wc -l

# Verify getStaticProps and getStaticPaths exports
grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l
```

**Accept when:**
- All page components in `pages/` directory import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in `pages/api/` directory
- Data fetching patterns use Next.js conventions rather than client-side useEffect patterns

<enforcement>
Claude Code MUST NOT skip or defer verification. All page components and API routes must comply with Next.js static generation patterns before code review approval.
</enforcement>