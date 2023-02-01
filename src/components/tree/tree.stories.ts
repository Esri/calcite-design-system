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

const slottedDefaultDropdownSmallAction = html`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown">
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

const slottedSmallDropdownSmallAction = html`
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

const iconStartAndActionsEndSlottedDefaults = html`
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
    <a>Child 1</a>
    ${slottedDefaultDropdown} ${slottedDefaultDropdown}
  </calcite-tree-item>
  <calcite-tree-item expanded>
    <a>Child 2</a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item expanded>
        <a>Grandchild 1</a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
            <a>Great-Grandchild 1</a>
            ${slottedDefaultDropdown}${slottedDefaultDropdown}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}" expanded>
    <a>Child 3</a>
    ${slottedDefaultDropdown}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item icon-start="${select("icon-start", iconNames, "palette")}">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item expanded>
        <a>Grandchild 2</a>
        ${slottedDefaultDropdown}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedSmallAction = html`
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
            ${slottedDefaultDropdownSmallAction}${slottedDefaultDropdownSmallAction}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedSmallActionsEndAndAction = html`
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
            ${slottedSmallDropdownSmallAction}${slottedSmallDropdownSmallAction}
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
      delay: 1000
    }
  },
  ...storyFilters()
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

export const iconStartAndActionsEnd_TestOnly = (): string => html`
  <div style="width: 650px">
    <calcite-tree style="margin: 80px" scale="l"> ${iconStartAndActionsEndSlottedDefaults} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="m"> ${slottedSmallAction} </calcite-tree>
    <calcite-tree style="margin: 80px" scale="s"> ${slottedSmallActionsEndAndAction} </calcite-tree>
  </div>
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
          const dorpdownTriggerEl = document.querySelector("calcite-button#trigger");
          dorpdownTriggerEl.click();
        }, 1000);
      });
    </script>`;
