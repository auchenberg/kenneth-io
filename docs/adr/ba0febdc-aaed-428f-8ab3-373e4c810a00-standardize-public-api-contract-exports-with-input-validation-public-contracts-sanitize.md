# Standardize Public API Contract Exports with Input Validation: Public Contracts Sanitize

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The codebase uses Node.js modules with CommonJS require statements to compose functionality from gray-matter, lodash, path, and fs libraries
- A public API contract named getProjects is exported from helpers/getProjects.js, establishing a programmatic interface boundary
- File system operations combined with JSON.parse(contents) indicate processing of external or file-based data sources
- The pattern emerges in a helper module context where data transformation and validation occur before exposure through public contracts
- Security-sensitive operations involving parsing untrusted input require explicit validation patterns to prevent injection and malformed data attacks

## Problem Statement

Public API contracts that process external data through JSON.parse without comprehensive input validation create security vulnerabilities including JSON injection, prototype pollution, and denial-of-service attacks through malformed payloads. The getProjects function processes file contents through JSON.parse, establishing a trust boundary that requires explicit validation to ensure data integrity and prevent exploitation.

## Decision

1. SHOULD: Public API contracts SHOULD sanitize or reject inputs containing __proto__, constructor, or prototype properties to prevent prototype pollution

## Policy Block

- SHOULD Public API contracts SHOULD sanitize or reject inputs containing __proto__, constructor, or prototype properties to prevent prototype pollution

In scope:
- All helper modules exporting public API contracts (e.g., helpers/getProjects.js)
- Functions that use JSON.parse on file system contents, HTTP request bodies, or external data sources
- API boundaries that process gray-matter frontmatter or other structured data formats
- CommonJS modules using require for core libraries (fs, path) combined with data parsing operations

Out of scope:
- Internal utility functions not exposed as public API contracts
- JSON parsing of trusted, internally-generated configuration files with static schemas
- Test fixtures and mock data parsing in test suites
- JSON.stringify operations (output serialization)

Exceptions:
- EXC-001: Parsing configuration files from trusted sources with static schemas that are validated at application startup

## Rationale

- The IR evidence shows JSON.parse(contents) in a public API contract context, indicating a trust boundary where external data enters the system
- Combining file system operations (fs) with JSON parsing creates attack vectors if file contents are user-controlled or sourced from untrusted locations
- The use of gray-matter and lodash suggests data transformation pipelines where validation at entry points prevents cascading security issues
- Secure coding practices require defense-in-depth: validating at API boundaries prevents vulnerabilities from propagating through the application

## Consequences

Positive:
- Prevents JSON injection, prototype pollution, and malformed data attacks at API boundaries
- Establishes clear contract expectations through documented schemas and validation requirements
- Reduces debugging time by failing fast with validation errors rather than propagating invalid data
- Improves system reliability by handling parse errors gracefully rather than crashing on malformed input

Negative:
- Adds implementation overhead for schema definition and validation logic in each public API contract
- May introduce performance overhead for validation operations on large payloads
- Requires ongoing maintenance to keep validation schemas synchronized with evolving data structures
- Could reject legitimate edge-case inputs if validation rules are overly restrictive

## Alternatives

- Implement validation only at application entry points (HTTP handlers, CLI parsers) rather than at helper module boundaries (rejected)
  Rejected because: Helper modules like getProjects may be called from multiple contexts, and relying on upstream validation creates fragile security assumptions that break when new call paths are added
  When valid: Valid only for private internal functions with single, controlled call sites where upstream validation is guaranteed
- Use JSON5 or other lenient parsers that handle malformed input more gracefully (rejected)
  Rejected because: Lenient parsers increase attack surface by accepting non-standard syntax and do not address validation of parsed data structure and content
  When valid: Valid for developer-facing configuration files where human-friendly syntax is prioritized over strict security
- Implement centralized validation middleware that intercepts all JSON parsing operations (deferred)
  Rejected because: Requires architectural refactoring to introduce middleware layer and may not be feasible for existing CommonJS module structure
  When valid: Valid for greenfield projects or during major architectural refactoring where centralized validation infrastructure can be established

## Risks

- Incomplete validation coverage if developers add new JSON.parse calls without implementing required validation
  Mitigation: Implement static analysis rules (ESLint custom rules) to detect JSON.parse usage and enforce validation patterns; include in code review checklist
  Owner: Engineering team with security team oversight
- Performance degradation on large payloads if validation is implemented inefficiently
  Mitigation: Establish payload size limits; use streaming validation for large inputs; benchmark validation performance in CI pipeline
  Owner: Engineering team
- False sense of security if validation schemas are incomplete or fail to check for prototype pollution vectors
  Mitigation: Use established validation libraries with built-in prototype pollution protection; conduct security review of validation schemas; include prototype pollution test cases
  Owner: Security team

## Implementation Notes

- Wrap JSON.parse calls in try-catch blocks and return meaningful error messages that do not expose internal implementation details
- Use schema validation libraries (joi, ajv, zod) to define expected data structures and validate parsed JSON against schemas
- Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation
- Document expected input schemas in JSDoc comments or separate schema files for each public API contract
- Consider implementing a validation utility module that provides consistent validation patterns across all helper modules

## Continuation Context


Verify commands:
- grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'
- grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'
- eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js

Accept when:
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules

## Enforcement

- Verified by: ESLint custom rules detecting JSON.parse without validation in public API contracts
- Verified by: Code review checklist requiring validation documentation for new helper module exports
- Verified by: Security-focused unit tests validating error handling for malformed JSON and prototype pollution attempts
- Violation handling: CI pipeline fails on ESLint violations for unvalidated JSON.parse in public API contracts
- Violation handling: Code review blocks merge requests that introduce new JSON parsing without validation
- Violation handling: Security team conducts quarterly audits of helper modules and files remediation tickets for violations
- Exception process: Developer submits exception request documenting the trusted data source and static schema
- Exception process: Security team reviews exception request and assesses risk based on data source trust level
- Exception process: Approved exceptions are documented in code comments with EXC-ID reference and expiration date
- Exception process: Exceptions are reviewed annually and must be re-approved or remediated