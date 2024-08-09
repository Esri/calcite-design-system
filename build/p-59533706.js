/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{h as t}from"./p-a1b5fdc3.js";const o={arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"};const r={width:12,height:6,strokeWidth:1};const e=({floatingLayout:e,key:i,ref:a})=>{const{width:s,height:n,strokeWidth:c}=r;const h=s/2;const d=e==="vertical";const l="M0,0"+` H${s}`+` L${s-h},${n}`+` Q${h},${n} ${h},${n}`+" Z";return t("svg",{"aria-hidden":"true",class:o.arrow,height:s,key:i,ref:a,viewBox:`0 0 ${s} ${s+(!d?c:0)}`,width:s+(d?c:0)},c>0&&t("path",{class:o.arrowStroke,d:l,fill:"none","stroke-width":c+1}),t("path",{d:l,stroke:"none"}))};export{e as F};
//# sourceMappingURL=p-59533706.js.map