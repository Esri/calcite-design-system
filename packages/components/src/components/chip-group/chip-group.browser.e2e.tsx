import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import { disabled, focusable, hidden, renders, accessible } from "../../tests/commonTests/browser";

describe("accessible", () => {
  describe("selection mode none (default)", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode single", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="single">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode single persist", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="single-persist">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });

  describe("selection mode multiple", () => {
    accessible(() =>
      mount(
        <calcite-chip-group label="test-label" selection-mode="multiple">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-chip-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-chip-group>
          <calcite-chip />
        </calcite-chip-group>,
      ),
    {
      display: "flex",
    },
  );
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-chip-group label="test-label">
          <calcite-chip label="test-label" />
          <calcite-chip label="test-label" />
        </calcite-chip-group>,
      ),
    {
      focusTargetSelector: "calcite-chip:first-of-type",
    },
  );
});

describe("keyboard navigation", () => {
  it("moves focus between chips with arrow keys", async () => {
    await mount(
      <calcite-chip-group label="test-label" selection-mode="multiple">
        <calcite-chip id="chip-1" label="test-label" />
        <calcite-chip id="chip-2" label="test-label" />
        <calcite-chip id="chip-3" label="test-label" />
      </calcite-chip-group>,
    );

    await userEvent.click(page.getBySelector("#chip-1"));
    expect(document.activeElement?.id).toBe("chip-1");

    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement?.id).toBe("chip-2");

    await userEvent.keyboard("{ArrowLeft}");
    expect(document.activeElement?.id).toBe("chip-1");
  });
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-chip-group>
          <calcite-chip />
        </calcite-chip-group>,
      ),
    {
      focusTarget: "child",
    },
  );
});
