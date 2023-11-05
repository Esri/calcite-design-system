# enforce-ref-last-prop

This rule ensures this is a workaround for a [Stencil bug](https://github.com/ionic-team/stencil/issues/4074) where ref is called in the specified order and not after initializing element with all its attributes/properties. This can cause attributes/properties to be outdated by the time the callback is invoked.

This rule ensures the `ref` attribute is ordered last in a JSXElement to keep it up-to-date.

## Config

No config is needed

## Usage

```json
{ "@esri/calcite-components/enforce-ref-last-prop": "error" }
```
