/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 */
import{n}from"./p-72563742.js";function r(n){return!(!n||isNaN(Number(n)))}function u(u){if(!u||(t=u,!n.some((n=>t.includes(n)))))return null;var t;let e=!1;const i=u.split("").filter(((r,u)=>r.match(/\./g)&&!e?(e=!0,!0):!(!r.match(/\-/g)||0!==u)||n.includes(r))).reduce(((n,r)=>n+r));return r(i)?Number(i).toString():null}function t(n){return(null==n?void 0:n.endsWith("."))?n.replace(".",""):n}function e(n){return n?Number(t(n)).toString():n}export{t as a,r as i,u as p,e as s}