# Adopt Next.js Static Generation with getStaticProps/getStaticPaths for Page Rendering: Dynamic Route Pages

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- React-based pages require a rendering strategy to generate HTML content for client delivery
- Next.js framework provides multiple rendering models including static generation, server-side rendering, and client-side rendering
- Static generation with getStaticProps and getStaticPaths enables build-time page generation for content-driven routes
- Travel guide pages and list pages demonstrate consistent use of static generation APIs across the codebase
- The pattern appears in dynamic route handlers ([city].js) and static pages (lists.js) indicating broad adoption

## Problem Statement

Pages need a consistent rendering model that balances performance, SEO requirements, and content delivery patterns. Without a standardized approach, pages may use inconsistent rendering strategies leading to varied performance characteristics and maintenance complexity.

## Decision

1. MUST: Dynamic route pages MUST export getStaticPaths to define the set of paths to be statically generated

## Policy Block

- MUST Dynamic route pages MUST export getStaticPaths to define the set of paths to be statically generated

In scope:
- Content-driven pages under pages/ directory
- Dynamic route handlers using bracket notation (e.g., [city].js)
- List and index pages requiring build-time data fetching
- Travel guide pages and similar content presentation routes

Out of scope:
- API routes under pages/api/
- Pages requiring real-time data or user-specific content
- Authentication-gated pages with session-dependent rendering
- Admin or dashboard pages with frequently changing data

## Rationale

- The evidence shows consistent use of getStaticProps and getStaticPaths across 2 files (pages/travel/[city].js and pages/lists.js) with 85% confidence
- Static generation provides optimal performance for content-driven pages by pre-rendering HTML at build time rather than on each request
- The pattern integrates with Next.js framework conventions and React component model, maintaining consistency with the broader ecosystem
- Helper module separation (getTravelGuides, getBucketList) indicates intentional architectural separation between data fetching and presentation logic

## Consequences

Positive:
- Build-time page generation delivers optimal Time to First Byte (TTFB) and Core Web Vitals scores
- Static HTML files can be served from CDN edge locations globally with minimal latency
- SEO optimization is maximized as search engine crawlers receive fully rendered HTML
- Reduced server load as pages are generated once at build time rather than per request

Negative:
- Content updates require full rebuild and redeployment to reflect changes
- Build times increase linearly with the number of static paths generated
- Dynamic or user-specific content cannot be rendered using this approach
- Large numbers of dynamic routes may result in prohibitively long build times

## Alternatives

- Server-Side Rendering (SSR) with getServerSideProps (rejected)
  Rejected because: SSR introduces higher latency per request and increased server load for content that does not change frequently. Static generation is more appropriate for travel guides and list pages.
  When valid: When content must be personalized per user or requires real-time data that cannot be cached
- Client-Side Rendering (CSR) with useEffect data fetching (rejected)
  Rejected because: CSR degrades SEO as content is not available in initial HTML payload and increases Time to Interactive. Not suitable for content-focused pages.
  When valid: When building authenticated dashboards or interactive applications where SEO is not a concern
- Incremental Static Regeneration (ISR) with revalidate option (deferred)
  Rejected because: Not observed in current evidence but could be adopted for pages requiring periodic content updates without full rebuilds
  When valid: When content updates occur periodically but full rebuilds are impractical due to scale

## Risks

- Build time explosion as the number of dynamic routes grows, potentially exceeding CI/CD time limits
  Mitigation: Monitor build times and implement incremental static regeneration or pagination strategies for large route sets. Consider fallback: 'blocking' for less critical paths.
  Owner: Engineering team
- Stale content served to users when data sources update between deployments
  Mitigation: Implement webhook-triggered rebuilds for critical content updates or migrate specific pages to ISR with appropriate revalidation intervals
  Owner: Engineering team
- Helper functions (getTravelGuides, getBucketList) may introduce build failures if data sources are unavailable at build time
  Mitigation: Implement robust error handling and fallback mechanisms in helper functions. Add build-time validation and alerting for data source availability.
  Owner: Engineering team

## Implementation Notes

- Export getStaticProps as an async function from page components, returning props object with data fetched from helper functions
- For dynamic routes, export getStaticPaths returning paths array with all route parameters to be pre-rendered
- Import Layout component from components/layout and wrap page content for consistent structure
- Place data fetching logic in helpers/ directory modules (e.g., getTravelGuides.js, getBucketList.js) to maintain separation of concerns
- Use next/link for internal navigation to preserve client-side routing benefits while serving static HTML

## Continuation Context


Verify commands:
- grep -r "export.*getStaticProps" pages/ --include="*.js" --include="*.jsx"
- grep -r "export.*getStaticPaths" pages/ --include="*.js" --include="*.jsx"
- grep -r "from 'next/link'" pages/ --include="*.js" --include="*.jsx"

Accept when:
- All content-driven pages under pages/ directory export getStaticProps function
- Dynamic route pages export both getStaticProps and getStaticPaths
- Pages import and utilize next/link for navigation between static pages

## Enforcement

- Verified by: Code review process checking for getStaticProps/getStaticPaths exports in new pages
- Verified by: Automated linting rules detecting missing static generation exports in pages/ directory
- Verified by: Build-time verification that pages export required Next.js data fetching functions
- Violation handling: Pull requests missing getStaticProps for content pages are flagged in code review
- Violation handling: Build warnings generated for pages/ files without appropriate data fetching exports
- Violation handling: Architecture review required for pages proposing alternative rendering strategies
- Exception process: Document rationale for alternative rendering strategy in page-level comments
- Exception process: Obtain approval from tech lead for SSR or CSR approaches on content pages
- Exception process: Record exception in architecture decision log with justification and scope