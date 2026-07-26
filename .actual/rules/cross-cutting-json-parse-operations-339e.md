# Require Core Node.js Libraries for File System and Data Processing Operations: Json Parse Operations

These rules are ALWAYS ACTIVE for all file system read/write operations in helper modules, public API functions that process file-based data, JSON parsing operations on file contents, and frontmatter and Markdown processing workflows.

### Rules

- **R-JSON-001** MUST: All JSON.parse() operations on file contents MUST be wrapped in try-catch blocks to handle malformed input.

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

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint rules detecting unsafe JSON.parse patterns without error handling MUST be enforced in CI/CD. Code review MUST block merge until validation patterns are implemented. Security team MUST be notified of dependency vulnerabilities for triage and remediation.
</enforcement>