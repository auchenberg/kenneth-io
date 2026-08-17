# Adopt Playwright for Browser Automation and Screenshot Generation: Usage Errors Reported

These rules are ALWAYS ACTIVE for browser automation scripts, screenshot generation utilities, and DOM manipulation code that uses Playwright for programmatic browser interaction and asset generation.

### Rules

- **R-PLAYWRIGHT-001** MUST: Usage errors MUST be reported via console.error with example invocations.

### Verify

```bash
# Check for Playwright dependency
grep -r "playwright" package.json

# Check for page.evaluate usage in scripts
grep -r "page.evaluate" scripts/

# Verify screenshot script exists
test -f scripts/screenshot-post.mjs && echo 'Screenshot script exists'
```

**Accept when:**
- package.json contains playwright as a dependency
- Screenshot scripts use page.evaluate() for DOM manipulation
- scripts/screenshot-post.mjs exists and accepts post-slug as command-line argument
- Usage error messages are reported via console.error with clear examples

<enforcement>
Claude Code MUST NOT skip or defer verification of Playwright usage error reporting patterns in browser automation scripts.
</enforcement>