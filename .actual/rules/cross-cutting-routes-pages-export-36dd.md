# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Routes Pages Export

These rules are ALWAYS ACTIVE for React-based page components in the `pages/` directory, data helper modules in the `helpers/` directory, and Next.js API routes in the `pages/api/` directory that follow the static content delivery and build-time data fetching pattern.

### Rules

- **R-ROUTES-PAGES-001** MUST: API routes in `pages/api/` MUST export handler functions or named HTTP method functions (GET, POST) as public contracts.
- **R-ROUTES-PAGES-002** MUST: Page components in `pages/` MUST import React and use it for rendering.
- **R-ROUTES-PAGES-003** MUST: Page components that render static content MUST implement `getStaticProps` or `getStaticPaths` for build-time data fetching.
- **R-ROUTES-PAGES-004** MUST: Helper modules in `helpers/` MUST export named functions (e.g., `getAllTravelGuides`, `getTravelGuideBySlug`) that return plain JavaScript objects or arrays.
- **R-ROUTES-PAGES-005** SHOULD: Helper modules SHOULD use `gray-matter` for parsing markdown files with frontmatter and `markdown-it` for content transformation.
- **R-ROUTES-PAGES-006** SHOULD: Helper modules SHOULD implement error handling using try-catch blocks with console.error logging, returning empty arrays or null values on failure.
- **R-ROUTES-PAGES-007** SHOULD: Dynamic routes (e.g., `pages/travel/[city].js`) SHOULD implement both `getStaticPaths` to generate route parameters and `getStaticProps` to fetch data for each route.

### Verify

```bash
# Verify React imports in page components
grep -r "import.*react" pages/ | grep -v node_modules | wc -l

# Verify helper modules use gray-matter and fs/path
find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l

# Verify getStaticProps/getStaticPaths usage
grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l

# Verify API route exports
grep -r "export.*default\|export.*GET\|export.*POST" pages/api/ | grep -v node_modules | wc -l
```

**Accept when:**
- At least 5 page components in `pages/` directory import React and use it for rendering
- At least 3 helper modules in `helpers/` directory use `gray-matter` and Node.js `fs`/`path` modules for content processing
- At least 5 page components implement `getStaticProps` or `getStaticPaths` for build-time data fetching
- API routes in `pages/api/` export handler functions or named HTTP method functions as public contracts

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All new page components, helper modules, and API routes MUST be reviewed against R-ROUTES-PAGES-001 through R-ROUTES-PAGES-007 before approval. Build-time validation MUST confirm helper modules successfully export expected function contracts. Violations require architectural review and justification.
</enforcement>