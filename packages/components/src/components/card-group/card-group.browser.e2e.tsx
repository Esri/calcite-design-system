import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  accessible,
} from "../../tests/commonTests/browser";
import type { CardGroup } from "./card-group";

describe("accessible", () => {
  describe("is accessible in selection mode none (default)", () => {
    accessible(() =>
      mount(
        <calcite-card-group label="test-label-group">
          <calcite-card label="test-label">
            <span slot="heading">Heading</span>
          </calcite-card>
          <calcite-card label="test-label-2">
            <span slot="heading">Heading</span>
          </calcite-card>
        </calcite-card-group>,
      ),
    );
  });

  describe("is accessible in selection mode single", () => {
    accessible(() =>
      mount(
        <calcite-card-group label="test-label-group" selection-mode="single">
          <calcite-card label="test-label">
            <span slot="heading">Heading</span>
          </calcite-card>
          <calcite-card label="test-label-2">
            <span slot="heading">Heading</span>
          </calcite-card>
        </calcite-card-group>,
      ),
    );
  });

  describe("is accessible in selection mode single-persist", () => {
    accessible(() =>
      mount(
        <calcite-card-group label="test-label-group" selection-mode="single-persist">
          <calcite-card label="test-label">
            <span slot="heading">Heading</span>
          </calcite-card>
          <calcite-card label="test-label-2">
            <span slot="heading">Heading</span>
          </calcite-card>
        </calcite-card-group>,
      ),
    );
  });

  describe("is accessible in selection mode multiple", () => {
    accessible(() =>
      mount(
        <calcite-card-group label="test-label-group" selection-mode="multiple">
          <calcite-card label="test-label">
            <span slot="heading">Heading</span>
          </calcite-card>
          <calcite-card label="test-label-2">
            <span slot="heading">Heading</span>
          </calcite-card>
        </calcite-card-group>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-card-group"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-card-group"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-card-group label="test-label">
          <calcite-card />
        </calcite-card-group>,
      ),
    {
      display: "block",
    },
  );
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-card-group>
          <calcite-card label="test-label">
            <span slot="heading">Heading</span>
          </calcite-card>
          <calcite-card label="test-label-2">
            <span slot="heading">Heading</span>
          </calcite-card>
        </calcite-card-group>,
      ),
    {
      focusTargetSelector: "calcite-card:first-of-type",
    },
  );
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-card-group>
          <calcite-card />
        </calcite-card-group>,
      ),
    { focusTarget: "none" },
  );
});

describe("scale propagation", () => {
  it("applies initial card-group scale to slotted cards", async () => {
    await mount<CardGroup>(
      <calcite-card-group scale="m">
        <calcite-card />
        <calcite-card />
      </calcite-card-group>,
    );

    const card1 = page.getBySelector("calcite-card:first-of-type");
    const card2 = page.getBySelector("calcite-card:last-of-type");

    await expect.element(card1).toHaveProperty("scale", "m");
    await expect.element(card2).toHaveProperty("scale", "m");
  });

  it("updates slotted card scale when card-group scale changes", async () => {
    const { el } = await mount<CardGroup>(
      <calcite-card-group>
        <calcite-card />
        <calcite-card />
      </calcite-card-group>,
    );

    const card1 = page.getBySelector("calcite-card:first-of-type");
    const card2 = page.getBySelector("calcite-card:last-of-type");

    await expect.element(card1).toHaveProperty("scale", "m");
    await expect.element(card2).toHaveProperty("scale", "m");

    el.scale = "l";

    await expect.element(card1).toHaveProperty("scale", "l");
    await expect.element(card2).toHaveProperty("scale", "l");
  });
});
