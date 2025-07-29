import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { SwatchGroup } from "./swatch-group";

const { selectionMode, scale } = ATTRIBUTES;

type SwatchGroupStoryArgs = Pick<SwatchGroup, "selectionMode" | "scale">;

export default {
  title: "Components/Swatch Group",
  args: { selectionMode: selectionMode.defaultValue, scale: scale.defaultValue },
  argTypes: {
    selectionMode: {
      options: selectionMode.values.filter(
        (option) => option !== "children" && option !== "multichildren" && option !== "ancestors",
      ),
      control: { type: "select" },
    },
    scale: { options: scale.values, control: { type: "select" } },
  },
};

export const simple = (args: SwatchGroupStoryArgs): string => html`
  <calcite-swatch-group selection-mode="${args.selectionMode}" scale="${args.scale}">
    <calcite-swatch value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch value="calcite swatch">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
    <calcite-swatch disabled color="#ddd" value="calcite swatch">
      <img
        src="${placeholderImage({
          width: 24,
          height: 24,
        })}"
        slot="image"
      />
    </calcite-swatch>
    <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
  </calcite-swatch-group>
`;

export const darkThemeRTL_TestOnly = (): string => html`
  <div dir="rtl">
    <calcite-swatch-group>
      <calcite-swatch value="calcite swatch"></calcite-swatch>
      <calcite-swatch color="#ff0000" value="calcite swatch"></calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="${placeholderImage({
            width: 24,
            height: 24,
          })}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch color="rgba(250,210,150,0.2)" value="calcite swatch">
        <img
          src="${placeholderImage({
            width: 24,
            height: 24,
          })}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch value="calcite swatch">
        <img
          src="${placeholderImage({
            width: 24,
            height: 24,
          })}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch selected color="rgba(25,25,25,0.1)" value="calcite swatch"></calcite-swatch>
      <calcite-swatch disabled color="#ddd" value="calcite swatch">
        <img
          src="${placeholderImage({
            width: 24,
            height: 24,
          })}"
          slot="image"
        />
      </calcite-swatch>
      <calcite-swatch disabled color="#ff00ee" value="calcite swatch"> </calcite-swatch>
    </calcite-swatch-group>
  </div>
`;

darkThemeRTL_TestOnly.parameters = { themes: modesDarkDefault };
