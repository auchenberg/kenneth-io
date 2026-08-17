# Adopt Playwright for Browser Automation and Screenshot Generation: Element Dimensions Positions

These rules are ALWAYS ACTIVE for browser automation scripts, screenshot generation utilities, and DOM manipulation code that uses Playwright for programmatic element measurement and visual content capture.

### Rules

- **R-PLAYWRIGHT-001** SHOULD: Element dimensions and positions SHOULD be calculated using getBoundingClientRect() within the browser context.

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
Claude Code MUST NOT skip or defer verification of Playwright adoption and getBoundingClientRect() usage in element measurement operations.
</enforcement>