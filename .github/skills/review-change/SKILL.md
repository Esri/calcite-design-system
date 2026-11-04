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

## PR title

Verify the title against the PR title guidance in `.github/copilot-instructions.md` and the contribution rules it references.

## Correctness

Look for:

- incorrect assumptions
- missing states
- synchronization issues
- lifecycle issues
- unexpected fallback behavior
- unnecessary defensive code
- exception handling inconsistent with `AGENTS.md`'s "Prefer focused changes" guidance
- incorrect DOM or platform assumptions

## Architecture

Check whether the implementation follows current Calcite patterns.

Flag unnecessary abstractions or new patterns when an established approach exists.

Apply `AGENTS.md`'s "Prefer focused changes" guidance when assessing added complexity.

## Technical baseline and standards

Verify browser compatibility against the technical baseline in `.github/copilot-instructions.md`; request target-release support evidence when needed.

Use its standards resources to verify platform and accessibility assumptions.

## API

For public-facing changes, evaluate consistency, ergonomics, typing, compatibility, and native-platform alignment.

## Accessibility

Check semantic structure, keyboard interaction, focus behavior, accessible naming, state communication, and appropriate ARIA usage where relevant.

## Tests

Confirm tests exercise user-observable behavior.

Identify important behavior that is untested.

Flag tests that primarily reproduce implementation details.

Check cleanup against `AGENTS.md`'s "Prefer focused changes" guidance.

Verify affected deprecated APIs satisfy `AGENTS.md`'s "Test behavior" coverage requirements.

## Performance

Look for new work that scales with component count, item count, or DOM size.

Pay particular attention to global listeners, observers, controllers, repeated selectors, and layout-sensitive operations.

Assess whether measurements are needed using `AGENTS.md`'s "Consider performance" guidance; use the `evaluate-performance` skill when benchmarking is warranted.

## Maintainability

Prefer implementations humans and agents can understand and maintain without reconstructing hidden assumptions.

The author should be able to explain the implementation and its tradeoffs independently of generated output.

Prioritize substantive findings over stylistic preferences already enforced by tooling.
