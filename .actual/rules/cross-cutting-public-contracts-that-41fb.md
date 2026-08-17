# Standardize Public API Contract Exports with Input Validation: Public Contracts That

These rules are ALWAYS ACTIVE for all public API contracts in helper modules that parse JSON from external sources, file system contents, HTTP request bodies, or other untrusted data sources.

### Rules

- **R-PUB-001** MUST: All public API contracts that parse JSON from external sources MUST validate input structure and content before processing.
- **R-PUB-002** MUST: Wrap all JSON.parse calls in try-catch blocks with appropriate error handling that does not expose internal implementation details.
- **R-PUB-003** MUST: Each public API contract that parses JSON MUST have documented input schema and validation implementation.
- **R-PUB-004** MUST: Use schema validation libraries (joi, ajv, zod) to define expected data structures and validate parsed JSON against schemas.
- **R-PUB-005** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-PUB-006** SHOULD: Document expected input schemas in JSDoc comments or separate schema files for each public API contract.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API contracts without validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- No unvalidated JSON.parse calls exist in public API contract boundaries
- Validation schemas are documented and synchronized with data structures

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts MUST be validated before merging. Security team review is required for any exceptions to this rule.
</enforcement>