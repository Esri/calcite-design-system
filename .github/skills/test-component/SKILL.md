---
name: test-component
description: Add, update, migrate, or review Calcite component tests using the repository's Vitest and browser-mode conventions.
argument-hint: "[component, behavior, or test]"
---

# Test a Calcite component

## Determine the behavior under test

Describe the externally observable behavior before writing the assertion.

Prefer testing what a consumer can observe rather than how the component internally produces the result.

## Choose the appropriate environment

Use browser-mode tests as the default. Add new component tests as `*.browser.e2e.tsx`.

When working near an existing Node test, migrate it to browser mode only when:

- browser mode provides equivalent coverage
- the migrated test demonstrates the expected failure
- the test is small and straightforward enough to migrate without introducing bugs or unreliable behavior

If those conditions cannot be met, update the existing Node test in place.

## Follow existing test patterns

Inspect nearby current tests before generating new ones.

Prefer Vitest locators over direct DOM queries.

Direct DOM access is acceptable when a test primarily verifies API updates and locators would add unnecessary overhead.

Reuse helpers from `packages/components/src/tests/common` and `packages/components/src/tests/utils`.

## Preserve deprecated API coverage

Apply the deprecated API coverage requirements in `AGENTS.md`'s "Test behavior" section to the affected paths.

## Consider performance coverage

Use `AGENTS.md`'s "Consider performance" guidance to decide whether to include benchmarks, then follow the `evaluate-performance` skill when warranted.

## Keep tests deterministic

Wait for the behavior or state that matters.

Do not add arbitrary delays.

Do not add optional chaining or guards simply to prevent a test from failing when required state is unexpectedly missing.

Allow unexpected conditions to fail clearly.

Choose exception handling and cleanup using `AGENTS.md`'s "Prefer focused changes" guidance.

## Assert outcomes

Prefer assertions against:

- rendered output
- public properties
- attributes
- events
- focus
- accessible behavior
- user-observable state

Avoid unnecessarily asserting:

- private fields
- private methods
- controller internals
- intermediate implementation state

## Regression tests

For a bug fix:

1. reproduce the failing behavior
2. create a test that captures the regression
3. implement the fix
4. verify the regression test passes

Keep the test focused on the behavior described by the issue.
