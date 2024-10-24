import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders, defaults } from "../../tests/commonTests";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "../../../src/components/navigation-logo/resources";

describe("calcite-navigation-logo", () => {
  describe("renders", () => {
    renders("calcite-navigation-logo", { display: "inline-flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-navigation-logo");
  });

  describe("accessible", () => {
    accessible("calcite-navigation-logo");
  });

  describe("reflects", () => {
    reflects("calcite-navigation-logo", [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "href",
        value: "#logo",
      },
      {
        propertyName: "rel",
        value: "external",
      },
      {
        propertyName: "target",
        value: "_self",
      },
      {
        propertyName: "headingLevel",
        value: 1,
      },
    ]);
  });

  describe("is focusable", () => {
    focusable(html`<calcite-navigation-logo href=" " heading="esri"></calcite-navigation-logo>`);
  });

  describe("defaults", () => {
    defaults("calcite-navigation-logo", [
      {
        propertyName: "active",
        defaultValue: undefined,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "headingLevel",
        defaultValue: undefined,
      },
    ]);
  });

  describe("theme", () => {
    describe("default", () => {
      const navigationLogoHtml = html`
        <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" icon="layers">
        </calcite-navigation-logo>
      `;

      const tokens: ComponentTestTokens = {
        "--calcite-navigation-logo-background-color": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "backgroundColor",
        },
        "--calcite-navigation-logo-background-color-hover": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        "--calcite-navigation-logo-background-color-press": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.anchor } },
        },
        "--calcite-navigation-logo-border-color": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-description-text-color": {
          shadowSelector: `.${CSS.description}`,
          targetProp: "color",
        },
        "--calcite-navigation-logo-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
        },
        "--calcite-navigation-logo-icon-color-press": {
          shadowSelector: `calcite-icon`,
          targetProp: "--calcite-icon-color",
          state: { press: { attribute: "class", value: CSS.anchor } },
        },
      };
      themed(navigationLogoHtml, tokens);
    });

    describe("active", () => {
      const navigationLogoActiveHtml = html`
        <calcite-navigation-logo
          active
          heading="Walt's Chips"
          description="Eastern Potato Chip Company"
          icon="layers"
          active
        >
        </calcite-navigation-logo>
      `;

      const tokens: ComponentTestTokens = {
        "--calcite-navigation-logo-border-color": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-icon-color-press": {
          shadowSelector: `calcite-icon`,
          targetProp: "--calcite-icon-color",
        },
      };
      themed(navigationLogoActiveHtml, tokens);
    });
  });
});
