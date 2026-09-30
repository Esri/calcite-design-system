# Preact and TypeScript

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Esri/calcite-design-system/tree/dev/examples/components/preact?configPath=examples/components/preact)

To install dependencies and start the development server, run:

```sh
pnpm install --ignore-workspace --lockfile=false
pnpm dev
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
pnpm add @esri/calcite-components --ignore-workspace --lockfile=false
```

### Setup components

First, define the components:

```js
// src/index.ts
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements(window);
```

Now you can use Calcite components in your application:

```tsx
// src/routes/profile/index.tsx
<calcite-button onClick={() => setCount((count) => count + 1)}>Click Me</calcite-button>{' '}
```
