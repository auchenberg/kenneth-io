# Adopt Next.js with React as Standard SSR/SSG Framework: Static Page Generation

Status: proposed
Date: 2024-01-20
Deciders: Detection Pipeline (automated)

## Context

- The codebase contains multiple page components utilizing Next.js framework primitives including API routes, static generation functions, and OG image generation
- Three distinct files demonstrate consistent use of Next.js data fetching patterns (getStaticProps, getStaticPaths) and API route handlers with Edge runtime capabilities
- React is imported as the primary UI library across page components, working in conjunction with Next.js rendering models
- The application requires both static site generation for content pages (travel guides, lists) and dynamic API endpoints (OG image generation)
- Helper modules and component imports follow Next.js conventional file structure patterns

## Problem Statement

The application needs a unified approach to server-side rendering, static site generation, and API route handling that supports both build-time data fetching and runtime edge functions while maintaining consistent patterns across page components and API endpoints.

## Decision

1. MUST: Static page generation MUST use getStaticProps and getStaticPaths functions where dynamic routes require build-time data fetching

## Policy Block

- MUST Static page generation MUST use getStaticProps and getStaticPaths functions where dynamic routes require build-time data fetching

In scope:
- All page components in the pages/ directory
- All API routes in the pages/api/ directory
- Static site generation workflows using getStaticProps and getStaticPaths
- Dynamic route handlers requiring build-time or runtime data fetching
- OG image generation endpoints

Out of scope:
- Third-party integrations that do not participate in Next.js rendering lifecycle
- Standalone utility functions without UI rendering requirements
- Build scripts and tooling configuration
- Test files and fixtures

## Rationale

- The evidence shows consistent adoption of Next.js framework primitives across 3 files with 86.10% confidence, indicating an established architectural pattern
- Next.js provides unified solutions for SSR, SSG, and API routes, reducing the need for separate backend infrastructure while maintaining performance through static generation
- The combination of React and Next.js enables component reusability while supporting multiple rendering strategies (static, server-side, edge) based on page requirements
- Helper module separation (getTravelGuides, getBucketList) demonstrates a clean architecture where data fetching logic is decoupled from presentation components

## Consequences

Positive:
- Unified framework reduces architectural complexity by handling routing, rendering, and API endpoints in a single system
- Static generation with getStaticProps enables fast page loads and reduced server costs for content-heavy pages
- Edge runtime support for API routes provides low-latency dynamic content generation
- File-based routing convention reduces boilerplate and improves developer experience

Negative:
- Framework lock-in to Next.js makes migration to alternative SSR solutions more costly
- Build-time static generation requires rebuilds for content updates unless using incremental static regeneration
- Edge runtime has limitations on available Node.js APIs and package compatibility
- Learning curve for developers unfamiliar with Next.js data fetching patterns and rendering lifecycle

## Alternatives

- Use Create React App with separate Express.js backend for API routes (rejected)
  Rejected because: Requires maintaining separate frontend and backend codebases, increases deployment complexity, and loses built-in SSG/SSR capabilities that Next.js provides
  When valid: When the application requires complete separation of concerns between frontend and backend, or when backend logic is too complex for Next.js API routes
- Use Gatsby for static site generation with separate serverless functions (rejected)
  Rejected because: Gatsby is optimized primarily for static sites and would require additional infrastructure for dynamic API routes and edge functions
  When valid: When the application is purely content-focused with minimal dynamic functionality and no need for server-side rendering
- Use Remix for full-stack React framework with nested routing (rejected)
  Rejected because: Evidence shows established Next.js patterns already in use; migration would require significant refactoring without clear architectural benefits
  When valid: For new projects requiring advanced nested routing, progressive enhancement, or when optimizing for slower network conditions

## Risks

- Next.js version upgrades may introduce breaking changes to data fetching APIs or rendering behavior
  Mitigation: Pin Next.js version in package.json, maintain comprehensive integration tests for page rendering and API routes, review migration guides before upgrading major versions
  Owner: engineering team
- Edge runtime limitations may prevent use of certain npm packages or Node.js APIs in API routes
  Mitigation: Document edge runtime compatibility requirements, test API routes thoroughly, maintain fallback to Node.js runtime for routes requiring full Node.js API access
  Owner: engineering team
- Static generation build times may increase significantly as content volume grows
  Mitigation: Implement incremental static regeneration for frequently updated content, monitor build performance metrics, consider on-demand ISR for large content sets
  Owner: engineering team

## Implementation Notes

- Place all page components in the pages/ directory following Next.js file-based routing conventions
- Extract data fetching logic into separate helper modules (e.g., helpers/getTravelGuides.js) to maintain separation of concerns
- Use getStaticProps for pages requiring build-time data fetching and getStaticPaths for dynamic routes that need static generation
- Specify runtime='edge' in API route config when low-latency or global distribution is required
- Import Layout components consistently across pages to maintain UI consistency
- Use next/link for internal navigation to enable client-side transitions

## Continuation Context


Verify commands:
- grep -r "from 'next" pages/ | grep -E "(getStaticProps|getStaticPaths|next/link|next/og)" | wc -l
- grep -r "from 'react'" pages/ | wc -l
- find pages/api -name '*.js' -o -name '*.ts' | wc -l
- grep -r "export.*getStaticProps\|export.*getStaticPaths" pages/ | wc -l

Accept when:
- All page components in pages/ directory import and use Next.js framework primitives (getStaticProps, getStaticPaths, or API route handlers)
- React is imported in all page components that render UI
- At least one API route exists in pages/api/ directory
- Data fetching patterns use Next.js conventions rather than client-side useEffect patterns

## Enforcement

- Verified by: Code review checks for Next.js pattern compliance in new page components
- Verified by: Automated linting rules to detect non-Next.js routing or data fetching patterns
- Verified by: CI pipeline verification commands checking for Next.js imports and conventions
- Violation handling: Pull requests introducing non-Next.js page patterns are flagged during code review
- Violation handling: CI build fails if verify commands detect missing Next.js conventions in pages/ directory
- Violation handling: Architecture review required for any proposal to introduce alternative rendering frameworks
- Exception process: Document technical justification for alternative approach in ADR or RFC
- Exception process: Obtain approval from tech lead or architecture review board
- Exception process: Add exception documentation to codebase with rationale and scope limitations