import { boolean } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Tips/Tip Manager",
  parameters: {
    notes: readme,
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
    ],
    exceptions,
  );
};

const tipContent = html`
  <calcite-tip-group group-title="Astronomy">
    <calcite-tip heading="The Red Rocks and Blue Water" heading-level="2">
      <img slot="thumbnail" src="${placeholderImage({ width: 1000, height: 600 })}" alt="This is an image." />
      <p>
        This tip is how a tip should really look. It has a landscape or square image and a small amount of text content.
        This paragraph is in an "info" slot.
      </p>
      <p>
        This is another paragraph in a subsequent "info" slot. In publishing and graphic design, Lorem ipsum is a
        placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful
        content (also called greeking). Replacing the actual content with placeholder text allows designers to design
        the form of the content before the content itself has been produced.
      </p>
      <a href="http://www.esri.com">This is the "link" slot.</a>
    </calcite-tip>
    <calcite-tip heading="The Long Trees">
      <img slot="thumbnail" src="${placeholderImage({ width: 1000, height: 600 })}" alt="This is an image." />
      <p>This tip has an image that is a pretty tall. And the text will run out before the end of the image.</p>
      <p>In astronomy, the terms object and body are often used interchangeably.</p>
      <a href="http://www.esri.com">View Esri</a>
    </calcite-tip>
  </calcite-tip-group>
  <calcite-tip heading="Square Nature">
    <img slot="thumbnail" src="${placeholderImage({ width: 1000, height: 1000 })}" alt="This is an image." />
    <p>This tip has an image that is square. And the text will run out before the end of the image.</p>
    <p>In astronomy, the terms object and body are often used interchangeably.</p>
    <p>
      In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form
      of a document without relying on meaningful content (also called greeking). Replacing the actual content with
      placeholder text allows designers to design the form of the content before the content itself has been produced.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
  <calcite-tip heading="The lack of imagery">
    <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>
    <p>
      This is the next paragraph and should show how wide the content area is now. Of course, the width of the overall
      tip will affect things. In astronomy, the terms object and body are often used interchangeably.
    </p>
    <a href="http://www.esri.com">View Esri</a>
  </calcite-tip>
`;

export const simple = (): string => create("calcite-tip-manager", createAttributes(), tipContent);

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-tip-manager",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-mode-dark" },
    ]),
    tipContent,
  );
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const tipWithoutGroup_TestOnly = (): string =>
  html`<calcite-tip-manager>
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;

export const tipWithGroup_TestOnly = (): string =>
  html`<calcite-tip-manager>
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`;

export const tipWithoutGroupMaxWidth_TestOnly = (): string =>
  html`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;

export const tipWithGroupMaxWidth_TestOnly = (): string =>
  html`<calcite-tip-manager style="width:500px; --calcite-tip-max-width:200px;">
    <calcite-tip-group group-title="Group Title"
      ><calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip></calcite-tip-group
    >
  </calcite-tip-manager>`;

export const hebrewLocale_TestOnly = (): string =>
  html`<calcite-tip-manager heading-level="1" lang="he">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;

export const norwegianLocale_TestOnly = (): string =>
  html`<calcite-tip-manager lang="nb"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`;

export const FrenchLocale_TestOnly = (): string =>
  html`<calcite-tip-manager lang="fr"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`;

export const hongKongLocale_TestOnly = (): string =>
  html`<calcite-tip-manager lang="zh-HK"
    ><calcite-tip><p>basic render</p></calcite-tip></calcite-tip-manager
  >`;

export const ukrainianLocaleWithTipGroup_TestOnly = (): string => html`<calcite-tip-manager>
<calcite-tip-group group-title="Tip Manager heading">
    <calcite-tip heading="Example tip title">
    <calcite-tip><p>basic render</p></calcite-tip>
</calcite-tip-group>
</calcite-tip-manager>`;

export const bosnianLocale_TestOnly = (): string =>
  html`<calcite-tip-manager heading-level="1" lang="bs">
    <calcite-tip id="one" heading="test"><p>no pre-selected attribute</p></calcite-tip>
  </calcite-tip-manager>`;

export const themedGroup_TestOnly = (): string => html`
<calcite-tip-manager>
  <calcite-tip-group 
    group-title="Tip Manager heading" 
    style="
      --calcite-tip-group-background-color: red;
      --calcite-tip-group-text-color: green;
    "
  >
    <calcite-tip heading="Example tip title">
    <calcite-tip><p>basic render</p></calcite-tip>
  </calcite-tip-group>
</calcite-tip-manager>
`;
