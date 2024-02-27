import { select } from "@storybook/addon-knobs";
import { boolean, iconNames, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import treeItemReadme from "../tree-item/readme.md";
import readme from "./readme.md";

const treeItems = html`
  <calcite-tree-item>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
    <a>Child 2</a>
    <calcite-tree slot="children" icon-start="${select("icon-start", iconNames, "palette")}">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
        <a>Grandchild 2</a>
        <calcite-tree slot="children" icon-start="${select("icon-start", iconNames, "palette")}">
          <calcite-tree-item>
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
            <a>Great-Grandchild 2</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 3</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedLargeDropdown = html`
  <calcite-dropdown slot="actions-end" id="slottedLargeDropdown" scale="l">
    <calcite-action slot="trigger" icon="ellipsis" scale="l"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multi">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

const slottedDefaultDropdown = html`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown">
    <calcite-action slot="trigger" icon="ellipsis"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multi">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

const slottedSmallDropdown = html`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown" scale="s">
    <calcite-action slot="trigger" icon="ellipsis" scale="s"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multi">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

const iconStartLargeActionsEnd = html`
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
    <a>Child 1</a>
    ${slottedLargeDropdown} ${slottedLargeDropdown}
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedLargeDropdown}${slottedLargeDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
    <a>Child 3</a>
    ${slottedLargeDropdown}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item expanded>
        <a>Grandchild 2</a>
        ${slottedLargeDropdown}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedDefaultActionsEnd = html`
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="palette" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedDefaultDropdown}${slottedDefaultDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedSmallActionsEnd = html`
  <calcite-tree-item icon-start="palette" expanded>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="palette" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedSmallDropdown}${slottedSmallDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

export default {
  title: "Components/Tree",
  parameters: {
    notes: [readme, treeItemReadme],
    chromatic: {
      delay: 1000,
    },
  },
  ...storyFilters(),
};

const selectionModes = ["single", "children", "multichildren", "ancestors", "none", "multiple"];

export const simple = (): string => html`
  <calcite-tree
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", selectionModes, "single")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    ${treeItems}
  </calcite-tree>
`;

export const selectionModeNone = (): string => html`
  <calcite-tree ${boolean("lines", false)} selection-mode="${select("selection-mode", selectionModes, "none")}"
    >${treeItems}</calcite-tree
  >
`;

export const withLines_TestOnly = (): string => html`
  <calcite-tree lines>
    <calcite-tree-item> Child 1 </calcite-tree-item>
    <calcite-tree-item expanded>
      Child 2
      <calcite-tree slot="children">
        <calcite-tree-item> Grandchild 1 </calcite-tree-item>
        <calcite-tree-item> Grandchild 2 </calcite-tree-item>
        <calcite-tree-item expanded>
          Grandchild 3
          <calcite-tree slot="children">
            <calcite-tree-item> Great-Grandchild 1 </calcite-tree-item>
            <calcite-tree-item> Great-Grandchild 2 </calcite-tree-item>
            <calcite-tree-item> Great-Grandchild 3 </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>
`;

export const iconStartAndActionsEnd = (): string => html`
  <div style="width: 650px">
    <calcite-tree style="margin: 80px" scale="l"> ${iconStartLargeActionsEnd} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="m"> ${slottedDefaultActionsEnd} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="s"> ${slottedSmallActionsEnd} </calcite-tree>
  </div>
`;

export const treeItemTextContentWraps_TestOnly = (): string => html`
  <calcite-tree style="width: 300px">
    <calcite-tree-item>
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
`;

export const treeItemContentIsNotClipped_TestOnly = (): string => html`
  <style>
    .string-value {
      white-space: pre-wrap;
    }
  </style>
  <calcite-tree>
    <calcite-tree-item>
      <div>
        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span
        ><span class="string-value">✂️ 🚫clipped ✂️</span>
      </div>
    </calcite-tree-item>

    <calcite-tree-item>
      <div>
        <span>value</span><span>:&nbsp;</span
        ><!-- formatting (single-lining JSON) hides the issue, so we disable it -->
        <!-- prettier-ignore -->
        <span class="string-value">{
          "spatialReference": {
            "latestWkid": 3857,
            "wkid": 102100
          },
          "x": -8443894.052,
          "y": 5664504.875700004
        }</span>
      </div>
    </calcite-tree-item>
  </calcite-tree>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-tree
    class="calcite-mode-dark"
    dir="rtl"
    ${boolean("lines", false)}
    selection-mode="${select("selection-mode", selectionModes, "single")}"
    scale="${select("scale", ["s", "m", "l"], "m")}"
  >
    ${treeItems}
  </calcite-tree>
`;
darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const OverflowingSubtree = (): string =>
  html`<div style="width:400px">
      <calcite-tree>
        <calcite-tree-item expanded id="two">
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item>
              <span class="title">Layer 2.1</span>
              <calcite-dropdown placement="bottom-trailing">
                <calcite-button
                  appearance="transparent"
                  color="neutral"
                  icon-start="ellipsis"
                  slot="trigger"
                  id="trigger"
                ></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item>
          <span class="title">Layer 3</span>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      window.addEventListener("load", () => {
        setTimeout(() => {
          const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
          dropdownTriggerEl.click();
        }, 1000);
      });
    </script>`;

export const allSelectionModesExpanded_TestOnly = (): string => html`
  <h2>ancestors</h2>
  <calcite-tree selection-mode="ancestors">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>children</h2>
  <calcite-tree selection-mode="children">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>multichildren</h2>
  <calcite-tree selection-mode="multichildren">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>multiple</h2>
  <calcite-tree selection-mode="multiple">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>none</h2>
  <calcite-tree selection-mode="none">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>single</h2>
  <calcite-tree selection-mode="single">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>

  <h2>single-persist</h2>
  <calcite-tree selection-mode="single-persist">
    <calcite-tree-item> <span>Child 1</span> </calcite-tree-item>

    <calcite-tree-item expanded>
      <span>Child 2</span>

      <calcite-tree slot="children">
        <calcite-tree-item> <span>Grandchild 1</span> </calcite-tree-item>

        <calcite-tree-item> <span>Grandchild 2</span> </calcite-tree-item>

        <calcite-tree-item>
          <span>Grandchild 3</span>
          <calcite-tree slot="children">
            <calcite-tree-item> <span>Great-Grandchild 1</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 2</span> </calcite-tree-item>
            <calcite-tree-item> <span>Great-Grandchild 3</span> </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </calcite-tree-item>
  </calcite-tree>
`;
