import { html } from "../../support/formatting";

export const paginationTokens = {
  calcitePaginationSpacing: "",
  calcitePaginationSize: "",
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationColorBackground: "",
  calcitePaginationChevronColorBackgroundHover: "",
};

export const pagination = html`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`;
