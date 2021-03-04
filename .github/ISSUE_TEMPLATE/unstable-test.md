---
name: Unstable Test
about: Associate issue for an unstable test that was skipped.
title: "Unstable Test: "
labels: testing, 0 - new, p - high
assignees: ""
---

## Summary

**Which component?:**

**Which test(s)?:** <!-- list unstable test(s) or suite -->

**Test error:**

<!--
For example:

FAIL src/components/calcite-foo/calcite-foo.e2e.ts (32.825 s)
  ● calcite-foo a11y check › setFocus › can focus some button
    expect(received).toBe(expected) // Object.is equality
    Expected: true
    Received: false
      165 |   }
      166 |
    > 167 |   expect(await page.evaluate((selector) => document.activeElement.matches(selector), focusTargetSelector)).toBe(true);
          |                                                                                                            ^
      168 | }
      169 |
      at Object.focusable (src/tests/commonTests.ts:167:108)
          at runMicrotasks (<anonymous>)
-->

**PR that skipped the test:** #

## Additional Info <!-- any info that may help fix the test -->
