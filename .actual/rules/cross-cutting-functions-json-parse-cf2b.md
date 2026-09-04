# Standardize Public API Contract Exports with Input Validation: Functions Json Parse

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that use JSON.parse on file system contents, HTTP request bodies, or external data sources.

### Rules

- **R-JSONPARSE-001** MUST: Functions using JSON.parse on file contents or external data MUST implement try-catch error handling to prevent unhandled exceptions.
- **R-JSONPARSE-002** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation.
- **R-JSONPARSE-003** MUST: Wrap JSON.parse calls in try-catch blocks and return meaningful error messages that do not expose internal implementation details.
- **R-JSONPARSE-004** SHOULD: Use schema validation libraries (joi, ajv, zod) to define expected data structures and validate parsed JSON against schemas.
- **R-JSONPARSE-005** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-JSONPARSE-006** SHOULD: Document expected input schemas in JSDoc comments or separate schema files for each public API contract.

### Verify

```bash
# Check for JSON.parse calls without try-catch in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Check for public API exports that use JSON.parse without validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- Error handling returns meaningful messages without exposing internal implementation details
- Validation schemas are documented in JSDoc or separate schema files

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts must be validated before merge.
</enforcement>