# enforce-ref-last-prop

**Deprecated** This rule is deprecated and will be removed in a future release. It is no longer needed if you are using Stencil 4.14.1 or greater.

This ensures the node passed into the `ref` callback is in sync with its JSX attributes/properties when invoked.

Placing `ref` last helps work around a [Stencil bug](https://github.com/ionic-team/stencil/issues/4074) where the `ref` callback is invoked in the specified order and not after initializing the element with all its attributes/properties. This can cause attributes/properties to be outdated by the time the callback is invoked.

## Config

No config is needed

## Usage

```json
{ "@esri/calcite-components/enforce-ref-last-prop": "error" }
```

> Fix included
