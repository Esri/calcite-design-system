import { h as e } from "./index.js";
/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
const a = {
  title: "Components/InputMessage"
}, s = () => e`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
`;
s.parameters = {
  ...s.parameters,
  docs: {
    ...s.parameters?.docs,
    source: {
      originalSource: `(): string => html\`
  <calcite-input-message status="invalid" icon="frown">Message</calcite-input-message>
  <calcite-input-message status="valid" icon="smile">Message</calcite-input-message>
  <calcite-input-message status="idle" icon="information">Message</calcite-input-message>
\``,
      ...s.parameters?.docs?.source
    }
  }
};
const i = ["status"];
export {
  i as __namedExportsOrder,
  a as default,
  s as status
};
