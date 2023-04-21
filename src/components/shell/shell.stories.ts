import { boolean, select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { ATTRIBUTES } from "../../../.storybook/resources";
import {
  Attributes,
  createComponentHTML as create,
  filterComponentAttributes,
  modesDarkDefault
} from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import centerRowReadme from "../shell-center-row/readme.md";
import panelReadme from "../shell-panel/readme.md";
import readme from "./readme.md";

export default {
  title: "Components/Shell",
  parameters: {
    notes: [readme, panelReadme, centerRowReadme]
  },
  ...storyFilters()
};

const createAttributes: (options?: { exceptions: string[] }) => Attributes = ({ exceptions } = { exceptions: [] }) => {
  return filterComponentAttributes([], exceptions);
};

const createShellPanelAttributes: (group: "Leading Panel" | "Trailing Panel", resizable?: boolean) => Attributes = (
  group,
  resizable = false
) => {
  const { position } = ATTRIBUTES;

  return [
    {
      name: "slot",
      value: group === "Leading Panel" ? "panel-start" : "panel-end"
    },
    {
      name: "collapsed",
      value: boolean("collapsed", false, group)
    },
    {
      name: "detached",
      value: boolean("detached", false, group)
    },
    {
      name: "position",
      value: select(
        "position",
        position.values,
        group === "Leading Panel" ? position.values[0] : position.values[1],
        group
      )
    },
    {
      name: "resizable",
      value: boolean("resizable", resizable, group)
    }
  ];
};

const createShellCenterRowAttributes: (group: string) => Attributes = (group) => {
  const { position, scale } = ATTRIBUTES;

  return [
    {
      name: "detached",
      value: boolean("detached", false, group)
    },
    {
      name: "height-scale",
      value: select("heightScale", scale.values, scale.values[0], group)
    },
    {
      name: "position",
      value: select("position", position.values, position.values[1], group)
    },
    {
      name: "slot",
      value: "center-row"
    }
  ];
};

const actionBarStartContentHTML = html`
  <calcite-action-group>
    <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
    <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
  </calcite-action-group>
`;

const actionBarEndContentHTML = html`
  <calcite-action-group>
    <calcite-action text="Idea" label="Add Item" icon="lightbulb"></calcite-action>
    <calcite-action text="Information" label="Save Item" icon="information"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Question" label="View Layers" icon="question"></calcite-action>
  </calcite-action-group>
`;

const actionBarStartHTML = html`
  <calcite-action-bar class="calcite-mode-dark" slot="action-bar"> ${actionBarStartContentHTML} </calcite-action-bar>
`;

const actionBarEndHTML = html`
  <calcite-action-bar slot="action-bar"> ${actionBarEndContentHTML} </calcite-action-bar>
`;

const leadingPanelHTML = html`
  ${actionBarStartHTML}
  <calcite-panel heading="Leading panel content">
    <div>Content</div>
  </calcite-panel>
`;

const centerRowHTML = html`
  <calcite-panel heading="Center row content">
    <div>Content</div>
  </calcite-panel>
`;

const trailingPanelHTML = html`
  ${actionBarEndHTML}
  <calcite-panel heading="Trailing panel content">
    <div>Content</div>
  </calcite-panel>
`;

const headerHTML = html`
  <header slot="header">
    <h2>My Shell Header</h2>
  </header>
`;

const footerHTML = `<footer slot="footer">My Shell Footer</footer>`;

const contentHTML = html(`
  <div
    style="
    width:100%;
    height:100%;
    background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  "
  ></div>
`);

const centerRowAdvancedHTML = html(`
  <calcite-tip-manager slot="center-row">
    <calcite-tip-group group-title="Astronomy">
      <calcite-tip heading="The Red Rocks and Blue Water">
        <img slot="thumbnail" src="${placeholderImage({ width: 1000, height: 600 })}" alt="This is an image." />
        <p>
          This tip is how a tip should really look. It has a landscape or square image and a small amount of text
          content. This paragraph is in an "info" slot.
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
  </calcite-tip-manager>
`);

const advancedLeadingPanelHTML = html(`
  ${actionBarStartHTML}
  <calcite-panel heading="Advanced panel example">
  <calcite-block collapsible open heading="Start Content" summary="This is the primary.">
    <calcite-block-content>
      <calcite-action text="Play" text-enabled indicator icon="play"></calcite-action>
      <calcite-action text="Extent" text-enabled icon="extent"></calcite-action>
      <calcite-action text="Chart" text-enabled icon="arrow-up-right"></calcite-action>
    </calcite-block-content>
  </calcite-block>
  <calcite-block collapsible open heading="Another Block" summary="This is the primary.">
    <calcite-block-content>
      <div style="height: 300px;">
        <p>Cool thing.</p>
      </div>
    </calcite-block-content>
  </calcite-block>
  <calcite-block collapsible open heading="Additional Block" summary="This is the primary.">
    <calcite-block-content>
      <div style="height: 300px;">
        <p>Cool thing.</p>
      </div>
    </calcite-block-content>
  </calcite-block>
  <calcite-block collapsible open heading="More Block" summary="This is the primary.">
    <calcite-block-content>
      <div style="height: 300px;">
        <p>Cool thang.</p>
      </div>
    </calcite-block-content>
  </calcite-block>
  </calcite-panel>
`);

// TODO: UPDATE
const advancedTrailingPanelHTMl = html(`
  ${actionBarEndHTML}
  <calcite-flow>
    <calcite-flow-item heading="Layer settings">
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-block collapsible open heading="End Content" summary="Select goodness">
        <calcite-block-content>
          <img alt="demo" src="${placeholderImage({ width: 640, height: 480 })}" width="100%" />
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-button slot="footer-actions" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer-actions" width="half">Save</calcite-button>
    </calcite-flow-item>
    <calcite-flow-item heading="Deeper flow item">
      <calcite-block collapsible open heading="End Content" summary="Select goodness">
        <calcite-block-content>
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <img alt="demo" src="${placeholderImage({ width: 640, height: 480 })}" width="100%" />
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-block collapsible open heading="Even more content" summary="Select goodness">
        <calcite-block-content>
          <calcite-block-section text="Cool things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
          <img alt="demo" src="${placeholderImage({ width: 640, height: 480 })}" width="100%" />
          <calcite-block-section text="Neat things">
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
            <calcite-action text="Cool thing" text-enabled></calcite-action>
          </calcite-block-section>
        </calcite-block-content>
      </calcite-block>
      <calcite-button slot="footer-actions" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer-actions" width="half">Save</calcite-button>
    </calcite-flow-item>
  </calcite-flow>
`);

export const simple = (): string =>
  create(
    "calcite-shell",
    createAttributes(),
    html`
      ${headerHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Leading Panel", true), advancedLeadingPanelHTML)}
      ${contentHTML} ${create("calcite-shell-center-row", createShellCenterRowAttributes("Center Row"), centerRowHTML)}
      ${centerRowAdvancedHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Trailing Panel", true), advancedTrailingPanelHTMl)}
      ${footerHTML}
    `
  );

export const darkModeRTL_TestOnly = (): string =>
  create(
    "calcite-shell",
    createAttributes({ exceptions: ["dir", "class"] }).concat(
      { name: "dir", value: "rtl" },
      { name: "class", value: "calcite-mode-dark" }
    ),
    html`
      ${headerHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Leading Panel"), advancedLeadingPanelHTML)}
      ${contentHTML} ${create("calcite-shell-center-row", createShellCenterRowAttributes("Center Row"), centerRowHTML)}
      ${contentHTML} ${centerRowAdvancedHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Trailing Panel"), advancedTrailingPanelHTMl)}
      ${footerHTML}
    `
  );

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const closedPanels = (): string =>
  html(`<calcite-shell content-behind>
  <calcite-shell-panel slot="panel-start" detached>
    <calcite-action-bar slot="action-bar">
      <calcite-action data-action-id="layers" icon="layers" text="Layers"></calcite-action>
      <calcite-action data-action-id="basemaps" icon="basemap" text="Basemaps"></calcite-action>
      <calcite-action data-action-id="legend" icon="legend" text="Legend"></calcite-action>
      <calcite-action data-action-id="bookmarks" icon="bookmark" text="Bookmarks"></calcite-action>
      <calcite-action data-action-id="print" icon="print" text="Print"></calcite-action>
    </calcite-action-bar>
    <calcite-panel heading="Layers" height-scale="l" data-panel-id="layers" closable closed>
      <div id="layers-container"></div>
    </calcite-panel>
    <calcite-panel heading="Basemaps" height-scale="l" data-panel-id="basemaps" closable closed>
      <div id="basemaps-container"></div>
    </calcite-panel>
    <calcite-panel heading="Legend" height-scale="l" data-panel-id="legend" closable closed>
      <div id="legend-container"></div>
    </calcite-panel>
    <calcite-panel heading="Bookmarks" height-scale="l" data-panel-id="bookmarks" closable closed>
      <div id="bookmarks-container"></div>
    </calcite-panel>
    <calcite-panel heading="Print" height-scale="l" data-panel-id="print" closable closed>
      <div id="print-container"></div>
    </calcite-panel>
  </calcite-shell-panel>
</calcite-shell>`);

export const endPanel_TestOnly = (): string =>
  html(`<calcite-shell content-behind>
    <header slot="header">
      <h2>My Shell Header</h2>
    </header>
    <div
      style="
width:100%;
height:100%;
background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
  linear-gradient(-45deg, #ccc 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #ccc 75%),
  linear-gradient(-45deg, transparent 75%, #ccc 75%);
background-size: 20px 20px;
background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
"
    ></div>
    <calcite-shell-panel slot="panel-end" position="end" detached>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Idea" label="Add Item" icon="lightbulb" appearance="solid" scale="m"></calcite-action>
          <calcite-action
            text="Information"
            label="Save Item"
            icon="information"
            appearance="solid"
            scale="m"
          ></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action
            text="Question"
            label="View Layers"
            icon="question"
            appearance="solid"
            scale="m"
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Layer settings">
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-action
            slot="header-menu-actions"
            text="Cool thing"
            text-enabled
            appearance="solid"
            scale="m"
          ></calcite-action>
          <calcite-block collapsible open heading="End Content" summary="Select goodness">
            <calcite-block-content>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-button
            slot="footer-actions"
            width="half"
            appearance="outline"
            alignment="center"
            kind="brand"
            scale="m"
          >
            Cancel
          </calcite-button>
          <calcite-button
            slot="footer-actions"
            width="half"
            alignment="center"
            appearance="solid"
            kind="brand"
            scale="m"
          >
            Save
          </calcite-button>
        </calcite-flow-item>
        <calcite-flow-item heading="Deeper flow item" show-back-button>
          <calcite-block collapsible open heading="End Content" summary="Select goodness">
            <calcite-block-content>
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-block collapsible open heading="Even more content" summary="Select goodness">
            <calcite-block-content>
              <calcite-block-section text="Cool things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
              <img
                alt="demo"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22640%22%20height%3D%22480%22%20viewBox%3D%220%200%20640%20480%22%3E%20%3Crect%20fill%3D%22%23ddd%22%20width%3D%22640%22%20height%3D%22480%22%2F%3E%20%3Ctext%20fill%3D%22rgba%280%2C0%2C0%2C0.5%29%22%20font-family%3D%22sans-serif%22%20font-size%3D%2296%22%20dy%3D%2233.599999999999994%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E640%C3%97480%3C%2Ftext%3E%20%3C%2Fsvg%3E"
                width="100%"
              />
              <calcite-block-section text="Neat things" toggle-display="button">
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
                <calcite-action text="Cool thing" text-enabled appearance="solid" scale="m"></calcite-action>
              </calcite-block-section>
            </calcite-block-content>
          </calcite-block>
          <calcite-button
            slot="footer-actions"
            width="half"
            appearance="outline"
            alignment="center"
            kind="brand"
            scale="m"
          >
            Cancel
          </calcite-button>
          <calcite-button
            slot="footer-actions"
            width="half"
            alignment="center"
            appearance="solid"
            kind="brand"
            scale="m"
          >
            Save
          </calcite-button>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
    <footer slot="footer">My Shell Footer</footer>
  </calcite-shell>`);

export const slottedModalAndAlert = (): string =>
  html(`
  <main>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Master cleanse occupy lo-fi meh. Green juice williamsburg XOXO man bun ascot fit. Knausgaard heirloom four dollar
      toast DSA chicharrones, typewriter chia raw denim. Bicycle rights mustache humblebrag, mixtape slow-carb retro
      vibecession franzen chia. Bespoke coloring book hot chicken literally bushwick succulents wayfarers. Dreamcatcher
      taiyaki celiac pork belly migas, fashion axe beard shabby chic. Forage chia twee bushwick readymade yuccie praxis
      enamel pin cred mukbang bicycle rights VHS iPhone pour-over subway tile.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="gnav" slot="header">Header Example</div>
      <calcite-modal open slot="modals" docked><span slot="header">Modal slotted in Shell</span></calcite-modal>
      <calcite-alert open slot="alerts" placement="top-end"
        ><span slot="title">Alert slotted in Shell</span>
      </calcite-alert>
      <calcite-shell-panel id="primary-panel" slot="panel-start" position="start">
        <calcite-action-bar slot="action-bar">
          <calcite-action-group>
            <calcite-action text="Save" icon="save" indicator> </calcite-action>
            <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
          <calcite-action-group>
            <calcite-action icon="layers" text="Layers" active> </calcite-action>
            <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
            <calcite-action icon="legend" text="Legend"> </calcite-action>
            <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-panel heading="Panel">
          <div class="padded-content">Panel content<br />Padding is fake.</div>
        </calcite-panel>
      </calcite-shell-panel>
      <calcite-shell-panel slot="panel-end" position="end">
        <calcite-action-bar slot="action-bar">
          <calcite-tooltip slot="expand-tooltip" label="tooltip" disable-pointer>Add layers</calcite-tooltip>
          <calcite-action-group>
            <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
            <calcite-action text="Styles" icon="shapes"> </calcite-action>
            <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
            <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
            <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
            </calcite-action>
            <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
            <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>
          </calcite-action-group>
        </calcite-action-bar>
        <calcite-flow>
          <calcite-flow-item heading="Flow 01">
            <div class="padded-content">Flow 01 content<br />Padding is fake.</div>
          </calcite-flow-item>
          <calcite-flow-item heading="Flow 02">
            <div class="padded-content">Flow 02 content<br />Padding is fake.</div>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel>
      <calcite-panel heading="Main content">
        <div class="padded-content">The borders are only applied to "known" components.<br />Padding is fake.</div>
      </calcite-panel>
      <footer slot="footer">Footer Example</footer>
    </calcite-shell>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Notice outside of shell</span></calcite-notice>
      Edison bulb iceland narwhal fit DSA. Activated charcoal dreamcatcher shabby chic, microdosing gluten-free locavore
      chambray tumblr hella sus ugh cronut tofu. Vibecession air plant etsy, vape church-key narwhal activated charcoal
      offal kombucha hella. Actually mumblecore butcher, iceland man bun prism blog taiyaki roof party portland hashtag.
    </p>
  </main>`);

export const contentBehind = (): string =>
  html(`<calcite-shell content-behind>
  ${headerHTML}
  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>
  ${contentHTML}
  <calcite-shell-center-row slot="center-row">${centerRowHTML}</calcite-shell-center-row>
  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>
  ${footerHTML}
</calcite-shell>`);

export const slottedPanelTop_TestOnly = (): string =>
  html(`<calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
      <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>
    <div class="gnav" slot="header">Header Example</div>
    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`);

export const slottedPanelBottom_TestOnly = (): string =>
  html(`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
      <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>
      <div class="gnav" slot="header">Header Example</div>
      <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>
      <footer slot="footer">Footer Example</footer>
    </calcite-shell>
  `);

export const slottedPanelTopAndBottom = (): string =>
  html(`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
  >
      <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>
    <div class="gnav" slot="header">Header Example</div>
    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>
    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`);

export const slottedPanelTopAndBottomAndSides = (): string =>
  html(`
  <calcite-shell
    style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    ">
    <div
      style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>
    <div class="gnav" slot="header">Header Example</div>
    ${create("calcite-shell-panel", createShellPanelAttributes("Leading Panel"), advancedLeadingPanelHTML)}
    ${create("calcite-shell-panel", createShellPanelAttributes("Trailing Panel"), advancedTrailingPanelHTMl)}
    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>
    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`);

export const shellPanelZIndex_TestOnly = (): string => html` <calcite-shell
  style="
height:400px;
position:relative;
"
>
  <calcite-shell-panel slot="panel-start" position="start">
    <calcite-action-bar slot="action-bar">
      <calcite-tooltip open slot="expand-tooltip">Expand</calcite-tooltip>
    </calcite-action-bar>
  </calcite-shell-panel>
  <calcite-shell-center-row slot="panel-bottom">
    <div style="height: 100%; width: 600px; background-color: black;"></div>
  </calcite-shell-center-row>
</calcite-shell>`;

shellPanelZIndex_TestOnly.parameters = {
  chromatic: { delay: 800 }
};

export const resizableShellPanels = (): string => html`<calcite-shell
  style="
width:100%;
height:500px;
max-height:80%;
position:relative;
"
>
  <calcite-shell-panel resizable slot="panel-start" position="start">
    <calcite-action-bar slot="action-bar" class="calcite-mode-dark">
      <calcite-action-group>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="layers" text="Layers" active> </calcite-action>
        <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        <calcite-action icon="legend" text="Legend"> </calcite-action>
        <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="bottom-actions">
        <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <calcite-panel heading="Layers"><p>Start Panel</p></calcite-panel>
  </calcite-shell-panel>
  <calcite-shell-panel resizable slot="panel-end" position="end">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        <calcite-action text="Styles" icon="shapes"> </calcite-action>
        <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
        <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
        <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tablew" icon="table" slot="menu-actions"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="search" text="Search"></calcite-action>
        <calcite-action icon="measure" text="Measure"></calcite-action>
        <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
        <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
        <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="bottom-actions">
        <calcite-action text="Tips" id="tip-manager-button">
          <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
        </calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <calcite-flow id="flow">
      <calcite-flow-item
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
      >
        <p>End Panel</p>
      </calcite-flow-item>
    </calcite-flow>
  </calcite-shell-panel>
  <div
    style="
      width:100%;
      height:100%;
      background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"
  ></div>
  <calcite-shell-panel resizable layout="horizontal" slot="panel-top" position="start">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="layers" text="Layers" active> </calcite-action>
        <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        <calcite-action icon="legend" text="Legend"> </calcite-action>
        <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="bottom-actions">
        <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Top Panel</p>
  </calcite-shell-panel>
  <calcite-shell-panel resizable layout="horizontal" slot="panel-bottom" position="end">
    <calcite-action-bar slot="action-bar">
      <calcite-action-group>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled icon="collection" text="Open" slot="menu-actions"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action icon="layers" text="Layers" active> </calcite-action>
        <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        <calcite-action icon="legend" text="Legend"> </calcite-action>
        <calcite-action icon="bookmark" text="Bookmarks"> </calcite-action>
      </calcite-action-group>
      <calcite-action-group>
        <calcite-action text="Share" icon="share"></calcite-action>
        <calcite-action text="Print" icon="print"></calcite-action>
      </calcite-action-group>
      <calcite-action-group slot="bottom-actions">
        <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone"></calcite-action>
      </calcite-action-group>
    </calcite-action-bar>
    <p>Bottom Panel</p>
  </calcite-shell-panel>
</calcite-shell>`;
