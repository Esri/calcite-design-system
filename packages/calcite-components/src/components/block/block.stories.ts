import { boolean, number, select, text } from "@storybook/addon-knobs";
import {
  Attribute,
  filterComponentAttributes,
  Attributes,
  createComponentHTML as create,
} from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import blockReadme from "./readme.md";
import sectionReadme from "../block-section/readme.md";
import { html } from "../../../support/formatting";
import { storyFilters } from "../../../.storybook/helpers";

export default {
  title: "Components/Block",
  parameters: {
    notes: {
      block: blockReadme,
      section: sectionReadme,
    },
  },
  ...storyFilters(),
};

const createBlockAttributes: (options?: { exceptions: string[] }) => Attributes = (
  { exceptions } = { exceptions: [] }
) => {
  const group = "block";

  return filterComponentAttributes(
    [
      {
        name: "heading",
        commit(): Attribute {
          this.value = text("heading", "Heading", group);
          delete this.build;
          return this;
        },
      },

      {
        name: "description",
        commit(): Attribute {
          this.value = text("description", "description", group);
          delete this.build;
          return this;
        },
      },
      {
        name: "open",
        commit(): Attribute {
          this.value = boolean("open", true, group);
          delete this.build;
          return this;
        },
      },
      {
        name: "collapsible",
        commit(): Attribute {
          this.value = boolean("collapsible", true, group);
          delete this.build;
          return this;
        },
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false, group);
          delete this.build;
          return this;
        },
      },
      {
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false, group);
          delete this.build;
          return this;
        },
      },
      {
        name: "heading-level",
        commit(): Attribute {
          this.value = number("heading-level", 2, { min: 1, max: 6, step: 1 }, group);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions
  );
};

const createSectionAttributes: () => Attributes = () => {
  const group = "section (animals)";
  const toggleDisplayOptions = ["button", "switch"];

  return [
    {
      name: "text",
      value: text("text", "Animals", group),
    },
    {
      name: "open",
      value: boolean("open", true, group),
    },
    {
      name: "toggle-display",
      value: select("toggleDisplay", toggleDisplayOptions, toggleDisplayOptions[0], group),
    },
  ];
};

export const simple = (): string =>
  create(
    "calcite-block",
    createBlockAttributes(),
    html`
      ${create(
        "calcite-block-section",
        createSectionAttributes(),
        `<img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />`
      )}

      <calcite-block-section text="Nature" open>
        <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
      </calcite-block-section>
    `
  );

export const withHeaderControl = (): string =>
  create(
    "calcite-block",
    createBlockAttributes({ exceptions: ["open", "collapsible"] }),
    `<label slot="control">test <input placeholder="I'm a header control"/></label>`
  );

export const withIconAndHeader = (): string =>
  create("calcite-block", createBlockAttributes({ exceptions: ["open", "collapsible"] }), `<div slot="icon">✅</div>`);

export const disabled_TestOnly = (): string => html`<calcite-block
  heading="heading"
  description="description"
  open
  collapsible
  disabled
>
  <calcite-block-section text="Nature" open>
    <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
  </calcite-block-section>
</calcite-block>`;

export const paddingDisabled_TestOnly = (): string => html` <calcite-panel heading="Properties">
  <calcite-block
    heading="Example block heading"
    description="example summary heading"
    collapsible
    open
    style="--calcite-block-padding: 0;"
  >
    <div>calcite components ninja</div>
  </calcite-block>
</calcite-panel>`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-block",
    createBlockAttributes({ exceptions: ["dir"] }).concat(
      {
        name: "class",
        value: "calcite-mode-dark",
      },
      { name: "dir", value: "rtl" }
    ),
    html`
      ${create(
        "calcite-block-section",
        createSectionAttributes(),
        `<img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />`
      )}

      <calcite-block-section text="Nature" open>
        <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
      </calcite-block-section>
    `
  );

export const contentCanTakeFullHeight_TestOnly = (): string =>
  html`<calcite-block open heading="Heading" description="description" style="height: 250px">
    <div style="background: red; height: 100%;">should take full width of the content area</div>
  </calcite-block>`;

export const alignmentHeading_TestOnly = (): string => html`<calcite-block heading="Heading"></calcite-block>`;

export const alignmentDescription_TestOnly = (): string =>
  html`<calcite-block description="description"></calcite-block>`;

export const alignmentHeadingAndDescription_TestOnly = (): string =>
  html`<calcite-block heading="Heading" description="description"></calcite-block>`;

export const alignmentIconHeading_TestOnly = (): string =>
  html`<calcite-block heading="Heading"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`;

export const alignmentIconDescription_TestOnly = (): string =>
  html`<calcite-block description="description"><calcite-icon scale="s" slot="icon" icon="layer" /></calcite-block>`;

export const alignmentIconHeadingAndDescription_TestOnly = (): string =>
  html`<calcite-block heading="Heading" description="description"
    ><calcite-icon scale="s" slot="icon" icon="layer"
  /></calcite-block>`;

export const contentSpacing_TestOnly = (): string =>
  html`
    <calcite-block heading="Block heading" open>
      <div>Some text that has padding built in</div>
    </calcite-block>
  `;

export const loadingWithSlottedIcon_TestOnly = (): string =>
  html`
    <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
      <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
      <calcite-notice open>
        <div slot="message">Use layer effects sparingly</div>
      </calcite-notice>
    </calcite-block>
  `;

export const loadingWithNoStatusNorSlottedIcon_TestOnly = (): string =>
  html`
    <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
      <calcite-notice open>
        <div slot="message">Use layer effects sparingly</div>
      </calcite-notice>
    </calcite-block>
  `;

export const loadingWithStatusIcon_TestOnly = (): string =>
  html`
    <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">
      <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>
    </calcite-block>

    <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>
  `;

export const scrollingContainerSetup_TestOnly = (): string => html`<style>
    calcite-block {
      height: 250px;
      overflow: hidden;
    }

    .scroll-container {
      height: 100%;
      overflow-y: scroll;
    }

    p {
      background: linear-gradient(to bottom, red, transparent);
      height: 500px;
      margin: 0;
    }
  </style>
  <calcite-block heading="Should scroll to the gradient at the bottom" open>
    <div class="scroll-container">
      <p></p>
    </div>
  </calcite-block>
  <script>
    (async () => {
      const block = document.querySelector("calcite-block");
      await customElements.whenDefined("calcite-block");
      await block.componentOnReady();

      const scrollContainer = document.querySelector(".scroll-container");
      scrollContainer.scrollTo(0, 500);
    })();
  </script>`;

scrollingContainerSetup_TestOnly.parameters = { chromatic: { delay: 500 } };
