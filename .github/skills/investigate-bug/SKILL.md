---
name: investigate-bug
description: Investigate a Calcite bug or regression before proposing a fix, including reproduction, root-cause analysis, related patterns, and regression coverage.
argument-hint: "[issue, component, or symptom]"
---

# Investigate a Calcite bug

Do not begin by changing code.

## Reproduce

Determine:

- expected behavior
- actual behavior
- reliable reproduction steps
- affected browser or environment
- whether the behavior is a regression

Reduce the reproduction when practical.

## Trace the behavior

Follow the behavior through the implementation.

Identify:

- where the incorrect state or behavior originates
- whether the problem is component-specific or shared
- whether a helper, controller, browser API, or platform behavior is involved

Avoid fixing only the visible symptom when the underlying cause is identifiable.

## Compare patterns

Search for similar components or implementations.

Determine whether the affected code differs from an established working pattern.

## Verify assumptions

If behavior depends on HTML, DOM, CSS, ARIA, Lit, TypeScript, Vitest, or another external technology, consult authoritative documentation or specifications when needed.

Distinguish verified behavior from assumptions.

## Propose the fix

Prefer the smallest change that addresses the root cause.

Explain significant tradeoffs or compatibility concerns.

## Protect against regression

Add focused regression coverage whenever practical.

The regression test should fail because of the reported behavior, not because of an internal implementation detail.
