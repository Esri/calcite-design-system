import { h } from "@arcgis/lumina";
import { it, expect, describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { defaults, focusable, hidden, renders, t9n } from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";
import { supportedNlsLocales } from "../date-picker/utils";
import { formatTimePart, getLocaleHourFormat, localizeTimeString } from "../../utils/time";
import { CSS } from "./resources";

mockConsole();

describe("defaults", () => {
  defaults(
    () => mount("calcite-time-picker"),
    [
      { propertyName: "hourFormat", defaultValue: "user" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
    ],
  );
});

describe("is focusable", () => {
  describe("should focus the first focusable element when setFocus is called (ltr)", () => {
    focusable(() => mount(`calcite-time-picker`), {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });

  describe("should focus the first focusable element when setFocus is called (rtl)", () => {
    focusable(() => mount(<calcite-time-picker dir="rtl" lang="ar" />), {
      shadowFocusTargetSelector: `.${CSS.input}.${CSS.hour}`,
    });
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-time-picker"));
});

describe("renders", () => {
  renders(() => mount("calcite-time-picker"), { display: "inline-block" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-time-picker"));
});

describe("l10n", () => {
  supportedNlsLocales.forEach((locale) => {
    if (locale !== "en") {
      return;
    }
    const localeHourFormat = getLocaleHourFormat(locale);
    describe(`${locale} (${localeHourFormat}-hour)`, () => {
      const step = 0.001;

      describe(`hour-format="user"`, () => {
        it(`displays initial localized value in the locale's preferred hour format`, async () => {
          const initialDelocalizedValue = "14:02:30.001";
          await mount(
            <calcite-time-picker lang={locale} step={step} value={initialDelocalizedValue} />,
          );

          const {
            hour: expectedLocalizedHour,
            hourSuffix: expectedLocalizedHourSuffix,
            minute: expectedLocalizedMinute,
            minuteSuffix: expectedLocalizedMinuteSuffix,
            second: expectedLocalizedSecond,
            secondSuffix: expectedLocalizedSecondSuffix,
            decimalSeparator: expectedLocalizedDecimalSeparator,
            fractionalSecond: expectedLocalizedFractionalSecond,
            meridiem: expectedLocalizedMeridiem,
          } = localizeTimeString({
            value: initialDelocalizedValue,
            locale,
            parts: true,
            step,
          });

          const hourEl = page.getBySelector(`calcite-time-picker .${CSS.hour}`);
          const hourSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.hourSuffix}`);
          const minuteEl = page.getBySelector(`calcite-time-picker .${CSS.minute}`);
          const minuteSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.minuteSuffix}`);
          const secondEl = page.getBySelector(`calcite-time-picker .${CSS.second}`);
          const decimalSeparatorEl = page.getBySelector(
            `calcite-time-picker .${CSS.decimalSeparator}`,
          );
          const fractionalSecondEl = page.getBySelector(
            `calcite-time-picker .${CSS.fractionalSecond}`,
          );
          const secondSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.secondSuffix}`);
          const meridiemEl = page.getBySelector(`calcite-time-picker .${CSS.meridiem}`);

          await expect.element(hourEl).toHaveTextContent(expectedLocalizedHour);
          await expect.element(hourSuffixEl).toHaveTextContent(expectedLocalizedHourSuffix);
          await expect.element(minuteEl).toHaveTextContent(expectedLocalizedMinute);
          await expect.element(minuteSuffixEl).toHaveTextContent(expectedLocalizedMinuteSuffix);
          await expect.element(secondEl).toHaveTextContent(expectedLocalizedSecond);
          await expect
            .element(decimalSeparatorEl)
            .toHaveTextContent(expectedLocalizedDecimalSeparator);
          await expect
            .element(fractionalSecondEl)
            .toHaveTextContent(expectedLocalizedFractionalSecond);

          if (secondSuffixEl.length !== 0) {
            // Bulgarian is the only locale Calcite supports that has a known suffix after the seconds.
            // Esri i18n prefers this character be removed for short time formats, which is the only format currently that time-picker supports.
            // We're leaving this conditional check here in case a new locale is added in the future that might need to test the second suffix.
            // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
            await expect
              .element(secondSuffixEl)
              .toHaveTextContent(expectedLocalizedSecondSuffix.trim());
          }

          // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
          await (localeHourFormat === "12"
            ? expect.element(meridiemEl).toHaveTextContent(expectedLocalizedMeridiem)
            : expect.element(meridiemEl).not.toBeInTheDocument());
        });
      });

      describe(`hour-format="12"`, () => {
        it("displays initial localized value correctly", async () => {
          const initialDelocalizedValue = "14:02:30.001";
          await mount(
            <calcite-time-picker
              hour-format="12"
              lang={locale}
              step={step}
              value={initialDelocalizedValue}
            />,
          );

          const {
            hour: expectedLocalizedHour,
            hourSuffix: expectedLocalizedHourSuffix,
            minute: expectedLocalizedMinute,
            minuteSuffix: expectedLocalizedMinuteSuffix,
            second: expectedLocalizedSecond,
            secondSuffix: expectedLocalizedSecondSuffix,
            decimalSeparator: expectedLocalizedDecimalSeparator,
            fractionalSecond: expectedLocalizedFractionalSecond,
            meridiem: expectedLocalizedMeridiem,
          } = localizeTimeString({
            hour12: true,
            value: initialDelocalizedValue,
            locale,
            parts: true,
            step,
          });

          const hourEl = page.getBySelector(`calcite-time-picker .${CSS.hour}`);
          const hourSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.hourSuffix}`);
          const minuteEl = page.getBySelector(`calcite-time-picker .${CSS.minute}`);
          const minuteSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.minuteSuffix}`);
          const secondEl = page.getBySelector(`calcite-time-picker .${CSS.second}`);
          const decimalSeparatorEl = page.getBySelector(
            `calcite-time-picker .${CSS.decimalSeparator}`,
          );
          const fractionalSecondEl = page.getBySelector(
            `calcite-time-picker .${CSS.fractionalSecond}`,
          );
          const secondSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.secondSuffix}`);
          const meridiemEl = page.getBySelector(`calcite-time-picker .${CSS.meridiem}`);

          await expect.element(hourEl).toHaveTextContent(expectedLocalizedHour);
          await expect.element(hourSuffixEl).toHaveTextContent(expectedLocalizedHourSuffix);
          await expect.element(minuteEl).toHaveTextContent(expectedLocalizedMinute);
          await expect.element(minuteSuffixEl).toHaveTextContent(expectedLocalizedMinuteSuffix);
          await expect.element(secondEl).toHaveTextContent(expectedLocalizedSecond);
          await expect
            .element(decimalSeparatorEl)
            .toHaveTextContent(expectedLocalizedDecimalSeparator);
          await expect
            .element(fractionalSecondEl)
            .toHaveTextContent(expectedLocalizedFractionalSecond);

          if (secondSuffixEl.length !== 0) {
            // Bulgarian is the only locale Calcite supports that has a known suffix after the seconds.
            // Esri i18n prefers this character be removed for short time formats, which is the only format currently that time-picker supports.
            // We're leaving this conditional check here in case a new locale is added in the future that might need to test the second suffix.
            // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
            await expect
              .element(secondSuffixEl)
              .toHaveTextContent(expectedLocalizedSecondSuffix.trim());
          }

          await expect.element(meridiemEl).toHaveTextContent(expectedLocalizedMeridiem);
        });

        it("always displays hour in 12 hour format when nudging and no value is set", async () => {
          await mount(<calcite-time-picker hour-format="12" lang={locale} />);
          const hour = page.getBySelector(`calcite-time-picker .${CSS.hour}`);

          await userEvent.click(hour);

          for (let i = 1; i < 24; i++) {
            await userEvent.keyboard("{ArrowUp}");

            await expect
              .element(hour)
              .toHaveTextContent(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
          }

          await userEvent.keyboard("{Delete}{ArrowDown}");

          for (let i = 23; i > 0; i--) {
            await userEvent.keyboard("{ArrowDown}");

            await expect
              .element(hour)
              .toHaveTextContent(i > 12 ? formatTimePart(i - 12) : formatTimePart(i));
          }
        });
      });

      describe(`hour-format="24"`, () => {
        it("displays initial localized value correctly", async () => {
          const initialDelocalizedValue = "14:02:30.001";
          await mount(
            <calcite-time-picker
              hour-format="24"
              lang={locale}
              step={step}
              value={initialDelocalizedValue}
            />,
          );

          const {
            hour: expectedLocalizedHour,
            hourSuffix: expectedLocalizedHourSuffix,
            minute: expectedLocalizedMinute,
            minuteSuffix: expectedLocalizedMinuteSuffix,
            second: expectedLocalizedSecond,
            secondSuffix: expectedLocalizedSecondSuffix,
            decimalSeparator: expectedLocalizedDecimalSeparator,
            fractionalSecond: expectedLocalizedFractionalSecond,
          } = localizeTimeString({
            hour12: false,
            value: initialDelocalizedValue,
            locale,
            parts: true,
            step,
          });

          const hourEl = page.getBySelector(`calcite-time-picker .${CSS.hour}`);
          const hourSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.hourSuffix}`);
          const minuteEl = page.getBySelector(`calcite-time-picker .${CSS.minute}`);
          const minuteSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.minuteSuffix}`);
          const secondEl = page.getBySelector(`calcite-time-picker .${CSS.second}`);
          const decimalSeparatorEl = page.getBySelector(
            `calcite-time-picker .${CSS.decimalSeparator}`,
          );
          const fractionalSecondEl = page.getBySelector(
            `calcite-time-picker .${CSS.fractionalSecond}`,
          );
          const secondSuffixEl = page.getBySelector(`calcite-time-picker .${CSS.secondSuffix}`);
          const meridiemEl = page.getBySelector(`calcite-time-picker .${CSS.meridiem}`);

          await expect.element(hourEl).toHaveTextContent(expectedLocalizedHour);
          await expect.element(hourSuffixEl).toHaveTextContent(expectedLocalizedHourSuffix);
          await expect.element(minuteEl).toHaveTextContent(expectedLocalizedMinute);
          await expect.element(minuteSuffixEl).toHaveTextContent(expectedLocalizedMinuteSuffix);
          await expect.element(secondEl).toHaveTextContent(expectedLocalizedSecond);
          await expect
            .element(decimalSeparatorEl)
            .toHaveTextContent(expectedLocalizedDecimalSeparator);
          await expect
            .element(fractionalSecondEl)
            .toHaveTextContent(expectedLocalizedFractionalSecond);

          if (secondSuffixEl.length !== 0) {
            // Bulgarian is the only locale Calcite supports that has a known suffix after the seconds.
            // Esri i18n prefers this character be removed for short time formats, which is the only format currently that time-picker supports.
            // We're leaving this conditional check here in case a new locale is added in the future that might need to test the second suffix.
            // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
            await expect.element(secondSuffixEl).toHaveTextContent(expectedLocalizedSecondSuffix);
          }

          await expect(meridiemEl).not.toBeInTheDocument();
        });

        it("always displays hour in 24 hour format when nudging and no value is set", async () => {
          await mount(<calcite-time-picker hour-format="24" lang={locale} />);
          const hour = page.getBySelector(`calcite-time-picker .${CSS.hour}`);
          await userEvent.click(hour);

          for (let i = 1; i < 24; i++) {
            await userEvent.keyboard("{ArrowUp}");

            await expect.element(hour).toHaveTextContent(formatTimePart(i));
          }

          await userEvent.keyboard("{Delete}{ArrowDown}");

          for (let i = 23; i > 0; i--) {
            await userEvent.keyboard("{ArrowDown}");

            await expect.element(hour).toHaveTextContent(formatTimePart(i));
          }
        });
      });
    });
  });
});
