import { boolean, select, text } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { TEXT } from "./resources";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { placeholderImage } from "../../tests/utils";

export default {
  title: "Components/App/Tip",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const { dir, theme } = ATTRIBUTES;

const createAttributes: () => Attributes = () => [
  {
    name: "dir",
    value: select("dir", dir.values, dir.defaultValue)
  },
  {
    name: "dismissed",
    value: boolean("dismissed", false)
  },
  {
    name: "non-dismissible",
    value: boolean("nonDismissible", false)
  },
  {
    name: "heading",
    value: text("heading", "My Tip")
  },
  {
    name: "intl-close",
    value: text("intlClose", TEXT.close)
  },
  {
    name: "theme",
    value: select("theme", theme.values, theme.defaultValue)
  }
];

const html = `<img slot="thumbnail" src="${placeholderImage({
  width: 1000,
  height: 600
})}" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae.</div><a href="http://www.esri.com">This is a "link".</a>`;

export const basic = (): string => create("calcite-tip", createAttributes(), html);
