import { LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, expect, it, vi } from "vitest";
import { TimeComponent, useTime } from "./useTime";

async function mountTime(properties: Partial<TimeComponent> = {}) {
  class Test extends LitElement implements TimeComponent {
    @property() hourFormat: TimeComponent["hourFormat"] = properties.hourFormat ?? "24";
    @property() messages: TimeComponent["messages"] = properties.messages ?? { _lang: "en" };
    @property() numberingSystem: TimeComponent["numberingSystem"] =
      properties.numberingSystem ?? "latn";
    @property() step = properties.step ?? 0.001;
    @property() value = properties.value ?? null;

    time = useTime(this);
  }

  return mount(Test);
}

describe("initialization and value synchronization", () => {
  it("parses and localizes a value on connection", async () => {
    const { component } = await mountTime({ hourFormat: "12", value: "14:02:03.004" });

    expect(component.time).toMatchObject({
      hour: "14",
      minute: "02",
      second: "03",
      fractionalSecond: "004",
      localizedHour: "02",
      localizedMinute: "02",
      localizedSecond: "03",
      localizedFractionalSecond: "004",
      localizedDecimalSeparator: ".",
      meridiem: "PM",
      localizedMeridiem: "PM",
      hasValue: true,
    });
  });

  it.each([
    [60, "01:02"],
    [1, "01:02:03"],
    [0.1, "01:02:03.1"],
    [0.01, "01:02:03.12"],
    [0.001, "01:02:03.123"],
  ])("normalizes a value for step=%s", async (step, expected) => {
    const { component } = await mountTime({ step, value: "1:2:3.123" });

    expect(component.value).toBe(expected);
    expect(component.time.userChangedValue).toBe(false);
  });

  it.each([null, "", "invalid", "24:00", "12:60", "12:00:60"])(
    "clears all time parts for %s without emitting change",
    async (value) => {
      const { component, el } = await mountTime({
        hourFormat: "12",
        value: "14:02:03.004",
      });
      const change = vi.fn();
      el.addEventListener("calciteTimeChange", change);

      component.time.setValue(value);

      expect(component.value).toBe("");
      expect(component.time).toMatchObject({
        hour: null,
        minute: null,
        second: null,
        fractionalSecond: null,
        meridiem: null,
        localizedHour: null,
        localizedMinute: null,
        localizedSecond: null,
        localizedFractionalSecond: null,
        localizedMeridiem: null,
        localizedHourSuffix: ":",
        localizedDecimalSeparator: ".",
        hasValue: false,
      });
      expect(change).not.toHaveBeenCalled();
    },
  );

  it("clears partial fields even when the component value is already empty", async () => {
    const { component } = await mountTime();
    component.time.setValuePart("minute", 5);
    expect(component.time.hasValue).toBe(true);
    expect(component.value).toBe("");

    component.time.setValue("");
    await component.updateComplete;

    expect(component.time.minute).toBeNull();
    expect(component.time.localizedMinute).toBeNull();
    expect(component.time.hasValue).toBe(false);
  });

  it("marks user-originated value assignments until the next host update", async () => {
    const { component } = await mountTime({ value: "14:02:03.004" });

    component.time.setValue(null, true);
    expect(component.time.userChangedValue).toBe(true);

    await component.updateComplete;
    expect(component.time.userChangedValue).toBe(false);
  });

  it("emits the proposed ISO value without assigning the host value", async () => {
    const { component, el } = await mountTime({ value: "14:02:03.004" });
    const change = vi.fn();
    el.addEventListener("calciteTimeChange", change);

    component.time.setValuePart("minute", 5);

    expect(change).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({ detail: "14:05:03.004" }),
    );
    expect(component.value).toBe("14:02:03.004");
    expect(component.time.userChangedValue).toBe(true);
  });

  it("does not emit when setting an unchanged part", async () => {
    const { component, el } = await mountTime({ value: "14:02:03.004" });
    const change = vi.fn();
    el.addEventListener("calciteTimeChange", change);

    component.time.setValuePart("minute", 2);

    expect(change).not.toHaveBeenCalled();
    expect(component.time.userChangedValue).toBe(false);
  });
});

describe("reactive configuration", () => {
  it.each([
    ["en", "12"],
    ["fr", "24"],
  ] as const)("resolves user hour format for %s", async (locale, hourFormat) => {
    const { component } = await mountTime({
      hourFormat: "user",
      messages: { _lang: locale },
    });

    expect(component.time.hourFormat).toBe(hourFormat);
  });

  it("updates hour format without changing the ISO value or emitting change", async () => {
    const { component, el } = await mountTime({ value: "14:02:03.004" });
    const change = vi.fn();
    el.addEventListener("calciteTimeChange", change);

    component.hourFormat = "12";
    await component.updateComplete;
    expect(component.time.localizedHour).toBe("02");
    expect(component.time.localizedMeridiem).toBe("PM");

    component.hourFormat = "24";
    await component.updateComplete;
    expect(component.time.localizedHour).toBe("14");
    expect(component.value).toBe("14:02:03.004");
    expect(change).not.toHaveBeenCalled();
  });

  it("updates locale-dependent hour format, suffixes, decimal separator and meridiem order", async () => {
    const { component } = await mountTime({
      hourFormat: "user",
      value: "14:02:03.004",
    });
    expect(component.time.meridiemOrder).toBeGreaterThan(0);

    component.messages = { _lang: "de" };
    await component.updateComplete;
    expect(component.time).toMatchObject({
      hourFormat: "24",
      localizedHour: "14",
      localizedDecimalSeparator: ",",
    });

    component.messages = { _lang: "ko" };
    await component.updateComplete;
    expect(component.time).toMatchObject({
      hourFormat: "12",
      localizedHour: "02",
      localizedMeridiem: "오후",
      meridiemOrder: 0,
    });
    expect(component.value).toBe("14:02:03.004");
  });

  it("localizes digits on numbering-system changes while preserving the ISO value", async () => {
    const { component } = await mountTime({
      messages: { _lang: "ar" },
      value: "14:02:03.004",
    });

    component.numberingSystem = "arab";
    await component.updateComplete;

    expect(component.time).toMatchObject({
      localizedHour: "١٤",
      localizedMinute: "٠٢",
      localizedSecond: "٠٣",
      localizedFractionalSecond: "٠٠٤",
      localizedDecimalSeparator: "٫",
    });
    expect(component.value).toBe("14:02:03.004");
  });

  it("preserves partial input when translated messages change without a locale change", async () => {
    const { component } = await mountTime();
    component.time.setValuePart("minute", 5);
    await component.updateComplete;

    component.messages = { _lang: "en", hour: "Custom hour label" };
    await component.updateComplete;

    expect(component.time.minute).toBe("05");
    expect(component.time.hasValue).toBe(true);
  });

  it("renormalizes values when step toggles seconds", async () => {
    const { component, el } = await mountTime({ step: 60, value: "14:02" });
    const change = vi.fn();
    el.addEventListener("calciteTimeChange", change);

    component.step = 1;
    await component.updateComplete;
    expect(component.value).toBe("14:02:00");
    expect(component.time.second).toBe("00");

    component.step = 60;
    await component.updateComplete;
    expect(component.value).toBe("14:02");
    expect(component.time.second).toBeUndefined();
    expect(change).not.toHaveBeenCalled();
  });
});

describe("numeric keyboard input", () => {
  const fields = [
    ["hour", "handleHourKeyDownEvent"],
    ["minute", "handleMinuteKeyDownEvent"],
    ["second", "handleSecondKeyDownEvent"],
    ["fractionalSecond", "handleFractionalSecondKeyDownEvent"],
  ] as const;

  it.each([
    ["12", "hour", "handleHourKeyDownEvent", "12", "12"],
    ["12", "hour", "handleHourKeyDownEvent", "13", "03"],
    ["24", "hour", "handleHourKeyDownEvent", "19", "19"],
    ["24", "hour", "handleHourKeyDownEvent", "23", "23"],
    ["24", "hour", "handleHourKeyDownEvent", "24", "04"],
    ["24", "minute", "handleMinuteKeyDownEvent", "59", "59"],
    ["24", "minute", "handleMinuteKeyDownEvent", "67", "07"],
    ["24", "second", "handleSecondKeyDownEvent", "59", "59"],
    ["24", "second", "handleSecondKeyDownEvent", "67", "07"],
  ] as const)(
    "types %s-hour %s using %s with %s as %s",
    async (hourFormat, part, handler, keys, expected) => {
      const { component } = await mountTime({ hourFormat });

      for (const key of keys) {
        component.time[handler](new KeyboardEvent("keydown", { key }));
      }

      expect(component.time[part]).toBe(expected);
    },
  );

  it.each([
    [0.1, "1234", "4"],
    [0.01, "1234", "34"],
    [0.001, "1234", "004"],
  ])("types fractional seconds using step=%s precision", async (step, keys, expected) => {
    const { component } = await mountTime({ step, value: "14:02:03.000" });

    for (const key of keys) {
      component.time.handleFractionalSecondKeyDownEvent(new KeyboardEvent("keydown", { key }));
    }

    expect(component.time.fractionalSecond).toBe(expected);
  });

  describe.each(fields)("%s", (part, handler) => {
    it.each(["Backspace", "Delete"])(
      "clears with %s and prevents its default action",
      async (key) => {
        const { component } = await mountTime({ value: "14:02:03.004" });
        const event = new KeyboardEvent("keydown", { key, cancelable: true });

        component.time[handler](event);

        expect(component.time[part]).toBeUndefined();
        expect(event.defaultPrevented).toBe(true);
      },
    );

    it.each(["x", "Tab", "Enter"])(
      "ignores %s without preventing its default action",
      async (key) => {
        const { component, el } = await mountTime({ value: "14:02:03.004" });
        const previousPart = component.time[part];
        const change = vi.fn();
        el.addEventListener("calciteTimeChange", change);
        const event = new KeyboardEvent("keydown", { key, cancelable: true });

        component.time[handler](event);

        expect(component.time[part]).toBe(previousPart);
        expect(event.defaultPrevented).toBe(false);
        expect(change).not.toHaveBeenCalled();
      },
    );

    it("prevents Space from scrolling without editing the field", async () => {
      const { component } = await mountTime({ value: "14:02:03.004" });
      const previousPart = component.time[part];
      const event = new KeyboardEvent("keydown", { key: " ", cancelable: true });

      component.time[handler](event);

      expect(component.time[part]).toBe(previousPart);
      expect(event.defaultPrevented).toBe(true);
    });
  });
});

describe("nudging", () => {
  it.each([
    ["hour", "incrementHour", null, "01"],
    ["hour", "decrementHour", null, "00"],
    ["hour", "incrementHour", "23:02:03.004", "00"],
    ["hour", "decrementHour", "00:02:03.004", "23"],
    ["hour", "incrementHour", "14:02:03.004", "15"],
    ["hour", "decrementHour", "14:02:03.004", "13"],
    ["minute", "incrementMinute", null, "00"],
    ["minute", "decrementMinute", null, "59"],
    ["minute", "incrementMinute", "14:59:03.004", "00"],
    ["minute", "decrementMinute", "14:00:03.004", "59"],
    ["minute", "incrementMinute", "14:02:03.004", "03"],
    ["minute", "decrementMinute", "14:02:03.004", "01"],
    ["second", "incrementSecond", null, "00"],
    ["second", "decrementSecond", null, "59"],
    ["second", "incrementSecond", "14:02:59.004", "00"],
    ["second", "decrementSecond", "14:02:00.004", "59"],
    ["second", "incrementSecond", "14:02:03.004", "04"],
    ["second", "decrementSecond", "14:02:03.004", "02"],
  ] as const)("%s %s from %s produces %s", async (part, method, value, expected) => {
    const { component } = await mountTime({ value });

    component.time[method]();

    expect(component.time[part]).toBe(expected);
  });

  it.each([
    [0.1, "up", null, "0"],
    [0.01, "up", null, "00"],
    [0.001, "up", null, "000"],
    [0.1, "down", null, "9"],
    [0.01, "down", null, "99"],
    [0.001, "down", null, "999"],
    [0.1, "up", "14:02:03.9", "0"],
    [0.01, "down", "14:02:03.00", "99"],
    [0.001, "up", "14:02:03.999", "000"],
    [0.001, "up", "14:02:03.009", "010"],
    [0.001, "down", "14:02:03.010", "009"],
    [0.25, "up", "14:02:03.50", "75"],
    [0.25, "down", "14:02:03.50", "25"],
  ] as const)("nudges step=%s %s from %s to %s", async (step, direction, value, expected) => {
    const { component } = await mountTime({ step, value });

    component.time.nudgeFractionalSecond(direction);

    expect(component.time.fractionalSecond).toBe(expected);
  });
});

describe("meridiem", () => {
  it.each([
    ["ArrowUp", "AM", "02"],
    ["ArrowDown", "AM", "02"],
  ])("toggles with %s and prevents its default action", async (key, meridiem, hour) => {
    const { component } = await mountTime({ hourFormat: "12", value: "14:02:03.004" });
    const event = new KeyboardEvent("keydown", { key, cancelable: true });

    component.time.handleMeridiemKeyDownEvent(event);

    expect(component.time.meridiem).toBe(meridiem);
    expect(component.time.hour).toBe(hour);
    expect(event.defaultPrevented).toBe(true);
  });

  it.each([" ", "Spacebar"])("prevents %s without changing meridiem", async (key) => {
    const { component } = await mountTime({ hourFormat: "12", value: "14:02:03.004" });
    const event = new KeyboardEvent("keydown", { key, cancelable: true });

    component.time.handleMeridiemKeyDownEvent(event);

    expect(component.time.meridiem).toBe("PM");
    expect(event.defaultPrevented).toBe(true);
  });

  it.each([
    ["00:02", "p", "12", "PM"],
    ["12:02", "a", "00", "AM"],
    ["14:02", "a", "02", "AM"],
    ["02:02", "p", "14", "PM"],
    ["14:02", "p", "14", "PM"],
    ["02:02", "a", "02", "AM"],
  ])("edits %s with %s to hour %s %s", async (value, key, hour, meridiem) => {
    const { component } = await mountTime({ hourFormat: "12", step: 60, value });

    component.time.handleMeridiemKeyDownEvent(new KeyboardEvent("keydown", { key }));

    expect(component.time.hour).toBe(hour);
    expect(component.time.meridiem).toBe(meridiem);
    expect(component.time.localizedMeridiem).toBe(meridiem);
  });

  it.each([
    ["up", "AM"],
    ["down", "PM"],
  ] as const)("initializes an empty meridiem %s to %s", async (direction, expected) => {
    const { component } = await mountTime({ hourFormat: "12" });

    component.time.toggleMeridiem(direction);

    expect(component.time.meridiem).toBe(expected);
    expect(component.time.hasValue).toBe(true);
    expect(component.value).toBe("");
  });

  it.each(["Backspace", "Delete"])("clears the value with %s", async (key) => {
    const { component } = await mountTime({ hourFormat: "12", value: "14:02:03.004" });
    const event = new KeyboardEvent("keydown", { key, cancelable: true });

    component.time.handleMeridiemKeyDownEvent(event);

    expect(component.value).toBe("");
    expect(component.time.meridiem).toBeUndefined();
    expect(component.time.localizedMeridiem).toBeUndefined();
    expect(event.defaultPrevented).toBe(true);
  });
});
