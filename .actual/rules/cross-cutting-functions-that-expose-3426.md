# Require Core Node.js Libraries for File System and Data Processing Operations: Functions That Expose

These rules are ALWAYS ACTIVE for all file system operations and data processing functions that expose public API contracts, particularly those handling file-based data transformations and JSON parsing operations.

### Rules

- **R-FSOP-001** MUST: Functions that expose file system operations as public API contracts MUST validate input paths to prevent directory traversal attacks.
- **R-FSOP-002** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-FSOP-003** MUST: File system operations MUST consistently use Node.js core 'fs' and 'path' modules.
- **R-FSOP-004** MUST: Public API functions that handle file-based data MUST sanitize error messages before exposing them to consumers.
- **R-FSOP-005** SHOULD: Use established utility libraries (gray-matter, lodash) for file parsing and data transformation rather than custom implementations.

### Verify

```bash
# Detect bare JSON.parse calls on file contents without try-catch blocks
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
- grep for bare JSON.parse returns no matches in file-reading code

<enforcement>
Clause Code MUST NOT skip or defer verification of these rules. ESLint rules detecting unsafe JSON.parse patterns, code review checklists for file system operations, automated security scanning in CI/CD, and integration tests validating error handling are mandatory enforcement mechanisms.
</enforcement>