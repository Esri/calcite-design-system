import { modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { ATTRIBUTES } from "../../../.storybook/resources";
const { arrowType } = ATTRIBUTES;

interface CarouselArgs {
  controlOverlay: boolean;
  disabled: boolean;
  autoPlayDuration: number;
  autoPlay: boolean;
  label: string;
  arrowType: string;
}

export default {
  title: "Components/Carousel",
  args: {
    controlOverlay: false,
    disabled: false,
    autoPlayDuration: 6000,
    autoPlay: false,
    label: "Example carousel label",
    arrowType: arrowType.defaultValue,
  },
  argTypes: {
    arrowType: {
      options: arrowType.values,
      control: { type: "select" },
    },
  },
};

export const simple = (args: CarouselArgs): string =>
  html` <div style="width:600px;height:400px;">
    <calcite-carousel
      control-overlay="${args.controlOverlay}"
      ${args.disabled && "disabled"}
      autoplay-duration="${args.autoPlayDuration}"
      ${args.autoPlay && "autoplay"}
      label="${args.label}"
      arrow-type="${args.arrowType}"
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

export const carouselAutoplayFullImageWithOverlayAndEdge = (): string =>
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
    <calcite-carousel control-overlay arrow-type="edge" autoplay="paused">
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

export const carouselAutoplayFullImageWithNoOverlay = (): string =>
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
    <calcite-carousel control-overlay autoplay="paused">
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

export const carouselFullImageWithOverlay = (): string =>
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
    <calcite-carousel control-overlay arrow-type="edge">
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

export const carouselWithAutoplayNoOverlay = (): string =>
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
    <calcite-carousel autoplay="paused">
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

export const themed_simple = (): string =>
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
        --calcite-internal-carousel-item-icon-color-hover: green;
        --calcite-internal-carousel-item-icon-color-selected: blue;
        --calcite-internal-carousel-item-icon-color-active: orange;
        --calcite-internal-carousel-item-icon-color: red;
        --calcite-internal-carousel-autoplay-progress-background-color: purple;
        --calcite-internal-carousel-autoplay-progress-fill-color: pink;
      }
    </style>
    <calcite-carousel autoplay="paused">
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

export const themed_carouselFullImageWithOverlay = (): string =>
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
        --calcite-internal-carousel-item-background-color-active: orange;
        --calcite-internal-carousel-item-background-color-hover: yellow;
        --calcite-internal-carousel-item-background-color-selected: red;
        --calcite-internal-carousel-item-background-color: rgba(20, 180, 200, 0.8);
        --calcite-internal-carousel-item-icon-color-hover: white;
        --calcite-internal-carousel-item-icon-color-selected: pink;
        --calcite-internal-carousel-item-icon-color-active: white;
        --calcite-internal-carousel-item-icon-color: lightgreen;
        --calcite-internal-carousel-autoplay-progress-background-color: purple;
        --calcite-internal-carousel-autoplay-progress-fill-color: pink;
      }
    </style>
    <calcite-carousel control-overlay arrow-type="edge">
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

export const darkModeRTL = (): string =>
  html` <div style="width:600px;height:400px;" dir="rtl">
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
  </div>`;

darkModeRTL.parameters = { modes: modesDarkDefault };
