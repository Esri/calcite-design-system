### As anchor link

```html
<calcite-button href="#content">Internal anchor</calcite-button>
<calcite-button href="https://www.esri.com" icon-start="launch" rel="noopener noreferrer" target="_blank"
  >External anchor with icon</calcite-button
>
```

### Within a form

```html
<form name="sign-up">
  <calcite-label>
    First name
    <calcite-input name="first-name" required value="Jane"></calcite-input>
  </calcite-label>
  <calcite-button type="reset">I should reset the form (type reset)</calcite-button>
  <calcite-button type="button">I should not submit the form (type button)</calcite-button>
  <calcite-button>Submit</calcite-button>
</form>
```

### With icons

```html
<calcite-button appearance="solid" icon-start="arrow-left">Back</calcite-button>
<calcite-button icon-end="map" color="red">Map Options</calcite-button>
<calcite-button icon-end="plus" appearance="outline" color="inverse">Add to favorites</calcite-button>
```

### With loading and disabled states

```html
<calcite-button loading>Fetching data...</calcite-button> <calcite-button disabled>Can't touch this</calcite-button>
```
