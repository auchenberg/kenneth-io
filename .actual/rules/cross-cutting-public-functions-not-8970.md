# Standardize Public API Contract Exports with Input Validation: Public Functions Not

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-API-001** MUST NOT: Public API functions MUST NOT pass unsanitized JSON.parse output directly to downstream consumers without validation.
- **R-API-002** MUST: Wrap all JSON.parse calls in public API contracts with try-catch blocks and return meaningful error messages that do not expose internal implementation details.
- **R-API-003** MUST: Define and document expected input schemas for each public API contract that parses JSON using schema validation libraries (joi, ajv, zod) or JSDoc comments.
- **R-API-004** MUST: Validate parsed JSON against documented schemas before returning data from public API contracts.
- **R-API-005** SHOULD: Implement Object.freeze() or similar protections on parsed objects to prevent prototype pollution after validation.
- **R-API-006** SHOULD: Create a validation utility module that provides consistent validation patterns across all helper modules.

### Verify

```bash
# Check for unvalidated JSON.parse calls in helper modules
grep -r 'JSON\.parse' --include='*.js' helpers/ | grep -v 'try\|catch' | wc -l | grep -q '^0$'

# Identify public API exports that use JSON.parse without validation
grep -r 'module\.exports.*=' helpers/ | xargs -I {} sh -c 'grep -l "JSON\.parse" {} && grep -L "validate\|schema" {}'

# Run ESLint with custom rule for unsafe JSON parsing
eslint --rule '{"no-unsafe-json-parse": "error"}' helpers/getProjects.js
```

**Accept when:**
- All JSON.parse calls in public API contracts are wrapped in try-catch blocks with appropriate error handling
- Each public API contract that parses JSON has documented input schema and validation implementation
- Static analysis tools detect and flag new JSON.parse usage without validation in helper modules
- Parsed objects are protected against prototype pollution using Object.freeze() or equivalent mechanisms
- Validation schemas are defined using established libraries (joi, ajv, zod) with built-in prototype pollution protection

<enforcement>
Claude Code MUST NOT skip or defer verification. All JSON.parse operations in public API contracts must be validated before merging. ESLint violations for unvalidated JSON.parse block CI pipeline. Security team conducts quarterly audits of helper modules.
</enforcement>