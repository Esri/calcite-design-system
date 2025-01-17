import { boolean } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { BlockGroup } from "./block-group";

type BlockGroupStoryArgs = Pick<BlockGroup, "disabled" | "group" | "dragEnabled" | "label" | "loading">;

export default {
  title: "Components/Block Group",
  args: {
    disabled: false,
    dragEnabled: false,
    group: "",
    label: "My Group",
    loading: false,
  },
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
    group="${args.group}"
  >
    <calcite-block
      collapsible
      heading="A rubber chicken"
      description="Why did the chicken cross the road? To avoid being squeezed!"
      >My block content!</calcite-block
    >
    <calcite-block collapsible heading="Invisible ink" description="You can't see me!">My block content!</calcite-block>
    <calcite-block collapsible heading="Whoopee cushion" description="The sound of laughter!"
      >My block content!</calcite-block
    >
    <calcite-block collapsible heading="Fake mustache" description="Incognito mode activated!"
      >My block content!</calcite-block
    >
    <calcite-block collapsible heading="Giant foam finger" description="We're number one!"
      >My block content!</calcite-block
    >
    <calcite-block collapsible heading="Clown nose" description="Honk if you love clowns!"
      >My block content!</calcite-block
    >
    <calcite-block
      collapsible
      heading="Joke book"
      description="Why don't scientists trust atoms? Because they make up everything!"
      >My block content!</calcite-block
    >
  </calcite-block-group>
`;
