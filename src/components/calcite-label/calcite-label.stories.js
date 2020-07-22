import { storiesOf } from "@storybook/html";
import { withKnobs } from "@storybook/addon-knobs";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Label", module)
  .addDecorator(withKnobs)
  .add(
    "Wrapping components other than input",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
      <calcite-label>
      Default label wrapping a switch
      <calcite-switch></calcite-switch>
      </calcite-label>
      <calcite-label>
      Default label wrapping a radio group
      <calcite-radio-group>
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      </calcite-radio-group>
      </calcite-label>
      <calcite-label layout="inline">
      Text leading inline
      <calcite-switch></calcite-switch>
      </calcite-label>
      <calcite-label layout="inline">
      <calcite-switch></calcite-switch>
      Text trailing inline
      </calcite-label>
      <calcite-label layout="inline">
      Off
      <calcite-switch></calcite-switch>
      On
      </calcite-label>
      <calcite-label layout="inline">
      Text leading inline
      <calcite-checkbox></calcite-checkbox>
      </calcite-label>
      <calcite-label>
      Focus slider test
      <calcite-slider></calcite-slider>
      </calcite-label>
      <calcite-label>
      Focus slider test
      <calcite-slider min-value="10" max-value="80"></calcite-slider>
      </calcite-label>
      <calcite-label layout="inline">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline
      </calcite-label>
      <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch></calcite-switch>
      </calcite-label>
      <calcite-label layout="inline-space-between">
      <calcite-switch></calcite-switch>
      Text trailing inline-space-between
      </calcite-label>
      <calcite-label layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox></calcite-checkbox>
      </calcite-label>
      <calcite-label layout="inline-space-between">
      <calcite-checkbox></calcite-checkbox>
      Text trailing inline-space-between
      </calcite-label>
    </div>
  `,
    { notes }
  )

  .add(
    "Wrapping components other than input",
    () => `
    <div style="width:300px;max-width:100%;text-align:center;">
      <calcite-label theme="dark">
      Default label wrapping a switch
      <calcite-switch theme="dark"></calcite-switch>
      </calcite-label>
      <calcite-label theme="dark">
      Default label wrapping a radio group
      <calcite-radio-group>
      <calcite-radio-group-item value="react" checked>React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember">Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
      </calcite-radio-group>
      </calcite-label>
      <calcite-label theme="dark" layout="inline">
      Text leading inline
      <calcite-switch theme="dark"></calcite-switch>
      </calcite-label>
      <calcite-label theme="dark" layout="inline">
      <calcite-switch theme="dark"></calcite-switch>
      Text trailing inline
      </calcite-label>
      <calcite-label theme="dark" layout="inline">
      Off
      <calcite-switch theme="dark"></calcite-switch>
      On
      </calcite-label>
      <calcite-label theme="dark" layout="inline">
      Text leading inline
      <calcite-checkbox theme="dark"></calcite-checkbox>
      </calcite-label>
      <calcite-label theme="dark">
      Focus slider test
      <calcite-slider theme="dark"></calcite-slider>
      </calcite-label>
      <calcite-label theme="dark">
      Focus slider test
      <calcite-slider theme="dark" min-value="10" max-value="80"></calcite-slider>
      </calcite-label>
      <calcite-label theme="dark" layout="inline">
      <calcite-checkbox theme="dark"></calcite-checkbox>
      Text trailing inline
      </calcite-label>
      <calcite-label theme="dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-switch theme="dark"></calcite-switch>
      </calcite-label>
      <calcite-label theme="dark" layout="inline-space-between">
      <calcite-switch theme="dark"></calcite-switch>
      Text trailing inline-space-between
      </calcite-label>
      <calcite-label theme="dark" layout="inline-space-between">
      Text leading inline-space-between
      <calcite-checkbox theme="dark"></calcite-checkbox>
      </calcite-label>
      <calcite-label theme="dark" layout="inline-space-between">
      <calcite-checkbox theme="dark"></calcite-checkbox>
      Text trailing inline-space-between
      </calcite-label>
    </div>
  `,
    { notes, backgrounds: darkBackground }
  );
