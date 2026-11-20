import { Fragment, h } from "@arcgis/lumina";
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
  it("updates the UI when focused", async () => {
    const { el } = await mount<Rating>(<calcite-rating value={3} />);
    const stars = page.getBySelector(`.${CSS.star}`);

    await userEvent.tab();

    await expect.poll(() => el.shadowRoot.activeElement).toBe(stars.nth(2).element());
    await expect.poll(() => page.getBySelector(`.${CSS.hovered}`).elements()).toHaveLength(3);
    await expect.poll(() => page.getBySelector(`.${CSS.selected}`).elements()).toHaveLength(3);
    await expect.element(el).toHaveProperty("value", 3);
  });

  it("clears the hover state when focus leaves the rating", async () => {
    await mount(
      <>
        <calcite-rating />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.tab();
    await expect.element(page.getBySelector(`.${CSS.hovered}`)).toBeVisible();
    await userEvent.tab();

    await expect.element(page.getByRole("button", { name: "Next" })).toHaveFocus();
    await expect.element(page.getBySelector(`.${CSS.hovered}`)).not.toBeInTheDocument();
    await expect.element(page.getBySelector(`.${CSS.selected}`)).not.toBeInTheDocument();
    await expect.element(page.getBySelector("calcite-rating")).toHaveProperty("value", 0);
  });

  it("retains the rating value when blurred and refocused", async () => {
    await mount(
      <>
        <calcite-rating value={3} />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.tab();
    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "Next" })).toHaveFocus();
    await userEvent.tab({ shift: true });

    const rating = page.getBySelector("calcite-rating");
    await expect
      .poll(() => rating.element().shadowRoot!.activeElement)
      .toBe(page.getBySelector(`.${CSS.star}`).nth(2).element());
    await expect.poll(() => page.getBySelector(`.${CSS.hovered}`).elements()).toHaveLength(3);
    await expect.poll(() => page.getBySelector(`.${CSS.selected}`).elements()).toHaveLength(3);
    await expect.element(rating).toHaveProperty("value", 3);
  });

  it("highlights the first star when tabbing into a rating with an average", async () => {
    const { el } = await mount<Rating>(<calcite-rating average={3} />);
    const stars = page.getBySelector(`.${CSS.star}`);

    await userEvent.tab();

    await expect.poll(() => el.shadowRoot.activeElement).toBe(stars.first().element());
    await expect
      .element(stars.first().getBySelector("calcite-icon"))
      .toHaveAttribute("icon", "star-f");
    for (let index = 1; index < 5; index++) {
      await expect
        .element(stars.nth(index).getBySelector("calcite-icon"))
        .toHaveAttribute("icon", "star");
    }
    await expect.element(page.getBySelector(`.${CSS.selected}`)).not.toBeInTheDocument();
    await expect.element(page.getBySelector(`.${CSS.average}`)).not.toBeInTheDocument();
    await expect.element(el).toHaveProperty("value", 0);
  });

  it("updates the UI when arrow keys are pressed", async () => {
    const changeHandler = vi.fn();
    const { el } = await mount<Rating>(<calcite-rating oncalciteRatingChange={changeHandler} />);
    const stars = page.getBySelector(`.${CSS.star}`);

    await userEvent.tab();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowLeft}");

    for (let index = 0; index < 5; index++) {
      const star = stars.nth(index);
      await expect
        .element(star.getBySelector("calcite-icon"))
        .toHaveAttribute("icon", index < 2 ? "star-f" : "star");
    }
    for (const star of stars.elements().slice(0, 2)) {
      await expect.element(star).toHaveClass(CSS.hovered, CSS.selected);
    }
    for (const star of stars.elements().slice(2)) {
      await expect.element(star).not.toHaveClass(CSS.hovered);
      await expect.element(star).not.toHaveClass(CSS.selected);
    }
    await expect.poll(() => el.shadowRoot.activeElement).toBe(stars.nth(1).element());
    await expect.element(el).toHaveProperty("value", 2);
    expect(changeHandler).toHaveBeenCalledTimes(3);
  });

  it("updates the rating when number keys are pressed", async () => {
    const changeHandler = vi.fn();
    const { el } = await mount<Rating>(<calcite-rating oncalciteRatingChange={changeHandler} />);

    await userEvent.tab();
    await userEvent.keyboard("513");

    await expect.element(el).toHaveProperty("value", 3);
    expect(changeHandler).toHaveBeenCalledTimes(3);
  });

  it("updates the rating when Enter is pressed", async () => {
    const changeHandler = vi.fn();
    const { el } = await mount<Rating>(<calcite-rating oncalciteRatingChange={changeHandler} />);

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", 1);
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });

  it("resets the rating when Enter is pressed on the current value", async () => {
    const { el } = await mount<Rating>(<calcite-rating value={3} />);

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");

    await expect.element(el).toHaveProperty("value", 0);
  });

  it("does not clear a required rating", async () => {
    const changeHandler = vi.fn();
    const { el } = await mount<Rating>(
      <calcite-rating oncalciteRatingChange={changeHandler} required />,
    );

    await userEvent.tab();
    await userEvent.keyboard("{Enter}{Enter}");

    await expect.element(el).toHaveProperty("value", 1);
    expect(changeHandler).toHaveBeenCalledTimes(1);
  });

  it("does not change a read-only rating with the keyboard", async () => {
    const changeHandler = vi.fn();
    await mount(
      <>
        <calcite-rating oncalciteRatingChange={changeHandler} readOnly value={2} />
        <button type="button">Next</button>
      </>,
    );

    await userEvent.tab();
    await expect.element(page.getByRole("button", { name: "Next" })).toHaveFocus();
    await userEvent.keyboard("{Enter}");

    await expect.element(page.getBySelector("calcite-rating")).toHaveProperty("value", 2);
    expect(changeHandler).not.toHaveBeenCalled();
  });

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
