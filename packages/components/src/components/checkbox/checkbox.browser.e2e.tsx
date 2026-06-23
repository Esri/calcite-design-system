import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  internalLabel,
  renders,
  t9n,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";

describe("accessible", () => {
  accessible(() =>
    mount(`calcite-label`, {
      afterConnect: (el) => {
        el.innerHTML = `<calcite-checkbox id="example" name="example" value="one"></calcite-checkbox> label`;
      },
    }),
  );
});

describe("accessible without calcite-label", () => {
  accessible(() =>
    mount(`calcite-checkbox`, {
      afterConnect: (el) => {
        el.id = "example";
        el.label = "label";
        el.name = "example";
        el.value = "one";
      },
    }),
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
