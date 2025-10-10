import { j as e, M as i, c as r } from "./blocks.js";
import { useMDXComponents as a } from "./index3.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const o = `# Licensing

COPYRIGHT © 2025 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at <http://www.esri.com/legal/pdfs/mla_e204_e300/english>

For additional information, refer to [Calcite's licensing](https://developers.arcgis.com/calcite-design-system/resources/licensing) and contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: <contracts@esri.com>
`;
function s(t) {
  return e.jsxs(e.Fragment, {
    children: [e.jsx(i, {
      title: "Overview/Licensing"
    }), `
`, `
`, e.jsx(r, {
      children: o
    })]
  });
}
function l(t = {}) {
  const { wrapper: n } = {
    ...a(),
    ...t.components
  };
  return n ? e.jsx(n, {
    ...t,
    children: e.jsx(s, {
      ...t
    })
  }) : s();
}
export {
  l as default
};
