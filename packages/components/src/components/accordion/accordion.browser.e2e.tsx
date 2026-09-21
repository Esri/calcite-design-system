import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, scalePropagates, themed } from "../../tests/common";
import { CSS as ACCORDION_ITEM_CSS } from "../accordion-item/resources";
import type { AccordionItem } from "../accordion-item/accordion-item";
import type { Accordion } from "./accordion";
import { CSS } from "./resources";

const accordionContent = (
  <>
    <calcite-accordion-item heading="Accordion Title 1" id="1">
      <calcite-action icon="brush-tip" label="Paint" scale="s" slot="actions-start" />
      Accordion Item Content
      <calcite-action icon="sound" label="Volume" scale="s" slot="actions-end" />
    </calcite-accordion-item>
    <calcite-accordion-item description="A description" expanded heading="Accordion Title 1" id="2">
      Accordion Item Content
    </calcite-accordion-item>
    <calcite-accordion-item heading="Accordion Title 3" id="3">
      Accordion Item Content
    </calcite-accordion-item>
  </>
);

describe("defaults", () => {
  defaults(
    () => mount("calcite-accordion"),
    [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "iconPosition",
        defaultValue: "end",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "selectionMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "iconType",
        defaultValue: "chevron",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-accordion"),
    [
      {
        propertyName: "iconPosition",
        value: "start",
      },
      {
        propertyName: "iconPosition",
        value: "end",
      },
      {
        propertyName: "selectionMode",
        value: "single-persist",
      },
      {
        propertyName: "selectionMode",
        value: "single",
      },
      {
        propertyName: "selectionMode",
        value: "multiple",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-accordion"));
});

describe("renders", () => {
  renders(() => mount("calcite-accordion"), { display: "block" });
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-accordion>
          <calcite-accordion-item heading="Item 1" />
          <calcite-accordion-item heading="Item 2" />
        </calcite-accordion>,
        mountOptions,
      ),
    { targetSelector: "calcite-accordion-item" },
  );
});

describe("Shadow DOM", () => {
  it("syncs inheritable props to items connected after the initial sync", async () => {
    const { el, component } = await mount<Accordion>(
      <calcite-accordion
        appearance="transparent"
        icon-position="start"
        icon-type="plus-minus"
        scale="l"
      >
        <div id="shadow-host" />
      </calcite-accordion>,
    );
    await component.updateComplete;

    const shadowHost = el.querySelector("#shadow-host")!;
    const shadowRoot = shadowHost.attachShadow({ mode: "open" });
    shadowRoot.innerHTML =
      '<calcite-accordion-item heading="Accordion Title"></calcite-accordion-item>';

    const item = shadowRoot.querySelector("calcite-accordion-item") as AccordionItem["el"];
    await item.componentOnReady();

    expect(item.appearance).toBe("transparent");
    expect(item.iconPosition).toBe("start");
    expect(item.iconType).toBe("plus-minus");
    expect(item.scale).toBe("l");

    el.scale = "s";
    await component.updateComplete;

    expect(item.scale).toBe("s");
  });
});

describe("theme", () => {
  themed(() => mount(<calcite-accordion>{accordionContent}</calcite-accordion>), {
    "--calcite-accordion-background-color": [
      {
        shadowSelector: `.${CSS.accordion}`,
        targetProp: "backgroundColor",
        selector: "calcite-accordion",
      },
      {
        targetProp: "backgroundColor",
        selector: "calcite-accordion-item",
      },
    ],
    "--calcite-accordion-border-color": [
      {
        shadowSelector: `.${CSS.accordion}`,
        targetProp: "borderColor",
        selector: "calcite-accordion",
      },
      {
        shadowSelector: `.${ACCORDION_ITEM_CSS.header}`,
        targetProp: "borderColor",
        selector: "calcite-accordion-item",
      },
      {
        shadowSelector: `.${ACCORDION_ITEM_CSS.content}`,
        targetProp: "borderColor",
        selector: "calcite-accordion-item",
      },
    ],
    "--calcite-accordion-text-color": [
      {
        targetProp: "color",
        selector: "calcite-accordion-item",
      },
      {
        targetProp: "color",
        shadowSelector: `.${ACCORDION_ITEM_CSS.headerContent}`,
        selector: "calcite-accordion-item",
      },
    ],
    "--calcite-accordion-text-color-hover": [
      {
        selector: "calcite-accordion-item[expanded]",
        shadowSelector: `.${ACCORDION_ITEM_CSS.expandIcon}`,
        targetProp: "color",
      },
      {
        selector: "calcite-accordion-item[expanded]",
        shadowSelector: `.${ACCORDION_ITEM_CSS.description}`,
        targetProp: "color",
      },
    ],
    "--calcite-accordion-item-heading-text-color": [
      {
        selector: "calcite-accordion-item",
        shadowSelector: `.${ACCORDION_ITEM_CSS.heading}`,
        targetProp: "color",
      },
    ],
  });
});
