import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it } from "vitest";
import { CSS } from "./resources";
import {
  defaults,
  focusable,
  hidden,
  t9n,
  disabled,
  renders,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { afterNextFrame } from "../../tests/utils/timing";

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount(<calcite-button>Continue</calcite-button>));
  });

  describe("href", () => {
    accessible(() => mount(<calcite-button href="/">Continue</calcite-button>));
  });

  describe("style props", () => {
    accessible(() =>
      mount(
        <calcite-button appearance="outline" kind="danger" scale="l" width="half">
          Continue
        </calcite-button>,
      ),
    );
  });

  describe("href and target", () => {
    accessible(() =>
      mount(
        <calcite-button href="google.com" rel="noopener noreferrer" target="_blank">
          Continue
        </calcite-button>,
      ),
    );
  });

  describe("icons and loading", () => {
    accessible(() =>
      mount(
        <calcite-button icon-end="plus" icon-start="plus" loading>
          Continue
        </calcite-button>,
      ),
    );
  });
});

describe("renders", () => {
  renders(() => mount("calcite-button"), { display: "inline-block" });
});

it("propagates aria-expanded attribute changes to the internal button", async () => {
  const { el } = await mount<"calcite-button">(<calcite-button>Continue</calcite-button>);
  const button = el.shadowRoot.querySelector("button")!;

  el.setAttribute("aria-expanded", "true");
  await afterNextFrame();
  expect(button.getAttribute("aria-expanded")).toBe("true");

  el.removeAttribute("aria-expanded");
  await afterNextFrame();
  expect(button).not.toHaveAttribute("aria-expanded");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-button"),
    [
      {
        propertyName: "alignment",
        defaultValue: "center",
      },
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "kind",
        defaultValue: "brand",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "download",
        defaultValue: false,
      },
      {
        propertyName: "href",
        defaultValue: undefined,
      },
      {
        propertyName: "iconEnd",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: undefined,
      },
      {
        propertyName: "iconStart",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "name",
        defaultValue: undefined,
      },
      {
        propertyName: "rel",
        defaultValue: undefined,
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "round",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "splitChild",
        defaultValue: false,
      },
      {
        propertyName: "target",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-button"));
});

describe("focusable", () => {
  focusable(() => mount("calcite-button"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-button"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-button"));
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-button"), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("loading", () => {
    themed(() => mount(<calcite-button loading />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-loader-color": {
        shadowSelector: `.${CSS.loadingIn}`,
        targetProp: "color",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("outline", () => {
    themed(() => mount(<calcite-button appearance="outline" />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("outline-fill", () => {
    themed(() => mount(<calcite-button appearance="outline-fill" />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("solid", () => {
    themed(() => mount(<calcite-button appearance="solid" />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("transparent", () => {
    themed(() => mount(<calcite-button appearance="transparent" />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("icons", () => {
    themed(() => mount(<calcite-button icon-end="layer" icon-start="layer" />), {
      "--calcite-button-background-color": {
        shadowSelector: "button",
        targetProp: "backgroundColor",
      },
      "--calcite-button-border-color": {
        shadowSelector: "button",
        targetProp: "borderColor",
      },
      "--calcite-button-corner-radius": {
        shadowSelector: "button",
        targetProp: "borderRadius",
      },
      "--calcite-button-icon-color": [
        {
          shadowSelector: `.${CSS.iconStart}`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.iconEnd}`,
          targetProp: "color",
        },
      ],
      "--calcite-button-shadow": {
        shadowSelector: "button",
        targetProp: "boxShadow",
      },
      "--calcite-button-text-color": {
        shadowSelector: "button",
        targetProp: "color",
      },
    });
  });
  describe("deprecated", () => {
    themed(() => mount(<calcite-button icon-end="layer" icon-start="layer" />), {
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
    });
  });
});
