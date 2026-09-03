/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { b as a, m as I } from "./utils3.js";
import { h as c } from "./formatting.js";
import { s as t } from "./index3.js";
import { A as k } from "./resources34.js";
import "./carousel.js";
import "./carousel-item.js";
import "./card.js";
import "./icon.js";
const {
  arrowType: v,
  paginationPosition: f
} = k, O = {
  title: "Components/Carousel",
  args: {
    controlOverlay: !1,
    disabled: !1,
    autoplayDuration: 6e3,
    autoplay: !1,
    label: "Example carousel label",
    arrowType: v.defaultValue,
    paginationDisabled: !1,
    paginationPosition: f.defaultValue
  },
  argTypes: {
    arrowType: {
      options: v.values,
      control: {
        type: "select"
      }
    },
    paginationPosition: {
      options: f.values,
      control: {
        type: "select"
      }
    }
  }
}, i = (e) => c` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${a("control-overlay", e.controlOverlay)}
      ${a("disabled", e.disabled)}
      ${a("pagination-disabled", e.paginationDisabled)}
      autoplay-duration="${e.autoplayDuration}"
      ${e.autoplay ? "autoplay" : ""}
      label="${e.label}"
      arrow-type="${e.arrowType}"
      pagination-position="${e.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, n = (e) => c` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${a("control-overlay", e.controlOverlay)}
      ${a("disabled", e.disabled)}
      ${a("pagination-disabled", e.paginationDisabled)}
      autoplay-duration="${e.autoplayDuration}"
      ${e.autoplay ? "autoplay" : ""}
      label="${e.label}"
      arrow-type="${e.arrowType}"
      pagination-position="${e.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, s = (e) => c` <div style="width:600px;height:400px;">
    <calcite-carousel
      ${a("control-overlay", e.controlOverlay)}
      ${a("disabled", e.disabled)}
      ${a("pagination-disabled", e.paginationDisabled)}
      autoplay-duration="${e.autoplayDuration}"
      ${e.autoplay ? "autoplay" : ""}
      label="${e.label}"
      arrow-type="${e.arrowType}"
      pagination-position="${e.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, r = (e) => c` <div style="width:400px;height:400px;">
    <calcite-carousel
      ${a("control-overlay", e.controlOverlay)}
      ${a("disabled", e.disabled)}
      ${a("pagination-disabled", e.paginationDisabled)}
      autoplay-duration="${e.autoplayDuration}"
      ${e.autoplay ? "autoplay" : ""}
      label="${e.label}"
      arrow-type="${e.arrowType}"
      pagination-position="${e.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, u = (e) => c` <div style="width:200px;height:400px;">
    <calcite-carousel
      ${a("control-overlay", e.controlOverlay)}
      ${a("disabled", e.disabled)}
      ${a("pagination-disabled", e.paginationDisabled)}
      autoplay-duration="${e.autoplayDuration}"
      ${e.autoplay ? "autoplay" : ""}
      label="${e.label}"
      arrow-type="${e.arrowType}"
      pagination-position="${e.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, d = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
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
  </div>`, m = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
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
  </div>`, p = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
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
  </div>`, g = () => c`<div style="width:600px;height:400px;">
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
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, o = (e) => i(e);
o.args = {
  paginationPosition: "top"
};
const h = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
    </style>
    <calcite-carousel control-overlay arrow-type="edge" pagination-position="top">
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
    </calcite-carousel>
  </div>`, b = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
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
        --calcite-carousel-pagination-background-color-press: orange;
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
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>`, y = () => c` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${t({
  width: 3e3,
  height: 2e3
})}");
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
        --calcite-carousel-pagination-background-color-press: orange;
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
  </div>`, l = () => c` <div style="width:600px;height:400px;" dir="rtl">
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
l.parameters = {
  modes: I
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(args: CarouselStoryArgs): string => html\` <div style="width:600px;height:400px;">
    <calcite-carousel
      \${boolean("control-overlay", args.controlOverlay)}
      \${boolean("disabled", args.disabled)}
      \${boolean("pagination-disabled", args.paginationDisabled)}
      autoplay-duration="\${args.autoplayDuration}"
      \${args.autoplay ? "autoplay" : ""}
      label="\${args.label}"
      arrow-type="\${args.arrowType}"
      pagination-position="\${args.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: CarouselStoryArgs): string => html\` <div style="width:600px;height:400px;">
    <calcite-carousel
      \${boolean("control-overlay", args.controlOverlay)}
      \${boolean("disabled", args.disabled)}
      \${boolean("pagination-disabled", args.paginationDisabled)}
      autoplay-duration="\${args.autoplayDuration}"
      \${args.autoplay ? "autoplay" : ""}
      label="\${args.label}"
      arrow-type="\${args.arrowType}"
      pagination-position="\${args.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(args: CarouselStoryArgs): string => html\` <div style="width:600px;height:400px;">
    <calcite-carousel
      \${boolean("control-overlay", args.controlOverlay)}
      \${boolean("disabled", args.disabled)}
      \${boolean("pagination-disabled", args.paginationDisabled)}
      autoplay-duration="\${args.autoplayDuration}"
      \${args.autoplay ? "autoplay" : ""}
      label="\${args.label}"
      arrow-type="\${args.arrowType}"
      pagination-position="\${args.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...s.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: CarouselStoryArgs): string => html\` <div style="width:400px;height:400px;">
    <calcite-carousel
      \${boolean("control-overlay", args.controlOverlay)}
      \${boolean("disabled", args.disabled)}
      \${boolean("pagination-disabled", args.paginationDisabled)}
      autoplay-duration="\${args.autoplayDuration}"
      \${args.autoplay ? "autoplay" : ""}
      label="\${args.label}"
      arrow-type="\${args.arrowType}"
      pagination-position="\${args.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...r.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(args: CarouselStoryArgs): string => html\` <div style="width:200px;height:400px;">
    <calcite-carousel
      \${boolean("control-overlay", args.controlOverlay)}
      \${boolean("disabled", args.disabled)}
      \${boolean("pagination-disabled", args.paginationDisabled)}
      autoplay-duration="\${args.autoplayDuration}"
      \${args.autoplay ? "autoplay" : ""}
      label="\${args.label}"
      arrow-type="\${args.arrowType}"
      pagination-position="\${args.paginationPosition}"
    >
      <calcite-carousel-item label="Carousel Item 1">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 6">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-6"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 7">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-7"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 8">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-8"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 9">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-9"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...u.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
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
  </div>\``,
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
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
  </div>\``,
      ...m.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
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
  </div>\``,
      ...p.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<div style="width:600px;height:400px;">
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
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...g.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: "(args: CarouselStoryArgs): string => simple(args)",
      ...o.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
        background-size: cover;
        padding: 1rem;
        height: 300px;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
      }
    </style>
    <calcite-carousel control-overlay arrow-type="edge" pagination-position="top">
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
    </calcite-carousel>
  </div>\``,
      ...h.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
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
        --calcite-carousel-pagination-background-color-press: orange;
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
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 2">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 3">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 4">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
      <calcite-carousel-item label="Carousel Item 5">
        <calcite-card>
          <span slot="heading">Some kind of carousel item content</span>
          <span slot="description">In this case, in a card</span>
          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>
        </calcite-card>
      </calcite-carousel-item>
    </calcite-carousel>
  </div>\``,
      ...b.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("\${placeholderImage({
  width: 3000,
  height: 2000
})}");
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
        --calcite-carousel-pagination-background-color-press: orange;
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
  </div>\``,
      ...y.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\` <div style="width:600px;height:400px;" dir="rtl">
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
  </div>\``,
      ...l.parameters?.docs?.source
    }
  }
};
const T = ["simple", "simpleSingleItem", "simpleManyItems", "simpleManyItemsNarrow", "simpleManyItemsVeryNarrow", "carouselAutoplayFullImageWithOverlayAndEdge", "carouselAutoplayFullImageWithNoOverlay", "carouselFullImageWithOverlay", "carouselWithAutoplayNoOverlay", "simplePaginationTop", "simpleOverlayPaginationTopEdge", "themed_simple", "themed_carouselFullImageWithOverlay", "darkModeRTL"];
export {
  T as __namedExportsOrder,
  m as carouselAutoplayFullImageWithNoOverlay,
  d as carouselAutoplayFullImageWithOverlayAndEdge,
  p as carouselFullImageWithOverlay,
  g as carouselWithAutoplayNoOverlay,
  l as darkModeRTL,
  O as default,
  i as simple,
  s as simpleManyItems,
  r as simpleManyItemsNarrow,
  u as simpleManyItemsVeryNarrow,
  h as simpleOverlayPaginationTopEdge,
  o as simplePaginationTop,
  n as simpleSingleItem,
  y as themed_carouselFullImageWithOverlay,
  b as themed_simple
};
