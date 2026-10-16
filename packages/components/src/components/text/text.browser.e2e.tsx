import { h } from "@arcgis/lumina";
import { describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { mount } from "@arcgis/lumina-compiler/testing";
import { defaults, reflects, hidden, renders, accessible } from "../../tests/common";
import { Text } from "./text";
import { CSS } from "./resources";

const text = "This is a very long text that will be truncated";
const updatedText = "Updated text that is also long enough to truncate";

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
  const middleTruncatedTextEl = page.getBySelector(`.${CSS.middleTruncatedText}`);
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).toBeVisible();
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i\u2026cated");
  el.truncatePosition = "end";
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).not.toBeVisible();
  el.truncatePosition = "middle";
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).toBeVisible();
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i\u2026cated");
  el.truncatePosition = undefined;
  await component.updateComplete;
  await expect.element(middleTruncatedTextEl).not.toBeVisible();
});

describe("tooltip", () => {
  it("should not set title when truncatePosition is undefined", async () => {
    await mount<Text>(<calcite-text style="width: 100px;">{text}</calcite-text>);
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", "");
  });

  it("should update title when truncatePosition is end", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", text);
    el.truncatePosition = undefined;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", "");
  });

  it("should update title when assigned text changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", text);
    const assignedTextNode = getAssignedTextNode(el)!;
    assignedTextNode.textContent = "Updated text that still overflows";
    await component.updateComplete;
    await expect
      .element(textContainer)
      .toHaveProperty("title", "Updated text that still overflows");
  });

  it("should update title when textContent changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="end">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", text);
    el.textContent = "Updated textContent that still overflows";
    await component.updateComplete;
    await expect
      .element(textContainer)
      .toHaveProperty("title", "Updated textContent that still overflows");
  });

  it("should update title when truncatePosition is middle", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", text);
    el.truncatePosition = undefined;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", "");
  });

  it("should update assistive text when truncatePosition is middle", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const assistiveTextEl = page.getBySelector(`.${CSS.assistiveText}`);
    await expect.element(assistiveTextEl).toHaveTextContent(text);
    el.textContent = "text that fits";
    await component.updateComplete;
    await expect.element(assistiveTextEl).toHaveTextContent("text that fits");
  });

  it("should honor middle truncation and update tooltip when the assigned text changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    const middleTruncatedTextEl = page.getBySelector(`.${CSS.middleTruncatedText}`);
    const assignedTextNode = getAssignedTextNode(el)!;
    assignedTextNode.textContent = updatedText;
    await component.updateComplete;

    await expect.element(textContainer).toHaveProperty("title", updatedText);
    await expect.element(middleTruncatedTextEl).not.toHaveTextContent(text);
    await expect.element(middleTruncatedTextEl).toHaveTextContent(/\u2026/);

    assignedTextNode.textContent = "";
    await expect.element(middleTruncatedTextEl).toHaveTextContent("");
    await expect.element(textContainer).toHaveProperty("title", "");
  });

  it("should honor middle truncation and update tooltip when textContent changes", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text style="width: 100px;" truncatePosition="middle">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    const middleTruncatedTextEl = page.getBySelector(`.${CSS.middleTruncatedText}`);
    await expect.element(textContainer).toHaveProperty("title", text);

    el.textContent = updatedText;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", updatedText);
    await expect.element(middleTruncatedTextEl).not.toHaveTextContent(text);
    await expect.element(middleTruncatedTextEl).toHaveTextContent(/\u2026/);
  });

  it("should update title when maxLines is set", async () => {
    const { el, component } = await mount<Text>(
      <calcite-text maxLines={2} style="width: 100px;">
        {text}
      </calcite-text>,
    );
    const textContainer = page.getBySelector(`.${CSS.textContainer}`);
    await expect.element(textContainer).toHaveProperty("title", text);
    el.maxLines = undefined;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", "");
    el.maxLines = 3;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", text);
    el.maxLines = 4;
    await component.updateComplete;
    await expect.element(textContainer).toHaveProperty("title", text);
  });
});

it("should continue observing resizes for middle truncation after reconnecting", async () => {
  const { el, container } = await mount<Text>(
    <calcite-text style="width: 100px;" truncatePosition="middle">
      {text}
    </calcite-text>,
  );
  const textContainer = page.getBySelector(`.${CSS.textContainer}`);
  const middleTruncatedTextEl = page.getBySelector(`.${CSS.middleTruncatedText}`);
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i\u2026cated");
  await expect.element(textContainer).toHaveProperty("title", text);

  const nextSibling = el.nextSibling;
  el.remove();
  container.insertBefore(el, nextSibling);

  el.style.width = "1000px";
  await expect.element(middleTruncatedTextEl).toHaveTextContent(text);
  await expect.element(textContainer).toHaveProperty("title", "");

  el.style.width = "100px";
  await expect.element(middleTruncatedTextEl).toHaveTextContent("This i\u2026cated");
  await expect.element(textContainer).toHaveProperty("title", text);
});

function getAssignedTextNode(el: HTMLElement): CharacterData | undefined {
  return Array.from(el.childNodes).find(
    (node): node is CharacterData => node.nodeType === Node.TEXT_NODE,
  );
}
