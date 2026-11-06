---
name: remove-deprecated-tokens
description: "Audit, remove, and verify deprecated CSS custom properties or design tokens. Use when asked to find exact token references, remove deprecated tokens, exclude generated output and verify affected component tests after token removal."
argument-hint: "Token names; audit, remove, or verify; optional repository scope"
---

# Remove Deprecated Tokens

## Outcome

Produce an exact-reference inventory or remove deprecated token support from source, then verify the affected tests. Leave generated output and supported replacement tokens untouched unless explicitly requested otherwise.

## Procedure

1. Establish intent and scope.
   - Accept one or more exact token names.
   - Treat requests to identify, find, audit, or verify references as read-only. A task heading mentioning removal alone does not authorize edits.
   - For explicit removal requests, edit source and relevant tests or examples.
   - Find the Git root and inspect the working tree. Preserve existing user changes.

2. Search exact references across the repository.
   - Search tracked files across the Git root, not just the open workspace package.
   - Match literal tokens with CSS identifier boundaries on both sides. Suffixes such as `-color`, `-selected`, and `-striped` must not count as matches for a shorter token.
   - Also search camelCase token identifiers, especially declarations in `src/custom-theme/`. For example, `--calcite-switch-handle-shadow` maps to `calciteSwitchHandleShadow`: strip the leading `--` and camel-case the hyphen-separated segments. Match complete identifiers so longer supported names are not included.
   - Escape token names before inserting them into regular expressions. For ordinary ASCII CSS tokens, use `(^|[^[:alnum:]_-])TOKEN([^[:alnum:]_-]|$)` with extended Git grep, or equivalent lookarounds in a compatible engine.
   - Pass `--` before search patterns because CSS custom properties start with hyphens.
   - Exclude generated output according to repository conventions: distribution bundles, generated documentation, coverage, caches, and installed dependencies. Do not blindly exclude source tooling directories named `build`.
   - Include relevant untracked source with `rg` or editor search when needed. State whether the inventory covers tracked files only or also untracked files. Fall back to Git grep when `rg` is unavailable.
   - Git grep exit code 1 means no matches; distinguish it from a search error.
   - Report generated references separately only when requested. Do not count them as remaining source support.

3. Classify matches and inspect the owning code.
   - Identify CSS fallback chains, public declarations, deprecation documentation, tests, stories, demos, and migration references.
   - Confirm the supported replacement from nearby source or metadata rather than guessing from its name.
   - Before editing, state one local hypothesis about the removal and one focused check that can disprove it.

4. Remove support only when requested.
   - Remove deprecated fallbacks while preserving supported tokens, fallback ordering, theme defaults, selected states, and striped behavior.
   - Remove public declarations and their attached deprecation documentation.
   - Remove corresponding camelCase entries from custom-theme token registries. Migrate theme examples to a confirmed replacement when one exists; otherwise remove obsolete entries without inventing a replacement. Preserve supported entries.
   - Remove obsolete test entries and comments; retain or add coverage for supported behavior as needed.
   - Migrate examples and stories to the confirmed replacement without changing their intended appearance.
   - Preserve historical changelog and migration references unless explicitly asked to remove them. Report these as intentional remaining matches, not active token support.
   - Do not hand-edit generated files or unrelated code. Explain intentional retained references.
   - Make small changes. Immediately run the cheapest behavior-scoped check after the first substantive edit, then validate adjacent follow-up changes.

5. Verify affected components.
   - Read package scripts and test configuration. Discover actual test files rather than assuming every component has its own suite.
   - Run relevant suites only unless broader testing is requested or warranted. Include parent suites that own coverage for child components.
   - For Calcite, check Node/Puppeteer and browser modes when applicable. From the components package, use `pnpm test:node <actual-test-paths>` and `pnpm test:browser <actual-test-paths>` after confirming those scripts exist.
   - Confirm that tests executed. Zero-test success is not validation, particularly with `passWithNoTests` enabled.
   - Report blocked tests with the prerequisite or failure. Never claim they pass.
   - Repeat exact-reference searches for both CSS token names and their camelCase identifiers after removals, including custom-theme registries. Validate edited registries with available focused checks. Check for incidental changes from test tooling or dependency synchronization; do not silently revert user changes.

6. Report the result.
   - For audits, list exact matches by file and line, classify them, and state that no files were changed.
   - For removals, summarize changes, intentional remaining references, and the final exact-match result.
   - List executed suites, pass/fail counts when available, and missing standalone component coverage.
   - Limit certification to suites actually run and the working tree tested. Focused component results do not establish that the full repository passes.

## Completion Checks

- Search scope and generated-output exclusions are explicit.
- Longer supported token names are not mistaken for deprecated-token matches.
- Both CSS names and camelCase custom-theme declarations are checked; obsolete registry entries are removed for removal requests.
- Audit-only requests leave files untouched.
- Removals preserve replacement behavior and leave no unexplained source references.
- Relevant tests executed successfully, or blockers are clearly reported.
- Unrelated user edits remain intact.
