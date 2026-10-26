---
name: test-component
description: Add, update, migrate, or review Calcite component tests using the repository's Vitest and browser-mode conventions.
argument-hint: "[component, behavior, or test]"
---

# Test a Calcite component

## Determine the behavior under test

Describe the externally observable behavior before writing the assertion.

Apply `AGENTS.md`'s "Test behavior" guidance when choosing user interactions, programmatic API coverage, and any necessary implementation-detail coverage.

## Choose the appropriate environment

Match coverage to the behavior using `AGENTS.md`'s "Test behavior" guidance before choosing a test environment.

Use browser-mode tests as the default. Add new component tests as `*.browser.e2e.tsx`.

When working near an existing Node test, migrate it to browser mode only when:

- browser mode provides equivalent coverage
- the migrated test demonstrates the expected failure
- the test is small and straightforward enough to migrate without introducing bugs or unreliable behavior

If those conditions cannot be met, update the existing Node test in place.

## Follow existing test patterns

Inspect nearby current tests and groups before generating new ones; extend shared context following `AGENTS.md`'s "Test behavior" guidance.

Use Vitest locators for user interactions and assertions, following the locator and shadow-root guidance in `AGENTS.md`.

### Use the public component surface

Prefer `el` from `mount`'s return object over `component` to exercise the same element and public API consumers use.

Use `component` when you need to use the proxied component. Use it to access members unavailable on `el`, such as public class members not exposed through Lumina decorators; its availability is not a reason to test internals.

### Reuse test utilities

Use helpers from `packages/components/src/tests/common` and `packages/components/src/tests/utils` rather than recreating common operations. For example, use `afterNextFrame` from `src/tests/utils/timing.ts` instead of writing a promise-wrapped `requestAnimationFrame` call when waiting for a frame is appropriate.

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
