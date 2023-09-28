# Developer Quick Start Guide

<details>
    <summary>Table of Contents</summary>

- [Developer Quick Start Guide](#developer-quick-start-guide)
  - [1. Shadow DOM](#1-shadow-dom)
  - [2. Tests](#2-tests)
    - [Adding a test](#adding-a-test)
      - [Failed test example](#failed-test-example)
    - [How to test](#how-to-test)
  - [3. Storybook](#3-storybook)
    - [Adding a new story](#adding-a-new-story)

</details>

## 1. Shadow DOM

Broken associations between the Shadow DOM and global light DOM can break accessibility semantics.

```html
<!-- Inaccessible example due to the Shadow DOM and global light DOM -->
<label for="four">four - broken cross boundary</label>
<ui-input-broken id="four"></ui-input-broken>
```

In this example, if we were to wrap an input in our web component but want to associate a label to the element, we would break the association. First, the `id` in this template will refer to the `ui-input-broken`, not the input contained within. We could change the attribute not to use `id` and pass it into the inner input `id`.

```ts
const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
    }
  </style>

  <div>
    <input id="" />
  </div>
`;
class UIInputBroken extends HTMLElement {
  static get observedAttributes() {
    return ["input-id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log(newValue);
    if (attrName === "input-id") {
      this.shadowRoot.querySelector("input").setAttribute("id", newValue);
    }
  }
}

customElements.define("ui-input-broken", UIInputBroken);
```

As of today there are no great workarounds for associating elements across the Shadow DOM boundary. Either all the associated elements should exist in the light DOM or Shadow DOM.

However, you _could_ extend the native element to allow an association.

[scroll to top](#developer-quick-start-guide)

## 2. Tests

**The best tools only find 30% of known issues**, so they can't be relied upon. But they can be the first step towards accessibility.

Calcite Components uses the [axe-core](https://github.com/dequelabs/axe-core) and [jest-axe](https://github.com/nickcolley/jest-axe) accessibility engines throughout its components. `axe-core` contains a number of best practices to help identify accessibility practices, such as ensuring every page has an h1 heading, and to help avoid "gotchas" in ARIA like where an ARIA attribute you used will get ignored. `axe-core` can mitigate over half of WCAG issues automatically. Additionally, it will return elements as "incomplete" where it's not certain, and manual review is needed.

When a new component is added, breaking changes are introduced, and/or as new functionality is added, accessibility tests must take place. **All components should have automated tests pertaining to accessibility.**

### Adding a test

To add a test, add the following to the `<component>.e2e.ts` file:

```ts
// Import the accessible test from commonTests
import { accessible } from "../../tests/commonTests";

// describe function, identify the component
describe("calcite-tree", () => {

   // accessible() will test for a11y
   it("is accessible", async () => accessible(`<calcite-tree></calcite-tree>`));

   // Multiple a11y tests can be present in a component
   it("is accessible: with nested children", async () =>
    accessible(`
        <calcite-tree lines>
            <calcite-tree-item>
            <a href="#">Child 2</a>
            <calcite-tree slot="children">
                <calcite-tree-item>
                <a href="http://www.google.com">Grandchild 1</a>
                </calcite-tree-item>
            </calcite-tree>
            </calcite-tree-item>
        </calcite-tree>
    `));
```

Multiple accessibility tests can be present in a component and be added to over time, which can be useful if the component contains many initiations. In the example above we're able to test `calcite-checkbox` with a `calcite-label` present and without. Note the tests will indicate which fails so we're able to mitigate if an error surfaces.

#### Failed test example

An example of a failed test:

```sh
FAIL src/components/tree/tree.e2e.ts (23.34 s)
  ● calcite-tree › is accessible: with nested children

    expect(received).toHaveNoViolations(expected)

    Expected the HTML found at $('calcite-tree[slot="children"]') to have no violations:

    <calcite-tree slot="children" aria-multiselectable="false" tabindex="-1" lines="" child="" scale="m" selection-mode="single" calcite-hydrated="">

    Received:

    "Elements must only use allowed ARIA attributes (aria-allowed-attr)"

    Fix any of the following:
      ARIA attribute is not allowed: aria-multiselectable="false"

    You can find more information on this issue here:
    https://dequeuniversity.com/rules/axe/4.4/aria-allowed-attr?application=axeAPI

      54 |       getTag(componentTagOrHTML)
      55 |     )
    > 56 |   ).toHaveNoViolations();
         |     ^
      57 | }
      58 |
      59 | export async function renders(

      at Object.accessible (src/tests/commonTests.ts:56:5)
          at runMicrotasks (<anonymous>)
```

### How to test

- `npm test` runs the current test suite
- `npm run test:watch` will retest on file changes
- [Learn more on testing](https://github.com/Esri/calcite-design-system/blob/main/CONTRIBUTING.md#running-the-tests) from our contributing docs

[scroll to top](#developer-quick-start-guide)

## 3. Storybook

We've already added the a11y add on, [storybook-addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) which uses `axe-core`, the same accessibility engine used for automated testing in CC. As new components and enhancements are added, **ensure stories are updated to test accessibility**. This includes as properties are added to components, to ensure we're upholding high standards to fit our audience's needs.

[Learn more on writing stories](https://github.com/Esri/calcite-design-system/blob/main/CONTRIBUTING.md#writing-stories) from our contributing docs.

### Adding a new story

To add a story, use the `<component>.stories.ts` file. For example:

```ts
// Accessible example
export const accessibleExample = (): string => html`<button>Accessible button</button>`;

// Inaccessible example due to contrast issues
export const inaccessibleExample = (): string => html`
  <button style="background-color:red;color:darkred">Inaccessible button</button>
`;
```

Each story will showcase violations (if found), passes, and incomplete checks (requiring a manual check).

For instance, when the `inaccessibleExample` from above is depicted in a story Storybook's accessibility add-on will indicate contrast issues are present. Storybook will identify, but also recommend what is needed to pass the violation. In this example we must ensure there is sufficient contrast between the foreground and background colors to meet WCAG 2.0 AA contrast ratio thresholds of 4.5 to 1.

![Storybook inaccessible example with accessibility contrast issue error depicted](https://user-images.githubusercontent.com/5023024/165529845-bbcbb139-f642-49d4-80a7-e8916e808278.png)

[scroll to top](#developer-quick-start-guide)
