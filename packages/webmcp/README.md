# Lit Labs WebMCP experiment

`@lit-labs/webmcp` is a runtime prototype built on Lit's controller API. `@lit-labs/webmcp-compiler` is an optional development dependency. Nothing registers until the application enables tools on a connected element in a WebMCP-capable document.

## Runtime only

```ts
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { WebMcpController } from "@lit-labs/webmcp/controller.js";
import { tool } from "@lit-labs/webmcp/tool.js";

@customElement("example-panel")
class ExamplePanel extends LitElement {
  @property({ type: Boolean }) accessor tools = false;

  @property({ type: Boolean, reflect: true })
  @tool({ description: "Whether the panel content is hidden.", schema: { type: "boolean" } })
  accessor collapsed = false;

  constructor() {
    super();
    new WebMcpController(this, { enabled: () => this.tools });
  }
}
```

Use `<example-panel tools></example-panel>` to opt in. The host's tag prefixes tool names, such as `example-panel.get.collapsed` and `example-panel.set.collapsed`. A getter-only member, or one marked with `@tool({ readOnly: true, ... })`, gets no setter tool. Existing methods can also be marked; explicit method metadata supplies an object `inputSchema` and an ordered `parameters` list. A schema describes the tool contract; the controller does not validate values against it. As an alternative to decorators, supply definitions directly through the controller's `tools` callback.

Only the first connected, enabled instance of a tag registers in each document. Disabling or disconnecting that instance transfers the names to the next eligible one. Annotations describe behavior; they do not enforce permissions or consent.

## Inference and Vite

Add `useWebMcp()` from `@lit-labs/webmcp-compiler/vite.js` to your Vite plugins. Replace the explicit metadata with `@tool()` and document the member in JSDoc. The plugin infers missing metadata for supported TypeScript types and adds a lazy import of a generated module. Explicit options override inference. Fully explicit decorators can run unchanged without a TypeScript program.

Inference handles JSON primitives, literal unions, arrays, and JSON-compatible object shapes. Inferred methods use named parameters and can accept a direct `AbortSignal` that is supplied by the controller rather than included in the schema. Unsupported signatures or types need explicit metadata. Methods and property getters return `{ value }`, or `{}` for `undefined`.

The inference function, `generateToolMetadata` from `@lit-labs/webmcp-compiler/compiler.js`, accepts a caller-owned TypeScript program. Use the plugin's `getProgram` option to reuse an existing build program. Otherwise, Vite lazily creates one incremental language service for the project without running full diagnostics. When generated metadata changes during development, including through an imported TypeScript type, the plugin reloads the page so the browser receives updated registrations.
