import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

interface PickListArgs {
  disabled: boolean;
  filterEnabled: boolean;
  loading: boolean;
  multiple: boolean;
  selectionFollowsFocus: boolean;
}

export default {
  title: "Components/Pick List",
  args: {
    disabled: false,
    filterEnabled: false,
    loading: false,
    multiple: false,
    selectionFollowsFocus: false,
  },
};

const action = html`
  <calcite-action
    slot="actions-end"
    label="click-me"
    appearance="outline"
    scale="s"
    icon="information"
  ></calcite-action>
`;

export const simple = (args: PickListArgs): string => html`
  <calcite-pick-list
    ${boolean("disabled", args.disabled)}
    ${boolean("filter-enabled", args.filterEnabled)}
    ${boolean("loading", args.loading)}
    ${boolean("multiple", args.multiple)}
    ${boolean("selection-follows-focus", args.selectionFollowsFocus)}
  >
    <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex">
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item label="Triceratops" description="3 horn" value="triceratops" selected>
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item label="hi" description="there" value="helloWorld"> ${action} </calcite-pick-list-item>
  </calcite-pick-list>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-pick-list dir="rtl" class="calcite-mode-dark">
    <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex">
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item label="Triceratops" description="3 horn" value="triceratops" selected>
      ${action}
    </calcite-pick-list-item>
    <calcite-pick-list-item label="hi" description="there" value="helloWorld"> ${action} </calcite-pick-list-item>
  </calcite-pick-list>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const grouped = (): string => html`
  <calcite-pick-list>
    <calcite-pick-list-group group-title="numbers" heading-level="1">
      <calcite-pick-list-item label="one" description="fish" value="one" icon="grip">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="two" description="fish" value="two" icon="grip">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
    <calcite-pick-list-group group-title="colors" heading-level="1">
      <calcite-pick-list-item label="red" description="fish" value="red" icon="grip">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="blue" description="fish" value="blue" icon="grip">
        ${action}
      </calcite-pick-list-item>
    </calcite-pick-list-group>
  </calcite-pick-list>
`;

export const nested = (): string => html`
  <calcite-pick-list>
    <calcite-pick-list-group>
      <calcite-pick-list-item label="All the dogs" value="all-dogs" slot="parent-item">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="Husky" value="husky"> ${action} </calcite-pick-list-item>
      <calcite-pick-list-item label="Pomeranian" value="pom"> ${action} </calcite-pick-list-item>
      <calcite-pick-list-item label="Xoloitzcuintle" value="xolo"> ${action} </calcite-pick-list-item>
    </calcite-pick-list-group>
    <calcite-pick-list-group>
      <calcite-pick-list-item label="All the cats" value="all-cats" slot="parent-item">
        ${action}
      </calcite-pick-list-item>
      <calcite-pick-list-item label="Himalayan" value="himalayan"> ${action} </calcite-pick-list-item>
      <calcite-pick-list-item label="Persian" value="persian"> ${action} </calcite-pick-list-item>
      <calcite-pick-list-item label="Sphynx" value="sphynx"> ${action} </calcite-pick-list-item>
    </calcite-pick-list-group>
  </calcite-pick-list>
`;

export const disabled_TestOnly = (): string =>
  html`<calcite-pick-list disabled>
    <calcite-pick-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-pick-list-item>
    <calcite-pick-list-item
      label="Triceratops"
      description="3 horn"
      value="triceratops"
      selected
    ></calcite-pick-list-item>
    <calcite-pick-list-item label="hi" description="there" value="helloWorld"></calcite-pick-list-item>
  </calcite-pick-list>`;
