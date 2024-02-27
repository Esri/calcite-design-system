# Boilerplate Example Component

Get started building a new Calcite Component using this boilerplate example. The following files are common for building a new component.

## Component

The component TSX file.

```tsx
import { Component, Element, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h } from "@stencil/core";

import { CSS, TEXT } from "./resources";

@Component({
  tag: "calcite-example",
  styleUrl: "example.scss",
  shadow: true,
})
export class Example {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  @Prop()
  someProp = true;

  @Prop()
  textMyString = TEXT.myString;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element()
  el: HTMLCalciteExampleElement;

  internalProp: string;

  @Watch("someProp")
  handleSomeProp(): void {
    // ...
  }

  @State()
  internalRenderableProp = 0;

  @Watch("internalRenderableProp")
  handleInternalSomeProp(): void {
    // ...
  }

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad() {
    // ...
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  @Event()
  calciteExampleEvent: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------

  @Method()
  async publicMethod(): Promise<void> {
    // ...
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  internalMethod(): void {
    // ...
  }

  @Listen("someEvent")
  handleSomeEvent(): void {
    // ...
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class={CSS.foo}>{this.someProp ? this.textMyString : null}</div>
      </Host>
    );
  }
}
```

## Styling

The Associated Sass styling to go along with the component.

```css
:host {
  display: flex;
}
```

## Resources file

Resources defined in `/src/my-component/resources.ts`.

```ts
export const TEXT = {
  myString: "i18n string prop start with 'text'",
};

export const CSS = {
  foo: "foo",
};
```

## E2E Test

```ts
import { newE2EPage } from "@stencil/core/testing";
import { CSS, TEXT } from "./resources";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-example", () => {
  describe("renders", () => {
    renders("calcite-example");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-example");
  });

  describe("accessible", () => {
    accessible("calcite-example");
  });

  it("shows myString by default", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-example></calcite-example>");

    const div = await page.find(`calcite-example >>> .${CSS.foo}`);
    expect(div.innerText).toBe(TEXT.myString);
  });

  it("hides myString when someProp is false", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-example></calcite-example>`);
    const div = await page.find(`calcite-example >>> .${CSS.foo}`);
    expect(div.innerText).toBe("");
  });
});
```
