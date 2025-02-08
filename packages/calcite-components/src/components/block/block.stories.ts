import { BlockSection } from "../block-section/block-section";
import { boolean } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { defaultEndMenuPlacement, placements } from "../../utils/floating-ui";
import { Block } from "./block";

const { toggleDisplay } = ATTRIBUTES;

interface BlockStoryArgs
  extends Pick<
      Block,
      "heading" | "description" | "open" | "collapsible" | "loading" | "disabled" | "headingLevel" | "menuPlacement"
    >,
    Pick<BlockSection, "toggleDisplay"> {
  text: string;
  sectionOpen: BlockSection["open"];
}

export default {
  title: "Components/Block",
  args: {
    menuPlacement: defaultEndMenuPlacement,
    heading: "Heading",
    description: "description",
    open: true,
    collapsible: true,
    loading: false,
    disabled: false,
    headingLevel: 2,
    text: "Animals",
    sectionOpen: true,
    toggleDisplay: toggleDisplay.defaultValue,
  },
  argTypes: {
    menuPlacement: {
      options: placements,
      control: { type: "select" },
    },
    headingLevel: {
      control: { type: "number", min: 1, max: 6, step: 1 },
    },
    toggleDisplay: {
      options: toggleDisplay.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: BlockStoryArgs): string => html`
  <calcite-block
    heading="${args.heading}"
    description="${args.description}"
    menu-placement="${args.menuPlacement}"
    ${boolean("open", args.open)}
    ${boolean("collapsible", args.collapsible)}
    ${boolean("loading", args.loading)}
    ${boolean("disabled", args.disabled)}
    heading-level="${args.headingLevel}"
  >
    <calcite-block-section
      text="${args.text}"
      ${boolean("open", args.sectionOpen)}
      toggle-display="${args.toggleDisplay}"
    >
      <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
    </calcite-block-section>
  </calcite-block>
`;

export const withHeaderControl = (): string => html`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <label slot="control">test <input placeholder="I'm a header control" /></label>
  </calcite-block>
`;

export const withIconAndHeader = (): string => html`
  <calcite-block heading="Heading" description="description" collapsible heading-level="2">
    <div slot="icon">✅</div>
  </calcite-block>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-block heading="heading" description="description" open collapsible disabled>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
    </calcite-block-section>
  </calcite-block>
`;

export const paddingDisabled_TestOnly = (): string =>
  html` <calcite-panel heading="Properties">
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

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-block
    heading="Heading"
    description="description"
    open
    collapsible
    heading-level="2"
    class="calcite-mode-dark"
    dir="rtl"
  >
    <calcite-block-section text="Animals" open toggle-display="button">
      <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
    </calcite-block-section>
    <calcite-block-section text="Nature" open>
      <img alt="demo" src="${placeholderImage({ width: 320, height: 240 })}" />
    </calcite-block-section>
  </calcite-block>
`;

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

export const contentSpacing_TestOnly = (): string => html`
  <calcite-block heading="Block heading" open>
    <div>Some text that has padding built in</div>
  </calcite-block>
`;

export const loadingWithSlottedIcon_TestOnly = (): string => html`
  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
    <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`;

export const loadingWithNoStatusNorSlottedIcon_TestOnly = (): string => html`
  <calcite-block collapsible open loading heading="Layer effects" description="Adjust blur">
    <calcite-notice open>
      <div slot="message">Use layer effects sparingly</div>
    </calcite-notice>
  </calcite-block>
`;

export const longWrappingTextInBlockAndBlockSection_TestOnly = (): string => html`
  <calcite-panel style="width:250px">
    <calcite-block
      collapsible
      open
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
    <calcite-block
      collapsible
      heading="Planes, trains, and automobiles are some examples of modes of transportation"
      description="Planes, trains, and automobiles are some examples of modes of transportation"
    >
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
      <calcite-block-section open text="Planes, trains, and automobiles are some examples of modes of transportation">
        <p>Block section content</p>
      </calcite-block-section>
    </calcite-block>
  </calcite-panel>
`;

export const loadingWithStatusIcon_TestOnly = (): string => html`
  <calcite-block loading heading="Valid status" description="summary" collapsible status="valid">
    <calcite-input icon="form-field" placeholder="This is valid input field"></calcite-input>
  </calcite-block>

  <calcite-block heading="Invalid status" description="summary" status="invalid"> </calcite-block>
`;

export const scrollingContainerSetup_TestOnly = (): string =>
  html`<style>
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

export const toggleDisplayWithLongText_TestOnly = (): string =>
  html`<calcite-block open heading="Calcite block" style="width:150px">
    <calcite-block-section id="block-section" open text="Calcite block superlongggggtext" toggle-display="switch">
      <calcite-notice open>
        <div slot="message">Some more complex options.</div>
      </calcite-notice>
    </calcite-block-section>
  </calcite-block>`;

export const icons_TestOnly = (): string => html`
  <calcite-block heading="Heading" description="summary" collapsible open>
    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="switch"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>

    <calcite-block-section
      text="Planes, trains, and automobiles are some examples of modes of transportation"
      open
      icon-end="pen"
      icon-start="pen"
      toggle-display="button"
      status="valid"
    >
      <p>Block section content</p>
    </calcite-block-section>
  </calcite-block>
`;

export const iconStartEnd = (): string => html`
  <h1>content-start and actions-end</h1>

  <calcite-block
    heading="Valid status"
    description="summary"
    collapsible
    icon-start="pen"
    icon-end="pen"
    style="width: 500px"
  >
    <calcite-icon
      icon="compass"
      slot="content-start"
      style="color: var(--calcite-color-status-success)"
      scale="s"
    ></calcite-icon>
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>

  <h1>loading and actions-end</h1>

  <calcite-block
    heading="Valid status"
    collapsible
    status="valid"
    icon-start="pen"
    icon-end="pen"
    loading
    style="width: 500px"
  >
    <calcite-action appearance="transparent" icon="ellipsis" text="menu" label="menu" slot="actions-end" />
  </calcite-block>
`;
