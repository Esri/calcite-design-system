import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  focusable,
  t9n,
  disabled,
} from "../../tests/commonTests/browser";
import { mockConsole } from "../../tests/utils/logging";

mockConsole();

describe("cancelable", () => {
  mockConsole();
  cancelable("calcite-filter");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-filter"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "filteredItems",
        defaultValue: [],
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-filter"), {
    shadowFocusTargetSelector: "calcite-input",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-filter"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "s",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-filter"));
});

describe("renders", () => {
  renders(() => mount("calcite-filter"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-filter"));
});

describe("disabled", () => {
  disabled(() => mount("calcite-filter"));
});

describe("clear", () => {
  it("should clear the value and prevent default on Escape only when value is not empty", async () => {
    const { el } = await mount("calcite-filter");
    el.items = [{ foo: "bar" }];

    const input = el.shadowRoot
      .querySelector("calcite-input")
      .shadowRoot.querySelector<HTMLInputElement>("input");
    const escapeDefaultPrevented: boolean[] = [];

    el.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        escapeDefaultPrevented.push(event.defaultPrevented);
      }
    });

    await userEvent.click(input);

    expect(el.value).toBe("");
    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[0]).toBe(false);
    expect(el.value).toBe("");

    await userEvent.click(input);
    await userEvent.type(input, "something");

    expect(el.value).toBe("something");

    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[1]).toBe(true);
    expect(el.value).toBe("");

    await userEvent.keyboard("{Escape}");
    expect(escapeDefaultPrevented[2]).toBe(false);
    expect(el.value).toBe("");
  });
});
