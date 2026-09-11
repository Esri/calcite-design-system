/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as i, o as U, m as _ } from "./utils3.js";
import { h as t } from "./formatting.js";
import { A as Q } from "./resources34.js";
import { a as Z } from "./floating-ui.js";
import { S as c } from "./resources14.js";
import "./action.js";
import "./action-bar.js";
import "./action-group.js";
import "./alert.js";
import "./button.js";
import "./fab.js";
import "./link.js";
import "./list.js";
import "./list-item.js";
import "./panel.js";
import "./tooltip.js";
const {
  collapseDirection: z,
  placement: G,
  scale: l
} = Q, ut = {
  title: "Components/Panel",
  args: {
    menuPlacement: Z,
    closed: !1,
    disabled: !1,
    closable: !1,
    collapsed: !1,
    collapsible: !1,
    collapseDirection: z.defaultValue,
    heightScale: l.defaultValue,
    icon: "",
    iconFlipRtl: !1,
    scale: l.defaultValue,
    loading: !1
  },
  argTypes: {
    menuPlacement: {
      options: G.values,
      control: {
        type: "select"
      }
    },
    collapseDirection: {
      options: z.values,
      control: {
        type: "select"
      }
    },
    heightScale: {
      options: l.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: l.values,
      control: {
        type: "select"
      }
    }
  }
}, n = t`
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
`, e = t`
  <calcite-button slot="${c.footerStart}" width="half" appearance="outline">Footer start</calcite-button>
  <calcite-button slot="${c.footerEnd}" width="half">Footer end</calcite-button>
`, J = `
  <calcite-action text="Action" label="Action" slot="${c.headerActionsStart}" icon="bluetooth"></calcite-action>
  <calcite-action text="Action" label="Action" slot="${c.headerActionsEnd}" icon="attachment"></calcite-action>
  ${n}
  ${e}`, s = (a) => t`
  <calcite-panel
    ${i("closed", a.closed)}
    ${i("disabled", a.disabled)}
    ${i("closable", a.closable)}
    ${i("collapsed", a.collapsed)}
    ${i("collapsible", a.collapsible)}
    collapseDirection="${a.collapseDirection}"
    heightScale="${a.heightScale}"
    scale="${a.scale}"
    ${U("icon", a.icon)}
    ${i("loading", a.loading)}
    menu-placement="${a.menuPlacement}"
    heading="Heading"
    description="A great panel description"
  >
    <calcite-action text="Action" label="Action" slot="${c.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="${c.headerActionsEnd}" icon="attachment"></calcite-action>
    ${n}
    <calcite-fab slot="fab"></calcite-fab>
    ${e}
  </calcite-panel>
`, r = () => t`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
`, d = () => t`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">${n}</div>
  </calcite-panel>
`, p = () => t`
  <calcite-panel scale="s" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="m" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="l" icon="banana" heading="Banana"> Hello world! </calcite-panel>
`, h = () => t`
  <calcite-panel scale="s" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
  <calcite-panel scale="m" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
  <calcite-panel scale="l" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
`, u = () => t`
  <calcite-panel heading="Plain heading fallback" description="Plain description fallback" style="width: 300px;">
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-panel>
`, o = () => t`
  <calcite-panel
    collapse-direction="down"
    height-scale="m"
    dir="rtl"
    class="calcite-mode-dark"
    heading="Heading"
    icon="arrow-bold-left"
    icon-flip-rtl
  >
    ${J}
  </calcite-panel>
`;
o.parameters = {
  themes: _
};
const m = () => t`
  <calcite-panel
    style="height: 100%;"
    closable
    heading="Closable with actions"
    description="A panel that can be closed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, b = () => t`
  <calcite-panel closable heading="Panel heading" style="width: 300px;">
    <div slot="header-top">Header top content</div>
    <p>Panel content</p>
  </calcite-panel>
`, g = () => t`
  <calcite-panel style="width: 300px;">
    <div slot="header-top">Header top content</div>
    <p>Panel content</p>
  </calcite-panel>
`, v = () => t`
  <style>
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: var(--calcite-color-foreground-1);
    }

    .pagination-menu-button {
      padding-inline: var(--calcite-spacing-xxs);
      border-inline-start: var(--calcite-border-width-sm) solid var(--calcite-color-border-3);
    }

    .pagination-action-bar {
      flex: 1;
    }
  </style>
  <calcite-panel closable heading="Header top demo" style="--calcite-panel-header-top-space: 0; width: 360px">
    <div class="header" slot="header-top">
      <calcite-action-bar
        class="pagination-action-bar"
        expand-disabled
        layout="horizontal"
        overflow-actions-disabled
        scale="s"
      >
        <calcite-action-group scale="s">
          <calcite-action
            class="pagination-previous"
            icon="chevron-left"
            icon-flip-rtl
            label="Previous page"
          ></calcite-action>
          <calcite-action icon="chevron-right" icon-flip-rtl label="Next page"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-action class="pagination-menu-button" icon="list" text="1 of 2" text-enabled></calcite-action>
    </div>
    <div style="padding: 16px">Content below the header-top slot.</div>
  </calcite-panel>
`, f = () => t`
  <calcite-panel
    style="height: 100%;"
    collapsible
    heading="Collapsible without actions"
    description="A panel that can be collapsed"
  >
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, y = () => t`
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
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, x = () => t`
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
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, w = () => t`
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
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, S = () => t`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="3d-glasses" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="gear" text-enabled icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>

  <br />

  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="3d-glasses" icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="gear" icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="banana" icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">${n}</div>
    ${e}
  </calcite-panel>
`, H = () => t`<div style="width: 300px;">
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
  </div>`, M = () => t`<div style="width: 300px;">
    <calcite-panel height-scale="s" style="--calcite-panel-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <calcite-button type="button" slot="footer">1</calcite-button>
      <calcite-button type="button" slot="footer">2</calcite-button>
      <calcite-button type="button" slot="footer-start">3</calcite-button>
      <calcite-button type="button" slot="footer-start">4</calcite-button>
      <calcite-button type="button" slot="footer-end">5</calcite-button>
      <calcite-button type="button" slot="footer-end">6</calcite-button>
    </calcite-panel>
  </div>`, A = () => t`<h2>footer</h2>
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
    </div>`, T = () => t`<calcite-panel height-scale="s" style="width: 300px;">
    <calcite-action-bar slot="action-bar" expand-toggle-disabled>
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
  </calcite-panel>`, $ = () => t`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <p slot="footer">Footer!</p>
  </calcite-panel>`, k = () => t`<calcite-panel
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
  </calcite-panel>`, C = () => t`<calcite-panel style="width: 400px;" height-scale="s" menu-open>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action id="save-action" text="Save" icon="save"> </calcite-action>
        <calcite-tooltip open overlay-positioning="fixed" placement="top" reference-element="save-action"
          >test</calcite-tooltip
        >
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Some content</p></calcite-panel
  >`, P = () => t`<calcite-panel
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
  </calcite-panel>`, L = () => t`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
    circle,
    white 1px,
    transparent 1px
  );"
    ></div
  ></calcite-panel>`, B = () => t`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
  circle,
  white 1px,
  transparent 1px
);"
    ></div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`, F = () => t` <style>
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
    </div>`, I = () => t` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div style="min-height: 500px">My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`, W = () => t` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div>My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>`, q = () => t`<calcite-panel height-scale="s" heading="My Panel">Slotted content!</calcite-panel>`, D = () => t`<calcite-panel style="--calcite-panel-header-border-block-end:none;" height-scale="s" heading="My Panel"
    >Slotted content!</calcite-panel
  >`, E = () => t`
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
`, N = () => t`
  <div style="height: 350px; width: 400px; display: flex">
    <calcite-panel height-scale="s">
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
`, O = () => t`
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
`, j = () => t`
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
`, R = () => t`
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
    ${e}
  </calcite-panel>
`, V = () => t`
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="s"
    style="height: 220px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi-mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    ${e}
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
    ${e}
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
    ${e}
  </calcite-panel>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: PanelStoryArgs): string => html\`
  <calcite-panel
    \${boolean("closed", args.closed)}
    \${boolean("disabled", args.disabled)}
    \${boolean("closable", args.closable)}
    \${boolean("collapsed", args.collapsed)}
    \${boolean("collapsible", args.collapsible)}
    collapseDirection="\${args.collapseDirection}"
    heightScale="\${args.heightScale}"
    scale="\${args.scale}"
    \${optionalAttribute("icon", args.icon)}
    \${boolean("loading", args.loading)}
    menu-placement="\${args.menuPlacement}"
    heading="Heading"
    description="A great panel description"
  >
    <calcite-action text="Action" label="Action" slot="\${SLOTS.headerActionsStart}" icon="bluetooth"></calcite-action>
    <calcite-action text="Action" label="Action" slot="\${SLOTS.headerActionsEnd}" icon="attachment"></calcite-action>
    \${contentHTML}
    <calcite-fab slot="fab"></calcite-fab>
    \${footerHTML}
  </calcite-panel>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width: 300px;">
    <calcite-panel
      height-scale="s"
      heading-level="2"
      description="Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall."
      heading="Panel title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum Tile title lorem ipsum"
    />
  </div>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel style="height: 100%;" heading="Heading" disabled>
    <div id="content" style="height: 100%;">\${contentHTML}</div>
  </calcite-panel>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel scale="s" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="m" icon="banana" heading="Banana"> Hello world! </calcite-panel>
  <calcite-panel scale="l" icon="banana" heading="Banana"> Hello world! </calcite-panel>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel scale="s" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
  <calcite-panel scale="m" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
  <calcite-panel scale="l" icon="banana" heading="Banana" description="This is bananas!"> Hello world! </calcite-panel>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel heading="Plain heading fallback" description="Plain description fallback" style="width: 300px;">
    <span slot="heading"><strong>Rich heading</strong> with <calcite-link href="#">markup</calcite-link></span>
    <span slot="description">Description with <em>inline emphasis</em> and <code>HTML</code>.</span>
    <p>Slotted content!</p>
  </calcite-panel>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel
    collapse-direction="down"
    height-scale="m"
    dir="rtl"
    class="calcite-mode-dark"
    heading="Heading"
    icon="arrow-bold-left"
    icon-flip-rtl
  >
    \${panelContent}
  </calcite-panel>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel
    style="height: 100%;"
    closable
    heading="Closable with actions"
    description="A panel that can be closed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel closable heading="Panel heading" style="width: 300px;">
    <div slot="header-top">Header top content</div>
    <p>Panel content</p>
  </calcite-panel>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel style="width: 300px;">
    <div slot="header-top">Header top content</div>
    <p>Panel content</p>
  </calcite-panel>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background-color: var(--calcite-color-foreground-1);
    }

    .pagination-menu-button {
      padding-inline: var(--calcite-spacing-xxs);
      border-inline-start: var(--calcite-border-width-sm) solid var(--calcite-color-border-3);
    }

    .pagination-action-bar {
      flex: 1;
    }
  </style>
  <calcite-panel closable heading="Header top demo" style="--calcite-panel-header-top-space: 0; width: 360px">
    <div class="header" slot="header-top">
      <calcite-action-bar
        class="pagination-action-bar"
        expand-disabled
        layout="horizontal"
        overflow-actions-disabled
        scale="s"
      >
        <calcite-action-group scale="s">
          <calcite-action
            class="pagination-previous"
            icon="chevron-left"
            icon-flip-rtl
            label="Previous page"
          ></calcite-action>
          <calcite-action icon="chevron-right" icon-flip-rtl label="Next page"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-action class="pagination-menu-button" icon="list" text="1 of 2" text-enabled></calcite-action>
    </div>
    <div style="padding: 16px">Content below the header-top slot.</div>
  </calcite-panel>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel
    style="height: 100%;"
    collapsible
    heading="Collapsible without actions"
    description="A panel that can be collapsed"
  >
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="3d-glasses" text-enabled icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" text-enabled icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="gear" text-enabled icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>

  <br />

  <calcite-panel
    style="height: 100%;"
    closable
    collapsible
    collapsed
    heading="Collapsible with actions"
    description="A panel that can be collapsed"
  >
    <calcite-action text="information" icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="3d-glasses" icon="information" slot="header-actions-start"></calcite-action>
    <calcite-action text="banana" icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="gear" icon="information" slot="header-actions-end"></calcite-action>
    <calcite-action text="banana" icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" icon="measure" slot="header-menu-actions"></calcite-action>
    <div id="content" style="height: 100%;">\${contentHTML}</div>
    \${footerHTML}
  </calcite-panel>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px;">
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
  </div>\``,
      ...H.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width: 300px;">
    <calcite-panel height-scale="s" style="--calcite-panel-footer-padding: 20px;">
      <div slot="header-content">Header!</div>
      <p>Slotted content!</p>
      <calcite-button type="button" slot="footer">1</calcite-button>
      <calcite-button type="button" slot="footer">2</calcite-button>
      <calcite-button type="button" slot="footer-start">3</calcite-button>
      <calcite-button type="button" slot="footer-start">4</calcite-button>
      <calcite-button type="button" slot="footer-end">5</calcite-button>
      <calcite-button type="button" slot="footer-end">6</calcite-button>
    </calcite-panel>
  </div>\``,
      ...M.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<h2>footer</h2>
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
    </div>\``,
      ...A.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel height-scale="s" style="width: 300px;">
    <calcite-action-bar slot="action-bar" expand-toggle-disabled>
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
  </calcite-panel>\``,
      ...T.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel
    height-scale="s"
    heading="Header!"
    style="width: 300px; height:auto; --calcite-panel-header-border-block-end:none;"
  >
    <p slot="footer">Footer!</p>
  </calcite-panel>\``,
      ...$.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel
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
  </calcite-panel>\``,
      ...k.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel style="width: 400px;" height-scale="s" menu-open>
    <calcite-action text="banana" text-enabled icon="banana" slot="header-menu-actions"></calcite-action>
    <calcite-action text="measure" text-enabled icon="measure" slot="header-menu-actions"></calcite-action>
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Add" icon="plus"> </calcite-action>
        <calcite-action id="save-action" text="Save" icon="save"> </calcite-action>
        <calcite-tooltip open overlay-positioning="fixed" placement="top" reference-element="save-action"
          >test</calcite-tooltip
        >
        <calcite-action text="Layers" icon="layers"> </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Some content</p></calcite-panel
  >\``,
      ...C.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel
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
  </calcite-panel>\``,
      ...P.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
    circle,
    white 1px,
    transparent 1px
  );"
    ></div
  ></calcite-panel>\``,
      ...L.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-panel style="height: 300px; width: 500px" heading="My Panel"
    ><div
      style="display: flex; flex-direction: column; height: 100%; width: 100%; background-size: 16px 16px; background-color: gray; background-image: radial-gradient(
  circle,
  white 1px,
  transparent 1px
);"
    ></div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>\``,
      ...B.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <style>
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
    </div>\``,
      ...F.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div style="min-height: 500px">My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>\``,
      ...I.parameters?.docs?.source
    }
  }
};
W.parameters = {
  ...W.parameters,
  docs: {
    ...W.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-panel style="max-height: 300px; height: 300px; width: 500px" heading="My Panel"
    ><div>My Content</div>
    <calcite-fab slot="fab"></calcite-fab
  ></calcite-panel>\``,
      ...W.parameters?.docs?.source
    }
  }
};
q.parameters = {
  ...q.parameters,
  docs: {
    ...q.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-panel height-scale="s" heading="My Panel">Slotted content!</calcite-panel>`',
      ...q.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-panel style="--calcite-panel-header-border-block-end:none;" height-scale="s" heading="My Panel"\n    >Slotted content!</calcite-panel\n  >`',
      ...D.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...E.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="height: 350px; width: 400px; display: flex">
    <calcite-panel height-scale="s">
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
\``,
      ...N.parameters?.docs?.source
    }
  }
};
O.parameters = {
  ...O.parameters,
  docs: {
    ...O.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...O.parameters?.docs?.source
    }
  }
};
j.parameters = {
  ...j.parameters,
  docs: {
    ...j.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...j.parameters?.docs?.source
    }
  }
};
R.parameters = {
  ...R.parameters,
  docs: {
    ...R.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
    \${footerHTML}
  </calcite-panel>
\``,
      ...R.parameters?.docs?.source
    }
  }
};
V.parameters = {
  ...V.parameters,
  docs: {
    ...V.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-panel
    heading="This is a heading"
    description="And that's a description"
    scale="s"
    style="height: 220px; margin: 50px;"
  >
    <div slot="content-top">Content Top</div>
    <div>Instead of the mahi-mahi, may I just get the one mahi because I’m not that hungry?</div>
    <div slot="content-bottom">Content Bottom</div>
    \${footerHTML}
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
    \${footerHTML}
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
    \${footerHTML}
  </calcite-panel>
\``,
      ...V.parameters?.docs?.source
    }
  }
};
const mt = ["simple", "onlyProps", "disabledWithStyledSlot", "withIcon", "withDescriptionAndIcon", "withRichHeaderSlots", "darkModeRTL", "closableWithActions", "withHeaderTop", "withOnlyHeaderTop", "withPaginationHeaderTop", "collapsibleWithoutActions", "collapsibleWithActions", "collapseDirectionUp", "collapseDirectionUpCollapsed", "collapsedWithActions", "withActionBar", "footerPadding", "footerVariations", "actionBarBackgroundColor", "footerWithoutContent", "actionBarWithoutContent", "actionBarZIndex", "footerAndActionBarWithoutContent", "flexContent", "flexContentWithFAB", "overflowContent", "overflowContentWithFab", "noOverflowContentWithFab", "withTextContentOnly", "withNoHeaderBorderBlockEnd", "footerAndContentTopBottomSlots", "contentTopAndActionBarSlotsNoHeader", "footerStartAndEndSlots", "withSlottedAlert", "footerSlotPrecedence", "scalesFontAndPadding"];
export {
  mt as __namedExportsOrder,
  T as actionBarBackgroundColor,
  k as actionBarWithoutContent,
  C as actionBarZIndex,
  m as closableWithActions,
  x as collapseDirectionUp,
  w as collapseDirectionUpCollapsed,
  S as collapsedWithActions,
  y as collapsibleWithActions,
  f as collapsibleWithoutActions,
  N as contentTopAndActionBarSlotsNoHeader,
  o as darkModeRTL,
  ut as default,
  d as disabledWithStyledSlot,
  L as flexContent,
  B as flexContentWithFAB,
  P as footerAndActionBarWithoutContent,
  E as footerAndContentTopBottomSlots,
  M as footerPadding,
  R as footerSlotPrecedence,
  O as footerStartAndEndSlots,
  A as footerVariations,
  $ as footerWithoutContent,
  W as noOverflowContentWithFab,
  r as onlyProps,
  F as overflowContent,
  I as overflowContentWithFab,
  V as scalesFontAndPadding,
  s as simple,
  H as withActionBar,
  h as withDescriptionAndIcon,
  b as withHeaderTop,
  p as withIcon,
  D as withNoHeaderBorderBlockEnd,
  g as withOnlyHeaderTop,
  v as withPaginationHeaderTop,
  u as withRichHeaderSlots,
  j as withSlottedAlert,
  q as withTextContentOnly
};
