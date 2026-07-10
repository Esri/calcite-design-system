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
} from "../../tests/commonTests/browser";
import { page, userEvent } from "vitest/browser";
import type { Block } from "../block/block";

mockConsole();

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-block-group>
        <calcite-block collapsible description="description" heading="heading" open>
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

function renderBlock(): JsxNode {
  return (
    <calcite-block collapsible description="description" heading="heading" open>
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

describe("selectionMode", () => {
  it("should allow only one block to be expanded when selectionMode is single", async () => {
    await mount(
      <calcite-block-group selection-mode="single">
        <calcite-block collapsible heading="block 1" open>
          <div>content</div>
        </calcite-block>
        <calcite-block collapsible heading="block 2">
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    );

    const [block1, block2] = page.getBySelector("calcite-block").elements() as Block["el"][];
    await userEvent.click(block2);
    expect(block1.expanded).toBe(false);
    expect(block2.expanded).toBe(true);
  });

  it("should allow multiple block elements to be expanded when selectionMode is multiple", async () => {
    await mount(
      <calcite-block-group selection-mode="multiple">
        <calcite-block collapsible heading="block 1" open>
          <div>content</div>
        </calcite-block>
        <calcite-block collapsible heading="block 2">
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    );

    const [block1, block2] = page.getBySelector("calcite-block").elements() as Block["el"][];
    await userEvent.click(block2);
    expect(block1.expanded).toBe(true);
    expect(block2.expanded).toBe(true);
  });

  it("should not allow expanded block element to collapse when selectionMode is single-persist", async () => {
    await mount(
      <calcite-block-group selection-mode="single-persist">
        <calcite-block collapsible heading="block 1">
          <div>content</div>
        </calcite-block>
        <calcite-block collapsible heading="block 2">
          <div>content</div>
        </calcite-block>
      </calcite-block-group>,
    );

    const [block1, block2] = page.getBySelector("calcite-block").elements() as Block["el"][];
    await userEvent.click(block2);
    expect(block1.expanded).toBe(false);
    expect(block2.expanded).toBe(true);

    await userEvent.click(block2);
    expect(block1.expanded).toBe(false);
    expect(block2.expanded).toBe(true);

    await userEvent.click(block1);
    expect(block1.expanded).toBe(true);
    expect(block2.expanded).toBe(false);
  });

  describe("nested block elements", () => {
    it("should allow only one block to be expanded on click when selectionMode is single", async () => {
      await mount(
        <calcite-block-group selection-mode="single">
          <calcite-block collapsible heading="Asia">
            <calcite-block collapsible heading="Himalayas" slot="sections" />
          </calcite-block>
          <calcite-block collapsible heading="Africa" />
        </calcite-block-group>,
      );

      const [block1, block2] = page
        .getBySelector("calcite-block:not([slot='sections'])")
        .elements() as Block["el"][];
      await userEvent.click(block1);
      expect(block1.expanded).toBe(true);
      expect(block2.expanded).toBe(false);

      const nestedBlock = page
        .getBySelector("calcite-block[slot='sections']")
        .element() as Block["el"];

      await userEvent.click(nestedBlock);
      expect(nestedBlock.expanded).toBe(true);
      expect(block1.expanded).toBe(true);

      await userEvent.click(block2);
      expect(block1.expanded).toBe(false);
      expect(nestedBlock.expanded).toBe(true);
      expect(block2.expanded).toBe(true);
    });

    it("should allow at least one block element expanded on click when selectionMode is single-persist", async () => {
      await mount(
        <calcite-block-group selection-mode="single-persist">
          <calcite-block collapsible heading="Asia">
            <calcite-block collapsible heading="Himalayas" slot="sections" />
          </calcite-block>
          <calcite-block collapsible heading="Africa" />
        </calcite-block-group>,
      );

      const [block1, block2] = page
        .getBySelector("calcite-block:not([slot='sections'])")
        .elements() as Block["el"][];
      const nestedBlock = page
        .getBySelector("calcite-block[slot='sections']")
        .element() as Block["el"];

      await userEvent.click(block2);
      expect(block1.expanded).toBe(false);
      expect(block2.expanded).toBe(true);

      await userEvent.click(block2);
      expect(block1.expanded).toBe(false);
      expect(block2.expanded).toBe(true);

      await userEvent.click(block1);
      expect(block1.expanded).toBe(true);
      expect(nestedBlock.expanded).toBe(false);
      expect(block2.expanded).toBe(false);

      await userEvent.click(nestedBlock);
      expect(block1.expanded).toBe(true);
      expect(nestedBlock.expanded).toBe(true);
      expect(block2.expanded).toBe(false);

      await userEvent.click(nestedBlock);
      expect(block1.expanded).toBe(true);
      expect(nestedBlock.expanded).toBe(false);
      expect(block2.expanded).toBe(false);
    });

    it("should allow multiple block elements to expand on click when selectionMode is multiple", async () => {
      await mount(
        <calcite-block-group selection-mode="multiple">
          <calcite-block collapsible heading="Asia">
            <calcite-block collapsible heading="Himalayas" slot="sections" />
          </calcite-block>
          <calcite-block collapsible heading="Africa" />
        </calcite-block-group>,
      );

      const [block1, block2] = page
        .getBySelector("calcite-block:not([slot='sections'])")
        .elements() as Block["el"][];
      const nestedBlock = page
        .getBySelector("calcite-block[slot='sections']")
        .element() as Block["el"];

      await userEvent.click(block1);
      expect(block1.expanded).toBe(true);
      expect(block2.expanded).toBe(false);

      await userEvent.click(nestedBlock);
      expect(nestedBlock.expanded).toBe(true);
      expect(block1.expanded).toBe(true);

      await userEvent.click(block2);
      expect(block1.expanded).toBe(true);
      expect(nestedBlock.expanded).toBe(true);
      expect(block2.expanded).toBe(true);
    });
  });
});
