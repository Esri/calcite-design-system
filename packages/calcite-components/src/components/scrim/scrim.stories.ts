import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { Scrim } from "./scrim";

type ScrimStoryArgs = Pick<Scrim, "loading">;

export default {
  title: "Components/Scrim",
  loading: false,
};

export const simple = (args: ScrimStoryArgs): string => html`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim ${boolean("loading", args.loading)}></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`;

export const darkModeRTL_TestOnly = (): string => html`
  <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim dir="rtl" class="calcite-mode-dark"></calcite-scrim>
    <div style="width: 400px; height: 400px; overflow: auto">
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
      <ul>
        <li>
          Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed
          arcu. Cras consequat.
        </li>
        <li>
          Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.
          Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.
        </li>
        <li>
          Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetur ligula vulputate sem tristique cursus.
          Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.
        </li>
        <li>
          Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.
        </li>
      </ul>
    </div>
  </div>
`;

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };

export const textContent_TestOnly = (): string =>
  html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim>This is a test.</calcite-scrim>
  </div>`;

export const noContent_TestOnly = (): string =>
  html` <div tabindex="0" style="position: relative; width: 400px; height: 400px">
    <calcite-scrim></calcite-scrim>
  </div>`;
