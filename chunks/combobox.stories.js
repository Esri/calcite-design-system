import { h as e, j as O } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
var E = Object.freeze, V = Object.defineProperty, W = (m, I) => E(V(m, "raw", { value: E(m.slice()) })), _;
function q(m, I) {
  const C = m(), {
    selectionMode: N
  } = I.args, L = Array.isArray(N) ? N : [N], M = ["s", "m", "l"];
  return e`
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

    ${L.map((R) => e`
        <div class="selection-mode-group">
          ${M.map((B) => e`
              <div class="combobox-container">
                <h3>${R} selection mode + ${B} scale</h3>
                <calcite-combobox
                  placeholder="select element"
                  max-items="10"
                  selection-mode="${R}"
                  open
                  scale="${B}"
                >
                  ${C}
                </calcite-combobox>
              </div>
            `)}
        </div>
      `)}
  `;
}
const U = {
  title: "Components/Controls/Combobox"
}, x = () => e`
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
      <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>
      <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>
      <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>
      <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>
      <calcite-combobox-item icon="battery3" value="battery" text-label="Battery Charging"></calcite-combobox-item>
      <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>
      <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>
      <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>
      <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>
      <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>
      <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>
      <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>
      <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, i = () => e`
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
    <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>
    <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>
    <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>
    <calcite-combobox-item icon="battery3" value="battery" text-label="Battery Charging"></calcite-combobox-item>
    <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>
    <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>
    <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>
    <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>
    <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>
    <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>
    <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>
    <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>
  </calcite-combobox>
`;
i.parameters = {
  chromatic: {
    viewports: [300, 300]
  }
};
const n = () => e`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
  </div>
`, c = () => e`
      <calcite-combobox-item value="ITEM-0-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-0-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-1-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-1-1" text-label="Level 2">
          <calcite-combobox-item value="ITEM-1-1-0" text-label="Level 3"></calcite-combobox-item>
          <calcite-combobox-item value="ITEM-1-1-1" text-label="Level 3">
            <calcite-combobox-item value="ITEM-1-1-1-0" text-label="Level 4"></calcite-combobox-item>
            <calcite-combobox-item value="ITEM-1-1-1-1" text-label="Level 4"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-2-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-2-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-2" text-label="Level 2">
          <calcite-combobox-item value="ITEM-2-2-0" text-label="Level 3"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-4" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-5" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-6" text-label="Level 1"></calcite-combobox-item>
    </calcite-combobox>
`;
c.args = {
  selectionMode: "multiple"
};
c.decorators = [q];
const z = e`
  <style>
    calcite-combobox {
      width: 260px;
    }
    calcite-combobox-item {
      width: 260px;
    }
  </style>
`, s = () => e`
  ${z}
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex; flex-direction: row; margin-block-end: 160px;">
      <calcite-combobox open selection-mode="single" style="margin-right: 20px;">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open selection-mode="single-persist">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div style="display: flex; flex-direction: row;">
      <calcite-combobox open selection-mode="multiple" style="margin-right: 20px;">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>

      <calcite-combobox open selection-mode="ancestors">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    </div>
  <div>
`, r = () => e`<calcite-combobox disabled>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers" disabled>
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>`, u = () => e(_ || (_ = W([`
  <style>
    .my-combobox {
      position: unset;
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-combobox class="my-combobox" placeholder="placeholder" open>
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
  <script>
    document.querySelector(".my-combobox").flipPlacements = ["right"];
  <\/script>
`]))), a = () => e`
  <div style="position: absolute; bottom: 10px; left: 10px;">
    <calcite-combobox max-items="6" placeholder="placeholder" label="demo" selection-mode="multiple" scale="m" open>
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;
a.parameters = {
  layout: "fullscreen"
};
const b = () => e`
  <div style="width:400px;max-width:100%;padding:100px">
    <calcite-combobox
      label="demo combobox"
      selection-mode="multiple"
      class="calcite-mode-dark"
      placeholder="placeholder"
      label="demo"
      validation-message="This should not appear because the status is not 'invalid'"
    >
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`;
b.parameters = {
  themes: O
};
const d = () => e`
  <calcite-combobox open selection-mode="single" allow-custom-values>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item
        value="CommercialDamageAssessment - Damage to Commercial Buildings"
        text-label="CommercialDamageAssessment - Damage to Commercial Buildings &  Damage to Residential Buildings "
      ></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`, v = () => e` <calcite-combobox
    id="labelFour"
    label="test"
    placeholder="select folder"
    placeholder-icon="select"
    max-items="6"
    selection-mode="single"
    scale="s"
  >
    <calcite-combobox-item value="root" text-label="username" icon="home"></calcite-combobox-item>
    <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
  </calcite-combobox>`, p = () => e` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" text-label="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>`, h = () => e`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox label="demo combobox" open>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, g = () => e`
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
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, y = () => e`
  <calcite-combobox open scale="l">
    <calcite-combobox-item
      icon="altitude"
      value="altitude"
      text-label="Altitude"
      selected
      scale="l"
    ></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" text-label="Article" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="altitude" text-label="Altitude" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="article" text-label="Article" scale="l"></calcite-combobox-item>
  </calcite-combobox>
`, t = () => e`
  <calcite-combobox-item text-label="Folder 1" icon="folder" selected>
    <calcite-combobox-item text-label="Sub Folder 1" icon="folder" selected>
      <calcite-combobox-item text-label="Sub Folder 2 " icon="folder" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 2" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 3" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 4"></calcite-combobox-item>
  <calcite-combobox-item-group label="Files">
    <calcite-combobox-item text-label="File 1" icon="file" selected>
      <calcite-combobox-item text-label="file 2" icon="file" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
`;
t.args = {
  selectionMode: "multiple"
};
t.decorators = [q];
const l = () => e`
  <calcite-combobox-item-group label="First item group">
    <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>
    <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>

    <calcite-combobox-item-group label="Cutest Pokémon">
      <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>
      <calcite-combobox-item-group label="No Pokémon 🙃"></calcite-combobox-item-group>

      <calcite-combobox-item-group label="Cutest Pokémon">
        <calcite-combobox-item value="Squirtle" text-label="Squirtle">
          <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox-item-group>
    </calcite-combobox-item-group>
  </calcite-combobox-item-group>

  <calcite-combobox-item-group label="Last item group">
    <calcite-combobox-item value="Squirtle" text-label="Squirtle">
      <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
`;
l.args = {
  selectionMode: "multiple"
};
l.decorators = [q];
const S = () => e`
  <calcite-combobox clear-disabled selection-mode="single" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="multiple" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="ancestors" style="width:400px">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`, w = () => e`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, T = () => e`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, f = () => e`
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
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="m"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="l"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
`, P = () => e`
  <h1>read-only</h1>

  <h2>single</h2>
  <calcite-combobox read-only selection-mode="single">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>single-persist</h2>
  <calcite-combobox read-only selection-mode="single-persist">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>multiple</h2>
  <calcite-combobox read-only selection-mode="multiple">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two" selected></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>ancestors</h2>
  <calcite-combobox read-only selection-mode="ancestors">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`, F = () => e`
  <calcite-combobox filter-text="Susan" max-items="6" open>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine">
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers">
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item
        value="Black Eyed Susan"
        description="The Black Eyed Susan is a yellow flower with a dark center."
        text-label="Black Eyed Susan"
        short-heading="Susan"
      ></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" text-label="Animals">
      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
`, D = () => e`
  <calcite-combobox open>
    <calcite-combobox-item
      icon="layer"
      description="the first installment in this thrilling series"
      selected
      short-heading="#1"
      text-label="1ne"
      value="one"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the sequel to the smash hit 'one'"
      short-heading="#2"
      text-label="2woo"
      value="two"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the thrilling conclusion to the number series"
      short-heading="#3"
      text-label="Thr333"
      value="three"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
  </calcite-combobox>
`, A = () => e`
  <calcite-combobox selection-mode="multiple" placeholder="placeholder" select-all-enabled open scale="l">
    <calcite-combobox-item value="Trees" text-label="Trees" selected>
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:280px; margin-bottom:350px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" text-label="Trees" selected>
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:450px; margin-bottom:30px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers" selected>
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
`, o = () => e`
  <calcite-combobox-item
    description="the first installment in this thrilling series"
    selected
    short-heading="#1"
    text-label="1ne"
    value="one"
  >
    <calcite-icon icon="number-circle-1" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-2" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item
    description="the sequel to the smash hit 'one'"
    short-heading="#2"
    text-label="2woo"
    value="two"
  >
    <calcite-icon icon="number-circle-3" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-4" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item
    description="the thrilling conclusion to the number series"
    short-heading="#3"
    text-label="Thr333"
    value="three"
  >
    <calcite-icon icon="number-circle-5" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-6" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
`, k = () => e`
  <div style="display: flex; gap: 48px; padding: 100px;">
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <calcite-combobox open filter-text="Three" selection-mode="single" scale="s">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="m">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="l">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div>
      <calcite-combobox open allow-custom-values filter-text="Three" selection-mode="single">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>
  </div>
`;
o.args = {
  selectionMode: ["single", "multiple"]
};
o.decorators = [q];
o.parameters = {
  chromatic: {
    delay: 1e3
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
      <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>
      <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>
      <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>
      <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>
      <calcite-combobox-item icon="battery3" value="battery" text-label="Battery Charging"></calcite-combobox-item>
      <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>
      <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>
      <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>
      <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>
      <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>
      <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>
      <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>
      <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...x.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
    <calcite-combobox-item icon="altitude" value="altitude" text-label="Altitude" selected></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" text-label="Article"></calcite-combobox-item>
    <calcite-combobox-item icon="attachment" value="attachment" text-label="Attachment"></calcite-combobox-item>
    <calcite-combobox-item icon="banana" value="banana" text-label="Banana"></calcite-combobox-item>
    <calcite-combobox-item icon="battery3" value="battery" text-label="Battery Charging"></calcite-combobox-item>
    <calcite-combobox-item icon="beaker" value="beaker" text-label="Beaker"></calcite-combobox-item>
    <calcite-combobox-item icon="bell" value="bell" text-label="Bell"></calcite-combobox-item>
    <calcite-combobox-item icon="bookmark" value="bookmark" text-label="Bookmark"></calcite-combobox-item>
    <calcite-combobox-item icon="brightness" value="brightness" text-label="Brightness"></calcite-combobox-item>
    <calcite-combobox-item icon="calendar" value="calendar" text-label="Calendar"></calcite-combobox-item>
    <calcite-combobox-item icon="camera" value="camera" text-label="Camera"></calcite-combobox-item>
    <calcite-combobox-item icon="car" value="car" text-label="Car"></calcite-combobox-item>
    <calcite-combobox-item icon="clock" value="clock" text-label="Clock"></calcite-combobox-item>
  </calcite-combobox>
\``,
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox label="test" placeholder="Select items" max-items="10" scale="m" placeholder-icon="car">
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" selected></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
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
        <calcite-combobox-item value="Trees" text-label="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected text-label="Pine">
            <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
  </div>
\``,
      ...n.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
      <calcite-combobox-item value="ITEM-0-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-0-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-0-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-1-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-1-1" text-label="Level 2">
          <calcite-combobox-item value="ITEM-1-1-0" text-label="Level 3"></calcite-combobox-item>
          <calcite-combobox-item value="ITEM-1-1-1" text-label="Level 3">
            <calcite-combobox-item value="ITEM-1-1-1-0" text-label="Level 4"></calcite-combobox-item>
            <calcite-combobox-item value="ITEM-1-1-1-1" text-label="Level 4"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-2" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-1-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-2-0" text-label="Level 1">
        <calcite-combobox-item value="ITEM-2-1" text-label="Level 2"></calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-2" text-label="Level 2">
          <calcite-combobox-item value="ITEM-2-2-0" text-label="Level 3"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="ITEM-2-3" text-label="Level 2"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-4" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-5" text-label="Level 1"></calcite-combobox-item>
      <calcite-combobox-item value="ITEM-0-6" text-label="Level 1"></calcite-combobox-item>
    </calcite-combobox>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${style}
  <div style="display: flex; flex-direction: column;">
    <div style="display: flex; flex-direction: row; margin-block-end: 160px;">
      <calcite-combobox open selection-mode="single" style="margin-right: 20px;">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open selection-mode="single-persist">
        <calcite-combobox-item text-label="Layers">
        <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div style="display: flex; flex-direction: row;">
      <calcite-combobox open selection-mode="multiple" style="margin-right: 20px;">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item></calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>

      <calcite-combobox open selection-mode="ancestors">
        <calcite-combobox-item-group label="First item group">
          <calcite-combobox-item text-label="Enriched USA Census Tract Areas Aug29"></calcite-combobox-item>
        </calcite-combobox-item-group>
        <calcite-combobox-item-group label="Last item group">
          <calcite-combobox-item text-label="Viewer_Reservable_Equipments_Capacity_V2_WFL1"></calcite-combobox-item>
          </calcite-combobox-item>
        </calcite-combobox-item-group>
      </calcite-combobox>
    </div>
  <div>
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
      originalSource: `(): string => html\`<calcite-combobox disabled>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers" disabled>
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>\``,
      ...r.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .my-combobox {
      position: unset;
      margin-top: 50px;
    }
  </style>
  <div style="height: 100px; overflow:scroll;">
    <calcite-combobox class="my-combobox" placeholder="placeholder" open>
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
  <script>
    document.querySelector(".my-combobox").flipPlacements = ["right"];
  <\/script>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="position: absolute; bottom: 10px; left: 10px;">
    <calcite-combobox max-items="6" placeholder="placeholder" label="demo" selection-mode="multiple" scale="m" open>
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...a.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:400px;max-width:100%;padding:100px">
    <calcite-combobox
      label="demo combobox"
      selection-mode="multiple"
      class="calcite-mode-dark"
      placeholder="placeholder"
      label="demo"
      validation-message="This should not appear because the status is not 'invalid'"
    >
      <calcite-combobox-item value="Trees" text-label="Trees">
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...b.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox open selection-mode="single" allow-custom-values>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item
        value="CommercialDamageAssessment - Damage to Commercial Buildings"
        text-label="CommercialDamageAssessment - Damage to Commercial Buildings &  Damage to Residential Buildings "
      ></calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-combobox
    id="labelFour"
    label="test"
    placeholder="select folder"
    placeholder-icon="select"
    max-items="6"
    selection-mode="single"
    scale="s"
  >
    <calcite-combobox-item value="root" text-label="username" icon="home"></calcite-combobox-item>
    <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
  </calcite-combobox>\``,
      ...v.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" text-label="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" text-label="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" text-label="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>\``,
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
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox label="demo combobox" open>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
      <calcite-combobox-item value="Trees" text-label="Trees" selected>
        <calcite-combobox-item value="Pine" text-label="Pine"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Black Eyed Susan" text-label="Black Eyed Susan"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals">
        <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
      <calcite-combobox-item value="Trees" text-label="Trees" aria-hidden="true">
        <calcite-combobox-item value="Pine" text-label="Pine" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" text-label="Flowers" aria-hidden="true">
        <calcite-combobox-item value="Daffodil" text-label="Daffodil" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item
          value="Black Eyed Susan"
          text-label="Black Eyed Susan"
          aria-hidden="true"
        ></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" text-label="Nasturtium" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Animals" text-label="Animals" aria-hidden="true">
        <calcite-combobox-item value="Birds" text-label="Birds" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Reptiles" text-label="Reptiles" aria-hidden="true"></calcite-combobox-item>
        <calcite-combobox-item value="Amphibians" text-label="Amphibians" aria-hidden="true"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Rocks" text-label="Rocks" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Insects" text-label="Insects" aria-hidden="true"></calcite-combobox-item>
      <calcite-combobox-item value="Rivers" text-label="Rivers" aria-hidden="true"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox open scale="l">
    <calcite-combobox-item
      icon="altitude"
      value="altitude"
      text-label="Altitude"
      selected
      scale="l"
    ></calcite-combobox-item>
    <calcite-combobox-item icon="article" value="article" text-label="Article" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="altitude" text-label="Altitude" scale="l"></calcite-combobox-item>
    <calcite-combobox-item value="article" text-label="Article" scale="l"></calcite-combobox-item>
  </calcite-combobox>
\``,
      ...y.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox-item text-label="Folder 1" icon="folder" selected>
    <calcite-combobox-item text-label="Sub Folder 1" icon="folder" selected>
      <calcite-combobox-item text-label="Sub Folder 2 " icon="folder" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 2" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 3" icon="folder"></calcite-combobox-item>
  <calcite-combobox-item text-label="Folder 4"></calcite-combobox-item>
  <calcite-combobox-item-group label="Files">
    <calcite-combobox-item text-label="File 1" icon="file" selected>
      <calcite-combobox-item text-label="file 2" icon="file" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
\``,
      ...t.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox-item-group label="First item group">
    <calcite-combobox-item value="Pikachu" text-label="Pikachu"></calcite-combobox-item>
    <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>

    <calcite-combobox-item-group label="Cutest Pokémon">
      <calcite-combobox-item value="Bulbasaur" text-label="Bulbasaur"></calcite-combobox-item>
      <calcite-combobox-item-group label="No Pokémon 🙃"></calcite-combobox-item-group>

      <calcite-combobox-item-group label="Cutest Pokémon">
        <calcite-combobox-item value="Squirtle" text-label="Squirtle">
          <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox-item-group>
    </calcite-combobox-item-group>
  </calcite-combobox-item-group>

  <calcite-combobox-item-group label="Last item group">
    <calcite-combobox-item value="Squirtle" text-label="Squirtle">
      <calcite-combobox-item value="Charizard" text-label="Charizard"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox-item-group>
\``,
      ...l.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox clear-disabled selection-mode="single" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="multiple" style="width:400px">
    <calcite-combobox-item selected id="one" value="one" text-label="one"></calcite-combobox-item>
    <calcite-combobox-item selected id="two" value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item selected id="three" value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>
  <br />
  <calcite-combobox clear-disabled selection-mode="ancestors" style="width:400px">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
\``,
      ...S.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...w.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: flex">
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="s">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="m">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
    <br />
    <calcite-combobox open placeholder="choose a number" placeholder-icon="number" scale="l">
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...T.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="m"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      placeholder="choose a number"
      placeholder-icon="number"
      scale="l"
      status="invalid"
      validation-message="This field is required."
      validation-icon
    >
      <calcite-combobox-item value="one" text-label="one"></calcite-combobox-item>
      <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
      <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h1>read-only</h1>

  <h2>single</h2>
  <calcite-combobox read-only selection-mode="single">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>single-persist</h2>
  <calcite-combobox read-only selection-mode="single-persist">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two"></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>multiple</h2>
  <calcite-combobox read-only selection-mode="multiple">
    <calcite-combobox-item value="one" text-label="one" selected></calcite-combobox-item>
    <calcite-combobox-item value="two" text-label="two" selected></calcite-combobox-item>
    <calcite-combobox-item value="three" text-label="three"></calcite-combobox-item>
  </calcite-combobox>

  <h2>ancestors</h2>
  <calcite-combobox read-only selection-mode="ancestors">
    <calcite-combobox-item value="parent" text-label="parent">
      <calcite-combobox-item value="child1" text-label="child1"></calcite-combobox-item>
      <calcite-combobox-item selected value="child2" text-label="child2"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
\``,
      ...P.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox filter-text="Susan" max-items="6" open>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine">
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" disabled text-label="Sequoia"></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers">
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item
        value="Black Eyed Susan"
        description="The Black Eyed Susan is a yellow flower with a dark center."
        text-label="Black Eyed Susan"
        short-heading="Susan"
      ></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Animals" text-label="Animals">
      <calcite-combobox-item value="Birds" text-label="Birds"></calcite-combobox-item>
      <calcite-combobox-item value="Reptiles" text-label="Reptiles"></calcite-combobox-item>
      <calcite-combobox-item value="Amphibians" text-label="Amphibians"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Rocks" text-label="Rocks"></calcite-combobox-item>
    <calcite-combobox-item value="Insects" text-label="Insects"></calcite-combobox-item>
    <calcite-combobox-item value="Rivers" text-label="Rivers"></calcite-combobox-item>
  </calcite-combobox>
\``,
      ...F.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox open>
    <calcite-combobox-item
      icon="layer"
      description="the first installment in this thrilling series"
      selected
      short-heading="#1"
      text-label="1ne"
      value="one"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the sequel to the smash hit 'one'"
      short-heading="#2"
      text-label="2woo"
      value="two"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
    <calcite-combobox-item
      icon="layer"
      description="the thrilling conclusion to the number series"
      short-heading="#3"
      text-label="Thr333"
      value="three"
    >
      <calcite-icon icon="arrow-left" slot="content-start" scale="s"></calcite-icon>
      <calcite-icon icon="arrow-right" slot="content-end" scale="s"></calcite-icon>
    </calcite-combobox-item>
  </calcite-combobox>
\``,
      ...D.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox selection-mode="multiple" placeholder="placeholder" select-all-enabled open scale="l">
    <calcite-combobox-item value="Trees" text-label="Trees" selected>
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:280px; margin-bottom:350px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" text-label="Trees" selected>
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested" selected></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia" selected></calcite-combobox-item>
      <calcite-combobox-item value="Douglas Fir" text-label="Douglas Fir" selected></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>

  <calcite-combobox style="margin-top:450px; margin-bottom:30px;" selection-mode="multiple" select-all-enabled open>
    <calcite-combobox-item value="Trees" text-label="Trees">
      <calcite-combobox-item value="Pine" text-label="Pine" selected>
        <calcite-combobox-item value="Pine Nested" text-label="Pine Nested"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Sequoia" text-label="Sequoia"></calcite-combobox-item>
    </calcite-combobox-item>
    <calcite-combobox-item value="Flowers" text-label="Flowers" selected>
      <calcite-combobox-item value="Daffodil" text-label="Daffodil"></calcite-combobox-item>
      <calcite-combobox-item value="Nasturtium" text-label="Nasturtium"></calcite-combobox-item>
    </calcite-combobox-item>
  </calcite-combobox>
\``,
      ...A.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-combobox-item
    description="the first installment in this thrilling series"
    selected
    short-heading="#1"
    text-label="1ne"
    value="one"
  >
    <calcite-icon icon="number-circle-1" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-2" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item
    description="the sequel to the smash hit 'one'"
    short-heading="#2"
    text-label="2woo"
    value="two"
  >
    <calcite-icon icon="number-circle-3" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-4" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
  <calcite-combobox-item
    description="the thrilling conclusion to the number series"
    short-heading="#3"
    text-label="Thr333"
    value="three"
  >
    <calcite-icon icon="number-circle-5" slot="content-start" scale="s"></calcite-icon>
    <calcite-icon icon="number-circle-6" slot="content-end" scale="s"></calcite-icon>
  </calcite-combobox-item>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="display: flex; gap: 48px; padding: 100px;">
    <div style="display: flex; flex-direction: column; gap: 48px;">
      <calcite-combobox open filter-text="Three" selection-mode="single" scale="s">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="m">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>

      <calcite-combobox open filter-text="Three" selection-mode="single" scale="l">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>

    <div>
      <calcite-combobox open allow-custom-values filter-text="Three" selection-mode="single">
        <calcite-combobox-item value="one" text-label="One"></calcite-combobox-item>
        <calcite-combobox-item value="two" text-label="Two"></calcite-combobox-item>
      </calcite-combobox>
    </div>
  </div>
\``,
      ...k.parameters?.docs?.source
    }
  }
};
const j = ["single", "smallViewport", "multiple", "nestedItems", "longItemsAllSelectionModes", "disabled_TestOnly", "flipPlacements_TestOnly", "flipPositioning_TestOnly", "darkModeRTL_TestOnly", "singleLongLabel_TestOnly", "withPlaceholderIcon_TestOnly", "withoutPlaceholderIcon_TestOnly", "scrollingWithoutMaxItems_TestOnly", "optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly", "mediumIconForLargeComboboxItem_TestOnly", "withSelectorIndicatorAndIcons_TestOnly", "nestedGroups_TestOnly", "clearDisabled_TestOnly", "openInAllScales_TestOnly", "openWithPlaceholderIconInAllScales_TestOnly", "validationMessageInAllScales_TestOnly", "readOnlyAllModes", "filterHighlighting", "withDescriptionIconsAndContentSlots", "selectAllEnabled", "withDescriptionShortLabelAndContentSlots", "noMatchesScaledOrAddCustomValue"];
export {
  j as __namedExportsOrder,
  S as clearDisabled_TestOnly,
  b as darkModeRTL_TestOnly,
  U as default,
  r as disabled_TestOnly,
  F as filterHighlighting,
  u as flipPlacements_TestOnly,
  a as flipPositioning_TestOnly,
  s as longItemsAllSelectionModes,
  y as mediumIconForLargeComboboxItem_TestOnly,
  n as multiple,
  l as nestedGroups_TestOnly,
  c as nestedItems,
  k as noMatchesScaledOrAddCustomValue,
  w as openInAllScales_TestOnly,
  T as openWithPlaceholderIconInAllScales_TestOnly,
  g as optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed_TestOnly,
  P as readOnlyAllModes,
  h as scrollingWithoutMaxItems_TestOnly,
  A as selectAllEnabled,
  x as single,
  d as singleLongLabel_TestOnly,
  i as smallViewport,
  f as validationMessageInAllScales_TestOnly,
  D as withDescriptionIconsAndContentSlots,
  o as withDescriptionShortLabelAndContentSlots,
  v as withPlaceholderIcon_TestOnly,
  t as withSelectorIndicatorAndIcons_TestOnly,
  p as withoutPlaceholderIcon_TestOnly
};
