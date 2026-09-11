/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { m as p } from "./utils3.js";
const g = {
  title: "Components/Controls/Slider/support/Graph",
  args: {
    width: 300,
    height: 100,
    highlightMin: 25,
    highlightMax: 75,
    min: 0,
    max: 100
  },
  argTypes: {
    min: {
      control: {
        type: "number"
      }
    },
    max: {
      control: {
        type: "number"
      }
    },
    highlightMin: {
      control: {
        type: "number"
      }
    },
    highlightMax: {
      control: {
        type: "number"
      }
    }
  }
}, o = [[0, 0], [10, 80], [20, 20], [30, 30], [40, 42], [50, 50], [60, 55], [70, 48], [80, 30], [90, 10], [100, 0]], d = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"], c = d.map((t, e) => ({
  offset: 1 / (d.length - 1) * e,
  color: t
})), r = (t) => {
  const e = document.createElement("div");
  e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
  const a = document.createElement("calcite-graph");
  return a.min = t.min, a.max = t.max, a.highlightMin = t.highlightMin, a.highlightMax = t.highlightMax, a.data = o, e.appendChild(a), e;
}, i = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px";
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.highlightMin = 25, e.highlightMax = 75, e.data = o, t.appendChild(e), t;
}, h = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px";
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.colorStops = c, e.data = o, t.appendChild(e), t;
}, n = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px", t.dir = "rtl", t.classList.add("calcite-mode-dark");
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.highlightMin = 25, e.highlightMax = 75, e.colorStops = c, e.data = o, t.appendChild(e), t;
};
n.parameters = {
  themes: p
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(args: GraphStoryArgs): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = \`\${args.width}px\`;
  div.style.height = \`\${args.height}px\`;
  const graph = document.createElement("calcite-graph");
  graph.min = args.min;
  graph.max = args.max;
  graph.highlightMin = args.highlightMin;
  graph.highlightMax = args.highlightMax;
  graph.data = data;
  div.appendChild(graph);
  return div;
}`,
      ...r.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  const graph = document.createElement("calcite-graph");
  graph.min = 0;
  graph.max = 100;
  graph.highlightMin = 25;
  graph.highlightMax = 75;
  graph.data = data;
  div.appendChild(graph);
  return div;
}`,
      ...i.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  const graph = document.createElement("calcite-graph");
  graph.min = 0;
  graph.max = 100;
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
}`,
      ...h.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = "300px";
  div.style.height = "100px";
  div.dir = "rtl";
  div.classList.add("calcite-mode-dark");
  const graph = document.createElement("calcite-graph");
  graph.min = 0;
  graph.max = 100;
  graph.highlightMin = 25;
  graph.highlightMax = 75;
  graph.colorStops = colorStops;
  graph.data = data;
  div.appendChild(graph);
  return div;
}`,
      ...n.parameters?.docs?.source
    }
  }
};
const l = ["simple", "highlightRange", "withColorStops", "darkModeRTL"];
export {
  l as __namedExportsOrder,
  n as darkModeRTL,
  g as default,
  i as highlightRange,
  r as simple,
  h as withColorStops
};
