import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";
import { darkBackground, parseReadme, boolean } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Card", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <div style="width:260px">
    <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
    <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
    <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      </calcite-card>
    </div>
  `,
    { notes }
  )
  .add(
    "Simple with Links",
    () => `
    <div style="width:260px">
    <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
    <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
    <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      <calcite-link theme="dark" slot="footer-leading">Lead footer</calcite-link>
      <calcite-link theme="dark" slot="footer-trailing">Trail footer</calcite-link>
      </calcite-card>
    </div>
  `,
    { notes }
  )
  .add(
    "Footer Button",
    () => `
    <div style="width:260px">
      <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">Untitled experience</h3>
      <span slot="subtitle">Subtext</span>
      <calcite-button slot="footer-leading" width="full">Go</calcite-button>
    </calcite-card>
    `,
    { notes }
  )
  .add(
    "Footer Links",
    () => `
    <div style="width:260px">
      <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">My perhaps multiline card title</h3>
      <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      <calcite-link theme="dark" slot="footer-leading">Lead footer</calcite-link>
      <calcite-link theme="dark" slot="footer-trailing">Trail footer</calcite-link>
    </calcite-card>
  </div>
    `,
    { notes }
  )
  .add(
    "Footer Text, Buttons, Tooltips",
    () => `
    <div style="width:260px">
      <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">My great project that might wrap two lines</h3>
      <span slot="subtitle">Johnathan Smith</span>
      <span slot="footer-leading">Nov 25, 2018</span>
      <div slot="footer-trailing">
        <calcite-button id="card-icon-test-6" scale="s" appearance="transparent" color="dark" icon-start='circle'>
        </calcite-button>
        <calcite-button id="card-icon-test-7" scale="s" appearance="transparent" color="dark" icon-start='circle'>
        </calcite-button>
      </div>
    </calcite-card>
  </div>
  <calcite-tooltip placement="bottom" theme="dark" reference-element="card-icon-test-6">Configure
  </calcite-tooltip>
  <calcite-tooltip placement="bottom" theme="dark" reference-element="card-icon-test-7">Delete
  </calcite-tooltip>
    `,
    { notes }
  )
  .add(
    "Footer Buttons, Tooltips, Dropdown",
    () => `
    <div style="width:260px">
      <calcite-card
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
        <img slot="thumbnail" src="https://placem.at/places?w=260&h=160&txt=0" />
        <h3 slot="title">Portland Businesses</h3>
        <span slot="subtitle">by
          <calcite-link href="">example_user</calcite-button>
        </span>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button slot="footer-leading" color="light" scale="s" icon-start='circle'></calcite-button>
        <div slot="footer-trailing">
          <calcite-button scale="s" color="light" id="card-icon-test-2" icon-start='circle'></calcite-button>
          <calcite-button scale="s" color="light" id="card-icon-test-1" icon-start='circle'></calcite-button>
          <calcite-dropdown>
            <calcite-button id="card-icon-test-5" slot="dropdown-trigger" scale="s" color="light" icon-start='circle'></calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
    </div>
    <calcite-tooltip placement="bottom" reference-element="card-icon-test-1">My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom" reference-element="card-icon-test-2">Sharing level: 2
    </calcite-tooltip>
    <calcite-tooltip placement="top" reference-element="card-icon-test-5">More options
    </calcite-tooltip>
    `,
    { notes }
  )
  .add(
    "Dark Theme - Simple",
    () => `
    <div style="width:260px">
    <calcite-card
      theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
    <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
    <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      </calcite-card>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Dark Theme - Simple with Links",
    () => `
    <div style="width:260px">
    <calcite-card
    theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
    <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
    <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      <calcite-link theme="dark" theme="dark" slot="footer-leading">Lead footer</calcite-link>
      <calcite-link theme="dark" theme="dark" slot="footer-trailing">Trail footer</calcite-link>
      </calcite-card>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Dark Theme - Footer Button",
    () => `
    <div style="width:260px">
      <calcite-card
      theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">Untitled experience</h3>
      <span slot="subtitle">Subtext</span>
      <calcite-button theme="dark" slot="footer-leading" width="full">Go</calcite-button>
    </calcite-card>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Dark Theme - Footer Links",
    () => `
    <div style="width:260px">
      <calcite-card
      theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">My perhaps multiline card title</h3>
      <span slot="subtitle">A great example of a study description that might wrap to a line or two, but isn't
      overly verbose.</span>
      <calcite-link theme="dark" slot="footer-leading">Lead footer</calcite-link>
      <calcite-link theme="dark" slot="footer-trailing">Trail footer</calcite-link>
    </calcite-card>
  </div>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Dark Theme - Footer Text, Buttons, Tooltips",
    () => `
    <div style="width:260px">
      <calcite-card
      theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
      <img slot="thumbnail" src="https://placem.at/places?w=380&h=180&txt=0" />
      <h3 slot="title">My great project that might wrap two lines</h3>
      <span slot="subtitle">Johnathan Smith</span>
      <span slot="footer-leading">Nov 25, 2018</span>
      <div slot="footer-trailing">
        <calcite-button id="card-icon-test-6" scale="s" appearance="transparent" color="dark" icon-start='circle'>
        </calcite-button>
        <calcite-button id="card-icon-test-7" scale="s" appearance="transparent" color="dark" icon-start='circle'>
        </calcite-button>
      </div>
    </calcite-card>
  </div>
  <calcite-tooltip placement="bottom" theme="dark" reference-element="card-icon-test-6">Configure
  </calcite-tooltip>
  <calcite-tooltip placement="bottom" theme="dark" reference-element="card-icon-test-7">Delete
  </calcite-tooltip>
    `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "Dark Theme - Footer Buttons, Tooltips, Dropdown",
    () => `
    <div style="width:260px">
      <calcite-card
      theme="dark"
      ${boolean("loading", false)}
      ${boolean("selectable", false)}
      >
        <img slot="thumbnail" src="https://placem.at/places?w=260&h=160&txt=0" />
        <h3 slot="title">Portland Businesses</h3>
        <span slot="subtitle">by
          <calcite-link theme="dark" href="">example_user</calcite-link>
        </span>
        <div>
          Created: Apr 22, 2019
          <br />
          Updated: Dec 9, 2019
          <br />
          View Count: 0
        </div>
        <calcite-button slot="footer-leading" color="dark" scale="s" icon-start='circle'></calcite-button>
        <div slot="footer-trailing">
          <calcite-button theme="dark" color="dark" scale="s" id="card-icon-test-2" icon-start='circle'></calcite-button>
          <calcite-button theme="dark" color="dark" scale="s" id="card-icon-test-1" icon-start='circle'></calcite-button>
          <calcite-dropdown>
            <calcite-button theme="dark" color="dark" id="card-icon-test-5" slot="dropdown-trigger" scale="s" icon-start='circle'></calcite-button>
            <calcite-dropdown-group selection-mode="none">
              <calcite-dropdown-item>View details</calcite-dropdown-item>
              <calcite-dropdown-item>Duplicate</calcite-dropdown-item>
              <calcite-dropdown-item>Delete</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </calcite-card>
    </div>
    <calcite-tooltip placement="bottom" reference-element="card-icon-test-1">My great tooltip example
    </calcite-tooltip>
    <calcite-tooltip placement="bottom" reference-element="card-icon-test-2">Sharing level: 2
    </calcite-tooltip>
    <calcite-tooltip placement="top" reference-element="card-icon-test-5">More options
    </calcite-tooltip>
    `,
    { notes, backgrounds: darkBackground }
  );
