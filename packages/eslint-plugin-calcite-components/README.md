# @esri/eslint-plugin-calcite-components

ESLint rules specific to Stencil JS projects.

## Installation

Install the following deps in your stencil project:

```bash
npm i @esri/eslint-plugin-calcite-components --save-dev
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
npm run lint
```

## Supported Rules

- [`@esri/calcite-components/ban-events`](./docs/ban-events.md)

This rule helps prevent usage of specific events and allows suggesting alternatives.

- [`@esri/calcite-components/ban-props-on-host`](./docs/ban-props-on-host.md)

This rule catches props/attributes that should be in the encapsulated HTML structure and not on the host element.

- [`@esri/calcite-components/enforce-ref-last-prop`](./docs/enforce-ref-last-prop.md)

This updates `ref` usage to work around a Stencil bug where ref is called in the specified order and not after initializing element with all its attributes/properties. This can cause attributes/properties to be outdated by the time the callback is invoked. This rule ensures the `ref` attribute is ordered last in a JSXElement to keep it up-to-date.

- [`@esri/calcite-components/require-event-emitter-type`](./docs/require-event-emitter-type.md)

This rule helps enforce the payload type to EventEmitters to avoid misleading `any` type on the CustomEvent detail object.

- [`@esri/calcite-components/strict-boolean-attributes`](./docs/strict-boolean-attributes.md)

This rule catches boolean props that are initialized in a way that does not conform to the HTML5 spec.

## Recommended rules

```json
{
  "@esri/calcite-components/ban-props-on-host": "error",
  "@esri/calcite-components/enforce-ref-last-prop": "error",
  "@esri/calcite-components/require-event-emitter-type": "error",
  "@esri/calcite-components/strict-boolean-attributes": "error"
}
```

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
