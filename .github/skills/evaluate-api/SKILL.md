---
name: evaluate-api
description: Evaluate a proposed Calcite component or package API for consistency, developer ergonomics, platform alignment, typing, compatibility, and maintenance.
argument-hint: "[API proposal]"
---

# Evaluate a Calcite API

Treat API design separately from implementation convenience.

## Define the use case

Identify concrete consumer scenarios the API must enable.

Do not evaluate the API only from the implementation's perspective.

## Search existing APIs

Compare:

- related Calcite components
- existing utilities
- naming conventions
- native web-platform APIs
- established package entry points

Prefer consistency unless there is a concrete reason to diverge.

## Evaluate the API

Consider:

- discoverability
- naming
- developer ergonomics
- TypeScript inference and narrowing
- composability
- consistency across components
- native platform alignment
- accessibility
- maintenance cost
- backward compatibility
- future extensibility

Avoid adding multiple ways to accomplish the same task without a clear benefit.

## Separate internal and public concerns

An internal implementation utility does not automatically need to become public API.

If public exposure is proposed, verify that there are concrete external use cases.

## Present alternatives

When meaningful alternatives exist, show representative usage for each.

Prefer examples demonstrating realistic consumer code.

Provide a recommendation and the tradeoffs that drive it.
