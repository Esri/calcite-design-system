import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Menu } from "./menu";

const { layout } = ATTRIBUTES;

type MenuStoryArgs = Pick<Menu, "label" | "layout">;

export default {
  title: "Components/Menu",
  args: {
    label: "Menu",
    layout: layout.defaultValue,
  },
  argTypes: {
    layout: {
      options: layout.values.filter(
        (option) =>
          option !== "grid" &&
          option !== "inline" &&
          option !== "center" &&
          option !== "auto" &&
          option !== "fixed" &&
          option !== "none" &&
          option !== "horizontal-single",
      ),
      control: { type: "select" },
    },
  },
};

export const simple = (args: MenuStoryArgs): string => html`
  <calcite-menu label="${args.label}" layout="${args.layout}">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>
`;

export const iconsAndBreadcrumb = (): string =>
  html`<calcite-menu>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`;

export const iconsAndBreadcrumbVertical = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 1"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      breadcrumb
      icon-end="layer"
      text="Example item 2"
      text-enabled
    ></calcite-menu-item>
    <calcite-menu-item
      icon-start="layer"
      icon-end="layer"
      text="Example item 3"
      active
      text-enabled
    ></calcite-menu-item>
  </calcite-menu>`;

export const scaleComparison = (): string => html`
  <style>
    .menu-scale-test {
      display: grid;
      gap: 3rem;
    }

    .comparison-section {
      display: grid;
      gap: 1rem;
    }

    .comparison-grid {
      align-items: start;
      display: grid;
      gap: 0.75rem;
      grid-template-columns: 12rem repeat(3, minmax(14rem, 1fr));
    }

    .column-heading,
    .row-heading {
      font-weight: 600;
    }

    .row-heading {
      padding-block-start: 0.75rem;
    }

    .comparison-section h2 {
      margin: 0;
    }
  </style>

  <div class="menu-scale-test">
    <section class="comparison-section">
      <h2>Horizontal</h2>
      <div class="comparison-grid">
        <div></div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu label="Horizontal default scale m">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="m" text="Default" />
        </calcite-menu>
        <calcite-menu label="Horizontal default scale s">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="s" text="Default" />
        </calcite-menu>
        <calcite-menu label="Horizontal default scale l">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="l" text="Default" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu label="Horizontal has children scale m">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="m"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="m"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="m"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Horizontal has children scale s">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="s"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="s"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="s"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Horizontal has children scale l">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="l"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="l"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="l"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu label="Horizontal has children and href scale m">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="m"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="m"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Horizontal has children and href scale s">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="s"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="s"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Horizontal has children and href scale l">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="l"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="l"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu label="Horizontal has breadcrumbs scale m">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="m"
            text="Has breadcrumbs"
          />
        </calcite-menu>
        <calcite-menu label="Horizontal has breadcrumbs scale s">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="s"
            text="Has breadcrumbs"
          />
        </calcite-menu>
        <calcite-menu label="Horizontal has breadcrumbs scale l">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="l"
            text="Has breadcrumbs"
          />
        </calcite-menu>
      </div>
    </section>

    <section class="comparison-section">
      <h2>Vertical</h2>
      <div class="comparison-grid">
        <div></div>
        <div class="column-heading">Scale m</div>
        <div class="column-heading">Scale s</div>
        <div class="column-heading">Scale l</div>

        <div class="row-heading">Default</div>
        <calcite-menu label="Vertical default scale m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="m" text="Default" />
        </calcite-menu>
        <calcite-menu label="Vertical default scale s" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="s" text="Default" />
        </calcite-menu>
        <calcite-menu label="Vertical default scale l" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Default" scale="l" text="Default" />
        </calcite-menu>

        <div class="row-heading">Has children</div>
        <calcite-menu label="Vertical has children scale m" layout="vertical">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="m"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="m"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="m"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical has children scale s" layout="vertical">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="s"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="s"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="s"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical has children scale l" layout="vertical">
          <calcite-menu-item
            icon-end="diamond"
            icon-start="diamond"
            label="Has children"
            open
            scale="l"
            text="Has children"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child one"
              scale="l"
              slot="submenu-item"
              text="Child one"
            />
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Child two"
              scale="l"
              slot="submenu-item"
              text="Child two"
            />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Is child</div>
        <calcite-menu label="Vertical child scale m" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Parent" open scale="m" text="Parent">
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Is child"
              scale="m"
              slot="submenu-item"
              text="Is child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical child scale s" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Parent" open scale="s" text="Parent">
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Is child"
              scale="s"
              slot="submenu-item"
              text="Is child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical child scale l" layout="vertical">
          <calcite-menu-item icon-end="diamond" icon-start="diamond" label="Parent" open scale="l" text="Parent">
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Is child"
              scale="l"
              slot="submenu-item"
              text="Is child"
            />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has children + href</div>
        <calcite-menu label="Vertical has children and href scale m" layout="vertical">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="m"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="m"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical has children and href scale s" layout="vertical">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="s"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="s"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>
        <calcite-menu label="Vertical has children and href scale l" layout="vertical">
          <calcite-menu-item
            href="#"
            icon-end="diamond"
            icon-start="diamond"
            label="Has children and href"
            open
            scale="l"
            text="Has children + href"
          >
            <calcite-menu-item
              icon-end="diamond"
              icon-start="diamond"
              label="Linked child"
              scale="l"
              slot="submenu-item"
              text="Linked child"
            />
          </calcite-menu-item>
        </calcite-menu>

        <div class="row-heading">Has breadcrumbs</div>
        <calcite-menu label="Vertical has breadcrumbs scale m" layout="vertical">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="m"
            text="Has breadcrumbs"
          />
        </calcite-menu>
        <calcite-menu label="Vertical has breadcrumbs scale s" layout="vertical">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="s"
            text="Has breadcrumbs"
          />
        </calcite-menu>
        <calcite-menu label="Vertical has breadcrumbs scale l" layout="vertical">
          <calcite-menu-item
            breadcrumb
            icon-end="diamond"
            icon-start="diamond"
            label="Has breadcrumbs"
            scale="l"
            text="Has breadcrumbs"
          />
        </calcite-menu>
      </div>
    </section>
  </div>
`;

export const withNesting = (): string =>
  html`<calcite-panel>
    <calcite-menu layout="horizontal">
      <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
      <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
      <calcite-menu-item text="Example item 3" text-enabled open>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 1" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 2" text-enabled></calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Example submenu item 3" text-enabled></calcite-menu-item>
      </calcite-menu-item>
      <calcite-menu-item text="Example item 4" text-enabled></calcite-menu-item></calcite-menu
  ></calcite-panel>`;

export const WithSubmenuOpen = (): string =>
  html`<calcite-menu>
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`;

export const WithSubmenuOpenInVerticalLayout = (): string =>
  html`<calcite-menu layout="vertical">
    <calcite-menu-item text="Item" href="#item" open>
      <calcite-menu-item text="item1" slot="submenu-item" active></calcite-menu-item>
      <calcite-menu-item text="item2" slot="submenu-item"></calcite-menu-item>
    </calcite-menu-item>
    <calcite-menu-item text="Item 2" href="#item"></calcite-menu-item>
    <calcite-menu-item text="Item 3" href="#item"></calcite-menu-item>
  </calcite-menu>`;

export const darkModeRTL = (): string =>
  html`<calcite-menu dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;

export const verticalComplexUseCase = (): string =>
  html`<calcite-shell-panel width-scale="l">
    <calcite-panel heading="Extreme nested vertical menu">
      <calcite-menu layout="vertical">
        <calcite-menu-item icon-start="layer" icon-end="layer" text="Home"></calcite-menu-item>
        <calcite-menu-item
          icon-start="layer"
          icon-end="layer"
          href="#"
          text="Example nested"
          icon-start="layer"
          breadcrumb
        >
          <calcite-menu-item icon-end="layer" icon-start="layer" slot="submenu-item" text="Capabilities">
          </calcite-menu-item>
          <calcite-menu-item icon-start="layer" slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities">
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Capabilities"></calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item text="Example nested" icon-start="layer" icon-end="layer" breadcrumb open>
          <calcite-menu-item slot="submenu-item" title text="ArcGIS Online" breadcrumb open>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" breadcrumb>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Capabilities" open>
              <calcite-menu-item slot="submenu-item" text="Capabilities" icon-end="layer"></calcite-menu-item>
              <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
            </calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Something else"></calcite-menu-item>
            <calcite-menu-item slot="submenu-item" text="Another thing">
              <calcite-menu-item slot="submenu-item" text="Great examples">
                <calcite-menu-item slot="submenu-item" text="Great examples" breadcrumb></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples" icon-end="layer"></calcite-menu-item>
                <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item href="#" slot="submenu-item" text="It's stupendous" open>
            <calcite-menu-item slot="submenu-item" text="Very nice example"></calcite-menu-item>
            <calcite-menu-item icon-start="layer" slot="submenu-item" text="Short one" open>
              <calcite-menu-item icon-start="layer" slot="submenu-item" text="Another thing" open>
                <calcite-menu-item icon-start="layer" slot="submenu-item" text="Great examples" open>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                  <calcite-menu-item slot="submenu-item" text="Great examples"></calcite-menu-item>
                </calcite-menu-item>
              </calcite-menu-item>
            </calcite-menu-item>
          </calcite-menu-item>
          <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        </calcite-menu-item>
        <calcite-menu-item slot="submenu-item" text="Capabilities"></calcite-menu-item>
        <calcite-menu-item text="Reference" active></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
        <calcite-menu-item text="Reference"></calcite-menu-item>
      </calcite-menu>
    </calcite-panel>
  </calcite-shell-panel>`;

export const verticalLayoutInDarkModeRTL = (): string =>
  html`<calcite-menu layout="vertical" dir="rtl" class="calcite-mode-dark">
    <calcite-menu-item text="Example item 1" text-enabled></calcite-menu-item>
    <calcite-menu-item text="Example item 2" text-enabled active></calcite-menu-item>
    <calcite-menu-item text="Example item 3" text-enabled></calcite-menu-item>
  </calcite-menu>`;
