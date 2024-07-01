/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.10.2-next.2
 */
import{h as t}from"./p-753eb06c.js";const o={arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"};const e={width:12,height:6,strokeWidth:1};const r=({floatingLayout:r,key:i,ref:s})=>{const{width:a,height:n,strokeWidth:c}=e;const h=a/2;const d=r==="vertical";const l="M0,0"+` H${a}`+` L${a-h},${n}`+` Q${h},${n} ${h},${n}`+" Z";return t("svg",{"aria-hidden":"true",class:o.arrow,height:a,key:i,ref:s,viewBox:`0 0 ${a} ${a+(!d?c:0)}`,width:a+(d?c:0)},c>0&&t("path",{class:o.arrowStroke,d:l,fill:"none","stroke-width":c+1}),t("path",{d:l,stroke:"none"}))};export{r as F};
//# sourceMappingURL=p-614d358e.js.map