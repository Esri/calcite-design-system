# Component Guidelines

This is a living document defining our best practices and reasoning for authoring Calcite Components.

## General Guidelines

Generally adhere to and follow these best practices for authoring components.

- [Google Web Component Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
- [Custom Element Conformance - W3C Editor's Draft](https://w3c.github.io/webcomponents/spec/custom/#custom-element-conformance)

## Structure

We follow Stencil's suggested component structure. See their [style guide](https://github.com/ionic-team/stencil/blob/master/STYLE_GUIDE.md#file-structure) for more details.

## Component Responsibilities

Calcite Components broadly targets two groups of projects inside Esri:

- **Sites** like [esri.com](https://esri.com) and [developers.arcgis.com](https://developers.arcgis.com).
- **Apps** like [ArcGIS Online](https://arcgis.com), [Vector Tile Style Editor](https://developers.arcgis.com/vector-tile-style-editor), [Workforce](https://www.esri.com/en-us/arcgis/products/workforce/overview), [ArcGIS Hub](https://hub.arcgis.com) etc...

Components should present the minimum possible implementation to be usable by both sites and apps and leave as much as possible to users.

It is generally agreed on that components should not:

- Make network requests. Authentication and the exact environment of the request is difficult to manage and better left to the specific application or site.
- Manage routing or manipulate the URL. Managing the URL is the domain of the specific site or app.
- Implement any feature which can easily be achieved with simple CSS and HTML. E.x. it was decided that `<calcite-switch>` should not support `text` or `position` properties because those could be easily duplicated with CSS ([ref](https://github.com/Esri/calcite-design-system/pull/24#discussion_r289424140))
- Implement any component which might replace a browser feature, without adding functionality that goes above and beyond what browser defaults would provide.

However components are allowed to:

- Use or implement `localStorage` if there is a specific use case.
- Communicate with other components if a specific use case exists.

**Discussed In**:

- [Should tabs support syncing and loading from localstorage](https://github.com/ArcGIS/calcite-components/pull/27) . **Yes** because such feature are difficult to implement for **Sites** and would require lots of additional JavaScript work on the part of teams and authors
- [Should switch support a label](https://github.com/ArcGIS/calcite-components/pull/24#discussion_r289424140). **No** because label place

## Events

All public events should be documented with [JSDoc](https://jsdoc.app/).

### Event Names

Event names should be treated like global variables since they can collide with any other event names and global variables. As such follow these guidelines when naming events.

- Name events list `Component + Event name` for example the `change` event on `<calcite-tabs>` should be named `calciteTabsChange`.
- Always prefix event names with `calcite` and never use an event name used by existing DOM standards <https://developer.mozilla.org/en-US/docs/Web/Events>.
- For example:
  - Bad: `change`
  - Good: `calciteTabChange`
- If an existing event can be listened to, don't create a new custom event. For example, there is no need to create a `calciteButtonClick` event because a standard `click` event will still be fired from the element.
- For consistency, use `calcite<ComponentName>Change` for value change events.

**Discussed In:**

- <https://github.com/Esri/calcite-design-system/pull/24/files/3446c89010e3ef0421803d68d627aba2e7c4bfa0#r289430227>

### Private/Internal Events

If you need to use events to pass information inside your components for example to communicate between parents and children make sure you call `event.stopPropagation();` and `event.preventDefault();` to prevent the event from reaching outside the component.

Also, make sure to add the `@internal` JSDoc tag to hide an event from the generated doc or `@private` to hide it from both the doc and generated type declarations.

### Event Details

Only attach additional data to your event if that data cannot be determined from the state of the component. This is because events also get a reference to the component that fired the event. For example you do not need to pass anything exposed as a `@Prop()` in the event details.

```tsx
@Listen("calciteCustomEvent") customEventHandler(
  event: CustomEvent
) {
  console.log(event.target.prop); // event.target is the component that fired the event.
}
```

`<calcite-tab-nav>` is also an example of this. The `event.details.tab` item contains the index of the selected tab or the tab name which cannot be easily determined from the state of `<calcite-tab-nav>` in some cases so it makes sense to include in the event.

### Native event cancelation

When a component **handles events for its own interaction** (e.g., moving between list items, closing an open menu), if the event is tied to default browser behavior (e.g., space key scrolling the page), `Event.preventDefault()` must be called to avoid mixed behavior.

```tsx
class SomeInputTypeComponent {
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape") {
      /* clear text/close popover */
      event.preventDefault(); // let browser or other components know that the event has been handled
    }
    // ...
  }
}
```

For composite components or components that support children (either light or shadow DOM), they may need to check if an event has been canceled (`Event.defaultPrevented`) before handling it.

```tsx
class CompositeOrParentComponent {
  handleKeyDown(event: KeyboardEvent): void {
    if (
      event.key === "Escape" &&
      !event.defaultPrevented // check if child component has already handled this
    ) {
      /* close */
      event.preventDefault(); // let browser or other components know that the event has been handled
    }
    // ...
  }
}
```

### Interaction events

Pointer events should be used in favor of mouse events to maximize device compatibility.

### Event listeners

There are a few ways to add event listeners within our components:

1. `@Listen` decorator
   - automatically cleaned up by component lifecycle
   - can easily specify [different event listener options](https://stenciljs.com/docs/events#listen-decorator)
   - does not provide event type information
   - event name is not type checked
2. JSX event listener props
   - automatically cleaned up by component lifecycle
   - cannot specify event listener options (some events may have a matching capture prop)
   - provides event type information
   - event name is type checked
3. `addListener`
   - not removed by the component lifecycle, so the listener needs to be explicitly removed to prevent memory leaks
   - provides total flexibility regarding event listener options
   - provides event type information
   - event name is not type checked

1 and 2 should be used whenever possible (which one you use will depend on convenience). 3 should only be used whenever 1 and 2 are not possible or ideal.

## Properties

Private/internal properties should be annotated accordingly to avoid exposing them in the doc and/or API. You can do this by using the `@private`/`@internal` [JSDoc](https://jsdoc.app/) tags.

### Reflecting to attributes

It is recommended to reflect properties that fit the following criteria:

- are static or will not be updated frequently during the component lifespan (e.g., a number that represents a range min or max would be reflected, but a number that represents a value that will constantly be updated by the user would not)
- value represents non-rich data or booleans/numbers/strings that are not used as content (e.g., a string that represents a mode would be reflected, but a string that represents a placeholder, title or summary would not)
- are public and belong to a public component
- required for internal styling or would make internal styling easier

Doing so will give developers more flexibility when querying the DOM. This is important in framework environments where we can't safely assume components will have their attributes set vs properties.

### `ref` usage

Due to a [bug in Stencil](https://github.com/ionic-team/stencil/issues/4074), `ref` should be set as the last property in JSX to ensure the node's attributes/properties are up to date.

```jsx
<div
  class={CSS.foo}
  // ...
  tabIndex={0}
  // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
  ref={this.storeSomeElementRef}
/>
```

## Focus support

Components with focusable content, must implement the following pattern:

```ts
interface FocusableComponent {
  setFocus(focusId?: FocusId): Promise<void>; // focusId should be supported if there is more than one supported focus target
}

type FocusId = string;
```

**Note**: Implementations can use the [`focusElement`](https://github.com/Esri/calcite-design-system/blob/f2bb61828f3da54b7dcb5fb1dade12b85d82331e/src/utils/dom.ts#L41-L47) helper to handle focusing both native and calcite components.

Examples:

- [`calcite-color`](https://github.com/Esri/calcite-design-system/blob/78a70a805324689d516130816a69f031e39c5338/src/components/color/color.tsx#L409-L413)
- [`calcite-panel` (supports `focusId`)](https://github.com/Esri/calcite-design-system/blob/f2bb61828f3da54b7dcb5fb1dade12b85d82331e/src/components/panel/panel.tsx#L298-L311)

## CSS Class Names

Because most components utilize shadow DOM, there is far less concern over naming collisions in a global CSS namespace. In addition, it's better for file transfer times and easier to write if class names are shorter. For these reasons, full BEM is not necessary. Instead, we can omit the "Block", and use the host instead. Consider the following BEM markup:

```html
<div class="card">
  <h3 class="card__title card__title--large">Title</h3>
  <p class="card__text">Text</p>
</div>
```

In a component using shadow DOM, this should instead be written as:

```jsx
<Host>
  <h3 class="title title--large">Title</h3>
  <p class="text">Text</p>
</Host>
```

Notice `.card` does not appear anywhere. We would then apply styles to the host element itself:

```scss
:host {
  // card styles here
}

.title {
}
.title--large {
}
.text {
}
```

Modifier classes on the "block" (host element) can often be written by reflecting the prop and selecting it directly via an attribute selector:

```scss
:host([kind="success"]) {
}
```

This builds a nice symmetry between the styling and the public API of a component.

- <https://github.com/ArcGIS/calcite-components/issues/28>
- <https://github.com/ArcGIS/calcite-components/pull/24#discussion_r287462934>
- <https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-495788683>
- <https://github.com/ArcGIS/calcite-components/pull/24#issuecomment-497962263>

## assets

If a component needs assets, they should be placed under a `assets/<component-name>` subdirectory. For example,

```text
my-component/
  assets/
    my-component/
      asset.json
  my-component.e2e.ts
  my-component.tsx
  my-component.scss
  ...
```

The component's metadata should then include the following metadata prop [`assetsDirs: ["assets"]`](https://stenciljs.com/docs/assets#assetsdirs).

```tsx
import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "calcite-test",
  shadow: true,
  assetsDirs: ["assets"],
})
export class MyComponent {
  /* ... */
}
```

Afterwards, any asset path references must use the `getAssetPath` utility, using the `assets` directory as the root.

```ts
const assetPath = getAssetPath(`./assets/my-component/asset.json`);
```

This is required in order to have a unified assets folder in the distributable.

## Bundling and Loading

Stencil has the capability to build and distribute a large variety of outputs based on our needs. You can read more about this in the [output targets](https://github.com/ionic-team/stencil/blob/cc55401555ff5c28757cf99edf372dcada2c0b25/src/compiler/output-targets/readme.md) documentation.

As a best practice we should follow [Ionic's configuration](https://github.com/ionic-team/ionic/blob/master/core/stencil.config.ts) and generate a `bundle` for each component. Stencil will then generate a loader that will dynamically load the components used on the page.

**Note:** This is highly likely to change as we move closer to our first release and as Stencil improves their documentation around their specific methods and build processes.

Each root component should have a corresponding bundle entry in `stencil.config.ts`.

## Unique IDs for Components

Many times it is necessary for components to have a `id="something"` attribute for things like `<label>` and various `aria-*` properties. To safely generate a unique id for a component but to also allow a user supplied `id` attribute to work follow the following pattern:

```tsx
import { guid } from "../../utils/guid";

@Component({
  tag: "calcite-example",
  styleUrl: "example.scss",
  shadow: true,
})
export class Example {
  // ...

  guid: string = `calcite-example-${guid()}`;

  render() {
    const id = this.el.id || this.guid;
    return <Host id={id}></Host>;
  }

  // ...
}
```

This will create a unique id attribute like `id="calcite-example-51af-0941-54ae-22c14d441beb"` which should have a VERY low collision change since `guid()` generates IDs with `window.crypto.getRandomValues`. If a user supplies an `id` this will respect the users `id`.

## Prerendering and SSR

Stencil provide the capability to render web components on the server and seamlessly hydrate them on the client. This is handled by the `dist-hydrate-script` output target in `stencil.config.ts`.

This generates a `hydrate` directory which exposes `renderToString()` (for the server) and `hydrateDocument()` for the client.

Since many of the same lifecycle methods are called on the client and server you may need to differentiate any code that relies on browser APIs like so:

```ts
import { Build } from "@stencil/core";

if (Build.isBrowser) {
  // client side
} else {
  // server side
}
```

Checking if the necessary APIs are present is also acceptable:

```ts
const elements = this.el.shadowRoot ? this.el.shadowRoot.querySelector("slot").assignedElements() : [];
```

To ensure that all components are compatible for prerendering a prerender build is done as part of `npm test`.

## Cleaning up resources

Ensure all components clean up their resources.

### Timeouts

When using `setTimeout()`, make sure that you clear the timeout using `clearTimeout()` in cases where the same timeout may be called again before the first timeout has finished or if the handler is no longer needed. For example, the handler may no longer need to be called if the component was disconnected from the DOM.

Example:

```tsx
menuFocusTimeout: number;

focusMenu(): void => {
  clearTimeout(this.menuFocusTimeout);
  this.menuFocusTimeout = window.setTimeout(() => focusElement(this.menuEl), 100);
}
```

## Layering

Avoid setting z-index ad hoc and instead use a contextual z-index layer from the [Tailwind z-index extension](../tailwind.config.ts#L212-L222). This will ensure proper layering across components.

## Utils

There are utilities for common workflows in [`src/utils`](../src/utils).

### Global attributes

The [`globalAttributes`](../src/utils/globalAttributes.ts) util was specifically made to access the `lang` global attribute when set on a Calcite component. However, it can be extended to allow additional [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#list_of_global_attributes) by adding to the [`allowedGlobalAttributes`](https://github.com/Esri/calcite-design-system/blob/a33aa0df0c5bf103f91187826e6b12b8ff266d90/src/utils/globalAttributes.ts#L4-L5) array. The util is used in [`calcite-pagination`](../src/components/pagination/pagination.tsx), which you can use as a reference.

#### Usage steps

1. Import the interface and watch/unwatch methods

   ```js
   import { GlobalAttrComponent, watchGlobalAttributes, unwatchGlobalAttributes } from "../../utils/globalAttributes";
   ```

2. Implement the interface

   ```js
   export class ComponentName implements GlobalAttrComponent {
   ```

3. Add `globalAttributes` state

   ```js
   @State() globalAttributes = {};
   ```

4. Add connect/disconnect callbacks

   ```js
   connectedCallback(): void {
       watchGlobalAttributes(this, ["lang"]);
   }

   disconnectedCallback(): void {
       unwatchGlobalAttributes(this);
   }
   ```

5. Use the state to access `lang` (or another global attribute that may be allowed in the future).

   ```js
   const lang = this.globalAttributes["lang"] || document.documentElement.lang || "en";
   ```

### BigDecimal

`BigDecimal` is a [number util](https://github.com/Esri/calcite-design-system/blob/main/packages/calcite-components/src/utils/number.ts) that helps with [arbitrary precision arithmetic](https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic). The util is adopted from a [Stack Overflow answer](https://stackoverflow.com/a/66939244) with some small changes. There are some usage examples in [`number.spec.ts`](../src/utils/number.spec.ts).

### Custom child element support

In order to support certain architectures, parent components might need to handle custom elements that wrap their expected child items within shadow DOM that would prevent discovery when querying the DOM.

For such cases, the following pattern will enable developers to create custom child/item components and have them work seamlessly with parent components.

#### Parent component

- Must provide a `customItemSelectors` property to allow querying for custom elements in addition to their expected children.
- An interface for the class (used by custom item classes) and element (used by parent component APIs) must be created in the parent's `interfaces.d.ts` file, where the necessary child APIs must be extracted.

**Example**

**`parent/interfaces.d.ts`**

```ts
type ChildComponentLike = Pick<Components.CalciteChild, "required" | "props" | "from" | "parent">;
type ChildComponentLikeElement = ChilcComponentLike & HTMLElement;
```

**`parent/parent.tsx`**

```tsx
  @Prop() selectedItem: HTMLChildComponentElement | ChildComponentLikeElement;
```

**`custom-item/custom-item.tsx`**

```tsx
export class CustomItem implements ChildComponentLike {
  private childComponentEl: HTMLChildComponentLikeElement;

  @Prop() required: boolean;
  @Prop() props: string;
  @Prop() from: number;

  @Method() async parent(): Promise<string> {
    await this.childComponentEl.parent();
  }

  render(): VNode {
    return (
      <Host>
        <child-component
          required={this.required}
          props={this.props}
          from={this.from}
          ref={(el) => (this.childComponentEl = el)}
        />
      </Host>
    );
  }
}
```

#### Custom child component

- Must implement the element interface expected by the parent (e.g., `ChildComponentLike`).

#### Notes

- This pattern should be applied sparingly and on a case-by-case basis.
- We can refine this pattern as we go on, but additional modifications needed to handle the custom items workflow will be considered out-of-scope and thus not supported.
- Until we have documentation covering creating custom elements, `customItemSelectors` must be made internal and any `ChildComponentLike` types must be excluded from the doc.
- Please refer to <https://github.com/Esri/calcite-design-system/pull/7608/> as an example on how this pattern is applied.
