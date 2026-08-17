# Require Core Node.js Libraries for File System and Data Processing Operations: Functions That Expose

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-FSOP-001** MUST: Functions that expose file system operations as public API contracts MUST validate input paths to prevent directory traversal attacks.
- **R-FSOP-002** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-FSOP-003** MUST: File system operations MUST consistently use Node.js core 'fs' and 'path' modules.
- **R-FSOP-004** MUST: Public API functions MUST validate input paths and sanitize error messages before exposing to consumers.
- **R-FSOP-005** SHOULD: Use established utility libraries (gray-matter, lodash) for file parsing and data transformation to reduce custom implementation risk.

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
- ESLint rules detect unsafe JSON.parse patterns without error handling and fail CI/CD pipeline
- Code review checklist items for file system operations and input validation are satisfied
- Integration tests validate error handling for malformed input and invalid file paths

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. ESLint violations related to unsafe JSON parsing MUST block merge. Security team MUST be notified of dependency vulnerabilities. Quarterly security audits MUST identify and prioritize remediation of non-compliant code.
</enforcement>