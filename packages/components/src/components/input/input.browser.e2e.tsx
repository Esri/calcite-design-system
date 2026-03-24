import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { h } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { commands, page, userEvent } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { letterKeys, numberKeys } from "../../utils/key";
import { numberStringFormatter } from "../../utils/locale";
import { supportedNlsLocales } from "../date-picker/utils";
import { Input } from "./input";
import { CSS, NUDGE_DELAY_IN_MS } from "./resources";

const delayFor2UpdatesInMs = 2 * NUDGE_DELAY_IN_MS;

describe("defaults", () => {
  defaults(
    () => mount("calcite-input"),
    [
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "alignment",
        defaultValue: "start",
      },
      {
        propertyName: "numberButtonType",
        defaultValue: "vertical",
      },
      {
        propertyName: "type",
        defaultValue: "text",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "value",
        defaultValue: "",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-input"),
    [
      {
        propertyName: "status",
        value: "valid",
      },
      {
        propertyName: "alignment",
        value: "center",
      },
      {
        propertyName: "numberButtonType",
        value: "horizontal",
      },
      {
        propertyName: "type",
        value: "color",
      },
      {
        propertyName: "scale",
        value: "s",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-input"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-input`));
});

describe("renders", () => {
  renders(() => mount("calcite-input"), { display: "block" });
});

describe("is focusable", () => {
  focusable(() => mount(`calcite-input`), {
    shadowFocusTargetSelector: "input",
  });
});

describe("translation support", () => {
  t9n(() => mount("calcite-input"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-input"));
});

describe("is form-associated", () => {
  const supportedSubmissionTypes = [
    {
      type: "color",
      value: "#abcdef",
    },
    {
      type: "date",
      value: "2018-07-22",
    },
    {
      type: "datetime-local",
      value: "2018-06-12T19:30",
    },
    {
      type: "email",
      value: "test@test.com",
    },
    {
      type: "month",
      value: "2018-05",
    },
    {
      type: "number",
      value: "1337",
    },
    {
      type: "tel",
      value: "1234567890",
    },
    {
      type: "text",
      value: "test",
    },
    {
      type: "password",
      value: "password",
    },
    {
      type: "time",
      value: "01:00",
    },
    {
      type: "url",
      value: "http://www.esri.com",
    },
    {
      type: "week",
      value: "2018-W26",
    },
  ] as const;

  for (const { type, value } of supportedSubmissionTypes) {
    formAssociated(() => mount(<calcite-input type={type} />), {
      testValue: value,
      submitsOnEnter: true,
      inputType: type,
      validation: true,
    });
  }
});

describe("nudging", () => {
  function nudgeReadOnlyToggle(el: Input["el"]): Promise<void> {
    return new Promise<void>((resolve) => {
      el.addEventListener(
        "calciteInputInput",
        () => {
          el.readOnly = true;
          window.setTimeout(() => {
            el.readOnly = false;
            resolve();
          }, NUDGE_DELAY_IN_MS * 2);
        },
        { once: true },
      );
    });
  }

  it("stops nudging if readOnly is modified", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    const nudgeUpReadOnlyToggle = nudgeReadOnlyToggle(el);
    const nudgeUpButton = page.getByTestId("number-button-up");
    await userEvent.click(nudgeUpButton);
    await nudgeUpReadOnlyToggle;

    expect(el.value).toBe("1");

    const nudgeDownReadOnlyToggle = nudgeReadOnlyToggle(el);

    const nudgeDownButton = page.getByTestId("number-button-down");
    await userEvent.click(nudgeDownButton);
    await nudgeDownReadOnlyToggle;

    expect(el.value).toBe("0");
  });
});

it("renders an icon when explicit Calcite UI is requested, and is a type without a default icon", async () => {
  await mount<Input>(<calcite-input icon="key" type="number" />);
  const icon = page.getBySelector(`calcite-input .${CSS.inputIcon}`);

  await expect.element(icon).toBeVisible();
});

it("renders an icon when explicit Calcite UI is requested, and is a type with a default icon", async () => {
  await mount<Input>(<calcite-input icon="key" type="date" />);

  const icon = page.getBySelector(`calcite-input .${CSS.inputIcon}`);
  await expect.element(icon).toBeVisible();
});

it("renders an icon when requested without an explicit Calcite UI, and is a type with a default icon", async () => {
  await mount<Input>(<calcite-input icon type="date" />);
  const icon = page.getBySelector(`calcite-input .${CSS.inputIcon}`);

  await expect.element(icon).toBeVisible();
});

it("does not render an icon when requested without an explicit Calcite UI, and is a type without a default icon", async () => {
  await mount<Input>(<calcite-input icon type="number" />);
  const icon = page.getBySelector(`calcite-input .${CSS.inputIcon}`);

  await expect.element(icon).not.toBeInTheDocument();
});

it("renders number buttons in default vertical alignment when type=number", async () => {
  await mount<Input>(<calcite-input type="number" />);
  const numberVerticalWrapper = page.getBySelector(`calcite-input .${CSS.numberButtonWrapper}`);
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input .${CSS.buttonItemHorizontal}[data-adjustment='up']`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input .${CSS.buttonItemHorizontal}[data-adjustment='down']`,
  );

  await expect.element(numberVerticalWrapper).toBeVisible();
  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

it("renders number buttons in horizontal vertical alignment when type=number and number button type is horizontal", async () => {
  await mount<Input>(<calcite-input numberButtonType={"horizontal"} type="number" />);
  const numberVerticalWrapper = page.getBySelector(`calcite-input .${CSS.numberButtonWrapper}`);
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input .${CSS.buttonItemHorizontal}[data-adjustment='up']`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input .${CSS.buttonItemHorizontal}[data-adjustment='down']`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).toBeVisible();
  await expect.element(numberHorizontalItemUp).toBeVisible();
});

it("does not render number buttons in default vertical alignment when type=number and read-only", async () => {
  await mount<Input>(<calcite-input readOnly={true} type="number" />);
  const numberVerticalWrapper = page.getBySelector(`calcite-input .${CSS.numberButtonWrapper}`);

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
});

it("does not render number buttons in horizontal alignment when type=number, number button type is horizontal, and read-only", async () => {
  await mount<Input>(
    <calcite-input numberButtonType={"horizontal"} readOnly={true} type="number" />,
  );
  const numberVerticalWrapper = page.getBySelector(`calcite-input .${CSS.numberButtonWrapper}`);
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

it("renders no buttons in type=number and number button type is none", async () => {
  await mount<Input>(<calcite-input numberButtonType={"none"} type="number" />);
  const numberVerticalWrapper = page.getBySelector(`calcite-input .${CSS.numberButtonWrapper}`);
  const numberHorizontalItemUp = page.getBySelector(
    `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
  );
  const numberHorizontalItemDown = page.getBySelector(
    `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
  );

  await expect.element(numberVerticalWrapper).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemDown).not.toBeInTheDocument();
  await expect.element(numberHorizontalItemUp).not.toBeInTheDocument();
});

describe("input type number increment/decrement functionality", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("correctly increments/decrements numbers greater than MAX_SAFE_INTEGER", async () => {
    const { el } = await mount<Input>(
      <calcite-input
        step={10}
        type="number"
        value="100000000000000000000000000000000000000000000000000."
      />,
    );

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "100000000000000000000000000000000000000000000000010");

    el.step = 0.1;

    await userEvent.click(numberHorizontalItemDown, { clickCount: 10 });

    expect(el).toHaveProperty("value", "100000000000000000000000000000000000000000000000009");
  });

  it("correctly increments/decrements exponential notation numbers without losing precision", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="1.23e-60" />);

    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty(
      "value",
      "1.00000000000000000000000000000000000000000000000000000000000123",
    );

    el.step = 0.1;

    await userEvent.click(numberHorizontalItemDown, { clickCount: 5 });

    expect(el).toHaveProperty(
      "value",
      "0.50000000000000000000000000000000000000000000000000000000000123",
    );
  });

  it("correctly increments and decrements decimal value when number buttons are clicked and the step precision matches the precision of the initial value", async () => {
    const { el } = await mount<Input>(<calcite-input step={0.001} type="number" value="3.123" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "3.122");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "3.123");

    await userEvent.click(numberHorizontalItemUp);
    expect(el).toHaveProperty("value", "3.124");

    await userEvent.click(numberHorizontalItemUp, { clickCount: 10 });

    expect(el).toHaveProperty("value", "3.134");
  });

  it("correctly increments and decrements initial decimal value by 1 when number buttons are clicked and step is set to default of 1.", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="3.123" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "2.123");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "3.123");

    await userEvent.click(numberHorizontalItemUp);
    expect(el).toHaveProperty("value", "4.123");

    await userEvent.click(numberHorizontalItemUp, { clickCount: 10 });

    expect(el).toHaveProperty("value", "14.123");
  });

  it("correctly increments and decrements value when number buttons are clicked and step is set to an integer", async () => {
    const { el } = await mount<Input>(<calcite-input step={10} type="number" value="15" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "5");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "15");

    await userEvent.click(numberHorizontalItemUp);
    expect(el).toHaveProperty("value", "25");

    await userEvent.click(numberHorizontalItemDown);
    expect(el).toHaveProperty("value", "15");
  });

  it("correctly increments and decrements on long hold on mousedown and step is set to a decimal", async () => {
    const { el } = await mount<Input>(<calcite-input step={0.01} type="number" value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );

    await userEvent.hover(numberHorizontalItemUp);
    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs);
    await commands.mouseUp();

    const totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(el).toHaveProperty("value", `0.0${totalNudgesUp}`);

    await userEvent.hover(numberHorizontalItemDown);
    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs);
    await commands.mouseUp();

    const totalNudgesDown = inputEventHandler.mock.calls.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el).toHaveProperty("value", `${finalNudgedValue * 0.01}`);
  });

  it("correctly increments and decrements value by one when any is set for step", async () => {
    const { el } = await mount<Input>(<calcite-input step="any" type="number" value="5.5" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "4.5");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "5.5");

    await userEvent.click(numberHorizontalItemUp);
    expect(el).toHaveProperty("value", "6.5");

    await userEvent.click(numberHorizontalItemDown);
    expect(el).toHaveProperty("value", "5.5");
  });

  it("correctly increments and decrements value by one when step is undefined", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="5" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "4");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "5");

    await userEvent.click(numberHorizontalItemUp);
    expect(el).toHaveProperty("value", "6");

    await userEvent.click(numberHorizontalItemDown);
    expect(el).toHaveProperty("value", "5");
  });

  it("decrements to max when value is higher", async () => {
    const { el } = await mount<Input>(<calcite-input max={10} type="number" value="20" />);

    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "10");

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "9");
  });

  it("increments to min when value is lower", async () => {
    const { el } = await mount<Input>(<calcite-input min={20} type="number" value="11" />);

    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "20");

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "20");
  });

  it("correctly stops decrementing value when min is set", async () => {
    const { el } = await mount<Input>(<calcite-input min={10} type="number" value="11" />);

    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "10");

    await userEvent.click(numberHorizontalItemDown);

    expect(el).toHaveProperty("value", "10");
  });

  it("correctly stops incrementing value when max is set", async () => {
    const { el } = await mount<Input>(<calcite-input max={10} type="number" value="9" />);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "10");

    await userEvent.click(numberHorizontalItemUp);

    expect(el).toHaveProperty("value", "10");
  });

  it("should emit event when up or down clicked on input", async () => {
    const { el } = await mount<Input>(<calcite-input max={0} type="number" value="-2" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);

    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );

    await userEvent.click(numberHorizontalItemUp);
    expect(inputEventHandler).toHaveBeenCalledTimes(1);

    await userEvent.click(numberHorizontalItemUp);
    expect(inputEventHandler).toHaveBeenCalledTimes(2);

    await userEvent.click(numberHorizontalItemDown);
    expect(inputEventHandler).toHaveBeenCalledTimes(3);

    await userEvent.click(numberHorizontalItemDown);
    expect(inputEventHandler).toHaveBeenCalledTimes(4);
  });

  it("on input type number, should emit an event on an interval when ArrowUp/ArrowDown keys are down and stop on key up", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);

    await el.setFocus();
    await userEvent.keyboard("{ArrowUp>10/}");
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await userEvent.keyboard("{/ArrowUp}");

    const totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);

    await userEvent.keyboard("{ArrowDown>}");
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await userEvent.keyboard("{/ArrowDown}");

    const totalNudgesDown = inputEventHandler.mock.calls.length - totalNudgesUp;
    const finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el).toHaveProperty("value", `${finalNudgedValue}`);
  });

  it("should emit an event on an interval when up/down buttons are down and stop on mouseup/mouseleave", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);
    const numberHorizontalItemDown = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='down']`,
    );
    const numberHorizontalItemUp = page.getBySelector(
      `calcite-input .${CSS.numberButtonItem}[data-adjustment='up']`,
    );

    const buttonDownLocation = numberHorizontalItemDown.element().getBoundingClientRect();
    const buttonUpLocation = numberHorizontalItemUp.element().getBoundingClientRect();

    await userEvent.hover(numberHorizontalItemUp);
    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await commands.mouseUp();

    let totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);

    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await commands.mouseMove(buttonUpLocation.x - 1, buttonUpLocation.y - 1);

    totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);

    // assert changes no longer emitted after moving away from stepper
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);
    await commands.mouseUp(); // mouseleave assertion done, we release

    await commands.mouseMove(buttonDownLocation.x, buttonDownLocation.y);
    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await commands.mouseUp();

    let totalNudgesDown = inputEventHandler.mock.calls.length - totalNudgesUp;
    let finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el).toHaveProperty("value", `${finalNudgedValue}`);

    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await commands.mouseMove(buttonDownLocation.x - 1, buttonDownLocation.y - 1);

    totalNudgesDown = inputEventHandler.mock.calls.length - totalNudgesUp;
    finalNudgedValue = totalNudgesUp - totalNudgesDown;
    expect(el).toHaveProperty("value", `${finalNudgedValue}`);

    // assert changes no longer emitted after moving away from stepper
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    expect(el).toHaveProperty("value", `${finalNudgedValue}`);
  });

  it("on input type number, when both 'ArrowUp' and 'ArrowDown' are pressed at the same time most recently pressed key takes over", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="0" />);

    await el.setFocus();
    await userEvent.keyboard("{ArrowUp}{ArrowDown}");
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);

    expect(el).toHaveProperty("value", "0");
  });

  it("on input type number, should emit event only twice when toggled fast between up/down arrows", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="0" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);

    await el.setFocus();
    await Promise.all([
      userEvent.keyboard("{ArrowUp}"),
      userEvent.keyboard("{ArrowUp}"),
      userEvent.keyboard("{ArrowDown}"),
      userEvent.keyboard("{ArrowDown}"),
    ]);

    expect(inputEventHandler).toHaveBeenCalledTimes(2);
  });

  it("up/down arrow keys increments and decrements correctly when the step is a decimal", async () => {
    const { el } = await mount<Input>(<calcite-input step={0.1} type="number" />);

    await el.setFocus();
    await userEvent.keyboard("{ArrowUp}");

    expect(el).toHaveProperty("value", "0.1");

    await userEvent.keyboard("{ArrowUp}");

    expect(el).toHaveProperty("value", "0.2");

    await userEvent.keyboard("{ArrowDown}");

    expect(el).toHaveProperty("value", "0.1");

    await userEvent.keyboard("{ArrowDown}");

    expect(el).toHaveProperty("value", "0");
  });

  it("up/down arrow keys increments and decrements correctly when the step is an integer and the value is a decimal", async () => {
    const { el } = await mount<Input>(<calcite-input step={5} type="number" value="1.008" />);

    await el.setFocus();
    await userEvent.keyboard("{ArrowUp}");

    expect(el).toHaveProperty("value", "6.008");

    await userEvent.keyboard("{ArrowUp}");

    expect(el).toHaveProperty("value", "11.008");

    await userEvent.keyboard("{ArrowDown}");

    expect(el).toHaveProperty("value", "6.008");

    await userEvent.keyboard("{ArrowDown}");

    expect(el).toHaveProperty("value", "1.008");
  });

  it("should stop increasing the value when pointer is moved away from the increment button", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);
    const incrementButton = page.getByTestId("number-button-up");
    const incrementButtonRect = await incrementButton.element().getBoundingClientRect();

    await userEvent.hover(incrementButton);
    await commands.mouseDown();
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);

    expect(el).not.toHaveProperty("value", "");

    const { value } = el;
    await commands.mouseMove(incrementButtonRect.x - 1, incrementButtonRect.y);

    expect(el).toHaveProperty("value", value);

    await commands.mouseUp();

    expect(el).toHaveProperty("value", value);
  });

  it("should not change the value when user Tab out of the input with ArrowUp/ArrowDown keys are down", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);

    await userEvent.keyboard("{Tab}{ArrowUp>}");
    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    await userEvent.keyboard("{Tab}");

    const totalNudgesUp = inputEventHandler.mock.calls.length;
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);

    vi.advanceTimersByTime(delayFor2UpdatesInMs + 1);
    expect(el).toHaveProperty("value", `${totalNudgesUp}`);
    await userEvent.keyboard("{/ArrowUp}");
  });
});

describe("direct changes to the value", () => {
  it("incrementing correctly updates the value after focus and blur events", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="1" />);
    const input = page.getBySelector(`calcite-input input`);

    await userEvent.click(el);
    el.blur();
    el.value = "2";

    expect(el).toHaveProperty("value", "2");
    expect(input).toHaveDisplayValue("2");
  });

  it("does not fire any input or change events when a focused input is blurred after its value is set directly", async () => {
    const { el } = await mount<Input>(<calcite-input />);
    const inputEventHandler = vi.fn();
    const changeEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);
    el.addEventListener("calciteInputChange", changeEventHandler);

    expect(inputEventHandler).not.toHaveBeenCalled();
    expect(changeEventHandler).not.toHaveBeenCalled();

    await el.setFocus();
    el.value = "not a random value";
    await userEvent.keyboard("{Tab}");

    expect(inputEventHandler).not.toHaveBeenCalled();
    expect(changeEventHandler).not.toHaveBeenCalled();
  });

  it("Setting the value to Infinity prevents typing additional numbers and clears the value on Backspace or Delete", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    el.value = "Infinity";

    expect(el).toHaveProperty("value", "Infinity");

    await userEvent.keyboard("123");

    expect(el).toHaveProperty("value", "Infinity");

    await userEvent.keyboard("{Backspace}");

    expect(el).toHaveProperty("value", "");
  });
});

it("number input value stays in sync when value property is controlled with javascript", async () => {
  const { el } = await mount<Input>(<calcite-input type="number" value="1" />);
  const input = page.getBySelector(`calcite-input input`);
  el.addEventListener("calciteInputInput", () => {
    el.value = "5";
  });

  await userEvent.click(el);
  await userEvent.keyboard("1");

  expect(el).toHaveProperty("value", "5");
  expect(input).toHaveDisplayValue("5");

  await userEvent.keyboard("2");

  expect(el).toHaveProperty("value", "5");
  expect(input).toHaveDisplayValue("5");
});

describe("number type", () => {
  it("doesn't round numbers larger than double-precision floating-point", async () => {
    const preciseNumber = "4.9999999999999999";
    const { el } = await mount<Input>(<calcite-input type="number" value={preciseNumber} />);

    expect(el).toHaveProperty("value", preciseNumber);
  });

  it("allows typing negative decimal values", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("-");

    expect(el).toHaveProperty("value", "");

    await userEvent.keyboard("0.001");

    expect(el).toHaveProperty("value", "-0.001");
  });

  it("allows exponential number format", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("1.2e5");

    expect(el).toHaveProperty("value", "1.2e5");

    await userEvent.keyboard("{ArrowLeft}-");

    expect(el).toHaveProperty("value", "1.2e-5");
  });

  it("sanitizes numbers when using exponential format", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("------000005eeee00005----eee");

    expect(el).toHaveProperty("value", "-5e5");
  });

  it("increments correctly with exponential numbers", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("2e-2");

    expect(el).toHaveProperty("value", "2e-2");

    await userEvent.keyboard("{ArrowUp}");

    expect(el).toHaveProperty("value", "1.02");
  });

  it("decrements correctly with exponential numbers", async () => {
    const { el } = await mount<Input>(<calcite-input step={5} type="number" />);

    await el.setFocus();
    await userEvent.keyboard("2e2");

    expect(el).toHaveProperty("value", "2e2");

    await userEvent.keyboard("{ArrowDown}");

    expect(el).toHaveProperty("value", "195");
  });

  it("allows deleting exponential number from decimal and adding trailing zeros", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("2.100e10");

    expect(el).toHaveProperty("value", "2.1e10");
    expect(page.getBySelector("calcite-input input")).toHaveDisplayValue("2.1e10");

    await userEvent.keyboard("{Backspace}");

    expect(el).toHaveProperty("value", "2.1e1");
    expect(page.getBySelector("calcite-input input")).toHaveDisplayValue("2.1e1");

    await userEvent.keyboard("{Backspace}");

    expect(el).toHaveProperty("value", "2.1");
    expect(page.getBySelector("calcite-input input")).toHaveDisplayValue("2.1");

    await userEvent.keyboard("000");

    expect(el).toHaveProperty("value", "2.1000");
    expect(page.getBySelector("calcite-input input")).toHaveDisplayValue("2.1000");
  });

  it("disallows typing any non-numeric characters with shift modifier key down", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);
    const nonELetterKeys = letterKeys.filter((key) => key !== "e");

    await el.setFocus();

    for (let i = 0; i < nonELetterKeys.length; i++) {
      await userEvent.keyboard(`{Shift>}${nonELetterKeys[i]}{/Shift}`);

      expect(el).toHaveProperty("value", "");
      expect(page.getBySelector("calcite-input input")).toHaveDisplayValue("");
    }
  });

  it("allows typing numeric characters with shift modifier key down (#6854)", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);
    const numberKeysExcludingZero = numberKeys.slice(1);

    await el.setFocus();

    let result = "";
    for (let i = 0; i < numberKeysExcludingZero.length; i++) {
      await userEvent.keyboard(`{Shift>}${numberKeysExcludingZero[i]}{/Shift}`);
      result += numberKeysExcludingZero[i];

      expect(el).toHaveProperty("value", result);
      expect(page.getBySelector("calcite-input input")).toHaveDisplayValue(result);
    }
  });

  it("allows shift tabbing", async () => {
    await mount<Input>(
      <div>
        <calcite-input id="1" type="number" />
        <calcite-input id="2" type="number" />
      </div>,
    );

    const inputs = page.getBySelector("calcite-input");

    await userEvent.keyboard("{Tab}{Tab}");

    await expect.element(inputs.last()).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");

    await expect.element(inputs.first()).toHaveFocus();
  });

  it("typing zero and then a non-zero number sets and emits the non-zero number", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);
    const inputEventHandler = vi.fn();
    el.addEventListener("calciteInputInput", inputEventHandler);

    await el.setFocus();
    await userEvent.keyboard("0");

    expect(el).toHaveProperty("value", "0");
    expect(inputEventHandler).toHaveBeenCalledTimes(1);

    await userEvent.keyboard("1");

    expect(el).toHaveProperty("value", "1");
    expect(inputEventHandler).toHaveBeenCalledTimes(2);
  });

  it("allows any valid number", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" />);

    await el.setFocus();
    await userEvent.keyboard("1.005");

    expect(el).toHaveProperty("value", "1.005");
  });

  it("allows negative numbers after clearing value with an empty string", async () => {
    const { el } = await mount<Input>(<calcite-input type="number" value="1" />);

    el.value = "";

    expect(el).toHaveProperty("value", "");

    await el.setFocus();
    await userEvent.keyboard("-123");

    expect(el).toHaveProperty("value", "-123");
  });
});

it("input event fires when number ends with a decimal", async () => {
  const { el } = await mount<Input>(<calcite-input type="number" value="1.2" />);
  const inputEventHandler = vi.fn();
  el.addEventListener("calciteInputInput", inputEventHandler);

  await userEvent.keyboard("{Tab}{ArrowRight}{Backspace}");

  expect(el).toHaveProperty("value", "1.");
  expect(inputEventHandler).toHaveBeenCalledTimes(1);
});

describe("number locale support", () => {
  supportedNlsLocales.forEach((locale) => {
    it(`displays decimal separator on initial load for ${locale} locale`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount(
        <calcite-input lang={locale} type="number" value={expectedValue} />,
      );
      const input = page.getBySelector("calcite-input input");

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays group and decimal separator on initial load for ${locale} locale using opt-in prop`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: true,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount<Input>(
        <calcite-input group-separator lang={locale} type="number" value={expectedValue} />,
      );
      const input = page.getBySelector("calcite-input input");

      expect(el.value).toBe(expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`allows typing valid decimal characters for ${locale} locale`, async () => {
      const expectedValue = "1234.56";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount(<calcite-input lang={locale} type="number" />);
      const input = page.getBySelector("calcite-input input");

      await userEvent.keyboard(`{Tab}`);
      await userEvent.keyboard(`1234${decimalSeparator}56`);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays correct formatted value when using exponential numbers for ${locale} locale`, async () => {
      const expectedValue = "1.5e-6";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount(<calcite-input lang={locale} type="number" />);
      const input = page.getBySelector("calcite-input input");

      await userEvent.keyboard(`{Tab}1${decimalSeparator}5e-6`);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(input).toHaveProperty("value", expectedFormattedValue);
    });

    it(`displays correct formatted value when the value is changed programmatically for ${locale} locale`, async () => {
      const expectedValue = "1234567.891011";
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const expectedFormattedValue = numberStringFormatter.localize(expectedValue);
      const { el } = await mount<Input>(
        <div>
          <calcite-input lang={locale} type="number" />
          <input id="external" />
        </div>,
      );

      const external = page.getBySelector("#external");
      external.element().addEventListener("input", (event) => {
        const value = (event.target as HTMLInputElement).value;
        if (value.endsWith(".")) {
          return;
        }
        el.value = value;
      });

      const internalInput = page.getBySelector("calcite-input input");

      await userEvent.click(external);
      await userEvent.keyboard(expectedValue);

      expect(el).toHaveProperty("value", expectedValue);
      await expect.element(internalInput).toHaveProperty("value", expectedFormattedValue);
    });

    it(`should be able to append values after Backspace for ${locale} locale`, async () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount<Input>(<calcite-input lang={locale} type="number" />);

      const input = page.getBySelector("calcite-input input");
      await el.setFocus();

      await userEvent.keyboard(`0${decimalSeparator}0000`);

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0000`);

      await userEvent.keyboard("{ArrowRight>6/}{Backspace}1");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0001`);

      await userEvent.keyboard("01");
      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}000101`);
    });

    it(`should keep leading decimal separator while input is focused on Backspace ${locale} locale `, async () => {
      numberStringFormatter.numberFormatOptions = {
        locale,
        numberingSystem: "latn",
        useGrouping: false,
      };
      const decimalSeparator = numberStringFormatter.decimal;
      const { el } = await mount<Input>(<calcite-input lang={locale} type="number" />);
      const input = page.getBySelector("calcite-input input");
      await el.setFocus();

      await userEvent.keyboard(`0${decimalSeparator}01`);

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}01`);

      await userEvent.keyboard("{Backspace}");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}0`);

      await userEvent.keyboard("{Backspace}");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}`);

      await userEvent.keyboard("01");

      await expect.element(input).toHaveProperty("value", `0${decimalSeparator}01`);
    });

    it(`should sanitize leading decimal zeros on initial render ${locale} locale`, async () => {
      await mount(<calcite-input lang={locale} type="number" value="0.0000" />);
      const input = page.getBySelector("calcite-input input");

      await expect.element(input).toHaveProperty("value", "0");
    });
  });

  it(`allows negative, decimal numbers for ar locale`, async () => {
    const value = "-0001.0001";
    const { el } = await mount<Input>(<calcite-input lang="ar" type="number" />);

    await userEvent.keyboard(`{Tab}${value}{Tab}`);

    expect(el).toHaveProperty("value", "-1.0001");
  });
});
