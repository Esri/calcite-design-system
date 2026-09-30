# Calcite Design System agent guidance

Calcite Design System is a TypeScript monorepo containing Calcite Components and supporting packages.

Before making changes, understand the existing implementation and surrounding patterns. Prefer extending established conventions over introducing a new abstraction or pattern.

## Development principles

### Understand before changing

Before modifying an implementation:

1. Identify the behavior being changed and the expected user-facing result.
2. Inspect the component or package implementation.
3. Inspect similar implementations elsewhere in the repository.
4. Inspect relevant tests and utilities.
5. Determine whether the requested change affects public API, accessibility, performance, styling, or other components.

Do not apply generated code that cannot be explained in the context of the existing implementation.

If the existing implementation appears inconsistent or surprising, investigate before "fixing" it. The behavior may be intentional or constrained by compatibility requirements.

### Prefer focused changes

Keep changes scoped to the problem being solved.

Avoid unrelated refactors unless they are required for the implementation.

For larger changes, identify independently useful pieces that can be implemented and reviewed separately.

Do not introduce generalized abstractions based on a single use case unless there is strong evidence they improve the codebase.

Do not use optional chaining, defensive guards, casts, or fallback behavior to hide unexpected states. Handle states explicitly when they are genuinely expected; otherwise, allow failures to expose incorrect assumptions.

Do not wrap known non-throwing APIs in `try`/`catch`/`finally`. Use the control flow and cleanup mechanism designed for the task; in Vitest, prefer `onTestFinished` for per-test cleanup that must run after a failure. Consider whether setup can avoid manual cleanup before adding exception handling.

### Follow established patterns

Search the repository for comparable implementations before creating a new pattern.

Prefer:

- existing component conventions
- existing utilities
- existing controllers and reactive patterns
- existing testing helpers
- established TypeScript patterns

When multiple patterns exist, determine which represents the current direction rather than copying the first example found.

### Design APIs deliberately

Treat public API changes as design decisions rather than implementation details.

Consider:

- consistency with related components
- developer ergonomics
- naming
- native platform conventions
- accessibility semantics
- type safety
- backward compatibility
- whether an existing API can solve the use case

Avoid expanding public API solely to simplify an internal implementation.

When multiple viable approaches exist, explain the meaningful tradeoffs behind the chosen implementation.

### Preserve platform semantics

Prefer native HTML, DOM, CSS, ARIA, and browser behavior when they satisfy the requirement.

Do not recreate platform behavior unnecessarily.

Accessibility behavior is part of component correctness, not an optional enhancement.

When behavior depends on a platform or accessibility specification, verify the relevant specification or authoritative documentation rather than relying only on assumptions.

### Test behavior

Tests should primarily verify observable behavior.

Avoid tests that depend unnecessarily on private implementation details.

Use browser-mode tests as the default for component testing. Add new component tests in browser mode.

Prefer locators over direct DOM queries. Direct DOM access is acceptable when a test primarily verifies API updates and locators would add unnecessary overhead to that path.

When working near an existing Node test, migrate it to browser mode if:

- browser mode is guaranteed to provide equivalent coverage
- the migrated test can demonstrate the expected failure
- the test is not large or complex enough for migration to risk introducing bugs or unreliable behavior

Keep tests deterministic. Do not add safeguards that gracefully handle unexpected states or failures; tests should fail when their assumptions are not met.

If an existing Node test cannot be safely and reliably migrated under these constraints, update it in place.

When fixing a bug, add or update a test that demonstrates the regression whenever practical.

### Consider performance

Be cautious when introducing work that scales with:

- component count
- item count
- DOM size
- global listeners
- observers
- controllers
- repeated selectors
- repeated layout or style reads

Do not claim a performance improvement or regression without measuring representative cases.

When performance is relevant, compare equivalent behavior and isolate the implementation being evaluated.

### Validate changes

Before considering work complete:

1. Review the final diff.
2. Confirm the implementation matches the requested behavior.
3. Run focused tests.
4. Run relevant lint/type checks.
5. Consider accessibility and performance implications.
6. Remove debugging code and unrelated changes.
7. Fix underlying lint and TypeScript errors rather than suppressing them.
8. Be able to explain why the implementation works and why the chosen approach fits Calcite.

Prefer evidence from the implementation, tests, specifications, or measurements over speculation.
