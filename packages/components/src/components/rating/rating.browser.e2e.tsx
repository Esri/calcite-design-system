import { h } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { page, userEvent } from "vitest/browser";
import {
  disabled,
  defaults,
  focusable,
  hidden,
  internalLabel,
  reflects,
  renders,
  scalePropagates,
  t9n,
  formAssociated,
  accessible,
  labelable,
  themed,
} from "../../tests/common";
import { defaultValidity } from "../../tests/common/defaults";
import { CSS } from "./resources";
import type { Rating } from "./rating";

describe("labelable", () => {
  labelable((mountOptions) => mount("calcite-rating", mountOptions));

  describe("focuses the first star when the label is clicked and no-rating value exists", () => {
    labelable((mountOptions) => mount("calcite-rating", mountOptions), {
      focusTarget: () => page.getByRole("radio").first(),
    });
  });

  describe("focuses the value-matching star when the label is clicked", () => {
    labelable((mountOptions) => mount(<calcite-rating value={3} />, mountOptions), {
      focusTarget: () => page.getByRole("radio").nth(2),
    });
  });
});

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

describe("propagates", () => {
  scalePropagates((mountOptions) => mount(<calcite-rating count={1} show-chip />, mountOptions), {
    targetSelector: "calcite-chip",
  });
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

describe("keyboard interaction", () => {
  it.each([
    { dir: "ltr", expectedValue: 4 },
    { dir: "rtl", expectedValue: 2 },
  ] as const)(
    "moves value in the physical arrow key direction when dir is $dir",
    async ({ dir, expectedValue }) => {
      const changeHandler = vi.fn();
      const { el } = await mount<Rating>(
        <calcite-rating dir={dir} oncalciteRatingChange={changeHandler} value={3} />,
      );

      await userEvent.tab();
      await userEvent.keyboard("{ArrowRight}");

      await expect.element(el).toHaveProperty("value", expectedValue);
      expect(changeHandler).toHaveBeenCalledTimes(1);

      await userEvent.keyboard("{ArrowLeft}");

      await expect.element(el).toHaveProperty("value", 3);
      expect(changeHandler).toHaveBeenCalledTimes(2);
    },
  );
});
