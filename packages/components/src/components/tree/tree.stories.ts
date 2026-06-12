import { Decorator } from "@storybook/web-components-vite";
import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import type { Scale } from "../interfaces";
import type { Tree } from "./tree";

type TreeStoryArgs = Pick<Tree, "lines" | "scale" | "selectionMode">;

/**
 * This decorator takes HTML for items and will create a composite story for all scales for each specified selection mode.
 *
 * @returns the composite story for all scales for the specified selection mode
 */
const allScaleTreeBuilder: Decorator = (itemsStory, context): string => {
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
};

export default {
  title: "Components/Tree",
  args: {
    lines: false,
    scale: "m",
    selectionMode: "single",
  },
  argTypes: {
    selectionMode: {
      options: ["none", "single", "single-persist", "multiple", "ancestors"],
      control: { type: "select" },
    },
    scale: {
      options: ["s", "m", "l"],
      control: { type: "select" },
    },
  },
  parameters: {
    chromatic: {
      delay: 1000,
    },
  },
};

const treeItems = (expanded = true, isSelectionModeNone = false) => html`
  <calcite-tree-item label="test item" ${!isSelectionModeNone ? "selected" : ""}>
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

export const simple = (args: TreeStoryArgs): string => html`
  <calcite-tree selection-mode="${args.selectionMode}" ${boolean("lines", args.lines)} scale="${args.scale}">
    ${treeItems(true, args.selectionMode === "none")}
  </calcite-tree>
`;

export const singleSelectionMode = (): string => html` ${treeItems()} `;
singleSelectionMode.decorators = [allScaleTreeBuilder];
singleSelectionMode.args = { selectionMode: "single" };

export const selectionModeNone = (): string => html`${treeItems(true, true)}`;
selectionModeNone.decorators = [allScaleTreeBuilder];
selectionModeNone.args = { selectionMode: "none" };

export const linesRTL = (): string => html`<div dir="rtl">${treeItems()}</div>`;
linesRTL.decorators = [allScaleTreeBuilder];
linesRTL.args = { lines: true, selectionMode: "single" };

export const multipleSelectionModeWithLines = (): string => html` ${treeItems()} `;

multipleSelectionModeWithLines.decorators = [allScaleTreeBuilder];
multipleSelectionModeWithLines.args = { lines: true, selectionMode: "multiple" };

export const ancestorsSelectionModeWithLines = (): string => html` ${treeItems()} `;

ancestorsSelectionModeWithLines.decorators = [allScaleTreeBuilder];
ancestorsSelectionModeWithLines.args = { lines: true, selectionMode: "ancestors" };

export const singlePersistSelectionModeWithLines = (): string => html` ${treeItems()} `;

singlePersistSelectionModeWithLines.decorators = [allScaleTreeBuilder];
singlePersistSelectionModeWithLines.args = { lines: true, selectionMode: "single-persist" };

export const iconStartAndActionsEnd = (scale: string): string => html` ${iconStartLargeActionsEnd(scale)} `;
iconStartAndActionsEnd.decorators = [allScaleTreeBuilder];
iconStartAndActionsEnd.args = { selectionMode: "single" };

export const treeItemTextContentWraps = (): string => html`
  <calcite-tree style="width: 300px">
    <calcite-tree-item label="test item">
      <span>Possibly_long_tree_item_name_because_it_is_a_user_generated_layer_name</span>
    </calcite-tree-item>
  </calcite-tree>
`;

export const treeItemContentIsNotClipped = (): string => html`
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

export const darkModeRTL = (): string => html`<div dir="rtl">${treeItems()}</div> `;
darkModeRTL.parameters = { themes: modesDarkDefault };
darkModeRTL.args = { selectionMode: "single" };
darkModeRTL.decorators = [allScaleTreeBuilder];

export const OverflowingSubtree = (): string =>
  html`<div style="width:400px">
      <calcite-tree lines>
        <calcite-tree-item label="nested items" expanded>
          Layer 2
          <calcite-tree slot="children">
            <calcite-tree-item label="dropdown item">
              <span class="title">Layer 2.1</span>
              <calcite-dropdown>
                <calcite-button icon-start="ellipsis" id="trigger" slot="trigger"></calcite-button>
                <calcite-dropdown-group>
                  <calcite-dropdown-item icon-start="trash">Remove</calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
        <calcite-tree-item label="single item">
          <span class="title">Layer 3</span>
        </calcite-tree-item>
        <calcite-tree-item expanded label="multiple flat items">
          Layer 4
          <calcite-tree slot="children">
            <calcite-tree-item>Layer 4.1</calcite-tree-item>
            <calcite-tree-item>Layer 4.2</calcite-tree-item>
            <calcite-tree-item>Layer 4.3</calcite-tree-item>
            <calcite-tree-item>Layer 4.4</calcite-tree-item>
            <calcite-tree-item>Layer 4.5</calcite-tree-item>
            <calcite-tree-item>Layer 4.6</calcite-tree-item>
            <calcite-tree-item>Layer 4.7</calcite-tree-item>
            <calcite-tree-item>Layer 4.8</calcite-tree-item>
            <calcite-tree-item>Layer 4.9</calcite-tree-item>
            <calcite-tree-item>Layer 4.10</calcite-tree-item>
            <calcite-tree-item>Layer 4.11</calcite-tree-item>
            <calcite-tree-item>Layer 4.12</calcite-tree-item>
            <calcite-tree-item>Layer 4.13</calcite-tree-item>
            <calcite-tree-item>Layer 4.14</calcite-tree-item>
            <calcite-tree-item>Layer 4.15</calcite-tree-item>
            <calcite-tree-item>Layer 4.16</calcite-tree-item>
            <calcite-tree-item>Layer 4.17</calcite-tree-item>
            <calcite-tree-item>Layer 4.18</calcite-tree-item>
            <calcite-tree-item>Layer 4.19</calcite-tree-item>
            <calcite-tree-item>Layer 4.20</calcite-tree-item>
            <calcite-tree-item>Layer 4.21</calcite-tree-item>
            <calcite-tree-item>Layer 4.22</calcite-tree-item>
            <calcite-tree-item>Layer 4.23</calcite-tree-item>
            <calcite-tree-item>Layer 4.24</calcite-tree-item>
            <calcite-tree-item>Layer 4.25</calcite-tree-item>
            <calcite-tree-item>Layer 4.26</calcite-tree-item>
            <calcite-tree-item>Layer 4.27</calcite-tree-item>
            <calcite-tree-item>Layer 4.28</calcite-tree-item>
            <calcite-tree-item>Layer 4.29</calcite-tree-item>
            <calcite-tree-item>Layer 4.30</calcite-tree-item>
          </calcite-tree>
        </calcite-tree-item>
      </calcite-tree>
    </div>
    <script>
      (async () => {
        const dropdownTriggerEl = document.querySelector("calcite-button#trigger");
        await customElements.whenDefined("calcite-button");
        await dropdownTriggerEl.componentOnReady();
        dropdownTriggerEl.click();
      })();
    </script>`;
