import { j as c } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const l = {
  title: "Components/Controls/Slider/support/Graph",
  args: {
    width: 300,
    height: 100,
    min: 0,
    max: 100
  }
}, o = [[0, 0], [10, 80], [20, 20], [30, 30], [40, 42], [50, 50], [60, 55], [70, 48], [80, 30], [90, 10], [100, 0]], h = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"], s = h.map((t, e) => ({
  offset: 1 / (h.length - 1) * e,
  color: t
})), n = (t) => {
  const e = document.createElement("div");
  e.style.width = `${t.width}px`, e.style.height = `${t.height}px`;
  const r = document.createElement("calcite-graph");
  return r.min = t.min, r.max = t.max, r.data = o, e.appendChild(r), e;
}, i = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px";
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.highlightMin = 25, e.highlightMax = 75, e.data = o, t.appendChild(e), t;
}, d = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px";
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.colorStops = s, e.data = o, t.appendChild(e), t;
}, a = () => {
  const t = document.createElement("div");
  t.style.width = "300px", t.style.height = "100px", t.dir = "rtl", t.classList.add("calcite-mode-dark");
  const e = document.createElement("calcite-graph");
  return e.min = 0, e.max = 100, e.highlightMin = 25, e.highlightMax = 75, e.colorStops = s, e.data = o, t.appendChild(e), t;
};
a.parameters = {
  themes: c
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: `(args: GraphStoryArgs): HTMLDivElement => {
  const div = document.createElement("div");
  div.style.width = \`\${args.width}px\`;
  div.style.height = \`\${args.height}px\`;
  const graph = document.createElement("calcite-graph");
  graph.min = args.min;
  graph.max = args.max;
  graph.data = data;
  div.appendChild(graph);
  return div;
}`,
      ...n.parameters?.docs?.source
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
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
a.parameters = {
  ...a.parameters,
  docs: {
    ...a.parameters?.docs,
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
      ...a.parameters?.docs?.source
    }
  }
};
const m = ["simple", "highlightRange", "withColorStops", "darkModeRTL_TestOnly"];
export {
  m as __namedExportsOrder,
  a as darkModeRTL_TestOnly,
  l as default,
  i as highlightRange,
  n as simple,
  d as withColorStops
};
