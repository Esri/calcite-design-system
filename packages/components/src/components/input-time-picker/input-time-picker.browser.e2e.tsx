import { Fragment, h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  defaults,
  disabled,
  focusable,
  hidden,
  internalLabel,
  labelable,
  reflects,
  renders,
  t9n,
  openClose,
  formAssociated,
  accessible,
  scalePropagates,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { supportedNlsLocales } from "../date-picker/utils";
import {
  formatTimePart,
  getLocaleHourFormat,
  getMeridiemOrder,
  localizeTimeString,
} from "../../utils/time";
import { letterKeys } from "../../utils/key";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS as TimePickerCSS } from "../time-picker/resources";
import { CSS as CLEAR_BUTTON_CSS } from "../functional/ClearButton";
import { CSS } from "./resources";
import { InputTimePicker } from "./input-time-picker";

mockConsole();

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-input-time-picker", mountOptions));
});

describe("accessible", () => {
  describe("default", () => {
    accessible(() => mount("calcite-input-time-picker"));
  });

  describe("with label", () => {
    accessible(() => mount(<calcite-input-time-picker label="Input Time Picker" />));
  });

  describe("using seconds", () => {
    accessible(() => mount(<calcite-input-time-picker step={1} value="00:00:00" />));
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-input-time-picker"),
    [
      { propertyName: "clearable", defaultValue: false },
      { propertyName: "placeholder", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "overlayPositioning", defaultValue: "absolute" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-input-time-picker />, mountOptions), {
    targetSelector: "calcite-time-picker",
  });
});

describe("is focusable", () => {
  describe("should focus the first focusable element when setFocus is called (ltr)", () => {
    focusable(() => mount("calcite-input-time-picker"), {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });

  describe("should focus the first focusable element when placeholder text is set", () => {
    focusable(() => mount(<calcite-input-time-picker placeholder="Fill me in" />), {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });

  it("should focus the first input in reading order (hour) when mouse is pressed on any input and the placeholder text is visible", async () => {
    await mount(
      <calcite-input-time-picker hour-format="12" placeholder="Fill me in" step={0.001} />,
    );
    const firstInput = await page.getByRole("spinbutton", { name: "Hour" }).findElement();
    const getActiveElement = () => document?.activeElement?.shadowRoot?.activeElement;

    await page.getByRole("combobox").click();
    await expect(getActiveElement()).toBe(firstInput);

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");

    await page.getByRole("spinbutton", { name: "AM/PM" }).click();
    await expect(getActiveElement()).toBe(firstInput);

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");

    await page.getByRole("spinbutton", { name: "Fractional second" }).click();
    await expect(getActiveElement()).toBe(firstInput);

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");

    await page.getByRole("spinbutton", { name: "Second" }).first().click();
    await expect(getActiveElement()).toBe(firstInput);

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");

    await page.getByRole("spinbutton", { name: "Minute" }).click();
    await expect(getActiveElement()).toBe(firstInput);

    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");

    await page.getByRole("spinbutton", { name: "Hour" }).click();
    await expect(getActiveElement()).toBe(firstInput);
  });

  describe("In Arabic RTL should focus the meridiem when setFocus is called", () => {
    focusable(() => mount(<calcite-input-time-picker dir="rtl" lang="ar" />), {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.meridiem}`,
    });
  });
});

describe.skip("openClose", () => {
  openClose((mountOptions) => mount("calcite-input-time-picker", mountOptions));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-input-time-picker"),
    [
      { propertyName: "open", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "status", value: "invalid" },
      { propertyName: "validationIcon", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-input-time-picker"));
});

describe("internal label", () => {
  internalLabel(() => mount("calcite-input-time-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-input-time-picker"), { display: "inline-block" });

  describe("renders with en-us lowercase locale code", () => {
    renders(() => mount(<calcite-input-time-picker lang="en-us" />), {
      display: "inline-block",
    });
  });

  describe("renders with base lang when region code is unsupported", () => {
    renders(() => mount(<calcite-input-time-picker lang="nl-nl" />), {
      display: "inline-block",
    });
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-input-time-picker"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input-time-picker"));
});

describe("clearable", () => {
  const clearButtonSelector = `calcite-input-time-picker .${CLEAR_BUTTON_CSS.container}`;
  const getClearButtons = (): Element[] => page.getBySelector(clearButtonSelector).elements();

  it("does not render clear button when value is empty", async () => {
    await mount<InputTimePicker>(<calcite-input-time-picker clearable value="" />);

    expect(getClearButtons()).toHaveLength(0);
  });

  it("renders clear button when value is set", async () => {
    await mount<InputTimePicker>(<calcite-input-time-picker clearable value="10:37" />);

    expect(getClearButtons()).toHaveLength(1);
  });

  it("does not render clear button when readOnly is true", async () => {
    await mount<InputTimePicker>(<calcite-input-time-picker clearable readOnly value="10:37" />);

    expect(getClearButtons()).toHaveLength(0);
  });

  it("does not render clear button when disabled is true", async () => {
    await mount<InputTimePicker>(<calcite-input-time-picker clearable disabled value="10:37" />);

    expect(getClearButtons()).toHaveLength(0);
  });

  it("clears value and emits change when clear button is clicked", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker clearable value="10:37" />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

    await userEvent.click(page.getBySelector(clearButtonSelector));

    await expect.element(el).toHaveProperty("value", "");
    expect(changeEventHandler).toHaveBeenCalledTimes(1);
  });

  it("renders clear button for required value and clearing sets validity.valueMissing", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker clearable required value="10:37" />,
    );

    expect(getClearButtons()).toHaveLength(1);
    expect(el.validity.valueMissing).toBe(false);

    await userEvent.click(page.getBySelector(clearButtonSelector));
    await expect.element(el).toHaveProperty("value", "");

    expect(el.validity.valueMissing).toBe(true);
  });

  it("clears value and emits change when Escape is pressed while closed", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker clearable value="10:37" />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

    await userEvent.click(page.getByRole("spinbutton", { name: "Hour" }));
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "");
    expect(changeEventHandler).toHaveBeenCalledTimes(1);
  });

  it("closes when Escape is pressed while open and clears on second Escape", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker clearable open value="10:37" />,
    );
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

    await userEvent.click(page.getByRole("combobox"));
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("open", false);
    await expect.element(el).toHaveProperty("value", "10:37");
    expect(changeEventHandler).toHaveBeenCalledTimes(0);

    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "");
    expect(changeEventHandler).toHaveBeenCalledTimes(1);
  });
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-input-time-picker"), {
    testValue: "03:23",
    submitsOnEnter: true,
    validation: true,
    validUserInputTestValue: "03:23 AM",
    inputType: "time",
  });
});

function normalizeWhitespace(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  const whitespaceRegexPattern = /[\s\u00A0\u202f]/g; // some locales like es and ca contain narrow and regular non-breaking space characters, so we remove them to make text assertions more uniform.
  return value.replaceAll(whitespaceRegexPattern, "");
}

async function assertDisplayedTime(value: string | null): Promise<void> {
  const el = page.getBySelector("calcite-input-time-picker").element() as InputTimePicker["el"];
  await el.manager.component.updateComplete;
  const displayedValue = normalizeWhitespace(el.shadowRoot!.textContent);

  // ignoring whitespace in the assertion since some locales don't space the meridiem away from the rest of the value.
  expect(displayedValue).toBe(normalizeWhitespace(value));
}

describe("l10n", () => {
  describe("arabic", () => {
    it("localizes initial display value in arab numbering system", async () => {
      const { el } = await mount(
        <calcite-input-time-picker lang="ar" numbering-system="arab" step={1} value="14:02:30" />,
      );
      const changeEventHandler = vi.fn();
      el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

      expect(changeEventHandler).toHaveBeenCalledTimes(0);
      await assertDisplayedTime("٠٢:٠٢:٣٠ م");
      await expect.element(el).toHaveProperty("value", "14:02:30");
    });

    it("committing typed value works as expected in arab numbering system", async () => {
      const { el } = await mount<InputTimePicker>(
        <calcite-input-time-picker lang="ar" numbering-system="arab" step={1} />,
      );
      const changeEventHandler = vi.fn();
      el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

      await userEvent.keyboard("{Tab}");
      await userEvent.keyboard("2");
      await userEvent.keyboard("{Tab}");
      await userEvent.keyboard("45");
      await userEvent.keyboard("{Tab}");
      await userEvent.keyboard("30");
      await userEvent.keyboard("{Tab}");
      await userEvent.keyboard("p");
      await userEvent.keyboard("{Enter}");

      await assertDisplayedTime("٠٢:٤٥:٣٠ م");
      await expect.element(el).toHaveProperty("value", "14:45:30");
      expect(changeEventHandler).toHaveBeenCalledTimes(1);
    });

    it("value displays correctly in the input when it is directly changed for arabic lang and arab numberingSystem", async () => {
      const locale = "ar";
      const numberingSystem = "arab";
      const step = 1;

      const { el } = await mount<InputTimePicker>(
        <calcite-input-time-picker lang={locale} numbering-system={numberingSystem} step={step} />,
      );

      const date = new Date(0);
      date.setHours(13);
      date.setMinutes(59);
      date.setSeconds(59);

      const expectedValue = date.toISOString().slice(11, 19);
      const expectedInputValue = localizeTimeString({
        value: expectedValue,
        locale,
        numberingSystem,
        step,
      });

      el.value = expectedValue;

      await expect.element(el).toHaveProperty("value", expectedValue);
      await assertDisplayedTime(expectedInputValue);
    });
  });

  supportedNlsLocales.forEach((locale) => {
    if (locale !== "es") {
      return;
    }
    const localeHourFormat = getLocaleHourFormat(locale);
    const meridiemOrder = getMeridiemOrder(locale);
    const step = 0.001;
    const hour = CSS.hour;
    const minute = CSS.minute;
    const second = CSS.second;
    const fractionalSecond = CSS.fractionalSecond;
    const meridiem = CSS.meridiem;

    describe(`${locale} (${localeHourFormat}-hour)`, () => {
      it(`uses the locale's preferred setting when hour-format="user"`, async () => {
        const initialDelocalizedValue = "14:02:30.001";

        await mount(
          <>
            <calcite-input-time-picker
              focus-trap-disabled
              lang={locale}
              step={step}
              value={initialDelocalizedValue}
            />
            <input placeholder={locale} />
          </>,
        );

        const expectedLocalizedInitialValue = localizeTimeString({
          includeSeconds: true,
          locale,
          step,
          value: initialDelocalizedValue,
        });

        expect(initialDelocalizedValue).toBe("14:02:30.001");
        await assertDisplayedTime(expectedLocalizedInitialValue);
      });

      function getExpectedPartSelectorFocusOrder(meridiemOrder: false | number = false): string[] {
        const order = [`.${hour}`, `.${minute}`, `.${second}`, `.${fractionalSecond}`];

        if (meridiemOrder !== false) {
          if (meridiemOrder === 0) {
            order.unshift(`.${meridiem}`);
          } else {
            order.push(`.${meridiem}`);
          }
        }

        return order;
      }

      describe("12-hour format", () => {
        it("supports display and editing in localized 12-hour format", async () => {
          const initialValue = "00:00:00.000";

          const { el } = await mount<InputTimePicker>(
            <>
              <calcite-input-time-picker
                focus-trap-disabled
                hour-format="12"
                lang={locale}
                step={step}
                value={initialValue}
              />
              <input id="blurTarget" placeholder={locale} />
            </>,
          );

          const hourInput = page.getBySelector(`calcite-input-time-picker .${hour}`);
          const minuteInput = page.getBySelector(`calcite-input-time-picker .${minute}`);
          const secondInput = page.getBySelector(`calcite-input-time-picker .${second}`);
          const fractionalSecondInput = page.getBySelector(
            `calcite-input-time-picker .${fractionalSecond}`,
          );
          const meridiemInput = page.getBySelector(`calcite-input-time-picker .${meridiem}`);
          const blurTarget = page.getBySelector("#blurTarget");
          const changeEventHandler = vi.fn();
          el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

          expect(changeEventHandler).toHaveBeenCalledTimes(0);

          const initialDelocalizedValue = el.value;
          const expectedLocalizedInitialValue = localizeTimeString({
            hour12: true,
            includeSeconds: true,
            locale,
            step,
            value: initialDelocalizedValue,
          });

          expect(initialDelocalizedValue).toBe(initialValue);
          await assertDisplayedTime(expectedLocalizedInitialValue);

          await userEvent.click(hourInput.first());
          await userEvent.keyboard("{ArrowDown}");

          expect(changeEventHandler).toHaveBeenCalledTimes(0);
          expect(el).toHaveProperty("value", "23:00:00.000");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:00:00.000",
            }),
          );

          await userEvent.click(minuteInput.first());
          await userEvent.keyboard("{ArrowDown}");

          expect(changeEventHandler).toHaveBeenCalledTimes(0);
          expect(el).toHaveProperty("value", "23:59:00.000");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:59:00.000",
            }),
          );

          await userEvent.click(secondInput.first());
          await userEvent.keyboard("{ArrowDown}");

          expect(changeEventHandler).toHaveBeenCalledTimes(0);
          expect(el).toHaveProperty("value", "23:59:59.000");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:59:59.000",
            }),
          );

          await userEvent.click(fractionalSecondInput.first());
          await userEvent.keyboard("{ArrowDown}");

          expect(changeEventHandler).toHaveBeenCalledTimes(0);
          expect(el).toHaveProperty("value", "23:59:59.999");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:59:59.999",
            }),
          );

          await userEvent.click(meridiemInput.first());
          await userEvent.keyboard("{ArrowDown}");

          expect(changeEventHandler).toHaveBeenCalledTimes(0);
          expect(el).toHaveProperty("value", "11:59:59.999");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "11:59:59.999",
            }),
          );

          await userEvent.keyboard("{Enter}");

          expect(changeEventHandler).toHaveBeenCalledTimes(1);
          expect(el).toHaveProperty("value", "11:59:59.999");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "11:59:59.999",
            }),
          );

          await userEvent.click(meridiemInput.first());
          await userEvent.keyboard("{ArrowUp}");

          expect(changeEventHandler).toHaveBeenCalledTimes(1);
          expect(el).toHaveProperty("value", "23:59:59.999");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:59:59.999",
            }),
          );

          await userEvent.click(blurTarget);

          expect(changeEventHandler).toHaveBeenCalledTimes(2);
          expect(el).toHaveProperty("value", "23:59:59.999");
          await assertDisplayedTime(
            localizeTimeString({
              hour12: true,
              includeSeconds: true,
              locale,
              step,
              value: "23:59:59.999",
            }),
          );
        });

        function assertPartIsFocused(partSelector: string): void {
          expect(document).toHaveProperty(
            "activeElement.shadowRoot.activeElement",
            page.getBySelector(`calcite-input-time-picker ${partSelector}`).first().element(),
          );
        }

        const expectedPartSelectorFocusOrder = getExpectedPartSelectorFocusOrder(meridiemOrder);

        it("tabbing focuses each input in the correct sequence", async () => {
          await mount(<calcite-input-time-picker hour-format="12" lang={locale} step={step} />);

          await userEvent.keyboard("{Tab}");

          for (const partSelector of expectedPartSelectorFocusOrder) {
            assertPartIsFocused(partSelector);
            await userEvent.keyboard("{Tab}");
          }

          await expect
            .element(page.getBySelector(`calcite-input-time-picker`).first())
            .not.toHaveFocus();
        });

        it("arrow keys focus each input in the correct sequence", async () => {
          await mount(<calcite-input-time-picker hour-format="12" lang={locale} step={step} />);

          await userEvent.keyboard("{Tab}");

          for (const partSelector of expectedPartSelectorFocusOrder) {
            assertPartIsFocused(partSelector);
            await userEvent.keyboard("{ArrowRight}");
          }

          // does not wrap
          assertPartIsFocused(expectedPartSelectorFocusOrder.at(-1)!);

          const expectedOrderReversed = expectedPartSelectorFocusOrder.toReversed();

          for (const partSelector of expectedOrderReversed) {
            assertPartIsFocused(partSelector);
            await userEvent.keyboard("{ArrowLeft}");
          }

          // does not wrap
          assertPartIsFocused(expectedOrderReversed.at(-1)!);
        });

        describe("24-hour format", () => {
          it("supports display and editing in localized 24-hour format", async () => {
            const initialValue = "00:00:00.000";

            const { el } = await mount<InputTimePicker>(
              <>
                <calcite-input-time-picker
                  focus-trap-disabled
                  hour-format="24"
                  lang={locale}
                  step={0.001}
                  value={initialValue}
                />
                <input id="blurTarget" placeholder={locale} />
              </>,
            );
            const changeEventHandler = vi.fn();
            el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

            const hourInput = page.getBySelector(`calcite-input-time-picker .${hour}`);
            const minuteInput = page.getBySelector(`calcite-input-time-picker .${minute}`);
            const secondInput = page.getBySelector(`calcite-input-time-picker .${second}`);
            const fractionalSecondInput = page.getBySelector(
              `calcite-input-time-picker .${fractionalSecond}`,
            );
            const blurTarget = page.getBySelector("#blurTarget");

            expect(changeEventHandler).toHaveBeenCalledTimes(0);

            const initialDelocalizedValue = el.value;
            const expectedLocalizedInitialValue = localizeTimeString({
              hour12: false,
              includeSeconds: true,
              locale,
              step,
              value: initialDelocalizedValue,
            });

            expect(initialDelocalizedValue).toBe(initialValue);
            await assertDisplayedTime(expectedLocalizedInitialValue);

            await userEvent.click(hourInput.first());
            await userEvent.keyboard("{ArrowDown}");

            expect(changeEventHandler).toHaveBeenCalledTimes(0);
            expect(el).toHaveProperty("value", "23:00:00.000");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:00:00.000",
              }),
            );

            await userEvent.click(minuteInput.first());
            await userEvent.keyboard("{ArrowDown}");

            expect(changeEventHandler).toHaveBeenCalledTimes(0);
            expect(el).toHaveProperty("value", "23:59:00.000");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:00.000",
              }),
            );

            await userEvent.click(secondInput.first());
            await userEvent.keyboard("{ArrowDown}");

            expect(changeEventHandler).toHaveBeenCalledTimes(0);
            expect(el).toHaveProperty("value", "23:59:59.000");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.000",
              }),
            );

            await userEvent.click(fractionalSecondInput.first());
            await userEvent.keyboard("{ArrowDown}");

            expect(changeEventHandler).toHaveBeenCalledTimes(0);
            expect(el).toHaveProperty("value", "23:59:59.999");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.999",
              }),
            );

            await userEvent.keyboard("{Enter}");

            expect(changeEventHandler).toHaveBeenCalledTimes(1);
            expect(el).toHaveProperty("value", "23:59:59.999");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.999",
              }),
            );

            await userEvent.keyboard("{ArrowDown}");

            expect(changeEventHandler).toHaveBeenCalledTimes(1);
            expect(el).toHaveProperty("value", "23:59:59.998");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.998",
              }),
            );

            await userEvent.click(blurTarget);

            expect(changeEventHandler).toHaveBeenCalledTimes(2);
            expect(el).toHaveProperty("value", "23:59:59.998");
            await assertDisplayedTime(
              localizeTimeString({
                hour12: false,
                includeSeconds: true,
                locale,
                step,
                value: "23:59:59.998",
              }),
            );
          });

          const expectedPartSelectorFocusOrder = getExpectedPartSelectorFocusOrder();

          it("tabbing focuses each input in the correct sequence", async () => {
            await mount(<calcite-input-time-picker hour-format="24" lang={locale} step={step} />);

            await userEvent.keyboard("{Tab}");

            for (const partSelector of expectedPartSelectorFocusOrder) {
              assertPartIsFocused(partSelector);
              await userEvent.keyboard("{Tab}");
            }

            await expect
              .element(page.getBySelector(`calcite-input-time-picker`).first())
              .not.toHaveFocus();
          });

          it("arrow keys focus each input in the correct sequence", async () => {
            await mount(<calcite-input-time-picker hour-format="24" lang={locale} step={step} />);

            await userEvent.keyboard("{Tab}");

            for (const partSelector of expectedPartSelectorFocusOrder) {
              assertPartIsFocused(partSelector);
              await userEvent.keyboard("{ArrowRight}");
            }

            // does not wrap
            assertPartIsFocused(expectedPartSelectorFocusOrder.at(-1)!);

            const expectedOrderReversed = expectedPartSelectorFocusOrder.toReversed();

            for (const partSelector of expectedOrderReversed) {
              assertPartIsFocused(partSelector);
              await userEvent.keyboard("{ArrowLeft}");
            }

            // does not wrap
            assertPartIsFocused(expectedOrderReversed.at(-1)!);
          });
        });

        it("directly changing the value updates the displayed value and does not emit a change event", async () => {
          const numberingSystem = "latn";
          const step = 1;

          const { el } = await mount<InputTimePicker>(
            <calcite-input-time-picker
              lang={locale}
              numbering-system={numberingSystem}
              step={step}
            />,
          );
          const changeEventHandler = vi.fn();
          el.addEventListener("calciteInputTimePickerChange", changeEventHandler);

          for (let second = 0; second < 10; second++) {
            const date = new Date(0);
            date.setSeconds(second);

            const expectedValue = date.toISOString().substr(11, 8);
            const expectedInputValue = localizeTimeString({
              value: expectedValue,
              locale,
              numberingSystem,
              step,
            });

            el.value = expectedValue;

            await expect.element(el).toHaveProperty("value", expectedValue);
            await assertDisplayedTime(expectedInputValue);
            expect(changeEventHandler).toHaveBeenCalledTimes(0);
          }

          for (let minute = 0; minute < 10; minute++) {
            const date = new Date(0);
            date.setMinutes(minute);

            const expectedValue = date.toISOString().substr(11, 8);
            const expectedInputValue = localizeTimeString({
              value: expectedValue,
              locale,
              numberingSystem,
              step,
            });

            el.value = expectedValue;

            await expect.element(el).toHaveProperty("value", expectedValue);
            await assertDisplayedTime(expectedInputValue);
            expect(changeEventHandler).toHaveBeenCalledTimes(0);
          }

          for (let hour = 0; hour < 10; hour++) {
            const date = new Date(0);
            date.setHours(hour);

            const expectedValue = date.toISOString().substr(11, 8);
            const expectedInputValue = localizeTimeString({
              value: expectedValue,
              locale,
              numberingSystem,
              step,
            });

            el.value = expectedValue;

            await expect.element(el).toHaveProperty("value", expectedValue);
            await assertDisplayedTime(expectedInputValue);
            expect(changeEventHandler).toHaveBeenCalledTimes(0);
          }
        });
      });
    });
  });
});

describe("theme", () => {
  themed(() => mount(<calcite-input-time-picker open />), {
    "--calcite-input-time-picker-background-color": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-background-color",
    },
    "--calcite-input-time-picker-digit-text-color": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-color",
    },
    "--calcite-input-time-picker-digit-icon-color": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-icon-color",
    },
    "--calcite-input-time-picker-action-background-color-hover": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-button-background-color-hover",
    },
    "--calcite-input-time-picker-action-background-color-press": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-button-background-color-press",
    },
    "--calcite-input-time-picker-digit-border-color-hover": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-input-border-color-hover",
    },
    "--calcite-input-time-picker-digit-border-color-press": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-input-border-color-press",
    },
    "--calcite-input-time-picker-input-background-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "backgroundColor",
    },
    "--calcite-input-time-picker-input-border-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "borderColor",
    },
    "--calcite-input-time-picker-input-corner-radius": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "borderRadius",
    },
    "--calcite-input-time-picker-input-shadow": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "boxShadow",
    },
    "--calcite-input-time-picker-input-text-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "color",
    },
    "--calcite-input-time-picker-border-color": {
      shadowSelector: "calcite-time-picker",
      targetProp: "--calcite-time-picker-border-color",
    },
  });

  const clearButtonContainerSelector = `.${CLEAR_BUTTON_CSS.container}`;

  themed(() => mount(<calcite-input-time-picker clearable value="14:30" />), {
    "--calcite-input-time-picker-input-action-background-color": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-background-color",
    },
    "--calcite-input-time-picker-input-action-background-color-hover": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-background-color-hover",
      state: "hover",
    },
    "--calcite-input-time-picker-input-action-background-color-press": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-background-color-press",
      state: {
        press: `calcite-input-time-picker >>> ${clearButtonContainerSelector} calcite-action`,
      },
    },
    "--calcite-input-time-picker-input-action-icon-color": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-text-color",
    },
    "--calcite-input-time-picker-input-action-icon-color-hover": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-text-color-press",
      state: "hover",
    },
    "--calcite-input-time-picker-input-action-icon-color-press": {
      shadowSelector: `${clearButtonContainerSelector} calcite-action`,
      targetProp: "--calcite-action-text-color-press",
      state: {
        press: `calcite-input-time-picker >>> ${clearButtonContainerSelector} calcite-action`,
      },
    },
  });
});

describe("deprecated", () => {
  themed(() => mount("calcite-input-time-picker"), {
    "--calcite-ui-icon-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "--calcite-icon-color",
    },
  });
});

describe("value and property behavior", () => {
  it("resets an invalid initial value", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="invalid" />);

    await expect.element(el).toHaveProperty("value", "");
  });

  it("resets to the previous value when a change event is prevented", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="14:59" />);
    el.addEventListener("calciteInputTimePickerChange", (event) => event.preventDefault());

    await el.setFocus();
    await userEvent.keyboard("5{Enter}");

    await expect.element(el).toHaveProperty("value", "14:59");
    await assertDisplayedTime("02:59 PM");
  });

  it("allows a programmatic value to be edited and reset", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker />);
    el.value = "04:35";
    await assertDisplayedTime("04:35 AM");

    el.open = true;
    await page.getBySelector(`calcite-time-picker .${TimePickerCSS.buttonHourUp}`).click();
    await page.getBySelector(`calcite-time-picker .${TimePickerCSS.buttonMinuteUp}`).click();
    await userEvent.keyboard("{Escape}");

    await expect.element(el).toHaveProperty("value", "05:36");
    el.value = "04:35";
    await expect.element(el).toHaveProperty("value", "04:35");
    await assertDisplayedTime("04:35 AM");
  });

  it("remains focusable but cannot be edited when readOnly", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker read-only step={0.001} />,
    );
    const fields = ["Hour", "Minute", "Second", "Fractional second", "AM/PM"];

    await el.setFocus();
    await expect.element(el).toHaveFocus();
    await expect.element(el).toHaveProperty("open", false);

    for (const name of fields) {
      await page.getByRole("spinbutton", { exact: true, name }).click();
      await userEvent.keyboard("1{ArrowUp}");
      await assertDisplayedTime("--:--:--.--- --");
    }
  });

  it("responds to hourFormat changes without emitting change", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="14:30" />);
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);

    for (const [hourFormat, displayed] of [
      ["24", "14:30"],
      ["12", "02:30 PM"],
      ["24", "14:30"],
      ["user", "02:30 PM"],
    ] as const) {
      el.hourFormat = hourFormat;
      await assertDisplayedTime(displayed);
      await expect.element(el).toHaveProperty("value", "14:30");
    }
    expect(change).not.toHaveBeenCalled();
  });

  it("responds to lang and numberingSystem changes without emitting change", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker step={1} value="14:30:25" />,
    );
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);

    el.lang = "da";
    await vi.waitFor(() => assertDisplayedTime("14.30.25"));
    el.lang = "ar";
    await vi.waitFor(() => assertDisplayedTime("02:30:25 م"));
    el.numberingSystem = "arab";
    await vi.waitFor(() => assertDisplayedTime("٠٢:٣٠:٢٥ م"));
    el.lang = "zh-HK";
    el.numberingSystem = "latn";
    await vi.waitFor(() => assertDisplayedTime("下午02:30:25"));
    expect(change).not.toHaveBeenCalled();
  });

  it("responds to step changes", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="1:2:3" />);

    await expect.element(el).toHaveProperty("value", "01:02");
    el.step = 1;
    await expect.element(el).toHaveProperty("value", "01:02:00");
    await assertDisplayedTime("01:02:00 AM");
    el.step = 60;
    await expect.element(el).toHaveProperty("value", "01:02");
  });

  it("direct value changes do not interfere with later user changes", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="14:30" />);
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);

    el.value = "15:00";
    await el.setFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect.element(el).toHaveProperty("value", "16:00");
    expect(change).not.toHaveBeenCalled();
    await userEvent.keyboard("{Enter}");
    expect(change).toHaveBeenCalledTimes(1);
  });

  it("setting an undefined value clears partially filled input and picker fields", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker open step={0.001} />);
    const fields = [
      [CSS.hour, TimePickerCSS.hour],
      [CSS.minute, TimePickerCSS.minute],
      [CSS.second, TimePickerCSS.second],
      [CSS.fractionalSecond, TimePickerCSS.fractionalSecond],
    ];

    for (const [inputClassName, pickerClassName] of fields) {
      for (const selector of [
        `calcite-input-time-picker .${inputClassName}`,
        `calcite-time-picker .${pickerClassName}`,
      ]) {
        await page.getBySelector(selector).first().click();
        await userEvent.keyboard("{ArrowUp}");
        // @ts-expect-error -- setting unsupported value
        el.value = undefined;
        await assertDisplayedTime("--:--:--.--- --");
        await expect
          .element(page.getBySelector(`calcite-time-picker .${pickerClassName}`))
          .toHaveTextContent(inputClassName === CSS.fractionalSecond ? "---" : "--");
      }
    }
  });

  it("a value set by a change listener does not interfere with later changes", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker value="14:30" />);
    const change = vi.fn(() => {
      el.value = "10:00";
    });
    el.addEventListener("calciteInputTimePickerChange", change);
    await el.setFocus();

    for (const key of ["{ArrowUp}", "{ArrowUp}", "{ArrowDown}", "{ArrowDown}{ArrowDown}"]) {
      await userEvent.keyboard(`${key}{Enter}`);
      await expect.element(el).toHaveProperty("value", "10:00");
    }
    expect(change).toHaveBeenCalledTimes(4);
  });
});

describe("time field behavior", () => {
  const inputField = (className: string) =>
    page.getBySelector(`calcite-input-time-picker .${className}`).first();
  const pickerField = (className: string) =>
    page.getBySelector(`calcite-time-picker .${className}`);

  async function assertSynchronized(
    inputClassName: string,
    value: string,
    pickerClassName = inputClassName,
  ): Promise<void> {
    await expect.element(inputField(inputClassName)).toHaveTextContent(value);
    await expect.element(pickerField(pickerClassName)).toHaveTextContent(value);
  }

  for (const { field, inputClass, pickerClass, upButton, downButton, max } of [
    {
      field: "minute",
      inputClass: CSS.minute,
      pickerClass: TimePickerCSS.minute,
      upButton: TimePickerCSS.buttonMinuteUp,
      downButton: TimePickerCSS.buttonMinuteDown,
      max: 59,
    },
    {
      field: "second",
      inputClass: CSS.second,
      pickerClass: TimePickerCSS.second,
      upButton: TimePickerCSS.buttonSecondUp,
      downButton: TimePickerCSS.buttonSecondDown,
      max: 59,
    },
  ]) {
    describe(field, () => {
      for (const source of ["input", "picker", "nudge"] as const) {
        it(`increments with ${source}`, async () => {
          await mount(<calcite-input-time-picker open step={0.001} />);
          const target =
            source === "input"
              ? inputField(inputClass)
              : source === "picker"
                ? pickerField(pickerClass)
                : page.getBySelector(`calcite-time-picker .${upButton}`);
          await target.click();

          for (let value = 0; value <= max; value++) {
            if (value > 0 || source !== "nudge") {
              await (source === "nudge" ? target.click() : userEvent.keyboard("{ArrowUp}"));
            }
            await assertSynchronized(inputClass, formatTimePart(value)!);
          }
          await (source === "nudge" ? target.click() : userEvent.keyboard("{ArrowUp}"));
          await assertSynchronized(inputClass, "00");
        });

        it(`decrements with ${source}`, async () => {
          await mount(<calcite-input-time-picker open step={0.001} />);
          const target =
            source === "input"
              ? inputField(inputClass)
              : source === "picker"
                ? pickerField(pickerClass)
                : page.getBySelector(`calcite-time-picker .${downButton}`);
          await target.click();

          for (let value = max; value >= 0; value--) {
            if (value !== max || source !== "nudge") {
              await (source === "nudge" ? target.click() : userEvent.keyboard("{ArrowDown}"));
            }
            await assertSynchronized(inputClass, formatTimePart(value)!);
          }
        });
      }
    });
  }

  for (const hourFormat of ["12", "24"] as const) {
    for (const direction of ["increments", "decrements"] as const) {
      it(`${direction} the hour in ${hourFormat}-hour format from both inputs and buttons`, async () => {
        await mount(<calcite-input-time-picker hour-format={hourFormat} open step={0.001} />);
        const arrow = direction === "increments" ? "{ArrowUp}" : "{ArrowDown}";
        const buttonClass =
          direction === "increments" ? TimePickerCSS.buttonHourUp : TimePickerCSS.buttonHourDown;
        const values =
          hourFormat === "12"
            ? direction === "increments"
              ? Array.from({ length: 12 }, (_, index) => index + 1)
              : Array.from({ length: 12 }, (_, index) => 12 - index)
            : direction === "increments"
              ? [...Array.from({ length: 23 }, (_, index) => index + 1), 0]
              : [0, ...Array.from({ length: 23 }, (_, index) => 23 - index)];

        for (const [source, target] of [
          ["input", inputField(CSS.hour)],
          ["picker", pickerField(TimePickerCSS.hour)],
          ["nudge", page.getBySelector(`calcite-time-picker .${buttonClass}`)],
        ] as const) {
          await userEvent.keyboard("{Delete}");
          for (const value of values) {
            await target.click();
            if (source !== "nudge") {
              await userEvent.keyboard(arrow);
            }
            await assertSynchronized(CSS.hour, formatTimePart(value)!);
          }
        }
      });
    }
  }

  for (const [step, expected] of [
    [0.1, "0"],
    [0.01, "00"],
    [0.001, "000"],
  ] as const) {
    it(`nudges an empty fractional second to ${expected} for step=${step}`, async () => {
      await mount(<calcite-input-time-picker step={step} />);
      await inputField(CSS.fractionalSecond).click();
      await userEvent.keyboard("{ArrowUp}");
      await expect.element(inputField(CSS.fractionalSecond)).toHaveTextContent(expected);
    });
  }

  it("increments and decrements fractional seconds from the input, picker and buttons", async () => {
    await mount(<calcite-input-time-picker open step={0.001} />);
    for (const [arrow, button, values] of [
      [
        "{ArrowUp}",
        TimePickerCSS.buttonFractionalSecondUp,
        Array.from({ length: 11 }, (_, i) => i),
      ],
      [
        "{ArrowDown}",
        TimePickerCSS.buttonFractionalSecondDown,
        Array.from({ length: 11 }, (_, i) => 999 - i),
      ],
    ] as const) {
      for (const target of [
        inputField(CSS.fractionalSecond),
        pickerField(TimePickerCSS.fractionalSecond),
      ]) {
        await target.click();
        for (const value of values) {
          await userEvent.keyboard(arrow);
          await assertSynchronized(
            CSS.fractionalSecond,
            `${value}`.padStart(3, "0"),
            TimePickerCSS.fractionalSecond,
          );
        }
        await userEvent.keyboard("{Delete}");
      }
      const nudge = page.getBySelector(`calcite-time-picker .${button}`);
      for (const value of values) {
        await nudge.click();
        await assertSynchronized(
          CSS.fractionalSecond,
          `${value}`.padStart(3, "0"),
          TimePickerCSS.fractionalSecond,
        );
      }
      await userEvent.keyboard("{Delete}");
    }
  });

  it("increments, decrements, types and clears the meridiem", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker open step={0.001} value="15:00:00.000" />,
    );
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);
    const meridiem = inputField(CSS.meridiem);

    await meridiem.click();
    await userEvent.keyboard("{ArrowUp}");
    await assertSynchronized(CSS.meridiem, "AM");
    await userEvent.keyboard("{ArrowUp}");
    await assertSynchronized(CSS.meridiem, "PM");
    await userEvent.keyboard("{ArrowDown}");
    await assertSynchronized(CSS.meridiem, "AM");
    await userEvent.keyboard("p");
    await assertSynchronized(CSS.meridiem, "PM");
    await userEvent.keyboard("{Delete}{Enter}");
    expect(change).toHaveBeenCalledTimes(1);
  });

  it("emits change when cleared immediately after the value is set programmatically (#12889)", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker open step={0.001} />);
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);

    el.value = "15:00:00";
    await expect.element(el).toHaveProperty("value", "15:00:00.000");
    expect(change).not.toHaveBeenCalled();

    await inputField(CSS.meridiem).click();
    await userEvent.keyboard("{Delete}{Enter}");
    expect(change).toHaveBeenCalledTimes(1);
  });
});

describe("typed input behavior", () => {
  for (const hourFormat of ["12", "24"] as const) {
    it(`ignores letters in numeric fields in ${hourFormat}-hour format`, async () => {
      await mount(<calcite-input-time-picker hour-format={hourFormat} step={1} />);
      for (const name of ["Hour", "Minute", "Second"]) {
        const field = page.getByRole("spinbutton", { name });
        await field.click();
        await userEvent.keyboard(letterKeys.join(""));
        await expect.element(field).toHaveTextContent("--");
      }
    });

    it(`pads single digit numeric fields in ${hourFormat}-hour format`, async () => {
      await mount(<calcite-input-time-picker hour-format={hourFormat} step={1} />);
      for (const [name, zero] of [
        ["Hour", hourFormat === "12" ? "12" : "00"],
        ["Minute", "00"],
        ["Second", "00"],
      ]) {
        const field = page.getByRole("spinbutton", { name });
        await field.click();
        for (let value = 0; value < 10; value++) {
          await userEvent.keyboard(`${value}`);
          await expect.element(field).toHaveTextContent(value === 0 ? zero : `0${value}`);
          await userEvent.keyboard("{Backspace}");
        }
      }
    });
  }

  for (const [name, max, hourFormat] of [
    ["Hour", 12, "12"],
    ["Hour", 23, "24"],
    ["Minute", 59, "12"],
    ["Second", 59, "12"],
  ] as const) {
    it(`restricts ${name.toLowerCase()} typing to valid values`, async () => {
      await mount(<calcite-input-time-picker hour-format={hourFormat} step={1} />);
      const field = page.getByRole("spinbutton", { name });
      await field.click();
      for (let value = 10; value < 100; value++) {
        await userEvent.keyboard(`${value}`);
        const expected =
          value <= max
            ? `${value}`
            : name === "Hour" && hourFormat === "12" && value % 10 === 0
              ? "12"
              : `0${value % 10}`;
        await expect.element(field).toHaveTextContent(expected);
      }
    });
  }

  it("repeated AM and PM input does not affect the hour", async () => {
    await mount(<calcite-input-time-picker value="00:00" />);
    const meridiem = page.getByRole("spinbutton", { name: "AM/PM" });
    await meridiem.click();
    await userEvent.keyboard("aaappp");
    await expect.element(page.getByRole("spinbutton", { name: "Hour" })).toHaveTextContent("12");
    await expect.element(meridiem).toHaveTextContent("PM");
  });
});

describe("time picker interactions", () => {
  it("sets the internal popover to autoClose", async () => {
    await mount(<calcite-input-time-picker />);
    await expect
      .element(page.getBySelector("calcite-input-time-picker calcite-popover"))
      .toHaveProperty("autoClose", true);
  });

  it("toggles only from the toggle button and closes with Escape", async () => {
    const { el } = await mount<InputTimePicker>(<calcite-input-time-picker focus-trap-disabled />);
    const toggle = page.getBySelector(`calcite-input-time-picker .${CSS.toggleIcon}`);
    await el.setFocus();
    await userEvent.keyboard("{ArrowDown}{Escape}");
    await expect.element(el).toHaveProperty("open", false);
    await toggle.click();
    await expect.element(el).toHaveProperty("open", true);
    await toggle.click();
    await expect.element(el).toHaveProperty("open", false);
    await toggle.click();
    await userEvent.keyboard("{Escape}");
    await expect.element(el).toHaveProperty("open", false);
  });

  it("traps focus only while open", async () => {
    const { el } = await mount<InputTimePicker>(
      <>
        <calcite-input-time-picker />
        <button>next sibling</button>
      </>,
    );
    const next = page.getByRole("button", { name: "next sibling" });
    await el.setFocus();
    await userEvent.keyboard("{Tab}{Tab}{Tab}");
    await expect.element(next).toHaveFocus();
    await el.setFocus();
    await page.getBySelector(`calcite-input-time-picker .${CSS.toggleIcon}`).click();
    await page.getBySelector(`calcite-time-picker .${TimePickerCSS.hour}`).click();
    await expect.element(el).toHaveProperty("open", true);
    await userEvent.keyboard("{Shift>}{Tab}{Shift/}");
    await expect.element(next).not.toHaveFocus();
    await userEvent.keyboard("{Escape}");
    await expect.element(el).toHaveProperty("open", false);
    await userEvent.keyboard("{Tab}{Tab}{Tab}");
    await expect.element(next).toHaveFocus();
  });

  it("updates value and emits change on Enter after editing in the picker", async () => {
    const { el } = await mount<InputTimePicker>(
      <calcite-input-time-picker step={0.001} value="00:00:00" />,
    );
    const change = vi.fn();
    el.addEventListener("calciteInputTimePickerChange", change);
    await page.getBySelector(`calcite-input-time-picker .${CSS.toggleIcon}`).click();

    for (const className of [
      TimePickerCSS.hour,
      TimePickerCSS.minute,
      TimePickerCSS.second,
      TimePickerCSS.fractionalSecond,
      TimePickerCSS.meridiem,
    ]) {
      await page.getBySelector(`calcite-time-picker .${className}`).click();
      await userEvent.keyboard("{ArrowUp}");
      expect(change).not.toHaveBeenCalled();
    }
    await expect.element(el).toHaveProperty("value", "13:01:01.001");
    await userEvent.keyboard("{Enter}");
    expect(change).toHaveBeenCalledTimes(1);
  });
});
