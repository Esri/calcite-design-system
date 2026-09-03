/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
function f({
  width: e = 300,
  height: t = 150,
  text: l = `${e}×${t}`,
  fontFamily: n = "sans-serif",
  fontWeight: a = "bold",
  fontSize: r = Math.floor(Math.min(e, t) * 0.2),
  dy: o = r * 0.35,
  bgColor: $ = "#ddd",
  textColor: c = "rgba(0,0,0,0.5)",
  dataUri: g = !0,
  charset: d = "UTF-8"
} = {}) {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${t}" viewBox="0 0 ${e} ${t}">
    <rect fill="${$}" width="${e}" height="${t}"/>
    <text fill="${c}" font-family="${n}" font-size="${r}" dy="${o}" font-weight="${a}" x="50%" y="50%" text-anchor="middle">${l}</text>
  </svg>`.replace(/[\t\n\r]/gim, "").replace(/\s\s+/g, " ").replace(/'/gim, "\\i");
  if (g) {
    const i = encodeURIComponent(s).replace(/\(/g, "%28").replace(/\)/g, "%29");
    return `data:image/svg+xml;charset=${d},${i}`;
  }
  return s;
}
export {
  f as s
};
