# Standardize Public API Contract Exports with Input Validation: Public Contracts Sanitize

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-PCS-001** MUST: Wrap all JSON.parse calls in public API contracts with try-catch blocks and return meaningful error messages that do not expose internal implementation details.
- **R-PCS-002** MUST: Sanitize or reject inputs containing `__proto__`, `constructor`, or `prototype` properties to prevent prototype pollution attacks.
- **R-PCS-003** SHOULD: Define and document expected input schemas for each public API contract using schema validation libraries (joi, ajv, zod) or JSDoc comments.
- **R-PCS-004** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-PCS-005** SHOULD: Create a validation utility module that provides consistent validation patterns across all helper modules.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API contracts without validation documentation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- No inputs containing `__proto__`, `constructor`, or `prototype` properties are accepted without explicit sanitization or rejection
- Parsed objects are protected with Object.freeze() or equivalent mechanisms

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts MUST be validated before merge. Security team MUST review validation schemas for prototype pollution vectors. ESLint violations MUST block CI pipeline.
</enforcement>