# Adopt Next.js with React as Standard SSR/SSG Framework: React Used Library

These rules are ALWAYS ACTIVE for all page components in the `pages/` directory, all API routes in the `pages/api/` directory, static site generation workflows, and dynamic route handlers within this Next.js project.

### Rules

- **R-NEXTJS-001** MUST: React MUST be used as the UI library for all component implementations in page components and API routes that render UI.

### Verify

```bash
# Verify Next.js framework primitives are used in pages/
grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l

# Verify React is imported in page components
grep -r "from 'react'" pages/ | wc -l

# Count API routes in pages/api/
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
Clause Code MUST NOT skip or defer verification. All page components and API routes must demonstrate React usage and Next.js framework primitive adoption before acceptance.
</enforcement>