import { boolean, select } from "@storybook/addon-knobs";
import { Attributes, createComponentHTML as create, darkBackground } from "../../../.storybook/utils";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { dir, position, scale, theme } = ATTRIBUTES;
import readme from "./readme.md";
import panelReadme from "../calcite-shell-panel/readme.md";
import { html, placeholderImage } from "../../tests/utils";

export default {
  title: "Components/Shell",
  parameters: {
    backgrounds: darkBackground,
    notes: {
      shell: readme,
      panel: panelReadme
    }
  }
};

const createAttributes: (group: string) => Attributes = (group) => {
  return [
    {
      name: "dir",
      value: select("dir", dir.values, dir.defaultValue, group)
    },
    {
      name: "theme",
      value: select("theme", theme.values, theme.defaultValue, group)
    }
  ];
};

const createShellPanelAttributes: (group: "Leading Panel" | "Trailing Panel") => Attributes = (group) => {
  return [
    {
      name: "slot",
      value: group === "Leading Panel" ? "primary-panel" : "contextual-panel"
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
    }
  ];
};

const createShellCenterRowAttributes: (group: string) => Attributes = (group) => {
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

const actionBarPrimaryContentHTML = html`
  <calcite-action-group>
    <calcite-action text="Add" label="Add Item" icon="plus"></calcite-action>
    <calcite-action text="Save" label="Save Item" icon="save"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Layers" label="View Layers" icon="layers"></calcite-action>
  </calcite-action-group>
`;

const actionBarContextualContentHTML = html`
  <calcite-action-group>
    <calcite-action text="Idea" label="Add Item" icon="lightbulb"></calcite-action>
    <calcite-action text="Information" label="Save Item" icon="information"></calcite-action>
  </calcite-action-group>
  <calcite-action-group>
    <calcite-action text="Question" label="View Layers" icon="question"></calcite-action>
  </calcite-action-group>
`;

const actionBarPrimaryHTML = html`
  <calcite-action-bar theme="dark" slot="action-bar"> ${actionBarPrimaryContentHTML} </calcite-action-bar>
`;

const actionBarContextualHTML = html`
  <calcite-action-bar theme="light" slot="action-bar"> ${actionBarContextualContentHTML} </calcite-action-bar>
`;

const leadingPanelHTML = html`
  ${actionBarPrimaryHTML}
  <p>My Leading Panel</p>
`;

const centerRowHTML = html`
  <div
    style="
    width:50vw;
    background-color: var(--calcite-app-background-content);
    padding: var(--calcite-app-cap-spacing) var(--calcite-app-side-spacing);
    "
  >
    <span>My Shell Center Row</span>
  </div>
`;

const trailingPanelHTML = html`
  ${actionBarContextualHTML}
  <p>My Trailing Panel</p>
`;

const headerHTML = html`
  <header slot="header">
    <h2>My Shell Header</h2>
  </header>
`;

const footerHTML = `<footer slot="footer">My Shell Footer</footer>`;

const contentHTML = html`
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
`;

const centerRowAdvancedHTML = html`
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
`;

export const basic = (): string =>
  create(
    "calcite-shell",
    createAttributes("Shell"),
    html`
      ${headerHTML} ${create("calcite-shell-panel", createShellPanelAttributes("Leading Panel"), leadingPanelHTML)}
      ${contentHTML} ${create("calcite-shell-center-row", createShellCenterRowAttributes("Center Row"), centerRowHTML)}
      ${create("calcite-shell-panel", createShellPanelAttributes("Trailing Panel"), trailingPanelHTML)} ${footerHTML}
    `
  );

// TODO: UPDATE
const advancedLeadingPanelHTML = html`
  ${actionBarPrimaryHTML}
  <calcite-block collapsible open heading="Primary Content" summary="This is the primary.">
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
`;

// TODO: UPDATE
const advancedTrailingPanelHTMl = html`
  ${actionBarContextualHTML}
  <calcite-flow>
    <calcite-panel heading="Layer settings">
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-action slot="header-menu-actions" text="Cool thing" text-enabled></calcite-action>
      <calcite-block collapsible open heading="Contextual Content" summary="Select goodness">
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
      <calcite-button slot="footer-actions" width="half">Save</calcite-button>
      <calcite-button slot="footer-actions" width="half" appearance="clear">Cancel</calcite-button>
    </calcite-panel>
    <calcite-panel heading="Deeper flow item">
      <calcite-block collapsible open heading="Contextual Content" summary="Select goodness">
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
      <calcite-button slot="footer-actions" width="half">Save</calcite-button>
      <calcite-button slot="footer-actions" width="half" appearance="clear">Cancel</calcite-button>
    </calcite-panel>
  </calcite-flow>
`;

export const advanced = (): string =>
  create(
    "calcite-shell",
    createAttributes("Shell"),
    html`
      ${headerHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Leading Panel"), advancedLeadingPanelHTML)}
      ${contentHTML} ${centerRowAdvancedHTML}
      ${create("calcite-shell-panel", createShellPanelAttributes("Trailing Panel"), advancedTrailingPanelHTMl)}
      ${footerHTML}
    `
  );
