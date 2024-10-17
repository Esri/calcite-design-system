/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.14.0-next.14
 */
import{l as e}from"./p-8d9e577e.js";const n=new Set;const r={trace:0,debug:1,info:2,warn:4,error:8,off:10};function o(n){return r[n]>=r[e]}function t(e,...n){if(!o(e)){return}const r="%ccalcite";const t="background: #007AC2; color: #fff; border-radius: 4px; padding: 2px 4px;";console[e].call(this,r,t,...n)}let c;const s={debug:e=>t("debug",e),info:e=>t("info",e),warn:e=>t("warn",e),error:e=>t("error",e),trace:e=>t("trace",e),deprecated:i};function i(e,{component:r,name:o,suggested:s,removalVersion:i}){const a=`${e}:${e==="component"?"":r}${o}`;if(n.has(a)){return}n.add(a);const d=Array.isArray(s);if(d&&!c){c=new Intl.ListFormat("en",{style:"long",type:"disjunction"})}const f=`[${o}] ${e} is deprecated and will be removed in ${i==="future"?`a future version`:`v${i}`}.${s?` Use ${d?c.format(s.map((e=>`"${e}"`))):`"${s}"`} instead.`:""}`;t("warn",f)}export{s as l};
//# sourceMappingURL=p-c1a22ee1.js.map