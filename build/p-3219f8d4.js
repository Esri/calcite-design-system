/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{l as e}from"./p-a9daa695.js";const n=new Set;const r={trace:0,debug:1,info:2,warn:4,error:8,off:10};function o(n){return r[n]>=r[e]}function t(e,...n){if(!o(e)){return}const r="%ccalcite";const t="background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";console[e].call(this,r,t,...n)}let c;const a={debug:e=>t("debug",e),info:e=>t("info",e),warn:e=>t("warn",e),error:e=>t("error",e),trace:e=>t("trace",e),deprecated:s};function s(e,{component:r,name:o,suggested:a,removalVersion:s}){const i=`${e}:${e==="component"?"":r}${o}`;if(n.has(i)){return}n.add(i);const d=Array.isArray(a);if(d&&!c){c=new Intl.ListFormat("en",{style:"long",type:"disjunction"})}const f=`[${o}] ${e} is deprecated and will be removed in ${s==="future"?`a future version`:`v${s}`}.${a?` Use ${d?c.format(a.map((e=>`"${e}"`))):`"${a}"`} instead.`:""}`;t("warn",f)}export{a as l};
//# sourceMappingURL=p-3219f8d4.js.map