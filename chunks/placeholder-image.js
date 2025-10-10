/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function p({
  width: e = 300,
  height: t = 150,
  text: n = `${e}×${t}`,
  fontFamily: l = "sans-serif",
  fontWeight: o = "bold",
  fontSize: r = Math.floor(Math.min(e, t) * 0.2),
  dy: s = r * 0.35,
  bgColor: $ = "#ddd",
  textColor: c = "rgba(0,0,0,0.5)",
  dataUri: g = !0,
  charset: d = "UTF-8"
}) {
  const a = `<svg xmlns="http://www.w3.org/2000/svg" width="${e}" height="${t}" viewBox="0 0 ${e} ${t}">
    <rect fill="${$}" width="${e}" height="${t}"/>
    <text fill="${c}" font-family="${l}" font-size="${r}" dy="${s}" font-weight="${o}" x="50%" y="50%" text-anchor="middle">${n}</text>
  </svg>`.replace(/[\t\n\r]/gim, "").replace(/\s\s+/g, " ").replace(/'/gim, "\\i");
  if (g) {
    const i = encodeURIComponent(a).replace(/\(/g, "%28").replace(/\)/g, "%29");
    return `data:image/svg+xml;charset=${d},${i}`;
  }
  return a;
}
export {
  p
};
