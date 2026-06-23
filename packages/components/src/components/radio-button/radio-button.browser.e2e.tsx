import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  focusable,
  formAssociated,
  internalLabel,
  renders,
  disabled,
  defaults,
  reflects,
  hidden,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";

describe("defaults", () => {
  defaults(
    () => mount("calcite-radio-button"),
    [
      { propertyName: "scale", defaultValue: "m" },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("accessible", () => {
  accessible(() =>
    mount("calcite-label", {
      afterConnect: (el) => {
        el.innerHTML = `<calcite-radio-button id="example" name="example" value="one"></calcite-radio-button>label`;
      },
    }),
  );
});

describe("accessible without calcite-label", () => {
  accessible(() =>
    mount("calcite-radio-button", {
      afterConnect: (el) => {
        el.id = "example";
        el.label = "label";
        el.name = "example";
        el.value = "one";
      },
    }),
  );
});

describe("is form-associated", () => {
  describe("no group", () => {
    formAssociated(() => mount("calcite-radio-button"), {
      testValue: true,
      inputType: "radio",
    });
  });

  // skipped until the util supports a parent component wrapping the form associated element(s)
  // https://github.com/Esri/calcite-design-system/issues/9221
  describe.skip("group", () => {
    formAssociated(
      () =>
        mount("calcite-radio-button-group", {
          afterConnect: (el) => {
            el.name = "using";
            el.required = true;
            el.innerHTML = `
              <calcite-label layout="inline">
                Yes
                <calcite-radio-button required value="yes"></calcite-radio-button>
              </calcite-label>
              <calcite-label layout="inline">
                No
                <calcite-radio-button required value="no"></calcite-radio-button>
              </calcite-label>
              <calcite-label layout="inline">
                Maybe
                <calcite-radio-button required value="maybe"></calcite-radio-button>
              </calcite-label>
            `;
          },
        }),
      {
        testValue: true,
        inputType: "radio",
        validation: true,
        changeValueKeys: ["{Space}"],
      },
    );
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-radio-button"),
    [
      { propertyName: "checked", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-radio-button"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-radio-button`));
});

describe("renders", () => {
  renders(() => mount("calcite-radio-button"), { display: "block" });
});

describe("is focusable", () => {
  focusable(() => mount("calcite-radio-button"), {
    shadowFocusTargetSelector: ".container",
  });
});

describe("disabled", () => {
  disabled(() => mount("calcite-radio-button"), {
    focusTarget: {
      tab: "calcite-radio-button",
      click: {
        pointer: "calcite-radio-button",
        method: "body",
      },
    },
  });
});
