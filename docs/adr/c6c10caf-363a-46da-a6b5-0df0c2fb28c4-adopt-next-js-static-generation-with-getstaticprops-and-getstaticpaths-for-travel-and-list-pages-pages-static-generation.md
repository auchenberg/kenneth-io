# Adopt Next.js Static Generation with getStaticProps and getStaticPaths for Travel and List Pages: Pages Static Generation

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The application uses React with Next.js framework for rendering travel guide pages and bucket list content
- Travel guide pages follow a dynamic route pattern ([city].js) requiring pre-rendering of multiple city-specific pages at build time
- Content is sourced from helper modules (getTravelGuides, getBucketList) and processed with markdown-it for rendering
- Static generation enables pre-built HTML pages that can be served with minimal latency and optimal SEO characteristics
- The paradigm.concurrency_model facet reflects the use of async data fetching functions (getStaticProps, getStaticPaths) that execute at build time rather than request time

## Problem Statement

Travel guide and list pages require efficient rendering with good SEO performance while sourcing content from helper functions and markdown processing. The system must determine when to generate pages (build time vs request time) and how to handle dynamic routes with multiple city variations while maintaining performance and developer experience.

## Decision

1. MUST: Pages using static generation MUST import React and utilize Layout components from the components directory

## Policy Block

- MUST Pages using static generation MUST import React and utilize Layout components from the components directory

In scope:
- All pages under pages/travel/ directory with dynamic routing
- List pages (pages/lists.js) displaying bucket list content
- Content sourced from helpers/getTravelGuides and helpers/getBucketList
- React components using Layout wrapper from components/layout

Out of scope:
- Pages requiring real-time data or user-specific content
- API routes under pages/api/
- Client-side only rendering without SEO requirements
- Pages with frequently changing content that cannot be rebuilt

## Rationale

- Static generation with getStaticProps and getStaticPaths provides optimal performance for content-heavy travel guides that do not change per request
- Build-time rendering enables pre-computation of markdown processing, reducing client-side JavaScript execution and improving Time to Interactive metrics
- The pattern is evidenced by consistent use of getStaticProps in both pages/lists.js and pages/travel/[city].js, with getStaticPaths handling dynamic city routes
- Helper function organization (getTravelGuides, getBucketList) separates data fetching logic from presentation, enabling testability and reuse across multiple pages

## Consequences

Positive:
- Pre-rendered HTML pages provide excellent SEO characteristics and fast initial page loads
- Build-time markdown processing reduces client-side JavaScript bundle size and execution time
- Static pages can be served from CDN edge locations with minimal latency
- Clear separation between data fetching (helpers) and presentation (React components) improves maintainability

Negative:
- Content updates require full application rebuild and redeployment to reflect changes
- Build time increases proportionally with the number of cities and pages generated via getStaticPaths
- Dynamic or user-specific content cannot be rendered using this approach without hybrid strategies
- Debugging build-time errors in getStaticProps can be more complex than runtime errors

## Alternatives

- Server-Side Rendering (SSR) with getServerSideProps (rejected)
  Rejected because: Travel guide content is relatively static and does not require per-request rendering; SSR would increase server load and response latency without providing meaningful benefits for this use case
  When valid: Valid for pages requiring real-time data, user authentication state, or request-specific content that cannot be pre-rendered
- Client-Side Rendering (CSR) with useEffect data fetching (rejected)
  Rejected because: CSR would degrade SEO performance as content would not be available in initial HTML; travel guides benefit significantly from search engine indexing
  When valid: Valid for authenticated dashboards, user-specific interfaces, or interactive applications where SEO is not a priority
- Incremental Static Regeneration (ISR) with revalidate option (deferred)
  Rejected because: Not observed in current evidence; may be considered if content update frequency increases while maintaining static generation benefits
  When valid: Valid when content updates periodically but full rebuilds are impractical; enables stale-while-revalidate pattern

## Risks

- Build time may become prohibitively long as the number of cities and travel guides scales beyond hundreds of pages
  Mitigation: Monitor build duration metrics; consider implementing Incremental Static Regeneration (ISR) or selective page generation strategies if build times exceed acceptable thresholds
  Owner: engineering team
- Content staleness between deployments may frustrate content editors expecting immediate updates
  Mitigation: Establish clear content update workflows with scheduled rebuild triggers; document expected update latency for content team; consider webhook-triggered rebuilds for critical updates
  Owner: engineering team and content team
- getStaticPaths may fail to generate paths for new cities if helper functions do not return complete data
  Mitigation: Implement comprehensive testing for getTravelGuides to ensure all cities are returned; add build-time validation to detect missing paths; use fallback: 'blocking' for graceful handling of new paths
  Owner: engineering team

## Implementation Notes

- Ensure getStaticPaths returns all valid city slugs with paths array containing objects with params.city property
- Process markdown content within getStaticProps using markdown-it to return pre-rendered HTML as props
- Import helper functions (getTravelGuides, getBucketList) at the top of page files and invoke within getStaticProps async function
- Wrap page components with Layout component imported from components/layout for consistent UI structure
- Use next/link for navigation between statically generated pages to enable client-side transitions without full page reloads

## Continuation Context


Verify commands:
- grep -r "export.*getStaticProps" pages/travel/ pages/lists.js
- grep -r "export.*getStaticPaths" pages/travel/
- grep -r "from.*helpers/getTravelGuides\|from.*helpers/getBucketList" pages/
- grep -r "from.*markdown-it" pages/travel/

Accept when:
- All travel guide pages under pages/travel/ export both getStaticProps and getStaticPaths functions
- List pages export getStaticProps and import from helpers/getBucketList
- Travel guide pages import markdown-it for content processing within getStaticProps
- All pages using static generation import React and Layout components

## Enforcement

- Verified by: Code review checklist verifying presence of getStaticProps and getStaticPaths in new page files
- Verified by: Automated linting rules detecting missing static generation exports in pages directory
- Verified by: Build-time validation ensuring all dynamic routes implement required Next.js data fetching functions
- Violation handling: CI pipeline fails if pages directory contains files without required getStaticProps exports
- Violation handling: Code review blocks merge if new travel guide pages lack getStaticPaths implementation
- Violation handling: Build process logs warnings for pages missing recommended helper function imports
- Exception process: Document exception rationale in ADR amendment or page-level comment explaining why alternative rendering method is required
- Exception process: Obtain approval from tech lead for pages requiring SSR or CSR instead of static generation
- Exception process: Add exception to linting configuration with inline comment justification