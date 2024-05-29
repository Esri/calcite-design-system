import { placeholderImage } from "../.storybook/placeholderImage";

interface CustomThemeArgs {
  calciteColorBrand: string;
  calciteColorBrandHover: string;
  calciteColorBrandPress: string;
  calciteColorStatusInfo: string;
  calciteColorStatusSuccess: string;
  calciteColorStatusWarning: string;
  calciteColorStatusDanger: string;
  calciteColorStatusDangerHover: string;
  calciteColorStatusDangerPress: string;
  calciteColorBackground: string;
  calciteColorForeground1: string;
  calciteColorForeground2: string;
  calciteColorForeground3: string;
  calciteColorText1: string;
  calciteColorText2: string;
  calciteColorText3: string;
  calciteColorTextInverse: string;
  calciteColorTextLink: string;
  calciteColorBorder1: string;
  calciteColorBorder2: string;
  calciteColorBorder3: string;
  calciteColorBorderInput: string;
  calciteUiIconColor: string;
}

export default {
  title: "Theming/Custom Theme",
  args: {
    calciteColorBrand: "#007ac2",
    calciteColorBrandHover: "#00619b",
    calciteColorBrandPress: "#004874",
    calciteColorStatusInfo: "#00619b",
    calciteColorStatusSuccess: "#35ac46",
    calciteColorStatusWarning: "#edd317",
    calciteColorStatusDanger: "#d83020",
    calciteColorStatusDangerHover: "#a82b1e",
    calciteColorStatusDangerPress: "#7c1d13",
    calciteColorBackground: "#f8f8f8",
    calciteColorForeground1: "#ffffff",
    calciteColorForeground2: "#f3f3f3",
    calciteColorForeground3: "#eaeaea",
    calciteColorText1: "#151515",
    calciteColorText2: "#4a4a4a",
    calciteColorText3: "#6a6a6a",
    calciteColorTextInverse: "#ffffff",
    calciteColorTextLink: "#00619b",
    calciteColorBorder1: "#cacaca",
    calciteColorBorder2: "#d4d4d4",
    calciteColorBorder3: "#dfdfdf",
    calciteColorBorderInput: "#949494",
    calciteUiIconColor: "currentColor",
  },
};

export const themingInteractive = (args: CustomThemeArgs): string => {
  return `<div
    style="
      --calcite-color-brand: ${args.calciteColorBrand};
      --calcite-color-brand-hover: ${args.calciteColorBrandHover};
      --calcite-color-brand-press: ${args.calciteColorBrandPress};
      --calcite-color-status-info: ${args.calciteColorStatusInfo};
      --calcite-color-status-success: ${args.calciteColorStatusSuccess};
      --calcite-color-status-warning: ${args.calciteColorStatusWarning};
      --calcite-color-status-danger: ${args.calciteColorStatusDanger};
      --calcite-color-status-danger-hover: ${args.calciteColorStatusDangerHover};
      --calcite-color-status-danger-press: ${args.calciteColorStatusDangerPress};
      --calcite-color-background: ${args.calciteColorBackground};
      --calcite-color-foreground-1: ${args.calciteColorForeground1};
      --calcite-color-foreground-2: ${args.calciteColorForeground2};
      --calcite-color-foreground-3: ${args.calciteColorForeground3};
      --calcite-color-text-1: ${args.calciteColorText1};
      --calcite-color-text-2: ${args.calciteColorText2};
      --calcite-color-text-3: ${args.calciteColorText3};
      --calcite-color-text-inverse: ${args.calciteColorTextInverse};
      --calcite-color-text-link: ${args.calciteColorTextLink};
      --calcite-color-border-1: ${args.calciteColorBorder1};
      --calcite-color-border-2: ${args.calciteColorBorder2};
      --calcite-color-border-3: ${args.calciteColorBorder3};
      --calcite-color-border-input: ${args.calciteColorBorderInput};
      --calcite-ui-icon-color: ${args.calciteUiIconColor};
    "
  >
    <style>
      .demo {
        display: flex;
        align-items: flex-start;
      }
      .demo-column {
        flex: 0;
        width: 320px;
      }
      .demo-column + .demo-column {
        margin-left: 4rem;
      }
      .demo-column > * {
        margin-bottom: 2rem;
      }
    </style>
    <div class="demo">
      <div class="demo-column">
        <calcite-accordion>
          <calcite-accordion-item heading="Accordion Item"
            ><img src="${placeholderImage({ width: 300, height: 200 })}" />
          </calcite-accordion-item>
          <calcite-accordion-item heading="Accordion Item 2"
            ><img src="${placeholderImage({ width: 300, height: 200 })}" />
          </calcite-accordion-item>
          <calcite-accordion-item heading="Accordion Item 3"
            ><img src="${placeholderImage({ width: 300, height: 200 })}" />
          </calcite-accordion-item>
          <calcite-accordion-item heading="Accordion Item 4"
            ><img src="${placeholderImage({ width: 300, height: 200 })}" />
          </calcite-accordion-item>
          <calcite-accordion-item heading="Accordion Item 5" expanded>
            <calcite-tree lines>
              <calcite-tree-item>
                Child 1
              </calcite-tree-item>
              <calcite-tree-item>
                Child 2
                <calcite-tree slot="children">
                  <calcite-tree-item>
                    Grandchild 1
                  </calcite-tree-item>
                  <calcite-tree-item>
                    Grandchild 2
                    <calcite-tree slot="children">
                      <calcite-tree-item>
                        Great-Grandchild 1
                      </calcite-tree-item>
                      <calcite-tree-item>
                        Great-Grandchild 2
                      </calcite-tree-item>
                    </calcite-tree>
                  </calcite-tree-item>
                </calcite-tree>
              </calcite-tree-item>
              <calcite-tree-item>
                Child 3
              </calcite-tree-item>
            </calcite-tree>
          </calcite-accordion-item>
        </calcite-accordion>
        <calcite-notice kind="danger" scale="s" open>
          <div slot="title">Something failed</div>
          <div slot="message">
            There was an error while performing the task.
          </div>
          <calcite-link slot="link" title="my action">Retry</calcite-link>
        </calcite-notice>
        <calcite-notice icon kind="success" scale="s" open closable>
          <div slot="title">Something worked</div>
          <div slot="message">
            That thing you wanted to do worked as expected
          </div>
        </calcite-notice>
        <calcite-label>
          Segmented Control
          <calcite-segmented-control>
            <calcite-segmented-control-item value="react" checked>React</calcite-segmented-control-item>
            <calcite-segmented-control-item value="ember">Ember</calcite-segmented-control-item>
            <calcite-segmented-control-item value="angular">Angular</calcite-segmented-control-item>
            <calcite-segmented-control-item value="vue">Vue</calcite-segmented-control-item>
          </calcite-segmented-control>
        </calcite-label>
        <calcite-icon icon="3d-glasses"></calcite-icon>
      </div>
      <div class="demo-column">
        <div>
          <calcite-card selected selectable>
            <img
              alt="thumbnail"
              slot="thumbnail"
              style="width:260px"
              src="${placeholderImage({ width: 260, height: 160 })}"
            />
            <h3 slot="title">Selectable card</h3>
            <calcite-link slot="footer-start">Lead füt</calcite-link>
            <calcite-link slot="footer-end">Trail füt</calcite-link>
          </calcite-card>
        </div>
        <div>
          <calcite-dropdown>
            <calcite-button slot="trigger">Primary</calcite-button>
            <calcite-dropdown-group group-title="View">
              <calcite-dropdown-item icon-start="list-bullet" selected>List</calcite-dropdown-item>
              <calcite-dropdown-item icon-start="grid">Grid</calcite-dropdown-item>
              <calcite-dropdown-item icon-start="table">Table</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
          <calcite-button appearance="outline">Outline</calcite-button>
          <calcite-button kind="danger">Red</calcite-button>
        </div>
        <div>
          <label>
            <calcite-checkbox indeterminate></calcite-checkbox>
            Initially indeterminate and unchecked
          </label>
        </div>
        <div>
          <calcite-chip>Neutral</calcite-chip>
          <calcite-chip kind="inverse">Inverse</calcite-chip>
          <calcite-chip kind="brand">Brand</calcite-chip>
        </div>
        <div>
          <calcite-chip appearance="outline-fill">Neutral</calcite-chip>
          <calcite-chip appearance="outline-fill" kind="inverse">Inverse</calcite-chip>
          <calcite-chip appearance="outline-fill" kind="brand">Brand</calcite-chip>
        </div>
        <calcite-pagination total-items="1200" page-size="100" start-item="1"></calcite-pagination>
        <calcite-slider
          min="0"
          max="100"
          min-value="50"
          max-value="85"
          step="1"
          min-label="Temperature range (lower)"
          max-label="Temperature range (upper)"
        ></calcite-slider>
      </div>
      <div class="demo-column">
        <calcite-date-picker scale="m" value="2020-11-27"></calcite-date-picker>
        <calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title selected>Tab 1 Title</calcite-tab-title>
            <calcite-tab-title>Tab 2 Title</calcite-tab-title>
            <calcite-tab-title>Tab 3 Title</calcite-tab-title>
            <calcite-tab-title>Tab 4 Title</calcite-tab-title>
          </calcite-tab-nav>
        </calcite-tabs>
        <calcite-loader class="chromatic-ignore"></calcite-loader>
        <label>
          <calcite-switch scale="m" checked> </calcite-switch>
          Red switch scale medium
        </label>
      </div>
    </div>
  </div>`;
};
