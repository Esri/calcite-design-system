import { h } from "@arcgis/lumina";
import { describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import {
  hidden,
  focusable,
  renders,
  t9n,
  accessible,
  themed,
} from "../../tests/commonTests/browser";
import { CSS } from "./resources";

const customDuration = 1000;

describe("accessible", () => {
  describe("default", () => {
    accessible(() =>
      mount(
        <calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    );
  });

  describe("with autoplay paused", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel
          autoplay="paused"
          autoplayDuration={customDuration}
          label="Carousel example"
        >
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });

  describe("with autoplay when autoplay", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel autoplay autoplayDuration={customDuration} label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });

  describe("with pagination disabled", () => {
    accessible(() =>
      mount(() => (
        <calcite-carousel label="Carousel example" paginationDisabled>
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>
      )),
    );
  });
});

describe("honors hidden attribute", () => {
  hidden(() =>
    mount(
      <calcite-carousel hidden label="Carousel example">
        <calcite-carousel-item label="Carousel Item 1">
          <p>carousel item content</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>carousel item content</p>
        </calcite-carousel-item>
      </calcite-carousel>,
    ),
  );
});

describe("renders", () => {
  renders(
    () =>
      mount(
        <calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Carousel Item 1">
            <p>carousel item content</p>
          </calcite-carousel-item>
          <calcite-carousel-item label="Carousel Item 2">
            <p>carousel item content</p>
          </calcite-carousel-item>
        </calcite-carousel>,
      ),
    {
      display: "flex",
    },
  );
});

describe("focusable", () => {
  focusable(() =>
    mount(
      <calcite-carousel label="Carousel example">
        <calcite-carousel-item label="Carousel Item 1">
          <p>carousel item content</p>
        </calcite-carousel-item>
        <calcite-carousel-item label="Carousel Item 2">
          <p>carousel item content</p>
        </calcite-carousel-item>
      </calcite-carousel>,
    ),
  );
});

describe("translation support", () => {
  t9n(() => mount("calcite-carousel"));
});

describe("themed", () => {
  describe("default", () => {
    themed(
      () =>
        mount(
          <calcite-carousel autoplay>
            <calcite-carousel-item label="Carousel Item 1">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case), in a card</span>
                <calcite-icon icon="number-circle-1" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 2">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-2" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 3">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-3" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 4">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-4" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
            <calcite-carousel-item label="Carousel Item 5">
              <calcite-card>
                <span slot="heading">Some kind of carousel item content</span>
                <span slot="description">In this case, in a card</span>
                <calcite-icon icon="number-circle-5" scale="s" slot="footer-start" />
              </calcite-card>
            </calcite-carousel-item>
          </calcite-carousel>,
        ),
      {
        "--calcite-carousel-pagination-background-color": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
          },
        ],
        "--calcite-carousel-pagination-background-color-hover": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
        ],
        "--calcite-carousel-pagination-background-color-press": [
          {
            shadowSelector: `.${CSS.paginationItem}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
        ],
        "--calcite-carousel-pagination-background-color-selected": {
          shadowSelector: `.${CSS.paginationItemSelected}`,
          targetProp: "backgroundColor",
        },
        "--calcite-carousel-pagination-icon-color": {
          shadowSelector: `.${CSS.paginationItem}`,
          targetProp: "color",
        },
        "--calcite-carousel-pagination-icon-color-hover": {
          shadowSelector: `.${CSS.paginationItem}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-carousel-pagination-icon-color-selected": {
          shadowSelector: `.${CSS.paginationItemSelected}`,
          targetProp: "color",
          state: "hover",
        },
        "--calcite-carousel-control-icon-color": [
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "color",
          },
        ],
        "--calcite-carousel-control-icon-color-hover": [
          {
            shadowSelector: `.${CSS.autoplayControl}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pageNext}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.pagePrevious}`,
            targetProp: "color",
            state: "hover",
          },
        ],
        "--calcite-carousel-autoplay-progress-background-color": {
          shadowSelector: `.${CSS.autoplayProgress}`,
          targetProp: "--calcite-progress-background-color",
        },
        "--calcite-carousel-autoplay-progress-fill-color": {
          shadowSelector: `.${CSS.autoplayProgress}`,
          targetProp: "--calcite-progress-fill-color",
        },
      },
    );
  });
});
