import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h } from "@arcgis/lumina";
import { defaults, hidden, reflects, renders } from "../../tests/commonTests/browser";

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
