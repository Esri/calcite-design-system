import { h, Fragment, type JsxNode } from "@arcgis/lumina";
import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  defaults,
  reflects,
  hidden,
  renders,
  t9n,
  topLayer,
  openClose,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS, DURATIONS } from "./resources";
import { alertQueueTimeoutMs } from "./AlertManager";
import type { Alert } from "./alert";
import { waitForEvent } from "../../tests/commonTests/browser/utils";
import { Action } from "../action/action";

function renderAlertContent(): JsxNode {
  return (
    <>
      <div slot="title">Title Text</div>
      <div slot="message">Message Text</div>
      <a href="" slot="link">
        Action
      </a>
    </>
  );
}

describe("accessible", () => {
  describe("open", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document, "calciteAlertOpen");
      const renderResult = await mount(
        <calcite-alert label="test" open>
          {renderAlertContent()}
        </calcite-alert>,
      );
      await openEvent;
      return renderResult;
    });
  });

  describe("accessible with auto-close", () => {
    accessible(async () => {
      const openEvent = waitForEvent(document, "calciteAlertOpen");
      const renderResult = await mount(
        <calcite-alert autoClose={true} autoCloseDuration="slow" label="test" open>
          {renderAlertContent()}
        </calcite-alert>,
      );
      await openEvent;
      return renderResult;
    });
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-alert"),
    [
      {
        propertyName: "autoCloseDuration",
        defaultValue: "medium",
      },
      {
        propertyName: "embedded",
        defaultValue: false,
      },
      {
        propertyName: "queue",
        defaultValue: "last",
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-alert"),
    [
      {
        propertyName: "queue",
        value: "last",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount(<calcite-alert open />));
});

describe("openClose", () => {
  openClose((mountOptions) => mount("calcite-alert", mountOptions));
});

describe("renders", () => {
  renders(() => mount("calcite-alert"), { visible: false, display: "block" });
});

describe("top layer placement", () => {
  topLayer(() => mount("calcite-alert"));
});

describe("translation support", () => {
  t9n(() => mount("calcite-alert"));
});

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
});

it("retains close button during auto-close delay and closes when clicked", async () => {
  vi.useFakeTimers();

  await mount(
    <calcite-alert
      auto-close
      auto-close-duration="medium"
      icon
      id="alert"
      kind="success"
      label="this is a success"
    />,
  );

  const alert = page.getBySelector("#alert").element() as Alert["el"];
  alert.open = true;

  vi.advanceTimersByTime(alertQueueTimeoutMs);

  expect(alert.open).toBe(true);

  let closeButton = page.getBySelector(`#alert .${CSS.close}`);
  await expect.element(closeButton).toBeVisible();

  vi.advanceTimersByTime(DURATIONS.medium / 2);

  closeButton = page.getBySelector(`#alert .${CSS.close}`);
  await expect.element(closeButton).toBeVisible();

  vi.advanceTimersByTime(DURATIONS.medium / 2 - 1);

  closeButton = page.getBySelector(`#alert .${CSS.close}`);
  await expect.element(closeButton).toBeVisible();
  await userEvent.click(closeButton);

  expect(alert.open).toBe(false);
});

it("renders default and requested properties", async () => {
  await mount(
    <>
      <calcite-alert id="default">{renderAlertContent()}</calcite-alert>
      <calcite-alert autoClose autoCloseDuration="fast" id="requested" kind="warning">
        {renderAlertContent()}
      </calcite-alert>
    </>,
  );

  const defaultAlert = page.getBySelector("#default").element() as Alert["el"];
  const requestedAlert = page.getBySelector("#requested").element() as Alert["el"];

  expect(defaultAlert.kind).toBe("brand");
  expect(defaultAlert.shadowRoot!.querySelector(`.${CSS.close}`)).toBeTruthy();
  expect(defaultAlert.shadowRoot!.querySelector(`.${CSS.icon}`)).toBeNull();
  expect(requestedAlert.kind).toBe("warning");
  expect(requestedAlert.autoCloseDuration).toBe("fast");
  expect(requestedAlert.shadowRoot!.querySelector(`.${CSS.icon}`)).toBeNull();
});

it("renders requested icons, including filled status icons", async () => {
  await mount(
    <>
      <calcite-alert icon id="icon">
        {renderAlertContent()}
      </calcite-alert>
      <calcite-alert icon id="status-icon" kind="danger">
        {renderAlertContent()}
      </calcite-alert>
    </>,
  );

  const alertWithIcon = page.getBySelector("#icon").element() as Alert["el"];
  const statusIcon = page.getBySelector("#status-icon").element() as Alert["el"];
  const icon = statusIcon.shadowRoot!.querySelector("calcite-icon")!;

  expect(alertWithIcon.shadowRoot!.querySelector(`.${CSS.close}`)).toBeTruthy();
  expect(alertWithIcon.shadowRoot!.querySelector(`.${CSS.icon}`)).toBeTruthy();
  expect(icon.getAttribute("icon")).toBe("exclamationMarkTriangleF");
});

it("closes after the configured auto-close duration", async () => {
  vi.useFakeTimers();
  const { el, reRender } = await mount<Alert>(
    <calcite-alert autoClose autoCloseDuration="fast" icon kind="success">
      {renderAlertContent()}
    </calcite-alert>,
  );

  el.open = true;
  await reRender();
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  await reRender();
  expect(el.open).toBe(true);

  vi.advanceTimersByTime(DURATIONS.fast + alertQueueTimeoutMs);
  await reRender();
  expect(el.open).toBe(false);
});

it("displays alerts according to their queue priority", async () => {
  vi.useFakeTimers();
  await mount(
    <>
      <calcite-alert id="alert-1">{renderAlertContent()}</calcite-alert>
      <calcite-alert id="alert-2">{renderAlertContent()}</calcite-alert>
      <calcite-alert id="alert-3">{renderAlertContent()}</calcite-alert>
    </>,
  );

  const [alert1, alert2, alert3] = page.getBySelector("calcite-alert").elements() as Alert["el"][];

  alert1.open = true;
  alert2.open = true;
  alert3.queue = "immediate";
  alert3.open = true;
  await Promise.all([alert1.manager.component.updateComplete, alert2.manager.component.updateComplete, alert3.manager.component.updateComplete]);
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  expect(alert1.active).toBe(false);
  expect(alert2.active).toBe(false);
  expect(alert3.active).toBe(true);

  alert2.queue = "immediate";
  await alert2.manager.component.updateComplete;
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  expect(alert1.active).toBe(false);
  expect(alert2.active).toBe(true);
  expect(alert3.active).toBe(false);

  alert1.queue = "next";
  await alert1.manager.component.updateComplete;
  alert2.open = false;
  await alert2.manager.component.updateComplete;
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  expect(alert1.active).toBe(true);
  expect(alert2.active).toBe(false);
  expect(alert3.active).toBe(false);

  alert2.queue = "next";
  alert2.open = true;
  await alert2.manager.component.updateComplete;
  expect(alert1.active).toBe(true);
  expect(alert2.active).toBe(false);

  alert1.open = false;
  await alert1.manager.component.updateComplete;
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  expect(alert1.active).toBe(false);
  expect(alert2.active).toBe(true);
  expect(alert3.active).toBe(false);
});

it("assigns placement classes", async () => {
  await mount(
    <>
      <calcite-alert id="default-placement" />
      <calcite-alert id="requested-placement" placement="top-end" />
    </>,
  );
  const defaultContainer = page
    .getBySelector("#default-placement")
    .element()
    .shadowRoot!.querySelector(`.${CSS.container}`)!;
  const requestedContainer = page
    .getBySelector("#requested-placement")
    .element()
    .shadowRoot!.querySelector(`.${CSS.container}`)!;

  expect(defaultContainer.classList.contains(CSS.containerBottom)).toBe(true);
  expect(requestedContainer.classList.contains(CSS.containerBottom)).toBe(false);
  expect(requestedContainer.classList.contains(CSS.containerTopEnd)).toBe(true);
});

describe("dismiss progress color", () => {
  async function getProgressColor(modeClass?: string, override?: string): Promise<string> {
    vi.useFakeTimers();
    const { el: alert } = await mount<Alert>(
      <div class={modeClass}>
        {override ? <style>{`:root { --calcite-color-transparent-tint: ${override}; }`}</style> : null}
        <calcite-alert autoClose autoCloseDuration="slow" icon="i2DExplore" kind="danger" open>
          <div slot="message">Successfully duplicated a layer</div>
        </calcite-alert>
      </div>,
    );
    vi.advanceTimersByTime(alertQueueTimeoutMs);
    await alert.manager.component.updateComplete;
    const progress = alert.shadowRoot!.querySelector(`.${CSS.dismissProgress}`)!;
    return getComputedStyle(progress, "::after").backgroundColor;
  }

  it("uses the light mode color by default", async () => {
    expect(await getProgressColor()).toBe("rgba(255, 255, 255, 0.8)");
  });

  it("uses the dark mode color", async () => {
    expect(await getProgressColor("calcite-mode-dark")).toBe("rgba(43, 43, 43, 0.8)");
  });

  it("supports overriding the color", async () => {
    expect(await getProgressColor(undefined, "rgba(255, 0, 0, 0.5)")).toBe(
      "rgba(255, 0, 0, 0.5)",
    );
  });
});

it("updates the queued alert count when alerts are removed", async () => {
  vi.useFakeTimers();
  await mount(
    <>
      <calcite-alert id="first" open />
      <calcite-alert id="second" open />
      <calcite-alert id="third" open />
    </>,
  );
  const first = page.getBySelector("#first").element() as Alert["el"];
  const second = page.getBySelector("#second").element() as Alert["el"];
  const third = page.getBySelector("#third").element() as Alert["el"];
  await Promise.all([first.manager.component.updateComplete, second.manager.component.updateComplete, third.manager.component.updateComplete]);

  let chip = first.shadowRoot!.querySelector("calcite-chip")!;
  expect(chip.value).toBe("+2");
  expect(chip.textContent).toBe("+2");

  third.remove();
  await first.manager.component.updateComplete;
  chip = first.shadowRoot!.querySelector("calcite-chip")!;
  expect((chip).value).toBe("+1");
  expect(chip.textContent).toBe("+1");

  second.remove();
  await first.manager.component.updateComplete;
  expect(first.shadowRoot!.querySelector("calcite-chip")).toBeNull();
});

it("auto-closes queued alerts in order", async () => {
  vi.useFakeTimers();
  await mount(
    <>
      <calcite-alert autoClose id="first-auto-close" open />
      <calcite-alert autoClose id="second-auto-close" open />
    </>,
  );
  const first = page.getBySelector("#first-auto-close").element() as Alert["el"];
  const second = page.getBySelector("#second-auto-close").element() as Alert["el"];
  vi.advanceTimersByTime(alertQueueTimeoutMs);
  await Promise.all([first.manager.component.updateComplete, second.manager.component.updateComplete]);

  expect(first.shadowRoot!.querySelector("calcite-chip")!.textContent).toBe("+1");
  vi.advanceTimersByTime(DURATIONS.medium);
  await first.manager.component.updateComplete;
  expect(first.open).toBe(false);

  vi.advanceTimersByTime(alertQueueTimeoutMs);
  await second.manager.component.updateComplete;
  expect(second.active).toBe(true);

  vi.advanceTimersByTime(DURATIONS.medium);
  await second.manager.component.updateComplete;
  expect(second.open).toBe(false);
});

describe("auto-close pause behavior", () => {
  async function mountAutoCloseAlert(): Promise<{
    el: Alert["el"];
    closeButton: ReturnType<typeof page.getBySelector>;
    outsideButton: ReturnType<typeof page.getBySelector>;
  }> {
    vi.useFakeTimers();
    const { el, reRender } = await mount<Alert>(
      <div>
        <button id="outside">outside</button>
        <calcite-alert autoClose icon kind="success" open>
          {renderAlertContent()}
        </calcite-alert>
      </div>,
    );
    vi.advanceTimersByTime(alertQueueTimeoutMs);
    await reRender();

    return {
      el,
      closeButton: page.getBySelector(`calcite-alert .${CSS.close}`),
      outsideButton: page.getBySelector("#outside"),
    };
  }

  it("pauses while hovered and resumes after pointer leave", async () => {
    const { el } = await mountAutoCloseAlert();
    const container = page.getBySelector(`calcite-alert .${CSS.container}`);

    await userEvent.hover(container);
    vi.advanceTimersByTime(DURATIONS.medium);
    expect(el.open).toBe(true);

    await userEvent.unhover(container);
    vi.advanceTimersByTime(DURATIONS.medium);
    await el.manager.component.updateComplete;
    expect(el.open).toBe(false);
  });

  it("pauses while focused and resumes after blur", async () => {
    const { el, closeButton, outsideButton } = await mountAutoCloseAlert();

    await (closeButton.element() as Action["el"]).setFocus();
    vi.advanceTimersByTime(DURATIONS.medium);
    expect(el.open).toBe(true);

    await userEvent.click(outsideButton);
    vi.advanceTimersByTime(DURATIONS.medium);
    await el.manager.component.updateComplete;
    expect(el.open).toBe(false);
  });
});

describe("theme", () => {
  themed(() => mount(<calcite-alert label="this is a default alert"> </calcite-alert>), {
    "--calcite-alert-width": {
      selector: `calcite-alert`,
      targetProp: "inlineSize",
    },
    "--calcite-alert-background-color": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "backgroundColor",
    },
    "--calcite-alert-corner-radius": [
      {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderRadius",
      },
    ],
    "--calcite-alert-shadow": {
      shadowSelector: `.${CSS.container}`,
      targetProp: "boxShadow",
    },
  });
});
