/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{h as t}from"./p-1381b46f.js";const o={arrow:"calcite-floating-ui-arrow",arrowStroke:"calcite-floating-ui-arrow__stroke"};const r={width:12,height:6,strokeWidth:1};const e=({floatingLayout:e,key:i,ref:s})=>{const{width:a,height:n,strokeWidth:h}=r;const c=a/2;const d=e==="vertical";const l="M0,0"+` H${a}`+` L${a-c},${n}`+` Q${c},${n} ${c},${n}`+" Z";return t("svg",{"aria-hidden":"true",class:o.arrow,height:a,key:i,ref:s,viewBox:`0 0 ${a} ${a+(!d?h:0)}`,width:a+(d?h:0)},h>0&&t("path",{class:o.arrowStroke,d:l,fill:"none","stroke-width":h+1}),t("path",{d:l,stroke:"none"}))};export{e as F};
//# sourceMappingURL=p-b2c75315.js.map