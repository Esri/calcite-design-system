You can also listen for native events emitted from `<calcite-input>`.

You must use `focusin`/`focusout` instead of `focus`/`blur` because these events bubble up from the rendered child element rendered inside of `<calcite-input>`

All events return an element and a value:

```js
inputEl.addEventListener("focusin", logFocus);
inputEl.addEventListener("focusout", logBlur);

function logFocus() {
  console.log(event.target);
}

function logBlur() {
  console.log(event.target.value);
}
```
