import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import { defaults, reflects, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { CSS as STEPPER_ITEM_CSS } from "../stepper-item/resources";
import { nextFrame } from "../../utils/dom";
import type { StepperItem } from "../stepper-item/stepper-item";

describe("defaults", () => {
  defaults(
    () => mount("calcite-stepper"),
    [
      {
        propertyName: "icon",
        defaultValue: false,
      },
      {
        propertyName: "layout",
        defaultValue: "horizontal",
      },
      {
        propertyName: "numbered",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-stepper"),
    [
      {
        propertyName: "icon",
        value: true,
      },
      {
        propertyName: "layout",
        value: "horizontal",
      },
      {
        propertyName: "numbered",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-stepper"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div>Step 3 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 4" id="step-4">
            <div>Step 4 content</div>
          </calcite-stepper-item>
        </calcite-stepper>,
      ),
    { display: "flex" },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-stepper"));
});

describe("fixed height sizing", () => {
  it.each(["horizontal", "horizontal-single"] as const)(
    "content row is larger than header row when fixed height is set (%s) (#12786)",
    async (layout) => {
      await mount<"calcite-stepper">(
        <calcite-stepper layout={layout} style={{ blockSize: "20rem", inlineSize: "40rem" }}>
          <calcite-stepper-item heading="Step 1" selected>
            <div style={{ blockSize: "100%" }}>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2">
            <div style={{ blockSize: "100%" }}>Step 2 content</div>
          </calcite-stepper-item>
        </calcite-stepper>,
      );

      const selectedItem = page.getBySelector("calcite-stepper-item[selected]");
      const header = selectedItem.getBySelector(`.${STEPPER_ITEM_CSS.stepperItemHeader}`);
      const content = selectedItem.getBySelector(`.${STEPPER_ITEM_CSS.stepperItemContent}`);

      const headerBox = header.element().getBoundingClientRect();
      const contentBox = content.element().getBoundingClientRect();

      expect(contentBox.height).toBeGreaterThan(headerBox.height);
    },
  );
});

describe("inheritable props in shadow DOM", () => {
  it("updates items when stepper is inside a custom element shadow root", async () => {
    if (!customElements.get("calcite-stepper-wrapper")) {
      customElements.define(
        "calcite-stepper-wrapper",
        class extends HTMLElement {
          constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode: "open" });

            shadowRoot.innerHTML = `
              <calcite-stepper>
                <slot></slot>
              </calcite-stepper>
            `;
          }
        },
      );
    }

    const { container } = await mount(<div />);

    const wrapper = document.createElement("calcite-stepper-wrapper");
    wrapper.innerHTML = `
      <calcite-stepper-item heading="Step 1"></calcite-stepper-item>
      <calcite-stepper-item heading="Step 2"></calcite-stepper-item>
    `;
    container.append(wrapper);

    const shadowRoot = wrapper.shadowRoot!;

    await customElements.whenDefined("calcite-stepper");
    await customElements.whenDefined("calcite-stepper-item");
    await nextFrame();

    let items = page.getBySelector("calcite-stepper-item");
    expect(items.length).toBe(2);

    items.elements().forEach((item: StepperItem) => {
      expect(item.icon).toBe(false);
      expect(item.numbered).toBe(false);
      expect(item.layout).toBe("horizontal");
      expect(item.scale).toBe("m");
      expect(item.numberingSystem).toBeUndefined();
    });

    const stepper = shadowRoot.querySelector("calcite-stepper")!;

    stepper.icon = true;
    stepper.numbered = true;
    stepper.layout = "vertical";
    stepper.scale = "l";
    stepper.numberingSystem = "arab";

    await nextFrame();

    items = page.getBySelector("calcite-stepper-item");
    expect(items.length).toBe(2);

    items.elements().forEach((item: StepperItem) => {
      expect(item.icon).toBe(true);
      expect(item.numbered).toBe(true);
      expect(item.layout).toBe("vertical");
      expect(item.scale).toBe("l");
      expect(item.numberingSystem).toBe("arab");
    });
  });
});
