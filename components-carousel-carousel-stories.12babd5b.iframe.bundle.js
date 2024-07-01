"use strict";(globalThis.webpackChunk_esri_calcite_components=globalThis.webpackChunk_esri_calcite_components||[]).push([[1529],{"./src/components/carousel/carousel.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,carouselAutoplayFullImageWithNoOverlay:()=>carouselAutoplayFullImageWithNoOverlay,carouselAutoplayFullImageWithOverlayAndEdge:()=>carouselAutoplayFullImageWithOverlayAndEdge,carouselFullImageWithOverlay:()=>carouselFullImageWithOverlay,carouselWithAutoplayNoOverlay:()=>carouselWithAutoplayNoOverlay,darkModeRTL:()=>darkModeRTL,default:()=>__WEBPACK_DEFAULT_EXPORT__,simple:()=>simple,themed_carouselFullImageWithOverlay:()=>themed_carouselFullImageWithOverlay,themed_simple:()=>themed_simple});var _storybook_utils__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./.storybook/utils.ts"),_support_formatting__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./support/formatting.ts"),_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./.storybook/placeholderImage.ts"),_storybook_resources__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./.storybook/resources.ts");const{arrowType}=_storybook_resources__WEBPACK_IMPORTED_MODULE_2__.i,__WEBPACK_DEFAULT_EXPORT__={title:"Components/Carousel",args:{controlOverlay:!1,disabled:!1,autoplayDuration:6e3,autoplay:!1,label:"Example carousel label",arrowType:arrowType.defaultValue},argTypes:{arrowType:{options:arrowType.values,control:{type:"select"}}}},simple=args=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <calcite-carousel
      control-overlay="${args.controlOverlay}"
      ${(0,_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.zM)("disabled",args.disabled)}
      autoplay-duration="${args.autoplayDuration}"
      ${args.autoplay?"autoplay":""}
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
  </div>`,carouselAutoplayFullImageWithOverlayAndEdge=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:3e3,height:2e3})}");
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
  </div>`,carouselAutoplayFullImageWithNoOverlay=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:3e3,height:2e3})}");
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
  </div>`,carouselFullImageWithOverlay=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:3e3,height:2e3})}");
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
  </div>`,carouselWithAutoplayNoOverlay=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q`<div style="width:600px;height:400px;">
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
  </div>`,themed_simple=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:3e3,height:2e3})}");
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
  </div>`,themed_carouselFullImageWithOverlay=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;">
    <style>
      .bg-image-example {
        color: red;
        background-image: url("${(0,_storybook_placeholderImage__WEBPACK_IMPORTED_MODULE_3__.j)({width:3e3,height:2e3})}");
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
  </div>`,darkModeRTL=()=>_support_formatting__WEBPACK_IMPORTED_MODULE_1__.q` <div style="width:600px;height:400px;" dir="rtl">
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
  </div>`;darkModeRTL.parameters={modes:_storybook_utils__WEBPACK_IMPORTED_MODULE_0__.At},simple.parameters={...simple.parameters,docs:{...simple.parameters?.docs,source:{originalSource:'(args: CarouselStoryArgs): string => html` <div style="width:600px;height:400px;">\n    <calcite-carousel\n      control-overlay="${args.controlOverlay}"\n      ${boolean("disabled", args.disabled)}\n      autoplay-duration="${args.autoplayDuration}"\n      ${args.autoplay ? "autoplay" : ""}\n      label="${args.label}"\n      arrow-type="${args.arrowType}"\n    >\n      <calcite-carousel-item label="Carousel Item 1">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 4">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 5">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n    </calcite-carousel>\n  </div>`',...simple.parameters?.docs?.source}}},carouselAutoplayFullImageWithOverlayAndEdge.parameters={...carouselAutoplayFullImageWithOverlayAndEdge.parameters,docs:{...carouselAutoplayFullImageWithOverlayAndEdge.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;">\n    <style>\n      .bg-image-example {\n        color: red;\n        background-image: url("${placeholderImage({\n  width: 3000,\n  height: 2000\n})}");\n        background-size: cover;\n        padding: 1rem;\n        height: 300px;\n        font-size: 32px;\n        font-weight: 600;\n        line-height: 32px;\n      }\n    </style>\n    <calcite-carousel control-overlay arrow-type="edge" autoplay="paused">\n      <calcite-carousel-item label="Carousel Item 1">\n        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n  </div>`',...carouselAutoplayFullImageWithOverlayAndEdge.parameters?.docs?.source}}},carouselAutoplayFullImageWithNoOverlay.parameters={...carouselAutoplayFullImageWithNoOverlay.parameters,docs:{...carouselAutoplayFullImageWithNoOverlay.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;">\n    <style>\n      .bg-image-example {\n        color: red;\n        background-image: url("${placeholderImage({\n  width: 3000,\n  height: 2000\n})}");\n        background-size: cover;\n        padding: 1rem;\n        height: 300px;\n        font-size: 32px;\n        font-weight: 600;\n        line-height: 32px;\n      }\n    </style>\n    <calcite-carousel control-overlay autoplay="paused">\n      <calcite-carousel-item label="Carousel Item 1">\n        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n  </div>`',...carouselAutoplayFullImageWithNoOverlay.parameters?.docs?.source}}},carouselFullImageWithOverlay.parameters={...carouselFullImageWithOverlay.parameters,docs:{...carouselFullImageWithOverlay.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;">\n    <style>\n      .bg-image-example {\n        color: red;\n        background-image: url("${placeholderImage({\n  width: 3000,\n  height: 2000\n})}");\n        background-size: cover;\n        padding: 1rem;\n        height: 300px;\n        font-size: 32px;\n        font-weight: 600;\n        line-height: 32px;\n      }\n    </style>\n    <calcite-carousel control-overlay arrow-type="edge">\n      <calcite-carousel-item label="Carousel Item 1">\n        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n  </div>`',...carouselFullImageWithOverlay.parameters?.docs?.source}}},carouselWithAutoplayNoOverlay.parameters={...carouselWithAutoplayNoOverlay.parameters,docs:{...carouselWithAutoplayNoOverlay.parameters?.docs,source:{originalSource:'(): string => html`<div style="width:600px;height:400px;">\n    <style>\n      calcite-carousel-item calcite-icon {\n        margin: 2rem auto 1rem;\n        display: block;\n      }\n      calcite-carousel {\n        width: 400px;\n      }\n      calcite-carousel-item p {\n        text-align: center;\n        margin: 0 auto 1rem;\n      }\n    </style>\n    <calcite-carousel autoplay="paused">\n      <calcite-carousel-item label="Carousel Item 1">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 4">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 5">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n    </calcite-carousel>\n  </div>`',...carouselWithAutoplayNoOverlay.parameters?.docs?.source}}},themed_simple.parameters={...themed_simple.parameters,docs:{...themed_simple.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;">\n    <style>\n      .bg-image-example {\n        color: red;\n        background-image: url("${placeholderImage({\n  width: 3000,\n  height: 2000\n})}");\n        background-size: cover;\n        padding: 1rem;\n        height: 300px;\n        font-size: 32px;\n        font-weight: 600;\n        line-height: 32px;\n      }\n      calcite-carousel {\n        --calcite-internal-carousel-item-icon-color-hover: green;\n        --calcite-internal-carousel-item-icon-color-selected: blue;\n        --calcite-internal-carousel-item-icon-color-active: orange;\n        --calcite-internal-carousel-item-icon-color: red;\n        --calcite-internal-carousel-autoplay-progress-background-color: purple;\n        --calcite-internal-carousel-autoplay-progress-fill-color: pink;\n      }\n    </style>\n    <calcite-carousel autoplay="paused">\n      <calcite-carousel-item label="Carousel Item 1">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-1"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-2"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-3"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 4">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-4"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 5">\n        <calcite-card>\n          <span slot="title">Some kind of carousel item content</span>\n          <span slot="subtitle">In this case, in a card</span>\n          <calcite-icon scale="s" slot="footer-start" icon="number-circle-5"></calcite-icon>\n        </calcite-card>\n      </calcite-carousel-item>\n    </calcite-carousel>\n  </div>`',...themed_simple.parameters?.docs?.source}}},themed_carouselFullImageWithOverlay.parameters={...themed_carouselFullImageWithOverlay.parameters,docs:{...themed_carouselFullImageWithOverlay.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;">\n    <style>\n      .bg-image-example {\n        color: red;\n        background-image: url("${placeholderImage({\n  width: 3000,\n  height: 2000\n})}");\n        background-size: cover;\n        padding: 1rem;\n        height: 300px;\n        font-size: 32px;\n        font-weight: 600;\n        line-height: 32px;\n      }\n      calcite-carousel {\n        --calcite-internal-carousel-item-background-color-active: orange;\n        --calcite-internal-carousel-item-background-color-hover: yellow;\n        --calcite-internal-carousel-item-background-color-selected: red;\n        --calcite-internal-carousel-item-background-color: rgba(20, 180, 200, 0.8);\n        --calcite-internal-carousel-item-icon-color-hover: white;\n        --calcite-internal-carousel-item-icon-color-selected: pink;\n        --calcite-internal-carousel-item-icon-color-active: white;\n        --calcite-internal-carousel-item-icon-color: lightgreen;\n        --calcite-internal-carousel-autoplay-progress-background-color: purple;\n        --calcite-internal-carousel-autoplay-progress-fill-color: pink;\n      }\n    </style>\n    <calcite-carousel control-overlay arrow-type="edge">\n      <calcite-carousel-item label="Carousel Item 1">\n        <div class="bg-image-example">Some kind of rich content over a bg using overlay controls</div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <div class="bg-image-example">\n          Some kind of rich content over a bg using overlay controls but longer than the other one\n        </div>\n      </calcite-carousel-item>\n  </div>`',...themed_carouselFullImageWithOverlay.parameters?.docs?.source}}},darkModeRTL.parameters={...darkModeRTL.parameters,docs:{...darkModeRTL.parameters?.docs,source:{originalSource:'(): string => html` <div style="width:600px;height:400px;" dir="rtl">\n    <style>\n      calcite-carousel-item calcite-icon {\n        margin: 2rem auto 1rem;\n        display: block;\n      }\n      calcite-carousel {\n        width: 400px;\n      }\n      calcite-carousel-item p {\n        text-align: center;\n        margin: 0 auto 1rem;\n      }\n    </style>\n    <calcite-carousel>\n      <calcite-carousel-item label="Carousel Item 1">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-1"></calcite-icon>\n          An unbelievable new feature has arrived in this exciting product category. It\'s pretty neat.\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 2">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-2"></calcite-icon>\n          Another bit of content about this unbelievable item can go here on the second carousel item as an example\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 3">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-3"></calcite-icon>\n          An unbelievable new feature has arrived in this exciting product category. It\'s pretty neat.\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 4">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-4"></calcite-icon>\n          An unbelievable new feature has arrived in this exciting product category. It\'s pretty neat.\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 5">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-5"></calcite-icon>\n          Another bit of content about this unbelievable item can go here on the second carousel item as an example\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 6">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-6"></calcite-icon>\n          An unbelievable new feature has arrived in this exciting product category. It\'s pretty neat.\n        </p>\n      </calcite-carousel-item>\n      <calcite-carousel-item label="Carousel Item 7">\n        <p>\n          <calcite-icon scale="l" icon="number-circle-7"></calcite-icon>\n          Another bit of content about this unbelievable item can go here on the second carousel item as an example\n        </p>\n      </calcite-carousel-item>\n    </calcite-carousel>\n  </div>`',...darkModeRTL.parameters?.docs?.source}}};const __namedExportsOrder=["simple","carouselAutoplayFullImageWithOverlayAndEdge","carouselAutoplayFullImageWithNoOverlay","carouselFullImageWithOverlay","carouselWithAutoplayNoOverlay","themed_simple","themed_carouselFullImageWithOverlay","darkModeRTL"]},"./.storybook/placeholderImage.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function placeholderImage({width=300,height=150,text=`${width}×${height}`,fontFamily="sans-serif",fontWeight="bold",fontSize=Math.floor(.2*Math.min(width,height)),dy=.35*fontSize,bgColor="#ddd",textColor="rgba(0,0,0,0.5)",dataUri=!0,charset="UTF-8"}){const cleaned=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n    <rect fill="${bgColor}" width="${width}" height="${height}"/>\n    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>\n  </svg>`.replace(/[\t\n\r]/gim,"").replace(/\s\s+/g," ").replace(/'/gim,"\\i");if(dataUri){return`data:image/svg+xml;charset=${charset},${encodeURIComponent(cleaned).replace(/\(/g,"%28").replace(/\)/g,"%29")}`}return cleaned}__webpack_require__.d(__webpack_exports__,{j:()=>placeholderImage})},"./.storybook/resources.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>ATTRIBUTES});const logicalFlowPositionOptions=["inline-start","inline-end","block-start","block-end"],positionOptions=["start","end","top","bottom"],scaleOptions=["s","m","l"],alignmentOptions=["start","center","end"],appearanceOptions=["solid","outline","outline-fill","transparent"],statusOptions=["invalid","valid","idle"],kindOptions=["brand","danger","info","inverse","neutral","warning","success"],widthOptions=["auto","half","full"],selectionModeOptions=["single","none","children","single-persist","multichildren","ancestors","multiple"],arrowTypeOptions=["inline","edge","none"],displayModeOptions=["float","overlay"],toggleDisplayOptions=["button","switch"],layoutOptions=["horizontal","vertical","grid","inline","center","auto","fixed","none","horizontal-single"],dirOptions=["ltr","rtl"],buttonTypeOptions=["radio","checkbox"],interactionModeOptions=["interactive","static"],iconTypeOptions=["chevron","caret","ellipsis","overflow","plus-minus"],determinateTypeOptions=["determinate","indeterminate"],fillTypeOptions=["single","range"],labelTypeOptions=["percent","units"],clickTypeOptions=["click","hover"],collapseDirectionOptions=["down","up"],textTypeOptions=["text","textarea","email","password","tel","number","search","file","time","date"],modeOptions=["offset","name"],selectionAppearanceOptions=["icon","border"],shellDisplayModeOptions=["dock","float","overlay"],ATTRIBUTES={alignment:{values:alignmentOptions,defaultValue:alignmentOptions[0]},appearance:{values:appearanceOptions,defaultValue:appearanceOptions[0]},logicalFlowPosition:{values:logicalFlowPositionOptions,defaultValue:logicalFlowPositionOptions[2]},position:{values:positionOptions,defaultValue:positionOptions[0]},scale:{values:scaleOptions,defaultValue:scaleOptions[1]},status:{values:statusOptions,defaultValue:statusOptions[2]},kind:{values:kindOptions,defaultValue:kindOptions[0]},width:{values:widthOptions,defaultValue:widthOptions[0]},selectionMode:{values:selectionModeOptions,defaultValue:selectionModeOptions[6]},arrowType:{values:arrowTypeOptions,defaultValue:arrowTypeOptions[0]},displayMode:{values:displayModeOptions,defaultValue:displayModeOptions[0]},toggleDisplay:{values:toggleDisplayOptions,defaultValue:toggleDisplayOptions[0]},layout:{values:layoutOptions,defaultValue:layoutOptions[0]},dir:{values:dirOptions,defaultValue:dirOptions[0]},buttonType:{values:buttonTypeOptions,defaultValue:buttonTypeOptions[0]},interactionMode:{values:interactionModeOptions,defaultValue:interactionModeOptions[0]},iconType:{values:iconTypeOptions,defaultValue:iconTypeOptions[0]},determinateType:{values:determinateTypeOptions,defaultValue:determinateTypeOptions[0]},fillType:{values:fillTypeOptions,defaultValue:fillTypeOptions[1]},labelType:{values:labelTypeOptions,defaultValue:labelTypeOptions[0]},clickType:{values:clickTypeOptions,defaultValue:clickTypeOptions[0]},collapseDirection:{values:collapseDirectionOptions,defaultValue:collapseDirectionOptions[0]},textType:{values:textTypeOptions,defaultValue:textTypeOptions[0]},mode:{values:modeOptions,defaultValue:modeOptions[0]},selectionAppearance:{values:selectionAppearanceOptions,defaultValue:selectionAppearanceOptions[0]},shellDisplayMode:{values:shellDisplayModeOptions,defaultValue:shellDisplayModeOptions[0]}}}}]);
//# sourceMappingURL=components-carousel-carousel-stories.12babd5b.iframe.bundle.js.map