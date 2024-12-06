import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { TableAdvanced } from "./table-advanced";

const { scale } = ATTRIBUTES;

type TableAdvancedStoryArgs = Pick<TableAdvanced, "scale">;

export default {
  title: "Components/TableAdvanced",
  args: {
    scale: scale.defaultValue,
  },
  argTypes: {
    scale: {
      options: scale.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: TableAdvancedStoryArgs): string => html`
  <calcite-table-advanced scale="${args.scale}"> </calcite-table-advanced>
`;
