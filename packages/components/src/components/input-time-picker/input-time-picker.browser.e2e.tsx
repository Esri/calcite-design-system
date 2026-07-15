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
  reflects,
  renders,
  t9n,
  openClose,
  formAssociated,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { supportedNlsLocales } from "../date-picker/utils";
import { getLocaleHourFormat, getMeridiemOrder, localizeTimeString } from "../../utils/time";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS as CLEAR_BUTTON_CSS } from "../functional/ClearButton";
import { CSS } from "./resources";
import { InputTimePicker } from "./input-time-picker";

mockConsole();

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
