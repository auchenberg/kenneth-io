# Standardize Public API Contract Exports with Input Validation: Input Validation Use

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-INPUT-001** SHOULD: Input validation SHOULD use schema validation libraries (e.g., joi, ajv, zod) rather than manual checks for complex data structures.

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
- No unvalidated JSON.parse calls exist in helper modules exporting public API contracts

<enforcement>
Clause Code MUST NOT skip or defer verification of input validation rules for public API contracts. All JSON.parse operations in helper modules must be validated against documented schemas using established validation libraries.
</enforcement>