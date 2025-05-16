import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import type { Scale } from "../interfaces";
import { Tree } from "./tree";

/**
 * This decorator takes HTML for items and will create a composite story for all scales for each specified selection mode.
 *
 * @param itemsStory - the HTML story template for items
 * @param context - the context object
 * @param context.args - the args object
 * @param context.args.selectionMode - the selection mode(s) to use for the tree
 * @param context.args.lines
 * @returns the composite story for all scales for  specified selection mode
 */
function allScaleTreeBuilder(
  itemsStory: () => string,
  context: { args: { selectionMode: Tree["selectionMode"]; lines: boolean } },
): string {
  const items = itemsStory();
  const { selectionMode = "single", lines } = context.args;
  const scales: Scale[] = ["s", "m", "l"];

  return html`
    <style>
      .tree-container {
        flex: 1;
        margin-right: 10px;
      }
      .container {
        display: flex;
        justify-content: space-between;
      }
    </style>

    <div class="container">
      ${scales.map(
        (scale) => html`
          <div class="tree-container">
            <h3>${selectionMode} selection mode + ${scale} scale</h3>
            <calcite-tree selection-mode="${selectionMode}" ${lines ? "lines" : ""} scale="${scale}">
              ${items}
            </calcite-tree>
          </div>
        `,
      )}
    </div>
  `;
}

export default {
  title: "Components/Tree",
};

const treeItems = (expanded = true) => html`
  <calcite-tree-item label="test item">
    <a>Child 1</a>
  </calcite-tree-item>
  <calcite-tree-item label="test item" icon-start="palette" ${expanded ? "expanded" : ""}>
    <a>Child 2</a>
    <calcite-tree slot="children" icon-start="palette">
      <calcite-tree-item label="test item">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item label="test item" icon-start="palette" ${expanded ? "expanded" : ""}>
        <a>Grandchild 2</a>
        <calcite-tree slot="children" icon-start="palette">
          <calcite-tree-item label="test item">
            <a>Great-Grandchild 1</a>
          </calcite-tree-item>
          <calcite-tree-item label="test item" icon-start="palette">
            <a>Great-Grandchild 2</a>
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item label="test item" ${expanded ? "expanded" : ""}>
    <a>Child 3</a>
    <calcite-tree slot="children">
      <calcite-tree-item label="test item">
        <a>Grandchild 1</a>
      </calcite-tree-item>
      <calcite-tree-item>
        <a>Grandchild 2</a>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

const slottedDefaultDropdown = (scale: string) => html`
  <calcite-dropdown slot="actions-end" id="slottedDefaultDropdown" scale="${scale}">
    <calcite-action slot="trigger" icon="ellipsis"></calcite-action>
    <calcite-dropdown-group group-title="Settings" selection-mode="multiple">
      <calcite-dropdown-item>Group elements</calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group group-title="Display mode" selection-mode="single">
      <calcite-dropdown-item selected>Row</calcite-dropdown-item>
      <calcite-dropdown-item>Column</calcite-dropdown-item>
    </calcite-dropdown-group>
  </calcite-dropdown>
`;

const iconStartLargeActionsEnd = (scale: string) => html`
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 1 </a>
    ${slottedDefaultDropdown(scale)} ${slottedDefaultDropdown(scale)}
  </calcite-tree-item>
  <calcite-tree-item label="test item" expanded>
    <a>Child 2 </a>
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 1 </a>
        <calcite-tree slot="children" expanded>
          <calcite-tree-item label="test item" icon-start="palette" expanded>
            <a>Great - Grandchild 1 </a>
            ${slottedDefaultDropdown(scale)}${slottedDefaultDropdown(scale)}
          </calcite-tree-item>
        </calcite-tree>
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
  <calcite-tree-item label="test item" icon-start="palette" expanded>
    <a>Child 3 </a>
    ${slottedDefaultDropdown(scale)}
    <calcite-tree slot="children" expanded>
      <calcite-tree-item label="test item" icon-start="palette">
        <a>Grandchild 1 </a>
      </calcite-tree-item>
      <calcite-tree-item label="test item" expanded>
        <a>Grandchild 2 </a>
        ${slottedDefaultDropdown(scale)}
      </calcite-tree-item>
    </calcite-tree>
  </calcite-tree-item>
`;

export const singleSelectionMode = (): string => html` ${treeItems()} `;
singleSelectionMode.decorators = [allScaleTreeBuilder];
singleSelectionMode.args = { selectionMode: "single" };

export const selectionModeNone = (): string => html`${treeItems()}`;
selectionModeNone.decorators = [allScaleTreeBuilder];
selectionModeNone.args = { selectionMode: "none" };

export const linesRTL = (): string => html`<div dir="rtl">${treeItems()}</div>`;
linesRTL.decorators = [allScaleTreeBuilder];
linesRTL.args = { lines: true, selectionMode: "single" };

export const multipleSelectionModeWithLines_TestOnly = (): string => html` ${treeItems()} `;

multipleSelectionModeWithLines_TestOnly.decorators = [allScaleTreeBuilder];
multipleSelectionModeWithLines_TestOnly.args = { lines: true, selectionMode: "multiple" };

export const ancestorsSelectionModeWithLines_TestOnly = (): string => html` ${treeItems()} `;

ancestorsSelectionModeWithLines_TestOnly.decorators = [allScaleTreeBuilder];
ancestorsSelectionModeWithLines_TestOnly.args = { lines: true, selectionMode: "ancestors" };

export const singlePersistSelectionModeWithLines_TestOnly = (): string => html` ${treeItems()} `;

singlePersistSelectionModeWithLines_TestOnly.decorators = [allScaleTreeBuilder];
singlePersistSelectionModeWithLines_TestOnly.args = { lines: true, selectionMode: "single-persist" };

export const iconStartAndActionsEnd = (scale: string): string => html` ${iconStartLargeActionsEnd(scale)} `;
iconStartAndActionsEnd.decorators = [allScaleTreeBuilder];
iconStartAndActionsEnd.args = { selectionMode: "single" };

export const treeItemTextContentWraps_TestOnly = (): string => html`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
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
    <calcite-tree-item label="test item">
      <div>
        <span>content from tree item below should not be clipped 👇</span><span>:&nbsp;</span
        ><span class="string-value">✂️ 🚫clipped ✂️</span>
      </div>
    </calcite-tree-item>

    <calcite-tree-item label="test item">
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

export const darkModeRTL_TestOnly = (): string => html`<div dir="rtl">${treeItems()}</div> `;
darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
darkModeRTL_TestOnly.args = { selectionMode: "single" };
darkModeRTL_TestOnly.decorators = [allScaleTreeBuilder];

export const OverflowingSubtree = (): string =>
  html`<div style="width:400px">
      <calcite-tree>
        <calcite-tree-item label="test item" expanded id="two">
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="test item">
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
        <calcite-tree-item label="test item">
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
