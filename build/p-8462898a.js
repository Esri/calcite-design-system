/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
import{t as n}from"./p-22f3667b.js";import{e as t,i as o}from"./p-3a4d033d.js";const e=n=>n.map((n=>{const{label:e}=n;const s=t(e,true);return{...n,continent:s,isRegularContinent:o(s)}}));async function s(){const t=[];const o=n.map((n=>({label:n})));const s=e(o);for(const n of s){const{label:o,continent:e,isRegularContinent:r}=n;if(n.visited){continue}n.visited=true;if(!r){n.visited=true;continue}const c={label:e,tzs:[{label:o}]};for(const n of s.filter((n=>!n.visited))){const{label:t,continent:o,isRegularContinent:s}=n;if(e===o){const o={label:t};c.tzs.push(o);n.visited=true}}t.push(c)}return t.map((n=>{n.tzs=n.tzs.sort(((n,t)=>n.label.localeCompare(t.label)));return{label:n.label,tzs:n.tzs.map((n=>n.label))}})).sort(((n,t)=>n.label.localeCompare(t.label)))}export{s as groupByRegion};
//# sourceMappingURL=p-8462898a.js.map