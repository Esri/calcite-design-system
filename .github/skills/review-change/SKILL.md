---
name: review-change
description: Perform a final engineering review of a Calcite change before submitting or approving it.
argument-hint: "[diff, branch, or pull request]"
---

# Review a Calcite change

Review the change as an engineer, not only as a formatter or linter.

## Intent

Confirm the diff addresses the stated problem and use case.

Call out behavior that appears unrelated to the request.

## Correctness

Look for:

- incorrect assumptions
- missing states
- synchronization issues
- lifecycle issues
- unexpected fallback behavior
- unnecessary defensive code
- exception handling around known non-throwing APIs
- incorrect DOM or platform assumptions

## Architecture

Check whether the implementation follows current Calcite patterns.

Flag unnecessary abstractions or new patterns when an established approach exists.

## API

For public-facing changes, evaluate consistency, ergonomics, typing, compatibility, and native-platform alignment.

## Accessibility

Check semantic structure, keyboard interaction, focus behavior, accessible naming, state communication, and appropriate ARIA usage where relevant.

## Tests

Confirm tests exercise user-observable behavior.

Identify important behavior that is untested.

Flag tests that primarily reproduce implementation details.

Flag manual `try`/`catch`/`finally` cleanup when a test-runner cleanup API such as Vitest's `onTestFinished`, scoped setup, or an existing helper is more appropriate.

## Performance

Look for new work that scales with component count, item count, or DOM size.

Pay particular attention to global listeners, observers, controllers, repeated selectors, and layout-sensitive operations.

Request measurements when a meaningful performance impact is plausible.

## Maintainability

Prefer implementations another contributor can understand without reconstructing hidden assumptions.

The author should be able to explain the implementation and its tradeoffs independently of generated output.

Prioritize substantive findings over stylistic preferences already enforced by tooling.
