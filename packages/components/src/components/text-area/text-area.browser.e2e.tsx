import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  cancelable,
  accessible,
  defaults,
  disabled,
  focusable,
  reflects,
  hidden,
  internalLabel,
  renders,
  t9n,
  formAssociated,
  themed,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS } from "./resources";
import type { TextArea } from "./text-area";
import { afterNextFrame } from "../../tests/utils/timing";

describe("cancelable", () => {
  cancelable("calcite-text-area");
});

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-label>
        add notes
        <calcite-text-area max-length="50" name="something" required />
      </calcite-label>,
    ),
  );
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-text-area"),
    [
      {
        propertyName: "limitText",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
      {
        propertyName: "wrap",
        defaultValue: "soft",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-text-area"),
    [
      {
        propertyName: "columns",
        value: "10",
      },
      {
        propertyName: "limitText",
        value: true,
      },
      {
        propertyName: "rows",
        value: "50",
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-text-area"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-text-area`));
});

describe("renders", () => {
  renders(() => mount("calcite-text-area"), { display: "inline-block" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-text-area"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-text-area"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-text-area"));
});

describe("is form associated", () => {
  formAssociated(() => mount("calcite-text-area"), {
    testValue: "zion national park",
    expectedSubmitValue: "zion national park",
    submitsOnEnter: false,
    validation: true,
  });
});

describe("aria-live", () => {
  it("sets validation message aria-live only when host value is valid", async () => {
    const { el, reRender } = await mount(
      <calcite-text-area status="invalid" validation-message="Help" />,
    );
    const validationMessage = page
      .getBySelector("calcite-text-area calcite-input-message")
      .element() as HTMLElement;

    expect(validationMessage).toBeDefined();
    expect(validationMessage.getAttribute("aria-live")).toBe(null);

    el.ariaLive = "polite";
    await reRender();

    expect(validationMessage.getAttribute("aria-live")).toBe("polite");

    el.ariaLive = "invalid";
    await reRender();

    expect(validationMessage.getAttribute("aria-live")).toBe(null);
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-text-area placeholder="hello" />), {
      "--calcite-text-area-background-color": [
        {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "backgroundColor",
        },
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-text-area-border-color": {
        shadowSelector: `.${CSS.textArea}`,
        targetProp: "borderColor",
      },
      "--calcite-text-area-font-size": [
        {
          shadowSelector: `.${CSS.textArea}`,
          targetProp: "fontSize",
        },
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "fontSize",
        },
      ],
      "--calcite-text-area-max-height": {
        shadowSelector: `.${CSS.textArea}`,
        targetProp: "maxHeight",
      },
      "--calcite-text-area-min-height": {
        shadowSelector: `.${CSS.textArea}`,
        targetProp: "minHeight",
      },
      "--calcite-text-area-text-color": {
        shadowSelector: `.${CSS.textArea}`,
        targetProp: "color",
      },
      "--calcite-text-area-placeholder-text-color": {
        shadowSelector: `.${CSS.textArea}::placeholder`,
        targetProp: "color",
      },
      "--calcite-text-area-corner-radius": {
        shadowSelector: `.${CSS.wrapper}`,
        targetProp: "borderRadius",
      },
      "--calcite-text-area-shadow": {
        shadowSelector: `.${CSS.wrapper}`,
        targetProp: "boxShadow",
      },
      "--calcite-text-area-footer-background-color": {
        shadowSelector: `.${CSS.footer}`,
        targetProp: "backgroundColor",
      },
    });
  });

  describe("max-chars", () => {
    themed(() => mount(<calcite-text-area max-length="10" />), {
      "--calcite-text-area-divider-color": {
        shadowSelector: `.${CSS.textArea}`,
        targetProp: "borderBlockEndColor",
      },
      "--calcite-text-area-footer-border-color": [
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "borderBottomColor",
        },
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "borderLeftColor",
        },
        {
          shadowSelector: `.${CSS.footer}`,
          targetProp: "borderRightColor",
        },
      ],
    });
  });

  describe("over limit", () => {
    themed(() => mount(<calcite-text-area max-length="4" value="12345" />), {
      "--calcite-text-area-character-limit-text-color": {
        shadowSelector: `.${CSS.characterLimit}`,
        targetProp: "color",
      },
    });
  });
});

it("does not grow textarea height on repeated key presses", async () => {
  const { el } = await mount<TextArea>(
    <calcite-text-area label-text="Description" limit-text max-length="600" />,
  );

  const textArea = page.elementLocator(el).getByRole("textbox").first();
  await userEvent.click(textArea);

  const initialHeight = textArea.element().getBoundingClientRect().height;

  await userEvent.keyboard("aaaaaaaaaa");
  await afterNextFrame();

  const finalHeight = textArea.element().getBoundingClientRect().height;
  expect(Math.abs(finalHeight - initialHeight)).toBeLessThanOrEqual(1);
  expect(el.value).toBe("aaaaaaaaaa");
});
