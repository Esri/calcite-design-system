import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { images24 } from "@esri/calcite-ui-icons/js/images24";
import { darkBackground, parseReadme } from "../../../.storybook/helpers";
import readme from "./readme.md";
const notes = parseReadme(readme);

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add(
    "Simple",
    () => `
    <calcite-button
      appearance="${select(
        "appearance",
        {
          solid: "solid",
          clear: "clear",
          inline: "inline",
          outline: "outline"
        },
        "solid"
      )}"
      color="${select(
        "color",
        { blue: "blue", red: "red", dark: "dark", light: "light" },
        "blue"
      )}"
      scale="${select(
        "scale",
        { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
        "m"
      )}"
      round="${boolean("round", false)}"
      floating="${boolean("floating", false)}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
           ${text("slot content", "button text here")}
    </calcite-button>
  `,
    { notes }
  )
  .add(
    "With icon",
    () => `
    <calcite-button
      icon="${text("icon", images24)}"
      round="${boolean("round", false)}"
      floating="${boolean("floating", false)}"
      icon-position="${select(
        "icon-position",
        { start: "start", end: "end" },
        "start"
      )}"
    >
           ${text("slot content", "button text here")}
    </calcite-button>
  `,
    { notes }
  )
  .add(
    "Set width",
    () => `
    <div style="width: 480px; max-width: 100%; background-color: #fff">
      <calcite-button
        width="${select(
          "width",
          { auto: "auto", half: "half", full: "full" },
          "auto"
        )}"
      >
             ${text("slot content", "button text here")}
      </calcite-button>
    </div>
  `,
    { notes }
  )
  .add(
    "FAB",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #c9c9c9;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  id="calcite-fab-tooltip"
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select(
    "width",
    { auto: "auto", half: "half", full: "full" },
    "auto"
  )}"
  icon="${text("icon", images24)}"
  appearance="${select(
    "appearance",
    { solid: "solid", outline: "outline" },
    "solid"
  )}"
  color="${select(
    "color",
    { blue: "blue", red: "red", dark: "dark", light: "light" },
    "blue"
  )}"
  scale="${select(
    "scale",
    { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
    "m"
  )}"
></calcite-button>

  </div>
</div>
<calcite-tooltip reference-element="calcite-fab-tooltip">Add new</calcite-tooltip>

`,
    { notes }
  )
  .add(
    "FAB with text",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #c9c9c9;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select(
    "width",
    { auto: "auto", half: "half", full: "full" },
    "auto"
  )}"
  icon="${text("icon", images24)}"
  appearance="${select(
    "appearance",
    { solid: "solid", outline: "outline" },
    "solid"
  )}"
  color="${select(
    "color",
    { blue: "blue", red: "red", dark: "dark", light: "light" },
    "blue"
  )}"
  scale="${select(
    "scale",
    { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
    "m"
  )}"
>
       ${text("slot content", "button text here")}
</calcite-button>
  </div>
</div>

`,
    { notes }
  )
  .add(
    "Dark mode",
    () => `
    <calcite-button
      theme="dark"
      appearance="${select(
        "appearance",
        {
          solid: "solid",
          clear: "clear",
          inline: "inline",
          outline: "outline"
        },
        "solid"
      )}"
      color="${select(
        "color",
        { blue: "blue", red: "red", dark: "dark", light: "light" },
        "blue"
      )}"
      scale="${select(
        "scale",
        { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
        "m"
      )}"
      href="${text("href", "")}"
      loading="${boolean("loading", false)}"
      disabled="${boolean("disabled", false)}"
    >
           ${text("slot content", "button text here")}
    </calcite-button>
  `,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "FAB - dark mode",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #555;color: #eaeaea;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  theme="dark"
  id="calcite-fab-tooltip"
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select(
    "width",
    { auto: "auto", half: "half", full: "full" },
    "auto"
  )}"
  icon="${text("icon", images24)}"
  appearance="${select(
    "appearance",
    { solid: "solid", outline: "outline" },
    "solid"
  )}"
  color="${select(
    "color",
    { blue: "blue", red: "red", dark: "dark", light: "light" },
    "blue"
  )}"
  scale="${select(
    "scale",
    { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
    "m"
  )}"
></calcite-button>

  </div>

</div>
<calcite-tooltip theme="dark" reference-element="calcite-fab-tooltip">Add new</calcite-tooltip>

`,
    { notes, backgrounds: darkBackground }
  )
  .add(
    "FAB with text - dark mode",
    () => `
  <div
  style="height:300px;width:200px;border:1px solid #555;color: #eaeaea;padding:20px;overflow:scroll;position:relative;display:inline-flex;flex-direction:column">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut varius, sem id ullamcorper volutpat, nibh risus
  semper tellus, quis ultrices nisl metus in nunc. Aenean ut eleifend lectus. Mauris rutrum dolor felis, at
  volutpat massa aliquam a. In sit amet tortor lobortis, scelerisque dui quis, sodales tellus. Pellentesque
  lobortis ligula nunc, ac convallis lacus sollicitudin id. Etiam bibendum mi sit amet enim auctor, eget porta
  massa hendrerit. Phasellus in ex ut diam dictum mattis. Sed cursus placerat enim ut dignissim. Donec venenatis
  maximus consequat.

  Mauris sit amet odio mattis, aliquet quam sit amet, egestas leo. Ut auctor leo in tortor maximus, in aliquet
  mauris venenatis. Curabitur fringilla odio sed hendrerit ornare. Donec sodales augue lacus, laoreet vulputate
  odio feugiat id. Aliquam viverra a purus ultrices molestie. Integer faucibus urna felis, at feugiat eros
  malesuada quis. Morbi luctus urna quis risus molestie egestas. Vestibulum magna est, mollis vitae tempor quis,
  pulvinar aliquet erat. Maecenas a elit ut purus porttitor auctor. Suspendisse id ligula consectetur, venenatis
  quam eget, aliquam erat. Sed lobortis sapien id scelerisque fringilla. Quisque eget erat a augue condimentum
  ullamcorper a semper lorem. Nunc elementum rutrum pharetra. Sed consequat sem eget ex lacinia posuere. Duis a
  libero aliquam, imperdiet ipsum sed, volutpat nisl.

  <div class="sticky-example" style="position: -webkit-sticky;position: sticky;bottom: 10px;margin: 0 auto;">
  <calcite-button
  theme="dark"
  round="${boolean("round", true)}"
  floating="${boolean("floating", true)}"
  width="${select(
    "width",
    { auto: "auto", half: "half", full: "full" },
    "auto"
  )}"
  icon="${text("icon", images24)}"
  appearance="${select(
    "appearance",
    { solid: "solid", outline: "outline" },
    "solid"
  )}"
  color="${select(
    "color",
    { blue: "blue", red: "red", dark: "dark", light: "light" },
    "blue"
  )}"
  scale="${select(
    "scale",
    { xs: "xs", s: "s", m: "m", l: "l", xl: "xl" },
    "m"
  )}"
>${text("slot content", "button text here")}</calcite-button>
  </div>
</div>
`,
    { notes, backgrounds: darkBackground }
  );
