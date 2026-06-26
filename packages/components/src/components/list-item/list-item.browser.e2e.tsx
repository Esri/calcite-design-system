import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";
import type { ListItem } from "./list-item";

describe("defaults", () => {
  defaults(
    () => mount("calcite-list-item"),
    [
      {
        propertyName: "description",
        defaultValue: undefined,
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "selected",
        defaultValue: false,
      },
      {
        propertyName: "value",
        defaultValue: undefined,
      },
      {
        propertyName: "open",
        defaultValue: false,
      },
      {
        propertyName: "expanded",
        defaultValue: false,
      },
      {
        propertyName: "closed",
        defaultValue: false,
      },
      {
        propertyName: "closable",
        defaultValue: false,
      },
      {
        propertyName: "dragHandle",
        defaultValue: false,
      },
      {
        propertyName: "filterHidden",
        defaultValue: false,
      },
      {
        propertyName: "unavailable",
        defaultValue: false,
      },
      {
        propertyName: "displayMode",
        defaultValue: "flat",
      },
      {
        propertyName: "iconStart",
        defaultValue: undefined,
      },
      {
        propertyName: "iconEnd",
        defaultValue: undefined,
      },
      {
        propertyName: "iconFlipRtl",
        defaultValue: undefined,
      },
      {
        propertyName: "sortHandleOpen",
        defaultValue: false,
      },
      {
        propertyName: "sortDisabled",
        defaultValue: false,
      },
    ],
  );
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-list-item"),
    [
      {
        propertyName: "unavailable",
        value: true,
      },
      {
        propertyName: "sortHandleOpen",
        value: true,
      },
      {
        propertyName: "open",
        value: true,
      },
      {
        propertyName: "expanded",
        value: true,
      },
      {
        propertyName: "closed",
        value: true,
      },
      {
        propertyName: "closable",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-list-item"));
});

describe("renders", () => {
  renders(() => mount("calcite-list-item"), { display: "flex" });
});

describe("slots", () => {
  slots(() => mount("calcite-list-item"), SLOTS);
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-list-item active />), {
    shadowFocusTargetSelector: `.${CSS.container}`,
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-list-item active label="test" />));
});

it("emits calciteInternalListItemChange only when metadata values change", async () => {
  const { el, component } = await mount<ListItem>(<calcite-list-item />);
  const eventSpy = vi.fn();

  el.addEventListener("calciteInternalListItemChange", eventSpy);

  el.metadata = { first: "same", second: "value" };
  await component.updateComplete;

  el.metadata = { second: "value", first: "same" };
  await component.updateComplete;

  el.metadata = { first: "different", second: "value" };
  await component.updateComplete;

  el.metadata = { keyword: "different", nested: { key: "same" } };
  await component.updateComplete;

  el.metadata = { keyword: "different", nested: { key: "same" } };
  await component.updateComplete;

  el.metadata = { keyword: "different", nested: { key: "changed" } };
  await component.updateComplete;

  el.metadata = {
    tags: ["a", "b"],
    when: "2024-01-01T00:00:00.000Z",
  };
  await component.updateComplete;

  el.metadata = {
    tags: ["a", "b"],
    when: "2024-01-01T00:00:00.000Z",
  };
  await component.updateComplete;

  el.metadata = {
    tags: ["a", "b", "c"],
    when: "2024-01-01T00:00:00.000Z",
  };
  await component.updateComplete;

  expect(eventSpy).toHaveBeenCalledTimes(6);
});
