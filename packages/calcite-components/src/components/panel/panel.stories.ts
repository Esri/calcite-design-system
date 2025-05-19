import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { defaultEndMenuPlacement, placements } from "../../utils/floating-ui";
import { Panel } from "./panel";
import { SLOTS } from "./resources";

const { collapseDirection, scale } = ATTRIBUTES;

interface PanelStoryArgs
  extends Pick<
    Panel,
    | "closed"
    | "disabled"
    | "closable"
    | "collapsed"
    | "icon"
    | "iconFlipRtl"
    | "collapsible"
    | "collapseDirection"
    | "loading"
    | "scale"
    | "menuPlacement"
  > {
  heightScale: string;
}

export default {
  title: "Components/Panel",
  args: {
    menuPlacement: defaultEndMenuPlacement,
    closed: false,
    disabled: false,
    closable: false,
    collapsed: false,
    collapsible: false,
    collapseDirection: collapseDirection.defaultValue,
    heightScale: scale.defaultValue,
    icon: "",
    iconFlipRtl: false,
    scale: scale.defaultValue,
    loading: false,
  },
  argTypes: {
    menuPlacement: {
      options: placements,
      control: { type: "select" },
    },
    collapseDirection: {
      options: collapseDirection.values,
      control: { type: "select" },
    },
    heightScale: {
      options: scale.values,
      control: { type: "select" },
    },
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
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
  <calcite-button slot="${SLOTS.footerStart}" width="half" appearance="outline">Footer start</calcite-button>
  <calcite-button slot="${SLOTS.footerEnd}" width="half">Footer end</calcite-button>
`;

const panelContent = `${headerHTML}
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
  <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
  ${contentHTML}
  ${footerHTML}`;

export const simple = (args: PanelStoryArgs): string => html`
  <calcite-panel
    ${boolean("closed", args.closed)}
    ${boolean("disabled", args.disabled)}
    ${boolean("closable", args.closable)}
    ${boolean("collapsed", args.collapsed)}
    ${boolean("collapsible", args.collapsible)}
    collapseDirection="${args.collapseDirection}"
    heightScale="${args.heightScale}"
    scale="${args.scale}"
    icon="${args.icon}"
    ${boolean("loading", args.loading)}
    menu-placement="${args.menuPlacement}"
    heading="Heading"
    description="A great panel description"
  >
    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
    ${contentHTML}
    <calcite-fab slot="fab"></calcite-fab>
    ${footerHTML}
  </calcite-panel>
`;

export const onlyProps = (): string => html`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
`;

export const disabledWithStyledSlot_TestOnly = (): string => html`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${contentHTML}</div>
  </calcite-panel>
`;

export const withIcon = (): string => html`
  <calcite-panel scale="s" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="m" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="l" icon="banana" heading="Banana"> Hello world! </calcite-panel>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-panel collapse-direction="down" height-scale="m" dir="rtl" class="calcite-mode-dark">
    ${panelContent}
  </calcite-panel>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

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
      <calcite-button type="button" slot="footer">1</calcite-button>
      <calcite-button type="button" slot="footer">2</calcite-button>
      <calcite-button type="button" slot="footer-start">3</calcite-button>
      <calcite-button type="button" slot="footer-start">4</calcite-button>
      <calcite-button type="button" slot="footer-end">5</calcite-button>
      <calcite-button type="button" slot="footer-end">6</calcite-button>
      <calcite-button type="button" slot="footer-actions">7</calcite-button>
      <calcite-button type="button" slot="footer-actions">8</calcite-button>
    </calcite-panel>
  </div>`;

export const footerActions = (): string =>
  html`<h2>footer-actions (Deprecated): Auto width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-actions">1</calcite-button>
        <calcite-button type="button" slot="footer-actions">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-actions (Deprecated): Full width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-actions">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-actions">2</calcite-button>
      </calcite-panel>
    </div>`;

export const footerVariations = (): string =>
  html`<h2>footer</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start only</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-start">1</calcite-button>
        <calcite-button type="button" slot="footer-start">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-end only</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-end">1</calcite-button>
        <calcite-button type="button" slot="footer-end">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end auto width</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button type="button" slot="footer-start">1</calcite-button>
        <calcite-button type="button" slot="footer-start">2</calcite-button>
        <calcite-button type="button" slot="footer-end">3</calcite-button>
        <calcite-button type="button" slot="footer-end">4</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end full width single</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">2</calcite-button>
      </calcite-panel>
    </div>
    <h2>footer-start and footer-end full width multiple</h2>
    <div style="width: 300px;">
      <calcite-panel height-scale="s">
        <div slot="header-content">Header!</div>
        <p>Slotted content!</p>
        <calcite-button width="full" type="button" slot="footer-start">1</calcite-button>
        <calcite-button width="full" type="button" slot="footer-start">2</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">3</calcite-button>
        <calcite-button width="full" type="button" slot="footer-end">4</calcite-button>
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
    <p slot="footer">Footer!</p>
  </calcite-panel>`;

export const footerWithoutContent_TestOnly = (): string =>
  html`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <p slot="footer">Footer!</p>
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
    <p slot="footer">Footer!</p>
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

export const footerAndContentTopBottomSlots = (): string => html`
  <div style="height: 350px; width: 400px; display: flex">
    <calcite-panel height-scale="s">
      <div slot="header-content">Header!</div>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"> </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <div slot="content-top">Slot for a content-top.</div>
      <p>Slotted content!</p>
      <p>Hello world!</p>
      <p>Hello world!</p>
      <p>Hello world!</p>
      <div slot="content-bottom">Slot for a content-bottom.</div>
      <p slot="footer">Footer!</p>
    </calcite-panel>
  </div>
`;

export const footerStartAndEndSlots = (): string => html`
  <calcite-panel style="height: 200px; width: 300px;">
    <div slot="header-content">header-content slot</div>
    <p>Slotted content!</p>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer start</calcite-button
    >
    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer end</calcite-button
    >
  </calcite-panel>
`;

export const withSlottedAlert = (): string => html`
  <calcite-panel style="height: 500px; width: 800px;">
    <calcite-alert slot="alerts" open label="this is a default alert" scale="s">
      <div slot="title">Hello there!</div>
      <div slot="message">This is an alert with a general piece of information. Cool, innit?</div>
    </calcite-alert>
    <div slot="header-content">header-content slot</div>
    <p>Slotted content!</p>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer start</calcite-button
    >
    <calcite-button type="button" slot="footer-end" kind="neutral" scale="s" id="card-icon-test-1" icon-start="check"
      >Footer end</calcite-button
    >
  </calcite-panel>
`;

export const footerSlotPrecedence = (): string => html`
  <calcite-panel style="height: 200px">
    <p>Slotted content!</p>
    <div slot="header-content">header-content slot</div>
    <div slot="content-bottom">Slot for a content-bottom.</div>
    <calcite-button
      type="button"
      slot="footer"
      kind="neutral"
      scale="s"
      id="card-icon-test-1"
      icon-start="check"
      width="full"
    ></calcite-button>
    ${footerHTML}
  </calcite-panel>
`;

export const scalesFontAndPadding = (): string => html`
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="s"
    style="height: 220px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi-mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="m"
    style="height: 250px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi-mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="l"
    style="height: 260px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi-mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${footerHTML}
  </calcite-panel>
`;
