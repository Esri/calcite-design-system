import { html } from "../../support/formatting";

export const paginationTokens = {
  calcitePaginationColor: "",
  calcitePaginationColorHover: "",
  calcitePaginationColorBorderHover: "",
  calcitePaginationColorBorderActive: "",
  calcitePaginationBackgroundColor: "",
  calcitePaginationIconColorBackgroundHover: "",
};

export const pagination = html`<calcite-pagination
  total-items="1200"
  page-size="100"
  start-item="1"
></calcite-pagination>`;
