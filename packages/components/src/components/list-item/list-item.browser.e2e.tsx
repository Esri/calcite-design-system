import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";

import {
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  scalePropagates,
  slots,
  topLayer,
  themed,
} from "../../tests/common";
import { mockConsole } from "../../tests/utils/logging";
import { CSS, SLOTS } from "./resources";
import { ListItem } from "./list-item";

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
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-list-item closable />, mountOptions), {
    targetSelector: "calcite-action",
  });
});

describe("reflects", () => {
  reflects(ListItem, ["unavailable", "sortHandleOpen", "expanded", "closed", "closable"]);
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

describe("top layer placement", () => {
  mockConsole();

  topLayer(
    () => mount(<calcite-list-item drag-handle label="test" set-position="1" set-size="4" />),
    {
      openProp: "sortHandleOpen",
      openEventName: "calciteListItemSortHandleOpen",
      closeEventName: "calciteListItemSortHandleClose",
    },
  );
});

it.each(["click", "Enter"])(
  "honors defaultPrevented on %s from slotted content",
  async (interaction) => {
    const eventSpy = vi.fn();
    const { el, component } = await mount<ListItem>(
      <calcite-list-item
        description="world"
        label="hello"
        oncalciteListItemSelect={eventSpy}
        selection-mode="single"
      >
        <div
          data-testid="content"
          onClick={(event) => event.preventDefault()}
          onKeyDown={(event) => event.preventDefault()}
          slot="content"
          tabIndex={0}
        >
          Hi
        </div>
      </calcite-list-item>,
    );
    const content = page.getByTestId("content");

    await userEvent.click(content);
    await expect.element(content).toHaveFocus();

    if (interaction === "Enter") {
      await userEvent.keyboard("{Enter}");
    }
    await component.updateComplete;

    expect(eventSpy).not.toHaveBeenCalled();
    await expect.element(el).toHaveProperty("selected", false);
  },
);

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

describe("themed", () => {
  describe(`selection-appearance="icon"`, () => {
    themed(
      () =>
        mount(
          <calcite-list-item
            bordered
            description="Home base for park staff to converse with visitors."
            icon-end="banana"
            icon-start="banana"
            interaction-mode="interactive"
            label="Park offices"
            selected
            selection-appearance="icon"
            selection-mode="single"
            value="offices"
          />,
        ),
      {
        "--calcite-list-background-color": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
        },
        "--calcite-list-background-color-hover": {
          shadowSelector: `.${CSS.container}`,
          state: "hover",
          targetProp: "backgroundColor",
        },
        "--calcite-list-background-color-press": {
          shadowSelector: `.${CSS.container}`,
          targetProp: "backgroundColor",
          state: { press: `calcite-list-item >>> .${CSS.content}` },
        },
        "--calcite-list-border-color": {
          shadowSelector: `.${CSS.contentContainerWrapper}`,
          targetProp: "borderBlockEndColor",
        },
        "--calcite-list-content-text-color": {
          shadowSelector: `.${CSS.contentContainer}`,
          targetProp: "color",
        },
        "--calcite-list-description-text-color": {
          shadowSelector: `.${CSS.description}`,
          targetProp: "color",
        },
        "--calcite-list-icon-color": {
          shadowSelector: `.${CSS.selectionContainer}`,
          targetProp: "color",
        },
        "--calcite-list-label-text-color": {
          shadowSelector: `.${CSS.label}`,
          targetProp: "color",
        },
      },
    );
  });

  describe(`selection-appearance="border"`, () => {
    themed(
      () =>
        mount(
          <calcite-list-item
            bordered
            description="Home base for park staff to converse with visitors."
            icon-end="banana"
            icon-start="banana"
            interaction-mode="interactive"
            label="Park offices"
            selected
            selection-appearance="border"
            selection-mode="single"
            value="offices"
          />,
        ),
      {
        "--calcite-list-selection-border-color": [
          {
            shadowSelector: `.${CSS.container}::before`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.containerBorderSelected}`,
            targetProp: "boxShadow",
            state: "focus",
          },
        ],
      },
    );
  });

  describe(`selection-appearance="highlight"`, () => {
    themed(
      () =>
        mount(
          <calcite-list-item
            interaction-mode="interactive"
            label="Park offices"
            selected
            selection-appearance="highlight"
            selection-mode="single"
          />,
        ),
      {
        "--calcite-color-surface-highlight": [
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
            state: { press: `calcite-list-item >>> .${CSS.content}` },
          },
        ],
      },
    );
  });
});
