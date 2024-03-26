import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import readme from "./readme.md";

export default {
  title: "Components/Carousel",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

export const carouselFullImage_TestOnly = (): string =>
  html` <calcite-panel heading="Carousel in context" style="width:"300px;">
    <calcite-block open heading="Carousel in block">
      <calcite-carousel id="example-carousel" control-overlay control-type="bar" display-arrows>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p class="bg-image-example">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p class="bg-image-example">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Square Nature">
          <p class="bg-image-example">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The lack of imagery">
          <p class="bg-image-example">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p class="bg-image-example">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p class="bg-image-example">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Square Nature">
          <p class="bg-image-example">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The lack of imagery">
          <p class="bg-image-example">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
      </calcite-carousel>
    </calcite-block>
    <calcite-block open heading="Carousel in block no pad and options" style="--calcite-block-padding: 0">
      <calcite-carousel id="example-carousel" control-overlay control-type="square">
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p class="bg-image-example example-2">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p class="bg-image-example example-2">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Square Nature">
          <p class="bg-image-example example-2">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The lack of imagery">
          <p class="bg-image-example example-2">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p class="bg-image-example example-2">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p class="bg-image-example example-2">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Square Nature">
          <p class="bg-image-example example-2">
            Some kind of rich content over a bg using overlay controls but longer than the other one
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The lack of imagery">
          <p class="bg-image-example example-2">Some kind of rich content over a bg using overlay controls</p>
        </calcite-carousel-item>
      </calcite-carousel>
    </calcite-block>
  </calcite-panel>`;

export const carouselInPopover_TestOnly = (): string =>
  html`<calcite-panel label="Content" style="width:"300px;">
    <calcite-button style="margin: 1rem" id="example-popover">Launch onboarding</calcite-button>
    <calcite-popover open reference-element="example-popover" label="Welcome to the show!" closable>
      <calcite-carousel id="example-carousel" display-arrows>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p>
            <calcite-icon scale="l" icon="layer"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p>
            <calcite-icon scale="l" icon="3d-glasses"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p>
            <calcite-icon scale="l" icon="layer"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p>
            <calcite-icon scale="l" icon="layer"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Long Trees">
          <p>
            <calcite-icon scale="l" icon="3d-glasses"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="The Red Rocks and Blue Water">
          <p>
            <calcite-icon scale="l" icon="layer"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
      </calcite-carousel>
    </calcite-popover>
  </calcite-panel>`;

export const darkModeRTL_TestOnly = (): string => html`
  <div style="background-color:#2b2b2b;padding:100px" dir="rtl">
    <calcite-carousel id="example-carousel" display-arrows>
      <calcite-carousel-item label="The Red Rocks and Blue Water">
        <p>
          <calcite-icon scale="l" icon="layer"></calcite-icon>
          An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
        </p>
      </calcite-carousel-item>
      <calcite-carousel-item label="The Long Trees">
        <p>
          <calcite-icon scale="l" icon="3d-glasses"></calcite-icon>
          Another bit of content about this unbelievable item can go here on the second carousel item as an example
        </p>
      </calcite-carousel-item>
      <calcite-carousel-item label="The Red Rocks and Blue Water">
        <p>
          <calcite-icon scale="l" icon="layer"></calcite-icon>
          An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
        </p>
      </calcite-carousel-item>
      <calcite-carousel-item label="The Red Rocks and Blue Water">
        <p>
          <calcite-icon scale="l" icon="layer"></calcite-icon>
          An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
        </p>
      </calcite-carousel-item>
      <calcite-carousel-item label="The Long Trees">
        <p>
          <calcite-icon scale="l" icon="3d-glasses"></calcite-icon>
          Another bit of content about this unbelievable item can go here on the second carousel item as an example
        </p>
      </calcite-carousel-item>
      <calcite-carousel-item label="The Red Rocks and Blue Water">
        <p>
          <calcite-icon scale="l" icon="layer"></calcite-icon>
          An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
        </p>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>
`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
