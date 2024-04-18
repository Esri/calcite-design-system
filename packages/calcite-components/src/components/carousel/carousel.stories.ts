import { select, number, text } from "../../../.storybook/fake-knobs";
import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { boolean } from "../../../.storybook/helpers";

export default {
  title: "Components/Carousel",
};

export const simple = (): string =>
  html` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${boolean("control-overlay", false)}
      ${boolean("disabled", false)}
      ${boolean("rotation", false)}
      ${boolean("rotating", false)}
      ${number("rotation-duration", 6000)}
      ${text("label", "Example carousel label")}
      arrow-type="${select("arrow-type", ["inline", "edges", "none"], "inline")}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

export const carouselRotationFullImageWithOverlay_TestOnly = (): string =>
  html` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("https://placebear.com/3000/2000");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
    </style>
    <calcite-carousel control-overlay arrow-type="edges" rotation>
      <calcite-carousel-item label="Carousel Item 1">
        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
  </div>`;

export const carouselFullImageWithOverlay_TestOnly = (): string =>
  html` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("https://placebear.com/3000/2000");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
    </style>
    <calcite-carousel rotation control-overlay arrow-type="edges">
      <calcite-carousel-item label="Carousel Item 1">
        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
  </div>`;

export const carouselInPopover_TestOnly = (): string =>
  html`<div style="width:600px;height:400px;">
    <style>
      calcite-carousel-item calcite-icon {
        margin: 2rem auto 1rem;
        display: block;
      }
      calcite-carousel {
        width: 400px;
      }
      calcite-carousel-item p {
        text-align: center;
        margin: 0 auto 1rem;
      }
    </style>
    <calcite-button style="margin: 1rem" id="example-popover">Launch onboarding</calcite-button>
    <calcite-popover open reference-element="example-popover" heading="Welcome to the show!" closable>
      <calcite-carousel arrow-type="none">
        <calcite-carousel-item label="Carousel Item 1">
          <p>
            <calcite-icon scale="l" icon="number-circle-1"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>
            <calcite-icon scale="l" icon="number-circle-2"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 3">
          <p>
            <calcite-icon scale="l" icon="number-circle-3"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 4">
          <p>
            <calcite-icon scale="l" icon="number-circle-4"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 5">
          <p>
            <calcite-icon scale="l" icon="number-circle-5"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 6">
          <p>
            <calcite-icon scale="l" icon="number-circle-6"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 7">
          <p>
            <calcite-icon scale="l" icon="number-circle-7"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
      </calcite-carousel>
    </calcite-popover>
  </div>`;

export const themed_simple_TestOnly = (): string =>
  html` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("https://placebear.com/3000/2000");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
      calcite-carousel {
        --calcite-carousel-slide-item-icon-color-hover: green;
        --calcite-carousel-slide-item-icon-color-selected: blue;
        --calcite-carousel-slide-item-icon-color-active: orange;
        --calcite-carousel-slide-item-icon-color: red;
        --calcite-carousel-rotation-progress-background-color: purple;
        --calcite-carousel-rotation-progress-fill-color: pink;
      }
    </style>
    <calcite-carousel rotation>
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

export const themed_carouselFullImageWithOverlay_TestOnly = (): string =>
  html` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("https://placebear.com/3000/2000");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
      calcite-carousel {
        --calcite-carousel-slide-item-background-color-active: orange;
        --calcite-carousel-slide-item-background-color-hover: yellow;
        --calcite-carousel-slide-item-background-color-selected: red;
        --calcite-carousel-slide-item-background-color: rgba(20, 180, 200, 0.8);
        --calcite-carousel-slide-item-icon-color-hover: white;
        --calcite-carousel-slide-item-icon-color-selected: pink;
        --calcite-carousel-slide-item-icon-color-active: white;
        --calcite-carousel-slide-item-icon-color: lightgreen;
        --calcite-carousel-rotation-progress-background-color: purple;
        --calcite-carousel-rotation-progress-fill-color: pink;
      }
    </style>
    <calcite-carousel control-overlay arrow-type="edges">
      <calcite-carousel-item label="Carousel Item 1">
        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <div class="bg-image-example">
          Some kind of rich content over a bg using overlay controls but longer than the other one
        </div>
      </calcite-carousel-item>
  </div>`;

export const darkModeRTL_TestOnly = (): string =>
  html` <div style="width:600px;height:400px;" dir="rtl">
    <calcite-carousel>
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };

export const carouselInPopoverDarkModeRTL_TestOnly = (): string => html`
  <div style="width:600px;height:400px;" dir="rtl">
    <style>
      calcite-carousel-item calcite-icon {
        margin: 2rem auto 1rem;
        display: block;
      }
      calcite-carousel {
        width: 400px;
      }
      calcite-carousel-item p {
        text-align: center;
        margin: 0 auto 1rem;
      }
    </style>
    <calcite-button style="margin: 1rem" id="example-popover">Launch onboarding</calcite-button>
    <calcite-popover open reference-element="example-popover" heading="Welcome to the show!" closable>
      <calcite-carousel>
        <calcite-carousel-item label="Carousel Item 1">
          <p>
            <calcite-icon scale="l" icon="number-circle-1"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>
            <calcite-icon scale="l" icon="number-circle-2"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 3">
          <p>
            <calcite-icon scale="l" icon="number-circle-3"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 4">
          <p>
            <calcite-icon scale="l" icon="number-circle-4"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 5">
          <p>
            <calcite-icon scale="l" icon="number-circle-5"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 6">
          <p>
            <calcite-icon scale="l" icon="number-circle-6"></calcite-icon>
            An unbelievable new feature has arrived in this exciting product category. It's pretty neat.
          </p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 7">
          <p>
            <calcite-icon scale="l" icon="number-circle-7"></calcite-icon>
            Another bit of content about this unbelievable item can go here on the second carousel item as an example
          </p>
        </calcite-carousel-item>
      </calcite-carousel>
    </calcite-popover>
  </div>
`;

carouselInPopoverDarkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
