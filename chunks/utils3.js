/* COPYRIGHT Esri - https://js.arcgis.com/5.2/LICENSE.txt */
import { h as s } from "./formatting.js";
const p = {
  themeOverride: "dark"
};
function h(e, t) {
  const l = [
    { name: "xxsmall", maxWidth: 320 },
    { name: "xsmall", maxWidth: 476 },
    { name: "small", maxWidth: 768 },
    { name: "medium", maxWidth: 1152 },
    { name: "large", maxWidth: 1440 }
  ], c = ["s", "m", "l"], m = /"\{([^}]+)\}"/g, o = {
    storiesContainer: "breakpoint-stories-container",
    storyContainer: "breakpoint-story-container"
  };
  let r = "";
  return c.filter((n) => !0).forEach((n) => {
    r += s`<strong>scale = ${n}</strong>`, l.filter(({ name: a }) => !0).forEach(({ name: a, maxWidth: d }) => {
      r += s`<strong>breakpoint = ${a}</strong>`, r += s`<div class="${o.storyContainer}" style="width:${d - 1}px">
            ${e.replace(
        m,
        (x, i) => i === "scale" ? n : i
      )}
          </div>`;
    });
  }), s`<div class="${o.storiesContainer}">
    <style>
      .${o.storiesContainer} {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: flex-start;
      }

      .${o.storyContainer} {
        display: flex;
      }

      .${o.storyContainer} > * {
        flex: 1;
      }
    </style>
    ${r}
  </div>`;
}
const y = (e, t) => t ? e : "", $ = (e, t) => t == null || t === "" || typeof t == "boolean" ? "" : `${e}="${t}"`;
export {
  y as b,
  h as c,
  p as m,
  $ as o
};
