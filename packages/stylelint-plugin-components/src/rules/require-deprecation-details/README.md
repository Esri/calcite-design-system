# @esri/calcite-components/deprecation-format

Require deprecation and removal versions for `[Deprecated]` tokens in `@prop` comments.

```css
/* @prop --my-token: [Deprecated] in v1.2.3, removal target v3 - Use alternative instead.*/
```

## Options

### true

```js
{
  "@esri/calcite-components/deprecation-format": true
}
```

#### Valid deprecation messages

```css
/* @prop --my-token: [Deprecated] in v1.2.3, removal target v3 - Use `--my-token-2` instead. */
```

#### Invalid deprecations

```css
/* @prop --my-token: [Deprecated] - Use `--my-token-2` instead. */
```

```css
/* @prop --my-token: [Deprecated] in v1.2.3 - Use `--my-token-2` instead. */
```

```css
/* @prop --my-token: [Deprecated], removal target v3 - Use `--my-token-2` instead. */
```
