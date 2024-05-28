import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, reflects, renders, defaults } from "../../tests/commonTests";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

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
    const navigationLogoHtml = html`
      <calcite-navigation-logo heading="Walt's Chips" description="Eastern Potato Chip Company" icon="layers">
      </calcite-navigation-logo>
    `;

    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-logo-background-color": {
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "backgroundColor",
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
          shadowSelector: `.${CSS.anchor}`,
          targetProp: "color",
        },
        "--calcite-navigation-logo-icon-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
        "--calcite-navigation-logo-text-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
      };
      themed(navigationLogoHtml, tokens);
    });
  });
});
