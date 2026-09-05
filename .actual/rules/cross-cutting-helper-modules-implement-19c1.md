# Standardize Public API Contract Exports with Input Validation: Helper Modules Implement

These rules are ALWAYS ACTIVE for all helper modules exporting public API contracts that process external data through JSON.parse, file system operations, or structured data formats like gray-matter frontmatter.

### Rules

- **R-API-001** MAY: Helper modules MAY implement input size limits to prevent denial-of-service through oversized payloads.

### Verify

```bash
# Check for unprotected JSON.parse calls in helper modules
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
- Input size limits are implemented or documented as intentionally deferred

<enforcement>
Clause verification is mandatory. ESLint custom rules MUST detect unvalidated JSON.parse in public API contracts. Code review MUST block merges introducing new JSON parsing without validation. Security team MUST conduct quarterly audits of helper modules.
</enforcement>