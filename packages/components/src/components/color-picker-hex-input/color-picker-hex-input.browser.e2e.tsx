import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, reflects, hidden, renders, focusable, accessible } from "../../tests/common";
import { canConvertToHexa, isValidHex, normalizeHex } from "../color-picker/utils";
import type { ColorPickerHexInput } from "./color-picker-hex-input";
import { CSS } from "./resources";

type MountedInput = Awaited<ReturnType<typeof mount<ColorPickerHexInput>>>;
type ColorPickerHexInputElement = ColorPickerHexInput["el"];
type ReRender = MountedInput["reRender"];

async function mountInput(
  value?: string,
  options: { allowEmpty?: boolean; alphaChannel?: boolean } = {},
): Promise<MountedInput> {
  return mount<ColorPickerHexInput>(
    <calcite-color-picker-hex-input
      allowEmpty={options.allowEmpty}
      alphaChannel={options.alphaChannel}
      value={value}
    />,
  );
}

function getHexInput() {
  return page.getBySelector(`.${CSS.hexInput} input`);
}

async function setValue(
  el: ColorPickerHexInputElement,
  reRender: ReRender,
  value: string | null | undefined,
): Promise<void> {
  // @ts-expect-error -- testing unsupported values
  el.value = value;
  await reRender();
}

async function typeHexValue(text: string, commitKey?: "Enter" | "Tab"): Promise<void> {
  const input = getHexInput();
  await userEvent.clear(input);

  if (text) {
    await userEvent.keyboard(text);
  }

  if (commitKey) {
    await userEvent.keyboard(`{${commitKey}}`);
  }
}

async function assertTabAndEnterBehavior(
  el: ColorPickerHexInputElement,
  hexInputChars: string,
  expectedValue: string | undefined,
  alphaChannel = false,
): Promise<void> {
  const normalizedInputHex = normalizeHex(hexInputChars);
  const resetHex = alphaChannel ? "#face0fff" : "#efface";

  if (normalizedInputHex === resetHex) {
    throw new Error(`input hex (${hexInputChars}) cannot be the same as reset value (${resetHex})`);
  }

  expectedValue =
    expectedValue === undefined ||
    (alphaChannel
      ? isValidHex(normalizedInputHex, true) || canConvertToHexa(normalizedInputHex)
      : isValidHex(normalizedInputHex))
      ? expectedValue
      : resetHex;

  await typeHexValue(resetHex, "Enter");
  await expect.element(el).toHaveProperty("value", resetHex);

  await typeHexValue(hexInputChars, "Enter");
  await expect.element(el).toHaveProperty("value", expectedValue);

  await typeHexValue(resetHex, "Enter");
  await expect.element(el).toHaveProperty("value", resetHex);

  await typeHexValue(hexInputChars, "Tab");
  await expect.element(el).toHaveProperty("value", expectedValue);
}

async function assertNudgeBehavior(
  el: ColorPickerHexInputElement,
  reRender: ReRender,
  initialValue: string,
): Promise<void> {
  const alpha = el.alphaChannel ? "ff" : "";

  await el.setFocus();
  await setValue(el, reRender, initialValue);

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(el).toHaveProperty("value", `#010101${alpha}`);

  await userEvent.keyboard("{ArrowDown}");
  await expect.element(el).toHaveProperty("value", initialValue);

  await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");
  await expect.element(el).toHaveProperty("value", `#0a0a0a${alpha}`);

  await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
  await expect.element(el).toHaveProperty("value", initialValue);
}

async function assertRestoresPreviousValue(
  el: ColorPickerHexInputElement,
  reRender: ReRender,
  previousValue: string,
): Promise<void> {
  await setValue(el, reRender, null);
  await el.setFocus();

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(el, reRender, null);
  await userEvent.keyboard("{ArrowDown}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(el, reRender, null);
  await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(el, reRender, null);
  await userEvent.keyboard("{Shift>}{ArrowDown}{/Shift}");
  await expect.element(el).toHaveProperty("value", previousValue);
}

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-color-picker-hex-input"));
  });

  describe("with color", () => {
    accessible(() => mount(<calcite-color-picker-hex-input value="#c0ffee" />));
  });

  describe("empty", () => {
    accessible(() => mount(<calcite-color-picker-hex-input allow-empty value="" />));
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-color-picker-hex-input"),
    [
      {
        propertyName: "allowEmpty",
        defaultValue: false,
      },
      {
        propertyName: "alphaChannel",
        defaultValue: false,
      },
      {
        propertyName: "value",
        defaultValue: "#000000",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-color-picker-hex-input"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-color-picker-hex-input"),
    [
      {
        propertyName: "value",
        value: "#ffffff",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-color-picker-hex-input"));
});

describe("renders", () => {
  renders(() => mount("calcite-color-picker-hex-input"), { display: "block" });
});

describe("value", () => {
  it("supports no color", async () => {
    const { el, reRender } = await mountInput(undefined, { allowEmpty: true });

    await setValue(el, reRender, undefined);

    await expect.element(el).toHaveProperty("value", undefined);
    await expect.element(el).not.toHaveAttribute("value");
    await expect.element(getHexInput()).toHaveValue("");
  });

  it.each([
    { alphaChannel: false, expectedValue: "#aabbcc", value: "#abc" },
    { alphaChannel: true, expectedValue: "#aabbccdd", value: "#abcd" },
    { alphaChannel: false, expectedValue: "#fafafa", value: "#fafafa" },
    { alphaChannel: true, expectedValue: "#fafafafa", value: "#fafafafa" },
  ])("accepts $value", async ({ alphaChannel, expectedValue, value }) => {
    const { el, reRender } = await mountInput(undefined, { alphaChannel });

    el.value = value;
    await reRender();

    await expect.element(el).toHaveProperty("value", expectedValue);
  });

  it.each([
    { alphaChannel: false, expectedValue: "#ff00ff", value: "#f0f" },
    { alphaChannel: true, expectedValue: "#ff00ff00", value: "#f0f0" },
  ])("normalizes $value when initialized", async ({ alphaChannel, expectedValue, value }) => {
    const { el } = await mountInput(value, { alphaChannel });

    await expect.element(el).toHaveProperty("value", expectedValue);
  });

  it("ignores invalid hex values", async () => {
    const initialValue = "#b33f33";
    const { el, reRender } = await mountInput(initialValue);

    for (const invalidValue of [null, "wrong", "#", "#a", "#aa", "#aaaa", "#aaaaa"]) {
      await setValue(el, reRender, invalidValue);
      await expect.element(el).toHaveProperty("value", initialValue);
    }
  });

  it.each([null, "wrong", "#", "#a", "#aa", "#aaaaa", "#aaaaaaa"])(
    "ignores invalid hexa value %s",
    async (invalidValue) => {
      const initialValue = "#b33f33ff";
      const { el, reRender } = await mountInput(initialValue, { alphaChannel: true });

      await setValue(el, reRender, invalidValue);

      await expect.element(el).toHaveProperty("value", initialValue);
    },
  );
});

describe("blur", () => {
  it("commits shorthand hex", async () => {
    const defaultHex = "#b33f33";
    const expandedHex = "#aabbcc";
    const { el } = await mountInput(defaultHex);

    await typeHexValue("ab", "Tab");
    await expect.element(el).toHaveProperty("value", defaultHex);

    await typeHexValue("abc", "Tab");
    await expect.element(el).toHaveProperty("value", expandedHex);

    await typeHexValue("abcd", "Tab");
    await expect.element(el).toHaveProperty("value", expandedHex);
  });

  describe("alpha channel", () => {
    const defaultHexa = "#b33f33ff";

    it("does not commit incomplete shorthand hex", async () => {
      const { el } = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("ab", "Tab");

      await expect.element(el).toHaveProperty("value", defaultHexa);
    });

    it("commits shorthand hex with opaque alpha", async () => {
      const { el } = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("abc", "Tab");

      await expect.element(el).toHaveProperty("value", "#aabbccff");
    });

    it("commits shorthand hexa", async () => {
      const { el } = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("abcd", "Tab");

      await expect.element(el).toHaveProperty("value", "#aabbccdd");
    });

    it("does not commit invalid hexa", async () => {
      const previousHexa = "#aabbccdd";
      const { el } = await mountInput(previousHexa, { alphaChannel: true });

      await typeHexValue("abcde", "Tab");

      await expect.element(el).toHaveProperty("value", previousHexa);
    });
  });
});

describe("input validation", () => {
  it("prevents invalid hex characters", async () => {
    const { el } = await mountInput("#b33f33");

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("zaaaz", "Enter");

    await expect.element(el).toHaveProperty("value", "#aaaaaa");
  });

  it("prevents characters beyond the maximum hex length", async () => {
    const { el } = await mountInput("#b33f33");

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("bbbbbbc", "Enter");

    await expect.element(el).toHaveProperty("value", "#bbbbbb");
  });

  it("prevents invalid hexa characters", async () => {
    const { el } = await mountInput("#b33f33", { alphaChannel: true });

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("zabcdz", "Enter");

    await expect.element(el).toHaveProperty("value", "#aabbccdd");
  });

  it("prevents characters beyond the maximum hexa length", async () => {
    const { el } = await mountInput("#b33f33", { alphaChannel: true });

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("bbbbbbbbc");

    await expect.element(el).toHaveProperty("value", "#bbbbbbbb");
  });
});

it("emits an event when the color changes via user interaction and not programmatically", async () => {
  const { el, reRender } = await mountInput("#b33f33");
  const changeHandler = vi.fn();
  el.addEventListener("calciteColorPickerHexInputChange", changeHandler);

  await setValue(el, reRender, "#abcdef");

  expect(changeHandler).not.toHaveBeenCalled();

  await typeHexValue("abc", "Enter");

  expect(changeHandler).toHaveBeenCalledTimes(1);
});

describe("keyboard interaction", () => {
  describe("when color value is required", () => {
    describe("hex", () => {
      const startingHex = "#b33f33";

      it("commits hex characters on Tab and Enter", async () => {
        const { el } = await mountInput(startingHex);

        await assertTabAndEnterBehavior(el, "b00", "#bb0000");
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(el, "c0ffee", "#c0ffee");
        await assertTabAndEnterBehavior(el, "", startingHex);
      });

      it("commits longhand hex characters when typing", async () => {
        const { el } = await mountInput(startingHex);
        const input = getHexInput();

        await userEvent.clear(input);
        await userEvent.keyboard("abc");

        await expect.element(el).toHaveProperty("value", startingHex);

        await userEvent.keyboard("def");

        await expect.element(el).toHaveProperty("value", "#abcdef");
      });

      it("prevents committing invalid hex values", async () => {
        const { el } = await mountInput(startingHex);

        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(el, "aabbc", startingHex);
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(el, "aabb", startingHex);
        await assertTabAndEnterBehavior(el, "aa", startingHex);
        await assertTabAndEnterBehavior(el, "a", startingHex);
        await assertTabAndEnterBehavior(el, "", startingHex);
      });

      it("allows nudging RGB channels with arrow keys and Shift modifies the amount", async () => {
        const { el, reRender } = await mountInput(startingHex);

        await assertNudgeBehavior(el, reRender, "#000000");
      });

      describe("when empty is allowed", () => {
        it("commits hex characters on Tab and Enter", async () => {
          const { el } = await mountInput(startingHex, { allowEmpty: true });

          await assertTabAndEnterBehavior(el, "b00", "#bb0000");
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "c0ffee", "#c0ffee");
          await assertTabAndEnterBehavior(el, "", undefined);
        });

        it("prevents committing invalid hex values", async () => {
          const { el } = await mountInput(startingHex, { allowEmpty: true });

          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "aabbc", startingHex);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "aabb", startingHex);
          await assertTabAndEnterBehavior(el, "aa", startingHex);
          await assertTabAndEnterBehavior(el, "a", startingHex);
          await assertTabAndEnterBehavior(el, "", undefined);
        });

        it("restores the previous value when nudged with no color set", async () => {
          const { el, reRender } = await mountInput(startingHex, { allowEmpty: true });

          await assertRestoresPreviousValue(el, reRender, startingHex);
        });
      });
    });

    describe("hexa", () => {
      const startingHexa = "#ff00ff00";

      it.each([
        { inputValue: "b00", expectedValue: "#bb0000ff", name: "shorthand hex" },
        { inputValue: "abcd", expectedValue: "#aabbccdd", name: "shorthand hexa" },
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        { inputValue: "c0ffee", expectedValue: "#c0ffeeff", name: "longhand hex" },
        { inputValue: "b0b0b0b0", expectedValue: "#b0b0b0b0", name: "longhand hexa" },
        { inputValue: "", expectedValue: startingHexa, name: "empty input" },
      ])("commits $name on Tab and Enter", async ({ expectedValue, inputValue }) => {
        const { el } = await mountInput(startingHexa, { alphaChannel: true });

        await assertTabAndEnterBehavior(el, inputValue, expectedValue, true);
      });

      it.each([
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        { inputValue: "aabbcc", expectedValue: "#aabbccff", name: "six characters" },
        { inputValue: "ff00", expectedValue: "#ffff0000", name: "four characters" },
        { inputValue: "aab", expectedValue: "#aaaabbff", name: "three characters" },
      ])(
        "commits $name with opaque alpha on Tab and Enter",
        async ({ expectedValue, inputValue }) => {
          const { el } = await mountInput(startingHexa, { alphaChannel: true });

          await assertTabAndEnterBehavior(el, inputValue, expectedValue, true);
        },
      );

      it.each([
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        { inputValue: "aabbccd", name: "seven characters" },
        { inputValue: "ff00f", name: "five characters" },
        { inputValue: "aa", name: "two characters" },
        { inputValue: "a", name: "one character" },
        { inputValue: "", name: "empty input" },
      ])("prevents committing $name as a hexa value", async ({ inputValue }) => {
        const { el } = await mountInput(startingHexa, { alphaChannel: true });

        await assertTabAndEnterBehavior(el, inputValue, "#face0fff", true);
      });

      it("allows nudging RGB channels with arrow keys and Shift modifies the amount", async () => {
        const { el, reRender } = await mountInput(startingHexa, { alphaChannel: true });

        await assertNudgeBehavior(el, reRender, "#000000ff");
      });

      describe("when empty is allowed", () => {
        it.skip("commits hexa characters on Tab and Enter", async () => {
          const { el } = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          await assertTabAndEnterBehavior(el, "b00", "#bb0000ff", true);
          await assertTabAndEnterBehavior(el, "baba", "#bbaabbaa", true);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "c0ffee", "#c0ffeeff", true);
          await assertTabAndEnterBehavior(el, "c0c0c0c0", "#c0c0c0c0", true);
          await assertTabAndEnterBehavior(el, "", undefined, true);
        });

        it.skip("prevents committing invalid hexa values", async () => {
          const { el } = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "aabbccd", startingHexa, true);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(el, "aabbcc", "#aabbccff", true);
          await assertTabAndEnterBehavior(el, "ff00f", "#aabbccff", true);
          await assertTabAndEnterBehavior(el, "ff00", "#ffff0000", true);
          await assertTabAndEnterBehavior(el, "aab", "#aaaabbff", true);
          await assertTabAndEnterBehavior(el, "aa", "#aaaabbff", true);
          await assertTabAndEnterBehavior(el, "a", "#aaaabbff", true);
          await assertTabAndEnterBehavior(el, "", undefined, true);
        });

        it("restores the previous value when nudged with no color set", async () => {
          const { el, reRender } = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          await assertRestoresPreviousValue(el, reRender, startingHexa);
        });
      });
    });
  });
});
