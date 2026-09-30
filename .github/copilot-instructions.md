# Calcite Design System workspace instructions

Follow `AGENTS.md` and the repository's contributing, component, testing, and documentation conventions.

## Workspace

- This repository is a Turbo monorepo using pnpm workspaces.
- Use the Node version declared in `package.json`; prefer `mise` so the configured runtime is selected automatically.
- Install dependencies from the repository root with `pnpm install`.
- Prefer filtered commands when working on one package, for example `pnpm --filter @esri/calcite-components <script>`.

## Package responsibilities

- `packages/components` contains the Calcite web component source.
- `packages/components-react` contains generated React wrappers. Avoid manual changes unless the task specifically targets React wrappers.
- `packages/design-tokens`, `packages/ui-icons`, `packages/eslint-plugin-components`, and `packages/tailwind-preset` contain shared package-level concerns. Change them only when required by the task.
- Some workspace packages are private tools. Change them only when the task targets that tooling.

## Component conventions

- Follow `packages/components/BOILERPLATE_COMPONENT.md` for new component structure and file layout.
- Use the component convention references below as the source of truth for APIs, events, property reflection, focus behavior, styling, accessibility, internationalization, documentation, and testing.
- Keep components minimal and reusable. Do not add application-specific networking, routing, or state management unless an established convention supports it.
- Give public APIs explicit TypeScript types and JSDoc. Avoid `any`.
- Avoid browser-specific fixes; use feature detection when platform support varies.
- When proposing a modern platform pattern based on changing browser support, provide an authoritative reference and wait for approval before applying it.

## Styling and stories

- Follow the [Styling] reference for class naming and host attribute patterns.
- Keep reusable strings and class names in established resources such as `resources.ts`.
- Do not invent colors, spacing values, or typography scales.
- Do not change layout, spacing, or interaction behavior unless requested.
- Use CSS classes in stories instead of repeating inline styles.
- For behavior with a visual effect, update the relevant story in addition to automated tests. For purely visual changes, prefer story coverage unless interaction testing is needed.

## Testing mechanics

- Follow the test-selection, locator, migration, and determinism guidance in `AGENTS.md`.
- New component browser tests use `*.browser.e2e.tsx`; update legacy `*.e2e.ts` tests when a safe migration is not practical.
- Reuse helpers from `packages/components/src/tests/common` and `packages/components/src/tests/utils`.
- Keep tests focused on the changed behavior and avoid unrelated assertions or setup.
- If a test is unstable, skip it and create or reference a follow-up issue rather than retaining flaky coverage.

Targeted component commands:

```sh
pnpm --filter @esri/calcite-components test:node <path>
pnpm --filter @esri/calcite-components test:browser <path>
pnpm --filter @esri/calcite-components test:watch <path>
pnpm --filter @esri/calcite-components lint
pnpm --filter @esri/calcite-components build
```

Start the component development server with `pnpm start:components`. Build the full monorepo with `pnpm build`.

## Documentation and generated sources

- Keep JSDoc, examples, and generated API sources aligned with implementation changes.
- Do not leave stale comments, examples, or documentation.

## Pull requests and communication

- Pull requests should originate from a branch in the cloned repository rather than a fork because visual-test workflows require secrets.
- Write review comments and PR text in a direct, collaborative, and specific tone.
- Explain what should change and why without sounding absolute or dismissive.
- When useful, prefix review comments with:
  - `blocking:` correctness, accessibility, security, or breaking API issue that must be resolved
  - `suggestion:` optional improvement
  - `nit:` minor polish that should not create extended discussion
  - `question:` request for clarification or rationale

## Reference documentation

- `CONTRIBUTING.md`
- `packages/components/README.md`
- `packages/components/BOILERPLATE_COMPONENT.md`
- [Coding conventions]
- [Accessibility]
- [Documentation]
- [Internationalization]
- [Styling]
- [Testing]

Supported browsers are documented in `packages/components/README.md#browser-support`.

<!-- references -->

[Coding conventions]: https://github.com/Esri/calcite-design-system/wiki/coding-conventions
[Accessibility]: https://github.com/Esri/calcite-design-system/wiki/accessibility-conventions
[Documentation]: https://github.com/Esri/calcite-design-system/wiki/Documentation-conventions
[Internationalization]: https://github.com/Esri/calcite-design-system/wiki/Internationalization
[Styling]: https://github.com/Esri/calcite-design-system/wiki/styling-conventions
[Testing]: https://github.com/Esri/calcite-design-system/wiki/testing-conventions
