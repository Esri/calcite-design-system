import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

import {
  disabled,
  defaults,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  t9n,
  formAssociated,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { defaultValidity } from "../../tests/commonTests/browser/defaults";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(`calcite-rating`));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-rating"),
    [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
      {
        propertyName: "validity",
        defaultValue: defaultValidity,
      },
    ],
  );
});

describe("is focusable", () => {
  focusable(() => mount("calcite-rating"), {
    shadowFocusTargetSelector: "label",
  });
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-rating"),
    [
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ],
  );
});

describe("honors hidden attribute", () => {
  hidden(() => mount("calcite-rating"));
});

describe("internal label", () => {
  internalLabel(() => mount(`calcite-rating`));
});

describe("renders", () => {
  renders(() => mount("calcite-rating"), { display: "flex" });
});

describe("translation support", () => {
  t9n(() => mount("calcite-rating"));
});

describe("disabled", () => {
  disabled(() => mount(<calcite-rating value={3} />));
});

describe("is form-associated", () => {
  formAssociated(() => mount("calcite-rating"), { testValue: 3 });
});

describe("theme", () => {
  describe("default", () => {
    themed(() => mount("calcite-rating"), {
      "--calcite-rating-spacing": {
        shadowSelector: `.${CSS.fieldSet}`,
        targetProp: "gap",
      },
      "--calcite-rating-color": {
        shadowSelector: `.${CSS.star}`,
        targetProp: "color",
      },
      "--calcite-rating-color-press": {
        shadowSelector: `.${CSS.star}`,
        targetProp: "color",
        state: { press: `calcite-rating >>> .${CSS.star}` },
      },
    });
  });

  describe("selected", () => {
    themed(() => mount(<calcite-rating value={2} />), {
      "--calcite-rating-color-hover": {
        shadowSelector: `.${CSS.star}[data-value='3']`,
        targetProp: "color",
        state: "hover",
      },
    });
  });

  describe("average", () => {
    themed(() => mount(<calcite-rating average={3.65} count={240} show-chip />), {
      "--calcite-rating-average-color": [
        {
          shadowSelector: `.${CSS.average}`,
          targetProp: "color",
        },
        {
          shadowSelector: `.${CSS.fraction}`,
          targetProp: "color",
        },
      ],
      "--calcite-rating-average-text-color": {
        shadowSelector: `.${CSS.numberAverage}`,
        targetProp: "color",
      },
      "--calcite-rating-count-text-color": {
        shadowSelector: `.${CSS.numberCount}`,
        targetProp: "color",
      },
    });
  });
});
