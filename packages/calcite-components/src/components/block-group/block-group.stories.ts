import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { BlockGroup } from "./block-group";

type BlockGroupStoryArgs = Pick<BlockGroup, "disabled" | "group" | "dragEnabled" | "label" | "loading">;

export default {
  title: "Components/Block Group",
  args: {
    disabled: false,
    dragEnabled: false,
    label: "My Group",
    loading: false,
  },
  argTypes: {},
  parameters: {
    chromatic: {
      delay: 500,
    },
  },
};

export const simple = (args: BlockGroupStoryArgs): string => html`
  <calcite-block-group
    ${boolean("disabled", args.disabled)}
    ${boolean("drag-enabled", args.dragEnabled)}
    ${boolean("loading", args.loading)}
    label="${args.label}"
  >
    <calcite-block
      heading="A rubber chicken"
      description="Why did the chicken cross the road? To avoid being squeezed!"
    ></calcite-block>
    <calcite-block heading="Invisible ink" description="You can't see me!"></calcite-block>
    <calcite-block heading="Whoopee cushion" description="The sound of laughter!"></calcite-block>
    <calcite-block heading="Fake mustache" description="Incognito mode activated!"></calcite-block>
    <calcite-block heading="Giant foam finger" description="We're number one!"></calcite-block>
    <calcite-block heading="Clown nose" description="Honk if you love clowns!"></calcite-block>
    <calcite-block
      heading="Joke book"
      description="Why don't scientists trust atoms? Because they make up everything!"
    ></calcite-block>
  </calcite-block-group>
`;
