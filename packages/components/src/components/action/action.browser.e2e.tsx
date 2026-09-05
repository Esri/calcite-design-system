import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

import { CSS } from "./resources";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { page } from "vitest/browser";
import type { Action } from "./action";

describe("accessible", () => {
  accessible(() => mount(<calcite-action text="hello world" />));

  describe("text-enabled", () => {
    accessible(() => mount(<calcite-action text="hello world" text-enabled />));
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-action"),
    [
      {
        propertyName: "active",
        defaultValue: false,
      },
      {
        propertyName: "appearance",
        defaultValue: "transparent",
      },
      {
        propertyName: "compact", // (deprecated)
        defaultValue: false,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "indicator",
        defaultValue: false,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "textEnabled",
        defaultValue: false,
      },
      {
        propertyName: "width",
        defaultValue: "auto",
      },
      {
        propertyName: "form",
        defaultValue: undefined,
      },
      {
        propertyName: "type",
        defaultValue: "button",
      },
      {
        propertyName: "selectionAppearance",
        defaultValue: undefined,
      },
      {
        propertyName: "overflowDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-action"),
    [
      {
        propertyName: "active",
        value: true,
      },
      {
        propertyName: "alignment",
        value: "end",
      },
      {
        propertyName: "appearance",
        value: "solid",
      },
      {
        propertyName: "compact",
        value: true,
      },
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "icon",
        value: "hamburger",
      },
      {
        propertyName: "iconFlipRtl",
        value: true,
      },
      {
        propertyName: "indicator",
        value: true,
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "textEnabled",
        value: true,
      },
      {
        propertyName: "width",
        value: "full",
      },
      {
        propertyName: "type",
        value: "button",
      },
      {
        propertyName: "selectionAppearance",
        value: "neutral",
      },
      {
        propertyName: "overflowDisabled",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-action"));
});

describe("renders", () => {
  renders(() => mount("calcite-action"), { display: "flex" });
});

describe("focusable", () => {
  focusable(() => mount("calcite-action"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-action"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-action"));
});

describe("type property", () => {
  it("renders the inner button with type='button' by default", async () => {
    const { el } = await mount("calcite-action");
    const button = el.shadowRoot?.querySelector("button");
    expect(button?.type).toBe("button");
  });

  it("forwards the type property to the inner button", async () => {
    const { el, component } = await mount("calcite-action");
    el.type = "submit";
    await component.updateComplete;
    const button = el.shadowRoot?.querySelector("button");
    expect(button?.type).toBe("submit");
  });
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount<Action>(<calcite-action text="hello world" />);
    const button = page.getByRole("button");

    await expect.element(button).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(button).toHaveAttribute("aria-busy", "true");
  });

  it("should omit aria-busy on drag handle when not loading and set it when loading", async () => {
    const { reRender, el } = await mount<Action>(<calcite-action drag-handle text="hello world" />);
    const button = page.getByRole("button");

    await expect.element(button).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(button).toHaveAttribute("aria-busy", "true");
  });

  it("should use text prop for a11y attributes when text is not enabled", async () => {
    await mount(<calcite-action text="hello world" />);

    await expect.element(page.getByRole("button", { name: "hello world" })).toBeDefined();
  });

  it("should set aria-label with indicator", async () => {
    await mount(<calcite-action indicator text="hello world" />);

    await expect.element(page.getByLabelText("hello world (Indicator present)")).toBeDefined();
  });

  it("should have label", async () => {
    await mount(<calcite-action label="hi" text="hello world" />);

    await expect.element(page.getByLabelText("hi")).toBeDefined();
  });

  it("should have a indicator live region", async () => {
    const { el, reRender } = await mount("calcite-action");
    const liveRegion = page.getByRole("region");

    await expect.element(liveRegion).toHaveProperty("ariaLive", "polite");
    await expect.element(liveRegion).toBeInTheDocument();
    await expect.element(liveRegion).toHaveTextContent("");

    el.indicator = true;
    await reRender();

    await expect.element(liveRegion).toHaveProperty("ariaLive", "polite");
    await expect.element(liveRegion).toBeInTheDocument();
    await expect.element(liveRegion).toHaveTextContent("Indicator present");
  });
});

describe("themed", () => {
  describe("background color", () => {
    themed(() => mount("calcite-action"), {
      "--calcite-action-background-color": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
      },
      "--calcite-action-background-color-hover": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-action-background-color-press": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
    });
  });
  describe("text color", () => {
    themed(
      () =>
        mount(
          <calcite-action
            icon="configure-popup"
            label="hello world"
            scale="s"
            text="click-me"
            text-enabled
          />,
        ),
      {
        "--calcite-action-text-color": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
        },
        "--calcite-action-text-color-press": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
          state: "hover",
        },
      },
    );
  });
  describe("loader", () => {
    themed(() => mount(<calcite-action loading />), {
      "--calcite-action-loader-color": {
        shadowSelector: "calcite-loader",
        targetProp: "--calcite-loader-progress-color-inline",
      },
    });
  });
  describe("active", () => {
    themed(
      () =>
        mount(
          <calcite-action
            active
            icon="configure-popup"
            label="hello world"
            scale="s"
            text="click-me"
            text-enabled
          />,
        ),
      {
        "--calcite-action-text-color-press": {
          shadowSelector: `.${CSS.button}`,
          targetProp: "color",
        },
      },
    );
  });
  describe("indicator", () => {
    themed(
      () =>
        mount(
          <>
            <calcite-action id="with-text" indicator text="hello world" />
            <calcite-action icon="hamburger" id="with-icon" indicator />
          </>,
        ),
      {
        "--calcite-action-indicator-color": [
          {
            selector: "#with-text",
            shadowSelector: `.${CSS.indicatorWithoutIcon}::after`,
            targetProp: "backgroundColor",
          },
          {
            selector: "#with-icon",
            shadowSelector: `.${CSS.indicatorWithIcon}::after`,
            targetProp: "backgroundColor",
          },
        ],
      },
    );
  });
  describe("corner radius", () => {
    themed(() => mount("calcite-action"), {
      "--calcite-action-corner-radius": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
    });
  });
  describe("deprecated", () => {
    themed(() => mount(<calcite-action appearance="transparent" />), {
      "--calcite-action-background-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-corner-radius-end-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-end-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-text-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "color",
        state: "hover",
      },
    });
    themed(() => mount(<calcite-action appearance="solid" />), {
      "--calcite-action-background-color": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
      },
      "--calcite-action-background-color-hover": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: "hover",
      },
      "--calcite-action-background-color-press": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-background-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "backgroundColor",
        state: { press: { attribute: "class", value: CSS.button } },
      },
      "--calcite-action-corner-radius-end-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-end-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-end": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-corner-radius-start-start": [
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndEndRadius",
        },
        {
          targetProp: "borderEndEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderEndStartRadius",
        },
        {
          targetProp: "borderEndStartRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartEndRadius",
        },
        {
          targetProp: "borderStartEndRadius",
        },
        {
          shadowSelector: `.${CSS.button}`,
          targetProp: "borderStartStartRadius",
        },
        {
          targetProp: "borderStartStartRadius",
        },
      ],
      "--calcite-action-text-color-pressed": {
        shadowSelector: `.${CSS.button}`,
        targetProp: "color",
        state: "hover",
      },
    });
  });
});

it("sets single label when text is enabled", async () => {
  await mount(<calcite-action text="hello world" text-enabled />);

  await expect.element(page.getByRole("button")).toHaveAccessibleName("hello world");
});
