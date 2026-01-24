import { html } from "../../support/formatting";

export const graphTokens = {
  calciteGraphHighlightFillColor: "",
};

export const graph = html`<div style="width:300px; height:100px">
    <calcite-graph id="my-graph" highlight-min="25" highlight-max="75"></calcite-graph>
  </div>
  <script>
    const data = [
      [0, 0],
      [10, 80],
      [20, 20],
      [30, 30],
      [40, 42],
      [50, 50],
      [60, 55],
      [70, 48],
      [80, 30],
      [90, 10],
      [100, 0],
    ];
    document.getElementById("my-graph").data = data;
  </script>`;
