import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import type { Scale } from "../interfaces";
import type { Combobox } from "./combobox";

/**
 * This decorator takes HTML for items and will create a composite story for all scales for each specified selection mode.
 *
 * @param itemsStory - the HTML story template for items
 * @param context - the context object
 * @param context.args - the args object
 * @param context.args.selectionMode - the selection mode(s) to use for the combobox
 * @returns the composite story for all scales for each specified selection mode
 */
function allScaleComboboxBuilder(
  itemsStory: () => string,
  context: { args: { selectionMode: Combobox["selectionMode"] | Combobox["selectionMode"][] } },
): string {
  const items = itemsStory();
  const { selectionMode } = context.args;
  const selectionModes = Array.isArray(selectionMode) ? selectionMode : [selectionMode];
  const scales: Scale[] = ["s", "m", "l"];

  return html`
    <style>
      calcite-combobox {
        margin-bottom: 250px;
      }
      .selection-mode-group {
        display: flex;
        justify-content: space-between;
      }
      .combobox-container {
        flex: 1;
        margin-right: 10px;
      }
    </style>

    ${selectionModes.map(
      (selectionMode) => html`
        <div class="selection-mode-group">
          ${scales.map(
            (scale) => html`
              <div class="combobox-container">
                <h3>${selectionMode} selection mode + ${scale} scale</h3>
                <calcite-combobox
                  placeholder="select element"
                  max-items="10"
                  selection-mode="${selectionMode}"
                  open
                  scale="${scale}"
                >
                  ${items}
                </calcite-combobox>
              </div>
            `,
          )}
        </div>
      `,
    )}
  `;
}

export default {
  title: "Components/Controls/Combobox",
};

export const single = (): string => html`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox
      selection-display="all"
      selection-mode="single"
      label="demo"
      max-items="0"
      placeholder="placeholder"
      scale="m"
      status="idle"
    >
      <calcite-combobox-item icon="altitude" value="altitude" heading="Altitude" selected></calcite-combobox-item>
      <calcite-combobox-item icon="article" value="article" heading="Article"></calcite-combobox-item>
      <calcite-combobox-item icon="attachment" value="attachment" heading="Attachment"></calcite-combobox-item>
      <calcite-combobox-item icon="banana" value="banana" heading="Banana"></calcite-combobox-item>
      <calcite-combobox-item icon="battery3" value="battery" heading="Battery Charging"></calcite-combobox-item>
      <calcite-combobox-item icon="beaker" value="beaker" heading="Beaker"></calcite-combobox-item>
      <calcite-combobox-item icon="bell" value="bell" heading="Bell"></calcite-combobox-item>
      <calcite-combobox-item icon="bookmark" value="bookmark" heading="Bookmark"></calcite-combobox-item>
      <calcite-combobox-item icon="brightness" value="brightness" heading="Brightness"></calcite-combobox-item>
      <calcite-combobox-item icon="calendar" value="calendar" heading="Calendar"></calcite-combobox-item>
      <calcite-combobox-item icon="camera" value="camera" heading="Camera"></calcite-combobox-item>
      <calcite-combobox-item icon="car" value="car" heading="Car"></calcite-combobox-item>
      <calcite-combobox-item icon="clock" value="clock" heading="Clock"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const smallViewport = (): string => html`
  <calcite-combobox
    selection-display="all"
    selection-mode="single"
    label="demo"
    open
    max-items="0"
    placeholder="placeholder"
    scale="m"
    status="idle"
  >
    <calcite-combobox-item icon="altitude" value="altitude" heading="Altitude" selected></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" heading="Article"></calcite-combobox-item>
    <calcite-combobox-item icon="attachment" value="attachment" heading="Attachment"></calcite-combobox-item>
    <calcite-combobox-item icon="banana" value="banana" heading="Banana"></calcite-combobox-item>
    <calcite-combobox-item icon="battery3" value="battery" heading="Battery Charging"></calcite-combobox-item>
    <calcite-combobox-item icon="beaker" value="beaker" heading="Beaker"></calcite-combobox-item>
    <calcite-combobox-item icon="bell" value="bell" heading="Bell"></calcite-combobox-item>
    <calcite-combobox-item icon="bookmark" value="bookmark" heading="Bookmark"></calcite-combobox-item>
    <calcite-combobox-item icon="brightness" value="brightness" heading="Brightness"></calcite-combobox-item>
    <calcite-combobox-item icon="calendar" value="calendar" heading="Calendar"></calcite-combobox-item>
    <calcite-combobox-item icon="camera" value="camera" heading="Camera"></calcite-combobox-item>
    <calcite-combobox-item icon="car" value="car" heading="Car"></calcite-combobox-item>
    <calcite-combobox-item icon="clock" value="clock" heading="Clock"></calcite-combobox-item>
  </calcite-combobox>
`;
smallViewport.parameters = { chromatic: { viewports: [300, 300] } };

export const multiple = (): string => html`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>

    <h2>selection-display="fit"</h2>
    <calcite-label>
      Some selected with multiple visible chips
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected with multiple visible chips and overflow chip
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with multiple visible chips and overflow chip
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected as a condensed indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected as a condensed indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected as a compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="this is an unusually long string of placeholder text"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected as a compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="this is an unusually long string of placeholder text"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>

    <h2>selection-display="single"</h2>
    <calcite-label>
      Some selected
      <calcite-combobox
        label="test"
        placeholder="Select any items"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox
        label="test"
        placeholder="Select any items"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      Some selected with compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want to your heart's content"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with compact indicator chip
      <calcite-combobox
        label="test"
        placeholder="Select any items you want to your heart's content"
        max-items="10"
        scale="m"
        selection-display="single"
        placeholder-icon="car"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
  </div>
`;

export const nestedItems = (): string => html`
      <calcite-combobox-item value="ITEM-0-0" heading="Level 1">
        <calcite-combobox-item value="ITEM-0-1" heading="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-2" heading="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-3" heading="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-1-0" heading="Level 1">
        <calcite-combobox-item value="ITEM-1-1" heading="Level 2">
          <calcite-combobox-item value="ITEM-1-1-0" heading="Level 3"></calcite-combobox-item>
          <calcite-combobox-item value="ITEM-1-1-1" heading="Level 3">
            <calcite-combobox-item value="ITEM-1-1-1-0" heading="Level 4"></calcite-combobox-item>
            <calcite-combobox-item value="ITEM-1-1-1-1" heading="Level 4"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-2" heading="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-3" heading="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-2-0" heading="Level 1">
        <calcite-combobox-item value="ITEM-2-1" heading="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-2" heading="Level 2">
          <calcite-combobox-item value="ITEM-2-2-0" heading="Level 3"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-3" heading="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-4" heading="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-5" heading="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-6" heading="Level 1"></calcite-combobox-item>
    </calcite-combobox>
`;

nestedItems.args = {
  selectionMode: "multiple",
};
nestedItems.decorators = [allScaleComboboxBuilder];

const style = html`
  <style>
    calcite-combobox {
      width: 260px;
    }
    calcite-combobox-item {
      width: 260px;
    }
  </style>
`;

export const longItemsAllSelectionModes = (): string => html`
  ${style}
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex; flex-direction: row; margin-block-end: 160px;">
      <calcite-combobox open selection-mode="single" style="margin-right: 20px;">
        <calcite-combobox-item heading="Layers">
        <calcite-combobox-item heading="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item heading="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open selection-mode="single-persist">
        <calcite-combobox-item heading="Layers">
        <calcite-combobox-item heading="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item heading="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div style="display: flex; flex-direction: row;">
      <calcite-combobox open selection-mode="multiple" style="margin-right: 20px;">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item heading="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item heading="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>

      <calcite-combobox open selection-mode="ancestors">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item heading="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item heading="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    </div>
  <div>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-combobox disabled>
    <calcite-combobox-item value="Trees" heading="Trees">
      <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" heading="Flowers" disabled>
      <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" heading="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>`;

export const placement = (): string =>
  html`<calcite-combobox placement="top-start" open>
    <calcite-combobox-item value="1" heading="one" icon="number-circle-1"></calcite-combobox-item>
    <calcite-combobox-item value="2" heading="two" icon="number-circle-2"></calcite-combobox-item>
    <calcite-combobox-item value="3" heading="three" icon="number-circle-3"></calcite-combobox-item>
  </calcite-combobox>`;

export const flipPlacements_TestOnly = (): string => html`
  <style>
    .my-combobox {
      position: unset;
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-combobox class="my-combobox" placeholder="placeholder" open>
      <calcite-combobox-item value="Trees" heading="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" heading="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" heading="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          heading="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" heading="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
  <script>
    document.querySelector(".my-combobox").flipPlacements = ["right"];
  </script>
`;

export const flipPositioning_TestOnly = (): string => html`
  <div style="position: absolute; bottom: 10px; left: 10px;">
    <calcite-combobox max-items="6" placeholder="placeholder" label="demo" selection-mode="multiple" scale="m" open>
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" heading="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals">
        <calcite-combobox-item value="Birds" heading="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;
flipPositioning_TestOnly.parameters = {
  layout: "fullscreen",
};

export const darkModeRTL_TestOnly = (): string => html`
  <div style="width:400px;max-width:100%;padding:100px">
    <calcite-combobox
      label="demo combobox"
      selection-mode="multiple"
      class="calcite-mode-dark"
      placeholder="placeholder"
      label="demo"
      validation-message="This should not appear because the status is not 'invalid'"
    >
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" heading="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals">
        <calcite-combobox-item value="Birds" heading="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const singleLongLabel_TestOnly = (): string => html`
  <calcite-combobox open selection-mode="single" allow-custom-values>
    <calcite-combobox-item value="Trees" heading="Trees">
      <calcite-combobox-item
        value="CommercialDamageAssessment - Damage to Commercial Buildings"
        heading="CommercialDamageAssessment - Damage to Commercial Buildings &  Damage to Residential Buildings "
      ></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`;

export const withPlaceholderIcon_TestOnly = (): string =>
  html` <calcite-combobox
    id="labelFour"
    label="test"
    placeholder="select folder"
    placeholder-icon="select"
    max-items="6"
    selection-mode="single"
    scale="s"
  >
    <calcite-combobox-item value="root" heading="username" icon="home"></calcite-combobox-item>
    <calcite-combobox-item value="1" heading="Folder 1" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item value="2" heading="Folder 2" icon="folder"></calcite-combobox-item>
  </calcite-combobox>`;

export const withoutPlaceholderIcon_TestOnly = (): string =>
  html` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" heading="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" heading="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" heading="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>`;

export const scrollingWithoutMaxItems_TestOnly = (): string => html`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox label="demo combobox" open>
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" heading="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals">
        <calcite-combobox-item value="Birds" heading="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" heading="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals">
        <calcite-combobox-item value="Birds" heading="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly = (): string => html`
  <style>
    .wrapper {
      display: flex;
      width: 100%;
    }

    calcite-combobox {
      width: 400px;
      margin: 0 auto;
    }
  </style>
  <div class="wrapper">
    <calcite-combobox placeholder="placeholder" overlay-positioning="fixed" placement="bottom" open>
      <calcite-combobox-item value="Trees" heading="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" heading="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" heading="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          heading="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" heading="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" heading="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" heading="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" heading="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" heading="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" heading="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" heading="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const mediumIconForLargeComboboxItem_TestOnly = (): string => html`
  <calcite-combobox open scale="l">
    <calcite-combobox-item
      icon="altitude"
      value="altitude"
      heading="Altitude"
      selected
      scale="l"
    ></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" heading="Article" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="altitude" heading="Altitude" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="article" heading="Article" scale="l"></calcite-combobox-item>
  </calcite-combobox>
`;

export const withSelectorIndicatorAndIcons_TestOnly = (): string => html`
  <calcite-combobox-item heading="Folder 1" icon="folder" selected>
    <calcite-combobox-item heading="Sub Folder 1" icon="folder" selected>
      <calcite-combobox-item heading="Sub Folder 2 " icon="folder" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item>
  <calcite-combobox-item heading="Folder 2" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item heading="Folder 3" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item heading="Folder 4"></calcite-combobox-item>
  <calcite-combobox-item-group label="Files">
    <calcite-combobox-item heading="File 1" icon="file" selected>
      <calcite-combobox-item heading="file 2" icon="file" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
`;

withSelectorIndicatorAndIcons_TestOnly.args = {
  selectionMode: "multiple",
};
withSelectorIndicatorAndIcons_TestOnly.decorators = [allScaleComboboxBuilder];

export const nestedGroups_TestOnly = (): string => html`
  <calcite-combobox-item-group label="First item group">
    <calcite-combobox-item value="Pikachu" heading="Pikachu"></calcite-combobox-item>
    <calcite-combobox-item value="Charizard" heading="Charizard"></calcite-combobox-item>

    <calcite-combobox-item-group label="Cutest Pokémon">
      <calcite-combobox-item value="Bulbasaur" heading="Bulbasaur"></calcite-combobox-item>
      <calcite-combobox-item-group label="No Pokémon 🙃"></calcite-combobox-item-group>

      <calcite-combobox-item-group label="Cutest Pokémon">
        <calcite-combobox-item value="Squirtle" heading="Squirtle">
          <calcite-combobox-item value="Charizard" heading="Charizard"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox-item-group>
    </calcite-combobox-item-group>
  </calcite-combobox-item-group>

  <calcite-combobox-item-group label="Last item group">
    <calcite-combobox-item value="Squirtle" heading="Squirtle">
      <calcite-combobox-item value="Charizard" heading="Charizard"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
`;

nestedGroups_TestOnly.args = {
  selectionMode: "multiple",
};
nestedGroups_TestOnly.decorators = [allScaleComboboxBuilder];

export const clearDisabled_TestOnly = (): string => html`
  <calcite-combobox clear-disabled selection-mode="single" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" heading="one"></calcite-combobox-item>
    <calcite-combobox-item id="two" value="two" heading="two"></calcite-combobox-item>
    <calcite-combobox-item id="three" value="three" heading="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="multiple" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" heading="one"></calcite-combobox-item>
    <calcite-combobox-item selected id="two" value="two" heading="two"></calcite-combobox-item>
    <calcite-combobox-item selected id="three" value="three" heading="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="ancestors" style="width:400px">
    <calcite-combobox-item value="parent" heading="parent">
      <calcite-combobox-item value="child1" heading="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" heading="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`;

export const openInAllScales_TestOnly = (): string => html`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" scale="s">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="m">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="l">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const openWithPlaceholderIconInAllScales_TestOnly = (): string => html`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="s">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="m">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="l">
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const validationMessageInAllScales_TestOnly = (): string => html`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      height: 200px;
      gap: 20px;
    }
  </style>
  <div class="container">
    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="s"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="m"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="l"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" heading="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;

export const readOnlyAllModes = (): string => html`
  <h1>read-only</h1>

  <h2>single</h2>
  <calcite-combobox read-only selection-mode="single">
    <calcite-combobox-item value="one" heading="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>single-persist</h2>
  <calcite-combobox read-only selection-mode="single-persist">
    <calcite-combobox-item value="one" heading="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>multiple</h2>
  <calcite-combobox read-only selection-mode="multiple">
    <calcite-combobox-item value="one" heading="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" heading="two" selected></calcite-combobox-item>
    <calcite-combobox-item value="three" heading="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>ancestors</h2>
  <calcite-combobox read-only selection-mode="ancestors">
    <calcite-combobox-item value="parent" heading="parent">
      <calcite-combobox-item value="child1" heading="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" heading="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`;

export const filterHighlighting = (): string => html`
  <calcite-combobox filter-text="Susan" max-items="6" open>
    <calcite-combobox-item value="Trees" heading="Trees">
      <calcite-combobox-item value="Pine" heading="Pine">
        <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled heading="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" heading="Flowers">
      <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item
        value="Black Eyed Susan"
        description="The Black Eyed Susan is a yellow flower with a dark center."
        heading="Black Eyed Susan"
        short-heading="Susan"
      ></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" heading="Animals">
      <calcite-combobox-item value="Birds" heading="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" heading="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" heading="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" heading="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" heading="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" heading="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`;

export const withDescriptionIconsAndContentSlots = (): string => html`
  <calcite-combobox open>
    <calcite-combobox-item
      icon="layer"
      description="the first installment in this thrilling series"
      selected
      short-heading="#1"
      heading="1ne"
      value="one"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the sequel to the smash hit 'one'"
      short-heading="#2"
      heading="2woo"
      value="two"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the thrilling conclusion to the number series"
      short-heading="#3"
      heading="Thr333"
      value="three"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
  </calcite-combobox>
`;

export const selectAllEnabled = (): string => html`
  <calcite-combobox selection-mode="multiple" placeholder="placeholder" select-all-enabled open scale="l">
    <calcite-combobox-item value="Trees" heading="Trees" selected>
      <calcite-combobox-item value="Pine" heading="Pine" selected>
        <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" heading="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:280px; margin-bottom:350px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" heading="Trees" selected>
      <calcite-combobox-item value="Pine" heading="Pine" selected>
        <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" heading="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:450px; margin-bottom:30px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" heading="Trees">
      <calcite-combobox-item value="Pine" heading="Pine" selected>
        <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" heading="Flowers" selected>
      <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" heading="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`;

export const withDescriptionShortLabelAndContentSlots = (): string => html`
  <calcite-combobox-item
    description="the first installment in this thrilling series"
    selected
    short-heading="#1"
    heading="1ne"
    value="one"
  >
    <calcite-icon icon="number-circle-1" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-2" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item description="the sequel to the smash hit 'one'" short-heading="#2" heading="2woo" value="two">
    <calcite-icon icon="number-circle-3" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-4" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item
    description="the thrilling conclusion to the number series"
    short-heading="#3"
    heading="Thr333"
    value="three"
  >
    <calcite-icon icon="number-circle-5" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-6" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
`;

export const noMatchesScaledOrAddCustomValue = (): string => html`
  <div style="display: flex; gap: 48px; padding: 100px;">
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <calcite-combobox open filter-text="Three" selection-mode="single" scale="s">
        <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="m">
        <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="l">
        <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div>
      <calcite-combobox open allow-custom-values filter-text="Three" selection-mode="single">
        <calcite-combobox-item value="one" heading="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" heading="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>
  </div>
`;

withDescriptionShortLabelAndContentSlots.args = {
  selectionMode: ["single", "multiple"],
};
withDescriptionShortLabelAndContentSlots.decorators = [allScaleComboboxBuilder];
withDescriptionShortLabelAndContentSlots.parameters = {
  chromatic: { delay: 1000 },
};
