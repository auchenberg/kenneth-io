# Standardize Public API Contract Exports with Input Validation: Public Exports Helper

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-PUBEXP-001** MUST: Public API exports in helper modules MUST document expected input schemas and validation requirements.
- **R-PUBEXP-002** MUST: All JSON.parse calls in public API contracts MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-PUBEXP-003** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation.
- **R-PUBEXP-004** MUST: Validation MUST use established schema validation libraries (joi, ajv, zod) to define expected data structures.
- **R-PUBEXP-005** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-PUBEXP-006** SHOULD: Document expected input schemas in JSDoc comments or separate schema files for each public API contract.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public exports that parse JSON without validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- Validation schemas are documented in JSDoc or separate schema files
- Error messages from validation do not expose internal implementation details

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts must be validated before merge. Security team must review validation schemas for prototype pollution vectors.
</enforcement>