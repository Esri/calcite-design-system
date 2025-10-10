/*! All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
v4.0.0-next.25 */
function e(r) {
  return r.map((o) => {
    let t = "";
    for (let n = 0; n < o; n++)
      t += ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
    return t;
  }).join("-");
}
const i = () => e([2, 1, 1, 1, 3]);
export {
  i as g
};
