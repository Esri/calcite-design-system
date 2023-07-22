You can also listen for native events emitted from `<calcite-input>`.

You must use `focusin`/`focusout` instead of `focus`/`blur` because these events bubble up from the rendered child element rendered inside of `<calcite-input>`

All events return an element and a value:

```js
input.addEventListener("focusin", logFocus);
input.addEventListener("focusout", logBlur);

function logChange() {
  console.log(event.target.element);
  console.log(event.target.value);
}
```
