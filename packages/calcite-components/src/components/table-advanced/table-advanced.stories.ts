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

export const customSlot = (): string => html`
  <calcite-table-advanced>
    <table>
      <thead>
        <tr>
          <th>Heading</th>
          <th>Heading 1</th>
          <th>Heading 2</th>
          <th>Heading 3</th>
          <th>Heading 4</th>
          <th>Heading 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
      </tbody>
    </table>
  </calcite-table-advanced>
`;

export const customSlotWithWidths = (): string => html`
  <calcite-table-advanced>
    <table>
      <thead>
        <tr>
          <th width="200">Heading</th>
          <th width="150">Heading 1</th>
          <th width="110">Heading 2</th>
          <th width="250">Heading 3</th>
          <th>Heading 4</th>
          <th>Heading 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
      </tbody>
    </table>
  </calcite-table-advanced>
`;

export const customSlotWithTabulatorCenterAlignProp = (): string => html`
  <calcite-table-advanced>
    <table>
      <thead>
        <tr>
          <th tabulator-hozAlign="center">Heading</th>
          <th tabulator-hozAlign="center">Heading 1</th>
          <th tabulator-hozAlign="center">Heading 2</th>
          <th tabulator-hozAlign="center">Heading 3</th>
          <th tabulator-hozAlign="center">Heading 4</th>
          <th tabulator-hozAlign="center">Heading 5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
        <tr>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
          <td>cell</td>
        </tr>
      </tbody>
    </table>
  </calcite-table-advanced>
`;
