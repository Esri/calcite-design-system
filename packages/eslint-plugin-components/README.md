# @esri/eslint-plugin-calcite-components

ESLint rules specific to `@esri/calcite-components` development.

## Deprecation notice

> [!WARNING]
> `@esri/eslint-plugin-calcite-components` is deprecated.

This package was introduced to help component projects align with Calcite's conventions. Most of those projects have since moved to the SDK monorepo, which has its own linting rules, and some checks are now handled by the Lumina compiler. As a result, a standalone Calcite-specific ESLint plugin is no longer needed.

Existing releases will remain available, but consumers should plan to remove the plugin and use the linting and compiler checks provided by their project instead. There is no direct replacement package.

### Calcite Components migration plan

The `@esri/calcite-components` package currently uses all four rules. The proposed migration is:

| Rule                          | Plan                                                                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ban-events`                  | Preserve the current `keyup` and `keypress` restrictions in the components package's local ESLint configuration.                                                         |
| `no-dynamic-createelement`    | Adopt Lumina's `no-create-element-component` rule and compiler checks, then retain a local restriction only if dynamic native element names still need to be prohibited. |
| `strict-boolean-attributes`   | Remove the rule after verifying that the Lumina compiler enforces equivalent HTML boolean-attribute defaults; otherwise preserve the check as a local rule.              |
| `require-deprecation-details` | Move the check into the components package's local ESLint rules until API tooling or the compiler provides equivalent validation.                                        |

## Installation

For existing projects that still depend on the plugin:

```bash
pnpm add -D @esri/eslint-plugin-calcite-components
```

## Usage

Add or update the `.eslintrc.json` configuration file:

```json
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": ["plugin:@esri/calcite-components/recommended"]
}
```

Add a new `lint` script to `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src/**/*{.ts,.tsx}"
  }
}
```

Then you can run the linter:

```shell
pnpm lint
```

## Supported Rules

- [`@esri/calcite-components/ban-events`](./docs/ban-events.md)

This rule helps prevent usage of specific events and allows suggesting alternatives.

- [`@esri/calcite-components/no-dynamic-createelement`](./docs/no-dynamic-createelement.md)

This rule ensures that calls to `document.createElement()` use string literals to avoid dynamic tag creation to enhance plugin compatibility.

- [`@esri/calcite-components/strict-boolean-attributes`](./docs/strict-boolean-attributes.md)

This rule catches boolean props that are initialized in a way that does not conform to the HTML5 spec.

- [`@esri/calcite-components/require-deprecation-details`](./docs/require-deprecation-details.md)

This rule catches deprecation tags that are missing deprecation and removal target versions

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT Esri - <https://js.arcgis.com/5.0/LICENSE.txt>

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, refer to [Calcite's licensing](https://developers.arcgis.com/calcite-design-system/resources/licensing) and contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>

## Third-party notices

See [THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).
