/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
const e = (l) => String(l).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
function h({
  width: l = 300,
  height: t = 150,
  text: n = `${l}×${t}`,
  fontFamily: o = "sans-serif",
  fontWeight: $ = "bold",
  fontSize: c = Math.floor(Math.min(l, t) * 0.2),
  dy: p = c * 0.35,
  bgColor: i = "#ddd",
  textColor: d = "rgba(0,0,0,0.5)",
  dataUri: g = !0,
  charset: m = "UTF-8"
} = {}) {
  const r = e(l), a = e(t), s = `<svg xmlns="http://www.w3.org/2000/svg" width="${r}" height="${a}" viewBox="0 0 ${r} ${a}">
    <rect fill="${e(i)}" width="${r}" height="${a}"/>
    <text fill="${e(d)}" font-family="${e(o)}" font-size="${e(c)}" dy="${e(p)}" font-weight="${e($)}" x="50%" y="50%" text-anchor="middle">${e(n)}</text>
  </svg>`.replaceAll(/[\t\n\r]/gim, "").replaceAll(/\s\s+/g, " ");
  if (g) {
    const f = encodeURIComponent(s).replaceAll("(", "%28").replaceAll(")", "%29").replaceAll("'", "%27");
    return `data:image/svg+xml;charset=${m},${f}`;
  }
  return s;
}
export {
  h as s
};
