# Standardize React-based Page Components with Static Data Helpers for Public API Contracts: Data Fetching Logic

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Context

- The codebase uses React as the primary UI library across multiple page components (pages/projects.js, pages/chat/priority.js, pages/travel/[city].js, pages/lists.js, pages/posts.js) for rendering public-facing content
- Data fetching is separated into dedicated helper modules (helpers/getProjects.js, helpers/getTravelGuides.js, helpers/getBucketList.js) that use Node.js filesystem operations (fs, path) and content parsing libraries (gray-matter, markdown-it) to read and transform static content
- Next.js static generation patterns (getStaticProps, getStaticPaths) are used consistently across pages to pre-render content at build time, establishing a clear boundary between data fetching and presentation
- Public API routes (pages/api/feed.xml.js, pages/api/og.js) expose server-side functionality with explicit runtime configurations and external client boundaries
- The pattern reflects a separation of concerns where page components consume data contracts provided by helper modules, with 10 files exhibiting this structure at 87.34% confidence

## Problem Statement

The codebase requires a consistent approach to structuring public-facing pages and API routes that balances static content delivery, data transformation, and component reusability while maintaining clear boundaries between data fetching logic and presentation concerns.

## Decision

1. MUST: Data fetching logic MUST be separated into dedicated helper modules under helpers/ directory that export named functions as public contracts

## Policy Block

- MUST Data fetching logic MUST be separated into dedicated helper modules under helpers/ directory that export named functions as public contracts

In scope:
- React-based page components in pages/ directory
- Data helper modules in helpers/ directory
- Next.js API routes in pages/api/ directory
- Static content files processed by helper modules
- Build-time data fetching via getStaticProps/getStaticPaths

Out of scope:
- Client-side data fetching patterns (useEffect, SWR, React Query)
- Server-side rendering (getServerSideProps) patterns
- Dynamic API routes with database connections
- Third-party CMS integrations
- Real-time data synchronization

## Rationale

- The pattern emerges from 10 files across the codebase showing consistent use of React for page components, dedicated helper modules for data fetching, and Next.js static generation APIs, indicating an established architectural convention
- Separating data fetching into helper modules (getProjects, getTravelGuides, getBucketList) creates reusable contracts that can be tested independently and consumed by multiple page components
- Using Next.js static generation (getStaticProps, getStaticPaths) aligns with the file-based content approach, enabling build-time optimization and eliminating runtime data fetching overhead for public content
- The evidence shows explicit use of gray-matter for frontmatter parsing and markdown-it for content transformation, establishing a standard toolchain for content processing

## Consequences

Positive:
- Clear separation of concerns between data fetching and presentation enables independent testing and maintenance of helper modules and page components
- Build-time static generation via getStaticProps reduces runtime overhead and improves page load performance for public content
- Standardized helper module contracts (getAllTravelGuides, getTravelGuideBySlug, getBucketList, getProjects) provide predictable interfaces for page components
- File-based content management with gray-matter allows content authors to work with markdown files without requiring database infrastructure

Negative:
- Static generation requires full rebuilds when content changes, introducing deployment latency for content updates
- File system operations in helper modules create tight coupling to the local filesystem, limiting deployment flexibility to environments with persistent storage
- Error handling via console.error provides limited observability compared to structured logging or monitoring systems
- The pattern does not address dynamic or user-specific content requirements, requiring alternative approaches for authenticated or personalized experiences

## Alternatives

- Use a headless CMS (Contentful, Sanity) with client-side data fetching (rejected)
  Rejected because: The evidence shows consistent use of file-based content with gray-matter and fs modules, indicating a preference for filesystem-based content management over external CMS dependencies
  When valid: When content requires collaborative editing workflows, versioning, or multi-channel publishing that exceeds filesystem capabilities
- Implement server-side rendering (getServerSideProps) for all pages (rejected)
  Rejected because: The evidence demonstrates widespread use of getStaticProps and getStaticPaths for build-time generation, suggesting content is largely static and does not require per-request rendering
  When valid: When pages require user-specific data, authentication state, or frequently changing content that cannot be pre-rendered
- Colocate data fetching logic within page components (rejected)
  Rejected because: The pattern shows deliberate separation with dedicated helper modules (helpers/getProjects.js, helpers/getTravelGuides.js), indicating a preference for reusable data contracts over component-local fetching
  When valid: When data fetching is truly page-specific and will never be reused by other components or API routes

## Risks

- Helper modules using synchronous fs operations may block the build process for large content collections
  Mitigation: Monitor build times and consider migrating to fs.promises for async operations if build performance degrades
  Owner: engineering team
- Lack of structured error handling in helper modules may cause silent failures during content processing
  Mitigation: Implement structured logging and consider throwing errors for critical failures rather than only logging to console
  Owner: engineering team
- Tight coupling to Next.js static generation APIs creates migration friction if framework changes are required
  Mitigation: Maintain clear separation between helper modules (framework-agnostic) and Next.js-specific page functions to isolate framework dependencies
  Owner: engineering team

## Implementation Notes

- Create new page components by importing React and the Layout component, then implement getStaticProps to call the appropriate helper module for data fetching
- Structure helper modules to export named functions (e.g., getAllTravelGuides, getTravelGuideBySlug) that return plain JavaScript objects or arrays, avoiding framework-specific types
- Use gray-matter to parse markdown files with frontmatter, extracting metadata into a data object and content into a separate field for markdown-it processing
- Implement error boundaries in helper modules using try-catch blocks with console.error logging, returning empty arrays or null values on failure to prevent build crashes
- For dynamic routes (e.g., pages/travel/[city].js), implement both getStaticPaths to generate route parameters and getStaticProps to fetch data for each route

## Continuation Context


Verify commands:
- grep -r "import.*react" pages/ | grep -v node_modules | wc -l
- find helpers/ -name '*.js' -exec grep -l "gray-matter\|require.*fs\|require.*path" {} \; | wc -l
- grep -r "getStaticProps\|getStaticPaths" pages/ | grep -v node_modules | wc -l

Accept when:
- At least 5 page components in pages/ directory import React and use it for rendering
- At least 3 helper modules in helpers/ directory use gray-matter and Node.js fs/path modules for content processing
- At least 5 page components implement getStaticProps or getStaticPaths for build-time data fetching

## Enforcement

- Verified by: Code review verification that new page components follow the React + helper module + getStaticProps pattern
- Verified by: Build-time validation that helper modules successfully export expected function contracts
- Verified by: Automated grep-based checks in CI pipeline to verify presence of required imports and function exports
- Violation handling: Pull requests that introduce page components without separated helper modules require architectural review and justification
- Violation handling: Build failures from missing or malformed helper module exports block deployment until resolved
- Violation handling: Pages that bypass getStaticProps without documented rationale are flagged in code review for refactoring
- Exception process: Exceptions for client-side data fetching patterns require documentation of why static generation is insufficient (e.g., user-specific data, real-time updates)
- Exception process: API routes with alternative patterns (streaming, webhooks) may bypass helper module requirements with architectural approval
- Exception process: Experimental pages in feature branches may defer pattern compliance until promotion to main branch