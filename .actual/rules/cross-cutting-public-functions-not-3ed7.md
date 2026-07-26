# Require Core Node.js Libraries for File System and Data Processing Operations: Public Functions Not

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-FSEC-001** MUST NOT: Public API functions MUST NOT expose raw file system errors to external consumers without sanitization.
- **R-FSEC-002** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-FSEC-003** MUST: File system operations MUST consistently use Node.js core 'fs' and 'path' modules.
- **R-FSEC-004** MUST: Public API functions MUST validate input paths and sanitize error messages before exposing to consumers.

### Verify

```bash
# Detect bare JSON.parse calls without try-catch in file-reading code
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
- Integration tests validate error handling for malformed input

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All JSON.parse operations on file contents must be wrapped in try-catch blocks, file system operations must use core Node.js modules, and public API functions must sanitize errors before exposure to consumers. Violations block merge and trigger security team notification.
</enforcement>