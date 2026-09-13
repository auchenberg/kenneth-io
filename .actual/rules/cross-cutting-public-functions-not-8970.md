# Standardize Public API Contract Exports with Input Validation: Public Functions Not

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-PUB-001** MUST NOT: Public API functions MUST NOT pass unsanitized JSON.parse output directly to downstream consumers without validation.
- **R-PUB-002** MUST: Wrap all JSON.parse calls in public API contracts with try-catch blocks and return meaningful error messages that do not expose internal implementation details.
- **R-PUB-003** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation using schema validation libraries (joi, ajv, zod).
- **R-PUB-004** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-PUB-005** SHOULD: Document expected input schemas in JSDoc comments or separate schema files for each public API contract.

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
- No unvalidated JSON.parse calls exist in helper module public API exports

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All JSON.parse operations in public API contracts must be validated before merge.
</enforcement>