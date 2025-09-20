import { html } from "../../support/formatting";

export const swatchGroupTokens = {
  calciteSwatchGroupSpace: "",
};

export const swatchGroup = html`
  <calcite-swatch-group label="demo-group-label" selection-mode="single-persist" id="single-persist-programmatic">
    <calcite-swatch color="#aabbcc" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#ddeeff" selected label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#112233" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#445566" label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="#425262" disabled label="example" value="calcite swatch"></calcite-swatch>
    <calcite-swatch color="" label="example" value="calcite swatch"></calcite-swatch>
  </calcite-swatch-group>
`;
