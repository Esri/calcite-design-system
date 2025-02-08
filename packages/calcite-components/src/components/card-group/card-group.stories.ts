import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { CardGroup } from "./card-group";

const { selectionMode } = ATTRIBUTES;

interface CardGroupStoryArgs extends Pick<CardGroup, "selectionMode"> {
  src: string;
}

export default {
  title: "Components/Card Group",
  args: {
    selectionMode: selectionMode.defaultValue,
    src: placeholderImage({
      width: 280,
      height: 150,
    }),
  },
  argTypes: {
    selectionMode: {
      options: selectionMode.values.filter(
        (option) => option !== "children" && option !== "multichildren" && option !== "ancestors",
      ),
      control: { type: "select" },
    },
  },
};

export const simple = (args: CardGroupStoryArgs): string => html`
  <calcite-card-group selection-mode="${args.selectionMode}">
    <calcite-card label="test card">
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
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
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <h3 slot="heading">Portland Businesses</h3>
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
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
      <img slot="thumbnail" alt="Sample image alt" src="${args.src}" />
      <span slot="description"
        >by
        <calcite-link>example_user</calcite-link>
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
`;

export const single_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`;

export const singlePersistWithPreSelected_TestOnly = (): string => html`
  <calcite-card-group selection-mode="single">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card selected label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`;

export const multiple_TestOnly = (): string => html`
  <calcite-card-group selection-mode="multiple">
    <calcite-card label="forest">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="tundra">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="shore">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
    <calcite-card label="estuary">
      <span slot="heading">Heading</span>
      <span slot="description">Description</span>
    </calcite-card>
  </calcite-card-group>
`;

export const multipleCardHeightsMatchPerRow_TestOnly = (): string => html`
  <div>
    <style>
      calcite-card {
        width: 280px;
      }
    </style>
    <calcite-card-group label="label">
      <calcite-card label="test card">
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${placeholderImage({
            width: 280,
            height: 150,
          })}"
        />
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
          <calcite-link>example_user</calcite-link>
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
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${placeholderImage({
            width: 280,
            height: 150,
          })}"
        />
        <h3 slot="heading">Portland Businesses</h3>
        <span slot="description"
          >by
          <calcite-link>example_user</calcite-link>
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
        <img
          slot="thumbnail"
          alt="Sample image alt"
          src="${placeholderImage({
            width: 280,
            height: 150,
          })}"
        />
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
  </div>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-card-group>
      <calcite-card label="forest">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="tundra">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="shore">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
      <calcite-card label="estuary">
        <span slot="heading">Heading</span>
        <span slot="description">Description</span>
      </calcite-card>
    </calcite-card-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
