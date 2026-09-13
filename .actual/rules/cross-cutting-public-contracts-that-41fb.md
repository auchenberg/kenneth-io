# Standardize Public API Contract Exports with Input Validation: Public Contracts That

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that parse JSON from external sources, including file system contents, HTTP request bodies, and structured data formats like gray-matter frontmatter.

### Rules

- **R-PUB-001** MUST: All public API contracts that parse JSON from external sources MUST validate input structure and content before processing.
- **R-PUB-002** MUST: Wrap all JSON.parse calls in public API contracts with try-catch blocks and return meaningful error messages that do not expose internal implementation details.
- **R-PUB-003** MUST: Define and document expected input schemas for each public API contract that parses JSON, using schema validation libraries (joi, ajv, zod) or JSDoc comments.
- **R-PUB-004** MUST: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-PUB-005** SHOULD: Implement a validation utility module that provides consistent validation patterns across all helper modules.
- **R-PUB-006** SHOULD: Establish payload size limits and use streaming validation for large inputs to prevent performance degradation.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API contracts with JSON.parse but missing validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- Object.freeze() or equivalent prototype pollution protections are applied to parsed objects
- Error messages from JSON.parse failures do not expose internal implementation details

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for code review and CI pipeline enforcement. Violations block merge requests and trigger security team remediation tickets.
</enforcement>