import { h, JsxNode } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { describe, it, expect } from "vitest";
import { mockConsole } from "../../tests/utils/logging";
import {
  accessible,
  cancelable,
  defaults,
  reflects,
  hidden,
  renders,
  disabled,
  focusable,
  scalePropagates,
} from "../../tests/common";
import { page, userEvent } from "vitest/browser";
import { TemplateResult } from "lit";
import type { BlockGroup } from "./block-group";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-block-group>
        <calcite-block description="description" expandable heading="heading" open>
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    ),
  );
});

describe("cancelable", () => {
  cancelable("calcite-block-group");
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "dragEnabled",
        defaultValue: false,
      },
      {
        propertyName: "expandMode",
        defaultValue: "multiple",
      },
      {
        propertyName: "group",
        defaultValue: undefined,
      },
      {
        propertyName: "label",
        defaultValue: undefined,
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
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
    () => mount("calcite-block-group"),
    [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "dragEnabled",
        value: true,
      },
      {
        propertyName: "expandMode",
        value: "multiple",
      },
      {
        propertyName: "group",
        value: "test",
      },
      {
        propertyName: "loading",
        value: true,
      },
      {
        propertyName: "sortDisabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-block-group"));
});

describe("renders", () => {
  renders(() => mount(<calcite-block-group>content</calcite-block-group>), { display: "block" });
});

describe("propagates", () => {
  scalePropagates(
    (mountOptions) =>
      mount(
        <calcite-block-group>
          <calcite-block />
          <calcite-block-group />
        </calcite-block-group>,
        mountOptions,
      ),
    {
      targetSelector:
        "calcite-block-group > calcite-block, calcite-block-group > calcite-block-group",
    },
  );
});

function renderBlock(): JsxNode {
  return (
    <calcite-block description="description" expandable heading="heading" open>
      <div>content</div>
    </calcite-block>
  );
}

describe("is focusable", () => {
  focusable(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTargetSelector: "calcite-block",
  });
});

describe("disabled", () => {
  disabled(() => mount(<calcite-block-group>{renderBlock()}</calcite-block-group>), {
    focusTarget: "child",
  });
});

describe("a11y attributes", () => {
  it("should omit aria-busy when not loading and set it when loading", async () => {
    const { reRender, el } = await mount<BlockGroup>(<calcite-block-group label="Blocks" />);
    const group = page.getByRole("group", { name: "Blocks" });

    await expect.element(group).not.toHaveAttribute("aria-busy");

    el.loading = true;
    await reRender();

    await expect.element(group).toHaveAttribute("aria-busy", "true");
  });
});

describe("expandMode", () => {
  const nestedBlockHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode}>
        <calcite-block expandable heading="Asia">
          <calcite-block expandable heading="Himalayas" slot="children" />
          <calcite-block expandable heading="Karakoram" slot="children" />
        </calcite-block>
        <calcite-block expandable heading="Africa" />
      </calcite-block-group>
    );
  };

  const nestedBlockGroupHTML = (expandMode: BlockGroup["expandMode"]): TemplateResult => {
    return (
      <calcite-block-group expandMode={expandMode} label="Water Layers">
        <calcite-block-group label="Rivers">
          <calcite-block expandable heading="Rivers" />
          <calcite-block expandable heading="Gauging Stations" />
        </calcite-block-group>
        <calcite-block-group expandMode={expandMode} label="Lakes & Ponds">
          <calcite-block expandable heading="Lakes" />
          <calcite-block expandable heading="Ponds" />
        </calcite-block-group>
      </calcite-block-group>
    );
  };

  it("should allow only one block element to expand or collapse when expandMode is single", async () => {
    await mount(nestedBlockHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand or collapse in same block-group when expandMode is single", async () => {
    await mount(nestedBlockGroupHTML("single"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow only one block element in same block-group to expand and disallow collapsing when expandMode is single-persist", async () => {
    await mount(nestedBlockGroupHTML("single-persist"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", false);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse when expandMode is multiple", async () => {
    await mount(nestedBlockHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");
    const nestedBlockElements = page.getBySelector("calcite-block[slot='children']");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);

    await userEvent.click(nestedBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(nestedBlockElements.nth(1)).toHaveProperty("expanded", true);
  });

  it("should allow multiple block elements to expand and collapse in nested groups when expandMode is multiple", async () => {
    await mount(nestedBlockGroupHTML("multiple"));
    const descendantBlockElements = page.getBySelector("calcite-block-group > calcite-block");

    await userEvent.click(descendantBlockElements.nth(0));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", false);

    await userEvent.click(descendantBlockElements.nth(1));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(2));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);

    await userEvent.click(descendantBlockElements.nth(3));
    await expect.element(descendantBlockElements.nth(0)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(1)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(2)).toHaveProperty("expanded", true);
    await expect.element(descendantBlockElements.nth(3)).toHaveProperty("expanded", true);
  });
});
