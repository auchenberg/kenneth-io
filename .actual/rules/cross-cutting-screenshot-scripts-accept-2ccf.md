# Adopt Playwright for Browser Automation and Screenshot Generation: Screenshot Scripts Accept

These rules are ALWAYS ACTIVE for screenshot generation scripts and browser automation utilities in the codebase.

### Rules

- **R-PLAYWRIGHT-001** MUST: Screenshot scripts MUST accept post slug as a required command-line argument and optional output path

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

<enforcement>
Claude Code MUST NOT skip or defer verification of Playwright adoption and screenshot script compliance.
</enforcement>