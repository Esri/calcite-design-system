import { h } from "@arcgis/lumina";
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
} from "../../tests/commonTests/browser";
import { CSS, DURATIONS } from "./resources";
import { alertQueueTimeoutMs } from "./AlertManager";
import type { Alert } from "./alert";

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
