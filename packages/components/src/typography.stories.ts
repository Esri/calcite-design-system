import { html } from "../support/formatting";
import "./typography.stories.scss";

const weights = ["light", "regular", "medium", "bold"];
const defaultSteps = ["minus-3h", "minus-2h", "minus-1h", "0h", "1h", "2h"];
const wrapSteps = ["minus-2", "minus-1", "0", "1", "2", "3"];

const typographyGroups = [
  {
    title: "Default scale",
    mixins: [
      "calcite-typography",
      ...weights.flatMap((weight) => defaultSteps.map((step) => `calcite-typography-${weight}-${step}`)),
    ],
  },
  {
    title: "Wrap scale",
    mixins: weights.flatMap((weight) => wrapSteps.map((step) => `calcite-typography-wrap-${weight}-${step}`)),
  },
  {
    title: "Hierarchy",
    mixins: [
      "calcite-typography-hierarchy-display-1",
      "calcite-typography-hierarchy-display-2",
      "calcite-typography-hierarchy-heading-1",
      "calcite-typography-hierarchy-heading-2",
      "calcite-typography-hierarchy-heading-3",
      "calcite-typography-hierarchy-heading-4",
      "calcite-typography-hierarchy-heading-5",
      "calcite-typography-hierarchy-body-snug",
      "calcite-typography-hierarchy-body",
      "calcite-typography-hierarchy-overline",
      "calcite-typography-hierarchy-caption",
    ],
  },
];

function renderGroup({ title, mixins }: (typeof typographyGroups)[number]): string {
  return html`<section class="typography-story__section">
    <h1>${title}</h1>
    <div class="typography-story__previews">
      ${mixins
        .map(
          (mixin) =>
            html`<p class="typography-story__preview typography-story__mixin--${mixin}">${formatMixinName(mixin)}</p>`,
        )
        .join("")}
    </div>
  </section>`;
}

function renderClassGroup({ title, mixins }: (typeof typographyGroups)[number]): string {
  return html`<section class="typography-story__section">
    <h1>${title}</h1>
    <div class="typography-story__previews">
      ${mixins
        .map((mixin) => html`<p class="typography-story__preview ${mixin}">${formatMixinName(mixin)}</p>`)
        .join("")}
    </div>
  </section>`;
}

function formatMixinName(mixin: string): string {
  return mixin
    .replace("calcite-typography", "Calcite Typography")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .replace(/(\d)h\b/g, "$1H");
}

export default {
  title: "Design Tokens/Typography",
};

export const mixins = (): string =>
  html`<main class="typography-story">${typographyGroups.map(renderGroup).join("")}</main>`;

export const classes = (): string =>
  html`<main class="typography-story">${typographyGroups.map(renderClassGroup).join("")}</main>`;
