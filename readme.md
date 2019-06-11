![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Calcite Components

Shared Web Components for Esri's Calcite design framework. To see the components in action, check out [the example site](https://esri.github.io/calcite-components/) (TODO: set up gh-pages).

Documentation for each component can be found within that component's directory in a generated `readme.md` file. This file will cover all the events and attributes each component uses. 

The current lineup of components is:

- [alerts](src/components/calcite-alerts/)
- [loader](src/components/calcite-loader/)
- [progress](src/components/calcite-progress/)
- [switch](src/components/calcite-switch/)
- [tabs](src/components/calcite-tabs/)

## Installation

*Note: Some of the below instructions won't work yet, as this library is not yet published to npm.*

### Node modules (in progress)

To install these components as a node module, use npm:

```
npm install --save @esri/calcite-components
```

After installing, you can import them into your project like:

```
import Components from "@esri/calcite-components"; 
```

If you only want to load certain individual components, you can specify them when you import:

```
import { CalciteSwitch } from "@esri/calcite-components"; 
```

### Script tag (in progress)

If you don't use npm, you can also add these components via a `<script>` tag in head of your HTML document:

```
<script src='https://unpkg.com/@esri/calcite-components@0.0.0-alpha.3/dist/calcite.js'></script>
```

After that, components can be used just like any other HTML element. Only components that are actually used will be loaded. 

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

Apache 2.0. For a full copy of the license, see the [LICENSE](./LICENSE) file.