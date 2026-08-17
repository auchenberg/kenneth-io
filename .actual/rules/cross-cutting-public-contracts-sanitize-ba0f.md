# Standardize Public API Contract Exports with Input Validation: Public Contracts Sanitize

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-PCS-001** SHOULD: Public API contracts SHOULD sanitize or reject inputs containing `__proto__`, `constructor`, or `prototype` properties to prevent prototype pollution.
- **R-PCS-002** MUST: All JSON.parse calls in public API contracts MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-PCS-003** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation.
- **R-PCS-004** SHOULD: Public API contracts SHOULD use established schema validation libraries (joi, ajv, zod) to define and validate expected data structures.
- **R-PCS-005** SHOULD: Parsed objects in public API contracts SHOULD be protected with Object.freeze() or similar mechanisms to prevent prototype pollution after validation.
- **R-PCS-006** SHOULD: Error messages from JSON parsing failures SHOULD not expose internal implementation details.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API contracts without validation patterns
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- No unvalidated JSON.parse calls exist in public API contract boundaries
- Validation schemas are documented in JSDoc comments or separate schema files

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All JSON.parse operations in public API contracts must be validated before merge. Security team review is required for any exceptions to R-PCS-001 through R-PCS-006.
</enforcement>