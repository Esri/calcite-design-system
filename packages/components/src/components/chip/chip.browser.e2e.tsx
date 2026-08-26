import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

import {
  accessible,
  defaults,
  disabled,
  focusable,
  reflects,
  hidden,
  renders,
  scalePropagates,
  slots,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { CSS, SLOTS } from "./resources";

describe("accessible with icon only", () => {
  accessible(() => mount(<calcite-chip icon="basemap" label="Gray basemap" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-chip"),
    [
      { propertyName: "appearance", defaultValue: "solid" },
      { propertyName: "closable", defaultValue: false },
      { propertyName: "closed", defaultValue: false },
      { propertyName: "closeOnDelete", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "icon", defaultValue: undefined },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "kind", defaultValue: "neutral" },
      { propertyName: "label", defaultValue: undefined },
      { propertyName: "messageOverrides", defaultValue: undefined },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "value", defaultValue: undefined },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount(<calcite-chip interactive>doritos</calcite-chip>));
});

describe("disabled", () => {
  disabled(() => mount(<calcite-chip interactive>doritos</calcite-chip>));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-chip"),
    [
      { propertyName: "appearance", value: "solid" },
      { propertyName: "closable", value: true },
      { propertyName: "closed", value: true },
      { propertyName: "closeOnDelete", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "icon", value: "banana" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "kind", value: "neutral" },
      { propertyName: "scale", value: "m" },
      { propertyName: "selected", value: true },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-chip"));
});

describe("renders", () => {
  renders(() => mount(<calcite-chip>doritos</calcite-chip>), { display: "inline-flex" });
});

describe("scale propagation", () => {
  scalePropagates((scale) => mount(<calcite-chip closable scale={scale} />), {
    targetSelector: "calcite-action",
  });
});

describe("slots", () => {
  slots(() => mount("calcite-chip"), SLOTS);
});

describe("translation support", () => {
  t9n(() => mount("calcite-chip"));
});

describe("themed", () => {
  describe("default", () => {
    themed(() => mount("calcite-chip"), {
      "--calcite-chip-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-chip-text-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "color",
      },
      "--calcite-chip-corner-radius": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderRadius",
      },
    });
  });

  describe("appearance='outline'", () => {
    themed(() => mount(<calcite-chip appearance="outline">Layers</calcite-chip>), {
      "--calcite-chip-border-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "borderColor",
      },
    });
  });

  describe("closable", () => {
    themed(() => mount(<calcite-chip closable>Layers</calcite-chip>), {
      "--calcite-chip-close-icon-color": {
        shadowSelector: `.${CSS.close}`,
        targetProp: "--calcite-action-text-color",
      },
    });
  });

  describe("selectable", () => {
    describe("default", () => {
      themed(() => mount(<calcite-chip selection-mode="single">Layers</calcite-chip>), {
        "--calcite-chip-select-icon-color": {
          shadowSelector: `.${CSS.selectIcon}`,
          targetProp: "color",
        },
      });
    });
    describe("selected", () => {
      themed(
        () =>
          mount(
            <calcite-chip selected selection-mode="single">
              Layers
            </calcite-chip>,
          ),
        {
          "--calcite-chip-select-icon-color-press": {
            shadowSelector: `.${CSS.selectIcon}`,
            targetProp: "color",
          },
        },
      );
    });
  });

  describe("icon", () => {
    themed(() => mount(<calcite-chip icon="layer">Layers</calcite-chip>), {
      "--calcite-chip-icon-color": {
        shadowSelector: `.${CSS.chipIcon}`,
        targetProp: "color",
      },
    });
  });

  describe("deprecated", () => {
    themed(
      () =>
        mount(
          <calcite-chip selected selection-mode="single">
            Layers
          </calcite-chip>,
        ),
      {
        "--calcite-chip-select-icon-color-pressed": {
          shadowSelector: `.${CSS.selectIcon}`,
          targetProp: "color",
        },
      },
    );
    themed(() => mount(<calcite-chip icon="layer">Layers</calcite-chip>), {
      "--calcite-ui-icon-color": {
        shadowSelector: `.${CSS.chipIcon}`,
        targetProp: "color",
      },
    });
  });
});
