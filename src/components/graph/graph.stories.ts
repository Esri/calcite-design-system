import { number } from "@storybook/addon-knobs";
import { themesDarkDefault } from "../../../.storybook/utils";
import readme from "./readme.md";

export default {
  title: "Components/Controls/Slider/support/Graph",

  parameters: {
    notes: readme
  }
};

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
  [100, 0]
];

const rainbow = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"];
const colorStops = rainbow.map((color, i) => ({ offset: (1 / (rainbow.length - 1)) * i, color }));

export const Default = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph");
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const DefaultDark = Default.bind(null);
DefaultDark.parameters = { themes: themesDarkDefault };

export const InheritsColor = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.color = "var(--calcite-ui-brand)";
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph");
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const InheritsColorDark = InheritsColor.bind(null);
InheritsColorDark.parameters = { themes: themesDarkDefault };

export const HighlightRange = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph");
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.highlightMin = number("highlightMin", 25);
  graph.highlightMax = number("highlightMax", 75);
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const HighlightRangeDark = HighlightRange.bind(null);
HighlightRangeDark.parameters = { themes: themesDarkDefault };

export const ColorStops = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph");
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const ColorStopsDark = ColorStops.bind(null);
ColorStopsDark.parameters = { themes: themesDarkDefault };

export const HighlightRangeAndColorStops = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${number("width", 300)}px`;
  div.style.height = `${number("height", 100)}px`;
  const graph = document.createElement("calcite-graph");
  graph.min = number("min", 0);
  graph.max = number("max", 100);
  graph.highlightMin = number("highlightMin", 25);
  graph.highlightMax = number("highlightMax", 75);
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const HighlightRangeAndColorStopsDark = HighlightRangeAndColorStops.bind(null);
HighlightRangeAndColorStopsDark.parameters = { themes: themesDarkDefault };
