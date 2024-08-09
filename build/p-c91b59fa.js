/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0-next.9
 */
const t=(t,n,r)=>Math.max(n,Math.min(t,r));const n=new RegExp(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);const r=t=>{const r=(""+t).match(n);if(!r||parseInt(r[1])===0){return 0}return Math.max(0,(r[1]?r[1].length:0)-(r[2]?+r[2]:0))};function a(t){if(r(t)>0&&t>0){return parseFloat(`0.${t.toString().split(".")[1]}`)}return t}function e(t,n,r,a,e){return(t-n)*(e-a)/(r-n)+a}function s(t,n,r){return t<r?-1:t>n-r?1:0}export{s as a,t as c,r as d,a as g,e as r};
//# sourceMappingURL=p-c91b59fa.js.map