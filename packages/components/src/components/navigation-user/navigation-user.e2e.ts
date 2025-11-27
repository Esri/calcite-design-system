import { describe } from "vitest";
import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { accessible } from "../../tests/commonTests";
import { ComponentTestTokens, themed } from "../../tests/commonTests/themed";
import { CSS } from "./resources";

describe("calcite-navigation-user", () => {
  describe("accessible", () => {
    accessible(html`<calcite-navigation-user label="user"></calcite-navigation-user>`);
  });

  describe("theme", () => {
    const navigationUserHtml = (active = false): string => html`
      <calcite-navigation-user full-name="Walt McChipson" username="waltChip" ${boolean("active", active)}>
      </calcite-navigation-user>
    `;

    describe("default", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-user-avatar-corner-radius": {
          shadowSelector: `calcite-avatar`,
          targetProp: "borderRadius",
        },
        "--calcite-navigation-user-avatar-color": {
          shadowSelector: `calcite-avatar`,
          targetProp: "color",
        },
        "--calcite-navigation-background-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "backgroundColor",
        },
        "--calcite-navigation-user-full-name-text-color": {
          shadowSelector: `.${CSS.fullName}`,
          targetProp: "color",
        },
        "--calcite-navigation-user-name-text-color": {
          shadowSelector: `.${CSS.username}`,
          targetProp: "color",
        },
      };
      themed(navigationUserHtml, tokens);
    });

    describe("active", () => {
      const tokens: ComponentTestTokens = {
        "--calcite-navigation-accent-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderBlockEndColor",
        },
      };
      themed(navigationUserHtml(true), tokens);
    });
  });
});
