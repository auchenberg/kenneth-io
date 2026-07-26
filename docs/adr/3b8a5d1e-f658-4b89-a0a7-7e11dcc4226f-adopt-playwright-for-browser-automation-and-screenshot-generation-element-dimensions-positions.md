# Adopt Playwright for Browser Automation and Screenshot Generation: Element Dimensions Positions

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Context

- The codebase requires automated browser interaction capabilities for generating post screenshots, as evidenced by scripts/screenshot-post.mjs
- DOM manipulation and element measurement operations are performed programmatically through page.evaluate() calls to prepare content for capture
- The screenshot generation workflow involves runtime DOM modifications including hiding navigation elements and normalizing background colors
- Browser automation is implemented as a utility script rather than integrated into the main application runtime, indicating tooling and asset generation use cases

## Problem Statement

The system needs a reliable, programmatic method to launch browsers, navigate to content, manipulate the DOM, measure elements, and capture screenshots for post previews and social media assets without manual intervention.

## Decision

1. SHOULD: Element dimensions and positions SHOULD be calculated using getBoundingClientRect() within the browser context

## Policy Block

- SHOULD Element dimensions and positions SHOULD be calculated using getBoundingClientRect() within the browser context

In scope:
- Browser automation for screenshot generation
- DOM manipulation for visual content preparation
- Programmatic element measurement and positioning
- Command-line utility scripts for asset generation

Out of scope:
- End-to-end testing of application functionality
- Integration testing of API endpoints
- Unit testing of business logic
- Manual browser testing workflows
- Production runtime browser automation

## Rationale

- Playwright provides cross-browser automation capabilities with a modern async API suitable for Node.js scripting environments
- The detected pattern shows active usage in scripts/screenshot-post.mjs with 91.70% confidence, indicating established adoption
- DOM manipulation through page.evaluate() enables precise control over visual presentation before capture
- Command-line script architecture separates asset generation concerns from application runtime

## Consequences

Positive:
- Automated screenshot generation eliminates manual capture workflows and ensures consistency
- Playwright's modern API provides reliable element selection, measurement, and interaction capabilities
- DOM manipulation before capture enables clean, presentation-ready screenshots without post-processing
- Script-based approach allows integration into build pipelines and CI/CD workflows

Negative:
- Playwright adds a heavyweight dependency with browser binaries that increase repository and deployment size
- Browser automation scripts are brittle and may break with DOM structure changes
- Headless browser execution requires sufficient system resources and may be slow for large-scale generation
- Maintenance burden increases when Playwright API changes or browser compatibility issues arise

## Alternatives

- Use Puppeteer for browser automation instead of Playwright (rejected)
  Rejected because: Playwright offers better cross-browser support and more modern API design, though Puppeteer has similar capabilities for Chromium-only scenarios
  When valid: When only Chromium support is required and team has existing Puppeteer expertise
- Use server-side rendering with headless Chrome via chrome-aws-lambda (rejected)
  Rejected because: More complex deployment model and less flexible DOM manipulation compared to Playwright's full automation API
  When valid: When deploying to AWS Lambda or other serverless environments with size constraints
- Manual screenshot capture and asset management (rejected)
  Rejected because: Manual workflows are error-prone, inconsistent, and do not scale with content volume
  When valid: For one-off or very infrequent screenshot needs where automation overhead is not justified

## Risks

- DOM structure changes in the application break screenshot scripts without detection
  Mitigation: Implement verification checks that validate expected DOM elements exist before capture; add screenshot generation to CI pipeline
  Owner: engineering team
- Playwright version updates introduce breaking API changes or browser compatibility issues
  Mitigation: Pin Playwright version in package.json; test screenshot generation after dependency updates; maintain changelog of Playwright-specific changes
  Owner: engineering team
- Resource-intensive browser automation causes performance issues in CI/CD pipelines
  Mitigation: Run screenshot generation as separate optional job; implement caching for unchanged content; consider parallel execution limits
  Owner: engineering team

## Implementation Notes

- Install Playwright via npm and run npx playwright install to download browser binaries
- Structure screenshot scripts to accept command-line arguments with clear usage messages and examples
- Use page.evaluate() for all DOM manipulation to ensure code executes in the browser context with access to document and window objects
- Calculate element bounds using getBoundingClientRect() and account for scroll position when determining clip regions
- Set explicit viewport sizes and wait for network idle or specific selectors before capturing to ensure consistent results

## Continuation Context


Verify commands:
- grep -r "playwright" package.json
- grep -r "page.evaluate" scripts/
- test -f scripts/screenshot-post.mjs && echo 'Screenshot script exists'

Accept when:
- package.json contains playwright as a dependency
- Screenshot scripts use page.evaluate() for DOM manipulation
- scripts/screenshot-post.mjs exists and accepts post-slug as command-line argument

## Enforcement

- Verified by: Code review of new screenshot scripts
- Verified by: Dependency audit in package.json
- Verified by: Automated grep checks in CI pipeline for Playwright usage patterns
- Violation handling: Pull requests introducing alternative browser automation libraries require architectural review
- Violation handling: Screenshot scripts not using Playwright must document justification in ADR amendment
- Violation handling: CI checks fail if screenshot scripts exist without Playwright dependency
- Exception process: Document specific use case requiring alternative approach
- Exception process: Obtain approval from technical lead with rationale for exception
- Exception process: Record exception in ADR amendments section with expiration date for review