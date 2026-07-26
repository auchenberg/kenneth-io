# Define Service API Boundaries Using Query Parameter Extraction in Next.js Edge Runtime: Endpoints Extract Request

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The codebase implements serverless API endpoints using Next.js API routes with edge runtime capabilities
- API endpoints expose public contracts through HTTP GET methods with query parameter-based input extraction
- Service boundaries are defined through explicit parameter extraction patterns using searchParams.get() for request data access
- External dependencies are fetched at runtime including font resources from public directories
- The API layer implements dynamic image generation functionality requiring runtime parameter parsing and external resource coordination

## Problem Statement

API endpoints require clear service boundary definitions to separate request parsing, parameter extraction, and external resource coordination while maintaining explicit contracts for public-facing interfaces in serverless edge runtime environments.

## Decision

1. MUST: API endpoints MUST extract request parameters using searchParams.get() method for query parameter access

## Policy Block

- MUST API endpoints MUST extract request parameters using searchParams.get() method for query parameter access

In scope:
- Next.js API routes in pages/api directory
- Edge runtime serverless functions
- Public-facing HTTP GET endpoints
- Query parameter-based request interfaces
- Dynamic content generation endpoints requiring external resources

Out of scope:
- Internal service-to-service communication
- GraphQL or RPC-based API endpoints
- POST/PUT/DELETE request handlers with body parsing
- Static file serving without parameter extraction
- Client-side data fetching logic

Exceptions:
- EXC-001: API endpoint requires request body parsing instead of query parameters
- EXC-002: Legacy API routes using different parameter extraction libraries

## Rationale

- The evidence shows consistent use of searchParams.get() for parameter extraction in pages/api/og.js, establishing a clear pattern for service boundary definition
- Next.js edge runtime and next/og library usage indicates serverless architecture requiring explicit boundary contracts
- External resource fetching using fetch() with import.meta.url demonstrates separation of concerns between parameter extraction and resource coordination
- The pattern supports stateless serverless execution by making all inputs explicit through query parameters

## Consequences

Positive:
- Clear service boundaries with explicit parameter extraction improve API contract visibility and testability
- Standardized query parameter access pattern reduces cognitive load for developers working across multiple endpoints
- Edge runtime compatibility ensures low-latency response times for dynamic content generation
- Separation of parameter extraction from business logic enables easier validation and error handling

Negative:
- Query parameter-only interfaces limit request complexity and payload size compared to body-based approaches
- Multiple searchParams.get() calls may introduce verbosity in endpoints with many parameters
- Edge runtime constraints may limit available libraries and execution time for complex operations
- External resource fetching adds latency and potential failure points to request handling

## Alternatives

- Use request body parsing with POST methods for parameter extraction (rejected)
  Rejected because: Evidence shows GET-based query parameter pattern for dynamic image generation use case where URLs need to be shareable and cacheable
  When valid: When API requires complex nested data structures or large payloads exceeding URL length limits
- Use path parameters instead of query parameters for input extraction (rejected)
  Rejected because: Query parameters provide more flexibility for optional parameters and better match the observed searchParams.get() pattern
  When valid: When API has required resource identifiers that form part of the resource hierarchy
- Use middleware layer for centralized parameter extraction and validation (deferred)
  Rejected because: Not observed in current evidence but could complement existing pattern for cross-cutting concerns
  When valid: When multiple endpoints share common parameter validation or transformation logic

## Risks

- Missing or malformed query parameters may cause runtime errors if not validated at service boundary
  Mitigation: Implement parameter validation immediately after extraction with clear error responses
  Owner: engineering team
- External resource fetching failures may cascade to API endpoint failures without proper error handling
  Mitigation: Add timeout and retry logic for external fetches with fallback responses
  Owner: engineering team
- Edge runtime cold starts may impact latency for infrequently accessed endpoints
  Mitigation: Monitor P95/P99 latency metrics and consider warming strategies for critical endpoints
  Owner: platform team

## Implementation Notes

- Import searchParams from request URL object in Next.js API route handlers before parameter extraction
- Define expected query parameters as constants at the top of the handler for documentation and reuse
- Implement null/undefined checks immediately after searchParams.get() calls to handle missing parameters gracefully
- Use import.meta.url for constructing URLs to public resources to ensure correct path resolution in edge runtime
- Consider adding TypeScript types for expected query parameters to improve type safety at service boundaries

## Continuation Context


Verify commands:
- grep -r "searchParams\.get(" pages/api/ --include="*.js" --include="*.ts"
- grep -r "export.*runtime.*=.*['\"]edge['\"]" pages/api/ --include="*.js" --include="*.ts"
- grep -r "from ['\"]next/og['\"]" pages/api/ --include="*.js" --include="*.ts"

Accept when:
- All API routes in pages/api directory use searchParams.get() for query parameter extraction
- Edge runtime configuration is explicitly declared in API routes requiring serverless execution
- External resource fetches use import.meta.url-based URL construction for path resolution

## Enforcement

- Verified by: Code review checklist for new API route additions
- Verified by: Automated linting rules detecting parameter extraction patterns
- Verified by: Integration tests validating query parameter handling and error cases
- Violation handling: PR comments requesting alignment with searchParams.get() pattern
- Violation handling: Architecture review required for alternative parameter extraction approaches
- Violation handling: Refactoring tasks created for non-compliant endpoints during code review
- Exception process: Document exception rationale in ADR exception log with EXC-ID reference
- Exception process: Obtain technical lead approval for alternative patterns with justification
- Exception process: Add inline code comments explaining deviation from standard pattern
- Exception process: Schedule technical debt review for temporary exceptions within 2 sprint cycles