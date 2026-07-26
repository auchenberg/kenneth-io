# Adopt Static Generation with getStaticProps/getStaticPaths as Standard Rendering Strategy: Data Fetching Logic

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The codebase uses Next.js framework with React for building web applications, as evidenced by imports of 'react', 'next/link', 'next/og', and Next.js-specific API patterns
- Three distinct page implementations (pages/api/og.js, pages/travel/[city].js, pages/lists.js) export getStaticProps and getStaticPaths functions, indicating a consistent approach to data fetching and page generation
- The application serves both static content pages (lists, travel guides) and dynamic API routes (Open Graph image generation), requiring a unified concurrency model for handling build-time and runtime data fetching
- External data sources are accessed via fetch() calls and helper functions (getTravelGuides, getBucketList), necessitating a predictable execution model for data retrieval during page generation

## Problem Statement

The application requires a consistent concurrency model for coordinating data fetching, page generation, and API route handling across multiple page types. Without a standardized approach, developers may introduce inconsistent patterns for static generation, server-side rendering, or client-side fetching, leading to unpredictable performance characteristics, increased complexity in deployment pipelines, and difficulty reasoning about when and how data is fetched and rendered.

## Decision

1. SHOULD: Data fetching logic SHOULD be encapsulated in helper functions (e.g., getTravelGuides, getBucketList) rather than inline within getStaticProps

## Policy Block

- SHOULD Data fetching logic SHOULD be encapsulated in helper functions (e.g., getTravelGuides, getBucketList) rather than inline within getStaticProps

In scope:
- All page components in the pages/ directory that require data at render time
- Dynamic route pages using bracket notation (e.g., [city].js) that need static path generation
- API routes in pages/api/ that handle runtime requests
- Helper functions that encapsulate data fetching logic for use in getStaticProps

Out of scope:
- Client-side data fetching using useEffect or SWR hooks
- Server-side rendering patterns using getServerSideProps
- Middleware or edge functions
- Third-party library internal concurrency models

Exceptions:
- EXC-001: Real-time data requirements make static generation infeasible (e.g., user-specific dashboards, live feeds)
- EXC-002: API routes require server-side execution context not available at build time

## Rationale

- The evidence shows consistent use of getStaticProps and getStaticPaths across 3 files (pages/travel/[city].js, pages/lists.js) with 86.10% confidence, indicating an established pattern for static generation
- Static generation with getStaticProps provides predictable build-time data fetching, enabling faster page loads through pre-rendered HTML and reducing server load at runtime
- The pattern separates build-time concerns (getStaticProps, getStaticPaths) from runtime concerns (API routes with GET handlers), creating clear boundaries for when code executes
- Helper functions like getTravelGuides and getBucketList demonstrate a separation of data fetching logic from presentation, improving testability and reusability across the application

## Consequences

Positive:
- Improved performance through pre-rendered static pages that can be served from CDN without server computation
- Predictable build process where data fetching failures are caught at build time rather than runtime
- Clear separation between build-time static generation and runtime API execution, reducing cognitive load for developers
- Better scalability as static pages require no server resources per request

Negative:
- Build times increase proportionally with the number of static paths generated, potentially slowing CI/CD pipelines
- Data freshness is limited to build frequency unless incremental static regeneration is implemented
- Dynamic content requiring user-specific data cannot use this pattern without additional client-side fetching
- Debugging build-time errors in getStaticProps can be more complex than runtime errors due to limited context

## Alternatives

- Use getServerSideProps for server-side rendering on each request (rejected)
  Rejected because: Server-side rendering increases latency per request and server load, contradicting the observed pattern of static generation across multiple pages. Evidence shows no usage of getServerSideProps in the detected files.
  When valid: Valid for pages requiring real-time user-specific data that cannot be statically generated or cached
- Use client-side data fetching with useEffect or SWR hooks (rejected)
  Rejected because: Client-side fetching delays content availability until JavaScript executes, harming SEO and initial page load performance. The evidence shows server-side data fetching patterns, not client-side hooks.
  When valid: Valid for interactive features requiring user input or real-time updates after initial page load
- Hybrid approach with incremental static regeneration (ISR) (deferred)
  Rejected because: Not rejected; ISR extends static generation with revalidation. No evidence of revalidate property in getStaticProps, but this could be adopted to address data freshness concerns.
  When valid: Valid when data freshness requirements exceed build frequency but full server-side rendering is too costly

## Risks

- Build failures due to external data source unavailability during static generation will block deployments
  Mitigation: Implement retry logic in data fetching helpers, add fallback data sources, and monitor external API availability in CI/CD pipeline
  Owner: Engineering team
- Large number of dynamic paths in getStaticPaths may cause excessive build times or memory exhaustion
  Mitigation: Implement pagination or lazy static generation strategies, monitor build metrics, and consider fallback: 'blocking' for less critical paths
  Owner: Engineering team
- Stale data between builds may confuse users if content updates are not reflected promptly
  Mitigation: Implement incremental static regeneration with appropriate revalidation intervals, or trigger rebuilds via webhooks when content changes
  Owner: Product and engineering teams

## Implementation Notes

- Create helper functions in a dedicated helpers/ directory (following the pattern of getTravelGuides, getBucketList) to encapsulate data fetching logic and promote reuse
- For dynamic routes, ensure getStaticPaths returns all required paths with fallback strategy (false, true, or 'blocking') based on path coverage requirements
- Use TypeScript interfaces or PropTypes to document the shape of props returned from getStaticProps for type safety and developer experience
- Consider implementing error boundaries and fallback UI for cases where static generation succeeds but runtime rendering encounters issues

## Continuation Context


Verify commands:
- grep -r 'export.*getStaticProps' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'
- grep -r 'export.*getStaticPaths' pages/ --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx'
- npm run build 2>&1 | grep -E '(Static|SSG|prerendered)' || echo 'No static generation detected in build output'

Accept when:
- All page components requiring build-time data export getStaticProps functions that successfully return props
- Dynamic route pages export getStaticPaths with valid path arrays and appropriate fallback configuration
- Build process completes successfully with static page generation confirmed in build output logs

## Enforcement

- Verified by: Automated CI/CD pipeline checks for successful Next.js build with static generation
- Verified by: Code review verification that new pages follow getStaticProps/getStaticPaths patterns
- Verified by: ESLint rules or custom linting to detect missing data fetching exports on page components
- Violation handling: Build failures block deployment if getStaticProps functions fail during static generation
- Violation handling: Code review feedback requests pattern compliance before merge approval
- Violation handling: Architecture review required for pages that deviate from static generation pattern
- Exception process: Developer documents specific requirement that necessitates deviation from static generation
- Exception process: Tech lead reviews and approves exception with architectural justification
- Exception process: Exception is documented in code comments and tracked in architecture decision log