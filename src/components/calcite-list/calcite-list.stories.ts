import { darkBackground } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../tests/utils";

export default {
  title: "Components/List",

  parameters: {
    notes: readme
  }
};

export const Simple = (): string => html`
  <calcite-list>
    <calcite-list-item label="Hi!" description="hello world"></calcite-list-item>
    <calcite-list-item label="Hi!" description="hello world"></calcite-list-item>
    <calcite-list-item label="Hi!" description="hello world"></calcite-list-item>
  </calcite-list>
`;

export const Nested = (): string => html`
  <calcite-list>
    <calcite-list-item label="Hi!" description="hello world">
      <calcite-list-item label="Hi!" description="hello world">
        <calcite-list-item label="Hi!" description="hello world"></calcite-list-item>
      </calcite-list-item>
    </calcite-list-item>
  </calcite-list>
`;

export const Grouped = (): string => html`
  <calcite-list>
    <calcite-list-item-group heading="Digits">
      <calcite-list-item label="One" description="1"></calcite-list-item>
      <calcite-list-item label="Two" description="2"></calcite-list-item>
      <calcite-list-item label="Three" description="3"></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Letters">
      <calcite-list-item label="A" description="a"></calcite-list-item>
      <calcite-list-item label="B" description="b"></calcite-list-item>
      <calcite-list-item label="C" description="c"></calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
`;

export const RTL = (): string => html`
  <calcite-list dir="rtl">
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://slm-assets.secondlife.com/assets/19947929/view_large/Capture_du_2018-03-04_20-40-56.jpg?1520192584"
      ></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://www.seekpng.com/png/detail/90-906849_89kib-1024x631-finn-finn-adventure-time-face.png"
      ></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/c9/603138_454321168018988_647044807_n.png/revision/latest/scale-to-width-down/250?cb=20140624024310"
      ></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-ui-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`;

export const DarkMode = (): string => html`
  <calcite-list class="calcite-theme-dark">
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://slm-assets.secondlife.com/assets/19947929/view_large/Capture_du_2018-03-04_20-40-56.jpg?1520192584"
      ></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://www.seekpng.com/png/detail/90-906849_89kib-1024x631-finn-finn-adventure-time-face.png"
      ></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar
        scale="l"
        slot="content-start"
        thumbnail="https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/c9/603138_454321168018988_647044807_n.png/revision/latest/scale-to-width-down/250?cb=20140624024310"
      ></calcite-avatar>
      <calcite-icon
        scale="s"
        icon="exclamation-mark-triangle"
        slot="content-end"
        style="color: var(--calcite-ui-danger)"
      ></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
  </calcite-list>
`;

DarkMode.story = {
  name: "Dark mode",
  parameters: { backgrounds: darkBackground }
};
