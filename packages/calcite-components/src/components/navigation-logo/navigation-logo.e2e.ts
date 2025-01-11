import { describe } from "vitest";
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
    const navigationLogoHtml = (props: Partial<{ active: boolean; link: boolean }> = {}): string => {
      const { active = false, link = false } = props;

      return html`<calcite-navigation-logo
        heading="Walt's Chips"
        description="Eastern Potato Chip Company"
        icon="layers"
        ${active ? "active" : ""}
        ${link ? "href=https://github.com/Esri/calcite-design-system" : ""}
      >
      </calcite-navigation-logo> `;
    };

    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-background-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
        ],
        "--calcite-navigation-logo-text-color": [
          {
            shadowSelector: `.${CSS.description}`,
            targetProp: "color",
          },
          {
            shadowSelector: `calcite-icon`,
            targetProp: "color",
          },
        ],
        "--calcite-navigation-logo-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
        },
      };

      themed(navigationLogoHtml(), tokens);
    });

    describe("default + active", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-accent-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-text-color": {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
      };

      themed(
        navigationLogoHtml({
          active: true,
        }),
        tokens,
      );
    });

    describe("with link", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-background-color": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: CSS.container } },
          },
        ],
        "--calcite-navigation-logo-text-color": [
          {
            shadowSelector: `.${CSS.description}`,
            targetProp: "color",
          },
          {
            shadowSelector: `calcite-icon`,
            targetProp: "color",
          },
          {
            shadowSelector: `calcite-icon`,
            targetProp: "color",
            state: { press: `calcite-navigation-logo >>> .${CSS.container}` },
          },
        ],
        "--calcite-navigation-logo-heading-text-color": {
          shadowSelector: `.${CSS.heading}`,
          targetProp: "color",
        },
      };

      themed(navigationLogoHtml({ link: true }), tokens);
    });

    describe("with link + active", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-accent-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-navigation-logo-text-color": {
          shadowSelector: `calcite-icon`,
          targetProp: "color",
        },
      };

      themed(
        navigationLogoHtml({
          active: true,
          link: true,
        }),
        tokens,
      );
    });
  });
});
