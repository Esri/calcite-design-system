import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount, type RenderResult } from "@arcgis/lumina-compiler/testing";
import { Locator, page, userEvent } from "vitest/browser";
import { defaults, reflects, hidden, renders, focusable, accessible } from "../../tests/common";
import { canConvertToHexa, isValidHex, normalizeHex } from "../color-picker/utils";
import type { ColorPickerHexInput } from "./color-picker-hex-input";
import { CSS } from "./resources";

type MountedInput = RenderResult<ColorPickerHexInput>;

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

function getHexInput(): Locator {
  return page.getBySelector(`.${CSS.hexInput} input`);
}

async function setValue(mounted: MountedInput, value: string | null | undefined): Promise<void> {
  const { el, reRender } = mounted;

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
  mounted: MountedInput,
  hexInputChars: string,
  expectedValue: string | undefined,
  alphaChannel = false,
): Promise<void> {
  const { el } = mounted;
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

async function assertNudgeBehavior(mounted: MountedInput, initialValue: string): Promise<void> {
  const { el } = mounted;
  const alpha = el.alphaChannel ? "ff" : "";

  await el.setFocus();
  await setValue(mounted, initialValue);

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
  mounted: MountedInput,
  previousValue: string,
): Promise<void> {
  const { el } = mounted;

  await setValue(mounted, null);
  await el.setFocus();

  await userEvent.keyboard("{ArrowUp}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(mounted, null);
  await userEvent.keyboard("{ArrowDown}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(mounted, null);
  await userEvent.keyboard("{Shift>}{ArrowUp}{/Shift}");
  await expect.element(el).toHaveProperty("value", previousValue);

  await setValue(mounted, null);
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
    const mounted = await mountInput(undefined, { allowEmpty: true });

    await setValue(mounted, undefined);

    await expect.element(mounted.el).toHaveProperty("value", undefined);
    await expect.element(mounted.el).not.toHaveAttribute("value");
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
    const mounted = await mountInput(value, { alphaChannel });

    await expect.element(mounted.el).toHaveProperty("value", expectedValue);
  });

  it("ignores invalid hex values", async () => {
    const initialValue = "#b33f33";
    const mounted = await mountInput(initialValue);

    for (const invalidValue of [null, "wrong", "#", "#a", "#aa", "#aaaa", "#aaaaa"]) {
      await setValue(mounted, invalidValue);
      await expect.element(mounted.el).toHaveProperty("value", initialValue);
    }
  });

  it.each([null, "wrong", "#", "#a", "#aa", "#aaaaa", "#aaaaaaa"])(
    "ignores invalid hexa value %s",
    async (invalidValue) => {
      const initialValue = "#b33f33ff";
      const mounted = await mountInput(initialValue, { alphaChannel: true });

      await setValue(mounted, invalidValue);

      await expect.element(mounted.el).toHaveProperty("value", initialValue);
    },
  );
});

describe("blur", () => {
  it("commits shorthand hex", async () => {
    const defaultHex = "#b33f33";
    const expandedHex = "#aabbcc";
    const mounted = await mountInput(defaultHex);

    await typeHexValue("ab", "Tab");
    await expect.element(mounted.el).toHaveProperty("value", defaultHex);

    await typeHexValue("abc", "Tab");
    await expect.element(mounted.el).toHaveProperty("value", expandedHex);

    await typeHexValue("abcd", "Tab");
    await expect.element(mounted.el).toHaveProperty("value", expandedHex);
  });

  describe("alpha channel", () => {
    const defaultHexa = "#b33f33ff";

    it("does not commit incomplete shorthand hex", async () => {
      const mounted = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("ab", "Tab");

      await expect.element(mounted.el).toHaveProperty("value", defaultHexa);
    });

    it("commits shorthand hex with opaque alpha", async () => {
      const mounted = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("abc", "Tab");

      await expect.element(mounted.el).toHaveProperty("value", "#aabbccff");
    });

    it("commits shorthand hexa", async () => {
      const mounted = await mountInput(defaultHexa, { alphaChannel: true });

      await typeHexValue("abcd", "Tab");

      await expect.element(mounted.el).toHaveProperty("value", "#aabbccdd");
    });

    it("does not commit invalid hexa", async () => {
      const previousHexa = "#aabbccdd";
      const mounted = await mountInput(previousHexa, { alphaChannel: true });

      await typeHexValue("abcde", "Tab");

      await expect.element(mounted.el).toHaveProperty("value", previousHexa);
    });
  });
});

describe("input validation", () => {
  it("prevents invalid hex characters", async () => {
    const mounted = await mountInput("#b33f33");

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("zaaaz", "Enter");

    await expect.element(mounted.el).toHaveProperty("value", "#aaaaaa");
  });

  it("prevents characters beyond the maximum hex length", async () => {
    const mounted = await mountInput("#b33f33");

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("bbbbbbc", "Enter");

    await expect.element(mounted.el).toHaveProperty("value", "#bbbbbb");
  });

  it("prevents invalid hexa characters", async () => {
    const mounted = await mountInput("#b33f33", { alphaChannel: true });

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("zabcdz", "Enter");

    await expect.element(mounted.el).toHaveProperty("value", "#aabbccdd");
  });

  it("prevents characters beyond the maximum hexa length", async () => {
    const mounted = await mountInput("#b33f33", { alphaChannel: true });

    // eslint-disable-next-line @cspell/spellchecker -- testing invalid hex input
    await typeHexValue("bbbbbbbbc");

    await expect.element(mounted.el).toHaveProperty("value", "#bbbbbbbb");
  });
});

it("emits an event when the color changes via user interaction and not programmatically", async () => {
  const mounted = await mountInput("#b33f33");
  const changeHandler = vi.fn();
  mounted.el.addEventListener("calciteColorPickerHexInputChange", changeHandler);

  await setValue(mounted, "#abcdef");

  expect(changeHandler).not.toHaveBeenCalled();

  await typeHexValue("abc", "Enter");

  expect(changeHandler).toHaveBeenCalledTimes(1);
});

describe("keyboard interaction", () => {
  describe("when color value is required", () => {
    describe("hex", () => {
      const startingHex = "#b33f33";

      it("commits hex characters on Tab and Enter", async () => {
        const mounted = await mountInput(startingHex);

        await assertTabAndEnterBehavior(mounted, "b00", "#bb0000");
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(mounted, "c0ffee", "#c0ffee");
        await assertTabAndEnterBehavior(mounted, "", startingHex);
      });

      it("commits longhand hex characters when typing", async () => {
        const mounted = await mountInput(startingHex);
        const input = getHexInput();

        await userEvent.clear(input);
        await userEvent.keyboard("abc");

        await expect.element(mounted.el).toHaveProperty("value", startingHex);

        await userEvent.keyboard("def");

        await expect.element(mounted.el).toHaveProperty("value", "#abcdef");
      });

      it("prevents committing invalid hex values", async () => {
        const mounted = await mountInput(startingHex);

        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(mounted, "aabbc", startingHex);
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        await assertTabAndEnterBehavior(mounted, "aabb", startingHex);
        await assertTabAndEnterBehavior(mounted, "aa", startingHex);
        await assertTabAndEnterBehavior(mounted, "a", startingHex);
        await assertTabAndEnterBehavior(mounted, "", startingHex);
      });

      it("allows nudging RGB channels with arrow keys and Shift modifies the amount", async () => {
        const mounted = await mountInput(startingHex);

        await assertNudgeBehavior(mounted, "#000000");
      });

      describe("when empty is allowed", () => {
        it("commits hex characters on Tab and Enter", async () => {
          const mounted = await mountInput(startingHex, { allowEmpty: true });

          await assertTabAndEnterBehavior(mounted, "b00", "#bb0000");
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "c0ffee", "#c0ffee");
          await assertTabAndEnterBehavior(mounted, "", undefined);
        });

        it("prevents committing invalid hex values", async () => {
          const mounted = await mountInput(startingHex, { allowEmpty: true });

          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "aabbc", startingHex);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "aabb", startingHex);
          await assertTabAndEnterBehavior(mounted, "aa", startingHex);
          await assertTabAndEnterBehavior(mounted, "a", startingHex);
          await assertTabAndEnterBehavior(mounted, "", undefined);
        });

        it("restores the previous value when nudged with no color set", async () => {
          const mounted = await mountInput(startingHex, { allowEmpty: true });

          await assertRestoresPreviousValue(mounted, startingHex);
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
        const mounted = await mountInput(startingHexa, { alphaChannel: true });

        await assertTabAndEnterBehavior(mounted, inputValue, expectedValue, true);
      });

      it.each([
        // eslint-disable-next-line @cspell/spellchecker -- testing hex code
        { inputValue: "aabbcc", expectedValue: "#aabbccff", name: "six characters" },
        { inputValue: "ff00", expectedValue: "#ffff0000", name: "four characters" },
        { inputValue: "aab", expectedValue: "#aaaabbff", name: "three characters" },
      ])(
        "commits $name with opaque alpha on Tab and Enter",
        async ({ expectedValue, inputValue }) => {
          const mounted = await mountInput(startingHexa, { alphaChannel: true });

          await assertTabAndEnterBehavior(mounted, inputValue, expectedValue, true);
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
        const mounted = await mountInput(startingHexa, { alphaChannel: true });

        await assertTabAndEnterBehavior(mounted, inputValue, "#face0fff", true);
      });

      it("allows nudging RGB channels with arrow keys and Shift modifies the amount", async () => {
        const mounted = await mountInput(startingHexa, { alphaChannel: true });

        await assertNudgeBehavior(mounted, "#000000ff");
      });

      describe("when empty is allowed", () => {
        it("commits hexa characters on Tab and Enter", async () => {
          const mounted = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          await assertTabAndEnterBehavior(mounted, "b00", "#bb0000ff", true);
          await assertTabAndEnterBehavior(mounted, "baba", "#bbaabbaa", true);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "c0ffee", "#c0ffeeff", true);
          await assertTabAndEnterBehavior(mounted, "c0c0c0c0", "#c0c0c0c0", true);
          await assertTabAndEnterBehavior(mounted, "", undefined, true);
        });

        it("prevents committing invalid hexa values", async () => {
          const mounted = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "aabbccd", startingHexa, true);
          // eslint-disable-next-line @cspell/spellchecker -- testing hex code
          await assertTabAndEnterBehavior(mounted, "aabbcc", "#aabbccff", true);
          await assertTabAndEnterBehavior(mounted, "ff00f", "#aabbccff", true);
          await assertTabAndEnterBehavior(mounted, "ff00", "#ffff0000", true);
          await assertTabAndEnterBehavior(mounted, "aab", "#aaaabbff", true);
          await assertTabAndEnterBehavior(mounted, "aa", "#aaaabbff", true);
          await assertTabAndEnterBehavior(mounted, "a", "#aaaabbff", true);
          await assertTabAndEnterBehavior(mounted, "", undefined, true);
        });

        it("restores the previous value when nudged with no color set", async () => {
          const mounted = await mountInput(startingHexa, {
            allowEmpty: true,
            alphaChannel: true,
          });

          await assertRestoresPreviousValue(mounted, startingHexa);
        });
      });
    });
  });
});
