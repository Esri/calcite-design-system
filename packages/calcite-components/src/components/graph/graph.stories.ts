import { number } from "@storybook/addon-knobs";
import { storyFilters } from "../../../.storybook/helpers";
import { modesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Slider/support/Graph",
  parameters: {
    notes: readme,
  },
  ...storyFilters(),
};

const data: HTMLCalciteGraphElement["data"] = [
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

const rainbow = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"];
const colorStops = rainbow.map((color, i) => ({ offset: (1 / (rainbow.length - 1)) * i, color }));

export const simple = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const highlightRange = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.highlightMin = number("highlightMin", 25);
  graph.highlightMax = number("highlightMax", 75);
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const withColorStops = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const darkModeRTL_TestOnly = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  div.dir = "rtl";
  div.classList.add("calcite-mode-dark");
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.highlightMin = number("highlightMin", 25);
  graph.highlightMax = number("highlightMax", 75);
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

darkModeRTL_TestOnly.parameters = { modes: modesDarkDefault };
