# Preact and TypeScript

To install dependencies and start the development server, run:

```sh
npm install
npm run dev
```

## Developer info

To install `@esri/calcite-components`, run:

```sh
npm install @esri/calcite-components
```

### Setup components

First, define the components:

```js
// src/index.ts
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements(window);
```

Next, import the global Calcite components stylesheet (only do this once):

```ts
// src/index.ts
import "@esri/calcite-components/dist/calcite/calcite.css";
```

Now you can use Calcite components in your application:

```tsx
// src/routes/profile/index.tsx
<calcite-button onClick={() => setCount((count) => count + 1)}>Click Me</calcite-button>{' '}
```
