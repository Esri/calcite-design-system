import { html } from "../support/formatting";
import "./typography.stories.scss";

const weights = ["light", "regular", "medium", "bold"];
const defaultSteps = ["minus-3h", "minus-2h", "minus-1h", "0h", "1h", "2h"];
const wrapSteps = ["minus-2", "minus-1", "0", "1", "2", "3"];
const displaySteps = ["1", "2"];
const headingSteps = ["1", "2", "3", "4", "5"];

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
      ...displaySteps.map((step) => `calcite-typography-hierarchy-display-${step}`),
      ...headingSteps.map((step) => `calcite-typography-hierarchy-heading-${step}`),
      "calcite-typography-hierarchy-body-snug",
      "calcite-typography-hierarchy-body",
      "calcite-typography-hierarchy-overline",
      "calcite-typography-hierarchy-caption",
    ],
  },
];

function renderGroup({ title, mixins }: (typeof typographyGroups)[number]): string {
  return html`<section>
    <h1>${title}</h1>
    <div>
      ${mixins
        .map((mixin) => html`<p class="typography-story__mixin--${mixin}">${formatMixinName(mixin)}</p>`)
        .join("")}
    </div>
  </section>`;
}

function renderClassGroup({ title, mixins }: (typeof typographyGroups)[number]): string {
  return html`<section>
    <h1>${title}</h1>
    <div>${mixins.map((mixin) => html`<p class="${mixin}">${formatMixinName(mixin)}</p>`).join("")}</div>
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

export const mixins = (): string => html`<main>${typographyGroups.map(renderGroup).join("")}</main>`;

export const classes = (): string => html`<main>${typographyGroups.map(renderClassGroup).join("")}</main>`;
