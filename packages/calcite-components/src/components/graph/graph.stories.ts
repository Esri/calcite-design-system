import { modesDarkDefault } from "../../../.storybook/utils";
import { Graph } from "./graph";

interface GraphStoryArgs extends Pick<Graph, "min" | "max"> {
  width: number;
  height: number;
}

export default {
  title: "Components/Controls/Slider/support/Graph",
  args: {
    width: 300,
    height: 100,
    min: 0,
    max: 100,
  },
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

export const simple = (args: GraphStoryArgs): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = `${args.width}px`;
  div.style.height = `${args.height}px`;
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = args.min;
  graph.max = args.max;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const highlightRange = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = 0;
  graph.max = 100;
  graph.highlightMin = 25;
  graph.highlightMax = 75;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const withColorStops = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = 0;
  graph.max = 100;
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

export const darkModeRTL_TestOnly = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  div.dir = "rtl";
  div.classList.add("calcite-mode-dark");
  const graph = document.createElement("calcite-graph") as HTMLCalciteGraphElement;
  graph.min = 0;
  graph.max = 100;
  graph.highlightMin = 25;
  graph.highlightMax = 75;
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
};

darkModeRTL_TestOnly.parameters = { themes: modesDarkDefault };
