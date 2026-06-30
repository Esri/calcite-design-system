import { describe } from "vitest";
import { html } from "../../../support/formatting";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

describe("theme", () => {
  const navigationHtml = html`
    <calcite-navigation>
      <calcite-navigation-logo
        heading="Walt's Chips"
        description="Eastern Potato Chip Company"
        icon="layers"
        slot="logo"
      >
      </calcite-navigation-logo>
      <calcite-navigation-user slot="user" full-name="Walt McChipson" username="waltChip"> </calcite-navigation-user>
      <calcite-navigation slot="navigation-secondary">
        <calcite-menu slot="content-start">
          <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
      <calcite-navigation slot="navigation-tertiary">
        <calcite-menu slot="content-end">
          <calcite-menu-item breadcrumb text="All Routes" icon-start="book" text-enabled></calcite-menu-item>
        </calcite-menu>
      </calcite-navigation>
    </calcite-navigation>
  `;

  describe("default", () => {
    const tokens: ComponentTestTokens = {
      "--calcite-navigation-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-navigation-width": {
        shadowSelector: `.${CSS.containerContent}`,
        targetProp: "width",
      },
      "--calcite-navigation-border-color": [
        {
          shadowSelector: `.${CSS.primary}`,
          targetProp: "borderBlockEndColor",
        },
        {
          shadowSelector: `.${CSS.secondary}`,
          targetProp: "borderBlockEndColor",
        },
        {
          shadowSelector: `.${CSS.tertiary}`,
          targetProp: "borderBlockEndColor",
        },
      ],
    };
    themed(navigationHtml, tokens);
  });
});
