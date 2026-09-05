# Require Core Node.js Libraries for File System and Data Processing Operations: Public Functions Not

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Context

- The codebase processes file system operations and data transformations using Node.js core modules (fs, path) and established utility libraries (gray-matter, lodash)
- File contents are parsed as JSON after being read from the file system, requiring input validation to prevent injection attacks or malformed data processing
- The getProjects function serves as a public API contract, exposing file system operations to external consumers
- The pattern emerged from a need to standardize secure file handling and data parsing practices across the codebase

## Problem Statement

Without standardized secure coding practices for file system operations and data parsing, the codebase risks inconsistent input validation, potential security vulnerabilities from JSON parsing untrusted content, and unpredictable behavior when processing file-based data structures. The lack of explicit guidelines for using core libraries and validation patterns creates maintenance burden and security exposure.

## Decision

1. MUST_NOT: Public API functions MUST NOT expose raw file system errors to external consumers without sanitization

## Policy Block

- MUST_NOT Public API functions MUST NOT expose raw file system errors to external consumers without sanitization

In scope:
- All file system read/write operations in helper modules
- Public API functions that process file-based data (e.g., getProjects)
- JSON parsing operations on file contents
- Frontmatter and Markdown processing workflows

Out of scope:
- Database operations and queries
- Network I/O and HTTP request handling
- In-memory data structures that do not originate from file system
- Third-party library internal implementations

Exceptions:
- EXC-001: Performance-critical paths require synchronous file operations
- EXC-002: Legacy code modules scheduled for deprecation within 6 months

## Rationale

- The evidence shows consistent use of Node.js core modules (fs, path) and established libraries (gray-matter, lodash) in helpers/getProjects.js, indicating an existing pattern that should be formalized
- JSON.parse(contents) operations on file system data represent a security boundary where input validation is critical to prevent injection attacks and runtime errors
- Standardizing on well-maintained core libraries and utilities reduces the attack surface compared to custom implementations and ensures consistent security practices
- The getProjects function serves as a public API contract, making it a critical point for enforcing secure coding standards that protect downstream consumers

## Consequences

Positive:
- Consistent security posture across all file system operations with standardized validation patterns
- Reduced risk of directory traversal, injection attacks, and malformed data processing errors
- Improved maintainability through use of well-documented core libraries and established utility functions
- Clear API contracts for public functions that handle file-based data, improving reliability for consumers

Negative:
- Additional boilerplate code required for try-catch blocks and input validation around JSON parsing
- Potential performance overhead from validation checks in high-frequency file operations
- Learning curve for developers unfamiliar with gray-matter or lodash utility patterns
- Dependency on third-party libraries (gray-matter, lodash) introduces supply chain considerations

## Alternatives

- Use custom file parsing and validation logic without standardized libraries (rejected)
  Rejected because: Custom implementations increase security risk, maintenance burden, and inconsistency across the codebase. The evidence shows existing use of established libraries, indicating this approach was already avoided.
  When valid: Never recommended for security-critical file operations
- Adopt a comprehensive validation framework like Joi or Zod for all input validation (deferred)
  Rejected because: While more comprehensive, this represents a larger architectural change. Current evidence shows basic JSON.parse validation is the immediate need. Can be reconsidered as validation requirements grow.
  When valid: When complex schema validation requirements emerge beyond simple JSON parsing
- Implement a centralized file system abstraction layer with built-in validation (deferred)
  Rejected because: Adds architectural complexity and abstraction overhead. Current pattern shows direct use of core modules is sufficient. Consider if file operations become more complex or distributed.
  When valid: When file operations span multiple storage backends or require complex access control

## Risks

- Existing code may not follow these standards, creating inconsistent security posture across the codebase
  Mitigation: Conduct codebase audit to identify non-compliant file operations and create remediation plan with prioritization based on exposure
  Owner: Security team with engineering team support
- Third-party library vulnerabilities in gray-matter or lodash could introduce security issues
  Mitigation: Implement automated dependency scanning in CI/CD pipeline and establish process for timely security updates
  Owner: DevSecOps team
- Performance degradation from validation overhead in high-frequency file operations
  Mitigation: Profile critical paths and implement caching strategies or batch processing where validation overhead is measurable
  Owner: Engineering team

## Implementation Notes

- Create reusable wrapper functions for common patterns like safeJsonParse() and validateFilePath() to reduce boilerplate
- Add ESLint rules to detect bare JSON.parse() calls on file contents without try-catch blocks
- Document the approved libraries (fs, path, gray-matter, lodash) in developer guidelines with usage examples
- Implement integration tests that verify input validation behavior with malformed JSON and invalid file paths

## Continuation Context


Verify commands:
- grep -r 'JSON\.parse' --include='*.js' | grep -v 'try' | grep -v 'catch' # Should return no matches in file-reading code
- grep -r "require('fs')" --include='*.js' # Verify fs module usage
- grep -r "require('gray-matter')" --include='*.js' # Verify gray-matter usage for frontmatter
- npm audit --audit-level=moderate # Ensure no moderate+ vulnerabilities in dependencies

Accept when:
- All JSON.parse() operations on file contents are wrapped in try-catch blocks with appropriate error handling
- File system operations consistently use Node.js core 'fs' and 'path' modules
- Public API functions validate input paths and sanitize error messages before exposing to consumers
- No high or critical severity vulnerabilities exist in gray-matter or lodash dependencies

## Enforcement

- Verified by: ESLint rules detecting unsafe JSON.parse patterns without error handling
- Verified by: Code review checklist items for file system operations and input validation
- Verified by: Automated security scanning in CI/CD pipeline for dependency vulnerabilities
- Verified by: Integration tests validating error handling for malformed input
- Violation handling: CI/CD pipeline fails on ESLint violations related to unsafe JSON parsing
- Violation handling: Code review blocks merge until validation patterns are implemented
- Violation handling: Security team notified of dependency vulnerabilities for triage and remediation
- Violation handling: Quarterly security audits identify and prioritize remediation of non-compliant code
- Exception process: Developer submits exception request with performance benchmarks or technical justification
- Exception process: Security team reviews risk assessment and proposed mitigations
- Exception process: Tech lead approves with documented rationale and timeline for compliance or deprecation
- Exception process: Exception logged in security register with review date for re-evaluation