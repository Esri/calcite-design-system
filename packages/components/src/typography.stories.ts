import { html } from "../support/formatting";
import "./typography.stories.scss";

const weights = ["light", "regular", "medium", "bold"];
const defaultSteps = ["minus-3h", "minus-2h", "minus-1h", "0h", "1h", "2h"];
const wrapSteps = ["minus-2", "minus-1", "0", "1", "2", "3"];
const displaySteps = ["1", "2"];
const headingSteps = ["1", "2", "3", "4", "5"];

const defaultMixins = [
  "calcite-typography",
  ...weights.flatMap((weight) => defaultSteps.map((step) => `calcite-typography-${weight}-${step}`)),
];

const wrapMixins = weights.flatMap((weight) => wrapSteps.map((step) => `calcite-typography-wrap-${weight}-${step}`));

const hierarchyMixins = [
  ...displaySteps.map((step) => `calcite-typography-hierarchy-display-${step}`),
  ...headingSteps.map((step) => `calcite-typography-hierarchy-heading-${step}`),
  "calcite-typography-hierarchy-body-snug",
  "calcite-typography-hierarchy-body",
  "calcite-typography-hierarchy-overline",
  "calcite-typography-hierarchy-caption",
];

function renderScale(mixins: string[]): string {
  return html`<main class="typography-story">
    <div class="typography-story__headings">
      <span>Class</span>
      <span>Mixin</span>
    </div>
    ${mixins
      .map(
        (mixin) =>
          html`<div class="typography-story__row">
            <p class="${mixin}">${mixin}</p>
            <p class="typography-story__mixin--${mixin}">${mixin}</p>
          </div>`,
      )
      .join("")}
  </main>`;
}

export default {
  title: "Design Tokens/Typography",
};

export const defaultScale = (): string => renderScale(defaultMixins);

export const wrapScale = (): string => renderScale(wrapMixins);

export const hierarchy = (): string => renderScale(hierarchyMixins);
