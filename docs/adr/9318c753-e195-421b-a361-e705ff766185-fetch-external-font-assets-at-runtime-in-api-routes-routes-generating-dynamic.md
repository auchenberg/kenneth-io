# Fetch External Font Assets at Runtime in API Routes: Routes Generating Dynamic

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The codebase uses next/og for dynamic Open Graph image generation in API routes, requiring font assets to be loaded at runtime
- Font files are stored in the public directory (/public/fonts/helvetica-bold.ttf) and must be fetched using import.meta.url resolution
- API routes operate in an edge runtime environment where filesystem access patterns differ from traditional Node.js environments
- The pattern uses fetch() with URL construction to load static assets, establishing a boundary between the API route and external resources

## Problem Statement

API routes generating dynamic images require access to font assets at runtime, but edge runtime environments restrict direct filesystem access, necessitating a fetch-based approach to load static resources from the public directory using URL resolution.

## Decision

1. MUST: API routes generating dynamic images MUST use fetch() to load font assets from the public directory

## Policy Block

- MUST API routes generating dynamic images MUST use fetch() to load font assets from the public directory

## Rationale

- The evidence shows pages/api/og.js uses fetch() with import.meta.url to load helvetica-bold.ttf, demonstrating a runtime asset loading pattern required by next/og in edge environments
- Edge runtime constraints prevent traditional filesystem access (fs module), making URL-based fetching the necessary approach for loading static assets
- The pattern establishes a clear boundary between API route logic and external resources, as evidenced by boundaries.external_clients=fetch() in the IR data
- Query parameter handling (searchParams.get('title')) indicates dynamic content generation requiring runtime flexibility

## Consequences

Positive:
- Enables dynamic Open Graph image generation in edge runtime environments without filesystem dependencies
- Provides consistent asset loading mechanism across different deployment targets (edge, serverless, Node.js)
- Allows API routes to remain stateless while accessing necessary font resources on-demand
- Supports flexible content customization through query parameters while maintaining resource access

Negative:
- Introduces network overhead for font asset loading on each request unless caching is implemented
- Increases complexity compared to direct filesystem access available in traditional Node.js environments
- Requires careful URL construction to avoid path resolution errors in different deployment contexts
- May impact cold start performance if font assets must be fetched on every function invocation

## Alternatives

- Use Node.js fs module to read font files directly from filesystem (rejected)
  Rejected because: Edge runtime environments do not support the fs module, making this approach incompatible with next/og's runtime requirements
  When valid: Valid only in traditional Node.js runtime environments, not edge or serverless contexts
- Embed font data as base64 strings directly in the API route code (rejected)
  Rejected because: Significantly increases bundle size and reduces maintainability; font updates require code changes and redeployment
  When valid: Valid for very small font subsets or when deployment constraints prevent external asset access
- Use CDN-hosted fonts with external URLs (deferred)
  Rejected because: Introduces external dependency and potential latency; may not be acceptable for all deployment scenarios
  When valid: Valid when external network access is reliable and font licensing permits CDN distribution

## Risks

- Font asset fetch failures could cause API route errors and failed image generation
  Mitigation: Implement error handling around fetch() calls with fallback fonts or graceful degradation; add monitoring for fetch failures
  Owner: engineering team
- Repeated font fetching on every request may impact performance and increase latency
  Mitigation: Implement in-memory caching of font buffers after initial fetch; consider edge caching strategies
  Owner: engineering team
- URL resolution with import.meta.url may behave differently across deployment platforms
  Mitigation: Test URL resolution in all target deployment environments; document platform-specific behaviors; use consistent public directory structure
  Owner: engineering team

## Implementation Notes

- Place font files in /public/fonts/ directory and reference them using new URL('/public/fonts/[filename]', import.meta.url)
- Wrap fetch() calls in try-catch blocks to handle network failures gracefully and provide fallback behavior
- Consider implementing a module-level cache variable to store fetched font buffers and avoid repeated fetches
- Test the API route in both development and production environments to verify URL resolution works correctly
- Document the runtime environment requirements (edge, Node.js) and any platform-specific configuration needed

## Continuation Context


Verify commands:
- grep -r "fetch(.*import\.meta\.url" pages/api/
- grep -r "new URL.*public/fonts" pages/api/
- test -f public/fonts/helvetica-bold.ttf && echo 'Font file exists' || echo 'Font file missing'

Accept when:
- API routes use fetch() with import.meta.url for loading font assets from /public/fonts/
- Font files are present in the public/fonts directory and accessible via URL-based fetching
- API routes handle query parameters via searchParams.get() for dynamic content generation

## Enforcement

- Verified by: Code review checking for proper fetch() usage with import.meta.url in API routes
- Verified by: Automated grep patterns in CI pipeline verifying font loading patterns
- Verified by: Runtime testing of Open Graph image generation endpoints in edge environments
- Violation handling: Code review feedback requesting correction to use fetch() instead of filesystem access
- Violation handling: CI pipeline warnings when font files are missing from public/fonts directory
- Violation handling: Runtime errors logged and monitored when font asset loading fails
- Exception process: Document alternative runtime environments that support different asset loading mechanisms
- Exception process: Obtain architecture team approval for deviations from fetch-based pattern
- Exception process: Update ADR with approved exceptions and their specific use cases