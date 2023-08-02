import { boolean, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";
import readme from "./readme.md";
import groupReadme from "../tip-group/readme.md";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Tips/Tip",
  parameters: {
    notes: [readme, groupReadme],
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes(
    [
      {
        name: "closed",
        commit(): Attribute {
          this.value = boolean("closed", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "close-disabled",
        commit(): Attribute {
          this.value = boolean("closeDisabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "heading",
        commit(): Attribute {
          this.value = text("heading", "My Tip");
          delete this.build;
          return this;
        },
      },
    ],
    exceptions
  );
};

const html = `<img slot="thumbnail" src="${placeholderImage({
  width: 1000,
  height: 600,
})}" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae. </div><a href="http://www.esri.com">This is a link</a>.`;

export const simple = (): string => create("calcite-tip", createAttributes(), html);

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-tip",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-mode-dark" },
    ]),
    html
  );
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
