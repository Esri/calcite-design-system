import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders } from "../../tests/common";
import { Text } from "./text";

const text = "This is a very long text that will be truncated";

describe("defaults", () => {
  defaults(
    () => mount("calcite-text"),
    [{ propertyName: "truncatePosition", defaultValue: undefined }],
  );
});

describe("hidden", () => {
  hidden(() => mount("calcite-text"));
});

describe("reflects", () => {
  reflects(
    () => mount("calcite-text"),
    [
      { propertyName: "maxLines", value: 2 },
      { propertyName: "truncatePosition", value: "middle" },
    ],
  );
});

describe("renders", () => {
  renders(() => mount("calcite-text"), { display: "block", visible: false });
});

it("should be able to switch between middle and end truncate positions", async () => {
  const { el, component } = await mount<Text>(
    <calcite-text style="width: 100px;" truncatePosition="middle">
      {text}
    </calcite-text>,
  );
  await component.updateComplete;
  await expect.element(el).toHaveTextContent("This i...ncated");
  el.truncatePosition = "end";
  await component.updateComplete;
  expect(el.textContent).toBe(text);
});

describe("tooltip", () => {
  it("should not set title when truncatePosition is undefined", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;">{text}</calcite-text>,
    );
    await component.updateComplete;
    expect(el.title).toBe("");
  });

  it("should update title when truncatePosition is end", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    await component.updateComplete;
    expect(el.title).toBe(text);
    el.truncatePosition = undefined;
    await component.updateComplete;
    expect(el.title).toBe("");
  });

  it("should update title when truncatePosition is middle", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    await component.updateComplete;
    await expect.element(el).toHaveTextContent("This i...ncated");
    el.truncatePosition = undefined;
    await component.updateComplete;
    expect(el.title).toBe("");
  });

  it("should update title when maxLines is set", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text maxLines={2} style="width: 100px;">
        {text}
      </calcite-text>,
    );
    await component.updateComplete;
    expect(el.title).toBe(text);
    el.maxLines = undefined;
    await component.updateComplete;
    expect(el.title).toBe("");
  });
});
