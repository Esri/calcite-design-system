import { boolean, modesDarkDefault } from "../../../.storybook/utils";
import { html } from "../../../support/formatting";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { ATTRIBUTES } from "../../../.storybook/resources";
import { Carousel } from "./carousel";

const { arrowType } = ATTRIBUTES;

type CarouselStoryArgs = Pick<
  Carousel,
  "controlOverlay" | "disabled" | "autoplayDuration" | "autoplay" | "label" | "arrowType"
>;

export default {
  title: "Components/Carousel",
  args: {
    controlOverlay: false,
    disabled: false,
    autoplayDuration: 6000,
    autoplay: false,
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

export const simple = (args: CarouselStoryArgs): string =>
  html` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${boolean("control-overlay", args.controlOverlay)}
      ${boolean("disabled", args.disabled)}
      autoplay-duration="${args.autoplayDuration}"
      ${args.autoplay ? "autoplay" : ""}
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

export const simpleManyItems = (args: CarouselStoryArgs): string =>
  html` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${boolean("control-overlay", args.controlOverlay)}
      ${boolean("disabled", args.disabled)}
      autoplay-duration="${args.autoplayDuration}"
      ${args.autoplay ? "autoplay" : ""}
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
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

export const simpleManyItemsNarrow = (args: CarouselStoryArgs): string =>
  html` <div style="width:400px;height:400px;">
    <calcite-carousel
      ${boolean("control-overlay", args.controlOverlay)}
      ${boolean("disabled", args.disabled)}
      autoplay-duration="${args.autoplayDuration}"
      ${args.autoplay ? "autoplay" : ""}
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
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

export const simpleManyItemsVeryNarrow = (args: CarouselStoryArgs): string =>
  html` <div style="width:200px;height:400px;">
    <calcite-carousel
      ${boolean("control-overlay", args.controlOverlay)}
      ${boolean("disabled", args.disabled)}
      autoplay-duration="${args.autoplayDuration}"
      ${args.autoplay ? "autoplay" : ""}
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
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="title">Some kind of carousel item content</span>
          <span slot="subtitle">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`;

export const carouselAutoplayFullImageWithOverlayAndEdge = (): string =>
  html` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${placeholderImage({ width: 3000, height: 2000 })}");
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
        background-image: url("${placeholderImage({ width: 3000, height: 2000 })}");
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
        background-image: url("${placeholderImage({ width: 3000, height: 2000 })}");
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
        background-image: url("${placeholderImage({ width: 3000, height: 2000 })}");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
      calcite-carousel {
        --calcite-carousel-pagination-background-color: rgba(20, 180, 200, 0.8);
        --calcite-carousel-pagination-background-color-hover: yellow;
        --calcite-carousel-pagination-background-color-active: orange;
        --calcite-carousel-pagination-background-color-selected: red;
        --calcite-carousel-pagination-icon-color-hover: white;
        --calcite-carousel-pagination-icon-color-selected: pink;
        --calcite-carousel-pagination-icon-color: lightgreen;
        --calcite-carousel-control-icon-color: yellow;
        --calcite-carousel-control-icon-color-hover: pink;
        --calcite-carousel-autoplay-progress-background-color: purple;
        --calcite-carousel-autoplay-progress-fill-color: pink;
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
        background-image: url("${placeholderImage({ width: 3000, height: 2000 })}");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
      calcite-carousel {
        --calcite-carousel-pagination-background-color: rgba(20, 180, 200, 0.8);
        --calcite-carousel-pagination-background-color-hover: yellow;
        --calcite-carousel-pagination-background-color-active: orange;
        --calcite-carousel-pagination-background-color-selected: red;
        --calcite-carousel-pagination-icon-color-hover: white;
        --calcite-carousel-pagination-icon-color-selected: pink;
        --calcite-carousel-pagination-icon-color: lightgreen;
        --calcite-carousel-control-icon-color: yellow;
        --calcite-carousel-control-icon-color-hover: pink;
        --calcite-carousel-autoplay-progress-background-color: purple;
        --calcite-carousel-autoplay-progress-fill-color: pink;
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
