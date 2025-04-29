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
