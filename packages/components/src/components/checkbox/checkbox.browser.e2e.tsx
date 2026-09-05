import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page } from "vitest/browser";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  labelable,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS } from "./resources";

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-checkbox", mountOptions), {
    propertyToToggle: "checked",
    focusTarget: () => page.getByRole("checkbox").first(),
  });
});

describe("accessible", () => {
  accessible(() =>
    mount(
      <calcite-label>
        <calcite-checkbox id="example" name="example" value="one" /> label
      </calcite-label>,
    ),
  );
});

describe("accessible without calcite-label", () => {
  accessible(() =>
    mount(<calcite-checkbox id="example" label="label" name="example" value="one" />),
  );
});

describe("renders", () => {
  renders(() => mount("calcite-checkbox"), { display: "inline-flex" });
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-checkbox"),
    [
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-checkbox"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-checkbox`));
});

describe("is focusable", () => {
  focusable(() => mount("calcite-checkbox"), {
    shadowFocusTargetSelector: ".toggle",
  });

  describe("translation support", () => {
    t9n(() => mount("calcite-checkbox"));
  });
});

describe("is form associated", () => {
  formAssociated(() => mount("calcite-checkbox"), {
    inputType: "checkbox",
    testValue: true,
  });
});

describe("disabled", () => {
  disabled(() => mount("calcite-checkbox"), {
    focusTarget: {
      tab: "calcite-checkbox",
      click: {
        pointer: "calcite-checkbox",
        method: "body",
      },
    },
  });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount(<calcite-checkbox name="s-unchecked" scale="s" />), {
      "--calcite-checkbox-size": [
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "inlineSize",
        },
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "blockSize",
        },
      ],
      "--calcite-checkbox-icon-color": {
        shadowSelector: `.${CSS.check}`,
        targetProp: "color",
      },
    });
  });
  describe("checked", () => {
    themed(() => mount(<calcite-checkbox checked name="s-checked" scale="s" />), {
      "--calcite-checkbox-border-color-hover": [
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "backgroundColor",
          state: "hover",
        },
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "boxShadow",
          state: "hover",
        },
      ],
      "--calcite-checkbox-border-color-press": [
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "backgroundColor",
          state: { press: `calcite-checkbox >>> .${CSS.check}` },
        },
        {
          shadowSelector: `.${CSS.check}`,
          targetProp: "boxShadow",
          state: { press: `calcite-checkbox >>> .${CSS.check}` },
        },
      ],
    });
  });
});
