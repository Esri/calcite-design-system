import { boolean, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
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
    exceptions,
  );
};

const htmlSnippet = `<img slot="thumbnail" src="${placeholderImage({
  width: 1000,
  height: 600,
})}" alt="This is an image." />Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non. Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti consectetur. Non porttitor tempor orci dictumst magna porta vitae. </div><a href="http://www.esri.com">This is a link</a>.`;

export const simple = (): string => create("calcite-tip", createAttributes(), htmlSnippet);

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-tip",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-mode-dark" },
    ]),
    htmlSnippet,
  );
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const themed_TestOnly = (): string => html`
  <calcite-tip
    heading="The Red Rocks and Blue Water"
    style="
  --calcite-tip-background-color: lightblue;
  --calcite-tip-border-color: green;
  --calcite-tip-heading-text-color: blue;
  --calcite-tip-slotted-link-text-color: yellow;
  --calcite-tip-text-color: white;
 "
  >
    <img slot="thumbnail" src="https://placeimg.com/1000/600/city" alt="This is an image." />
    <p>
      This tip is how a tip should really look. It has a landscape or square image and a small amount of text content.
      This paragraph is in an "info" slot.
    </p>
    <p>
      This is another paragraph in a subsequent "info" slot. In publishing and graphic design, Lorem ipsum is a
      placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content
      (also called greeking). Replacing the actual content with placeholder text allows designers to design the form of
      the content before the content itself has been produced.
    </p>
    <a href="http://www.esri.com">This is the "link" slot.</a>
  </calcite-tip>
`;
