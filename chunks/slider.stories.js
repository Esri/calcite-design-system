import { b as a, m as q } from "./utils.js";
import { h as l } from "./formatting.js";
import { i as H } from "./helpers.js";
import { A as I } from "./resources14.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v3.1.0-next.5 */
var P = {}, M = Object.freeze, W = Object.defineProperty, E = (e, u) => M(W(e, "raw", { value: M(e.slice()) })), O, F;
const {
  scale: V,
  status: $
} = I, D = {
  title: "Components/Controls/Slider",
  args: {
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    minLabel: "Temperature",
    disabled: !1,
    labelHandles: !1,
    labelTicks: !1,
    ticks: 0,
    pageStep: 5,
    precise: !1,
    mirrored: !1,
    snap: !0,
    scale: V.defaultValue,
    status: $.defaultValue,
    validationMessage: "",
    validationIcon: ""
  },
  argTypes: {
    scale: {
      options: V.values,
      control: {
        type: "select"
      }
    },
    status: {
      options: $.values,
      control: {
        type: "select"
      }
    },
    validationIcon: {
      options: H,
      control: {
        type: "select"
      }
    }
  },
  parameters: {
    chromatic: {
      // https://www.chromatic.com/docs/threshold
      diffThreshold: Number(P.CHROMATIC_DIFF_THRESHOLD) || 0.3,
      delay: 500
    }
  }
}, p = (e) => l`
  <calcite-slider
    min="${e.min}"
    max="${e.max}"
    value="${e.value}"
    step="${e.step}"
    min-label="${e.minLabel}"
    ${a("disabled", e.disabled)}
    ${a("label-handles", e.labelHandles)}
    ${a("label-ticks", e.labelTicks)}
    ticks="${e.ticks}"
    page-step="${e.pageStep}"
    ${a("precise", e.precise)}
    ${a("mirrored", e.mirrored)}
    ${a("snap", e.snap)}
    scale="${e.scale}"
    status="${e.status}"
    validation-message="${e.validationMessage}"
    validation-icon="${e.validationIcon}"
  ></calcite-slider>
`, b = () => l`
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
`, i = () => l`
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
i.story = {
  parameters: {
    themes: q
  }
};
const n = () => l`
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
n.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const s = () => l`
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
s.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const t = () => l`
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
t.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const c = () => l`
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
c.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const r = () => l`
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
r.parameters = {
  chromatic: {
    diffThreshold: 1
  }
};
const v = () => {
  const e = document.createElement("calcite-slider");
  return e.min = -100, e.minValue = -33.32, e.max = 100, e.maxValue = 30.87, e.histogram = [[-90, 0], [-60, 12], [-20, 25], [20, 55], [60, 10], [90, 0]], e.ticks = 10, e.scale = "m", e.style.minWidth = "60vw", e;
}, x = () => {
  const e = document.createElement("calcite-slider");
  e.min = 0, e.minValue = 35, e.max = 100, e.maxValue = 55, e.histogram = [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]], e.style.minWidth = "60vw";
  const u = ["red", "green", "blue"], A = u.map((_, w) => `${1 / (u.length - 1) * w}`);
  return e.histogramStops = u.map((_, w) => ({
    offset: parseFloat(A[w]),
    color: _
  })), e.scale = "m", e;
}, m = () => {
  const e = document.createElement("calcite-slider");
  return e.min = 0, e.minValue = 25, e.max = 100, e.maxValue = 75, e.histogram = [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]], e.ticks = 10, e.scale = "m", e.style.minWidth = "60vw", e.className = "calcite-mode-dark", e;
};
m.parameters = {
  themes: q
};
const h = () => l`<calcite-slider disabled value="5"></calcite-slider>`, k = () => l`<calcite-slider
    min="-100"
    max="100"
    min-value="-100"
    max-value="100"
    step="10"
    ticks="10"
    label-handles
    label-ticks
    style="word-break: break-all"
  ></calcite-slider>`, g = () => l` <calcite-slider max="750"></calcite-slider> `, f = () => l`<html lang="en">
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
  </html>`, T = () => l`
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
`, d = () => l(O || (O = E([`
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
d.parameters = {
  chromatic: {
    delay: 500
  }
};
const y = () => l`
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
`, S = () => l`
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
`, o = () => l(F || (F = E([`
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
o.parameters = {
  chromatic: {
    delay: 500
  }
};
const L = () => l`
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
`;
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(args: SliderStoryArgs): string => html\`
  <calcite-slider
    min="\${args.min}"
    max="\${args.max}"
    value="\${args.value}"
    step="\${args.step}"
    min-label="\${args.minLabel}"
    \${boolean("disabled", args.disabled)}
    \${boolean("label-handles", args.labelHandles)}
    \${boolean("label-ticks", args.labelTicks)}
    ticks="\${args.ticks}"
    page-step="\${args.pageStep}"
    \${boolean("precise", args.precise)}
    \${boolean("mirrored", args.mirrored)}
    \${boolean("snap", args.snap)}
    scale="\${args.scale}"
    status="\${args.status}"
    validation-message="\${args.validationMessage}"
    validation-icon="\${args.validationIcon}"
  ></calcite-slider>
\``,
      ...p.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
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
      ...b.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
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
      ...i.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
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
      ...s.parameters?.docs?.source
    }
  }
};
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
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
      ...t.parameters?.docs?.source
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
      ...r.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): HTMLCalciteSliderElement["el"]["el"] => {
  const slider = document.createElement("calcite-slider");
  slider.min = -100;
  slider.minValue = -33.32;
  slider.max = 100;
  slider.maxValue = 30.87;
  slider.histogram = [[-90, 0], [-60, 12], [-20, 25], [20, 55], [60, 10], [90, 0]] as any;
  slider.ticks = 10;
  slider.scale = "m";
  slider.style.minWidth = "60vw";
  return slider;
}`,
      ...v.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): HTMLCalciteSliderElement["el"]["el"] => {
  const slider = document.createElement("calcite-slider");
  slider.min = 0;
  slider.minValue = 35;
  slider.max = 100;
  slider.maxValue = 55;
  slider.histogram = [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]] as any;
  slider.style.minWidth = "60vw";
  const colors = ["red", "green", "blue"];
  const offsets = colors.map((_, i) => \`\${1 / (colors.length - 1) * i}\`);
  slider.histogramStops = colors.map((color, i) => ({
    offset: parseFloat(offsets[i]),
    color
  }));
  slider.scale = "m";
  return slider;
}`,
      ...x.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): HTMLCalciteSliderElement["el"]["el"] => {
  const slider = document.createElement("calcite-slider");
  slider.min = 0;
  slider.minValue = 25;
  slider.max = 100;
  slider.maxValue = 75;
  slider.histogram = [[0, 0], [20, 12], [40, 25], [60, 55], [80, 10], [100, 0]];
  slider.ticks = 10;
  slider.scale = "m";
  slider.style.minWidth = "60vw";
  slider.className = "calcite-mode-dark";
  return slider;
}`,
      ...m.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-slider disabled value="5"></calcite-slider>`',
      ...h.parameters?.docs?.source
    }
  }
};
k.parameters = {
  ...k.parameters,
  docs: {
    ...k.parameters?.docs,
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
      ...k.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: '(): string => html` <calcite-slider max="750"></calcite-slider> `',
      ...g.parameters?.docs?.source
    }
  }
};
f.parameters = {
  ...f.parameters,
  docs: {
    ...f.parameters?.docs,
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
      ...f.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
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
      ...T.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
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
      ...y.parameters?.docs?.source
    }
  }
};
S.parameters = {
  ...S.parameters,
  docs: {
    ...S.parameters?.docs,
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
      ...S.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
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
      ...L.parameters?.docs?.source
    }
  }
};
const z = ["simple", "range", "darkModeMirroredRange_TestOnly", "rangeLabeledTicks_TestOnly", "rangeLabeledTicksOverlappingAtMax_TestOnly", "rangeLabeledTicksOverlappingAtMin_TestOnly", "rangeLabeledTicksEdgePositioningAtMax_TestOnly", "rangeLabeledTicksEdgePositioningAtMin_TestOnly", "Histogram", "HistogramWithColors", "darkModeHistogramRTL_TestOnly", "disabled_TestOnly", "wordBreakDoesNotAffectLabels_TestOnly", "WithLabelHandlesAndNoValue_TestOnly", "WithLargeFontSize_TestOnly", "maxTickRendering_TestOnly", "rendersWhenTrackRelatedPropChanges_TestOnly", "spaceGroupSeparatorNoBreak_TestOnly", "fillPlacements", "customLabelsAndTicks", "validationMessageAllScales_TestOnly"];
export {
  v as Histogram,
  x as HistogramWithColors,
  g as WithLabelHandlesAndNoValue_TestOnly,
  f as WithLargeFontSize_TestOnly,
  z as __namedExportsOrder,
  o as customLabelsAndTicks,
  m as darkModeHistogramRTL_TestOnly,
  i as darkModeMirroredRange_TestOnly,
  D as default,
  h as disabled_TestOnly,
  S as fillPlacements,
  T as maxTickRendering_TestOnly,
  b as range,
  c as rangeLabeledTicksEdgePositioningAtMax_TestOnly,
  r as rangeLabeledTicksEdgePositioningAtMin_TestOnly,
  s as rangeLabeledTicksOverlappingAtMax_TestOnly,
  t as rangeLabeledTicksOverlappingAtMin_TestOnly,
  n as rangeLabeledTicks_TestOnly,
  d as rendersWhenTrackRelatedPropChanges_TestOnly,
  p as simple,
  y as spaceGroupSeparatorNoBreak_TestOnly,
  L as validationMessageAllScales_TestOnly,
  k as wordBreakDoesNotAffectLabels_TestOnly
};
