import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

import { CSS } from "./resources";
import {
  defaults,
  disabled,
  focusable,
  hidden,
  renders,
  t9n,
accessible, themed
} from "../../tests/commonTests/browser";

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("editing enabled", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable editing-enabled>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("with controls", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable controls>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });

  describe("with controls + editing enabled", () => {
    accessible(() =>
      mount(
        <calcite-label>
          Label
          <calcite-inline-editable controls editing-enabled>
            <calcite-input value="John Doe" />
          </calcite-inline-editable>
        </calcite-label>,
      ),
    );
  });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-inline-editable"),
    [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-inline-editable"));
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    { display: "block" },
  );
});

describe("focusable", () => {
  focusable(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    {
      focusTargetSelector: "calcite-input",
    },
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-inline-editable"));
});

describe("disabled", () => {
  disabled(
    () =>
      mount(
        <calcite-inline-editable>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    { focusTarget: { tab: "calcite-inline-editable", click: "calcite-input" } },
  );
});

describe("theme", () => {
  themed(() => mount("calcite-inline-editable"), {
    "--calcite-inline-editable-background-color-hover": {
      shadowSelector: `.${CSS.wrapper}`,
      state: "hover",
      targetProp: "backgroundColor",
    },
    "--calcite-inline-editable-background-color": {
      shadowSelector: `.${CSS.wrapper}`,
      targetProp: "backgroundColor",
    },
  });
  themed(
    () =>
      mount(
        <calcite-inline-editable controls editing-enabled>
          <calcite-input />
        </calcite-inline-editable>,
      ),
    {
      "--calcite-inline-editable-button-corner-radius": [
        {
          shadowSelector: `.${CSS.enableEditingButton}`,
          targetProp: "--calcite-button-corner-radius",
        },
        {
          shadowSelector: `.${CSS.cancelEditingButton}`,
          targetProp: "--calcite-button-corner-radius",
        },
        {
          shadowSelector: `.${CSS.confirmChangesButton}`,
          targetProp: "--calcite-button-corner-radius",
        },
      ],
      "--calcite-inline-editable-button-loader-color": {
        shadowSelector: `.${CSS.confirmChangesButton}`,
        targetProp: "--calcite-button-loader-color",
      },
      "--calcite-inline-editable-button-text-color": [
        {
          shadowSelector: `.${CSS.enableEditingButton}`,
          targetProp: "--calcite-button-text-color",
        },
        {
          shadowSelector: `.${CSS.cancelEditingButton}`,
          targetProp: "--calcite-button-text-color",
        },
        {
          shadowSelector: `.${CSS.confirmChangesButton}`,
          targetProp: "--calcite-button-text-color",
        },
      ],
    },
  );
});
