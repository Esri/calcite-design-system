/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as a } from "./formatting.js";
import { b as r, m as D } from "./utils3.js";
import { A as B } from "./resources34.js";
import "./meter.js";
const {
  fillType: S,
  appearance: M,
  labelType: t,
  scale: P
} = B, A = {
  title: "Components/Meter",
  args: {
    min: 0,
    max: 100,
    low: 0,
    high: 0,
    value: 0,
    fillType: S.defaultValue,
    appearance: M.values[2],
    disabled: !1,
    label: "Meter example",
    rangeLabelType: t.defaultValue,
    scale: P.defaultValue,
    valueLabelType: t.defaultValue,
    unitLabel: "",
    groupSeparator: !1,
    rangeLabels: !1,
    valueLabel: !1
  },
  argTypes: {
    fillType: {
      options: S.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: M.values.filter((e) => e !== "transparent"),
      control: {
        type: "select"
      }
    },
    rangeLabelType: {
      options: t.values,
      control: {
        type: "select"
      }
    },
    valueLabelType: {
      options: t.values,
      control: {
        type: "select"
      }
    },
    scale: {
      options: P.values,
      control: {
        type: "select"
      }
    }
  }
}, n = (e) => a`<calcite-meter
    ${r("disabled", e.disabled)}
    label="${e.label}"
    min="${e.min}"
    max="${e.max}"
    low="${e.low}"
    high="${e.high}"
    value="${e.value}"
    fill-type="${e.fillType}"
    appearance="${e.appearance}"
    range-label-type="${e.rangeLabelType}"
    scale="${e.scale}"
    value-label-type="${e.valueLabelType}"
    unit-label="${e.unitLabel}"
    ${r("group-separator", e.groupSeparator)}
    ${r("range-labels", e.rangeLabels)}
    ${r("value-label", e.valueLabel)}
  ></calcite-meter>`, s = () => a`<calcite-meter
    min="500"
    max="10000"
    low="2500"
    high="7500"
    value="1750"
    fill-type="range"
    appearance="single"
    range-label-type="units"
    value-label-type="percent"
    unit-label="credits"
    group-separator
    range-labels
    value-label
  ></calcite-meter>`, c = () => a`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`, i = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="30"
    high="90"
    value="10"
  ></calcite-meter>`, o = () => a`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`, m = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="20"
    high="25"
    value="5"
  ></calcite-meter>`, u = () => a`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`, p = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="-100"
    min="0"
    max="100"
  ></calcite-meter>`, b = () => a`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`, g = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="200"
    min="0"
    max="100"
  ></calcite-meter>`, d = () => a`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`, v = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`, h = () => a`<calcite-meter
    value-label
    range-labels
    value-label-type="units"
    unit-label="credits"
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`, x = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    value-label-type="units"
    unit-label="credits"
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`, w = () => a`<calcite-meter
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, L = () => a`<calcite-meter
    unit-label="GB"
    value-label
    range-labels
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, l = () => a`<calcite-meter
    dir="rtl"
    class="calcite-mode-dark"
    min="0"
    max="100"
    low="25"
    high="75"
    value-label
    range-labels
  ></calcite-meter>`;
l.parameters = {
  themes: D
};
const y = () => a`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, T = () => a`<calcite-meter
    dir="rtl"
    unit-label="GB"
    value-label
    range-labels
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, C = (e, f) => a`
  <calcite-meter
    label="${f}"
    scale="${e}"
    min="0"
    max="100"
    low="25"
    high="75"
    value="50"
    value-label
    range-labels
  ></calcite-meter>
`, $ = () => a`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${[{
  scale: "s",
  label: "Meter small"
}, {
  scale: "m",
  label: "Meter medium"
}, {
  scale: "l",
  label: "Meter large"
}].map(({
  scale: f,
  label: R
}) => C(f, R)).join("")}
    </div>
  `;
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
    source: {
      originalSource: '(args: MeterStoryArgs): string => html`<calcite-meter\n    ${boolean("disabled", args.disabled)}\n    label="${args.label}"\n    min="${args.min}"\n    max="${args.max}"\n    low="${args.low}"\n    high="${args.high}"\n    value="${args.value}"\n    fill-type="${args.fillType}"\n    appearance="${args.appearance}"\n    range-label-type="${args.rangeLabelType}"\n    scale="${args.scale}"\n    value-label-type="${args.valueLabelType}"\n    unit-label="${args.unitLabel}"\n    ${boolean("group-separator", args.groupSeparator)}\n    ${boolean("range-labels", args.rangeLabels)}\n    ${boolean("value-label", args.valueLabel)}\n  ></calcite-meter>`',
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    min="500"
    max="10000"
    low="2500"
    high="7500"
    value="1750"
    fill-type="range"
    appearance="single"
    range-label-type="units"
    value-label-type="percent"
    unit-label="credits"
    group-separator
    range-labels
    value-label
  ></calcite-meter>\``,
      ...s.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`',
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="30"
    high="90"
    value="10"
  ></calcite-meter>\``,
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`',
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="20"
    high="25"
    value="5"
  ></calcite-meter>\``,
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`',
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="-100"
    min="0"
    max="100"
  ></calcite-meter>\``,
      ...p.parameters?.docs?.source
    }
  }
};
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`',
      ...b.parameters?.docs?.source
    }
  }
};
g.parameters = {
  ...g.parameters,
  docs: {
    ...g.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="200"
    min="0"
    max="100"
  ></calcite-meter>\``,
      ...g.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`',
      ...d.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>\``,
      ...v.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    value-label
    range-labels
    value-label-type="units"
    unit-label="credits"
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>\``,
      ...h.parameters?.docs?.source
    }
  }
};
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    value-label-type="units"
    unit-label="credits"
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>\``,
      ...x.parameters?.docs?.source
    }
  }
};
w.parameters = {
  ...w.parameters,
  docs: {
    ...w.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>\``,
      ...w.parameters?.docs?.source
    }
  }
};
L.parameters = {
  ...L.parameters,
  docs: {
    ...L.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    unit-label="GB"
    value-label
    range-labels
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>\``,
      ...L.parameters?.docs?.source
    }
  }
};
l.parameters = {
  ...l.parameters,
  docs: {
    ...l.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    class="calcite-mode-dark"
    min="0"
    max="100"
    low="25"
    high="75"
    value-label
    range-labels
  ></calcite-meter>\``,
      ...l.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>\``,
      ...y.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
    source: {
      originalSource: `(): string => html\`<calcite-meter
    dir="rtl"
    unit-label="GB"
    value-label
    range-labels
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>\``,
      ...T.parameters?.docs?.source
    }
  }
};
$.parameters = {
  ...$.parameters,
  docs: {
    ...$.parameters?.docs,
    source: {
      originalSource: `(): string => {
  const configs = [{
    scale: "s",
    label: "Meter small"
  }, {
    scale: "m",
    label: "Meter medium"
  }, {
    scale: "l",
    label: "Meter large"
  }] as const;
  return html\`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      \${configs.map(({
    scale,
    label
  }) => renderScaleMeter(scale, label)).join("")}
    </div>
  \`;
}`,
      ...$.parameters?.docs?.source
    }
  }
};
const k = ["simple", "complex", "swapLabelPlacementWhenCloseToMax", "swapLabelPlacementWhenCloseToMaxRTL", "swapLabelPlacementWhenLowCloseToHigh", "swapLabelPlacementWhenLowCloseToHighRTL", "valueDoesNotPositionBelowMin", "valueDoesNotPositionBelowMinRTL", "valueDoesNotPositionAboveMax", "valueDoesNotPositionAboveMaxRTL", "hideOverlappingLabel", "hideOverlappingLabelRTL", "hideOverlappingLabelUnits", "hideOverlappingLabelUnitsRTL", "complexPercent", "complexUnit", "darkModeRTL", "complexPercentRTL", "complexUnitRTL", "scales"];
export {
  k as __namedExportsOrder,
  s as complex,
  w as complexPercent,
  y as complexPercentRTL,
  L as complexUnit,
  T as complexUnitRTL,
  l as darkModeRTL,
  A as default,
  d as hideOverlappingLabel,
  v as hideOverlappingLabelRTL,
  h as hideOverlappingLabelUnits,
  x as hideOverlappingLabelUnitsRTL,
  $ as scales,
  n as simple,
  c as swapLabelPlacementWhenCloseToMax,
  i as swapLabelPlacementWhenCloseToMaxRTL,
  o as swapLabelPlacementWhenLowCloseToHigh,
  m as swapLabelPlacementWhenLowCloseToHighRTL,
  b as valueDoesNotPositionAboveMax,
  g as valueDoesNotPositionAboveMaxRTL,
  u as valueDoesNotPositionBelowMin,
  p as valueDoesNotPositionBelowMinRTL
};
