/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.7.0-next.17
 */
import{h as t}from"./p-7dfe275c.js";const o={arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"};const e={width:12,height:6,strokeWidth:1};const r=({floatingLayout:r,key:i,ref:s})=>{const{width:a,height:n,strokeWidth:c}=e;const h=a/2;const d=r==="vertical";const l="M0,0"+` H${a}`+` L${a-h},${n}`+` Q${h},${n} ${h},${n}`+" Z";return t("svg",{"aria-hidden":"true",class:o.arrow,height:a,key:i,viewBox:`0 0 ${a} ${a+(!d?c:0)}`,width:a+(d?c:0),ref:s},c>0&&t("path",{class:o.arrowStroke,d:l,fill:"none","stroke-width":c+1}),t("path",{d:l,stroke:"none"}))};export{r as F};
//# sourceMappingURL=p-b71e3b5e.js.map