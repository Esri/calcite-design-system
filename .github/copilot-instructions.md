# Calcite Design System Workspace Instructions

## Scope

- This repo is a Turbo monorepo with npm workspaces. Most component work happens in `packages/components`.
- Use Node as specified in `package.json` (`engines.node`). Prefer `mise` so the repo's configured runtime is used automatically.
- Prefer package-scoped commands while iterating on a single package: `npm --workspace=packages/components run <script>`.

## Where To Work

- `packages/components`: source for Calcite web components.
- `packages/components-react`: React wrappers generated around component APIs. Avoid manual edits here unless the task is explicitly React-wrapper specific.
- `packages/design-tokens`, `packages/ui-icons`, `packages/eslint-plugin-components`, and `packages/tailwind-preset`: shared package-level concerns. Only change them when the task clearly requires it.

## Core Principles

- Prefer clarity over cleverness.
- Follow existing patterns in the codebase.
- Make the smallest possible change to satisfy the request.
- If requirements are ambiguous, ask clarifying questions before acting.

## Boundaries and Constraints

- Only make changes that are explicitly requested, plus directly related tests, stories, or documentation updates required by the repo's conventions.
- Do NOT refactor, reformat, rename, or reorganize code unless asked.
- Do NOT introduce new libraries, frameworks, or dependencies unless approved.
- Do NOT modify unrelated files.
- If you notice a potential improvement, suggest it but wait for approval.
- Avoid browser-specific fixes. Prefer feature detection instead.

## Code Quality

- Favor readable, maintainable solutions.
- Avoid premature optimization.
- Keep functions and components small and focused.
- Include comments only when they add clarity (not for obvious code).
- Sort properties alphabetically where the existing repo patterns expect it, but do not create unrelated churn just to reorder code.
- Use strict TypeScript typings and prefer the `nil` type where a value may be `null` or `undefined`.

## Component Conventions

- Follow `packages/components/BOILERPLATE_COMPONENT.md` for new component structure and file layout.
- Treat `packages/components/conventions/README.md` as the source of truth for component responsibilities, event naming, property reflection, focus APIs, styling, and accessibility expectations.
- Calcite components should stay minimal and reusable. Do not add network requests, routing, or application-specific state management unless an existing convention explicitly supports it.
- Public APIs need explicit typing and JSDoc. Avoid `any`.
- Match existing component patterns before introducing new abstractions.

### Component Conventions Reference Docs

- `packages/components/conventions/Accessibility.md`
- `packages/components/conventions/Documentation.md`
- `packages/components/conventions/Internationalization.md`
- `packages/components/conventions/Styling.md`
- `packages/components/conventions/Testing.md`

## Styling

- Follow `packages/components/conventions/Styling.md` for class naming and host attribute patterns.
- Prefer existing resources/constants patterns such as `resources.ts` instead of scattering strings and class names through render code.

## UI and Frontend Guidelines

- Prioritize accessibility (semantic HTML, ARIA only when necessary).
- Do not invent new colors, spacing values, or typography scales.
- Prefer composition over complex components.
- Keep visual and interaction logic separated where possible.

## UX Sensitivity

- Do not change layout, spacing, or behavior unless explicitly requested.
- Flag potential UX regressions instead of silently fixing them.

## Testing

- Every bug fix or feature change should include automated test coverage.
- Prefer `*.browser.e2e.tsx` for new component tests that use **Vite locators** (use the project’s established locator patterns first). Legacy `*.e2e.ts` tests still exist and continue to run, so update them when required by the changed behavior.
- Use shared helpers from `packages/components/src/tests/commonTests` and `packages/components/src/tests/utils` instead of duplicating test utilities.
- For new UI functionality, add applicable **Storybook stories** and update existing stories when behavior changes.
- Always use CSS classes when adding/updating stories instead of repeating styles.
- If a change impacts user interaction, include assertions that validate the intended UX behavior and avoid flaky selectors.
- If changes are visual, prefer updating stories in addition to tests when behavior also changes.
- If a change is purely visual, prefer updating stories over adding end-to-end tests unless new interaction coverage is needed.
- If you’re unsure whether a story or test is warranted, propose the smallest useful one and explain why.
- Follow `packages/components/conventions/Testing.md` for story and test expectations.
- Targeted commands for component work:
  - `npm --workspace=packages/components run test:stable -- <path>`
  - `npm --workspace=packages/components run test:experimental -- <path>`
  - `npm --workspace=packages/components run test:watch -- <path>`

## Development Commands

- Install dependencies from the repo root with `npm install`.
- Start the local component dev server with `npm run start:components`.
- Lint a single package with `npm --workspace=packages/components run lint`.
- Build the components package with `npm --workspace=packages/components run build`.
- Build the whole monorepo with `npm run build`.

## PR And CI Notes

- Pull requests are expected to come from a cloned repo branch, not a fork, because forked workflows cannot access required secrets for visual testing.
- If a test is unstable, follow the repo testing convention: skip it and create or reference a follow-up issue instead of leaving flaky coverage in place.

## Reference Docs

- `CONTRIBUTING.md`
- `packages/components/README.md`
- `packages/components/BOILERPLATE_COMPONENT.md`

## Supported Browsers

- See the supported browsers and versions in `packages/components/README.md#browser-support`.

## Safety

- Assume production impact unless told otherwise.
