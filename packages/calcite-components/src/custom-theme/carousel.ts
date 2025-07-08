import { html } from "../../support/formatting";

export const carouselTokens = {
  calciteCarouselItemBackgroundColorActive: "",
  calciteCarouselItemBackgroundColorHover: "",
  calciteCarouselItemBackgroundColorSelected: "",
  calciteCarouselItemBackgroundColor: "",
  calciteCarouselItemIconColorHover: "",
  calciteCarouselItemIconColorSelected: "",
  calciteCarouselItemIconColor: "",
  calciteCarouselControlColorHover: "",
  calciteCarouselControlColor: "",
  calciteCarouselAutoplayProgressBackgroundColor: "",
  calciteCarouselAutoplayProgressFillColor: "",
};
export const carousel = html`
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
`;
