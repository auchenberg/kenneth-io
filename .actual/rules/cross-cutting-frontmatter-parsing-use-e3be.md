# Require Core Node.js Libraries for File System and Data Processing Operations: Frontmatter Parsing Use

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-FMATTER-001** SHOULD: Frontmatter parsing SHOULD use the 'gray-matter' library for consistent YAML/Markdown processing.
- **R-FMATTER-002** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks with appropriate error handling.
- **R-FMATTER-003** MUST: File system operations MUST consistently use Node.js core 'fs' and 'path' modules.
- **R-FMATTER-004** MUST: Public API functions MUST validate input paths and sanitize error messages before exposing to consumers.

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

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. ESLint rules detecting unsafe JSON.parse patterns, code review checklists, automated security scanning in CI/CD, and integration tests validating error handling are mandatory enforcement mechanisms.
</enforcement>