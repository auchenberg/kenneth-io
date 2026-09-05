# Adopt Playwright for Browser Automation and Screenshot Generation: Dom Manipulation Screenshot

These rules are ALWAYS ACTIVE for browser automation scripts, screenshot generation utilities, and DOM manipulation code that prepares visual content for capture.

### Rules

- **R-PLAYWRIGHT-001** MUST: DOM manipulation for screenshot preparation MUST be performed via page.evaluate() to execute JavaScript in the browser context.

### Verify

```bash
# Check for Playwright dependency
grep -r "playwright" package.json

# Verify page.evaluate() usage in scripts
grep -r "page.evaluate" scripts/

# Confirm screenshot script exists
test -f scripts/screenshot-post.mjs && echo 'Screenshot script exists'
```

**Accept when:**
- package.json contains playwright as a dependency
- Screenshot scripts use page.evaluate() for DOM manipulation
- scripts/screenshot-post.mjs exists and accepts post-slug as command-line argument

<enforcement>
Claude Code MUST NOT skip or defer verification of Playwright adoption and page.evaluate() usage patterns in screenshot generation scripts.
</enforcement>