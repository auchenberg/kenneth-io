# Require Core Node.js Libraries for File System and Data Processing Operations: Additional Validation Libraries

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-VALIDATION-001** MUST: Wrap all JSON.parse() operations on file contents in try-catch blocks with appropriate error handling.
- **R-VALIDATION-002** MUST: Use Node.js core 'fs' and 'path' modules for all file system operations.
- **R-VALIDATION-003** MUST: Validate input paths and sanitize error messages in public API functions before exposing to consumers.
- **R-VALIDATION-004** MAY: Additional validation libraries MAY be used for complex input validation scenarios beyond basic JSON parsing.
- **R-VALIDATION-005** SHOULD: Use established utility libraries (gray-matter, lodash) for file content processing and data transformations.

### Verify

```bash
# Detect bare JSON.parse() calls on file contents without try-catch blocks
grep -r 'JSON\.parse' --include='*.js' | grep -v 'try' | grep -v 'catch'

# Verify fs module usage
grep -r "require('fs')" --include='*.js'

# Verify gray-matter usage for frontmatter
grep -r "require('gray-matter')" --include='*.js'

# Ensure no moderate+ vulnerabilities in dependencies
npm audit --audit-level=moderate
```

**Accept when:**
- All JSON.parse() operations on file contents are wrapped in try-catch blocks with appropriate error handling
- File system operations consistently use Node.js core 'fs' and 'path' modules
- Public API functions validate input paths and sanitize error messages before exposing to consumers
- No high or critical severity vulnerabilities exist in gray-matter or lodash dependencies

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint rules detecting unsafe JSON.parse patterns without error handling MUST pass. Code review checklist items for file system operations and input validation MUST be satisfied. Automated security scanning in CI/CD pipeline for dependency vulnerabilities MUST complete successfully. Integration tests validating error handling for malformed input MUST pass.
</enforcement>