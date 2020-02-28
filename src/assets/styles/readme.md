# Calcite global styles

When building any component in calcite-components or [calcite-app-components](https://github.com/esri/calcite-app-components), please use these set of global variables (CSS variables and Sass mixins or variables)

## From calcite-components

### Color

[`_colors.scss`](https://github.com/Esri/calcite-components/blob/master/src/assets/styles/_colors.scss): you'll find the global CSS variables for both light and dark theme. 

## From [calcite-base](https://github.com/esri/calcite-base)

### Typography
[typography mixins from calcite-base](https://github.com/Esri/calcite-base/blob/master/dist/_type.scss)

#### Font-size

Here are the most common use cases font-size (Sass):
```
@include font-size(1)
@include font-size(0)
@include font-size(-1)
@include font-size(-2)
@include font-size(-3)
```
The entire range is from font-size -3 to 8.

Example: 

`font-size: @include font-size(-2)`

CSS ouput:
```
.font-size--2 {
  font-size: 0.875rem;
  line-height: 1.5; 
}
```

#### Font-weight

|  Weight  |  Value  |
|----------|---------|
|  Light   |   300   |
|  Regular |   400   |
|  Medium  |   500   |
|  Demi    |   600   |

Example:
`font-weight: 500`


### Shadows

The shadow of an element usually corresponds to the priority or importance of the message or workflow. Consistently using shadow for elements like alerts, modals, page takeovers, and sheets provides users clear and familiar indications of importance.

```
--shadow-1
--shadow-1-hover
--shadow-1-press
--shadow-2
--shadow-2-hover
--shadow-2-press
```

Current usage:

|  Shadow 1  |   Shadow 2   |
|------------|--------------|
|  notice    |  Modals      |
|            |  Alerts      |
|            |  Tooltips    |
|            |  Dropdowns   |
|            |  Popovers    |
|            |  FAB         |
|            |  Date-picker |