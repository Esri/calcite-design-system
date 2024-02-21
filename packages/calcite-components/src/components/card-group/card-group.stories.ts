import { select } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";
import { html } from "../../../support/formatting";

export default {
  title: "Components/Card Group",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const simple = (): string => html`
  <calcite-card-group
    selection-mode="${select("selection-mode", ["single", "single-persist", "multiple", "none"], "multiple")}"
  >
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        type="button"
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="check"
      ></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">
        </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">
        </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">
          </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <span slot="description"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
  </calcite-card-group>
  >
`;

export const single_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="tundra"
      ><span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const singlePersistWithPreSelected_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="tundra" selected
      ><span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const multiple_TestOnly = (): string => html`
  <calcite-card-group selection-mode="multiple">
    <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
    <calcite-card selected label="tundra"
      ><span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
    <calcite-card selected label="estuary"><span slot="heading">Heading</span></calcite-card>
  </calcite-card-group>
`;

export const multipleCardHeights_TestOnly = (): string => html`
  <calcite-card-group label="label">
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <h3 slot="heading">Portland Businesses</h3>

      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button
        type="button"
        slot="footer-start"
        kind="neutral"
        scale="s"
        id="card-icon-test-1"
        icon-start="check"
      ></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-2" icon-start="stairs">
        </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" id="card-icon-test-3" icon-start="ellipsis">
        </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button id="card-icon-test-4" slot="trigger" scale="s" kind="neutral" icon-start="caret-down">
          </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <span slot="description"
        >by
        <calcite-link href="">example_user</calcite-link>
      </span>
      <div>
        Created: Apr 22, 2019
        <br />
        Updated: Dec 9, 2019
        <br />
        View Count: 0
      </div>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="https://placebear.com/250/150" />
      <h3 slot="heading">Portland Businesses</h3>
      <calcite-button type="button" slot="footer-start" kind="neutral" scale="s" icon-start="check"></calcite-button>
      <div slot="footer-end">
        <calcite-button type="button" scale="s" kind="neutral" icon-start="stairs"> </calcite-button>
        <calcite-button type="button" scale="s" kind="neutral" icon-start="ellipsis"> </calcite-button>
        <calcite-dropdown type="hover">
          <calcite-button slot="trigger" scale="s" kind="neutral" icon-start="caret-down"> </calcite-button>
          <calcite-dropdown-group selection-mode="none">
            <calcite-dropdown-item>View details</calcite-dropdown-item>
            <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
            <calcite-dropdown-item>Delete</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    </calcite-card>
  </calcite-card-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-card-group>
      <calcite-card label="forest"><span slot="heading">Heading</span></calcite-card>
      <calcite-card label="tundra"
        ><span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="shore"><span slot="heading">Heading</span></calcite-card>
      <calcite-card label="estuary"><span slot="heading">Heading</span></calcite-card>
    </calcite-card-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
