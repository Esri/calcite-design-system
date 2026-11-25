import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { page } from "vitest/browser";
import { defaults, hidden, reflects, renders, accessible, themed } from "../../tests/common";
import { CSS } from "./resources";

describe("accessible", () => {
  accessible(() => mount(<calcite-meter label="A great meter" />));
});

describe("defaults", () => {
  defaults(
    () => mount("calcite-meter"),
    [
      {
        propertyName: "appearance",
        defaultValue: "outline-fill",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "fillType",
        defaultValue: "range",
      },
      {
        propertyName: "groupSeparator",
        defaultValue: false,
      },
      {
        propertyName: "max",
        defaultValue: 100,
      },
      {
        propertyName: "min",
        defaultValue: 0,
      },
      {
        propertyName: "optimum",
        defaultValue: undefined,
      },
      {
        propertyName: "rangeLabelType",
        defaultValue: "percent",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "unitLabel",
        defaultValue: "",
      },
      {
        propertyName: "valueLabel",
        defaultValue: false,
      },
      {
        propertyName: "valueLabelType",
        defaultValue: "percent",
      },
    ],
  );
});

describe("hidden", () => {
  hidden(() => mount("calcite-meter"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-meter"),
    [
      {
        propertyName: "appearance",
        value: "outline-fill",
      },
      {
        propertyName: "fillType",
        value: "range",
      },
      {
        propertyName: "max",
        value: 100,
      },
      {
        propertyName: "min",
        value: 0,
      },
      {
        propertyName: "optimum",
        value: 100,
      },
      {
        propertyName: "rangeLabelType",
        value: "percent",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "valueLabelType",
        value: "percent",
      },
    ],
  );
});

describe("renders", () => {
  renders(() => mount("calcite-meter"), { display: "flex" });
});

describe("optimum", () => {
  it.each([
    { optimum: undefined, kinds: [CSS.success, CSS.warning, CSS.warning, CSS.danger, CSS.danger] },
    { optimum: 0, kinds: [CSS.success, CSS.success, CSS.warning, CSS.warning, CSS.danger] },
    { optimum: 100, kinds: [CSS.danger, CSS.warning, CSS.warning, CSS.success, CSS.success] },
    { optimum: 50, kinds: [CSS.warning, CSS.success, CSS.success, CSS.success, CSS.warning] },
    { optimum: 25, kinds: [CSS.warning, CSS.success, CSS.success, CSS.success, CSS.warning] },
    { optimum: 75, kinds: [CSS.warning, CSS.success, CSS.success, CSS.success, CSS.warning] },
  ])("colors each range with optimum=$optimum", async ({ optimum, kinds }) => {
    const { el } = await mount<"calcite-meter">(
      <calcite-meter high={75} low={25} optimum={optimum} value={10} />,
    );
    const fill = page.getBySelector(`.${CSS.fill}`);
    const values = [10, 25, 50, 75, 90];

    for (const [index, value] of values.entries()) {
      el.value = value;
      await expect.element(fill).toHaveClass(kinds[index]);
    }
  });

  it("updates when optimum changes or is removed", async () => {
    const { el } = await mount<"calcite-meter">(<calcite-meter high={75} low={25} value={90} />);
    const fill = page.getBySelector(`.${CSS.fill}`);

    await expect.element(fill).toHaveClass(CSS.danger);
    el.setAttribute("optimum", "100");
    await expect.element(fill).toHaveClass(CSS.success);
    el.optimum = 50;
    await expect.element(fill).toHaveClass(CSS.warning);
    el.removeAttribute("optimum");
    await expect.element(fill).toHaveClass(CSS.danger);
  });

  it("updates when range boundaries change", async () => {
    const { el } = await mount<"calcite-meter">(
      <calcite-meter high={75} low={25} optimum={80} value={50} />,
    );
    const fill = page.getBySelector(`.${CSS.fill}`);

    await expect.element(fill).toHaveClass(CSS.warning);
    el.high = 90;
    await expect.element(fill).toHaveClass(CSS.success);
    el.low = 60;
    await expect.element(fill).toHaveClass(CSS.warning);
  });

  it.each([
    { optimum: -200, value: -75, kind: CSS.success },
    { optimum: 200, value: -75, kind: CSS.danger },
    { optimum: 0, value: -75, kind: CSS.warning },
    { optimum: 0, value: 10, kind: CSS.success },
  ])(
    "supports negative ranges and optimum=$optimum at value=$value",
    async ({ optimum, value, kind }) => {
      await mount(
        <calcite-meter high={25} low={-25} max={100} min={-100} optimum={optimum} value={value} />,
      );

      await expect.element(page.getBySelector(`.${CSS.fill}`)).toHaveClass(kind);
    },
  );

  it.each([
    { low: 0, high: 75, optimum: -100 },
    { low: 25, high: 100, optimum: 200 },
  ])("clamps optimum=$optimum to the meter bounds", async ({ low, high, optimum }) => {
    await mount(<calcite-meter high={high} low={low} optimum={optimum} value={50} />);

    await expect.element(page.getBySelector(`.${CSS.fill}`)).toHaveClass(CSS.success);
  });

  it("treats the whole range as optimal when thresholds are omitted", async () => {
    await mount(<calcite-meter optimum={100} value={50} />);

    await expect.element(page.getBySelector(`.${CSS.fill}`)).toHaveClass(CSS.success);
  });

  it("does not affect single-color fills", async () => {
    const { el } = await mount<"calcite-meter">(
      <calcite-meter fillType="single" high={75} low={25} optimum={100} value={90} />,
    );
    const fill = page.getBySelector(`.${CSS.fill}`);

    await expect.element(fill).toHaveClass(CSS.fill, { exact: true });
    el.optimum = 0;
    await expect.element(fill).toHaveClass(CSS.fill, { exact: true });
  });
});

describe("correctly sets range and value properties", () => {
  it("correctly sets range and value properties if not present", async () => {
    const { el } = await mount(<calcite-meter />);

    await expect.element(el).toHaveProperty("min", 0);
    await expect.element(el).toHaveProperty("max", 100);
    await expect.element(el).toHaveProperty("low", 0);
    await expect.element(el).toHaveProperty("high", 100);
    await expect.element(el).toHaveProperty("value", 0);
  });

  it("correctly sets range and value properties if not present and non-default min / max set", async () => {
    const { el } = await mount(<calcite-meter max={10000} min={2000} />);

    await expect.element(el).toHaveProperty("min", 2000);
    await expect.element(el).toHaveProperty("max", 10000);
    await expect.element(el).toHaveProperty("low", 2000);
    await expect.element(el).toHaveProperty("high", 10000);
    await expect.element(el).toHaveProperty("value", 2000);
  });

  it("correctly adjusts out of range low and high", async () => {
    const { el } = await mount(<calcite-meter high={30} low={200} max={25} min={10} />);

    await expect.element(el).toHaveProperty("min", 10);
    await expect.element(el).toHaveProperty("max", 25);
    await expect.element(el).toHaveProperty("low", 10);
    await expect.element(el).toHaveProperty("high", 25);
    await expect.element(el).toHaveProperty("value", 10);
  });

  it("correctly adjusts out of range low and high - b", async () => {
    const { el } = await mount(<calcite-meter high={5} low={15} max={25} min={10} />);

    await expect.element(el).toHaveProperty("min", 10);
    await expect.element(el).toHaveProperty("max", 25);
    await expect.element(el).toHaveProperty("low", 10);
    await expect.element(el).toHaveProperty("high", 25);
    await expect.element(el).toHaveProperty("value", 10);
  });

  it("correctly leaves out of range value", async () => {
    const { el } = await mount(<calcite-meter high={30} low={200} max={25} min={10} value={210} />);

    await expect.element(el).toHaveProperty("min", 10);
    await expect.element(el).toHaveProperty("max", 25);
    await expect.element(el).toHaveProperty("low", 10);
    await expect.element(el).toHaveProperty("high", 25);
    await expect.element(el).toHaveProperty("value", 210);
  });
});

describe("theme", () => {
  themed(
    () =>
      mount(
        <calcite-meter
          group-separator
          high={7600}
          low={4600}
          max={12400}
          min={0}
          range-labels
          unit-label="GB"
          value={-2200}
          value-label
          value-label-type="units"
        />,
      ),
    {
      "--calcite-meter-background-color": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "backgroundColor",
      },
      "--calcite-meter-fill-color": {
        shadowSelector: `.${CSS.fill}`,
        targetProp: "backgroundColor",
      },
      "--calcite-meter-range-text-color": {
        shadowSelector: `.${CSS.labelValue}`,
        targetProp: "color",
      },
      "--calcite-meter-value-text-color": {
        shadowSelector: `.${CSS.labelValue}`,
        targetProp: "color",
      },
      "--calcite-meter-shadow": {
        shadowSelector: `.${CSS.container}`,
        targetProp: "boxShadow",
      },
      "--calcite-meter-border-color": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderColor",
        },
        {
          shadowSelector: `.${CSS.stepLine}`,
          targetProp: "backgroundColor",
        },
      ],
      "--calcite-meter-corner-radius": [
        {
          shadowSelector: `.${CSS.container}`,
          targetProp: "borderRadius",
        },
        {
          shadowSelector: `.${CSS.fill}`,
          targetProp: "borderRadius",
        },
      ],
    },
  );
});
