# Require Core Node.js Libraries for File System and Data Processing Operations: Frontmatter Parsing Use

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-FSOP-001** SHOULD: Frontmatter parsing SHOULD use the 'gray-matter' library for consistent YAML/Markdown processing.
- **R-FSOP-002** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-FSOP-003** MUST: File system operations MUST consistently use Node.js core 'fs' and 'path' modules.
- **R-FSOP-004** MUST: Public API functions that handle file-based data MUST validate input paths and sanitize error messages before exposing to consumers.
- **R-FSOP-005** MUST: No high or critical severity vulnerabilities MUST exist in gray-matter or lodash dependencies.

### Verify

```bash
# Detect bare JSON.parse() calls without try-catch in file-reading code
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
- ESLint rules detect unsafe JSON.parse patterns without error handling
- Integration tests validate error handling for malformed input

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint violations related to unsafe JSON parsing MUST fail the CI/CD pipeline. Code review MUST block merge until validation patterns are implemented. Security team MUST be notified of dependency vulnerabilities for triage and remediation.
</enforcement>