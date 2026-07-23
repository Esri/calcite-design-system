import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import type { BlockGroup } from "./block-group";
import { Decorator } from "@storybook/web-components-vite";

const { scale } = ATTRIBUTES;

type BlockGroupStoryArgs = Pick<BlockGroup, "disabled" | "group" | "dragEnabled" | "label" | "loading" | "scale">;

export default {
  title: "Components/Block Group",
  args: {
    disabled: false,
    dragEnabled: false,
    group: "",
    label: "My Group",
    loading: false,
    scale: scale.defaultValue,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

const blockHTML = html`<calcite-block
    collapsible
    heading="A rubber chicken"
    description="Why did the chicken cross the road? To avoid being squeezed!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Invisible ink" description="You can't see me!">My block content!</calcite-block>
  <calcite-block collapsible heading="Whoopee cushion" description="The sound of laughter!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Fake mustache" description="Incognito mode activated!"
    >My block content!</calcite-block
  >
  <calcite-block collapsible heading="Giant foam finger" description="We're number one!"
    >My block content!</calcite-block
  >
  <calcite-block drag-disabled collapsible heading="Clown nose" description="Honk if you love clowns!"
    >My block content!</calcite-block
  >
  <calcite-block
    collapsible
    heading="Joke book"
    description="Why don't scientists trust atoms? Because they make up everything!"
    >My block content!</calcite-block
  >`;

export const simple = (args: BlockGroupStoryArgs): string => html`
  <calcite-block-group
    ${boolean("disabled", args.disabled)}
    ${boolean("drag-enabled", args.dragEnabled)}
    ${boolean("loading", args.loading)}
    label="${args.label}"
    group="${args.group}"
    scale="${args.scale}"
  >
    ${blockHTML}
  </calcite-block-group>
`;

export const dragEnabled = (): string => html`
  <calcite-block-group drag-enabled label="My Group"> ${blockHTML} </calcite-block-group>
`;

export const sortHandleOpen = (): string => html`
  <calcite-block-group drag-enabled label="My Group">
    <calcite-block sort-handle-open collapsible heading="Invisible ink" description="You can't see me!"
      >My block content!</calcite-block
    >
    ${blockHTML}
  </calcite-block-group>
`;

export const loading = (): string => html`
  <calcite-block-group loading label="My Group"> ${blockHTML} </calcite-block-group>
`;

export const disabled = (): string => html`
  <calcite-block-group disabled label="My Group"> ${blockHTML} </calcite-block-group>
`;

export const allScales = (): string =>
  html` <style>
      .container {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
    </style>
    <div class="container">
      <calcite-block-group scale="s"> ${blockHTML} </calcite-block-group>
      <calcite-block-group scale="m"> ${blockHTML} </calcite-block-group>
      <calcite-block-group scale="l"> ${blockHTML} </calcite-block-group>
    </div>`;

const nestedBlockGroupHTML = (expandMode: BlockGroup["expandMode"]): string => html`
  <calcite-block-group label="Rivers">
    <calcite-block
      collapsible
      heading="Rivers"
      description="Primary waterways and regional flow lines"
      expanded
    ></calcite-block>
    <calcite-block
      collapsible
      heading="Gauging Stations"
      description="Monitoring sites reporting water level metrics"
    ></calcite-block>
  </calcite-block-group>
  <calcite-block-group expand-mode="${expandMode}" label="Lakes & Ponds">
    <calcite-block collapsible heading="Lakes" description="Large standing-water bodies and reservoirs"></calcite-block>
    <calcite-block collapsible heading="Ponds" description="Small standing-water features and basins"></calcite-block>
  </calcite-block-group>
`;

const nestedBlockHTML = (): string => html`
  <calcite-block collapsible heading="Rivers" description="Primary waterways and regional flow lines" expanded>
    <calcite-block
      collapsible
      heading="Gauging Stations"
      description="Monitoring sites reporting water level metrics"
      slot="children"
    ></calcite-block>
    <calcite-block
      collapsible
      heading="Streams"
      description="Secondary channels feeding larger rivers"
      expanded
      slot="children"
    >
      <calcite-block
        collapsible
        heading="Sub Streams"
        description="Minor stream branches in local watersheds"
        slot="children"
      ></calcite-block>
      <calcite-block
        collapsible
        heading="Tributaries"
        description="Contributing flow sources into stream network"
        slot="children"
      ></calcite-block>
    </calcite-block>
  </calcite-block>
  <calcite-block collapsible heading="Lakes" description="Large standing-water bodies and reservoirs"></calcite-block>
`;

const expandMode: BlockGroup["expandMode"][] = ["single", "multiple", "single-persist"];

type ExpandModeStoryArgs = Pick<BlockGroup, "expandMode">;

export const expandModeDecorator: Decorator = (storyFn, context) =>
  html` <style>
      .container-wrapper {
        display: flex;
        flex-direction: row;
        gap: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
      }
    </style>
    <div class="container-wrapper">
      ${expandMode
        .map(
          (mode) =>
            html` <div class="container">
              <p>expandMode="${mode}"</p>
              <calcite-block-group label="My Group" expand-mode="${mode}">
                ${storyFn({ ...context.args, expandMode: mode })}
              </calcite-block-group>
            </div>`,
        )
        .join("")}
    </div>`;

export const allExpandModesWithNestedBlockGroup = (args: ExpandModeStoryArgs): string =>
  nestedBlockGroupHTML(args.expandMode);

allExpandModesWithNestedBlockGroup.decorators = [expandModeDecorator];
allExpandModesWithNestedBlockGroup.args = { expandMode: "single" };

export const allExpandModesWithNestedBlock = (): string => nestedBlockHTML();
allExpandModesWithNestedBlock.decorators = [expandModeDecorator];
