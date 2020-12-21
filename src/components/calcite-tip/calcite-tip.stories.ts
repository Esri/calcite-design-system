import { boolean, select, text } from "@storybook/addon-knobs";
import { createComponentHTML as create, darkBackground, AttributeMap } from "../../../.storybook/utils";
import readme from "./readme.md";
import { TEXT } from "./resources";
import { ATTRIBUTES } from "../../../.storybook/resources";

export default {
  title: "App Components/Tip",
  parameters: {
    backgrounds: darkBackground,
    notes: readme
  }
};

const { dir, theme } = ATTRIBUTES;

const createAttributeMap = (): AttributeMap => ({
  dir: () => select("dir", dir.values, dir.defaultValue),
  dismissed: () => boolean("dismissed", false),
  "non-dismissible": () => boolean("nonDismissible", false),
  heading: () => text("heading", "My Tip"),
  "intl-close": () => text("intlClose", TEXT.close),
  theme: () => select("theme", theme.values, theme.defaultValue)
});

const html = `<img slot="thumbnail" src="https://placeimg.com/1000/600/city" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae.</div><a href="http://www.esri.com">This is a "link".</a>`;

export const basic = (): string => create("calcite-tip", createAttributeMap(), html);
