import { number, select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { defaultMenuPlacement, menuPlacements } from "../../utils/floating-ui";
import readme2 from "../dropdown-group/readme.md";
import readme3 from "../dropdown-item/readme.md";
import readme1 from "./readme.md";

export default {
  title: "Components/Buttons/Dropdown",
  parameters: {
    notes: [readme1, readme2, readme3],
    chromatic: {
      delay: 500,
    },
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Sort by"
    >
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const simpleAutoWidth = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Sort by"
    >
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const simpleFullWidth = (): string => html`
  <div style="width: 500px;">
    <calcite-dropdown
      style="width:100%"
      open
      placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
      ${boolean("close-on-select-disabled", false)}
      ${boolean("disabled", false)}
    >
      <calcite-button width="full" slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group
        selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
        group-title="Sort by"
      >
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;

export const withIcons = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Icon Start"
    >
      <calcite-dropdown-item icon-start="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Icon End"
    >
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Icon Both"
    >
      <calcite-dropdown-item icon-start="list" icon-end="data-check">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="data-check" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="table" icon-end="data-check">Table</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const groupsAndSelectionModes = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item>Apple</calcite-dropdown-item>
      <calcite-dropdown-item selected>Orange</calcite-dropdown-item>
      <calcite-dropdown-item>Grape</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item>Asparagus</calcite-dropdown-item>
      <calcite-dropdown-item selected>Potato</calcite-dropdown-item>
      <calcite-dropdown-item selected>Yam</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item>Plant beans</calcite-dropdown-item>
      <calcite-dropdown-item>Add peas</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const itemsAsLinks = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-dropdown
    dir="rtl"
    open
    class="calcite-mode-dark"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="Select one">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select multi" selection-mode="multiple">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Select none (useful for actions)" selection-mode="none">
      <calcite-dropdown-item icon-end="list">List</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="grid" selected>Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-end="table">Table</calcite-dropdown-item>
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >A link</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const itemsAsLinksDarkMode = (): string => html`
  <calcite-dropdown
    open
    class="calcite-mode-dark"
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group selection-mode="none" group-title="Select one">
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Throw Apples</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Visit Oranges</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title"
        >Eat Grapes</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-start="camera-flash-on"
        >Plant beans</calcite-dropdown-item
      >
      <calcite-dropdown-item href="http://www.esri.com" target="_blank" title="Test title" icon-end="camera-flash-on"
        >Add peas</calcite-dropdown-item
      >
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

itemsAsLinksDarkMode.parameters = { modes: modesDarkDefault };

export const scrollingAfterCertainItems_TestOnly = (): string => html`
  <calcite-dropdown
    open
    placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
    max-items="${number("max-items", 7, { min: 0, max: 10, step: 1 })}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
    width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
    type="${select("type", ["click", "hover"], "click")}"
    ${boolean("close-on-select-disabled", false)}
    ${boolean("disabled", false)}
  >
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

scrollingAfterCertainItems_TestOnly.parameters = {
  chromatic: { delay: 1500 },
};

export const scrollingWithoutMaxItems_TestOnly = (): string => html`
  <calcite-dropdown open>
    <calcite-button slot="trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group
      selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
      group-title="Sort by"
    >
      <calcite-dropdown-item>Relevance</calcite-dropdown-item>
      <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
      <calcite-dropdown-item>Title</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const noScrollingWhenMaxItemsEqualsItems_TestOnly = (): string => html` <calcite-dropdown max-items="3" open>
  <calcite-button slot="trigger">Activate Dropdown</calcite-button>
  <calcite-dropdown-group selection-mode="single" group-title="Selection Mode: Single">
    <calcite-dropdown-item>Relevance</calcite-dropdown-item>
    <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
    <calcite-dropdown-item>Title</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>`;

export const disabled_TestOnly = (): string => html`
  <calcite-dropdown disabled>
    <calcite-button slot="trigger">Disabled dropdown</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item>2</calcite-dropdown-item>
      <calcite-dropdown-item>3</calcite-dropdown-item>
      <calcite-dropdown-item>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>

  <calcite-dropdown open>
    <calcite-button slot="trigger">Disabled dropdown items</calcite-button>
    <calcite-dropdown-group group-title="First group">
      <calcite-dropdown-item>1</calcite-dropdown-item>
      <calcite-dropdown-item disabled>2</calcite-dropdown-item>
      <calcite-dropdown-item disabled>3</calcite-dropdown-item>
      <calcite-dropdown-item disabled>4</calcite-dropdown-item>
      <calcite-dropdown-item>5</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Second group">
      <calcite-dropdown-item>6</calcite-dropdown-item>
      <calcite-dropdown-item>7</calcite-dropdown-item>
      <calcite-dropdown-item>8</calcite-dropdown-item>
      <calcite-dropdown-item>9</calcite-dropdown-item>
      <calcite-dropdown-item>10</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const flipPositioning_TestOnly = (): string => html`
  <div style="margin:10px;">
    <calcite-dropdown width-scale="m" placement="${select("placement", menuPlacements, "top")}" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group>
        <calcite-dropdown-item>1</calcite-dropdown-item>
        <calcite-dropdown-item>2</calcite-dropdown-item>
        <calcite-dropdown-item>3</calcite-dropdown-item>
        <calcite-dropdown-item>4</calcite-dropdown-item>
        <calcite-dropdown-item>5</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;
flipPositioning_TestOnly.parameters = {
  layout: "fullscreen",
};

export const alignedCenter_TestOnly = (): string => html`
  <div style="text-align:center">
    <calcite-dropdown
      open
      placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
      ${boolean("close-on-select-disabled", false)}
      ${boolean("disabled", false)}
    >
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group
        selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
        group-title="Sort by"
      >
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;

export const alignedCenterRTL_TestOnly = (): string => html`
  <div dir="rtl" style="text-align:center">
    <calcite-dropdown
      open
      placement="${select("placement", menuPlacements, defaultMenuPlacement)}"
      scale="${select("scale", ["s", "m", "l"], "m")}"
      width-scale="${select("width-scale", ["s", "m", "l"], "m")}"
      type="${select("type", ["click", "hover"], "click")}"
      ${boolean("close-on-select-disabled", false)}
      ${boolean("disabled", false)}
    >
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group
        selection-mode="${select("group selection mode", ["single", "none", "multiple"], "single")}"
        group-title="Sort by"
      >
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
`;

export const flipPlacements_TestOnly = (): string => html`
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <style>
    .my-dropdown {
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-dropdown class="my-dropdown" open>
      <calcite-button slot="trigger">Open Dropdown</calcite-button>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
      <calcite-dropdown-group group-title="Sort by">
        <calcite-dropdown-item>Relevance</calcite-dropdown-item>
        <calcite-dropdown-item selected>Date modified</calcite-dropdown-item>
        <calcite-dropdown-item>Title</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  </div>
  <script>
    document.querySelector(".my-dropdown").flipPlacements = ["right"];
  </script>
`;

export const mediumIconForLargeDropdownItem_TestOnly = (): string => html`
  <calcite-dropdown scale="l" width-scale="m" open>
    <calcite-dropdown-group group-title="View">
      <calcite-dropdown-item scale="l">Table</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" scale="l">Grid</calcite-dropdown-item>
      <calcite-dropdown-item icon-start="grid" icon-end="grid" scale="l">Grid</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

export const triggerWordBreak_TestOnly = (): string => html`<div style="width:300px;">
<calcite-dropdown scale="m">
  <calcite-button slot="trigger" alignment="icon-end-space-between" appearance="transparent" icon-end="chevronDown"
    scale="m" type="button" width="full">BirdObservationCommentBirdObservationComment</calcite-button>
  <calcite-dropdown-group role="group" selection-mode="single">
    <calcite-dropdown-item>BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationComment-BirdObservationComment</calcite-dropdown-item>
    <calcite-dropdown-item>BirdObservationCommentBirdObservationComment</calcite-dropdown-item>
  </calcite-dropdown-group>
  <calcite-dropdown-item>BirdObservationComment BirdObservationComment</calcite-dropdown-item>
  <calcite-dropdown-item>Bird_Observation_Comment_Bird_Observation_Comment</calcite-dropdown-item>
  </calcite-dropdown-group>
</calcite-dropdown>
</div>`;

export const settingFullWidthEnablesTriggerTruncation_TestOnly = (): string => html`<div
  style="width: 300px; border: solid"
>
  <calcite-dropdown style="width: 100%;">
    <calcite-button width="full" slot="trigger"
      >This is some really long text that will eventually overrun the container</calcite-button
    >
    <calcite-dropdown-group group-title="Natural places">
      <calcite-dropdown-item>Mountain</calcite-dropdown-item>
      <calcite-dropdown-item>River</calcite-dropdown-item>
      <calcite-dropdown-item>Waterfall</calcite-dropdown-item>
      <calcite-dropdown-item>Rainforest</calcite-dropdown-item>
      <calcite-dropdown-item>Tundra</calcite-dropdown-item>
      <calcite-dropdown-item>Desert</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
</div>`;
