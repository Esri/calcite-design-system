import { boolean, select, text } from "@storybook/addon-knobs";
import { AttributeMap, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import blockReadme from "./readme.md";
import sectionReadme from "../calcite-block-section/readme.md";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { html } from "../../tests/utils";

export default {
  title: "App Components/Block",
  parameters: {
    backgrounds: darkBackground,
    notes: {
      block: blockReadme,
      section: sectionReadme
    }
  }
};

const createBlockAttributeMap = (): AttributeMap => {
  const group = "block";
  const { dir, theme } = ATTRIBUTES;

  return {
    heading: () => text("heading", "Heading", group),
    dir: () => select("dir", dir.values, dir.defaultValue, group),
    summary: () => text("summary", "summary", group),
    open: () => boolean("open", true, group),
    collapsible: () => boolean("collapsible", true, group),
    loading: () => boolean("loading", false, group),
    disabled: () => boolean("disabled", false, group),
    theme: () => select("theme", theme.values, theme.defaultValue, group),
    "intl-collapse": () => text("intlCollapse", "Collapse", group),
    "intl-expand": () => text("intlExpand", "Expand", group)
  };
};

const createSectionAttributeMap = (): AttributeMap => {
  const group = "section (animals)";
  const toggleDisplayOptions = ["button", "switch"];

  return {
    text: () => text("text", "Animals", group),
    open: () => boolean("open", true, group),
    "toggle-display": () => select("toggleDisplay", toggleDisplayOptions, toggleDisplayOptions[0], group),
    "intl-collapse": () => text("intlCollapse", "Collapse", group),
    "intl-expand": () => text("intlExpand", "Expand", group)
  };
};

export const basic = (): string =>
  create(
    "calcite-block",
    createBlockAttributeMap(),
    html`
      ${create(
        "calcite-block-section",
        createSectionAttributeMap(),
        `<img alt="demo" src="https://placeimg.com/320/240/animals" />`
      )}

      <calcite-block-section text="Nature" open>
        <img alt="demo" src="https://placeimg.com/320/240/nature" />
      </calcite-block-section>
    `
  );

export const withHeaderControl = (): string =>
  create(
    "calcite-block",
    { map: createBlockAttributeMap(), ignore: ["open", "collapsible"] },
    `<label slot="control">test <input placeholder="I'm a header control"/></label>`
  );

export const withIconAndHeader = (): string =>
  create(
    "calcite-block",
    { map: createBlockAttributeMap(), ignore: ["open", "collapsible"] },
    `<div slot="icon">✅</div>`
  );
