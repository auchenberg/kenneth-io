# Adopt Playwright for Browser Automation and Screenshot Generation: Screenshot Scripts Normalize

These rules are ALWAYS ACTIVE for screenshot generation scripts, browser automation utilities, and DOM manipulation code used to prepare visual assets for capture.

### Rules

- **R-SCREENSHOT-001** SHOULD: Screenshot scripts SHOULD normalize visual presentation by hiding navigation elements and setting consistent background colors.

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
Claude Code MUST NOT skip or defer verification of Playwright adoption and screenshot script normalization patterns. All new screenshot generation code MUST be reviewed against these rules before acceptance.
</enforcement>