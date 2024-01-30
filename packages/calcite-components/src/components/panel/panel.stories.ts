import { boolean, select, text } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { ATTRIBUTES } from "../../../.storybook/resources";
import {
  Attribute,
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault,
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";
import { SLOTS } from "./resources";

export default {
  title: "Components/Panel",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  const { scale } = ATTRIBUTES;

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
        name: "disabled",
        commit(): Attribute {
          this.value = boolean("disabled", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "closable",
        commit(): Attribute {
          this.value = boolean("closable", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "collapsed",
        commit(): Attribute {
          this.value = boolean("collapsed", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "collapsible",
        commit(): Attribute {
          this.value = boolean("collapsible", false);
          delete this.build;
          return this;
        },
      },
      {
        name: "collapse-direction",
        commit(): Attribute {
          this.value = select("collapseDirection", ["down", "up"], "down");
          delete this.build;
          return this;
        },
      },
      {
        name: "height-scale",
        commit(): Attribute {
          this.value = select("heightScale", scale.values, scale.defaultValue);
          delete this.build;
          return this;
        },
      },
      {
        name: "loading",
        commit(): Attribute {
          this.value = boolean("loading", false);
          delete this.build;
          return this;
        },
      },
    ],
    exceptions,
  );
};

const headerHTML = `<h3 class="heading" slot="${SLOTS.headerContent}">Heading</h3>`;

const contentHTML = html`
  <p>
    Enim nascetur erat faucibus ornare varius arcu fames bibendum habitant felis elit ante. Nibh morbi massa curae; leo
    semper diam aenean congue taciti eu porta. Varius faucibus ridiculus donec. Montes sit ligula purus porta ante lacus
    habitasse libero cubilia purus! In quis congue arcu maecenas felis cursus pellentesque nascetur porta donec non.
    Quisque, rutrum ligula pharetra justo habitasse facilisis rutrum neque. Magnis nostra nec nulla dictumst taciti
    consectetur. Non porttitor tempor orci dictumst magna porta vitae.
  </p>
  <p>
    Ipsum nostra tempus etiam augue ullamcorper scelerisque sapien potenti erat nisi gravida. Vehicula sem tristique
    sed. Nullam, sociis imperdiet ullamcorper? Dapibus fames primis ridiculus vulputate, habitant inceptos! Nunc
    torquent lorem urna vehicula volutpat donec nec. Orci massa eu nec donec enim fames, faucibus quam aenean. Laoreet
    tellus tempor quisque ornare lobortis praesent erat senectus natoque consectetur donec imperdiet. Quis sem cum
    gravida dictumst a pretium purus aptent amet id. Orci habitasse, praesent facilisis condimentum. Nec elit turpis
    leo.
  </p>
  <p>
    Tempus per volutpat diam tempor mauris parturient vulputate leo id libero quisque. Mattis aliquam dictum venenatis
    fringilla. Taciti venenatis, ultrices sollicitudin consequat. Sapien fusce est iaculis potenti ut auctor potenti.
    Nisi malesuada feugiat vulputate vitae porttitor. Nullam nullam nullam accumsan quis magna in. Elementum, nascetur
    gravida cras scelerisque inceptos aenean inceptos potenti. Lobortis condimentum accumsan posuere curabitur fermentum
    diam, natoque quisque. Eget placerat sed aptent orci urna fusce magnis. Vel lacus magnis nunc.
  </p>
`;

const footerHTML = html`
  <calcite-button slot="${SLOTS.footer}" width="half" appearance="outline">Naw.</calcite-button>
  <calcite-button slot="${SLOTS.footer}" width="half">Yeah!</calcite-button>
`;

const panelContent = `${headerHTML}
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
  ${contentHTML}
  ${footerHTML}`;

export const simple = (): string =>
  create(
    "calcite-panel",
    createAttributes(),
    html`
      ${headerHTML}
      <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
      <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
      ${contentHTML}
      <calcite-fab slot="fab"></calcite-fab>
      ${footerHTML}
    `,
  );

export const onlyProps = (): string => html`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="${text("heading-level", "2")}"
      description="${text(
        "description",
        "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall.",
      )}"
      heading="${text(
        "heading",
        "Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum",
      )}"
    />
  </div>
`;

export const disabledWithStyledSlot_TestOnly = (): string => html`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${contentHTML}</div>
  </calcite-panel>
`;

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-panel",
    createAttributes({ exceptions: ["dir", "class"] }).concat([
      {
        name: "dir",
        value: "rtl",
      },
      {
        name: "class",
        value: "calcite-mode-dark",
      },
    ]),
    panelContent,
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const closableWithActions_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    closable
    heading="Closable with actions"
    description="A panel that can be closed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const collapsibleWithoutActions_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    collapsible
    heading="Collapsible without actions"
    description="A panel that can be collapsed"
  >
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const collapsibleWithActions_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const collapseDirectionUp_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapse-direction="up"
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const collapseDirectionUpCollapsed_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    collapse-direction="up"
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const collapsedWithActions_TestOnly = (): string => html`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${contentHTML}</div>
    ${footerHTML}
  </calcite-panel>
`;

export const withActionBar_TestOnly = (): string =>
  html`<div style="width: 300px;">
    <calcite-panel height-scale="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
          <calcite-action text="Save" icon="save"> </calcite-action>
          <calcite-action text="Layers" icon="layers"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
    </calcite-panel>
  </div>`;

export const footerPadding_TestOnly = (): string =>
  html`<div style="width: 300px;">
    <calcite-panel height-scale="s" style="--calcite-panel-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <div slot="footer">Footer!</div>
    </calcite-panel>
  </div>`;

export const actionBarBackgroundColor_TestOnly = (): string =>
  html`<calcite-panel height-scale="s" style="width: 300px;">
    <calcite-action-bar slot="action-bar" expand-disabled>
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <div slot="header-content">Header!</div>
    <p>Slotted content!</p>
    <p style="height: 400px">Hello world!</p>
    <p style="height: 400px">Hello world!</p>
    <p style="height: 400px">Hello world!</p>
    <p slot="footer">Slotted content!</p>
  </calcite-panel>`;

export const footerWithoutContent_TestOnly = (): string =>
  html`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <p slot="footer">Footer content!</p>
  </calcite-panel>`;

export const actionBarWithoutContent_TestOnly = (): string =>
  html`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
  </calcite-panel>`;

export const actionBarZIndex_TestOnly = (): string =>
  html`<calcite-panel style="width: 400px;" height-scale="s" menu-open>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save">
          <calcite-tooltip open overlay-positioning="fixed" placement="top" slot="tooltip">test</calcite-tooltip>
        </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Some content</p></calcite-panel
  >`;

export const footerAndActionBarWithoutContent_TestOnly = (): string =>
  html`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action text="Save" icon="save"> </calcite-action>
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p slot="footer">Footer content!</p>
  </calcite-panel>`;

export const flexContent_TestOnly = (): string =>
  html`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
    circle,
    white 1px,
    transparent 1px
  );"
    ></div
  ></calcite-panel>`;

export const flexContentWithFAB_TestOnly = (): string =>
  html`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
  circle,
  white 1px,
  transparent 1px
);"
    ></div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`;

export const overflowContent_TestOnly = (): string =>
  html` <style>
      .container {
        max-height: 300px;
        width: 300px;
      }
    </style>
    <div class="container">
      <calcite-panel heading="My Panel">
        <calcite-list>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
          <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        </calcite-list>
      </calcite-panel>
    </div>`;

export const overflowContentWithFab_TestOnly = (): string =>
  html` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div style="min-height: 500px">My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`;

export const noOverflowContentWithFab_TestOnly = (): string =>
  html` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div>My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`;

export const withTextContentOnly = (): string =>
  html`<calcite-panel height-scale="s" heading="My Panel">Slotted content!</calcite-panel>`;

export const withNoHeaderBorderBlockEnd_TestOnly = (): string =>
  html`<calcite-panel style="--calcite-panel-header-border-block-end:none;" height-scale="s" heading="My Panel"
    >Slotted content!</calcite-panel
  >`;

export const theming_TestOnly = (): string => html`
  <style>
    .container {
      max-height: 300px;
      width: 300px;
    }
  </style>
  <div class="container">
    <calcite-panel
      heading="My Panel"
      description="My description"
      style="
      --calcite-panel-background-color: lightblue;
      --calcite-panel-border-color: red;
      --calcite-panel-description-color: purple;
      --calcite-panel-footer-background-color: lightgreen;
      --calcite-panel-footer-padding: 24px;
      --calcite-panel-header-background-color: yellow;
      --calcite-panel-header-border-block-end: 1px solid magenta;
      --calcite-panel-header-color: orange;
      --calcite-panel-header-z-index: 999;
      --calcite-panel-fab-z-index: 998;
    "
    >
      <calcite-list>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
        <calcite-list-item label="My list item" description="My description"></calcite-list-item>
      </calcite-list>
      <calcite-fab slot="fab"></calcite-fab>
      ${footerHTML}
    </calcite-panel>
  </div>
`;
