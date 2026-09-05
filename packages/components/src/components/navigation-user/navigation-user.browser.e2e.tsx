import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  accessible,
  scalePropagates,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-navigation-user label="user" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-navigation-user"),
    [
      {
        propertyName: "textDisabled",
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
    () => mount("calcite-navigation-user"),
    [
      {
        propertyName: "active",
        value: "true",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "textDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-navigation-user"));
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-navigation-user />, mountOptions), {
    targetSelector: "calcite-avatar",
  });
});

describe("renders", () => {
  renders(() => mount("calcite-navigation-user"), { display: "inline-flex" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-navigation-user"));
});

describe("fullName", () => {
  it("renders standalone fullName when username is not provided", async () => {
    await mount(<calcite-navigation-user fullName="John Doe" />);

    const fullName = page.getBySelector(`calcite-navigation-user .${CSS.fullName}`);
    const standaloneFullName = page.getBySelector(
      `calcite-navigation-user .${CSS.fullName}.${CSS.standalone}`,
    );
    const username = page.getBySelector(`calcite-navigation-user .${CSS.username}`);

    await expect.element(fullName).toBeInTheDocument();
    await expect.element(standaloneFullName).toBeInTheDocument();
    await expect.element(username).not.toBeInTheDocument();
  });
});

describe("theme", () => {
  const navigationUser = (active = false) => (
    <calcite-navigation-user active={active} full-name="Walt McChipson" username="waltChip" />
  );

  describe("default", () => {
    themed(() => mount(navigationUser()), {
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
    });
  });

  describe("active", () => {
    themed(() => mount(navigationUser(true)), {
      "--calcite-navigation-accent-color": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "borderBlockEndColor",
      },
    });
  });
});
