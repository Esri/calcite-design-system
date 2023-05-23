import { modesDarkDefault } from "../../../.storybook/utils";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import readme from "./readme.md";
import itemReadme from "../list-item/readme.md";
import groupReadme from "../list-item-group/readme.md";
import { html } from "../../../support/formatting";
import { storyFilters, boolean } from "../../../.storybook/helpers";
import { select, text } from "@storybook/addon-knobs";

export default {
  title: "Components/List",
  parameters: {
    notes: [readme, itemReadme, groupReadme],
    chromatic: {
      delay: 500
    }
  },
  ...storyFilters()
};

const thumbnailImage = placeholderImage({ width: 44, height: 44 });

const knobsHTML = (): string => html`selection-mode="${select(
  "selection-mode",
  ["single", "multiple", "none"],
  "none"
)}"
selection-appearance="${select("selection-appearance", ["icon", "border"], "icon")}" ${boolean("loading", false)}
${boolean("closable", false)} ${boolean("closed", false)} ${boolean("filter-enabled", false)}
${boolean("disabled", false)} ${text("label", "My List")}`;

export const simple = (): string => html`
  <calcite-list ${knobsHTML()}>
    <calcite-list-item
      selected
      label="Cras iaculis ultricies nulla."
      description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item
      label="Ut aliquam sollicitudin leo."
      description="Aliquam tincidunt mauris eu risus."
    ></calcite-list-item>
    <calcite-list-item
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
    <calcite-list-item
      disabled
      label="Vestibulum commodo felis quis tortor.
    "
      description="Vestibulum auctor dapibus neque.
    "
    ></calcite-list-item>
  </calcite-list>
`;

export const onlyLabelVersusOnlyDescription_TestOnly = (): string => html`
  <calcite-list ${knobsHTML()}>
    <calcite-list-item label="This has no description."> </calcite-list-item>
  </calcite-list>
  <calcite-list>
    <calcite-list-item description="This has no label."> </calcite-list-item>
  </calcite-list>
`;

export const nestedItems = (): string => html`
  <calcite-list ${knobsHTML()}>
    <calcite-list-item
      label="Level 1 item 1"
      description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    ></calcite-list-item>
    <calcite-list-item label="Level 1 item 2" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit.">
      <calcite-list-item label="Level 2 item 1" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit.">
        <calcite-list-item
          label="Level 3 item 1"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        ></calcite-list-item>
        <calcite-list-item
          label="Level 3 item 2"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        >
          <calcite-list-item
            label="Level 4 item 1"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          >
            <calcite-list-item
              label="Level 5 item 1"
              description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
            ></calcite-list-item>
          </calcite-list-item>
          <calcite-list-item
            label="Level 4 item 2"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          ></calcite-list-item>
          <calcite-list-item
            label="Level 4 item 3"
            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          ></calcite-list-item>
        </calcite-list-item>
        <calcite-list-item
          label="Level 3 item 3"
          description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
        ></calcite-list-item>
      </calcite-list-item>
      <calcite-list-item
        label="Level 2 item 2"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item
        label="Level 2 item 3"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item>
    <calcite-list-item
      label="Level 1 item 3"
      description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
    ></calcite-list-item>
  </calcite-list>
`;

nestedItems.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const groupedItems = (): string => html`
  <calcite-list ${knobsHTML()}>
    <calcite-list-item-group heading="Nested">
      <calcite-list-item
        expanded
        label="Cras iaculis ultricies nulla."
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      >
        <calcite-list-item
          expanded
          label="Ut aliquam sollicitudin leo."
          description="Aliquam tincidunt mauris eu risus."
        >
          <calcite-list-item
            label="Vestibulum commodo felis quis tortor."
            description="Vestibulum auctor dapibus neque."
          ></calcite-list-item></calcite-list-item
      ></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Digits">
      <calcite-list-item
        label="One"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item label="Two" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item label="Three" description="Vestibulum auctor dapibus neque."></calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Letters">
      <calcite-list-item
        label="A"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      ></calcite-list-item>
      <calcite-list-item label="B" description="Aliquam tincidunt mauris eu risus."></calcite-list-item>
      <calcite-list-item
        label="C"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
      ></calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>
`;

groupedItems.parameters = {
  chromatic: { diffThreshold: 1 }
};

export const startAndEndContentSlots = (): string => html`<calcite-list ${knobsHTML()}>
  <calcite-list-item>
    <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
    <calcite-icon icon="layers" scale="m" slot="content-start"></calcite-icon>
    <span slot="content-start">Some value or something and a <b>thing</b>.</span>
    <div slot="content-end" style="display: flex; justify-content: flex-end">
      <calcite-chip class="list-chip" icon="ribbon-rosette" scale="s">Review</calcite-chip>
      <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
    </div>
  </calcite-list-item>
  <calcite-list-item>
    <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
    <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
    <span slot="content-start">Some value or something and a <b>thing</b>.</span>
    <div slot="content-end" style="display: flex; justify-content: flex-end">
      <calcite-chip class="list-chip" icon="globe" scale="s">Good</calcite-chip>
    </div>
  </calcite-list-item>
  <calcite-list-item>
    <calcite-action slot="actions-end" icon="ellipsis"> </calcite-action>
    <calcite-icon icon="user" scale="m" slot="content-start"></calcite-icon>
    <span slot="content-start">Some value or something and a <b>thing</b>.</span>
    <div slot="content-end" style="display: flex; justify-content: flex-end">
      <calcite-chip class="list-chip" icon="bell" scale="s">Halp!</calcite-chip>
    </div>
  </calcite-list-item>
</calcite-list> `;

export const richContent = (): string => html`
  <calcite-list ${knobsHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
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
export const richContentFilterEnabled = (): string => html`
  <calcite-list filter-enabled>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
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

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-list class="calcite-mode-dark" dir="rtl" ${knobsHTML()}>
    <calcite-list-item label="Princess Bubblegum" description="Ruler of The Candy Kingdom">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="effects" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Finn Mertens" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="running" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
      <calcite-icon scale="s" icon="check" slot="content-end" style="color: var(--calcite-ui-success)"></calcite-icon>
      <calcite-action icon="ellipsis" label="menu" slot="actions-end"></calcite-action>
      <calcite-action icon="x" label="remove" slot="actions-end"></calcite-action>
    </calcite-list-item>
    <calcite-list-item label="Jake T. Dog" description="Part owner of the Tree House">
      <calcite-action icon="drag" label="drag" scale="s" slot="actions-start"></calcite-action>
      <calcite-icon scale="l" icon="walking" slot="content-start"></calcite-icon>
      <calcite-avatar scale="l" slot="content-start" thumbnail="${thumbnailImage}"></calcite-avatar>
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

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const disabled_TestOnly = (): string => html`<calcite-list disabled>
  <calcite-list-item
    label="Cras iaculis ultricies nulla."
    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
  ></calcite-list-item>
  <calcite-list-item
    disabled
    label="Ut aliquam sollicitudin leo."
    description="Aliquam tincidunt mauris eu risus."
  ></calcite-list-item>
  <calcite-list-item
    label="Vestibulum commodo felis quis tortor.
    "
    description="Vestibulum auctor dapibus neque.
    "
  ></calcite-list-item>
</calcite-list>`;

export const customContent_TestOnly = (): string => html`<calcite-list disabled>
  <calcite-list-item>
    <div slot="content">
      <strong>Cras iaculis ultricies nulla.</strong>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
    </div></calcite-list-item
  >
  <calcite-list-item disabled>
    <div slot="content">
      <strong>Cras iaculis ultricies nulla.</strong>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
    </div></calcite-list-item
  >
  <calcite-list-item
    ><div slot="content">
      <strong>Cras iaculis ultricies nulla.</strong>
      <div>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
    </div></calcite-list-item
  >
</calcite-list>`;

export const closableListItems_TestOnly = (): string => html`<calcite-list
  selection-mode="single"
  label="test"
  filter-enabled
>
  <calcite-list-item closable label="basic" value="basic" description="hello world">
    <calcite-icon icon="banana" slot="content-start" style="color: var(--calcite-ui-success)"></calcite-icon>
    <calcite-action
      appearance="transparent"
      icon="ellipsis"
      text="menu"
      label="menu"
      slot="actions-end"
    ></calcite-action>
  </calcite-list-item>
  <calcite-list-item closable disabled label="disabled" value="disabled" description="hello world">
    <calcite-icon icon="compass" slot="content-start" style="color: var(--calcite-ui-success)"></calcite-icon>
  </calcite-list-item>
  <calcite-list-item closed closable label="closed" value="closed" description="hello world">
    <calcite-icon icon="compass" slot="content-start" style="color: var(--calcite-ui-success)"></calcite-icon>
  </calcite-list-item>
</calcite-list>`;

export const filteredChildListItems_TestOnly = (): string => html` <calcite-list
    filter-enabled
    filter-text="est"
    filter-placeholder="Find content"
    selection-appearance="border"
    selection-mode="single"
  >
    <calcite-list-item-group heading="Layers">
      <calcite-list-item label="Hiking trails" value="hiking-trails">
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item disabled label="Waterfalls" value="waterfalls">
        <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item label="Rivers" value="rivers">
        <calcite-list-item label="Estuaries" value="estuaries">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Tables">
      <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls table" value="waterfalls-table">
        <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Basemaps">
      <calcite-list-item disabled label="Waterfalls" value="waterfalls">
        <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
      </calcite-list-item>
    </calcite-list-item-group> </calcite-list
  ><calcite-list
    filter-enabled
    filter-text="water"
    filter-placeholder="Find content"
    selection-appearance="border"
    selection-mode="single"
  >
    <calcite-list-item-group heading="Layers">
      <calcite-list-item label="Hiking trails" value="hiking-trails">
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item disabled label="Waterfalls" value="waterfalls">
        <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item label="Rivers" value="rivers">
        <calcite-list-item label="Estuaries" value="estuaries">
          <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
            <calcite-action
              slot="trigger"
              appearance="transparent"
              icon="ellipsis"
              scale="s"
              text="Trails layer"
            ></calcite-action>
            <calcite-dropdown-group scale="s" selection-mode="none">
              <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </calcite-list-item>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Tables">
      <calcite-list-item label="Hiking trails table" value="hiking-trails-table">
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
      <calcite-list-item label="Waterfalls table" value="waterfalls-table">
        <calcite-icon slot="content-end" icon="exclamation-mark-circle-f" scale="s"></calcite-icon>
        <calcite-dropdown slot="actions-end" overlay-positioning="fixed" placement="bottom-end" scale="s">
          <calcite-action
            slot="trigger"
            appearance="transparent"
            icon="ellipsis"
            scale="s"
            text="Trails layer"
          ></calcite-action>
          <calcite-dropdown-group scale="s" selection-mode="none">
            <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </calcite-list-item>
    </calcite-list-item-group>
    <calcite-list-item-group heading="Basemaps">
      <calcite-list-item disabled label="Waterfalls" value="waterfalls">
        <calcite-icon slot="content-end" icon="circle-disallowed" scale="s"></calcite-icon>
      </calcite-list-item>
    </calcite-list-item-group>
  </calcite-list>`;
