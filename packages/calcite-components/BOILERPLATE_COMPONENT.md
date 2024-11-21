# Boilerplate Example Component

Get started building a new Calcite Component using this boilerplate example. The following files are common for building a new component.

## Component

The component TSX file.

```tsx
import { LitElement, property, h, method, state, JsxNode } from "@arcgis/lumina";
import { CSS, TEXT } from "./resources";

export class Example extends LitElement {
  // #region Public Properties

  @property() someProp = true;

  @property() textMyString = TEXT.myString;

  // #endregion

  // #region State Properties

  private internalProp: string;

  @state() internalRenderableProp = 0;

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("someEvent", this.handleSomeEvent);
  }

  willUpdate(changes: PropertyValues): void {
    if (changes.has("someProp")) {
      // ...
    }

    if (changes.has("internalRenderableProp")) {
      // ...
    }
  }

  // #endregion

  // #region Events

  calciteExampleEvent = createEvent({ cancelable: false });

  // #endregion

  // #region Public Methods

  @method()
  async publicMethod(): Promise<void> {
    // ...
  }

  // #endregion

  // #region Private Methods

  internalMethod(): void {
    // ...
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return <div class={CSS.foo}>{this.someProp ? this.textMyString : null}</div>;
  }

  // #endregion
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
import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
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
