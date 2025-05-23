import { ShellPanel } from "../shell-panel/shell-panel";
import { ShellCenterRow } from "../shell-center-row/shell-center-row";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";

const { shellDisplayMode, position, scale } = ATTRIBUTES;

interface ShellPanelArgs extends Pick<ShellPanel, "collapsed" | "displayMode" | "resizable"> {
  leadingPanelPosition: ShellPanel["position"];
  trailingPanelPosition: ShellPanel["position"];
}

interface ShellCenterRowArgs extends Pick<ShellCenterRow, "detached" | "heightScale"> {
  shellCenterRowPosition: ShellCenterRow["position"];
}

type ShellStoryArgs = ShellPanelArgs & ShellCenterRowArgs;

export default {
  title: "Components/Shell",
  args: {
    collapsed: false,
    displayMode: shellDisplayMode.defaultValue,
    leadingPanelPosition: position.values[0],
    trailingPanelPosition: position.values[1],
    resizable: true,
    detached: false,
    heightScale: scale.values[0],
    shellCenterRowPosition: position.values[1],
  },
  argTypes: {
    displayMode: {
      options: shellDisplayMode.values,
      control: { type: "select" },
    },
    leadingPanelPosition: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
    trailingPanelPosition: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
    heightScale: {
      options: scale.values,
      control: { type: "select" },
    },
    shellCenterRowPosition: {
      options: position.values.filter((option) => option !== "top" && option !== "bottom"),
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
    layout: "fullscreen",
  },
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

const bottomPanelHTML = html`
  <calcite-panel heading="Panel bottom content">
    <div>Content</div>
  </calcite-panel>
`;

const centerRowWithActionBarHTML = html`
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
    <calcite-action-group slot="actions-end">
      <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
      <calcite-action text="What's next" icon="mega-phone"></calcite-action>
    </calcite-action-group>
  </calcite-action-bar>
  <calcite-panel heading="Center row content">Panel</calcite-panel>
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
        <p>Cool thing.</p>
        <p>Cool thing.</p>
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
      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer" width="half">Save</calcite-button>
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
      <calcite-button slot="footer" width="half" appearance="outline">Cancel</calcite-button>
      <calcite-button slot="footer" width="half">Save</calcite-button>
    </calcite-flow-item>
  </calcite-flow>
`);

export const simple = (args: ShellStoryArgs): string => html`
  <calcite-shell>
    ${headerHTML}
    <calcite-shell-panel
      slot="panel-start"
      ${boolean("collapsed", args.collapsed)}
      displayMode="${args.displayMode}"
      position="${args.leadingPanelPosition}"
      ${boolean("resizable", args.resizable)}
    >
      ${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    ${contentHTML}
    <calcite-shell-center-row
      ${boolean("detached", args.detached)}
      height-scale="${args.heightScale}"
      position="${args.shellCenterRowPosition}"
      slot="center-row"
    >
      ${centerRowHTML}
    </calcite-shell-center-row>
    ${centerRowAdvancedHTML}
    <calcite-shell-panel
      slot="panel-end"
      ${boolean("collapsed", args.collapsed)}
      displayMode="${args.displayMode}"
      position="${args.trailingPanelPosition}"
      ${boolean("resizable", args.resizable)}
    >
      ${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    ${footerHTML}
  </calcite-shell>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-shell dir="rtl" class="calcite-mode-dark">
    ${headerHTML}
    <calcite-shell-panel slot="panel-start" displayMode="dock" position="start">
      ${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    ${contentHTML}
    <calcite-shell-center-row height-scale="s" position="end" slot="center-row">
      ${centerRowHTML}
    </calcite-shell-center-row>
    ${contentHTML} ${centerRowAdvancedHTML}
    <calcite-shell-panel slot="panel-end" displayMode="dock" position="end">
      ${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    ${footerHTML}
  </calcite-shell>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

const closedPanelsHtml: string[] = [];
["float", "float-content"].forEach((d, i) => {
  closedPanelsHtml[i] = html(`<calcite-shell content-behind>
    <calcite-shell-panel slot="panel-start" display-mode="${d}">
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
});
export const closedPanelsFloat = (): string => closedPanelsHtml[0];
export const closedPanelsFloatContent = (): string => closedPanelsHtml[1];

const endPanelHtml: string[] = [];
["float", "float-content"].forEach((d, i) => {
  endPanelHtml[i] = html(`<calcite-shell content-behind>
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
    <calcite-shell-panel slot="panel-end" position="end" display-mode="${d}">
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
            slot="footer"
            width="half"
            appearance="outline"
            alignment="center"
            kind="brand"
            scale="m"
          >
            Cancel
          </calcite-button>
          <calcite-button
            slot="footer"
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
            slot="footer"
            width="half"
            appearance="outline"
            alignment="center"
            kind="brand"
            scale="m"
          >
            Cancel
          </calcite-button>
          <calcite-button
            slot="footer"
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
});
export const endPanelFloat_TestOnly = (): string => endPanelHtml[0];
export const endPanelFloatContent_TestOnly = (): string => endPanelHtml[1];

export const slottedModalAndAlert = (): string =>
  html(`
  <main>
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
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
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur.
    </p>
  </main>`);

export const slottedSheetOverlay = (): string =>
  html(`
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="overlay">
            <calcite-panel closable heading="Ultrices neque"
              ><p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
              <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
            </calcite-panel>
          </calcite-sheet>
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
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur.
    </p>
    <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  </script>
`);

const slottedSheetHtml: string[] = [];
["float", "float-content"].forEach((d, i) => {
  slottedSheetHtml[i] = html(`
    <p class="padded-content">
      <calcite-notice width="full" open><span slot="title">Other page content outside of shell</span></calcite-notice>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
      sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
    </p>
    <calcite-shell
      style="
    width:100%;
    height:500px;
    max-height:80%;
    position:relative;
    "
    >
      <div class="global-nav" slot="header">Header Example</div>
      <calcite-sheet open slot="sheets" label="libero nunc" position="inline-start" display-mode="${d}">
            <calcite-panel closable heading="Ultrices neque"
              ><p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <calcite-button slot="footer" width="half" appearance="outline">tincidunt lobortis</calcite-button>
              <calcite-button slot="footer" width="half" appearance="outline">amet porttitor</calcite-button>
            </calcite-panel>
          </calcite-sheet>
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
            <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur.
    </p>
    <script>
    document.addEventListener("calcitePanelClose", () => {
      document.querySelector("calcite-sheet").open = false;
    });
  </script>
`);
});
export const slottedSheetFloat = (): string => slottedSheetHtml[0];
export const slottedSheetFloatContent = (): string => slottedSheetHtml[1];

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
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`);

const contentBehindPanelBottomHtml: string[] = [];
["float", "float-content"].forEach((d, i) => {
  contentBehindPanelBottomHtml[i] = html(`
    <calcite-shell
      content-behind
      style="
      width:700px;
      height:700px;
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
        <calcite-shell-panel slot="panel-bottom" display-mode="${d}" layout="horizontal">${bottomPanelHTML}</calcite-shell-panel>
      </calcite-shell>
    `);
});
export const contentBehindPanelBottomFloat = (): string => contentBehindPanelBottomHtml[0];
export const contentBehindPanelBottomFloatContent = (): string => contentBehindPanelBottomHtml[1];

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
      <div class="global-nav" slot="header">Header Example</div>
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
    <div class="global-nav" slot="header">Header Example</div>
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
    <div class="global-nav" slot="header">Header Example</div>
    <calcite-shell-panel
      slot="panel-start"
      displayMode="dock"
      position="start"
      display-mode="dock"
      width-scale="m"
      layout="vertical"
    >
      ${advancedLeadingPanelHTML}
    </calcite-shell-panel>
    <calcite-shell-panel
      slot="panel-end"
      displayMode="dock"
      position="end"
      display-mode="dock"
      width-scale="m"
      layout="vertical"
    >
      ${advancedTrailingPanelHTMl}
    </calcite-shell-panel>
    <calcite-shell-center-row slot="panel-top">${centerRowHTML}</calcite-shell-center-row>
    <calcite-shell-center-row slot="panel-bottom">${centerRowHTML}</calcite-shell-center-row>
    <footer slot="footer">Footer Example</footer>
  </calcite-shell>
`);

export const shellCenterRowWithActionBar_TestOnly = (): string =>
  html(`<calcite-shell content-behind>
  ${headerHTML}
  <calcite-shell-panel slot="panel-start">${leadingPanelHTML}</calcite-shell-panel>
  ${contentHTML}
  <calcite-shell-center-row slot="center-row">${centerRowWithActionBarHTML}</calcite-shell-center-row>
  <calcite-shell-panel slot="panel-end">${trailingPanelHTML}</calcite-shell-panel>
  ${footerHTML}
</calcite-shell>`);

export const shellPanelZIndex_TestOnly = (): string =>
  html` <calcite-shell
    style="
height:400px;
position:relative;
"
  >
    <calcite-shell-panel slot="panel-start" position="start" collapsed>
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip open slot="expand-tooltip">Expand</calcite-tooltip>
      </calcite-action-bar>
    </calcite-shell-panel>
    <calcite-shell-center-row slot="panel-bottom">
      <div style="height: 100%; width: 600px; background-color: black;"></div>
    </calcite-shell-center-row>
  </calcite-shell>`;

shellPanelZIndex_TestOnly.parameters = {
  chromatic: { delay: 800 },
};

export const resizableShellPanels = (): string =>
  html`<calcite-shell
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
        <calcite-action-group slot="actions-end">
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
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
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
        <calcite-action-group slot="actions-end">
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>`;

resizableShellPanels.parameters = {
  chromatic: { delay: 500 },
};

export const resizableShellPanelsRTL = (): string =>
  html`<calcite-shell
    dir="rtl"
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
        <calcite-action-group slot="actions-end">
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
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
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
        <calcite-action-group slot="actions-end">
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <p>Bottom Panel</p>
    </calcite-shell-panel>
  </calcite-shell>`;

resizableShellPanelsRTL.parameters = {
  chromatic: { delay: 500 },
};

export const overlayDisplayMode_TestOnly = (): string =>
  html`<calcite-shell
    style="
width:800px;
height:600px;
position:relative;
"
  >
    <calcite-shell-panel display-mode="overlay" resizable id="primary-panel" slot="panel-start" position="start">
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" height-scale="l" width-scale="m">
        <calcite-fab slot="fab" id="layer-fab" text="Add layers"></calcite-fab>
        <calcite-tooltip label="tooltip" reference-element="layer-fab" pointer-disabled>Add layers</calcite-tooltip>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="overlay" resizable slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow id="flow">
        <calcite-flow-item
          heading="Configure popup"
          description="Popular Demographics in the United States (Beta) - County"
          width-scale="m"
        >
          <calcite-action slot="header-actions-end" icon="x" text="Close"> </calcite-action>
          <calcite-block heading="Title" summary="County: {NAME}" collapsible>
            <calcite-icon icon="title" scale="m" slot="icon"></calcite-icon>
            <div class="combo-control">
              <div class="combo-button">
                <button class="combo-button__main">County: {NAME}</button>
                <calcite-action label="code icon" class="combo-action" scale="s" icon="code"></calcite-action>
              </div>
            </div>
          </calcite-block>
          <calcite-sortable-list>
            <calcite-block drag-handle heading="Attributes" summary="2/98" collapsible>
              <calcite-icon icon="feature-details" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <calcite-list drag-enabled>
                <calcite-list-item
                  label="2018 Total Households (Esri)"
                  value="Households"
                  description="{TOTHH_CY}"
                ></calcite-list-item>
                <calcite-list-item
                  label="2018 Average Household Size (Esri)"
                  value="Household"
                  description="{AVGHHSZ_CY}"
                ></calcite-list-item>
              </calcite-list>
              <div class="row">
                <calcite-button id="attribute-add" round icon="plus" scale="s" width="full" kind="neutral"
                  >Select attributes</calcite-button
                >
              </div>
            </calcite-block>
            <calcite-block drag-handle heading="Image" collapsible>
              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <section class="form-section">
                <label>
                  URL
                  <input type="text" value="https://ca-times.brightspotcdn.com/dims4/default/" />
                </label>
              </section>
              <calcite-block-section text="Options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
              <calcite-block-section text="Advanced options">
                <section class="form-section">
                  <label>
                    Title
                    <input type="text" placeholder="My cool title" />
                  </label>
                  <label>
                    Caption
                    <input type="text" placeholder="My cool caption" />
                  </label>
                  <label>
                    State
                    <select placeholder="My cool caption">
                      <option value="Denial">Denial</option>
                      <option value="Grace">Grace</option>
                      <option value="Confusion">Confusion</option>
                    </select>
                  </label>
                </section>
              </calcite-block-section>
            </calcite-block>
            <calcite-block drag-handle heading="Text" summary="Cool. he {expression/..." collapsible>
              <calcite-icon icon="image" scale="m" slot="icon"></calcite-icon>
              <calcite-action label="ellipsis" slot="control" icon="ellipsis" scale="m"></calcite-action>
              <button class="multiline-button">Cool. he {expression/expr1} population is {expression/expr2}%...</button>
            </calcite-block>
          </calcite-sortable-list>
          <calcite-fab slot="fab" id="label-fab" text="Add label class"></calcite-fab>
          <calcite-tooltip label="tooltip" reference-element="label-fab" pointer-disabled>
            Add label class
          </calcite-tooltip>
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
    <calcite-shell-panel
      collapsed
      display-mode="overlay"
      resizable
      layout="horizontal"
      slot="panel-top"
      position="start"
    >
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel
      collapsed
      display-mode="overlay"
      resizable
      layout="horizontal"
      slot="panel-bottom"
      position="end"
    >
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example"> Example </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

overlayDisplayMode_TestOnly.parameters = {
  chromatic: { delay: 500 },
};

export const panelEndWithPositionStart_TestOnly = (): string =>
  html`<calcite-shell>
    <calcite-shell-panel slot="panel-end" width-scale="l" position="start" display-mode="block" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map Options">
        <calcite-button width="half" slot="footer"> Next </calcite-button>
        <calcite-block collapsible heading="Layer effects" description="Adjust blur, highlight, and more">
          <calcite-icon scale="s" slot="icon" icon="effects"></calcite-icon>
          <calcite-notice open>
            <div slot="message">Use layer effects sparingly, for emphasis</div>
          </calcite-notice>
        </calcite-block>
        <calcite-block collapsible heading="Symbology" description="Select type, color, and transparency">
          <calcite-icon scale="s" slot="icon" icon="map-pin"></calcite-icon>
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
        <calcite-fab slot="fab"></calcite-fab>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const panelTopFloatHorizontal_TestOnly = (): string =>
  html`<calcite-shell>
    <calcite-shell-panel
      layout="horizontal"
      slot="panel-top"
      position="start"
      display-mode="float-all"
      width-scale="m"
      calcite-hydrated=""
    >
      <calcite-action-bar
        slot="action-bar"
        expand-disabled=""
        layout="horizontal"
        overlay-positioning="absolute"
        calcite-hydrated=""
      >
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="map" text="New" appearance="solid" scale="m" calcite-hydrated=""> </calcite-action>
          <calcite-action icon="collection" text="Open" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="basemap" text="Basemaps" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="legend" text="Legend" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action icon="bookmark" text="Bookmarks" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="horizontal" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action
            text="Feedback"
            icon="speech-bubble-plus"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
          <calcite-action
            text="What's next"
            icon="mega-phone"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel
        heading="Example"
        closable=""
        id="panel-top"
        overlay-positioning="absolute"
        scale="m"
        calcite-hydrated=""
      >
        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >dock</calcite-chip
            >
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >float content</calcite-chip
            >
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >overlay</calcite-chip
            >
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Vertical</calcite-chip
            >
            <calcite-chip selected="" value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const panelTopFloatVertical_TestOnly = (): string =>
  html`<calcite-shell>
    <calcite-shell-panel
      layout="vertical"
      slot="panel-top"
      position="start"
      display-mode="float-all"
      width-scale="m"
      calcite-hydrated=""
    >
      <calcite-action-bar
        slot="action-bar"
        expand-disabled=""
        layout="vertical"
        overlay-positioning="absolute"
        calcite-hydrated=""
      >
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Save" icon="save" indicator="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action
            icon="map"
            text="New"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="collection"
            text="Open"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action icon="layers" text="Layers" active="" appearance="solid" scale="m" calcite-hydrated="">
          </calcite-action>
          <calcite-action
            icon="basemap"
            text="Basemaps"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="legend"
            text="Legend"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
          <calcite-action
            icon="bookmark"
            text="Bookmarks"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
            text-enabled=""
            slot="menu-actions"
          >
          </calcite-action>
        </calcite-action-group>
        <calcite-action-group layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action text="Share" icon="share" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
          <calcite-action text="Print" icon="print" appearance="solid" scale="m" calcite-hydrated=""></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end" layout="vertical" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-action
            text="Feedback"
            icon="speech-bubble-plus"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
          <calcite-action
            text="What's next"
            icon="mega-phone"
            appearance="solid"
            scale="m"
            calcite-hydrated=""
          ></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel
        heading="Example"
        closable=""
        id="panel-top"
        overlay-positioning="absolute"
        scale="m"
        calcite-hydrated=""
      >
        <calcite-block open="" heading="Preview display-mode" overlay-positioning="absolute" calcite-hydrated="">
          <calcite-chip-group id="chip-group-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="dock" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >dock</calcite-chip
            >
            <calcite-chip value="float-content" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >float content</calcite-chip
            >
            <calcite-chip value="overlay" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >overlay</calcite-chip
            >
            <calcite-chip value="float-all" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >float all</calcite-chip
            >
          </calcite-chip-group>
          <calcite-chip-group id="chip-layout-panel-top" selection-mode="single-persist" scale="m" calcite-hydrated="">
            <calcite-chip value="vertical" appearance="solid" kind="neutral" scale="m" calcite-hydrated="" selected=""
              >Vertical</calcite-chip
            >
            <calcite-chip value="horizontal" appearance="solid" kind="neutral" scale="m" calcite-hydrated=""
              >Horizontal</calcite-chip
            >
          </calcite-chip-group>
          <div class="tall-content-example" style="display: none"></div>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const resizeHandlePositioning = (): string =>
  html` <calcite-shell>
    <calcite-shell-panel id="panel-start" slot="panel-start" position="start" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Main content"></calcite-panel>
    <calcite-shell-panel id="panel-end" slot="panel-end" position="end" resizable>
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator></calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel 1">
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const shellPanelWithTabs = (): string =>
  html`<calcite-shell>
    <calcite-shell-panel slot="panel-start" position="start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Add" icon="plus"></calcite-action>
          <calcite-action active text="Layers" indicator icon="layers"></calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Undo" icon="undo"></calcite-action>
          <calcite-action text="Redo" indicator icon="redo"></calcite-action>
          <calcite-action text="Save" disabled icon="save"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="bottom-actions">
          <calcite-action text="Tips" icon="question"></calcite-action>
          <calcite-action text="Settings" indicator icon="gear"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Layers" id="panel-start" closable>
        <calcite-block
          collapsible
          heading="Symbology"
          description="Select type, color, and transparency"
          icon-start="map-pin"
        >
          <calcite-notice open>
            <div slot="message">The viewers are going to love this</div>
          </calcite-notice>
        </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-bottom" position="end" layout="horizontal">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab selected>
            <calcite-notice icon="embark" open>
              <div slot="message">Recommended for coastal use</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end" position="end" layout="vertical">
      <calcite-panel heading="Content">
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected> Watercraft </calcite-tab-title>
            <calcite-tab-title>Automobiles</calcite-tab-title>
            <calcite-tab-title>Aircraft</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab selected>
            <calcite-notice icon="embark" open>
              <div slot="message">Recommended for coastal use</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="car" open>
              <div slot="message">A good choice for inland adventure</div>
            </calcite-notice>
          </calcite-tab>
          <calcite-tab>
            <calcite-notice icon="plane" open>
              <div slot="message">Cross continents quickly</div>
            </calcite-notice>
          </calcite-tab>
        </calcite-tabs>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const panelWithPopoverZIndex = (): string =>
  html` <style>
      #viewDiv {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: gray;
      }
    </style>
    <calcite-shell content-behind>
      <div id="viewDiv"></div>
      <calcite-shell-panel slot="panel-start"></calcite-shell-panel>
      <calcite-shell-panel slot="panel-end">
        <calcite-flow>
          <calcite-flow-item heading="panel header">
            <calcite-button id="button" style="margin-top:20px">open popover</calcite-button>
          </calcite-flow-item>
        </calcite-flow>
      </calcite-shell-panel> </calcite-shell
    ><calcite-popover open reference-element="button" offset-distance="-50" offset-skidding="15" style="z-index: 100">
      <calcite-panel height-scale="m" heading="popover panel header" style="height: 400px;"> </calcite-panel
    ></calcite-popover>`;

export const popoverZIndex = (): string =>
  html`<calcite-shell>
    <calcite-shell-panel slot="panel-start" position="start" id="shell-panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action id="target-element" text="Save" icon="save" indicator></calcite-action>
        <calcite-action active icon="map" text="Map"></calcite-action>
        <calcite-action icon="layer" text="Layer"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>

    <!--  Popover here  -->
    <calcite-popover overlay-positioning="fixed" reference-element="target-element" open
      ><p>This is a popover</p></calcite-popover
    >

    <calcite-shell-panel slot="panel-end" position="end" id="shell-panel-end" collapsed>
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Layer" icon="sliders-horizontal"></calcite-action>
        <calcite-action text="Styles" icon="shapes"></calcite-action>
        <calcite-action text="Filter" icon="layer-filter"></calcite-action>
        <calcite-action text="Configure" icon="popup"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading id="panel-end" closable closed>
        <calcite-block heading="Block 1" collapsible></calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Content"></calcite-panel>
  </calcite-shell>`;

export const floatAllArrangements = (): string =>
  html` <calcite-shell content-behind>
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
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip" pointer-disabled>Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" layout="horizontal" slot="panel-top" position="start">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" layout="horizontal" slot="panel-bottom" position="end">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const resizableShellPanelWithDropdown = (): string =>
  html`<calcite-shell>
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
    <calcite-shell-panel slot="panel-start" position="start" id="shell-panel-start" resizable width="s">
      <calcite-action-bar slot="action-bar">
        <calcite-action text="Save" icon="save" indicator text-enabled></calcite-action>
        <calcite-action active icon="map" text="Map" text-enabled></calcite-action>
        <calcite-action icon="layer" text="Layer" text-enabled></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Map" id="panel-start">
        <calcite-dropdown open width="m" overlay-positioning="fixed">
          <calcite-button slot="trigger">Select landform</calcite-button>
          <calcite-dropdown-group group-title="Natural places">
            <calcite-dropdown-item>Mountain</calcite-dropdown-item>
            <calcite-dropdown-item>River</calcite-dropdown-item>
            <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
            <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
            <calcite-dropdown-item>Tundra</calcite-dropdown-item>
            <calcite-dropdown-item>Desert</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const floatAllArrangementsStart = (): string =>
  html` <calcite-shell content-behind>
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
    <calcite-shell-panel display-mode="float-all" slot="panel-start">
      <calcite-action-bar slot="action-bar">
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
          <calcite-action text-enabled icon="map" text="New" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel closable heading="Layers" height-scale="l" width-scale="m">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-tooltip slot="expand-tooltip" label="tooltip" pointer-disabled>Add layers</calcite-tooltip>
        <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
        </calcite-action>
        <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
        <calcite-action text-enabled text="Tables" icon="table" slot="menu-actions"> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Tips" icon="lightbulb" slot="actions-end"> </calcite-action>
      </calcite-action-bar>
      <calcite-panel
        closable
        heading="Configure popup"
        description="Popular Demographics in the United States (Beta) - County"
        width-scale="m"
      >
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" layout="vertical" slot="panel-top" position="start">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-action-group>
          <calcite-action text="Save" icon="save" indicator> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
          <calcite-action icon="basemap" text="Basemaps"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Example">
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" layout="horizontal" slot="panel-bottom" position="end">
      <calcite-action-bar slot="action-bar" expand-disabled>
        <calcite-action text="Save" icon="save" indicator> </calcite-action>
        <calcite-action-group>
          <calcite-action icon="layers" text="Layers" active> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action text="Share" icon="share"></calcite-action>
          <calcite-action text="Print" icon="print"></calcite-action>
        </calcite-action-group>
        <calcite-action text="Feedback" icon="speech-bubble-plus" slot="actions-end"></calcite-action>
        <calcite-action text="What's next" icon="mega-phone" slot="actions-end"></calcite-action>
      </calcite-action-bar>
      <calcite-panel heading="Example" closable>
        <calcite-block open heading="Preview display-mode"> </calcite-block>
      </calcite-panel>
    </calcite-shell-panel>
  </calcite-shell>`;

export const panelsWithOverflowingContent = (): string =>
  html` <calcite-shell content-behind>
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
    <calcite-shell-panel layout="horizontal" slot="panel-bottom" position="end">
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-start" position="start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip" pointer-disabled>Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>`;

panelsWithOverflowingContent.parameters = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 400,
        },
      },
    },
    cropToViewport: true,
  },
};

export const customPanelWithOverflowingContent = (): string => html` <calcite-shell content-behind>
    <div style="
              width:100%;
              height:100%;
              background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
              linear-gradient(-45deg, #ccc 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #ccc 75%),
              linear-gradient(-45deg, transparent 75%, #ccc 75%);
              background-size: 20px 20px;
              background-position: 0 0, 0 10px, 10px -10px, -10px 0px;"></div>
    <div slot="panel-bottom" style="height:66%; --calcite-shell-panel-max-height: auto;
    --calcite-shell-panel-min-height: auto;
    --calcite-shell-panel-height: auto;">
      <calcite-shell-panel display-mode="float" width-scale="m" layout="horizontal" position="start" style="height: 100%;
    ">
        <calcite-panel heading="Panel">
          <div style="display: flex; flex-direction: row; height: 100%; width:100%">
            <calcite-action-bar overflow-actions-disabled
              style="display: flex; flex-direction: column; height: 100%; border-right: 1px solid var(--calcite-color-border-2); overflow-x: hidden;"
              layout="vertical" overlay-positioning="absolute" scale="m">
              <slot name="custom-action-top"></slot><calcite-action-group layout="vertical"
                overlay-positioning="absolute" scale="m">
                <div><calcite-action icon="gear" id="editChart" appearance="solid" scale="m"></calcite-action>
                </div>
                <div><calcite-action id="legend" appearance="solid" disabled="" scale="m"
                    aria-disabled="true"><calcite-icon icon="legend" scale="s" flip-rtl=""
                      aria-hidden="true"></calcite-icon></calcite-action></div>
                <div><calcite-action icon="rotate" id="rotateChart" appearance="solid" scale="m"></calcite-action></div>
              </calcite-action-group><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div><calcite-action icon="selection-filter" id="filterBySelection" appearance="solid" disabled=""
                    scale="m" aria-disabled="true"></calcite-action></div>
                <div><calcite-action icon="extent-filter" id="filterByExtent" appearance="solid" scale="m"
                    aria-describedby="calcite-tooltip-4ece6511-9e21-cf51-f2a2-5d94d7ce0b49"></calcite-action></div>
              </calcite-action-group><calcite-action-group layout="vertical" overlay-positioning="absolute" scale="m">
                <div><calcite-action icon="erase" id="clearSelection" appearance="solid" disabled="" scale="m"
                    aria-disabled="true"></calcite-action></div>

                <div><calcite-action icon="arrow-right-left" id="switchSelection" appearance="solid"
                    scale="m"></calcite-action></div>
              </calcite-action-group>
              <slot name="custom-action-below"></slot>
            </calcite-action-bar>
            <div style="flex-grow: 1;
    overflow-y: hidden;">

              <div style="width: 100%; height: 100%; position: static; left: 0.195313px; top: -0.5px;"><svg
                  version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  role="group" style="width: 100%; height: 100%; overflow: visible;">
                  <defs>
                    <clipPath id="id-422">
                      <rect width="771" height="386"></rect>
                    </clipPath>
                    <filter id="filter-id-427" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                    <clipPath id="id-1882">
                      <rect width="695" height="285"></rect>
                    </clipPath>
                    <filter id="filter-id-1979" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                    </filter>
                    <filter id="filter-id-2000" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                    </filter>
                    <clipPath id="id-2095">
                      <path d="M0,0 L695,0 L695,285 L0,285 L0,0"></path>
                    </clipPath>
                    <clipPath id="id-2118">
                      <path d="M0,0 L695,0 L695,285 L0,285 L0,0"></path>
                    </clipPath>
                    <clipPath id="id-2136">
                      <path d="M0,0 L695,0 L695,285 L0,285 L0,0"></path>
                    </clipPath>
                    <clipPath id="id-2154">
                      <path d="M0,0 L695,0 L695,285 L0,285 L0,0"></path>
                    </clipPath>
                    <clipPath id="id-2172">
                      <path d="M0,0 L695,0 L695,285 L0,285 L0,0"></path>
                    </clipPath>
                    <clipPath id="id-2242">
                      <rect width="695" height="285"></rect>
                    </clipPath>
                    <clipPath id="id-3608">
                      <rect width="0" height="299" transform="translate(-10,0)"></rect>
                    </clipPath>
                    <filter id="filter-id-2100" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                    <filter id="filter-id-2123" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                    <filter id="filter-id-2141" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                    <filter id="filter-id-2159" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                    <filter id="filter-id-2177" filterUnits="objectBoundingBox" width="200%" height="200%" x="-50%"
                      y="-50%">
                      <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                      <feOffset result="offsetBlur" dx="1" dy="1"></feOffset>
                      <feFlood flood-color="#000000" flood-opacity="0.5"></feFlood>
                      <feComposite in2="offsetBlur" operator="in"></feComposite>
                      <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                      </feMerge>
                    </filter>
                  </defs>
                  <g>
                    <g fill="#ffffff" fill-opacity="0">
                      <rect width="771" height="386"></rect>
                    </g>
                    <g>
                      <g role="region" clip-path="url(&quot;#id-422&quot;)" opacity="1" aria-label="Chart" id="id-399">
                        <g fill="#ffffff">
                          <rect width="771" height="386"></rect>
                        </g>
                        <g transform="translate(7,7)">
                          <g>
                            <g>
                              <g fill="#444444" font-family="Segoe UI" font-weight="normal" font-size="16"
                                text-decoration="none" transform="translate(378.5,9.5)">
                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                  transform="translate(-64,-9.5)">
                                  <rect width="128" height="19"></rect>
                                </g>
                                <g transform="translate(-64,-9.5)" style="user-select: none;"><text x="0" y="18.5"
                                    overflow="hidden" dy="-4.995">
                                    <tspan style="font-style:normal">without custom sort</tspan>
                                  </text></g>
                              </g>
                              <g fill="#000000" display="none">
                                <g display="none"></g>
                              </g>
                            </g>
                          </g>
                          <g transform="translate(0,32)">
                            <g>
                              <g>
                                <g transform="translate(0,15)">
                                  <g>
                                    <g>
                                      <g transform="translate(62,0)"
                                        style="touch-action: none; user-select: none; -webkit-user-drag: none;">
                                        <g fill="#ffffff" fill-opacity="0" transform="translate(0,0)">
                                          <rect width="695" height="285"></rect>
                                        </g>
                                        <g>
                                          <g>
                                            <g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                display="none" transform="translate(0,285)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" display="none"
                                                transform="translate(0,285)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                display="none" transform="translate(0,285)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" display="none"
                                                transform="translate(0,285)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,285)" display="none">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,285)"
                                                display="none">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,285)" display="none">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,285)"
                                                display="none">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,-114)" display="none">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,-114)"
                                                display="none">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,-34)" display="none">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,-34)"
                                                display="none">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,45)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,45)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,125)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,125)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,205)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,205)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(0,285)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" transform="translate(0,285)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                display="none" transform="translate(0,365)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" display="none"
                                                transform="translate(0,365)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="0" stroke="rgba(156,156,156,0)"
                                                stroke-width="1" stroke-dasharray="none" stroke-linecap="square"
                                                display="none" transform="translate(0,445)">
                                                <path d=" M0,0  L-5,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#e1e1e1" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                                stroke-linecap="square" stroke-width="1" display="none"
                                                transform="translate(0,445)">
                                                <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                            </g>
                                          </g>
                                          <g>
                                            <g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(69,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(209,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden"
                                                transform="translate(139,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(347,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden"
                                                transform="translate(278,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(486,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden"
                                                transform="translate(417,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square"
                                                transform="translate(625,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden"
                                                transform="translate(556,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g fill-opacity="0" stroke-opacity="1" stroke="#9c9c9c" stroke-width="1"
                                                stroke-dasharray="none" stroke-linecap="square" display="none"
                                                transform="translate(765,285)">
                                                <path d=" M0,0  L0,5 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="1" fill="none" visibility="hidden"
                                                transform="translate(695,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                            </g>
                                          </g>
                                          <g>
                                            <g>
                                              <g role="group" stroke-opacity="1" fill-opacity="1"
                                                aria-label="population" stroke="#67b7dc" style="cursor: pointer;"
                                                id="id-2092">
                                                <g>
                                                  <g clip-path="url(&quot;#id-2095&quot;)">
                                                    <g>
                                                      <g>
                                                        <g>
                                                          <g stroke-opacity="1" role="figure" focusable="true"
                                                            tabindex="0" fill="rgba(121,47,135,0.7)" fill-opacity="1"
                                                            stroke="rgba(121,47,135,0.7)"
                                                            transform="translate(25.02,270.262)" stroke-dasharray=""
                                                            stroke-linecap="round" stroke-width="1" id="id-3610">
                                                            <g>
                                                              <g>
                                                                <path
                                                                  d="M0,0 L88.96,0 a0,0 0 0 1 0,0 L88.96,7.91 a0,0 0 0 1 -0,0 L0,7.91 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                                </path>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="14.738" y2="7.9103492810897365" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="-270.262" y2="0.0003391911208154852"
                                                                  x2="0" transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                            </g>
                                                          </g>
                                                          <g stroke-opacity="1" role="figure" focusable="true"
                                                            tabindex="0" fill="rgba(121,47,135,0.7)" fill-opacity="1"
                                                            stroke="rgba(121,47,135,0.7)"
                                                            transform="translate(164.02,271.548)" stroke-dasharray=""
                                                            stroke-linecap="round" stroke-width="1" id="id-3619">
                                                            <g>
                                                              <g>
                                                                <path
                                                                  d="M0,0 L88.96,0 a0,0 0 0 1 0,0 L88.96,7.708 a0,0 0 0 1 -0,0 L0,7.708 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                                </path>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="13.436024215925329"
                                                                  y2="7.708705625157677" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="-116.76661599260069"
                                                                  y2="0.00038980913143404905" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                            </g>
                                                          </g>
                                                          <g stroke-opacity="1" role="figure" focusable="true"
                                                            tabindex="0" fill="rgba(121,47,135,0.7)" fill-opacity="1"
                                                            stroke="rgba(121,47,135,0.7)"
                                                            transform="translate(303.02,279.081)" stroke-dasharray=""
                                                            stroke-linecap="round" stroke-width="1">
                                                            <g>
                                                              <g>
                                                                <path
                                                                  d="M0,0 L88.96,0 a0,0 0 0 1 0,0 L88.96,2.572 a0,0 0 0 1 -0,0 L0,2.572 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                                </path>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="3.2190924913814456"
                                                                  y2="2.5720732363574825" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="-2.843717564954204"
                                                                  y2="-0.000027999663700484234" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                            </g>
                                                          </g>
                                                          <g stroke-opacity="1" role="figure" focusable="true"
                                                            tabindex="0" fill="rgba(121,47,135,0.7)" fill-opacity="1"
                                                            stroke="rgba(121,47,135,0.7)"
                                                            transform="translate(442.02,273.082)" stroke-dasharray=""
                                                            stroke-linecap="round" stroke-width="1">
                                                            <g>
                                                              <g>
                                                                <path
                                                                  d="M0,0 L88.96,0 a0,0 0 0 1 0,0 L88.96,6.205 a0,0 0 0 1 -0,0 L0,6.205 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                                </path>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="11.878060539813362"
                                                                  y2="6.204660220297626" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="-54.165830824854936"
                                                                  y2="0.00006508029935048398" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                            </g>
                                                          </g>
                                                          <g stroke-opacity="1" role="figure" focusable="true"
                                                            tabindex="0" fill="rgba(121,47,135,0.7)" fill-opacity="1"
                                                            stroke="rgba(121,47,135,0.7)"
                                                            transform="translate(581.02,272.02)" stroke-dasharray=""
                                                            stroke-linecap="round" stroke-width="1">
                                                            <g>
                                                              <g>
                                                                <path
                                                                  d="M0,0 L88.96,0 a0,0 0 0 1 0,0 L88.96,6.786 a0,0 0 0 1 -0,0 L0,6.786 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                                </path>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="12.940060539813373"
                                                                  y2="6.785389725048333" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                              <g fill="none" transform="translate(44,0)">
                                                                <line x1="0" y1="-89.82417052047421"
                                                                  y2="-0.00032456066588792964" x2="0"
                                                                  transform="translate(-0.5,-0.5)"></line>
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                  <g></g>
                                                </g>
                                              </g>
                                              <g role="group" stroke-opacity="1" fill-opacity="0"
                                                stroke="rgba(121,47,135,0.7)" aria-label="Series" stroke-dasharray=""
                                                stroke-linecap="round" stroke-width="2">
                                                <g>
                                                  <g clip-path="url(&quot;#id-2118&quot;)">
                                                    <g>
                                                      <g>
                                                        <g>
                                                          <g role="figure" fill="#6794dc" fill-opacity="0"
                                                            stroke="rgba(121,47,135,0.7)" stroke-opacity="1"
                                                            style="pointer-events: none;" stroke-width="2"
                                                            stroke-linecap="round" stroke-dasharray="">
                                                            <g>
                                                              <g stroke-opacity="0">
                                                                <path></path>
                                                              </g>
                                                              <g fill="none" fill-opacity="0">
                                                                <path
                                                                  d=" M27.8,0  L111.2,0  M166.8,154.7814  L250.2,154.7814  M305.8,276.2373  L389.2,276.2373  M444.8,218.9162  L528.2,218.9162  M583.8,182.1958  L667.2,182.1958 ">
                                                                </path>
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                  <g></g>
                                                </g>
                                              </g>
                                              <g role="group" stroke-opacity="1" fill-opacity="0"
                                                stroke="rgba(121,47,135,0.7)" aria-label="Series" stroke-dasharray=""
                                                stroke-linecap="round" stroke-width="2">
                                                <g>
                                                  <g clip-path="url(&quot;#id-2136&quot;)">
                                                    <g>
                                                      <g>
                                                        <g>
                                                          <g role="figure" fill="#6771dc" fill-opacity="0"
                                                            stroke="rgba(121,47,135,0.7)" stroke-opacity="1"
                                                            style="pointer-events: none;" stroke-width="2"
                                                            stroke-linecap="round" stroke-dasharray="">
                                                            <g>
                                                              <g stroke-opacity="0">
                                                                <path></path>
                                                              </g>
                                                              <g fill="none" fill-opacity="0">
                                                                <path
                                                                  d=" M27.8,275.0631  L111.2,275.0631  M166.8,276.0456  L250.2,276.0456  M305.8,279.1688  L389.2,279.1688  M444.8,276.7685  L528.2,276.7685  M583.8,275.9457  L667.2,275.9457 ">
                                                                </path>
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                  <g></g>
                                                </g>
                                              </g>
                                              <g role="group" stroke-opacity="1" fill-opacity="0"
                                                stroke="rgba(121,47,135,0.7)" aria-label="Series" stroke-dasharray=""
                                                stroke-linecap="round" stroke-width="2">
                                                <g>
                                                  <g clip-path="url(&quot;#id-2154&quot;)">
                                                    <g>
                                                      <g>
                                                        <g>
                                                          <g role="figure" fill="#8067dc" fill-opacity="0"
                                                            stroke="rgba(121,47,135,0.7)" stroke-opacity="1"
                                                            style="pointer-events: none;" stroke-width="2"
                                                            stroke-linecap="round" stroke-dasharray="">
                                                            <g>
                                                              <g stroke-opacity="0">
                                                                <path></path>
                                                              </g>
                                                              <g fill="none" fill-opacity="0">
                                                                <path
                                                                  d=" M27.8,285  L111.2,285  M166.8,284.984  L250.2,284.984  M305.8,282.3001  L389.2,282.3001  M444.8,284.9601  L528.2,284.9601  M583.8,284.9601  L667.2,284.9601 ">
                                                                </path>
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                  <g></g>
                                                </g>
                                              </g>
                                              <g role="group" stroke-opacity="0" fill-opacity="0" stroke="#a367dc"
                                                aria-label="Series">
                                                <g>
                                                  <g clip-path="url(&quot;#id-2172&quot;)">
                                                    <g>
                                                      <g>
                                                        <g>
                                                          <g fill="#a367dc" fill-opacity="0" stroke="#a367dc"
                                                            stroke-opacity="0" style="pointer-events: none;">
                                                            <g>
                                                              <g stroke-opacity="0">
                                                                <path></path>
                                                              </g>
                                                              <g fill="none" fill-opacity="0">
                                                                <path></path>
                                                              </g>
                                                            </g>
                                                          </g>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </g>
                                                  <g></g>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                          <g clip-path="url(&quot;#id-1882&quot;)">
                                            <g>
                                              <g fill="#67b7dc" stroke="#67b7dc">
                                                <g></g>
                                              </g>
                                              <g fill="#6794dc" stroke="rgba(121,47,135,0.7)">
                                                <g></g>
                                              </g>
                                              <g fill="#6771dc" stroke="rgba(121,47,135,0.7)">
                                                <g></g>
                                              </g>
                                              <g fill="#8067dc" stroke="rgba(121,47,135,0.7)">
                                                <g></g>
                                              </g>
                                              <g fill="#a367dc" stroke="#a367dc">
                                                <g></g>
                                              </g>
                                            </g>
                                          </g>
                                          <g>
                                            <g>
                                              <g>
                                                <g></g>
                                              </g>
                                              <g>
                                                <g></g>
                                              </g>
                                            </g>
                                          </g>
                                          <g>
                                            <g></g>
                                          </g>
                                          <g>
                                            <g></g>
                                          </g>
                                          <g opacity="1" clip-path="url(&quot;#id-2242&quot;)"
                                            style="touch-action: none; user-select: none; -webkit-user-drag: none;">
                                            <g>
                                              <g fill-opacity="0.2" fill="#000000" visibility="hidden"
                                                style="pointer-events: none;">
                                                <path></path>
                                              </g>
                                              <g stroke="#000000" fill="none" stroke-dasharray="3,3"
                                                stroke-opacity="0.4" display="none" style="pointer-events: none;"
                                                transform="translate(0,0)">
                                                <path d=" M0,0  L0,285 "></path>
                                              </g>
                                              <g stroke="#000000" fill="none" stroke-dasharray="3,3"
                                                stroke-opacity="0.4" display="none" style="pointer-events: none;"
                                                transform="translate(0,19.8)">
                                                <path d=" M0,0  L695,0 "></path>
                                              </g>
                                            </g>
                                          </g>
                                          <g role="button" focusable="true" tabindex="0" opacity="0" visibility="hidden"
                                            aria-hidden="true" transform="translate(655,-3)"
                                            aria-labelledby="id-413-title">
                                            <g fill="#6794dc" stroke="#ffffff" fill-opacity="1" stroke-opacity="0"
                                              transform="translate(0,8)">
                                              <path
                                                d="M17,0 L18,0 a17,17 0 0 1 17,17 L35,17 a17,17 0 0 1 -17,17 L17,34 a17,17 0 0 1 -17,-17 L0,17 a17,17 0 0 1 17,-17 Z">
                                              </path>
                                            </g>
                                            <g transform="translate(9,9)">
                                              <g stroke="#ffffff" style="pointer-events: none;"
                                                transform="translate(0,8)">
                                                <path d=" M0,0  L11,0 " transform="translate(2.5,7.5)"></path>
                                              </g>
                                              <g fill="#000000" style="pointer-events: none;"
                                                transform="translate(17,8)">
                                                <g display="none"></g>
                                              </g>
                                            </g>
                                            <title id="id-413-title">Zoom Out</title>
                                          </g>
                                        </g>
                                      </g>
                                      <g>
                                        <g>
                                          <g aria-hidden="true">
                                            <g>
                                              <g fill="#444444" transform="translate(7,142.5) rotate(270)"
                                                font-family="Segoe UI" font-weight="normal" font-size="12"
                                                text-decoration="none">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-26,-7)">
                                                  <rect width="52" height="14"></rect>
                                                </g>
                                                <g transform="translate(-26,-7)" style="user-select: none;"><text x="0"
                                                    y="14" overflow="hidden" dy="-3.78">
                                                    <tspan style="font-style:normal">population</tspan>
                                                  </text></g>
                                              </g>
                                              <g stroke="#000000" stroke-opacity="0.15" fill="none" display="none"
                                                transform="translate(62,285)" opacity="0" visibility="hidden"
                                                aria-hidden="true">
                                                <path transform="translate(-0.5,-0.5)" d=" M0,0  L695,0 "></path>
                                              </g>
                                              <g transform="translate(14,0)">
                                                <g>
                                                  <g fill="#444444" aria-label="L" fill-opacity="0" opacity="0"
                                                    stroke-opacity="0" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none" style="pointer-events: none;"
                                                    transform="translate(48,142.5)">
                                                    <g transform="translate(-10,-7.5)" style="user-select: none;">
                                                      <foreignObject width="1" height="10">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p></p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none" transform="translate(48,285)"
                                                    display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-39,-15.5)">
                                                      <rect width="39" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-29,-10.5)" style="user-select: none;">
                                                      <foreignObject width="20" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">NaN</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none" transform="translate(48,285)"
                                                    display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-39,-15.5)">
                                                      <rect width="39" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-29,-10.5)" style="user-select: none;">
                                                      <foreignObject width="20" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">NaN</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none" transform="translate(48,285)"
                                                    display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-39,-15.5)">
                                                      <rect width="39" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-29,-10.5)" style="user-select: none;">
                                                      <foreignObject width="20" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">NaN</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none" transform="translate(48,285)"
                                                    display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-39,-15.5)">
                                                      <rect width="39" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-29,-10.5)" style="user-select: none;">
                                                      <foreignObject width="20" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">NaN</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,-114.371)" display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-48,-15.5)">
                                                      <rect width="48" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-38,-10.5)" style="user-select: none;">
                                                      <foreignObject width="29" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">50,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,-34.492)" display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-48,-15.5)">
                                                      <rect width="48" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-38,-10.5)" style="user-select: none;">
                                                      <foreignObject width="29" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">40,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,45.387)">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-48,-15.5)">
                                                      <rect width="48" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-38,-10.5)" style="user-select: none;">
                                                      <foreignObject width="29" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">30,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,125.266)">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-48,-15.5)">
                                                      <rect width="48" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-38,-10.5)" style="user-select: none;">
                                                      <foreignObject width="29" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">20,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,205.145)">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-48,-15.5)">
                                                      <rect width="48" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-38,-10.5)" style="user-select: none;">
                                                      <foreignObject width="29" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">10,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,285.024)">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-25,-15.5)">
                                                      <rect width="25" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-15,-10.5)" style="user-select: none;">
                                                      <foreignObject width="6" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">0</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,364.903)" display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-51,-15.5)">
                                                      <rect width="51" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-41,-10.5)" style="user-select: none;">
                                                      <foreignObject width="32" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">-10,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                  <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                    font-size="10" text-decoration="none"
                                                    transform="translate(48,444.782)" display="none">
                                                    <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                      transform="translate(-51,-15.5)">
                                                      <rect width="51" height="31"></rect>
                                                    </g>
                                                    <g transform="translate(-41,-10.5)" style="user-select: none;">
                                                      <foreignObject width="32" height="16">
                                                        <div
                                                          style="text-align: right; overflow-wrap: break-word; color: rgb(68, 68, 68); display: block;">
                                                          <p style="margin:0; font-style:normal;">-20,000</p>
                                                        </div>
                                                      </foreignObject>
                                                    </g>
                                                  </g>
                                                </g>
                                              </g>
                                              <g stroke="rgba(156,156,156,0)" stroke-opacity="0" fill="none"
                                                stroke-dasharray="none" stroke-linecap="square" stroke-width="1"
                                                style="pointer-events: none;" transform="translate(62,0)">
                                                <path d=" M0,0  L0,285 " transform="translate(-0.5,-0.5)"></path>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                      <g transform="translate(757,0)">
                                        <g>
                                          <g role="scrollbar" aria-valuemin="0" aria-valuemax="100" display="none"
                                            aria-valuenow="0" aria-valuetext="From 3 to 35682">
                                            <g fill="#f3f3f3" fill-opacity="0.5">
                                              <path></path>
                                            </g>
                                            <g>
                                              <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                                aria-valuemax="100" aria-live="polite"
                                                style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: -webkit-grab;"
                                                aria-labelledby="id-2228-title" aria-valuenow="0"
                                                aria-valuetext="From 3 to 35682">
                                                <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1">
                                                  <path></path>
                                                </g>
                                                <g>
                                                  <g fill="#000000" style="pointer-events: none;">
                                                    <g></g>
                                                  </g>
                                                </g>
                                                <title id="id-2228-title">From 3 to 35682</title>
                                              </g>
                                              <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                                aria-valuemax="100"
                                                style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ns-resize;"
                                                aria-labelledby="id-2216-title" aria-valuenow="0"
                                                aria-valuetext="From 3">
                                                <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                                  transform="translate(-8,-8)">
                                                  <path></path>
                                                </g>
                                                <g transform="translate(0,0)">
                                                  <g stroke="#ffffff" stroke-opacity="0.7"
                                                    style="pointer-events: none;">
                                                    <path d=" M-2,-6  L-2,6  M2,-6  L2,6 "
                                                      transform="translate(3.5,-0.5)"></path>
                                                  </g>
                                                </g>
                                                <title id="id-2216-title">From 3</title>
                                              </g>
                                              <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                                aria-valuemax="100"
                                                style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ns-resize;"
                                                aria-labelledby="id-2222-title" aria-valuenow="100"
                                                aria-valuetext="To 35682">
                                                <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                                  transform="translate(-8,-8)">
                                                  <path></path>
                                                </g>
                                                <g transform="translate(0,0)">
                                                  <g stroke="#ffffff" stroke-opacity="0.7"
                                                    style="pointer-events: none;">
                                                    <path d=" M-2,-6  L-2,6  M2,-6  L2,6 "
                                                      transform="translate(3.5,-0.5)"></path>
                                                  </g>
                                                </g>
                                                <title id="id-2222-title">To 35682</title>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                  <g>
                                    <g transform="translate(62,0)">
                                      <g role="scrollbar" aria-valuemin="0" aria-valuemax="100" display="none"
                                        aria-valuenow="0" aria-valuetext="From <1H OCEAN to NEAR OCEAN">
                                        <g fill="#f3f3f3" fill-opacity="0.5">
                                          <path></path>
                                        </g>
                                        <g>
                                          <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                            aria-valuemax="100" aria-live="polite"
                                            style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: -webkit-grab;"
                                            aria-labelledby="id-2207-title" aria-valuenow="0"
                                            aria-valuetext="From <1H OCEAN to NEAR OCEAN">
                                            <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1">
                                              <path></path>
                                            </g>
                                            <g>
                                              <g fill="#000000" style="pointer-events: none;">
                                                <g></g>
                                              </g>
                                            </g>
                                            <title id="id-2207-title">From &lt;1H OCEAN to NEAR OCEAN</title>
                                          </g>
                                          <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ew-resize;"
                                            aria-labelledby="id-2195-title" aria-valuenow="0"
                                            aria-valuetext="From <1H OCEAN">
                                            <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                              transform="translate(-8,-8)">
                                              <path></path>
                                            </g>
                                            <g transform="translate(0,0)">
                                              <g stroke="#ffffff" stroke-opacity="0.7" style="pointer-events: none;">
                                                <path d=" M-2,-6  L-2,6  M2,-6  L2,6 " transform="translate(3.5,-0.5)">
                                                </path>
                                              </g>
                                            </g>
                                            <title id="id-2195-title">From &lt;1H OCEAN</title>
                                          </g>
                                          <g role="slider" focusable="true" tabindex="-1" aria-valuemin="0"
                                            aria-valuemax="100"
                                            style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ew-resize;"
                                            aria-labelledby="id-2201-title" aria-valuenow="100"
                                            aria-valuetext="To NEAR OCEAN">
                                            <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                              transform="translate(-8,-8)">
                                              <path></path>
                                            </g>
                                            <g transform="translate(0,0)">
                                              <g stroke="#ffffff" stroke-opacity="0.7" style="pointer-events: none;">
                                                <path d=" M-2,-6  L-2,6  M2,-6  L2,6 " transform="translate(3.5,-0.5)">
                                                </path>
                                              </g>
                                            </g>
                                            <title id="id-2201-title">To NEAR OCEAN</title>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                  <g transform="translate(0,285)">
                                    <g transform="translate(62,0)">
                                      <g aria-hidden="true">
                                        <g>
                                          <g stroke="#9c9c9c" stroke-opacity="1" fill="none" stroke-dasharray="none"
                                            stroke-linecap="square" stroke-width="1" style="pointer-events: none;">
                                            <path d=" M0,0  L695,0 " transform="translate(-0.5,-0.5)"></path>
                                          </g>
                                          <g>
                                            <g>
                                              <g fill="#444444" aria-label="L" fill-opacity="0" opacity="0"
                                                stroke-opacity="0" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none"
                                                style="pointer-events: none; cursor: pointer;"
                                                transform="translate(347.5,5)">
                                                <g transform="translate(-32,0)" style="user-select: none;">
                                                  <foreignObject width="65" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">NEAR OCEAN</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" style="cursor: pointer;"
                                                transform="translate(69.5,5)">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-27.5,0)">
                                                  <rect width="55" height="26"></rect>
                                                </g>
                                                <g transform="translate(-27.5,0)" style="user-select: none;">
                                                  <foreignObject width="56" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">&lt;1H OCEAN</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" style="cursor: pointer;"
                                                transform="translate(208.5,5)">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-19,0)">
                                                  <rect width="38" height="26"></rect>
                                                </g>
                                                <g transform="translate(-19,0)" style="user-select: none;">
                                                  <foreignObject width="39" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">INLAND</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" style="cursor: pointer;"
                                                transform="translate(347.5,5)">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-18.5,0)">
                                                  <rect width="37" height="26"></rect>
                                                </g>
                                                <g transform="translate(-18.5,0)" style="user-select: none;">
                                                  <foreignObject width="38" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">ISLAND</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" style="cursor: pointer;"
                                                transform="translate(486.5,5)">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-25,0)">
                                                  <rect width="50" height="26"></rect>
                                                </g>
                                                <g transform="translate(-25,0)" style="user-select: none;">
                                                  <foreignObject width="51" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">NEAR BAY</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" style="cursor: pointer;"
                                                transform="translate(625.5,5)">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                                  transform="translate(-32,0)">
                                                  <rect width="64" height="26"></rect>
                                                </g>
                                                <g transform="translate(-32,0)" style="user-select: none;">
                                                  <foreignObject width="65" height="16">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;">NEAR OCEAN</p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                              <g fill="#444444" font-family="Segoe UI" font-weight="normal"
                                                font-size="10" text-decoration="none" transform="translate(764.5,5)"
                                                style="cursor: pointer;" display="none" visibility="hidden">
                                                <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1">
                                                  <rect width="0" height="20"></rect>
                                                </g>
                                                <g transform="translate(0,0)" style="user-select: none;">
                                                  <foreignObject width="1" height="10">
                                                    <div
                                                      style="white-space: nowrap; color: rgb(68, 68, 68); display: block;">
                                                      <p style="margin:0; font-style:normal;"></p>
                                                      <p></p>
                                                      <p></p>
                                                    </div>
                                                  </foreignObject>
                                                </g>
                                              </g>
                                            </g>
                                          </g>
                                          <g stroke="#000000" stroke-opacity="0.15" fill="none" display="none"
                                            transform="translate(695,-285)" opacity="0" visibility="hidden"
                                            aria-hidden="true">
                                            <path transform="translate(-0.5,-0.5)" d=" M0,0  L0,285 "></path>
                                          </g>
                                          <g fill="#444444" transform="translate(347.5,33)" font-family="Segoe UI"
                                            font-weight="normal" font-size="12" text-decoration="none">
                                            <g fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0)" stroke-width="1"
                                              transform="translate(-41,-7)">
                                              <rect width="82" height="14"></rect>
                                            </g>
                                            <g transform="translate(-41,-7)" style="user-select: none;"><text x="0"
                                                y="14" overflow="hidden" dy="-3.78">
                                                <tspan style="font-style:normal">ocean_proximity</tspan>
                                              </text></g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                              <g role="group" visibility="hidden" aria-label="Legend" transform="translate(767,149.5)">
                                <g>
                                  <g role="scrollbar" aria-valuemin="0" aria-valuemax="100" visibility="hidden"
                                    aria-valuenow="0" aria-valuetext="From 100% to 0%" transform="translate(-17,0)"
                                    aria-labelledby="id-1948-title" aria-orientation="vertical" aria-controls="id-399">
                                    <g fill="#f3f3f3" fill-opacity="0.5">
                                      <path
                                        d="M6,0 L6,0 a6,6 0 0 1 6,6 L12,293 a6,6 0 0 1 -6,6 L6,299 a6,6 0 0 1 -6,-6 L0,6 a6,6 0 0 1 6,-6 Z">
                                      </path>
                                    </g>
                                    <g>
                                      <g role="slider" focusable="true" tabindex="0" aria-valuemin="0"
                                        aria-valuemax="100" aria-live="polite"
                                        style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: -webkit-grab;"
                                        aria-labelledby="id-1962-title" aria-valuenow="0"
                                        aria-valuetext="From 100% to 0%" transform="translate(6,0)"
                                        aria-describedby="id-1962-description">
                                        <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                          transform="translate(-6,0)">
                                          <path
                                            d="M6,0 L6,0 a6,6 0 0 1 6,6 L12,293 a6,6 0 0 1 -6,6 L6,299 a6,6 0 0 1 -6,-6 L0,6 a6,6 0 0 1 6,-6 Z">
                                          </path>
                                        </g>
                                        <g transform="translate(-6,0)">
                                          <g fill="#000000" style="pointer-events: none;"
                                            transform="translate(6,149.5)">
                                            <g display="none"></g>
                                          </g>
                                        </g>
                                        <title id="id-1962-title">From 100% to 0%</title>
                                        <desc id="id-1962-description">Use up and down arrows to move selection</desc>
                                      </g>
                                      <g role="slider" focusable="true" tabindex="0" aria-valuemin="0"
                                        aria-valuemax="100"
                                        style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ns-resize;"
                                        display="none" aria-labelledby="id-1950-title" aria-valuenow="0"
                                        aria-valuetext="To 100%" transform="translate(6,299)"
                                        aria-describedby="id-1950-description">
                                        <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                          transform="translate(-8,-8)">
                                          <path
                                            d="M8,0 L8,0 a8,8 0 0 1 8,8 L16,8 a8,8 0 0 1 -8,8 L8,16 a8,8 0 0 1 -8,-8 L0,8 a8,8 0 0 1 8,-8 Z">
                                          </path>
                                        </g>
                                        <g transform="translate(0,0)">
                                          <g stroke="#ffffff" stroke-opacity="0.7" style="pointer-events: none;"
                                            transform="translate(0,0) rotate(-90)">
                                            <path d=" M-2,-6  L-2,6  M2,-6  L2,6 " transform="translate(3.5,-0.5)">
                                            </path>
                                          </g>
                                        </g>
                                        <title id="id-1950-title">To 100%</title>
                                        <desc id="id-1950-description">Use up and down arrows to move upper selection
                                        </desc>
                                      </g>
                                      <g role="slider" focusable="true" tabindex="0" aria-valuemin="0"
                                        aria-valuemax="100"
                                        style="touch-action: none; user-select: none; -webkit-user-drag: none; cursor: ns-resize;"
                                        display="none" aria-labelledby="id-1956-title" aria-valuenow="100"
                                        aria-valuetext="From 0%" transform="translate(6,0)"
                                        aria-describedby="id-1956-description">
                                        <g fill="#d9d9d9" stroke="#ffffff" fill-opacity="1" stroke-opacity="1"
                                          transform="translate(-8,-8)">
                                          <path
                                            d="M8,0 L8,0 a8,8 0 0 1 8,8 L16,8 a8,8 0 0 1 -8,8 L8,16 a8,8 0 0 1 -8,-8 L0,8 a8,8 0 0 1 8,-8 Z">
                                          </path>
                                        </g>
                                        <g transform="translate(0,0)">
                                          <g stroke="#ffffff" stroke-opacity="0.7" style="pointer-events: none;"
                                            transform="translate(0,0) rotate(-90)">
                                            <path d=" M-2,-6  L-2,6  M2,-6  L2,6 " transform="translate(3.5,-0.5)">
                                            </path>
                                          </g>
                                        </g>
                                        <title id="id-1956-title">From 0%</title>
                                        <desc id="id-1956-description">Use up and down arrows to move lower selection
                                        </desc>
                                      </g>
                                    </g>
                                    <title id="id-1948-title">Use TAB select grip buttons or up and down arrows to
                                      change selection
                                    </title>
                                  </g>
                                  <g fill="#000000">
                                    <g display="none"></g>
                                  </g>
                                  <g focusable="true" tabindex="0" role="switch" aria-controls="id-2092"
                                    aria-labelledby="id-2092" aria-checked="true" style="cursor: pointer;"
                                    clip-path="url(&quot;#id-3608&quot;)" transform="translate(10,0)">
                                    <g fill="#ffffff" fill-opacity="0">
                                      <rect width="0" height="41"></rect>
                                    </g>
                                    <g transform="translate(0,8)">
                                      <g fill="#67b7dc" fill-opacity="1" stroke="#67b7dc" stroke-opacity="1"
                                        style="pointer-events: none;" transform="translate(0,5.5)">
                                        <g fill="#ffffff" fill-opacity="0" stroke-opacity="0">
                                          <rect width="14" height="14"></rect>
                                        </g>
                                        <g>
                                          <g stroke-opacity="1" role="figure" focusable="true" tabindex="0">
                                            <g>
                                              <g transform="translate(0,4.667)">
                                                <path
                                                  d="M0,0 L14,0 a0,0 0 0 1 0,0 L14,4.667 a0,0 0 0 1 -0,0 L0,4.667 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0 Z">
                                                </path>
                                              </g>
                                              <g fill="none" transform="translate(7,0)">
                                                <line x1="0" y1="0" y2="4.666666666666667" x2="0"></line>
                                              </g>
                                              <g fill="none" transform="translate(7,9.333)">
                                                <line x1="0" y1="0" y2="4.666666666666667" x2="0"></line>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                      <g fill="#000000" transform="translate(19,0)">
                                        <g fill="#ffffff">
                                          <rect width="70" height="25"></rect>
                                        </g>
                                        <g style="user-select: none;"><text x="0" y="24.5" overflow="hidden"
                                            dy="-6.615">
                                            <tspan>population</tspan>
                                          </text></g>
                                      </g>
                                      <g fill="#000000" display="none">
                                        <g fill="#ffffff">
                                          <rect width="0" height="14"></rect>
                                        </g>
                                        <g style="user-select: none;">
                                          <foreignObject width="1" height="14">
                                            <div
                                              style="overflow-wrap: break-word; color: rgb(0, 0, 0); display: block;">
                                              <p style="margin:0; font-style:normal;"></p>
                                              <p></p>
                                              <p></p>
                                            </div>
                                          </foreignObject>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g display="none">
                            <g transform="translate(0,5)">
                              <g fill="#000000" display="none">
                                <g display="none"></g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                      <g>
                        <g>
                          <g role="tooltip" visibility="hidden" opacity="0">
                            <g fill="#ffffff" fill-opacity="0.9" stroke-width="1" stroke-opacity="1" stroke="#ffffff"
                              filter="url(&quot;#filter-id-427&quot;)" style="pointer-events: none;"
                              transform="translate(0,6)">
                              <path
                                d="M3,0 L3,0 L0,-6 L13,0 L21,0 a3,3 0 0 1 3,3 L24,8 a3,3 0 0 1 -3,3 L3,11 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(12,6)">
                                <g transform="translate(0,7)" display="none"></g>
                              </g>
                            </g>
                          </g>
                          <g visibility="hidden" display="none" style="pointer-events: none;">
                            <g fill="#ffffff" opacity="1">
                              <rect width="771" height="386"></rect>
                            </g>
                            <g>
                              <g>
                                <g>
                                  <g stroke-opacity="1" fill="#f3f3f3" fill-opacity="0.8">
                                    <g>
                                      <g>
                                        <path
                                          d=" M53,0  a53,53,0,0,1,-106,0 a53,53,0,0,1,106,0 M42,0  a42,42,0,0,0,-84,0 a42,42,0,0,0,84,0 L42,0 ">
                                        </path>
                                      </g>
                                    </g>
                                  </g>
                                  <g stroke-opacity="1" fill="#000000" fill-opacity="0.2">
                                    <g>
                                      <g>
                                        <path d=""></path>
                                      </g>
                                    </g>
                                  </g>
                                  <g fill="#000000" fill-opacity="0.4">
                                    <g display="none"></g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g visibility="hidden">
                            <g fill="rgba(255,255,255,0.9019607843137255)" transform="translate(0,0)">
                              <rect width="771" height="386"></rect>
                            </g>
                            <g>
                              <g fill="#000000" font-size="20" transform="translate(385.5,233)">
                                <g display="none"></g>
                              </g>
                              <g shape-rendering="auto" stroke="#007ac2" stroke-width="2"
                                transform="translate(369.508,176.92)">
                                <path
                                  d="M2.2 16A13.81 13.81 0 0 1 14 2.362v1.01a12.8 12.8 0 1 0 4 0v-1.01A13.792 13.792 0 1 1 2.2 16z">
                                </path>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" opacity="0" transform="translate(138.5,339)" visibility="hidden"
                            aria-hidden="true">
                            <g fill="#000000" fill-opacity="1" stroke-width="1" stroke-opacity="1" stroke="#000000"
                              style="pointer-events: none;" transform="translate(-51,5)">
                              <path
                                d="M0,0 L46,0 L51,-5 L56,0 L102,0 a0,0 0 0 1 0,0 L102,26 a0,0 0 0 1 -0,0 L0,26 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(0,5)">
                                <g transform="translate(-41,5)" style="user-select: none;">
                                  <foreignObject width="83" height="16">
                                    <div style="white-space: nowrap; color: rgb(255, 255, 255); display: block;">&lt;1H
                                      OCEAN</div>
                                  </foreignObject>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" opacity="0" transform="translate(69,321.4)" visibility="hidden"
                            aria-hidden="true">
                            <g fill="#000000" fill-opacity="1" stroke-width="1" stroke-opacity="1" stroke="#000000"
                              style="pointer-events: none;" transform="translate(-61,-13)">
                              <path
                                d="M0,0 L56,0 a0,0 0 0 1 0,0 L56,0 L56,8 L61,13 L56,18 L56,26 a0,0 0 0 1 -0,0 L0,26 a0,0 0 0 1 -0,-0 L0,0 a0,0 0 0 1 0,-0">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(-33,-13)">
                                <g transform="translate(-18,5)" style="user-select: none;">
                                  <foreignObject width="37" height="16">
                                    <div style="white-space: nowrap; color: rgb(255, 255, 255); display: block;">2,206
                                    </div>
                                  </foreignObject>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" opacity="0" aria-describedby="id-3619" transform="translate(277.5,329.402)"
                            aria-hidden="true" visibility="hidden">
                            <g fill="rgba(121,47,135,0.7)" fill-opacity="0.9" stroke-width="1" stroke-opacity="1"
                              stroke="#ffffff" filter="url(&quot;#filter-id-2100&quot;)" style="pointer-events: none;"
                              transform="translate(-96,-216)">
                              <path
                                d="M3,0 L189,0 a3,3 0 0 1 3,3 L192,207 a3,3 0 0 1 -3,3 L189,210 L101,210 L96,216 L91,210 L3,210 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(0,-216)">
                                <g transform="translate(-84,7)" style="user-select: none;">
                                  <foreignObject width="169" height="199">
                                    <div style="overflow-wrap: break-word; color: rgb(255, 255, 255); display: block;">
                                      <b>Field‎:</b> population<br><b>ocean_proximity‎:</b> INLAND<table>
                                        <tbody>
                                          <tr>
                                            <td colspan="2">
                                              <hr>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td><b>Minimum‎:</b> 5</td>
                                          </tr>
                                          <tr>
                                            <td><b>First quartile‎:</b> 722</td>
                                          </tr>
                                          <tr>
                                            <td><b>Median‎:</b> 1,124</td>
                                          </tr>
                                          <tr>
                                            <td><b>Third quartile‎:</b> 1,687</td>
                                          </tr>
                                          <tr>
                                            <td><b>Maximum‎:</b> 16,305</td>
                                          </tr>
                                          <tr>
                                            <td><b>IQR‎:</b> 965</td>
                                          </tr>
                                          <tr>
                                            <td><b>Mean‎:</b> 1,391.046</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </foreignObject>
                                </g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" visibility="hidden" opacity="0">
                            <g fill="#ffffff" fill-opacity="0.9" stroke-width="1" stroke-opacity="1" stroke="#ffffff"
                              filter="url(&quot;#filter-id-2123&quot;)" style="pointer-events: none;"
                              transform="translate(0,6)">
                              <path
                                d="M3,0 L3,0 L0,-6 L13,0 L21,0 a3,3 0 0 1 3,3 L24,8 a3,3 0 0 1 -3,3 L3,11 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(12,6)">
                                <g transform="translate(0,7)" display="none"></g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" visibility="hidden" opacity="0">
                            <g fill="#ffffff" fill-opacity="0.9" stroke-width="1" stroke-opacity="1" stroke="#ffffff"
                              filter="url(&quot;#filter-id-2141&quot;)" style="pointer-events: none;"
                              transform="translate(0,6)">
                              <path
                                d="M3,0 L3,0 L0,-6 L13,0 L21,0 a3,3 0 0 1 3,3 L24,8 a3,3 0 0 1 -3,3 L3,11 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(12,6)">
                                <g transform="translate(0,7)" display="none"></g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" visibility="hidden" opacity="0">
                            <g fill="#ffffff" fill-opacity="0.9" stroke-width="1" stroke-opacity="1" stroke="#ffffff"
                              filter="url(&quot;#filter-id-2159&quot;)" style="pointer-events: none;"
                              transform="translate(0,6)">
                              <path
                                d="M3,0 L3,0 L0,-6 L13,0 L21,0 a3,3 0 0 1 3,3 L24,8 a3,3 0 0 1 -3,3 L3,11 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(12,6)">
                                <g transform="translate(0,7)" display="none"></g>
                              </g>
                            </g>
                          </g>
                          <g role="tooltip" visibility="hidden" opacity="0">
                            <g fill="#ffffff" fill-opacity="0.9" stroke-width="1" stroke-opacity="1" stroke="#ffffff"
                              filter="url(&quot;#filter-id-2177&quot;)" style="pointer-events: none;"
                              transform="translate(0,6)">
                              <path
                                d="M3,0 L3,0 L0,-6 L13,0 L21,0 a3,3 0 0 1 3,3 L24,8 a3,3 0 0 1 -3,3 L3,11 a3,3 0 0 1 -3,-3 L0,3 a3,3 0 0 1 3,-3">
                              </path>
                            </g>
                            <g>
                              <g fill="#ffffff" style="pointer-events: none;" transform="translate(12,6)">
                                <g transform="translate(0,7)" display="none"></g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg></div>
            </div>
          </div>

        </calcite-panel>
      </calcite-shell-panel>
    </div>
    <calcite-shell-panel display-mode="float-all" slot="panel-start" position="start">
      <calcite-action-bar overflow-actions-disabled slot="action-bar">
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
        <calcite-action-group slot="actions-end">
          <calcite-action text="Feedback" icon="speech-bubble-plus"></calcite-action>
          <calcite-action text="What's next" icon="mega-phone"></calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-panel heading="Panel">
        <p>
          Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
          facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
          hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
          commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
          etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
          inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
          enim.
        </p>
        <p>
          Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
          blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
          fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
          curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
          Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
          pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
        </p>
        <p>
          Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis vivamus
          primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis lacinia
          consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id imperdiet magna
          imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin adipiscing lacinia.
          Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa facilisis nibh congue at
          torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
        </p>
        <p>
          Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
          hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras consectetur
          et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu sed gravida.
          Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
        </p>
        <p>
          Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
          pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
          risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
          consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl nunc
          porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
        </p>
        <p>
          Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
          ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel quisque.
          Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus sollicitudin
          integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem litora, feugiat
          velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus suscipit sed risus.
          Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet lacinia nullam
          ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
        </p>
        <p>
          Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
          ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum eu
          lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad suspendisse
          maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam himenaeos sem
          cras velit inceptos nisl metus? Dignissim.
        </p>
        <p>
          Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
          aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
          condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
          varius? Elementum imperdiet suscipit nulla! Primis a leo.
        </p>
        <p>
          Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
          maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
          hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
          sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
          semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
        </p>
        <p>
          Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
          Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
          posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
          risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
          pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
          sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
          curabitur!
        </p>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-shell-panel display-mode="float-all" slot="panel-end" position="end">
      <calcite-action-bar slot="action-bar">
        <calcite-tooltip slot="expand-tooltip" label="tooltip" pointer-disabled>Add layers</calcite-tooltip>
        <calcite-action-group>
          <calcite-action text="Layer properties" icon="sliders-horizontal"> </calcite-action>
          <calcite-action text="Styles" icon="shapes"> </calcite-action>
          <calcite-action text="Filter" icon="layer-filter"> </calcite-action>
          <calcite-action text="Configure pop-ups" icon="popup" active> </calcite-action>
          <calcite-action text-enabled text="Configure attributes" icon="feature-details" slot="menu-actions">
          </calcite-action>
          <calcite-action text-enabled text="Labels" icon="label" slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled text="Table" icon="table" slot="menu-actions"> </calcite-action>
        </calcite-action-group>
        <calcite-action-group>
          <calcite-action icon="search" text="Search"></calcite-action>
          <calcite-action icon="measure" text="Measure"></calcite-action>
          <calcite-action text-enabled icon="road-sign" text="Directions" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="point" text="Location" slot="menu-actions"></calcite-action>
          <calcite-action text-enabled icon="pencil-square" text="Edit" disabled slot="menu-actions"> </calcite-action>
          <calcite-action text-enabled icon="clock" text="Time" disabled slot="menu-actions"></calcite-action>
        </calcite-action-group>
        <calcite-action-group slot="actions-end">
          <calcite-action text="Tips" id="tip-manager-button">
            <calcite-icon icon="lightbulb" scale="s"></calcite-icon>
          </calcite-action>
        </calcite-action-group>
      </calcite-action-bar>
      <calcite-flow>
        <calcite-flow-item heading="Flow 01"> </calcite-flow-item>
        <calcite-flow-item heading="Flow 02">
          <p>
            Vehicula per vehicula leo gravida quis tincidunt penatibus nisl. Faucibus egestas eget convallis metus
            facilisis congue consequat dui mollis lorem lacinia. At per venenatis nostra magna purus sed mus nunc
            hendrerit consequat ante mauris. Ipsum, libero cum dolor pellentesque cubilia semper hac netus fermentum
            commodo. Congue accumsan magnis vehicula sapien nam egestas per lacus sapien ut elementum. Sit inceptos quam
            etiam mus turpis, curabitur nostra est. Laoreet augue porta consequat, sit class vestibulum ornare pharetra
            inceptos scelerisque. Morbi leo libero; tincidunt gravida senectus viverra! Aptent morbi facilisi habitasse
            enim.
          </p>
          <p>
            Rutrum natoque porta eros enim mollis ad primis vulputate arcu. Dolor posuere vitae porttitor habitasse
            blandit fermentum sem? Platea elit erat viverra laoreet! A adipiscing ligula augue fames luctus sit gravida
            fames. Sagittis sociis purus, sit torquent ultricies primis interdum! Dapibus iaculis ultrices ac arcu, arcu
            curae; volutpat cubilia hac. Torquent sapien netus per sem a malesuada donec. Pellentesque diam, est cras.
            Bibendum litora ante condimentum ridiculus felis condimentum dolor sapien felis. Eleifend hac elit mollis
            pellentesque. Maecenas natoque nibh mauris penatibus donec vel nostra sociis nostra placerat. Lectus!
          </p>
          <p>
            Pulvinar purus neque, nascetur cursus fusce convallis at! Sapien sed sapien rhoncus quis. Vitae primis
            vivamus primis facilisis quam porttitor nibh vel felis tristique? Nisi varius, torquent odio ligula. Turpis
            lacinia consequat augue, molestie cubilia. Gravida etiam ac class potenti sit fusce mus cum. Rutrum id
            imperdiet magna imperdiet felis luctus condimentum netus elementum fermentum. Cursus proin habitant proin
            adipiscing lacinia. Urna suscipit cursus gravida mus nisl quisque suspendisse sodales posuere. Massa
            facilisis nibh congue at torquent viverra mollis erat venenatis ac. Convallis placerat, nibh.
          </p>
          <p>
            Pharetra accumsan praesent dictumst velit. Maecenas pretium, consequat varius habitant tempor volutpat. Ut
            hendrerit nostra odio primis potenti, blandit cras. Cras ullamcorper etiam pretium dignissim cras
            consectetur et enim cras. Vivamus malesuada sociis primis quam lacinia nisl porta ligula pulvinar sociosqu
            sed gravida. Convallis quisque, sit parturient at nam sapien eros erat. Malesuada.
          </p>
          <p>
            Integer quis vestibulum aptent hac varius nisi cubilia tincidunt. Sapien faucibus integer tristique
            pellentesque rhoncus nostra gravida cum potenti. Lacinia, elementum rhoncus gravida. Dignissim elit congue
            risus bibendum hendrerit cras montes nam nullam cum quam rhoncus. Ante scelerisque risus bibendum congue
            consectetur vulputate, nibh ligula non ultricies nullam et. Consectetur conubia netus aliquet tempor nisl
            nunc porttitor, dapibus purus semper. Aenean metus interdum nisl eget. Ipsum nulla.
          </p>
          <p>
            Ultrices cursus facilisi imperdiet. Ullamcorper in lacinia massa fringilla aliquam hac litora tempor, mi
            ligula nullam! Suspendisse duis, duis magna amet. Curabitur eleifend, dapibus massa magna viverra vel
            quisque. Litora porta, arcu volutpat mauris est. Sociosqu lacinia mus iaculis, vitae ligula iaculis. Metus
            sollicitudin integer vivamus sapien maecenas nulla. Blandit sem pellentesque congue vulputate montes sem
            litora, feugiat velit habitasse litora felis. Felis duis fringilla dictum elementum magna felis leo mus
            suscipit sed risus. Pretium non nascetur feugiat volutpat eleifend! Torquent est iaculis inceptos laoreet
            lacinia nullam ullamcorper egestas fermentum eros imperdiet consectetur? Faucibus fringilla?
          </p>
          <p>
            Inceptos, a a justo aliquam tincidunt risus dictum nec hac. Neque, a orci pharetra ridiculus donec cursus
            ligula consequat tempor. Eu aptent morbi mattis curabitur aliquam commodo curae;. Massa sem aenean interdum
            eu lorem nostra volutpat lectus adipiscing aliquet. Congue maecenas, montes ridiculus dis tellus ad
            suspendisse maecenas eu. Adipiscing mattis eros libero maecenas odio fames curabitur blandit? Tempus aliquam
            himenaeos sem cras velit inceptos nisl metus? Dignissim.
          </p>
          <p>
            Magnis et bibendum facilisis viverra phasellus mollis eget phasellus ultricies platea. Pellentesque lectus
            aliquet blandit? Phasellus orci elit at elit fames tellus egestas quam laoreet class. Mi nostra laoreet
            condimentum at montes porta porttitor et nisi! Aptent eget nostra odio elementum gravida inceptos auctor est
            varius? Elementum imperdiet suscipit nulla! Primis a leo.
          </p>
          <p>
            Suscipit fringilla dui mauris diam tempus porta. Ultricies torquent at dui a? Platea, interdum lacus gravida
            maecenas sodales? Taciti massa leo scelerisque. Vitae nibh pretium habitasse rutrum mattis dui sapien
            hendrerit metus ante. Commodo netus dignissim mollis fermentum pretium dolor et varius habitant dolor
            sollicitudin proin. Nascetur vitae quam est vulputate nec, netus pulvinar. Class fames nam quis hendrerit
            semper non. Eu arcu vulputate, aliquet class gravida! Penatibus laoreet nisi ultricies cubilia.
          </p>
          <p>
            Accumsan inceptos suscipit id litora morbi varius. Mus auctor quisque hac! Enim felis dictumst cras nec.
            Bibendum semper, porta ornare platea proin eget ligula dis dictumst maecenas. Pharetra turpis id dolor
            posuere. Fusce rhoncus fermentum penatibus euismod aliquet sociis leo odio nullam nunc ac auctor! Porttitor
            risus volutpat dui parturient elit erat! Iaculis non, posuere sem elementum montes lacinia accumsan diam
            pulvinar mollis. Etiam at mollis fusce rhoncus blandit ac? Dui, rutrum duis viverra cum sociis potenti
            sociosqu sociosqu magna eu. Id vitae varius quam, primis netus pulvinar orci massa diam. Pharetra semper est
            curabitur!
          </p>
        </calcite-flow-item>
      </calcite-flow>
    </calcite-shell-panel>
  </calcite-shell>`;

customPanelWithOverflowingContent.parameters = {
  chromatic: {
    modes: {
      specific: {
        viewport: {
          width: 1200,
          height: 400,
        },
      },
    },
    cropToViewport: true,
  },
};
