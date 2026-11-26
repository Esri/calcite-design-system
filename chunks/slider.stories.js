/* COPYRIGHT Esri - https://js.arcgis.com/6.0/LICENSE.txt */
import { b as n, o as C, m as O } from "./utils2.js";
import { h as l } from "./formatting.js";
import { i as z } from "./helpers.js";
import { A as Z } from "./resources34.js";
import "./label2.js";
import "./slider.js";
var j = {}, B = Object.freeze, G = Object.defineProperty, I = (e, i) => B(G(e, "raw", { value: B(e.slice()) })), P, _, D;
const {
  scale: R,
  sliderFillPlacement: Y,
  status: N
} = Z, le = {
  title: "Components/Controls/Slider",
  args: {
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    maxLabel: "",
    fillPlacement: "all",
    minLabel: "Temperature",
    disabled: !1,
    labelText: "Label text",
    labelHandles: !1,
    labelTicks: !1,
    ticks: 0,
    pageStep: 5,
    precise: !1,
    required: !1,
    mirrored: !1,
    snap: !0,
    scale: R.defaultValue,
    status: N.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: R.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: N.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: z,
      control: {
        type: "select"
      }
    },
    fillPlacement: {
      options: Y.values,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(j.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, g = (e) => l`
  <calcite-slider
    min="${e.min}"
    max="${e.max}"
    max-label="${e.maxLabel}"
    value="${e.value}"
    step="${e.step}"
    fill-placement="${e.fillPlacement}"
    min-label="${e.minLabel}"
    ${n("disabled", e.disabled)}
    ${C("label-text", e.labelText)}
    ${n("label-handles", e.labelHandles)}
    ${n("label-ticks", e.labelTicks)}
    ticks="${e.ticks}"
    page-step="${e.pageStep}"
    ${n("precise", e.precise)}
    ${n("required", e.required)}
    ${n("mirrored", e.mirrored)}
    ${n("snap", e.snap)}
    scale="${e.scale}"
    status="${e.status}"
    validation-message="${e.validationMessage}"
    ${C("validation-icon", e.validationIcon)}
  ></calcite-slider>
`, h = () => l`
  <style>
    calcite-slider {
      /* revert global/preview-level width – see https://github.com/Esri/calcite-design-system/blob/c0547b81ef742b3590aaf95423c46ec26283039e/packages/components/.storybook/preview-head.html#L12-L15 */
      width: revert-layer;
    }
  </style>
  <calcite-label>
    Block
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
  <calcite-label layout="inline">
    Inline
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
  <calcite-label layout="inline-space-between">
    Inline space between
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
`, f = () => l`
  <calcite-slider
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    ticks="20"
    snap
    scale="m"
  ></calcite-slider>
`, c = () => l`
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    label-handles
    label-ticks
    ticks="20"
    precise
    snap
    scale="m"
  ></calcite-slider>
`;
c.story = {
  parameters: {
    themes: O
  }
};
const r = () => l`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="95"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;
r.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const d = () => l`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="100"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;
d.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const m = () => l`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;
m.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const o = () => l`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="99.5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;
o.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const u = () => l`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5.5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
`;
u.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
function A({
  range: e,
  values: i,
  histogram: x
}) {
  const a = document.createElement("calcite-slider");
  return a.min = e[0], a.minValue = i[0], a.max = e[1], a.maxValue = i[1], a.histogram = x, a.style.minWidth = "60vw", a;
}
const S = () => {
  function e(k) {
    const t = document.createElement("h1");
    return t.textContent = k, t;
  }
  const i = document.createElement("div"), x = A({
    range: [-100, 100],
    values: [-33.32, 30.87],
    histogram: [[-90, 0], [-60, 12], [-20, 25], [20, 55], [60, 10], [90, 0]]
  });
  x.ticks = 10, i.append(e("Default"), x);
  const a = A({
    range: [0, 100],
    values: [35, 55],
    histogram: [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]]
  }), V = ["red", "green", "blue"], W = V.map((k, t) => `${1 / (V.length - 1) * t}`);
  a.histogramStops = V.map((k, t) => ({
    offset: parseFloat(W[t]),
    color: k
  })), i.append(e("Color Stops"), a);
  const s = A({
    range: [1925, 2024],
    values: [1925, 1935],
    histogram: [[1925, 2549], [1926, 3125], [1927, 2917], [1928, 2998], [1929, 2794], [1930, 2606], [1931, 2283], [1932, 3551], [1933, 3824], [1934, 3780], [1935, 3463], [1936, 3025], [1937, 2823], [1938, 3232], [1939, 3878], [1940, 3987], [1941, 3328], [1942, 2791], [1943, 3662], [1944, 3598], [1945, 3643], [1946, 3390], [1947, 3424], [1948, 3549], [1949, 4566], [1950, 5147], [1951, 5092], [1952, 4740], [1953, 4090], [1954, 4360], [1955, 5001], [1956, 5229], [1957, 4861], [1958, 5705], [1959, 5745], [1960, 5510], [1961, 6552], [1962, 5771], [1963, 6921], [1964, 6923], [1965, 6362], [1966, 7224], [1967, 7738], [1968, 7085], [1969, 5768], [1970, 7967], [1971, 8488], [1972, 8117], [1973, 7110], [1974, 6973], [1975, 6425], [1976, 7130], [1977, 5475], [1978, 7231], [1979, 6956], [1980, 6415], [1981, 6416], [1982, 6629], [1983, 5762], [1984, 7142], [1985, 7532], [1986, 6842], [1987, 6191], [1988, 5919], [1989, 7412], [1990, 7824], [1991, 6736], [1992, 8139], [1993, 6651], [1994, 8129], [1995, 6756], [1996, 9009], [1997, 8660], [1998, 6604], [1999, 5776], [2e3, 6612], [2001, 5963], [2002, 5820], [2003, 6799], [2004, 6766], [2005, 6778], [2006, 5958], [2007, 5357], [2008, 5955], [2009, 5886], [2010, 4839], [2011, 5659], [2012, 6227], [2013, 5931], [2014, 6137], [2015, 7208], [2016, 5788], [2017, 5590], [2018, 7608], [2019, 6845], [2020, 6278], [2021, 6388], [2022, 5931], [2023, 6167], [2024, 4688]]
  });
  return s.histogramStops = [{
    offset: 0,
    color: "#52aeb7"
  }], s.labelTicks = !0, s.step = 10, s.ticks = 5, i.append(e("Above Zero Min (e.g., Yearly Data)"), s), i;
}, b = () => {
  const e = A({
    range: [0, 100],
    values: [25, 75],
    histogram: [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]]
  });
  return e.ticks = 10, e.className = "calcite-mode-dark", e;
};
b.parameters = {
  themes: O
};
const T = () => l`<calcite-slider disabled value="5"></calcite-slider>`, y = () => l`<calcite-slider
    min="-100"
    max="100"
    min-value="-100"
    max-value="100"
    step="10"
    ticks="10"
    label-handles
    label-ticks
    style="word-break: break-all"
  ></calcite-slider>`, L = () => l` <calcite-slider max="750"></calcite-slider> `, w = () => l`<html lang="en">
    <head>
      <style>
        html {
          font-size: 24px;
        }
        calcite-label {
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <div style="width: 400px; padding: 20px">
        <calcite-label>
          precise with label-handles
          <calcite-slider scale="s" min="10" max="100" value="50" step="10" precise label-handles></calcite-slider
        ></calcite-label>
        <calcite-label>
          precise with label-handles mirrored
          <calcite-slider
            scale="s"
            min="10"
            max="100"
            value="50"
            step="10"
            label-handles
            precise
            mirrored
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            label-ticks
            precise
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks mirrored
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            precise
            mirrored
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks mirrored
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
            mirrored
          ></calcite-slider>
        </calcite-label>
      </div>
    </body>
  </html>`, M = () => l`
  <style>
    calcite-slider {
      width: 60vw;
    }
  </style>

  <calcite-slider min="-100" max="100" ticks="1"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="5"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="10"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="1"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="5"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="10"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="1"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="5"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="10"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="1"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="5"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="10"></calcite-slider>
`, p = () => l(P || (P = I([`
  <calcite-slider id="example-slider" label-ticks max="32" value="24" min="16" snap step="8" ticks="8"></calcite-slider>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-slider");
      const slider = await document.querySelector("calcite-slider").componentOnReady();
      await new Promise((resolve) => requestAnimationFrame(resolve));

      slider.max = 64;
      slider.min = 48;
      slider.step = 16;
      slider.ticks = 16;
      slider.value = 64;
    })();
  <\/script>
`])));
p.parameters = {
  chromatic: {
    delay: 500
  }
};
const F = () => l`
  <calcite-slider
    lang="ru"
    value="1000"
    label-handles
    label-ticks
    group-separator
    max-value="100000"
    max="10000"
    ticks="2000"
  ></calcite-slider>
`, $ = () => l`
  <h1>single</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="end"></calcite-slider>

  <h1>range</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="start"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="start"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="start"
  ></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="none"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="none"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="none"
  ></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="end"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="end"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="end"
  ></calcite-slider>
`, v = () => l(_ || (_ = I([`
  <label>Label formatter (single value)</label>
  <calcite-slider
    id="singleFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="100"
    min="0"
    max="100"
    value="50"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <label>Label formatter (min/max value)</label>
  <calcite-slider
    id="minMaxFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="10"
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <br />
  <br />

  <label>Label formatter (single value + long label)</label>
  <calcite-slider id="singleFormattedLongLabelSlider" label-handles label-ticks></calcite-slider>

  <label>Label formatter (min/max value + long label)</label>
  <calcite-slider
    id="minMaxFormattedLongLabelSlider"
    label-handles
    label-ticks
    min-value="0"
    max-value="100"
  ></calcite-slider>

  <script>
    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");

    singleValueSlider.labelFormatter = function (value, type) {
      if (type === "value") {
        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
      }

      if (type === "tick") {
        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;
      }
    };

    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");

    minMaxValueSlider.labelFormatter = function (value, type) {
      if (type === "min" || type === "max") {
        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        return type === "min" ? value + "ºF" + " " + status : status + " " + value + "ºF";
      }

      if (type === "tick") {
        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
      }
    };

    const singleValueLongLabelSlider = document.getElementById("singleFormattedLongLabelSlider");

    singleValueLongLabelSlider.labelFormatter = function (value) {
      return "long " + value + " label";
    };

    const minMaxValueLongLabelSlider = document.getElementById("minMaxFormattedLongLabelSlider");

    minMaxValueLongLabelSlider.labelFormatter = function (value) {
      return "long " + value + " label";
    };
  <\/script>
`])));
v.parameters = {
  chromatic: {
    delay: 500
  }
};
const E = () => l(D || (D = I([`
  <style>
    .tick-label-examples {
      display: grid;
      gap: var(--calcite-space-lg);
    }

    .bounded-tick-labels {
      inline-size: 400px;
      max-inline-size: 100%;
      outline: var(--calcite-border-width-sm) solid var(--calcite-color-border-1);
    }
  </style>
  <div class="tick-label-examples">
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Compact and longer endpoints"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Compact endpoints"
      label-ticks
      max="9"
      ticks="1"
      value="5"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Signed endpoints"
      label-ticks
      min="-5"
      max="5"
      ticks="1"
      value="0"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      id="percentTickLabelsSlider"
      label-text="Formatted percentages"
      label-ticks
      ticks="20"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Mirrored"
      label-ticks
      mirrored
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      dir="rtl"
      label-text="RTL"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Endpoint handle label"
      label-handles
      label-ticks
      ticks="10"
      value="0"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      id="boundedTickLabelsSlider"
      label-text="Automatically spaced custom tick labels"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
  </div>
  <script>
    document.getElementById("percentTickLabelsSlider").labelFormatter = (value) => value + "%";
    const slider = document.getElementById("boundedTickLabelsSlider");
    slider.labelFormatter = (value, type, defaultFormatter) => {
      if (type === "tick") {
        if (value === slider.min) {
          return "Minimum selectable value";
        }
        if (value === slider.max) {
          return "Maximum selectable value";
        }
      }
      return defaultFormatter(value);
    };
  <\/script>
`]))), q = () => l`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      gap: 20px;
    }
  </style>

  <h2>Standard</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
    <calcite-slider
      scale="m"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
    <calcite-slider
      scale="l"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
  </div>

  <br />

  <h2>Labeled ticks</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
  </div>

  <br />

  <h2>Precise</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
  </div>

  <br />

  <h2>Labeled handles with precise</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
  </div>
`, H = () => l`
  <calcite-slider
    label-text="numbering-system=latn"
    numbering-system="latn"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="en"
    label-handles
    label-text="dir=rtl, numbering-system=latn"
    numbering-system="latn"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="-5"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="ar"
    label-text="numbering-system=arab"
    numbering-system="arab"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="ar"
    label-text="numbering-system=arabext"
    numbering-system="arabext"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
`;
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(args: SliderStoryArgs): string => html\`
  <calcite-slider
    min="\${args.min}"
    max="\${args.max}"
    max-label="\${args.maxLabel}"
    value="\${args.value}"
    step="\${args.step}"
    fill-placement="\${args.fillPlacement}"
    min-label="\${args.minLabel}"
    \${boolean("disabled", args.disabled)}
    \${optionalAttribute("label-text", args.labelText)}
    \${boolean("label-handles", args.labelHandles)}
    \${boolean("label-ticks", args.labelTicks)}
    ticks="\${args.ticks}"
    page-step="\${args.pageStep}"
    \${boolean("precise", args.precise)}
    \${boolean("required", args.required)}
    \${boolean("mirrored", args.mirrored)}
    \${boolean("snap", args.snap)}
    scale="\${args.scale}"
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    \${optionalAttribute("validation-icon", args.validationIcon)}
  ></calcite-slider>
\``,
      ...g.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-slider {
      /* revert global/preview-level width – see https://github.com/Esri/calcite-design-system/blob/c0547b81ef742b3590aaf95423c46ec26283039e/packages/components/.storybook/preview-head.html#L12-L15 */
      width: revert-layer;
    }
  </style>
  <calcite-label>
    Block
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
  <calcite-label layout="inline">
    Inline
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
  <calcite-label layout="inline-space-between">
    Inline space between
    <calcite-slider value="50"></calcite-slider>
  </calcite-label>
\``,
      ...h.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    ticks="20"
    snap
    scale="m"
  ></calcite-slider>
\``,
      ...f.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    class="calcite-mode-dark"
    mirrored
    min="0"
    min-label="Temperature, lower bound"
    min-value="25"
    max="100"
    max-label="Temperature, upper bound"
    max-value="75"
    step="1"
    label-handles
    label-ticks
    ticks="20"
    precise
    snap
    scale="m"
  ></calcite-slider>
\``,
      ...c.parameters?.docs?.source
    }
  }
};
r.parameters = {
  ...r.parameters,
  docs: {
    ...r.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="95"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
\``,
      ...r.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="100"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
\``,
      ...d.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
\``,
      ...m.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="99.5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="100"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
\``,
      ...o.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    min="5"
    min-label="Temperature, lower bound"
    min-value="5"
    max="100"
    max-label="Temperature, upper bound"
    max-value="5.5"
    step="10"
    label-handles
    label-ticks
    snap
  ></calcite-slider>
\``,
      ...u.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
    source: {
      originalSource: `(): HTMLDivElement => {
  function createTitle(title: string) {
    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    return titleElement;
  }
  const sliderContainer = document.createElement("div");
  const histogramSlider = createHistogramSlider({
    range: [-100, 100],
    values: [-33.32, 30.87],
    histogram: [[-90, 0], [-60, 12], [-20, 25], [20, 55], [60, 10], [90, 0]]
  });
  histogramSlider.ticks = 10;
  sliderContainer.append(createTitle("Default"), histogramSlider);
  const colorStopHistogramSlider = createHistogramSlider({
    range: [0, 100],
    values: [35, 55],
    histogram: [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]]
  });
  const colors = ["red", "green", "blue"];
  const offsets = colors.map((_, i) => \`\${1 / (colors.length - 1) * i}\`);
  colorStopHistogramSlider.histogramStops = colors.map((color, i) => ({
    offset: parseFloat(offsets[i]),
    color
  }));
  sliderContainer.append(createTitle("Color Stops"), colorStopHistogramSlider);
  const aboveZeroMinHistogramSlider = createHistogramSlider({
    range: [1925, 2024],
    values: [1925, 1935],
    histogram: [[1925, 2549], [1926, 3125], [1927, 2917], [1928, 2998], [1929, 2794], [1930, 2606], [1931, 2283], [1932, 3551], [1933, 3824], [1934, 3780], [1935, 3463], [1936, 3025], [1937, 2823], [1938, 3232], [1939, 3878], [1940, 3987], [1941, 3328], [1942, 2791], [1943, 3662], [1944, 3598], [1945, 3643], [1946, 3390], [1947, 3424], [1948, 3549], [1949, 4566], [1950, 5147], [1951, 5092], [1952, 4740], [1953, 4090], [1954, 4360], [1955, 5001], [1956, 5229], [1957, 4861], [1958, 5705], [1959, 5745], [1960, 5510], [1961, 6552], [1962, 5771], [1963, 6921], [1964, 6923], [1965, 6362], [1966, 7224], [1967, 7738], [1968, 7085], [1969, 5768], [1970, 7967], [1971, 8488], [1972, 8117], [1973, 7110], [1974, 6973], [1975, 6425], [1976, 7130], [1977, 5475], [1978, 7231], [1979, 6956], [1980, 6415], [1981, 6416], [1982, 6629], [1983, 5762], [1984, 7142], [1985, 7532], [1986, 6842], [1987, 6191], [1988, 5919], [1989, 7412], [1990, 7824], [1991, 6736], [1992, 8139], [1993, 6651], [1994, 8129], [1995, 6756], [1996, 9009], [1997, 8660], [1998, 6604], [1999, 5776], [2000, 6612], [2001, 5963], [2002, 5820], [2003, 6799], [2004, 6766], [2005, 6778], [2006, 5958], [2007, 5357], [2008, 5955], [2009, 5886], [2010, 4839], [2011, 5659], [2012, 6227], [2013, 5931], [2014, 6137], [2015, 7208], [2016, 5788], [2017, 5590], [2018, 7608], [2019, 6845], [2020, 6278], [2021, 6388], [2022, 5931], [2023, 6167], [2024, 4688]]
  });
  aboveZeroMinHistogramSlider.histogramStops = [{
    offset: 0,
    color: "#52aeb7"
  }];
  aboveZeroMinHistogramSlider.labelTicks = true;
  aboveZeroMinHistogramSlider.step = 10;
  aboveZeroMinHistogramSlider.ticks = 5;
  sliderContainer.append(createTitle("Above Zero Min (e.g., Yearly Data)"), aboveZeroMinHistogramSlider);
  return sliderContainer;
}`,
      ...S.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: `(): Slider["el"] => {
  const slider = createHistogramSlider({
    range: [0, 100],
    values: [25, 75],
    histogram: [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]]
  });
  slider.ticks = 10;
  slider.className = "calcite-mode-dark";
  return slider;
}`,
      ...b.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-slider disabled value="5"></calcite-slider>`',
      ...T.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-slider
    min="-100"
    max="100"
    min-value="-100"
    max-value="100"
    step="10"
    ticks="10"
    label-handles
    label-ticks
    style="word-break: break-all"
  ></calcite-slider>\``,
      ...y.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-slider max="750"></calcite-slider> `',
      ...L.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<html lang="en">
    <head>
      <style>
        html {
          font-size: 24px;
        }
        calcite-label {
          padding: 10px;
        }
      </style>
    </head>
    <body>
      <div style="width: 400px; padding: 20px">
        <calcite-label>
          precise with label-handles
          <calcite-slider scale="s" min="10" max="100" value="50" step="10" precise label-handles></calcite-slider
        ></calcite-label>
        <calcite-label>
          precise with label-handles mirrored
          <calcite-slider
            scale="s"
            min="10"
            max="100"
            value="50"
            step="10"
            label-handles
            precise
            mirrored
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            label-ticks
            precise
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise with label-handles & label-ticks mirrored
          <calcite-slider
            min="0"
            max="100"
            value="40"
            step="10"
            ticks="10"
            scale="s"
            label-handles
            precise
            mirrored
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
          ></calcite-slider>
        </calcite-label>
        <calcite-label>
          precise range slider with label-handles & label-ticks mirrored
          <calcite-slider
            min="10"
            max="100"
            min-value="20"
            max-value="90"
            step="10"
            min-label="Temperature range (lower)"
            max-label="Temperature range (upper)"
            scale="s"
            label-handles
            ticks="10"
            precise
            label-ticks
            mirrored
          ></calcite-slider>
        </calcite-label>
      </div>
    </body>
  </html>\``,
      ...w.parameters?.docs?.source
    }
  }
};
M.parameters = {
  ...M.parameters,
  docs: {
    ...M.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    calcite-slider {
      width: 60vw;
    }
  </style>

  <calcite-slider min="-100" max="100" ticks="1"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="5"></calcite-slider>
  <calcite-slider min="-100" max="100" ticks="10"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="1"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="5"></calcite-slider>
  <calcite-slider min="-250" max="250" ticks="10"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="1"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="5"></calcite-slider>
  <calcite-slider min="-500" max="500" ticks="10"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="1"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="5"></calcite-slider>
  <calcite-slider min="-1000" max="1000" ticks="10"></calcite-slider>
\``,
      ...M.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider id="example-slider" label-ticks max="32" value="24" min="16" snap step="8" ticks="8"></calcite-slider>
  <script>
    (async () => {
      await customElements.whenDefined("calcite-slider");
      const slider = await document.querySelector("calcite-slider").componentOnReady();
      await new Promise((resolve) => requestAnimationFrame(resolve));

      slider.max = 64;
      slider.min = 48;
      slider.step = 16;
      slider.ticks = 16;
      slider.value = 64;
    })();
  <\/script>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
F.parameters = {
  ...F.parameters,
  docs: {
    ...F.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    lang="ru"
    value="1000"
    label-handles
    label-ticks
    group-separator
    max-value="100000"
    max="10000"
    ticks="2000"
  ></calcite-slider>
\``,
      ...F.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <h1>single</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="start"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="start"></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="none"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="none"></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="0" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="50" fill-placement="end"></calcite-slider>
  <calcite-slider ticks="10" label-ticks min="0" max="100" value="100" fill-placement="end"></calcite-slider>

  <h1>range</h1>

  <h2>start (default)</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="start"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="start"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="start"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="start"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="start"
  ></calcite-slider>
  <br />
  <h2>none</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="none"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="none"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="none"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="none"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="none"
  ></calcite-slider>
  <br />
  <h2>end</h2>
  <calcite-slider min="0" max="100" min-value="0" max-value="25" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="25" max-value="75" fill-placement="end"></calcite-slider>
  <calcite-slider min="0" max="100" min-value="75" max-value="100" fill-placement="end"></calcite-slider>
  <br />
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="0"
    max-value="25"
    fill-placement="end"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    fill-placement="end"
  ></calcite-slider>
  <calcite-slider
    ticks="10"
    label-ticks
    min="0"
    max="100"
    min-value="75"
    max-value="100"
    fill-placement="end"
  ></calcite-slider>
\``,
      ...$.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <label>Label formatter (single value)</label>
  <calcite-slider
    id="singleFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="100"
    min="0"
    max="100"
    value="50"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <label>Label formatter (min/max value)</label>
  <calcite-slider
    id="minMaxFormattedLabelSlider"
    label-handles
    label-ticks
    ticks="10"
    min="0"
    max="100"
    min-value="25"
    max-value="75"
    step="1"
    min-label="Temperature"
  ></calcite-slider>

  <br />
  <br />

  <label>Label formatter (single value + long label)</label>
  <calcite-slider id="singleFormattedLongLabelSlider" label-handles label-ticks></calcite-slider>

  <label>Label formatter (min/max value + long label)</label>
  <calcite-slider
    id="minMaxFormattedLongLabelSlider"
    label-handles
    label-ticks
    min-value="0"
    max-value="100"
  ></calcite-slider>

  <script>
    const singleValueSlider = document.getElementById("singleFormattedLabelSlider");

    singleValueSlider.labelFormatter = function (value, type) {
      if (type === "value") {
        return value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
      }

      if (type === "tick") {
        return value === singleValueSlider.min ? "Cold" : value === singleValueSlider.max ? "Hot" : undefined;
      }
    };

    const minMaxValueSlider = document.getElementById("minMaxFormattedLabelSlider");

    minMaxValueSlider.labelFormatter = function (value, type) {
      if (type === "min" || type === "max") {
        const status = value < 60 ? "🥶" : value > 80 ? "🥵" : "😎";
        return type === "min" ? value + "ºF" + " " + status : status + " " + value + "ºF";
      }

      if (type === "tick") {
        return value === minMaxValueSlider.max ? value + "ºF" : value + "º";
      }
    };

    const singleValueLongLabelSlider = document.getElementById("singleFormattedLongLabelSlider");

    singleValueLongLabelSlider.labelFormatter = function (value) {
      return "long " + value + " label";
    };

    const minMaxValueLongLabelSlider = document.getElementById("minMaxFormattedLongLabelSlider");

    minMaxValueLongLabelSlider.labelFormatter = function (value) {
      return "long " + value + " label";
    };
  <\/script>
\``,
      ...v.parameters?.docs?.source
    }
  }
};
E.parameters = {
  ...E.parameters,
  docs: {
    ...E.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .tick-label-examples {
      display: grid;
      gap: var(--calcite-space-lg);
    }

    .bounded-tick-labels {
      inline-size: 400px;
      max-inline-size: 100%;
      outline: var(--calcite-border-width-sm) solid var(--calcite-color-border-1);
    }
  </style>
  <div class="tick-label-examples">
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Compact and longer endpoints"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Compact endpoints"
      label-ticks
      max="9"
      ticks="1"
      value="5"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Signed endpoints"
      label-ticks
      min="-5"
      max="5"
      ticks="1"
      value="0"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      id="percentTickLabelsSlider"
      label-text="Formatted percentages"
      label-ticks
      ticks="20"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Mirrored"
      label-ticks
      mirrored
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      dir="rtl"
      label-text="RTL"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      label-text="Endpoint handle label"
      label-handles
      label-ticks
      ticks="10"
      value="0"
    ></calcite-slider>
    <calcite-slider
      class="bounded-tick-labels"
      id="boundedTickLabelsSlider"
      label-text="Automatically spaced custom tick labels"
      label-ticks
      ticks="10"
      value="50"
    ></calcite-slider>
  </div>
  <script>
    document.getElementById("percentTickLabelsSlider").labelFormatter = (value) => value + "%";
    const slider = document.getElementById("boundedTickLabelsSlider");
    slider.labelFormatter = (value, type, defaultFormatter) => {
      if (type === "tick") {
        if (value === slider.min) {
          return "Minimum selectable value";
        }
        if (value === slider.max) {
          return "Maximum selectable value";
        }
      }
      return defaultFormatter(value);
    };
  <\/script>
\``,
      ...E.parameters?.docs?.source
    }
  }
};
q.parameters = {
  ...q.parameters,
  docs: {
    ...q.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <style>
    .container {
      display: flex;
      flex-direction: column;
      width: 400px;
      gap: 20px;
    }
  </style>

  <h2>Standard</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
    <calcite-slider
      scale="m"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
    <calcite-slider
      scale="l"
      validation-message="This field is required."
      validation-icon
      status="invalid"
    ></calcite-slider>
  </div>

  <br />

  <h2>Labeled ticks</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      step="10"
      ticks="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      label-ticks
    ></calcite-slider>
  </div>

  <br />

  <h2>Precise</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
    ></calcite-slider>
  </div>

  <br />

  <h2>Labeled handles with precise</h2>

  <div class="container">
    <calcite-slider
      scale="s"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
    <calcite-slider
      scale="m"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
    <calcite-slider
      scale="l"
      min="0"
      max="100"
      min-value="0"
      max-value="100"
      step="10"
      validation-message="This field is required."
      validation-icon
      status="invalid"
      precise
      label-handles
    ></calcite-slider>
  </div>
\``,
      ...q.parameters?.docs?.source
    }
  }
};
H.parameters = {
  ...H.parameters,
  docs: {
    ...H.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-slider
    label-text="numbering-system=latn"
    numbering-system="latn"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="en"
    label-handles
    label-text="dir=rtl, numbering-system=latn"
    numbering-system="latn"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="-5"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="ar"
    label-text="numbering-system=arab"
    numbering-system="arab"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
  <br />
  <calcite-slider
    dir="rtl"
    lang="ar"
    label-text="numbering-system=arabext"
    numbering-system="arabext"
    label-ticks
    min="-10"
    max="10"
    ticks="5"
    value="0"
  ></calcite-slider>
\``,
      ...H.parameters?.docs?.source
    }
  }
};
const ae = ["simple", "WrappedInLabel", "range", "darkModeMirroredRange", "rangeLabeledTicks", "rangeLabeledTicksOverlappingAtMax", "rangeLabeledTicksOverlappingAtMin", "rangeLabeledTicksEdgePositioningAtMax", "rangeLabeledTicksEdgePositioningAtMin", "Histogram", "darkModeHistogramRTL", "disabled", "wordBreakDoesNotAffectLabels", "WithLabelHandlesAndNoValue", "WithLargeFontSize", "maxTickRendering", "rendersWhenTrackRelatedPropChanges", "spaceGroupSeparatorNoBreak", "fillPlacements", "customLabelsAndTicks", "tickLabelsWithinBounds", "validationMessageAllScales", "negativeSignHandlingForDifferentNumberingSystems"];
export {
  S as Histogram,
  L as WithLabelHandlesAndNoValue,
  w as WithLargeFontSize,
  h as WrappedInLabel,
  ae as __namedExportsOrder,
  v as customLabelsAndTicks,
  b as darkModeHistogramRTL,
  c as darkModeMirroredRange,
  le as default,
  T as disabled,
  $ as fillPlacements,
  M as maxTickRendering,
  H as negativeSignHandlingForDifferentNumberingSystems,
  f as range,
  r as rangeLabeledTicks,
  o as rangeLabeledTicksEdgePositioningAtMax,
  u as rangeLabeledTicksEdgePositioningAtMin,
  d as rangeLabeledTicksOverlappingAtMax,
  m as rangeLabeledTicksOverlappingAtMin,
  p as rendersWhenTrackRelatedPropChanges,
  g as simple,
  F as spaceGroupSeparatorNoBreak,
  E as tickLabelsWithinBounds,
  q as validationMessageAllScales,
  y as wordBreakDoesNotAffectLabels
};
