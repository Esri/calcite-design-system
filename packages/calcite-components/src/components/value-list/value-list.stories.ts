import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";

interface ValueListArgs {
  disabled: boolean;
  dragEnabled: boolean;
  filterEnabled: boolean;
  loading: boolean;
  multiple: boolean;
  selectionFollowsFocus: boolean;
}

export default {
  title: "Components/Value List",
  args: {
    disabled: false,
    dragEnabled: false,
    filterEnabled: false,
    loading: false,
    multiple: false,
    selectionFollowsFocus: false,
  },
};

const action = html`
  <calcite-action slot="actions-end" label="click-me" appearance="outline" scale="s" icon="ellipsis"></calcite-action>
`;

export const simple = (args: ValueListArgs): string => html`
  <calcite-value-list
    ${boolean("disabled", args.disabled)}
    ${boolean("drag-enabled", args.dragEnabled)}
    ${boolean("filter-enabled", args.filterEnabled)}
    ${boolean("loading", args.loading)}
    ${boolean("multiple", args.multiple)}
    ${boolean("selection-follows-focus", args.selectionFollowsFocus)}
  >
    <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
      ${action}
    </calcite-value-list-item>
    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
      ${action}
    </calcite-value-list-item>
    <calcite-value-list-item
      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
      description="Easy to care for."
      value="fish"
    >
      ${action}
    </calcite-value-list-item>
  </calcite-value-list>
`;

export const disabled_TestOnly = (): string => html`
  <calcite-value-list disabled>
    <calcite-value-list-item label="T. Rex" description="arm strength impaired" value="trex"></calcite-value-list-item>
    <calcite-value-list-item
      label="Triceratops"
      description="3 horn"
      value="triceratops"
      selected
    ></calcite-value-list-item>
    <calcite-value-list-item label="hi" description="there" value="helloWorld"></calcite-value-list-item>
  </calcite-value-list>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <calcite-value-list dir="rtl" class="calcite-mode-dark">
    <calcite-value-list-item label="Dogs" description="Man's best friend" value="dogs">
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
    <calcite-value-list-item label="Cats" description="Independent and fluffy" value="cats">
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
    <calcite-value-list-item
      label="Fish. But not just any fish, a tiger fish caught live in the Atlantic Ocean while on vacation."
      description="Easy to care for."
      value="fish"
    >
      <calcite-action
        slot="actions-end"
        label="click-me"
        appearance="outline"
        scale="s"
        icon="ellipsis"
      ></calcite-action>
    </calcite-value-list-item>
  </calcite-value-list>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
