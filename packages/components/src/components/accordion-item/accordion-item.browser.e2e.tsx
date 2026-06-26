import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  focusable,
  reflects,
  hidden,
  renders,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { SLOTS } from "./resources";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-accordion-item heading="My Heading" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-accordion-item"),
    [
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
      {
        propertyName: "scale",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-accordion-item"),
    [
      {
        propertyName: "headingLevel",
        value: 2,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-accordion-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-accordion-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-accordion-item"), SLOTS);
});

describe("is focusable", () => {
  focusable(() => mount("calcite-accordion-item"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-accordion-item"));
});

describe("theme", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-accordion-item
            appearance="solid"
            description="Description"
            expanded
            heading="Heading"
            icon-end="home"
            icon-start="home"
          >
            content
          </calcite-accordion-item>,
        ),
      {
        "--calcite-accordion-item-content-space": {
          targetProp: "padding",
          shadowSelector: `.${CSS.content}`,
        },
        "--calcite-accordion-item-header-background-color": {
          targetProp: "backgroundColor",
          shadowSelector: `.${CSS.header}`,
        },
        "--calcite-accordion-item-header-background-color-hover": {
          targetProp: "backgroundColor",
          shadowSelector: `.${CSS.header}`,
          state: "hover",
        },
        "--calcite-accordion-item-header-background-color-press": {
          targetProp: "backgroundColor",
          shadowSelector: `.${CSS.header}`,
          state: { press: `calcite-accordion-item >>> .${CSS.header}` },
        },
        "--calcite-accordion-item-heading-text-color": {
          shadowSelector: `.${CSS.headerContent}`,
          targetProp: "color",
        },
      },
    );
  });
  describe("icons", () => {
    themed(
      () =>
        mount(
          <calcite-accordion-item
            description="Description"
            expanded
            heading="Heading"
            icon-end="home"
            icon-start="home"
          >
            content
          </calcite-accordion-item>,
        ),
      {
        "--calcite-accordion-item-start-icon-color": {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        "--calcite-accordion-item-end-icon-color": {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
        "--calcite-accordion-item-expand-icon-color": {
          shadowSelector: `.${CSS.expandIcon}`,
          targetProp: "color",
        },
      },
    );
  });
  describe("deprecated", () => {
    describe("default", async () => {
      themed(
        () =>
          mount(
            <calcite-accordion-item
              description="Description"
              heading="Heading"
              icon-end="home"
              icon-start="home"
            >
              content
            </calcite-accordion-item>,
          ),
        {
          "--calcite-accordion-item-text-color": [
            {
              targetProp: "color",
            },
            {
              targetProp: "color",
              shadowSelector: `.${CSS.expandIcon}`,
            },
          ],
          "--calcite-accordion-item-text-color-hover": [
            {
              targetProp: "color",
              shadowSelector: `.${CSS.heading}`,
            },
          ],
          "--calcite-accordion-item-background-color": {
            targetProp: "backgroundColor",
          },
          "--calcite-accordion-border-color": [
            {
              shadowSelector: `.${CSS.header}`,
              targetProp: "borderColor",
            },
            {
              shadowSelector: `.${CSS.content}`,
              targetProp: "borderColor",
            },
          ],
          "--calcite-accordion-item-icon-color": [
            {
              shadowSelector: `.${CSS.iconStart}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.iconEnd}`,
              targetProp: "color",
            },
          ],
          "--calcite-ui-icon-color": [
            {
              shadowSelector: `.${CSS.iconStart}`,
              targetProp: "color",
            },
            {
              shadowSelector: `.${CSS.iconEnd}`,
              targetProp: "color",
            },
          ],
        },
      );
    });
    describe("expanded", async () => {
      themed(
        () =>
          mount(
            <calcite-accordion-item
              description="Description"
              expanded
              heading="Heading"
              icon-end="home"
              icon-start="home"
            >
              content
            </calcite-accordion-item>,
          ),
        {
          "--calcite-accordion-item-text-color-hover": [
            {
              targetProp: "color",
              shadowSelector: `.${CSS.expandIcon}`,
            },
            {
              targetProp: "color",
              shadowSelector: `.${CSS.description}`,
            },
          ],
          "--calcite-accordion-item-heading-text-color": {
            selector: "calcite-accordion-item",
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
          },
        },
      );
    });
  });
});
