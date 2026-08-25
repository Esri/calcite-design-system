import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  scalePropagates,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

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
  scalePropagates(
    () =>
      mount(
        <calcite-card-group>
          <calcite-card />
          <calcite-card />
        </calcite-card-group>,
      ),
    { targetSelector: "calcite-card" },
  );
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-card-group"), {
      "--calcite-card-group-space": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    });
  });
  describe("deprecated", () => {
    themed(() => mount("calcite-card-group"), {
      "--calcite-card-group-gap": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "gap",
      },
    });
  });
});
