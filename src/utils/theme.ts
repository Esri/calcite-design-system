/**
 * Emits when the theme is dynamically toggled between light and dark.
 * This file is imported in Stencil's `globalScript` config option.
 * The animation is a noop and only used for this event.
 *
 * @see {@link https://github.com/Esri/calcite-components/blob/master/src/assets/styles/global.scss Animation in global.scss}
 * @see {@link https://stenciljs.com/docs/config#globalscript Stencil's globalScript property}
 */
export default function (): void {
  document.body.addEventListener("animationstart", (event) => {
    if (event.animationName === "calciteThemeChangeLight") {
      document.body.dispatchEvent(new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: "light" } }));
    }
    if (event.animationName === "calciteThemeChangeDark") {
      document.body.dispatchEvent(new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme: "dark" } }));
    }
  });
}
