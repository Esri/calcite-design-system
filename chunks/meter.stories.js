import { k as L, h as e, j as $ } from "./index.js";
import { A as S } from "./resources16.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const {
  fillType: O,
  appearance: _,
  labelType: r
} = S, R = {
  title: "Components/Meter",
  args: {
    min: 0,
    max: 100,
    low: 0,
    high: 0,
    value: 0,
    fillType: O.defaultValue,
    appearance: _.values[2],
    rangeLabelType: r.defaultValue,
    valueLabelType: r.defaultValue,
    unitLabel: "",
    groupSeparator: !1,
    rangeLabels: !1,
    valueLabel: !1
  },
  argTypes: {
    fillType: {
      options: O.values,
      control: {
        type: "select"
      }
    },
    appearance: {
      options: _.values.filter((a) => a !== "transparent"),
      control: {
        type: "select"
      }
    },
    rangeLabelType: {
      options: r.values,
      control: {
        type: "select"
      }
    },
    valueLabelType: {
      options: r.values,
      control: {
        type: "select"
      }
    }
  }
}, t = (a) => e`<calcite-meter
    label="Meter example"
    min="${a.min}"
    max="${a.max}"
    low="${a.low}"
    high="${a.high}"
    value="${a.value}"
    fill-type="${a.fillType}"
    appearance="${a.appearance}"
    range-label-type="${a.rangeLabelType}"
    value-label-type="${a.valueLabelType}"
    unit-label="${a.unitLabel}"
    ${L("group-separator", a.groupSeparator)}
    ${L("range-labels", a.rangeLabels)}
    ${L("value-label", a.valueLabel)}
  ></calcite-meter>`, n = () => e`<calcite-meter
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
  ></calcite-meter>`, s = () => e`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`, c = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="30"
    high="90"
    value="10"
  ></calcite-meter>`, i = () => e`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`, o = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="100"
    low="20"
    high="25"
    value="5"
  ></calcite-meter>`, m = () => e`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`, u = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="-100"
    min="0"
    max="100"
  ></calcite-meter>`, p = () => e`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`, g = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="25"
    high="75"
    value="200"
    min="0"
    max="100"
  ></calcite-meter>`, b = () => e`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`, h = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`, v = () => e`<calcite-meter
    value-label
    range-labels
    value-label-type="units"
    unit-label="credits"
    low="2"
    high="98"
    value="0"
    min="0"
    max="100"
  ></calcite-meter>`, d = () => e`<calcite-meter
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
  ></calcite-meter>`, T = () => e`<calcite-meter
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, y = () => e`<calcite-meter
    unit-label="GB"
    value-label
    range-labels
    value-label-type="units"
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, l = () => e`<calcite-meter
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
  themes: $
};
const x = () => e`<calcite-meter
    dir="rtl"
    value-label
    range-labels
    min="0"
    max="12400"
    low="4600"
    high="7600"
    value="2200"
  ></calcite-meter>`, w = () => e`<calcite-meter
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
  ></calcite-meter>`;
t.parameters = {
  ...t.parameters,
  docs: {
    ...t.parameters?.docs,
    source: {
      originalSource: '(args: MeterStoryArgs): string => html`<calcite-meter\n    label="Meter example"\n    min="${args.min}"\n    max="${args.max}"\n    low="${args.low}"\n    high="${args.high}"\n    value="${args.value}"\n    fill-type="${args.fillType}"\n    appearance="${args.appearance}"\n    range-label-type="${args.rangeLabelType}"\n    value-label-type="${args.valueLabelType}"\n    unit-label="${args.unitLabel}"\n    ${boolean("group-separator", args.groupSeparator)}\n    ${boolean("range-labels", args.rangeLabels)}\n    ${boolean("value-label", args.valueLabel)}\n  ></calcite-meter>`',
      ...t.parameters?.docs?.source
    }
  }
};
n.parameters = {
  ...n.parameters,
  docs: {
    ...n.parameters?.docs,
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
      ...n.parameters?.docs?.source
    }
  }
};
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels min="0" max="100" low="30" high="90" value="10"></calcite-meter>`',
      ...s.parameters?.docs?.source
    }
  }
};
c.parameters = {
  ...c.parameters,
  docs: {
    ...c.parameters?.docs,
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
      ...c.parameters?.docs?.source
    }
  }
};
i.parameters = {
  ...i.parameters,
  docs: {
    ...i.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels min="0" max="100" low="20" high="25" value="5"></calcite-meter>`',
      ...i.parameters?.docs?.source
    }
  }
};
o.parameters = {
  ...o.parameters,
  docs: {
    ...o.parameters?.docs,
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
      ...o.parameters?.docs?.source
    }
  }
};
m.parameters = {
  ...m.parameters,
  docs: {
    ...m.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="25" high="75" value="-100" min="0" max="100"></calcite-meter>`',
      ...m.parameters?.docs?.source
    }
  }
};
u.parameters = {
  ...u.parameters,
  docs: {
    ...u.parameters?.docs,
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
      ...u.parameters?.docs?.source
    }
  }
};
p.parameters = {
  ...p.parameters,
  docs: {
    ...p.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="25" high="75" value="200" min="0" max="100"></calcite-meter>`',
      ...p.parameters?.docs?.source
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
b.parameters = {
  ...b.parameters,
  docs: {
    ...b.parameters?.docs,
    source: {
      originalSource: '(): string => html`<calcite-meter value-label range-labels low="2" high="98" value="0" min="0" max="100"></calcite-meter>`',
      ...b.parameters?.docs?.source
    }
  }
};
h.parameters = {
  ...h.parameters,
  docs: {
    ...h.parameters?.docs,
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
      ...h.parameters?.docs?.source
    }
  }
};
v.parameters = {
  ...v.parameters,
  docs: {
    ...v.parameters?.docs,
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
      ...v.parameters?.docs?.source
    }
  }
};
d.parameters = {
  ...d.parameters,
  docs: {
    ...d.parameters?.docs,
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
      ...d.parameters?.docs?.source
    }
  }
};
T.parameters = {
  ...T.parameters,
  docs: {
    ...T.parameters?.docs,
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
      ...T.parameters?.docs?.source
    }
  }
};
y.parameters = {
  ...y.parameters,
  docs: {
    ...y.parameters?.docs,
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
      ...y.parameters?.docs?.source
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
x.parameters = {
  ...x.parameters,
  docs: {
    ...x.parameters?.docs,
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
      ...w.parameters?.docs?.source
    }
  }
};
const M = ["simple", "complex", "swapLabelPlacementWhenCloseToMax_TestOnly", "swapLabelPlacementWhenCloseToMaxRTL_TestOnly", "swapLabelPlacementWhenLowCloseToHigh_TestOnly", "swapLabelPlacementWhenLowCloseToHighRTL_TestOnly", "valueDoesNotPositionBelowMin_TestOnly", "valueDoesNotPositionBelowMinRTL_TestOnly", "valueDoesNotPositionAboveMax_TestOnly", "valueDoesNotPositionAboveMaxRTL_TestOnly", "hideOverlappingLabel_TestOnly", "hideOverlappingLabelRTL_TestOnly", "hideOverlappingLabelUnits_TestOnly", "hideOverlappingLabelUnitsRTL_TestOnly", "complexPercent_TestOnly", "complexUnit_TestOnly", "darkModeRTL_TestOnly", "complexPercentRTL_TestOnly", "complexUnitRTL_TestOnly"];
export {
  M as __namedExportsOrder,
  n as complex,
  x as complexPercentRTL_TestOnly,
  T as complexPercent_TestOnly,
  w as complexUnitRTL_TestOnly,
  y as complexUnit_TestOnly,
  l as darkModeRTL_TestOnly,
  R as default,
  h as hideOverlappingLabelRTL_TestOnly,
  d as hideOverlappingLabelUnitsRTL_TestOnly,
  v as hideOverlappingLabelUnits_TestOnly,
  b as hideOverlappingLabel_TestOnly,
  t as simple,
  c as swapLabelPlacementWhenCloseToMaxRTL_TestOnly,
  s as swapLabelPlacementWhenCloseToMax_TestOnly,
  o as swapLabelPlacementWhenLowCloseToHighRTL_TestOnly,
  i as swapLabelPlacementWhenLowCloseToHigh_TestOnly,
  g as valueDoesNotPositionAboveMaxRTL_TestOnly,
  p as valueDoesNotPositionAboveMax_TestOnly,
  u as valueDoesNotPositionBelowMinRTL_TestOnly,
  m as valueDoesNotPositionBelowMin_TestOnly
};
