---
name: implement-component-change
description: Implement or modify behavior in a Calcite component while following existing component architecture, API, testing, accessibility, and performance conventions.
argument-hint: "[component or requested change]"
---

# Implement a Calcite component change

Use this workflow when implementing or modifying component behavior.

## 1. Understand the request

Identify:

- current behavior
- expected behavior
- affected component or components
- whether the change affects public API
- whether accessibility, styling, interaction, or performance are involved

Do not begin implementation until the intended observable behavior is understood.

## 2. Research the implementation

Inspect:

- the component implementation
- related utilities and controllers
- existing tests
- related components with similar behavior
- relevant component conventions

Prefer the repository's current patterns.

If different patterns exist, determine which is newer or more appropriate before choosing one.

## 3. Choose the smallest appropriate change

Prefer the simplest implementation that satisfies the requirement and fits existing architecture.

Avoid:

- unrelated refactors
- speculative abstractions
- unnecessary state
- duplicating platform behavior
- unnecessary observers or global listeners
- expanding public API when an internal solution is sufficient

If the work is becoming substantially larger than the original request, identify separable follow-up work rather than expanding scope automatically.

## 4. Implement

Use explicit TypeScript types.

Keep state derivable when practical rather than synchronizing duplicate state.

Use existing helpers and patterns where appropriate.

Preserve native element behavior and accessibility semantics.

## 5. Test

Add or update tests for observable behavior.

Follow the browser-mode, locator, migration, determinism, and cleanup guidance in `AGENTS.md`.

Include regression coverage for bug fixes when practical.

Avoid testing private implementation details unless they are the only meaningful contract being exercised.

## 6. Review

Review the final diff and confirm:

- the implementation solves the stated use case
- the implementation follows established patterns
- API consistency has been considered
- accessibility has been considered
- performance implications have been considered
- tests exercise the relevant behavior
- no unrelated changes remain

Be prepared to explain why this implementation was chosen over reasonable alternatives.
