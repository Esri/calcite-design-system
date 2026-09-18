/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { i as K } from "./helpers.js";
import { A as Q } from "./resources34.js";
import { b as l, o as $, m as X } from "./utils3.js";
import { h as e } from "./formatting.js";
import { a as Y } from "./modes.js";
import "./combobox.js";
import "./combobox-item.js";
import "./combobox-item-group.js";
import "./icon.js";
import "./label2.js";
var z = Object.freeze, Z = Object.defineProperty, ee = (o, L) => z(Z(o, "raw", { value: z(o.slice()) })), V;
const {
  menuPlacement: O,
  overlayPositioning: W,
  scale: U,
  selectionMode: oe,
  status: j
} = Q;
function R(o, L) {
  const H = o(), {
    selectionMode: E
  } = L.args, G = Array.isArray(E) ? E : [E], J = ["s", "m", "l"];
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

    ${G.map((M) => e`
          <div class="selection-mode-group">
            ${J.map((_) => e`
                  <div class="combobox-container">
                    <h3>${M} selection mode + ${_} scale</h3>
                    <calcite-combobox
                      placeholder="select element"
                      max-items="10"
                      selection-mode="${M}"
                      open
                      scale="${_}"
                    >
                      ${H}
                    </calcite-combobox>
                  </div>
                `).join("")}
          </div>
        `).join("")}
  `;
}
const re = {
  title: "Components/Controls/Combobox",
  args: {
    clearDisabled: !1,
    disabled: !1,
    label: "demo",
    labelText: "Label text",
    maxItems: 0,
    open: !1,
    overlayPositioning: W.defaultValue,
    placeholder: "placeholder",
    placement: O.defaultValue,
    readOnly: !1,
    required: !1,
    scale: U.defaultValue,
    selectionDisplay: "all",
    selectionMode: "single",
    status: j.defaultValue,
    validationIcon: "",
    validationMessage: ""
  },
  argTypes: {
    overlayPositioning: {
      options: W.values,
      control: {
        type: "select"
      }
    },
    placement: {
      options: O.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: U.values,
      control: {
        type: "select"
      }
    },
    selectionDisplay: {
      options: ["all", "fit", "single"],
      control: {
        type: "select"
      }
    },
    selectionMode: {
      options: oe.values.filter((o) => o !== "children" && o !== "multichildren" && o !== "none"),
      control: {
        type: "select"
      }
    },
    status: {
      options: j.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: K,
      control: {
        type: "select"
      }
    }
  }
}, s = (o) => e`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox
      ${l("clear-disabled", o.clearDisabled)}
      ${l("disabled", o.disabled)}
      label="${o.label}"
      ${$("label-text", o.labelText)}
      max-items="${o.maxItems}"
      ${l("open", o.open)}
      overlay-positioning="${o.overlayPositioning}"
      placeholder="${o.placeholder}"
      placement="${o.placement}"
      ${l("read-only", o.readOnly)}
      ${l("required", o.required)}
      scale="${o.scale}"
      selection-display="${o.selectionDisplay}"
      selection-mode="${o.selectionMode}"
      status="${o.status}"
      ${$("validation-icon", o.validationIcon)}
      validation-message="${o.validationMessage}"
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
`, m = () => e`
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
m.parameters = {
  chromatic: {
    modes: {
      small: Y.widthSmall
    }
  }
};
const d = () => e`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected except disabled item
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with disabled selected item
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
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
`, i = () => e`
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
i.args = {
  selectionMode: "multiple"
};
i.decorators = [R];
const ce = e`
  <style>
    calcite-combobox {
      width: 260px;
    }
    calcite-combobox-item {
      width: 260px;
    }
  </style>
`, x = () => e`
  ${ce}
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
`, r = () => e`<calcite-combobox disabled>
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
  </calcite-combobox>`, u = () => e`<calcite-combobox placement="top-start" open>
    <calcite-combobox-item value="1" heading="one" icon="number-circle-1"></calcite-combobox-item>
    <calcite-combobox-item value="2" heading="two" icon="number-circle-2"></calcite-combobox-item>
    <calcite-combobox-item value="3" heading="three" icon="number-circle-3"></calcite-combobox-item>
  </calcite-combobox>`, h = () => e(V || (V = ee([`
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
  <\/script>
`]))), b = () => e`
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
b.parameters = {
  layout: "fullscreen"
};
const g = () => e`
  <style>
    .selection-appearance-group {
      display: flex;
      gap: 24px;
      margin-bottom: 250px;
    }
    .selection-appearance-group > div {
      flex: 1;
    }
  </style>
  <div class="selection-appearance-group">
    <div>
      <h3>single</h3>
      <calcite-combobox
        open
        selection-mode="single"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox>
    </div>
    <div>
      <h3>multiple</h3>
      <calcite-combobox
        open
        selection-mode="multiple"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox>
    </div>
    <div>
      <h3>ancestors</h3>
      <calcite-combobox
        open
        selection-mode="ancestors"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </div>
  </div>
`, n = () => e`
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
n.parameters = {
  themes: X
};
const v = () => e`
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
`, p = () => e` <calcite-combobox
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
  </calcite-combobox>`, S = () => e` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" heading="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" heading="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" heading="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>`, y = () => e`
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
`, f = () => e`
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
`, w = () => e`
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
`, a = () => e`
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
a.args = {
  selectionMode: "multiple"
};
a.decorators = [R];
const t = () => e`
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
t.args = {
  selectionMode: "multiple"
};
t.decorators = [R];
const P = () => e`
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
`, F = () => e`
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
`, T = () => e`
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
`, D = () => e`
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
`, q = () => e`
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
`, k = () => e`
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
`, A = () => e`
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
`, N = () => e`
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
`, c = () => e`
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
`, I = () => e`
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
c.args = {
  selectionMode: ["single", "multiple"]
};
c.decorators = [R];
c.parameters = {
  chromatic: {
    delay: 1e3
  }
};
const B = () => e` <calcite-combobox placeholder="Select a field" max-items="5" open>
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
  </calcite-combobox>`, C = () => e`
  <style>
    .disabled-enabled-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
      align-items: start;
    }

    .disabled-enabled-grid > calcite-combobox {
      margin-bottom: 120px;
    }
  </style>
  <div class="disabled-enabled-grid">
    <calcite-combobox
      selection-display="all"
      selection-mode="multiple"
      placeholder="placeholder"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox selection-mode="multiple" select-all-enabled selection-display="fit" open>
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine">
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      style="margin-top:450px; margin-bottom:30px;"
      selection-mode="multiple"
      selection-display="single"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers" selected>
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      style="margin-top:450px; margin-bottom:30px;"
      selection-display="all"
      selection-mode="ancestors"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil" selected></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>
  </div>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: ComboboxStoryArgs): string => html\`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox
      \${boolean("clear-disabled", args.clearDisabled)}
      \${boolean("disabled", args.disabled)}
      label="\${args.label}"
      \${optionalAttribute("label-text", args.labelText)}
      max-items="\${args.maxItems}"
      \${boolean("open", args.open)}
      overlay-positioning="\${args.overlayPositioning}"
      placeholder="\${args.placeholder}"
      placement="\${args.placement}"
      \${boolean("read-only", args.readOnly)}
      \${boolean("required", args.required)}
      scale="\${args.scale}"
      selection-display="\${args.selectionDisplay}"
      selection-mode="\${args.selectionMode}"
      status="\${args.status}"
      \${optionalAttribute("validation-icon", args.validationIcon)}
      validation-message="\${args.validationMessage}"
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
\``,
      ...s.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
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
\``,
      ...m.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <h2>selection-display="all" (default)</h2>
    <calcite-label>
      Some selected
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected except disabled item
      <calcite-combobox
        label="test"
        placeholder="Select items"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
          <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </calcite-label>
    <calcite-label>
      All selected with disabled selected item
      <calcite-combobox
        label="test"
        placeholder="Select any items you want"
        max-items="10"
        scale="m"
        selection-display="fit"
        placeholder-icon="car"
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item selected value="Pine" selected heading="Pine">
            <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
          </calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" disabled heading="Sequoia" disabled></calcite-combobox-item>
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
        select-all-enabled
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
\``,
      ...d.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...i.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  \${style}
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
\``,
      ...x.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-combobox disabled>
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
      originalSource: `(): string => html\`<calcite-combobox placement="top-start" open>
    <calcite-combobox-item value="1" heading="one" icon="number-circle-1"></calcite-combobox-item>
    <calcite-combobox-item value="2" heading="two" icon="number-circle-2"></calcite-combobox-item>
    <calcite-combobox-item value="3" heading="three" icon="number-circle-3"></calcite-combobox-item>
  </calcite-combobox>\``,
      ...u.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
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
  <\/script>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...b.parameters?.docs?.source
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
    .selection-appearance-group {
      display: flex;
      gap: 24px;
      margin-bottom: 250px;
    }
    .selection-appearance-group > div {
      flex: 1;
    }
  </style>
  <div class="selection-appearance-group">
    <div>
      <h3>single</h3>
      <calcite-combobox
        open
        selection-mode="single"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox>
    </div>
    <div>
      <h3>multiple</h3>
      <calcite-combobox
        open
        selection-mode="multiple"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox>
    </div>
    <div>
      <h3>ancestors</h3>
      <calcite-combobox
        open
        selection-mode="ancestors"
        selection-appearance="highlight"
        label="demo"
        placeholder="select element"
      >
        <calcite-combobox-item value="Trees" heading="Trees" selected>
          <calcite-combobox-item value="Pine" heading="Pine" selected></calcite-combobox-item>
          <calcite-combobox-item value="Sequoia" heading="Sequoia"></calcite-combobox-item>
        </calcite-combobox-item>
      </calcite-combobox>
    </div>
  </div>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
\``,
      ...n.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...v.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
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
    <calcite-combobox-item value="root" heading="username" icon="home"></calcite-combobox-item>
    <calcite-combobox-item value="1" heading="Folder 1" icon="folder"></calcite-combobox-item>
    <calcite-combobox-item value="2" heading="Folder 2" icon="folder"></calcite-combobox-item>
  </calcite-combobox>\``,
      ...p.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:400px;max-width:100%;background-color:white;padding:100px">
    <calcite-combobox placeholder="select folder" selection-mode="multiple" open>
      <calcite-combobox-item value="root" heading="username" icon="home" selected></calcite-combobox-item>
      <calcite-combobox-item value="1" heading="Folder 1" icon="folder"></calcite-combobox-item>
      <calcite-combobox-item value="2" heading="Folder 2" icon="folder"></calcite-combobox-item>
    </calcite-combobox>
  </div>\``,
      ...S.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...y.parameters?.docs?.source
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
\``,
      ...f.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...w.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...a.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...t.parameters?.docs?.source
    }
  }
};
P.parameters = {
  ...P.parameters,
  docs: {
    ...P.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...F.parameters?.docs?.source
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
\``,
      ...T.parameters?.docs?.source
    }
  }
};
D.parameters = {
  ...D.parameters,
  docs: {
    ...D.parameters?.docs,
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
\``,
      ...D.parameters?.docs?.source
    }
  }
};
q.parameters = {
  ...q.parameters,
  docs: {
    ...q.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...q.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...k.parameters?.docs?.source
    }
  }
};
A.parameters = {
  ...A.parameters,
  docs: {
    ...A.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...A.parameters?.docs?.source
    }
  }
};
N.parameters = {
  ...N.parameters,
  docs: {
    ...N.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...N.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...c.parameters?.docs?.source
    }
  }
};
I.parameters = {
  ...I.parameters,
  docs: {
    ...I.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
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
\``,
      ...I.parameters?.docs?.source
    }
  }
};
B.parameters = {
  ...B.parameters,
  docs: {
    ...B.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <calcite-combobox placeholder="Select a field" max-items="5" open>
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
  </calcite-combobox>\``,
      ...B.parameters?.docs?.source
    }
  }
};
C.parameters = {
  ...C.parameters,
  docs: {
    ...C.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .disabled-enabled-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
      align-items: start;
    }

    .disabled-enabled-grid > calcite-combobox {
      margin-bottom: 120px;
    }
  </style>
  <div class="disabled-enabled-grid">
    <calcite-combobox
      selection-display="all"
      selection-mode="multiple"
      placeholder="placeholder"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir" selected></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox selection-mode="multiple" select-all-enabled selection-display="fit" open>
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine">
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      style="margin-top:450px; margin-bottom:30px;"
      selection-mode="multiple"
      selection-display="single"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees">
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested"></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers" selected>
        <calcite-combobox-item value="Daffodil" heading="Daffodil"></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>

    <calcite-combobox
      style="margin-top:450px; margin-bottom:30px;"
      selection-display="all"
      selection-mode="ancestors"
      select-all-enabled
      open
    >
      <calcite-combobox-item value="Trees" heading="Trees" selected>
        <calcite-combobox-item value="Pine" heading="Pine" selected>
          <calcite-combobox-item value="Pine Nested" heading="Pine Nested" selected></calcite-combobox-item>
        </calcite-combobox-item>
        <calcite-combobox-item value="Sequoia" heading="Sequoia" disabled selected></calcite-combobox-item>
        <calcite-combobox-item value="Douglas Fir" heading="Douglas Fir"></calcite-combobox-item>
        <calcite-combobox-item value="Cedar" heading="Cedar" disabled></calcite-combobox-item>
      </calcite-combobox-item>
      <calcite-combobox-item value="Flowers" heading="Flowers">
        <calcite-combobox-item value="Daffodil" heading="Daffodil" selected></calcite-combobox-item>
        <calcite-combobox-item value="Nasturtium" heading="Nasturtium" disabled></calcite-combobox-item>
      </calcite-combobox-item>
    </calcite-combobox>
  </div>
\``,
      ...C.parameters?.docs?.source
    }
  }
};
const ue = ["simple", "smallViewport", "multiple", "nestedItems", "longItemsAllSelectionModes", "disabled", "placement", "flipPlacements", "flipPositioning", "selectionAppearanceHighlight", "darkModeRTL", "singleLongLabel", "withPlaceholderIcon", "withoutPlaceholderIcon", "scrollingWithoutMaxItems", "optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed", "mediumIconForLargeComboboxItem", "withSelectorIndicatorAndIcons", "nestedGroups", "clearDisabled", "openInAllScales", "openWithPlaceholderIconInAllScales", "validationMessageInAllScales", "readOnlyAllModes", "filterHighlighting", "withDescriptionIconsAndContentSlots", "selectAllEnabled", "withDescriptionShortLabelAndContentSlots", "noMatchesScaledOrAddCustomValue", "maxItems", "disabledEnabled"];
export {
  ue as __namedExportsOrder,
  P as clearDisabled,
  n as darkModeRTL,
  re as default,
  r as disabled,
  C as disabledEnabled,
  k as filterHighlighting,
  h as flipPlacements,
  b as flipPositioning,
  x as longItemsAllSelectionModes,
  B as maxItems,
  w as mediumIconForLargeComboboxItem,
  d as multiple,
  t as nestedGroups,
  i as nestedItems,
  I as noMatchesScaledOrAddCustomValue,
  F as openInAllScales,
  T as openWithPlaceholderIconInAllScales,
  f as optionListMinWidthMatchesInputWhenOverlayPositioningIsFixed,
  u as placement,
  q as readOnlyAllModes,
  y as scrollingWithoutMaxItems,
  N as selectAllEnabled,
  g as selectionAppearanceHighlight,
  s as simple,
  v as singleLongLabel,
  m as smallViewport,
  D as validationMessageInAllScales,
  A as withDescriptionIconsAndContentSlots,
  c as withDescriptionShortLabelAndContentSlots,
  p as withPlaceholderIcon,
  a as withSelectorIndicatorAndIcons,
  S as withoutPlaceholderIcon
};
