import { select } from "@storybook/addon-knobs";
import { boolean, storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import treeItemReadme from "../tree-item/readme.md";
import readme from "./readme.md";

const treeItems = `
  <calcite-tree-item>
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item>
    <a>Child 2</a>
    <calcite-tree slot="children">
      <calcite-tree-item>
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
        <calcite-tree slot="children">
          <calcite-tree-item>
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item>
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

export const selectionModeNone = (): string => html`<calcite-tree
  ${boolean("lines", false)}
  selection-mode="${select("selection-mode", selectionModes, "none")}"
>
  ${treeItems}
</calcite-tree>`;

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
