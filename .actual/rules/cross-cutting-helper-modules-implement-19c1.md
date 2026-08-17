# Standardize Public API Contract Exports with Input Validation: Helper Modules Implement

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-API-001** MAY: Helper modules MAY implement input size limits to prevent denial-of-service through oversized payloads.
- **R-API-002** MUST: All JSON.parse calls in public API contracts MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-API-003** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation.
- **R-API-004** SHOULD: Helper modules SHOULD use schema validation libraries (joi, ajv, zod) to define expected data structures and validate parsed JSON against schemas.
- **R-API-005** SHOULD: Parsed objects SHOULD be protected with Object.freeze() or similar mechanisms to prevent prototype pollution after validation.
- **R-API-006** SHOULD: Expected input schemas SHOULD be documented in JSDoc comments or separate schema files for each public API contract.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API exports that parse JSON without validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- No unvalidated JSON.parse calls exist in the helpers/ directory
- ESLint verification passes without violations

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts MUST be validated before merge. Security team review is required for any exceptions to these rules.
</enforcement>