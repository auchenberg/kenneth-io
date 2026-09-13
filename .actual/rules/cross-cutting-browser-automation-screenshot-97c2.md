# Adopt Playwright for Browser Automation and Screenshot Generation: Browser Automation Screenshot

These rules are ALWAYS ACTIVE for browser automation scripts, screenshot generation utilities, and DOM manipulation code that prepares visual content for capture.

### Rules

- **R-PLAYWRIGHT-001** MUST: Browser automation for screenshot generation MUST use Playwright as the core automation library.

### Verify

```bash
# Check for Playwright in dependencies
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
Claude Code MUST NOT skip or defer verification of Playwright adoption in browser automation and screenshot generation workflows. All new screenshot scripts and DOM manipulation utilities must be verified against these rules before approval.
</enforcement>