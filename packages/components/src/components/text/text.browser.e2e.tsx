import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/common";
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

describe("accessible", () => {
  accessible(() => mount<Text>(<calcite-text>{text}</calcite-text>));
});

it("should be able to switch truncate position", async () => {
  const { el, component } = await mount<Text>(
    <calcite-text style="width: 100px;">{text}</calcite-text>,
  );
  el.truncatePosition = "middle";
  const middleTruncatedTextEl = page.getBySelector("span");
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).toBeVisible();
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i...ncated");
  el.truncatePosition = "end";
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).not.toBeVisible();
  el.truncatePosition = "middle";
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).toBeVisible();
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i...ncated");
  el.truncatePosition = undefined;
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).not.toBeVisible();
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
    await expect.element(el).toHaveProperty("title", text);
    el.truncatePosition = undefined;
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", "");
  });

  it("should update title when assigned text changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    await expect.element(el).toHaveProperty("title", text);

    const assignedTextNode = getAssignedTextNode(el);
    if (assignedTextNode) {
      assignedTextNode.textContent = "Updated text that still overflows";
    }
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", "Updated text that still overflows");
  });

  it("should update title when textContent changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    await expect.element(el).toHaveProperty("title", text);

    el.textContent = "Updated textContent that still overflows";
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", "Updated textContent that still overflows");
  });

  it("should update title when truncatePosition is middle", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", text);
    el.truncatePosition = undefined;
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", "");
  });

  it("should honor middle truncation and update tooltip when the assigned text changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const middleTruncatedTextEl = page.getBySelector("span");
    const assignedTextNode = getAssignedTextNode(el)!;
    if (assignedTextNode) {
      assignedTextNode.textContent = "Updated reactive text that is also long enough to truncate";
      await component.updateComplete;
    }

    await expect
      .element(el)
      .toHaveProperty("title", "Updated reactive text that is also long enough to truncate");
    await expect.element(middleTruncatedTextEl).not.toHaveTextContent(text);
    await expect.element(middleTruncatedTextEl).toHaveTextContent(/\.\.\./);

    assignedTextNode.textContent = "";
    await expect.element(middleTruncatedTextEl).toHaveTextContent("");
    await expect.element(el).toHaveProperty("title", "");
  });

  it("should honor middle truncation and update tooltip when textContent changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const middleTruncatedTextEl = page.getBySelector("span");
    await expect.element(el).toHaveProperty("title", text);

    el.textContent = "Updated textContent that is also long enough to truncate";
    await component.updateComplete;
    await expect
      .element(el)
      .toHaveProperty("title", "Updated textContent that is also long enough to truncate");
    await expect.element(middleTruncatedTextEl).not.toHaveTextContent(text);
    await expect.element(middleTruncatedTextEl).toHaveTextContent(/\.\.\./);
  });

  it("should update title when maxLines is set", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text maxLines={2} style="width: 100px;">
        {text}
      </calcite-text>,
    );
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", text);
    el.maxLines = undefined;
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", "");
    el.maxLines = 3;
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", text);
    el.maxLines = 4;
    await component.updateComplete;
    await expect.element(el).toHaveProperty("title", text);
  });
});

function getAssignedTextNode(el: HTMLElement): CharacterData | undefined {
  const node = Array.from(el.childNodes).find(
    (node): node is CharacterData => node.nodeType === Node.TEXT_NODE,
  );
  return node;
}
